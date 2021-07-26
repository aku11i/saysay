import {
  Box,
  Button,
  Divider,
  HStack,
  List,
  ListItem,
  Spacer,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useLocalStorage from "@rehooks/local-storage";
import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { FaPlay } from "react-icons/fa";

import { History } from "../../@types/history";
import { HistoryItem } from "../components/HistoryItem";
import { VoiceSelect } from "../components/VoiceSelect";
import { useSpeechSynthesis } from "../hooks/useSpeechSysnthesis";

export const Index: FunctionComponent = () => {
  const { defaultVoice, voices, speak } = useSpeechSynthesis();

  const [text, setText] = useState("");
  const isTextEmpty = useMemo(() => text.trim().length === 0, [text]);

  const [historyList, setHistoryList] = useLocalStorage<History[]>(
    "historyList",
    []
  );

  const [voiceURI, setVoiceURI] = useLocalStorage<string | null>("voiceURI");

  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVoiceURI(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handlePlayMessage();
    }
  };

  const handlePlayMessage = async () => {
    const newHistory: History = {
      text: text,
      timestamp: Date.now(),
      voiceURI: voiceURI ?? defaultVoice?.voiceURI,
    };

    const isRepeated =
      historyList.length &&
      historyList[0].voiceURI === newHistory.voiceURI &&
      historyList[0].text === newHistory.text;

    if (!isRepeated) {
      setHistoryList([newHistory, ...historyList]);
    }

    await speak({ text, voiceURI: voiceURI ?? defaultVoice?.voiceURI });
  };

  const handlePlayHistory = async (history: History) => {
    const { text, voiceURI } = history;
    await speak({ text, voiceURI });
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
      paddingTop="8"
      paddingBottom="4"
    >
      <VStack height="full" as="main">
        <Box as="section" width="full">
          <VStack width="full">
            <Textarea
              placeholder="Hello!"
              value={text}
              onKeyPress={handleKeyPress}
              onChange={(e) => setText(e.target.value)}
              width="full"
              resize="vertical"
              minHeight="32"
            />
            <HStack width="full">
              <VoiceSelect
                title="Select a voice"
                value={voiceURI || defaultVoice?.voiceURI}
                voices={voices}
                onChange={handleVoiceChange}
              />
              <Spacer />
              <Button
                variant="outline"
                onClick={handlePlayMessage}
                title="Play (Shift + Enter)"
                disabled={isTextEmpty}
              >
                <FaPlay />
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Box as="section" height="8" />

        <Box as="section" width="full" overflowY="scroll" paddingRight="4">
          {historyList.length > 0 ? (
            <List width="full">
              {historyList.map((_, i) => (
                <ListItem key={_.timestamp}>
                  {i !== 0 && <Divider _light={{ borderColor: "gray.300" }} />}
                  <HistoryItem
                    width="full"
                    history={_}
                    onPlayHistory={handlePlayHistory}
                    onDeleteHistory={handleDeleteHistory}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <></>
          )}
        </Box>
      </VStack>
    </Box>
  );
};
