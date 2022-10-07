import React, {
    ChangeEvent,
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react'
import {Emails} from "../types";
import {RequestMethod, sendHttpRequest} from "../utils";
import {useAsync} from "../hooks";
import {Events} from "../types/events";

const createEmails = async (countToSend: number) => {
    const res = await sendHttpRequest<{ id: string, countToSend: number }>({
        method: RequestMethod.Post,
        url: '/api/v1/emails',
        query: {
            countToSend: countToSend.toString()
        }
    })
    return res.data
}

export interface EmailsContextValue {
    emails: Emails[]
    newEmailsInputValue: string
    handleNewEmailsInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleCreateEmails: () => void
}

export const EmailsContext = createContext<EmailsContextValue>({
    emails: [],
    newEmailsInputValue: '',
    handleNewEmailsInputChange: () => undefined,
    handleCreateEmails: () => undefined,
})

export const EmailsContextProvider: FC<PropsWithChildren> = (props) => {
    const {
        children
    } = props

    const [emails, setEmails] = useState<Emails[]>([])

    const [newEmailsInputValue, setNewEmailsInputValue] = useState('')
    const handleNewEmailsInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setNewEmailsInputValue('')
            return;
        }

        const value = Number(e.target.value)
        if (isNaN(value) || value % 1 !== 0 || value < 1) return

        setNewEmailsInputValue(value.toString())
    }, [])

    const [runCreateEmails, , newEmails, , resetCreateEmails] = useAsync(createEmails)
    useEffect(() => {
        if (!newEmails) return

        setEmails(prev => [...prev, {
            id: newEmails.id,
            countToSend: newEmails.countToSend,
            preparedCount: 0,
            sentCount: 0,
        }])
        resetCreateEmails()
    }, [newEmails])
    const handleCreateEmails = useCallback(() => {
        runCreateEmails(Number(newEmailsInputValue))
        setNewEmailsInputValue('')
    }, [newEmailsInputValue])

    useEffect(() => {
        const source = new EventSource('/api/events')
        source.onmessage = (e) => {
            try {
                const message = JSON.parse(e.data)
                switch (message.event) {
                    case Events.EmailsGet:
                        setEmails(message.data.emails)
                        break
                    case Events.EmailsUpdate:
                        setEmails(prev => {
                            const emailsIndex = prev.findIndex(e => e.id === message.data.id)
                            if (emailsIndex === -1) return prev

                            const newEmails = prev.slice()
                            newEmails.splice(emailsIndex, 1, {
                                ...newEmails[emailsIndex],
                                ...message.data
                            })
                            return newEmails
                        })
                        break
                }
            } catch (e) {
                console.error(e)
            }
        }

        return () => {
            source.close()
        }
    }, [])

    return (
        <EmailsContext.Provider value={{
            emails,
            newEmailsInputValue,
            handleNewEmailsInputChange,
            handleCreateEmails
        }}>
            {children}
        </EmailsContext.Provider>
    )
}
