import {
  Link as ChakraLink,
  Flex,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { parseString as parse, parseString } from "xml2js";

/**
 *
 * MAYBE:
 *
 * Use local storage, cookies, or something local to store feeds
 * for non-registered users. Then ping feeds to server to call them.
 * Can have option to sign up and app will check for cookie and get xml
 * from server to render.
 */

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { AppDrawer } from "../components/Drawer";
import React, { useState } from "react";
import { ItemCard } from "../components/Card";

import { useQuery } from "urql";
import { useRouter } from "next/router";

const userFeedsQuery = `
query ($rssUser: String!) {
  rss(user: $rssUser)
}`;

const unzip = (arr: any[]) =>
  arr.reduce(
    (acc, val) => (val.forEach((v: any, i: number) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map((x) => x.length)),
    }).map((x) => [])
  );

// IMPORTANT COLOR #FF0066
const Feeds = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentFeed, setCurrentFeed] = useState("");
  console.log(router.query.token);
  const [result] = useQuery({
    query: userFeedsQuery,
    variables: { rssUser: router.query.token },
  });
  const userjwt = router.query.token;

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  let arr = [];
  let out = [[], []];
  if (data.rss.length > 0) {
    out = unzip(data.rss);
    const dict = new Map(
      out[1].map((e: string, i: number) => {
        return [e, out[2][i]];
      })
    );

    parse(dict.get(currentFeed), (e, res) => {
      if (!res) return;
      if (e) throw e;
      arr = [];
      res.rss.channel[0].item.map((item) => {
        arr.push(
          <ItemCard
            key={item.title}
            title={item.title}
            desc={item.description}
            link={item.link}
          />
        );
      });
      arr = arr.reverse();
    });
  }

  return (
    <Container height="100vh" width="100%" overflow="hidden">
      <AppDrawer
        feeds={{ names: out[0], feeds: out[1] }}
        setFeeds={setCurrentFeed}
        isOpen={isOpen}
        onClose={onClose}
        userToken={userjwt}
      />
      <Container
        justifyContent="left"
        flexDirection="row"
        width="100%"
        overflow="hidden">
        <Flex
          id="screen"
          width="100%"
          flexDirection="row"
          height="100%"
          justifyContent="space-between">
          <Button
            top="0"
            position="fixed"
            userSelect="none"
            _focus={{ outline: "none" }}
            borderRightColor="#FF0066"
            borderRightWidth="1px"
            height="100%"
            borderRadius="0"
            width="55px"
            onClick={onOpen}>
            {">"}
          </Button>

          <Main
            width="100%"
            maxWidth="100vw"
            justifyContent="start"
            flexDirection="column"
            minHeight="100vh"
            flexWrap="wrap"
            mt="0"
            pt="0">
            <Flex
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="20%"
              margin="0"
              padding="0">
              <Heading>Feeds of {"Insert Feed Name Here"}</Heading>
            </Flex>

            <Flex
              justifyContent="center"
              mt="0"
              margin="0"
              padding="0"
              flexWrap="wrap"
              flexDirection="row">
              <Flex
                justifyContent="initial"
                flexWrap="wrap"
                width="fit-content"
                flexDirection="row"
                maxHeight="75%"
                position="absolute"
                overflow="scroll"
                overflowX="hidden"
                ml="5%"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#FF0066",
                    borderRadius: "24px",
                  },
                }}>
                {arr}
              </Flex>
            </Flex>
          </Main>
        </Flex>
      </Container>
      <DarkModeSwitch />
    </Container>
  );
};

export default Feeds;
