import { useEffect, useMemo, useState } from "react";

export type UseSpeechSynthesisResult = {
  voices: SpeechSynthesisVoice[];
  defaultVoice: SpeechSynthesisVoice | undefined;
  speak: (props: SpeakProps) => Promise<SpeechSynthesisEvent>;
};

export type SpeakProps = {
  text: string;
  voiceURI?: string;
};

export const useSpeechSynthesis = (): UseSpeechSynthesisResult => {
  const { speechSynthesis, SpeechSynthesisUtterance } = window;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(
    speechSynthesis.getVoices()
  );

  useEffect(() => {
    const onVoicesChanged = () => {
      setVoices(speechSynthesis.getVoices());
    };

    speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
    };
  }, [speechSynthesis]);

  const defaultVoice: UseSpeechSynthesisResult["defaultVoice"] = useMemo(
    () => voices.find((_) => _.default),
    [voices]
  );

  const speak: UseSpeechSynthesisResult["speak"] = (props) =>
    new Promise<SpeechSynthesisEvent>((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(props.text);
      if (props.voiceURI) {
        const voice = voices.find((_) => _.voiceURI === props.voiceURI);
        if (voice) utterance.voice = voice;
      }

      utterance.addEventListener("end", resolve);
      utterance.addEventListener("error", reject);

      speechSynthesis.speak(utterance);
    });

  return {
    voices,
    defaultVoice,
    speak,
  };
};
