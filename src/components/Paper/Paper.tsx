import React, {FC, PropsWithChildren} from 'react';
import {Paper as MUIPaper} from '@mui/material';
import type {Styles} from "../../types";

export interface PaperProps {
    sx?: Styles,
}

export const Paper: FC<PropsWithChildren<PaperProps>> = (props) => {
    const {
        sx,
        children,
    } = props;

    return (
        <MUIPaper sx={sx}>
            {children}
        </MUIPaper>
    );
}

