import React from 'react'

import { Box, Text, HStack, Flex, Spacer, Switch } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const DiagramHeader = () => {

    return (
        <Flex h={"48px"} bg={'teal.300'} justifyContent={'left'} textAlign={"left"} borderRadius={"10px"}>
            <HStack h={"100%"} w={"100%"} ml={4} mr={4}>
                <Text mr={10} fontSize={'md'} >Diagram</Text>
                <TabList>
                    <Tab>Preview</Tab>
                    {/* <Tab>Log</Tab> */}
                </TabList>
                <Spacer />
                <Text>
                    Pan & Zoom
                </Text>
                <Switch id='autsync' isDisabled/>
            </HStack>
        </Flex>
    )
}

export default DiagramHeader