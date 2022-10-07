import React, {FC, PropsWithChildren} from 'react'
import {Paper} from "../../components";

const PaperContainerStyles = {
    my: 4,
    mx: 3,
    py: 5,
    px: 8,
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
}

export const Layout: FC<PropsWithChildren> = (props) => {
    const {
        children
    } = props

    return (
        <Paper sx={PaperContainerStyles}>
            {children}
        </Paper>
    )
}
