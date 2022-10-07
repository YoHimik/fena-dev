import React, {FC, MouseEventHandler, PropsWithChildren} from 'react';
import {Typography}  from '@mui/material';
import type {Styles} from "../../types";

export interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1'| 'body2' | 'caption' | 'button' | 'overline'
    sx?: Styles
    color?: string
    onMouseEnter?: MouseEventHandler<HTMLSpanElement>
    onMouseLeave?: MouseEventHandler<HTMLSpanElement>
}

export const Text: FC<PropsWithChildren<TextProps>> = (props) => {
    const {
        variant = 'body1',
        sx,
        children,
        color,
        onMouseEnter,
        onMouseLeave
    } = props;

    return (
        <Typography
            variant={variant}
            sx={sx}
            color={color}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </Typography>
    );
};

