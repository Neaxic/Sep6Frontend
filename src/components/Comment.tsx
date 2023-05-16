import {
  createStyles,
  Text,
  Avatar,
  Group,
  rem,
  Rating,
  Flex,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

interface CommentSimple {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  rating?: number;
}

export function Comment({ postedAt, body, author, rating }: CommentSimple) {
  const { classes } = useStyles();

  return (
    <div>
      <Flex justify={"space-between"}>
        <Group>
          <Avatar src={author.image} alt={author.name} radius="xl" />
          <div>
            <Text size="sm">{author.name}</Text>
            <Text size="xs" color="dimmed">
              {postedAt}
            </Text>
          </div>
        </Group>
        <div>
          {rating && <Rating value={rating} size="lg" fractions={2} readOnly />}
        </div>
      </Flex>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
    </div>
  );
}
