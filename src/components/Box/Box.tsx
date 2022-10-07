import React, {FC, PropsWithChildren} from 'react';
import {Box as MUIBox}  from '@mui/material';
import {Styles} from "../../types";

export interface BoxProps {
    sx?: Styles,
}

export const Box: FC<PropsWithChildren<BoxProps>> = (props) => {
    const {
        sx,
        children,
    } = props;

    return (
        <MUIBox sx={sx}>
            {children}
        </MUIBox>
    );
}

