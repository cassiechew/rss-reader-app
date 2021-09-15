import {
  Box,
  FormLabel,
  FormControl,
  Flex,
  Button,
  Heading,
  Stack,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Router from "next/router";

import { useQuery } from "urql";

const loginQuery = `
query Query($loginPassword: String!, $loginUsername: String!) {
  login(password: $loginPassword, username: $loginUsername) {
    success
    message
  }
}`;

export const Login = () => {
  return (
    <Box width="50%" center="center">
      <LoginHeader />
      <LoginForm />
    </Box>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Sign In to Your Account</Heading>
    </Box>
  );
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pause, setPause] = useState(true);
  const [result] = useQuery({
    query: loginQuery,
    variables: {
      loginPassword: password,
      loginUsername: username,
    },
    pause: pause,
  });

  let checkSuccess = () => {
    return <></>;
  };

  if (!pause) {
    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    checkSuccess = () => {
      if (!data.login.success) {
        setPause(true);
        return <Text color="red">Failed to login</Text>;
      } else {
        setPause(true);
        console.log("Success?" + data.login.message);
        Router.push(
          { pathname: "/feeds", query: { token: data.login.message } }
          //   "/feeds"
        );
      }
    };
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setPause(false);
  };

  return (
    <Box my={8} textAlign="left">
      {checkSuccess()}
      <form onSubmit={handleSubmit}>
        <FormControl mt={4} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            placeholder="Enter your username"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </FormControl>

        <Stack isInline justifyContent="space-between" mt={4}>
          <Box>
            <Link>Forgot your password?</Link>
          </Box>
        </Stack>

        <Button type="submit" width="full" mt={4}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};
