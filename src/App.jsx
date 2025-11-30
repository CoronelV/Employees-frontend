import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'
import MainLayout from './containers/MainLayout'
import EmployeeList from './containers/EmployeeList'
import EmployeeRegistration from './containers/EmployeeRegistration'

function App() {
  return (
    <NotificationProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/register" element={<EmployeeRegistration />} />
          </Routes>
        </MainLayout>
      </Router>
    </NotificationProvider>
  )
}

export default App
