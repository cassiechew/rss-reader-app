import {
  Box,
  FormLabel,
  FormControl,
  Flex,
  Button,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "urql";

const registerQuery = `
mutation AddOrCreateFeedMutation($addOrCreateFeedEmail: String!, $addOrCreateFeedLastName: String!, $addOrCreateFeedFirstName: String!, $addOrCreateFeedPassword: String!, $addOrCreateFeedUsername: String!) {
  addOrCreateUser(email: $addOrCreateFeedEmail, lastName: $addOrCreateFeedLastName, firstName: $addOrCreateFeedFirstName, password: $addOrCreateFeedPassword, username: $addOrCreateFeedUsername) {
    success
    message
    user {
      firstName
      lastName
      email
    }
  }
}`;

export const Register = () => {
  return (
    <Box width="50%" center="center">
      <RegisterHeader />
      <RegisterForm />
    </Box>
  );
};

const RegisterHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Register Your Account</Heading>
    </Box>
  );
};

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [registerResult, register] = useMutation(registerQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    register({
      addOrCreateFeedEmail: email,
      addOrCreateFeedLastName: lastName,
      addOrCreateFeedFirstName: firstName,
      addOrCreateFeedPassword: password,
      addOrCreateFeedUsername: username,
    });
    router.push("/");
  };

  return (
    <Box my={8} textAlign="left">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            placeholder="Enter your username"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="firstName"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="lastName"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </FormControl>

        <Button type="submit" width="full" mt={4}>
          Register
        </Button>
      </form>
    </Box>
  );
};
