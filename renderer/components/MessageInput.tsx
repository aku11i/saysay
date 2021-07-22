import { Button, HStack, Input, StackProps } from "@chakra-ui/react";
import { FunctionComponent, KeyboardEvent, useState } from "react";
import { FaPlay } from "react-icons/fa";

export type MessageInputProps = StackProps & {
  onPlayMessage: (message: string) => Promise<void>;
};

export const MessageInput: FunctionComponent<MessageInputProps> = ({
  onPlayMessage,
  ...props
}) => {
  const [message, setMessage] = useState("");

  const handlePlayMessage = async () => {
    setMessage("");
    await onPlayMessage(message);
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") await handlePlayMessage();
  };

  return (
    <HStack width="full" {...props}>
      <Input
        value={message}
        onKeyPress={handleKeyPress}
        onChange={(e) => setMessage(e.target.value)}
        width="full"
      />
      <Button variant="outline" onClick={handlePlayMessage}>
        <FaPlay />
      </Button>
    </HStack>
  );
};
