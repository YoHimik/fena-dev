import React, {ChangeEventHandler, FC} from 'react';
import {TextField} from '@mui/material';
import {Styles} from "../../types";

export interface InputProps {
    sx?: Styles,
    value?: string,
    mode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url',
    type?: 'number' | 'search',
    min?: string,
    step?: string,
    max?: string,
    variant?: 'standard' | 'filled' | 'outlined',
    size?: 'small' | 'medium',
    placeholder?: string,
    label?: string,
    name?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    maxLength?: number,
    endAdornment?: React.ReactNode
}

export const Input: FC<InputProps> = (props) => {
    const {
        sx,
        value,
        mode = 'text',
        type,
        min,
        max,
        variant = 'standard',
        size,
        step,
        placeholder,
        label,
        name,
        onChange,
        maxLength,
        endAdornment,
    } = props;

    return (
        <TextField
            sx={sx}
            name={name}
            value={value}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            variant={variant}
            type={type}
            size={size}
            InputProps={{
                endAdornment,
            }}
            inputProps={{
                maxLength,
                min,
                max,
                step,
                inputMode: mode,
            }}
        />
    );
};

