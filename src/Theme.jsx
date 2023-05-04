import { extendTheme } from "@chakra-ui/react";

const color = [
    ['linear(to-tr, teal.300, yellow.400)',
    'linear(to-t, blue.200, teal.500)',
    'linear(to-b, orange.100, purple.300)'],
    'linear(red.100 0%, orange.100 25%, yellow.100 50%)'

]

const theme = extendTheme({
    fonts: {
        heading: `cursive,"Hiragino Kaku Gothic ProN"`,
        body: `cursive,"Hiragino Kaku Gothic ProN"`,
    },
    styles: {
        global: {
            body: {
                backgroundColor: 'black',
                bgGradient:'linear(to-r, gray.500, gray.400)'
            },
        }
    }  
})

export default theme