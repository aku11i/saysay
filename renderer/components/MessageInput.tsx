import { Button, HStack, Input } from "@chakra-ui/react";
import { FunctionComponent, KeyboardEvent, useState } from "react";
import { FaPlay } from "react-icons/fa";

export type MessageInputProps = {
  onPlay: (message: string) => Promise<void>;
};

export const MessageInput: FunctionComponent<MessageInputProps> = ({
  onPlay,
}) => {
  const [message, setMessage] = useState("");

  const handlePlay = async () => {
    setMessage("");
    await onPlay(message);
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") await handlePlay();
  };

  return (
    <HStack width="full">
      <Input
        value={message}
        onKeyPress={handleKeyPress}
        onChange={(e) => setMessage(e.target.value)}
        width="full"
      />
      <Button variant="outline" onClick={handlePlay}>
        <FaPlay />
      </Button>
    </HStack>
  );
};
