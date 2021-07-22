import { Select, SelectProps } from "@chakra-ui/react";
import { ChangeEvent, FunctionComponent } from "react";

import { Voice } from "../../@types/voice";

export type VoiceSelectProps = SelectProps & {
  voices: Voice[];
  voice?: Voice;
  onVoiceChange: (voice: Voice) => void;
};

export const VoiceSelect: FunctionComponent<VoiceSelectProps> = ({
  voices,
  voice,
  onVoiceChange,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const voice = voices.find((_) => _.name === e.target.value);

    if (!voice) return;
    onVoiceChange(voice);
  };

  return (
    <Select onChange={handleChange} value={voice?.name} {...props}>
      {voices.map((_) => (
        <option key={_.name} value={_.name}>{`${_.name} (${_.locale})`}</option>
      ))}
    </Select>
  );
};
