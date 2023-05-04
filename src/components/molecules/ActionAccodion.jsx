import React, {useState} from "react"

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Flex, Button, useToast, useDisclosure} from '@chakra-ui/react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Spacer} from '@chakra-ui/react'

import html2canvas from "html2canvas"
import { copyImageToClipboard } from 'copy-image-clipboard'

import {CopyIcon, DownloadIcon} from '@chakra-ui/icons'

import Mermaid from "../atoms/Mermaid"

const getDate = () => {
    let now = new Date();

    let nowString = now.getFullYear() + (now.getMonth()+1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0')

    return nowString
}

const ActionAccodion = ({src}) => {

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [mode, setMode] = useState('clipboard')
    const [logValue, setLogValue] = useState([])

    const options = {
        scale: 4
    }

    const saveAsImage = (uri) => {
    
        const downloadLink = document.createElement("a");
      
        if (typeof downloadLink.download === "string") {
            downloadLink.href = uri;

            downloadLink.download = `mermaid_${getDate()}.png`;
      
            document.body.appendChild(downloadLink);
      
            switch(mode){
                case "clipboard":
                    copyImageToClipboard(`${downloadLink.href}`).then(() => {
                        toast({
                            title: 'COPIED IMAGE!',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
                    }).catch((e) => {
                        console.log(e)
                        toast({
                            title: 'ERROR!',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        })
                    })
                    break;
                case "png":
                    downloadLink.click();
                    break;
                default:
                    toast({
                        title: 'ERROR!',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })

            }
      
          // Firefox 対策で追加したリンクを削除しておく
            document.body.removeChild(downloadLink);
        } else {
            window.open(uri);
        }
    }

    const onclickExport = async () => {
        const target = document.getElementById("save-mermaid")
        console.log(target)
        await html2canvas(target, options).then(canvas => {
            const targetImgUri = canvas.toDataURL("img/png");
            saveAsImage(targetImgUri)
        })
        onClose()
    }

    const handleClick = (mode) => {
        setMode(mode)
        onOpen()
    }

    return(
        <Box mt={2} bg={'teal.300'} borderRadius={'5px'}>        
            <Accordion borderRadius={'5px'} allowMultiple>
                <AccordionItem borderRadius={'5px'} border={0}>
                    <h2>
                    <AccordionButton>
                        <AccordionIcon />
                        <Box as="span" flex='1' textAlign='left'>
                        Action
                        </Box>
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Button leftIcon={<CopyIcon />} w={"100%"} onClick={() => {handleClick('clipboard')}}>COPY IMAGE TO CLIPBOARD</Button>
                        <Flex mt={2}>
                            <Button leftIcon={<DownloadIcon />} mr={1} onClick={() => {handleClick('png')}}>PNG</Button>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Drawer onClose={onClose} isOpen={isOpen} size={'full'} placement={'bottom'}> 
                <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{`Diagram Preview`}</DrawerHeader>
                    <DrawerBody>
                        <Box w={'fit-content'}>
                            <Mermaid src={src} id={'save-mermaid'} log={logValue} setLog={setLogValue}/>
                        </Box>
                        <Flex justifyContent={"left"} textAlign={'left'} mt={10}>
                            <Button mr={1} colorScheme="blue" onClick={onclickExport}>SAVE</Button>
                            <Button mr={1} colorScheme="red" onClick={() => onClose()}>CANCEL</Button>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default ActionAccodion