import { FunctionComponent } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Index } from "./pages";

export const App: FunctionComponent = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <Index />
    </ChakraProvider>
  </>
);
