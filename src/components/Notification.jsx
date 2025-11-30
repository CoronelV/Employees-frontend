import React, { useEffect } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import './Notification.css'

function Notification({ notification, onClose }) {
    useEffect(() => {
        if (notification && notification.type !== 'loading') {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [notification, onClose])

    if (!notification) return null

    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return <CheckCircleOutlined className="notification-icon notification-icon-success" />
            case 'error':
                return <CloseCircleOutlined className="notification-icon notification-icon-error" />
            case 'loading':
                return <LoadingOutlined className="notification-icon notification-icon-loading" spin />
            default:
                return null
        }
    }

    const getClassName = () => {
        return `notification notification-${notification.type}`
    }

    return (
        <div className={getClassName()}>
            <div className="notification-content">
                {getIcon()}
                <span className="notification-message">{notification.message}</span>
            </div>
            {notification.type !== 'loading' && (
                <button className="notification-close" onClick={onClose}>
                    <CloseOutlined />
                </button>
            )}
        </div>
    )
}

export default Notification

