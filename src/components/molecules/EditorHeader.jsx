import React,{useState, useContext} from 'react'

import { Box, Text, HStack, Flex, Spacer, Switch, Link, Button, useToast } from '@chakra-ui/react'

import { gasRun } from '../../functions/GasFunctions'

import { GeneralDataContext } from '../pages/Page'
import { EditorRefDataContext } from '../organisms/Body'

const EditorHeader = ({src}) => {

    const [generalData, setGeneralData] = useContext(GeneralDataContext)

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()
    let code = src==undefined?'':src
    let codeBoolean = generalData.src === code
    let isDisabled = codeBoolean==undefined?true:codeBoolean

    const editorRef = useContext(EditorRefDataContext)

    const handleClick = () => {
        const innerHandleClick = () => {
            try{
                editorRef.current.setValue(generalData.src)
                toast({
                    title: "前回の保存を読み込みました",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }catch(e){
                toast({
                    title: "前回の保存を読み込みに失敗しました。",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
        return innerHandleClick
    }

    const update = async (updateData) => {
        await gasRun('queryCodeUpdate', updateData,
            (result) => {
                toast({
                    title: result.message,
                    status: result.status,
                    duration: 5000,
                    isClosable: true,
                })
                if (result.status=='success'){
                    let newGeneralData = Object.assign({}, JSON.parse(JSON.stringify(generalData)))
                    newGeneralData['src'] = src,
                    setGeneralData(newGeneralData)
                }
                setIsLoading(false)
            },
            (result) => {
                console.log(result)
                toast({
                    title: '関数[queryCodeUpdate]が異常終了しました',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setIsLoading(false)
            }
        ).catch((e) => {
            toast({
                title: '関数[gasRun]が異常終了しました',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setIsLoading(false)
        })
    }

    const submit = () => {
        const innerSubmit = () => {
            setIsLoading(true)
            let updateData = {
                id: generalData.id,
                sheetId: 'main_sheet',
                mailAddress: generalData.mailAddress,
                src: src
            }
            update(updateData)
        }
        return innerSubmit
    }

    return (
        <Flex h={"48px"} bg={'teal.300'} justifyContent={'left'} textAlign={"left"} borderRadius={"10px"}>
            <HStack h={"100%"} w={"100%"} ml={4} mr={4}>
                <Text fontSize={'md'} mr={1}>Mermaid</Text>
                {/* <Button fontSize={'xs'} size={'xs'} isDisabled={isDisabled} isLoading={isLoading} onClick={submit()}>
                    SAVE
                </Button>
                {generalData.src!=''?<Button fontSize={'xs'} size={'xs'} isLoading={isLoading} onClick={handleClick()}>
                    LOAD
                </Button>:''}
                <Spacer />
                <Text>
                    Autosync
                </Text>
                <Switch id='autsync' isChecked isDisabled/>
                <Link href={"https://mermaid.js.org/"} isExternal>
                    <Button fontSize={'xs'} size={'xs'}>
                        DOCS
                    </Button>
                </Link> */}
            </HStack>
        </Flex>
    )
}

export default EditorHeader