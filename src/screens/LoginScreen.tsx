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
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useUserContext } from "../contexts/UserContext";
export interface LoginScreenProps {
  //Props goes here
}

export const LoginScreen = ({ ...props }: LoginScreenProps) => {
  const { login } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleFormSubmit = () => {
    form.validate();

    if (form.isValid()) {
      login(form.values.email, form.values.password); // Call the login function from the context
      form.reset();
      navigate("/"); // Redirect to the home page
    }
    //TODO: Error handling
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
            label="Email"
            placeholder="you@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
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
