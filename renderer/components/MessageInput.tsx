import {
  Button,
  HStack,
  Spacer,
  StackProps,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, KeyboardEvent, useMemo, useState } from "react";
import { FaPlay, FaSave } from "react-icons/fa";

import { Voice } from "../../@types/voice";
import { VoiceSelect, VoiceSelectProps } from "./VoiceSelect";

export type MessageInputProps = StackProps & {
  onPlayMessage: (message: string) => Promise<void>;
  onSaveMessage: (message: string) => Promise<void>;
  onVoiceChange: VoiceSelectProps["onVoiceChange"];
  voices: Voice[];
  voice?: Voice;
};

export const MessageInput: FunctionComponent<MessageInputProps> = ({
  onPlayMessage,
  onSaveMessage,
  onVoiceChange,
  voices,
  voice,
  ...props
}) => {
  const [message, setMessage] = useState("");

  const isFilledMessage = useMemo(() => Boolean(message.trim()), [message]);

  const handlePlayMessage = async () => {
    setMessage("");
    await onPlayMessage(message);
  };

  const handleSaveMessage = async () => {
    await onSaveMessage(message);
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

  return (
    <VStack width="full" {...props}>
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
          value={voice?.name}
          voices={voices}
          onVoiceChange={onVoiceChange}
        />
        <Spacer />
        <Button
          variant="outline"
          onClick={handleSaveMessage}
          disabled={!isFilledMessage}
          title="Save message (Alt + Enter)"
        >
          <FaSave />
        </Button>
        <Button
          variant="outline"
          onClick={handlePlayMessage}
          title="Play message (Shift + Enter)"
        >
          <FaPlay />
        </Button>
      </HStack>
    </VStack>
  );
};
