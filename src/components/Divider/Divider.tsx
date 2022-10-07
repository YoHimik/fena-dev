import React, {FC} from 'react';
import {Divider as MUIDivider}  from '@mui/material';
import type {Styles} from "../../types";

export interface DividerProps {
    sx?: Styles
}

export const Divider: FC<DividerProps> = (props) => {
    const {
        sx
    } = props

    return (
        <MUIDivider sx={sx}/>
    );
};

