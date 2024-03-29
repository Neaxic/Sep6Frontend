import * as React from "react";
import {
  Container,
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  PaperProps,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { createUserApi } from "../api/TMDBMovie";

export function SignUpScreen(props: PaperProps) {
  const [serverResponse, setServerResponse] = React.useState<string>("");
  const { saveUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      username: (val) => (val.length <= 3 ? "Invalid username" : null),
      firstname: (val) => (val.length <= 3 ? "Invalid firstname" : null),
      lastname: (val) => (val.length <= 3 ? "Invalid lastname" : null),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleFormSubmit = async () => {
    form.validate();

    if (form.isValid()) {
      const data = await createUserApi(
        form.values.username,
        form.values.email,
        form.values.password,
        form.values.firstname,
        form.values.lastname
      );

      if (data) {
        saveUser(
          data.id,
          data.username,
          data.email,
          data.admin,
          data.banned,
          data.firstname,
          data.lastname
        );

        navigate("/");
        form.reset();
      } else {
        setServerResponse("Username already taken");
      }
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" weight={900}>
        Sign up!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account? <Link to="/login">Login Here</Link>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
            <TextInput
              label="Username"
              placeholder="your Username"
              required
              error={form.errors.username && "Invalid username"}
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
            />
            <TextInput
              label="First Name"
              placeholder="Your Firstname"
              required
              error={form.errors.firstname && "Invalid firstname"}
              value={form.values.firstname}
              onChange={(event) =>
                form.setFieldValue("firstname", event.currentTarget.value)
              }
            />
            <TextInput
              label="Last Name"
              placeholder="Your Lastname"
              required
              error={form.errors.lastname && "Invalid lastname"}
              value={form.values.lastname}
              onChange={(event) =>
                form.setFieldValue("lastname", event.currentTarget.value)
              }
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
          </Stack>
          {serverResponse && (
            <Text color="red" size="sm" align="center" mt={5}>
              {serverResponse}
            </Text>
          )}
          <Button onClick={handleFormSubmit} fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
