import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));
interface UserCardImageProps {
  avatar: string;
  name: string;
  role: string;
  stats: { label: string; value: string }[];
  followable?: boolean;
}
export function UserCardImage({
  avatar,
  name,
  role,
  stats,
  followable = false,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));
  return (
    <Card
      withBorder
      padding="xl"
      pt={57}
      w={"50%"}
      radius="md"
      className={classes.card}
    >
      <Avatar
        src={avatar}
        size={"xl"}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        User role: {role}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      {followable && (
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={theme.colorScheme === "dark" ? undefined : "dark"}
        >
          Follow
        </Button>
      )}
    </Card>
  );
}
