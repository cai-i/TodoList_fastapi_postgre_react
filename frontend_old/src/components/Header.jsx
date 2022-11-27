import React from "react";
    // import react
import { Heading, Flex, Divider } from "@chakra-ui/react";
    // import les composants de Chakra UI

// def un composant pour restituer un en-tête de base
const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      bg="gray.400"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="sm">Todos</Heading>
        <Divider />
      </Flex>
    </Flex>
  );
};

export default Header;
    // export composant pour être utilisé dans le composant de base