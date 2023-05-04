import React,{useContext} from "react"

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Wrap, WrapItem, Button, MenuButton} from '@chakra-ui/react'

import { EditorRefDataContext } from "../organisms/Body"

import { sampleDiagramData } from "../../data/sampleDiagramData"

const SampleDiagramAccodiion = () => {

    const editorRef = useContext(EditorRefDataContext)

    const handleClick = (code) => {
        const innerHandleClick = () => {
            editorRef.current.setValue(code)
        }
        return innerHandleClick
    }

    return(
        <Box mt={2} bg={'teal.300'} borderRadius={'5px'}>        
            <Accordion borderRadius={'5px'} allowMultiple>
                <AccordionItem borderRadius={'5px'} border={0}>
                    <h2>
                    <AccordionButton>
                        <AccordionIcon />
                        <Box as="span" flex='1' textAlign='left'>
                        Sample Diagram
                        </Box>
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    {sampleDiagramData.map((element, index) => {
                        return(
                            <Button key={index} ml={2} mb={3} onClick={handleClick(element.code)}>
                                {element.name}
                            </Button>
                        )
                    })}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

export default SampleDiagramAccodiion