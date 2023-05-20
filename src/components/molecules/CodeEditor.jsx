import React, { useState, useCallback, useRef, useLayoutEffect, useContext, useEffect } from "react"

import { Box } from "@chakra-ui/react"

import Editor from "@monaco-editor/react";

import { EditorRefDataContext } from "../organisms/Body";
import { EditorValueDataContext } from "../organisms/Body";

const MAX_HEIGHT = 600;
const MIN_COUNT_OF_LINES = 9;
const LINE_HEIGHT = 20;

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

const CodeEditor = () => {

    const [windowWidth, windowHeight] = useWindowSize();
    const [height, setHeight] = useState(0);

    const valueGetter = useRef();

    const editorRef = useContext(EditorRefDataContext)
    const [editorValue, setEditorValue] = useContext(EditorValueDataContext)

    const handleEditorChange = useCallback(_ => {
        const countOfLines = valueGetter.current().split("\n").length;
        if (countOfLines >= MIN_COUNT_OF_LINES) {
            const currentHeight = countOfLines * LINE_HEIGHT;
            if (MAX_HEIGHT > currentHeight) {
                setHeight(currentHeight)
            }
        }
    }, [])

    const handleEditorDidMount = useCallback(
        (_valueGetter, editor) => {
            valueGetter.current = _valueGetter;
            editor.onDidChangeModelContent(handleEditorChange)
        },
        [handleEditorChange]
    )

    const handleEditorOnMount = (editor, monaco) =>  {
        editorRef.current = editor;
    }

    function handleEditorChanges(value, event){
        setEditorValue(value)
    }

    useEffect(() => {
        setHeight(`${(windowHeight-100)*0.88-48}px`)
    }, [windowHeight])

    return(
        <Box justifyContent={'center'} alignItems={'center'} pb={3} w={"100%"}>
            <Editor
                language="markdown"
                value=""
                height={height}
                editorDidMount={handleEditorDidMount}
                onMount={handleEditorOnMount}
                onChange={handleEditorChanges}
            />
        </Box>
    )
}

export default CodeEditor