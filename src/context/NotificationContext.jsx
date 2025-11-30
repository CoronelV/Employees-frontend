import React, { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification debe usarse dentro de NotificationProvider')
    }
    return context
}

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null)

    const showLoading = useCallback(() => {
        setNotification({
            id: Date.now(),
            type: 'loading',
            message: 'Cargando...',
        })
    }, [])

    const showSuccess = useCallback((message) => {
        setNotification({
            id: Date.now(),
            type: 'success',
            message,
        })
    }, [])

    const showError = useCallback((message) => {
        setNotification({
            id: Date.now(),
            type: 'error',
            message,
        })
    }, [])

    const hideNotification = useCallback(() => {
        setNotification(null)
    }, [])

    return (
        <NotificationContext.Provider
            value={{
                notification,
                showLoading,
                showSuccess,
                showError,
                hideNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

