import * as React from 'react';
import type {NextPage} from 'next';
import {useTranslate} from "../hooks";
import {Title} from "../components";
import {Emails} from "../modules";
import {EmailsContextProvider} from "../contexts";

const Home: NextPage = () => {
    const translates = useTranslate()
    return (
        <>
            <Title content={translates.emails.title}/>
            <EmailsContextProvider>
                <Emails />
            </EmailsContextProvider>
        </>
    );
};

export default Home;
