import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FaEllipsisH, FaPlay } from "react-icons/fa";

import { History } from "../../@types/history";

export type HistoryItemProps = {
  history: History;
  onPlay: (history: History) => void;
  onSave: (history: History) => void;
  onDelete: (history: History) => void;
};

export const HistoryItem: FunctionComponent<HistoryItemProps> = ({
  history,
  onPlay,
  onSave,
  onDelete,
}) => {
  return (
    <HStack paddingY="2">
      <Text as="span" width="full">
        {history.message}
      </Text>
      <Button variant="ghost" onClick={() => onPlay(history)}>
        <FaPlay />
      </Button>
      <Menu>
        <MenuButton as={Button} variant="ghost">
          <FaEllipsisH />
        </MenuButton>

        <MenuList>
          <MenuItem onClick={() => onSave(history)}>Save</MenuItem>
          <MenuItem onClick={() => onDelete(history)}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
