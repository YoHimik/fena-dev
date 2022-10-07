import React, {createContext, FC, PropsWithChildren, SetStateAction, useState} from 'react'
import {Language} from "../types";

export interface AppContextValue {
    language: Language,
    setLanguage: React.Dispatch<SetStateAction<Language>>
}

export const AppContext = createContext<AppContextValue>({
    language: Language.EnUs,
    setLanguage: () => undefined
})

export const AppContextProvider: FC<PropsWithChildren> = (props) => {
    const {
        children
    } = props

    // TODO: get language from http header
    const [language, setLanguage] = useState(Language.EnUs)

    return (
        <AppContext.Provider value={{
            language,
            setLanguage
        }}>
            {children}
        </AppContext.Provider>
    )
}
