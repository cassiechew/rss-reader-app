import { useColorMode, Switch } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const iconToggle = () => {
    if (colorMode === "dark") {
      return <MoonIcon />;
    } else {
      return <SunIcon />;
    }
  };
  return (
    <>
      {iconToggle()}
      <Switch
        position="fixed"
        top="1rem"
        right="1rem"
        color="green"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </>
  );
};
