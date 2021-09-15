import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { FeedCard as Card } from "./Card";
import { useMutation } from "urql";
import { useRouter } from "next/router";

const addFeedQuery = `
mutation Mutation($addOrCreateFeedUser: String!, $addOrCreateFeedFeed: String!, $addOrCreateFeedFeedName: String!) {
  addOrCreateFeed(user: $addOrCreateFeedUser, feed: $addOrCreateFeedFeed, feedName: $addOrCreateFeedFeedName) {
    success
    message
  }
}`;

const addFeedFormModal = (
  isOpen: boolean,
  onClose: () => void,
  userToken: string
) => {
  const [feedName, setFeedName] = useState("");
  const [feedUrl, setFeedUrl] = useState("");
  const [addFeedResult, addFeed] = useMutation(addFeedQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    addFeed({
      addOrCreateFeedUser: userToken,
      addOrCreateFeedFeed: feedUrl,
      addOrCreateFeedFeedName: feedName,
    });
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mt={4} isRequired>
                <FormLabel>Feed Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter what you want to call your feed"
                  onChange={(event) => setFeedName(event.currentTarget.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Feed Url</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the url of the feed (rss://...)"
                  onChange={(event) => setFeedUrl(event.currentTarget.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

const generateCards = (
  feeds: { names: string[]; feeds: string[] },
  setFeeds: Dispatch<SetStateAction<string>>
) => {
  return feeds.feeds.map((feed, i) => (
    <Card
      key={feed}
      setFeeds={setFeeds}
      title={feeds.names[i]}
      desc={feed}
      xmlKey={feed}></Card>
  ));
};

// TODO: Make a form for adding a feed. Need to include Feed name and feed link.
// TODO: Add api to Delete feed and maybe update a feed.

// Check when Rss feeds have been updated
export const AppDrawer = (props: {
  feeds: { names: string[]; feeds: string[] };
  setFeeds: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  onClose: () => void;
  userToken;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Drawer
        placement={"left"}
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={{ outline: "none" }} />
          <DrawerHeader>Your Feeds</DrawerHeader>

          <IconButton
            aria-label="add feed"
            icon={<AddIcon />}
            onClick={onOpen}></IconButton>
          {/* <Button onClick={onOpen}>Open Modal</Button> */}
          {addFeedFormModal(isOpen, onClose, props.userToken)}
          <DrawerBody>{generateCards(props.feeds, props.setFeeds)}</DrawerBody>

          <DrawerFooter>
            <Button
              width="full"
              onClick={() => {
                router.push("/");
              }}>
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
