import mermaid from "mermaid";
import { useRef, useEffect, } from "react";

import { Box } from "@chakra-ui/react";


const Mermaid = ({src, id, log, setLog}) => {

    const ref = useRef(null);

    useEffect(() => {
        if (src) {
            try{
                mermaid.init({}, ref.current).then(() => {

                }).catch((e) => {
                    setLog([...log, {hash:e.hash, message: e.str}])
                })
            }catch(e){
                console.log(e.message)
            }
        }
    }, [ref.current, src])


    return (
        src ?
        <Box ref={ref} key={src} id={id} w={'auto'}>
            {src}
        </Box>
        : <div key={src} />
    );
}

export default Mermaid