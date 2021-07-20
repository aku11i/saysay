import { Button, HStack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FaEllipsisH, FaPlay } from "react-icons/fa";
import { History } from "../../@types/history";

export type HistoryItemProps = {
  history: History;
  onPlay: (history: History) => void;
};

export const HistoryItem: FunctionComponent<HistoryItemProps> = ({
  history,
  onPlay,
}) => {
  return (
    <HStack paddingY="2">
      <Text as="span" width="full">
        {history.message}
      </Text>
      <Button variant="ghost" onClick={() => onPlay(history)}>
        <FaPlay />
      </Button>
      <Button variant="ghost">
        <FaEllipsisH />
      </Button>
    </HStack>
  );
};
