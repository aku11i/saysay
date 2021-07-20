import { Box, Divider, VStack } from "@chakra-ui/react";
import useLocalStorage from "@rehooks/local-storage";
import { Fragment, FunctionComponent } from "react";

import { History } from "../../@types/history";
import { HistoryItem } from "../components/HistoryItem";
import { MessageInput } from "../components/MessageInput";

export const Index: FunctionComponent = () => {
  const [historyList, setHistoryList] = useLocalStorage<History[]>(
    "historyList",
    []
  );

  const handlePlay = async (message: string) => {
    const newHistory: History = { message, timestamp: Date.now() };
    setHistoryList([newHistory, ...historyList]);
    await window.ipc.say({ message });
  };

  const handlePlayHistory = async (history: History) => {
    const { message } = history;
    await window.ipc.say({ message });
  };

  const handleSave = async (history: History) => {
    const { message } = history;
    await window.ipc.save({ message });
  };

  const handleDelete = async (history: History) => {
    setHistoryList(
      historyList.filter((_) => _.timestamp !== history.timestamp)
    );
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      paddingX={["5%", "10%", "15%", "20%"]}
      paddingY="10%"
    >
      <VStack>
        <Box width="80%">
          <MessageInput onPlay={handlePlay} />
        </Box>

        <Box height="8" />

        <Box width="full">
          {historyList.map((_, i) => (
            <Fragment key={_.timestamp}>
              {i !== 0 && <Divider />}
              <HistoryItem
                history={_}
                onPlay={handlePlayHistory}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            </Fragment>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};
