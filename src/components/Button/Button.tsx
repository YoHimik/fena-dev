import React, {FC, MouseEventHandler, PropsWithChildren} from 'react';
import {Button as MUIButton} from '@mui/material';
import type {Styles} from "../../types";
import {Text} from "../Text";

export type ButtonVariant = 'contained'
    | 'outlined'
    | 'text'
    | undefined

export interface ButtonProps {
    sx?: Styles,
    textColor?: string,
    size?: 'small' | 'medium' | 'large',
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    onClick?: MouseEventHandler,
    variant?: ButtonVariant
}

const ButtonTextStyles = {
    display: 'inline-flex',
    alignItems: 'center',
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
    const {
        sx,
        onClick,
        children,
        textColor,
        size,
        disabled,
        variant = 'contained',
        type,
    } = props;

    return (
        <MUIButton
            sx={sx}
            onClick={onClick}
            variant={variant}
            size={size}
            type={type}
            disabled={disabled}
        >
            <Text variant="button" color={textColor} sx={ButtonTextStyles}>
                {children}
            </Text>
        </MUIButton>
    );
};

