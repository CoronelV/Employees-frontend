import React, { useState } from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { employeeService } from '../services/employeeService'
import { validateEmployeeForm } from '../utils/validation'
import { useNotification } from '../context/NotificationContext'

function EmployeeRegistration() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { showLoading, showSuccess, showError, hideNotification } = useNotification()

  const handleSubmit = async (values) => {
    console.log(values)
    const errors = validateEmployeeForm(values)
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      showError(firstError)
      return
    }

    showLoading()
    setLoading(true)
    try {
      const employeeData = {
        docNumber: values.docNumber.trim(),
        name: values.name.trim(),
        surname: values.surname.trim(),
        age: Number(values.age),
        department: values.department.trim(),
        position: values.position.trim(),
        salary: Number(values.salary),
      }

      await employeeService.createEmployee(employeeData)
      hideNotification()
      showSuccess('Empleado registrado exitosamente')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      hideNotification()
      const errorMessage = error.message || 'Error al registrar el empleado'
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Registro de Nuevo Empleado">
      <EmployeeForm onSubmit={handleSubmit} loading={loading} />
    </Card>
  )
}

export default EmployeeRegistration

