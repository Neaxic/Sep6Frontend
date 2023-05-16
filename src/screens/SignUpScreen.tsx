import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Text,
} from "@mantine/core";
import * as React from "react";
import { Link } from "react-router-dom";

export interface SignUpScreenProps {
  //Props goes here
}

export const SignUpScreen = ({ ...props }: SignUpScreenProps) => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Sign up!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account ? <a href="/login">Login Here</a>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <TextInput label="Username" placeholder="your Username" required />
        <TextInput label="First Name" placeholder="Your Firstname" />
        <TextInput label="Last Name" placeholder="Your Lastname" />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" component={Link} to="/signup">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};
