import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FaEllipsisH, FaPlay } from "react-icons/fa";

import { History } from "../../@types/history";

export type HistoryItemProps = StackProps & {
  history: History;
  onPlayHistory: (history: History) => void;
  onSaveHistory: (history: History) => void;
  onDeleteHistory: (history: History) => void;
};

export const HistoryItem: FunctionComponent<HistoryItemProps> = ({
  history,
  onPlayHistory,
  onSaveHistory,
  onDeleteHistory,
  ...props
}) => {
  return (
    <HStack paddingY="2" {...props}>
      <Text as="span" width="full">
        {history.message}
      </Text>
      <Button variant="ghost" onClick={() => onPlayHistory(history)}>
        <FaPlay />
      </Button>
      <Menu>
        <MenuButton as={Button} variant="ghost">
          <FaEllipsisH />
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => onSaveHistory(history)}>Save</MenuItem>
          <MenuItem onClick={() => onDeleteHistory(history)}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
