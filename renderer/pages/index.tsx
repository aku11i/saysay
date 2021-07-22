import { Box, Divider, VStack } from "@chakra-ui/react";
import useLocalStorage from "@rehooks/local-storage";
import { Fragment, FunctionComponent, useEffect } from "react";

import { History } from "../../@types/history";
import { Voice } from "../../@types/voice";
import { HistoryItem } from "../components/HistoryItem";
import { MessageInput } from "../components/MessageInput";
import { useAsyncMemo } from "../hooks/useAsyncMemo";

export const Index: FunctionComponent = () => {
  const [historyList, setHistoryList] = useLocalStorage<History[]>(
    "historyList",
    []
  );

  const [voice, setVoice] = useLocalStorage<Voice>("voice");

  const voices = useAsyncMemo(() => window.ipc.getVoices(), []);
  useEffect(() => {
    if (voice) return;
    const first = voices?.[0];
    if (first) setVoice(first);
  }, [voices]);

  const handleVoiceChange = (voice: Voice) => {
    setVoice(voice);
  };

  const handlePlayMessage = async (message: string) => {
    if (!voice) return;

    const newHistory: History = {
      message,
      timestamp: Date.now(),
      voiceName: voice.name,
    };
    if (message) {
      setHistoryList([newHistory, ...historyList]);
      await window.ipc.say({ message, voice });
    } else {
      await window.ipc.say({ message: voice.description, voice });
    }
  };

  const handleSaveMessage = async (message: string) => {
    if (!voice) return;

    await window.ipc.save({
      message,
      voice,
    });
  };

  const handlePlayHistory = async (history: History) => {
    const { message, voiceName: voiceName } = history;

    const voice = voices?.find((_) => _.name === voiceName);
    if (!voice) return;

    await window.ipc.say({ message, voice });
  };

  const handleSaveHistory = async (history: History) => {
    if (!voice) return;

    const { message } = history;
    await window.ipc.save({ message, voice });
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
      paddingY="5%"
    >
      <VStack as="main">
        <Box as="section" width="full">
          <MessageInput
            onPlayMessage={handlePlayMessage}
            onSaveMessage={handleSaveMessage}
            onVoiceChange={handleVoiceChange}
            voices={voices || []}
            voice={voice || undefined}
          />
        </Box>

        <Box as="section" height="8" />

        <Box as="section" width="full">
          {historyList.length > 0 ? (
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
          ) : (
            <></>
          )}
        </Box>
      </VStack>
    </Box>
  );
};
