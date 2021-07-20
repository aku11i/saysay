import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Index } from "./pages";
import theme from "./theme";

export const App: FunctionComponent = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <Index />
    </ChakraProvider>
  </>
);
