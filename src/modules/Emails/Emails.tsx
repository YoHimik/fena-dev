import React, {FC, useContext} from 'react'
import {
    Box,
    Divider,
    Text,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Input,
    Button,
} from "../../components";
import {useTranslate} from "../../hooks";
import {EmailsContext} from "../../contexts";

const DividerStyles = {
    my: 3
}

const HeaderContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}

const ActionsContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap'
}

export const Emails: FC = () => {
    const {
        handleNewEmailsInputChange,
        newEmailsInputValue,
        handleCreateEmails,
        emails
    } = useContext(EmailsContext)

    const translates = useTranslate()

    return (
        <Box>
            <Box sx={HeaderContainerStyles}>
                <Text variant="h1">
                    {translates.emails.title}
                </Text>
                <Box sx={ActionsContainerStyles}>
                    <Input
                        variant="outlined"
                        placeholder={translates.emails.newEmailsInputPlaceholder}
                        type="number"
                        mode="numeric"
                        min="1"
                        value={newEmailsInputValue}
                        onChange={handleNewEmailsInputChange}
                    />
                    <Button disabled={!newEmailsInputValue} onClick={handleCreateEmails}>
                        {translates.emails.sendEmailsButtonLabel}
                    </Button>
                </Box>
            </Box>
            <Divider sx={DividerStyles}/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {translates.emails.table.idColumnLabel}
                        </TableCell>
                        <TableCell>
                            {translates.emails.table.preparedColumnLabel}
                        </TableCell>
                        <TableCell>
                            {translates.emails.table.sentColumnLabel}
                        </TableCell>
                        <TableCell>
                            {translates.emails.table.totalColumnLabel}
                        </TableCell>
                        <TableCell>
                            {translates.emails.table.statusColumnLabel}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {emails.map(e => (
                        <TableRow key={e.id}>
                            <TableCell>
                                {e.id}
                            </TableCell>
                            <TableCell>
                                {e.preparedCount}
                            </TableCell>
                            <TableCell>
                                {e.sentCount}
                            </TableCell>
                            <TableCell>
                                {e.countToSend}
                            </TableCell>
                            <TableCell>
                                {e.sentCount >= e.countToSend
                                    ? translates.emails.table.completedStatus
                                    : translates.emails.table.inProgressStatus
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}
