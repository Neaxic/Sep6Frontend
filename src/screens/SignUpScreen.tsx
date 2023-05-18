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
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export function SignUpScreen(props: PaperProps) {
  const { signup } = useUserContext();

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
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleFormSubmit = async () => {
    form.validate();

    if (form.isValid()) {
      await signup(
        form.values.email,
        form.values.username,
        form.values.firstname,
        form.values.lastname,
        form.values.password
      ); // Call the signup function from the context

      //TODO: Error handling
      form.reset();
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
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
            />
            <TextInput
              label="First Name"
              placeholder="Your Firstname"
              required
              value={form.values.firstname}
              onChange={(event) =>
                form.setFieldValue("firstname", event.currentTarget.value)
              }
            />
            <TextInput
              label="Last Name"
              placeholder="Your Lastname"
              required
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
          <Button onClick={handleFormSubmit} fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
