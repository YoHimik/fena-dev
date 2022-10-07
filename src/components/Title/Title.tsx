import React, {FC} from 'react';
import Head from "next/head";

export interface TitleProps {
    content: string,
}

export const Title: FC<TitleProps> = (props) => {
    const {
        content,
    } = props;

    return (
        <Head>
            <title>{content}</title>
        </Head>
    );
};

