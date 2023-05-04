import React from "react"

import { Link, Button } from "@chakra-ui/react"

const LinkButton = ({content, url}) => {
    return(
        <Link href={url} isExternal>
            <Button fontSize={'xl'}>
                {content}
            </Button>
        </Link>
    )
}

export default LinkButton