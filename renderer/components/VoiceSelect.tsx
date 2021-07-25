import { Select, SelectProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export type VoiceSelectProps = SelectProps & {
  voices: SpeechSynthesisVoice[];
};

export const VoiceSelect: FunctionComponent<VoiceSelectProps> = ({
  voices,
  ...props
}) => (
  <Select {...props}>
    {voices.map((_) => (
      <option
        key={_.voiceURI}
        value={_.voiceURI}
      >{`${_.name} (${_.lang})`}</option>
    ))}
  </Select>
);
