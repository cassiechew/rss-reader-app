import { LinkBox, LinkOverlay, Heading, Text } from "@chakra-ui/react";

export const FeedCard = (props: {
  key: any;
  title: string;
  desc: string;
  setFeeds: React.Dispatch<React.SetStateAction<string>>;
  xmlKey: string;
}) => {
  const set = (e) => {
    e.preventDefault();
    props.setFeeds(props.xmlKey);
  };

  return (
    <LinkBox
      as="article"
      maxW="sm"
      p="5"
      m="1.5"
      borderWidth="1px"
      rounded="md">
      {/* <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
                13 days ago
              </Box> */}
      <Heading size="md">
        <LinkOverlay href="#" onClick={set}>
          {props!.title}
        </LinkOverlay>
      </Heading>
      <Text>{props!.desc}</Text>
    </LinkBox>
  );
};

export const ItemCard = (props: {
  title: string;
  desc: string;
  link: string;
}) => (
  <LinkBox
    as="article"
    maxW="sm"
    minWidth="xs"
    p="5"
    m="1.5"
    borderWidth="1px"
    rounded="md">
    {/* <Box as="time" dateTime={props!.date}>
                13 days ago
              </Box> */}
    <Heading size="md" paddingBottom="4px">
      <LinkOverlay href={props!.link} target="_blank" rel="noreferrer noopener">
        {props!.title}
      </LinkOverlay>
    </Heading>
    <Text>{props!.desc}</Text>
  </LinkBox>
);
