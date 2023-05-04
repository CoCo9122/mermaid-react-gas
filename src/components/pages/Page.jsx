import React, {useState, useEffect, createContext} from 'react'

import { gasRun } from '../../functions/GasFunctions'

import PageTemplate from '../templates/PageTemplate'

export const GeneralDataContext = createContext()

const Page = () => {

    const [generalData, setGeneralData] = useState({})

    useEffect(() => {
        gasRun('getUser', {sheetId:'main_sheet'},
        (result) => {
            setGeneralData(result)
        },
        () => {

        }).catch((error) => {
            console.log(error)
            setGeneralData({
                id: 0,
                src:'',
                mailAddress:''
            })
        })
    },[])

    return (
        <GeneralDataContext.Provider value={[generalData, setGeneralData]}>
            <PageTemplate />
        </GeneralDataContext.Provider>
    )
}

export default Page;