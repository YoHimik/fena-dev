import React, {FC, PropsWithChildren} from 'react';
import {
    Table as MUITable,
    TableHead as MUITableHead,
    TableRow as MUITableRow,
    TableCell as MUITableCell,
    TableBody as MUITableBody,
    TableContainer,
    Paper,
} from '@mui/material';
import type {Styles} from "../../types";

export interface TableProps {
    sx?: Styles
}

export const Table: FC<PropsWithChildren<TableProps>> = (props) => {
    const {
        children,
        sx,
    } = props;

    return (
        <TableContainer component={Paper}>
            <MUITable sx={sx}>
                {children}
            </MUITable>
        </TableContainer>
    );
};

export interface TableHeadProps {
    sx?: Styles
}

export const TableHead: FC<PropsWithChildren<TableHeadProps>> = (props) => {
    const {
        children,
        sx,
    } = props;

    return (
        <MUITableHead sx={sx}>
            {children}
        </MUITableHead>
    );
};

export interface TableRowProps {
    sx?: Styles
}

export const TableRow: FC<PropsWithChildren<TableRowProps>> = (props) => {
    const {
        children,
        sx,
    } = props;

    return (
        <MUITableRow sx={sx}>
            {children}
        </MUITableRow>
    );
};

export interface TableCellProps {
    sx?: Styles
}

export const TableCell: FC<PropsWithChildren<TableCellProps>> = (props) => {
    const {
        children,
        sx,
    } = props;

    return (
        <MUITableCell sx={sx}>
            {children}
        </MUITableCell>
    );
};

export interface TableBodyProps {
    sx?: Styles
}

export const TableBody: FC<PropsWithChildren<TableBodyProps>> = (props) => {
    const {
        children,
        sx,
    } = props;

    return (
        <MUITableBody sx={sx}>
            {children}
        </MUITableBody>
    );
};

