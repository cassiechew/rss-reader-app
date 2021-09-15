import {
  Link as ChakraLink,
  Flex,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { parseString as parse, parseString } from "xml2js";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

import React, { useState } from "react";

import { Login } from "../components/Login";
import { Register } from "../components/Register";

// TODO: Add either reading mode or click card to go to page. [o]

enum ButtonText {
  Register = "To Login",
  Login = "To Register",
}

// IMPORTANT COLOR #FF0066
const Feeds = () => {
  const [loginToggle, setLoginToggle] = useState(true);
  const [buttonText, setButtonText] = useState(ButtonText.Login);

  const LoginOrRegistration = () => {
    if (loginToggle) {
      return <Login />;
    } else return <Register />;
  };

  return (
    <Container height="100vh" width="100%" overflow="hidden">
      <Container
        justifyContent="left"
        flexDirection="row"
        width="100%"
        overflow="hidden">
        <Main
          width="100%"
          maxWidth="100vw"
          flexDirection="column"
          minHeight="100vh"
          flexWrap="wrap"
          alignItems="center"
          mt="30%"
          pt="0">
          <Button
            onClick={() => {
              setLoginToggle(!loginToggle);
              if (buttonText === ButtonText.Login) {
                setButtonText(ButtonText.Register);
              } else {
                setButtonText(ButtonText.Login);
              }
            }}>
            {buttonText}
          </Button>
          {LoginOrRegistration()}
        </Main>
      </Container>
      <DarkModeSwitch />
    </Container>
  );
};

export default Feeds;
