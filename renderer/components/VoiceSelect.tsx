import { Select, SelectProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Voice } from "../../@types/voice";

export type VoiceSelectProps = SelectProps & {
  voices: Voice[];
};

export const VoiceSelect: FunctionComponent<VoiceSelectProps> = ({
  voices,
  ...props
}) => (
  <Select {...props}>
    {voices.map((_) => (
      <option key={_.name} value={_.name}>{`${_.name} (${_.locale})`}</option>
    ))}
  </Select>
);
