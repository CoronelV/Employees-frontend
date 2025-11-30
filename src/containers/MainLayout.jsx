import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserAddOutlined, TableOutlined } from '@ant-design/icons'
import { useNotification } from '../context/NotificationContext'
import Notification from '../components/Notification'

const { Header, Content } = Layout

function MainLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { notification, hideNotification } = useNotification()

  const menuItems = [
    {
      key: '/',
      icon: <TableOutlined />,
      label: 'Lista de Empleados',
    },
    {
      key: '/register',
      icon: <UserAddOutlined />,
      label: 'Registrar Empleado',
    },
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '40px' }}>
          Gestión de Empleados
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        {children}
      </Content>
      <Notification notification={notification} onClose={hideNotification} />
    </Layout>
  )
}

export default MainLayout

