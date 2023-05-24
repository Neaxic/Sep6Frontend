import React from "react";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { LoginUserApi } from "../api/TMDBMovie";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useUserContext } from "../contexts/UserContext";

export interface LoginScreenProps {
  // Props goes here
}

export const LoginScreen = ({ ...props }: LoginScreenProps) => {
  const { login } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleFormSubmit = async () => {
    form.validate();

    if (form.isValid()) {
      login(form.values.username, form.values.password);
      form.reset();
      navigate("/");
      await LoginUserApi(form.values.username, form.values.password);
    }
    // TODO: Error handling
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet? <a href="/signup"> Sign Up here</a>
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="Username"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username && "Invalid username"}
            radius="md"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button onClick={handleFormSubmit} fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
