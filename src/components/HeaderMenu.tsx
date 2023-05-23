/* eslint-disable jsx-a11y/anchor-is-valid */
/* Hvordan navigere i Movie */
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Text,
  ThemeIcon,
  SimpleGrid,
  Anchor,
  Collapse,
  Input,
  Menu,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBolt,
  IconBook,
  IconChevronDown,
  IconCrown,
  IconFlame,
  IconMoon,
  IconPlaneArrival,
  IconSettings,
  IconStar,
  IconSun,
} from "@tabler/icons-react";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { Avatar, ColorScheme } from "@mantine/core";
import { useUserContext } from "../contexts/UserContext";
import { UserButton } from "./UserButton";
import GenreListPopover from "./BrowsScreenTsx";
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconStar,
    title: "Highest rated",
    link: "/catagory/highestrated",
    description: "View the highest rated movies and TV shows of all time",
  },
  {
    icon: IconPlaneArrival,
    title: "Just landed",
    link: "/catagory/landed",
    description: "Check out the latest movies and TV shows",
  },
  {
    icon: IconFlame,
    title: "Currently hot",
    link: "/catagory/hot",
    description: "See what's trending in movies and TV shows",
  },
  {
    icon: IconCrown,
    title: "Top 250 movies",
    link: "/catagory/top",
    description: "View the top 250 movies as voted by our users",
  },
  {
    icon: IconBolt,
    title: "Picks for you",
    link: "/catagory/picks",
    description: "Get personalized movie and TV show recommendations",
  },
  {
    icon: IconBook,
    title: "Browse by genre",
    link: "/catagory/tvshows",
    description: <GenreListPopover />,
  },
];

export function HeaderMenu() {
  const handleSearch = (query: string) => {
    console.log(query);
  };
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, theme } = useStyles();
  const { loggedIn, username, email, logout } = useUserContext();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const handleHotMoviesHover = () => {
    navigate("/MovieHot");
  };
  const links = mockdata.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      component={Link}
      to={item.link}
    >
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <UnstyledButton component={Link} to="/">
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{
                fontFamily: "Greycliff CF, sans-serif",
                transition: "opacity 0.3s ease-in-out",
                "&:hover": {
                  opacity: 0.7,
                },
              }}
              ta="center"
              fz="xl"
              fw={900}
            >
              MOVIEMANIA
            </Text>
          </UnstyledButton>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <UnstyledButton className={classes.link} component={Link} to="/">
              Home
            </UnstyledButton>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Movies
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Movies</Text>
                  <UnstyledButton component={Link} to="/movies">
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </UnstyledButton>
                  <SearchBar onSearch={handleSearch} />{" "}
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text fw={500} fz="sm">
                        {loggedIn ? "Welcome back" : "New here?"}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {loggedIn
                          ? "Check out your very own profile page!"
                          : "Signup to bookmark, rate and review your favorite movies!"}
                      </Text>
                    </div>
                    <Button
                      variant="default"
                      component={Link}
                      to={loggedIn ? "/profile" : "/signup"}
                    >
                      {loggedIn ? "Go to profile" : "Get started"}
                    </Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group className={classes.hiddenMobile}>
            {loggedIn ? (
              <Menu>
                <Menu.Target>
                  <UnstyledButton>
                    <UserButton name={username} email={email} image="a" />
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>

                  <Menu.Item
                    icon={<IconStar size={14} />}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      colorScheme === "light" ? (
                        <IconMoon size={14} />
                      ) : (
                        <IconSun size={14} />
                      )
                    }
                    onClick={() => {
                      toggleColorScheme();
                    }}
                  >
                    {colorScheme === "light" ? "Darkmode" : "Lightmode"}
                  </Menu.Item>

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item
                    color="red"
                    icon={<IconFlame size={14} />}
                    onClick={() => logout()}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button variant="default" component={Link} to="login">
                  Log in
                </Button>
                <Button component={Link} to="signup">
                  Sign up
                </Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <UnstyledButton className={classes.link} component={Link} to="/">
            Home
          </UnstyledButton>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Movies
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <SearchBar onSearch={handleSearch} />{" "}
          <a href="#" className={classes.link}>
            Academy
          </a>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Group position="center" grow pb="xl" px="md">
            {loggedIn ? (
              <Link to="/profile">
                <Avatar radius="xl" />
              </Link>
            ) : (
              <>
                <Button variant="default" component={Link} to="login">
                  Log in
                </Button>
                <Button component={Link} to="signup">
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
