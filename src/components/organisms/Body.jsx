import React, {useState, useLayoutEffect, useRef, createContext, useContext} from 'react'

import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Flex, Spacer} from '@chakra-ui/react'

import { Box, Text } from '@chakra-ui/react'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import EditorHeader from '../molecules/EditorHeader'
import CodeEditor from '../molecules/CodeEditor'
import SampleDiagramAccodiion from '../molecules/SampleDiagramAccodion'
import ActionAccodion from '../molecules/ActionAccodion'
import DiagramHeader from '../molecules/DiagramHeader'
import Mermaid from '../atoms/Mermaid'

import { GeneralDataContext } from '../pages/Page'

export const EditorRefDataContext = createContext()
export const EditorValueDataContext = createContext()

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
  
        window.addEventListener('resize', updateSize);
        updateSize();
  
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Body = () => {

    const [generalData, setGeneralData] = useContext(GeneralDataContext)

    const [sliderValue, setSliderValue] = useState(60)

    const [width, height] = useWindowSize();

    const editorRef = useRef(null);
    const [editorValue, setEditorValue] = useState('')
    const [logValue, setLogValue] = useState([])

    return(
        <EditorRefDataContext.Provider value={editorRef}>
            <Box ml={3} mr={3}>
                <Slider aria-label='slider-ex-1' value={sliderValue} onChange={(value) => setSliderValue(value)} >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb/>
                </Slider>
                <EditorValueDataContext.Provider value={[editorValue, setEditorValue]}>
                    <Flex>
                        <Box w={`${sliderValue-0.5}%`}>
                            <Box bg={'teal.300'} borderRadius={"5px"} h={`${height-400}px`}>
                                <EditorHeader src={editorValue}/>
                                <CodeEditor />
                            </Box>
                            <Box>
                                <SampleDiagramAccodiion />
                            </Box>
                            <Box>
                                <ActionAccodion src={editorValue}/>
                            </Box>
                        </Box>
                        <Spacer />
                        <Box w={`${100-sliderValue-0.5}%`} bg={'teal.300'} borderRadius={"5px"} h={`${height-100}px`}>
                            <Tabs variant='soft-rounded' colorScheme='green'>
                                <DiagramHeader />
                                <TabPanels>
                                    <TabPanel m={0} p={0}>
                                        <Box h={`${height-170}px`} bg={'gray.100'} w={"100%"} justifyContent={'center'} textAlign={"center"}>
                                            <Mermaid src={editorValue} id={'show-mermaid'} log={logValue} setLog={setLogValue}/>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel m={0} p={0}>

                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Flex>
                </EditorValueDataContext.Provider>
            </Box>
        </EditorRefDataContext.Provider>
    )
}

export default Body