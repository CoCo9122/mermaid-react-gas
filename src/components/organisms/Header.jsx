import React from 'react'

import { Box, Text, HStack, Flex, Spacer } from '@chakra-ui/react'

import LinkButton from '../atoms/LinkButton'

import { version } from '../../data/version'

const Header = () => {

    const linkButtonList = [
        {
            content: "Documentation",
            url:"##########"
        }
    ]

    return (
        <Flex h={"64px"} bg={'teal.200'} justifyContent={'left'} textAlign={"left"}>
            <HStack h={"100%"} w={"100%"} ml={4} mr={4}>
                <Text fontSize={'2xl'} >Mermaid v{version}</Text>
                <Spacer />
                {linkButtonList.map((element, index) => {
                    return <LinkButton content={element.content} url={element.url} key={index}/>
                })}
            </HStack>
        </Flex>
    )
}

export default Header