import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FaEllipsisH, FaPlay } from "react-icons/fa";

import { History } from "../../@types/history";

export type HistoryItemProps = StackProps & {
  history: History;
  onPlayHistory: (history: History) => void;
  onDeleteHistory: (history: History) => void;
};

export const HistoryItem: FunctionComponent<HistoryItemProps> = ({
  history,
  onPlayHistory,
  onDeleteHistory,
  ...props
}) => (
  <HStack paddingY="2" {...props}>
    <VStack width="full">
      <Text as="span" width="full">
        {history.text}
      </Text>
      <Text color="gray.500" width="full" fontSize="xs">
        {history.voiceURI}
      </Text>
    </VStack>
    <Button variant="ghost" onClick={() => onPlayHistory(history)} title="Play">
      <FaPlay />
    </Button>
    <Menu>
      <MenuButton as={Button} variant="ghost" title="Menu">
        <FaEllipsisH />
      </MenuButton>

      <MenuList>
        <MenuItem onClick={() => onDeleteHistory(history)}>Delete</MenuItem>
      </MenuList>
    </Menu>
  </HStack>
);
