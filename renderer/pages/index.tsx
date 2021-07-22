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

  const handlePlayMessage = async (message: string) => {
    const newHistory: History = { message, timestamp: Date.now() };
    setHistoryList([newHistory, ...historyList]);
    await window.ipc.say({ message });
  };

  const handlePlayHistory = async (history: History) => {
    const { message } = history;
    await window.ipc.say({ message });
  };

  const handleSaveHistory = async (history: History) => {
    const { message } = history;
    await window.ipc.save({ message });
  };

  const handleDeleteHistory = async (history: History) => {
    setHistoryList(
      historyList.filter((_) => _.timestamp !== history.timestamp)
    );
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      paddingX={{ base: "5%", md: "10%", lg: "15%", xl: "20%" }}
      paddingY="10%"
    >
      <VStack as="main">
        <Box as="section" width="80%">
          <MessageInput onPlayMessage={handlePlayMessage} />
        </Box>

        <Box as="section" height="8" />

        <Box as="section" width="full">
          <Box as="ol" width="full">
            {historyList.map((_, i) => (
              <Fragment key={_.timestamp}>
                {i !== 0 && <Divider _light={{ borderColor: "gray.300" }} />}
                <HistoryItem
                  as="li"
                  history={_}
                  onPlayHistory={handlePlayHistory}
                  onSaveHistory={handleSaveHistory}
                  onDeleteHistory={handleDeleteHistory}
                />
              </Fragment>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};
