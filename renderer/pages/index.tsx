import {
  Box,
  Button,
  Divider,
  HStack,
  Spacer,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useLocalStorage from "@rehooks/local-storage";
import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaPlay, FaSave } from "react-icons/fa";

import { History } from "../../@types/history";
import { Voice } from "../../@types/voice";
import { HistoryItem } from "../components/HistoryItem";
import { VoiceSelect } from "../components/VoiceSelect";
import { useAsync } from "../hooks/useAsync";
import { useIpc } from "../hooks/useIpc";

export const Index: FunctionComponent = () => {
  const ipc = useIpc();

  const [message, setMessage] = useState("");
  const isFilledMessage = useMemo(() => Boolean(message.trim()), [message]);

  const [historyList, setHistoryList] = useLocalStorage<History[]>(
    "historyList",
    []
  );

  const [voice, setVoice] = useLocalStorage<Voice | null>("voice");
  const voices = useAsync(() => ipc.getVoices());
  useEffect(() => {
    if (!voices) return;

    const savedVoice = voice && voices.find((_) => _.name === voice.name);
    if (savedVoice) {
      setVoice(savedVoice);
    } else {
      setVoice(voices[0] || null);
    }
  }, [voices]);

  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const voice = voices?.find((_) => _.name === e.target.value);
    if (!voice) return;

    setVoice(voice);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handlePlayMessage();
    }

    if (e.altKey && e.key === "Enter" && isFilledMessage) {
      e.preventDefault();
      handleSaveMessage();
    }
  };

  const handlePlayMessage = async () => {
    if (!voice) return;
    setMessage("");

    const newHistory: History = {
      message,
      timestamp: Date.now(),
      voiceName: voice.name,
    };
    if (message) {
      setHistoryList([newHistory, ...historyList]);
      await ipc.say({ message, voice });
    } else {
      await ipc.say({ message: voice.description, voice });
    }
  };

  const handleSaveMessage = async () => {
    if (!voice) return;

    await ipc.save({
      message,
      voice,
    });
  };

  const handlePlayHistory = async (history: History) => {
    const { message, voiceName: voiceName } = history;

    const voice = voices?.find((_) => _.name === voiceName);
    if (!voice) return;

    await ipc.say({ message, voice });
  };

  const handleSaveHistory = async (history: History) => {
    if (!voice) return;

    const { message } = history;
    await ipc.save({ message, voice });
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
          <VStack width="full">
            <Textarea
              placeholder={voice?.description}
              value={message}
              onKeyPress={handleKeyPress}
              onChange={(e) => setMessage(e.target.value)}
              width="full"
              resize="vertical"
              minHeight="32"
            />
            <HStack width="full">
              <VoiceSelect
                title="Select a voice"
                value={voice?.name}
                voices={voices || []}
                onChange={handleVoiceChange}
              />
              <Spacer />
              <Button
                variant="outline"
                onClick={handleSaveMessage}
                disabled={!isFilledMessage}
                title="Save (Alt + Enter)"
              >
                <FaSave />
              </Button>
              <Button
                variant="outline"
                onClick={handlePlayMessage}
                title="Play (Shift + Enter)"
              >
                <FaPlay />
              </Button>
            </HStack>
          </VStack>
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
