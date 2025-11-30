import React, { useState } from 'react'
import { Form, Input, InputNumber, Button } from 'antd'
import { validateEmployeeForm } from '../utils/validation'

function EmployeeForm({ onSubmit, loading }) {
  const [form] = Form.useForm()
  const [errors, setErrors] = useState({})

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    const validationErrors = validateEmployeeForm(values)

    console.log('values', values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorField = Object.keys(validationErrors)[0]
      form.scrollToField(firstErrorField)
      return
    }

    setErrors({})
    onSubmit(values)
  }

  const handleFieldChange = () => {
    if (Object.keys(errors).length > 0) {
      const values = form.getFieldsValue()
      const validationErrors = validateEmployeeForm(values)
      setErrors(validationErrors)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      onValuesChange={handleFieldChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="docNumber"
        label="Número de Documento"
        required
        validateStatus={errors.docNumber ? 'error' : ''}
        help={errors.docNumber}
      >
        <Input
          placeholder="Ingrese 10 dígitos"
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '')
            form.setFieldsValue({ docNumber: value })
            handleFieldChange()
          }}
        />
      </Form.Item>

      <Form.Item
        name="name"
        label="Nombre"
        required
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name}
      >
        <Input placeholder="Ingrese el nombre" />
      </Form.Item>

      <Form.Item
        name="surname"
        label="Apellido"
        required
        validateStatus={errors.surname ? 'error' : ''}
        help={errors.surname}
      >
        <Input placeholder="Ingrese el apellido" />
      </Form.Item>

      <Form.Item
        name="age"
        label="Edad"
        required
        validateStatus={errors.age ? 'error' : ''}
        help={errors.age}
      >
        <InputNumber
          placeholder="Ingrese la edad"
          min={19}
          max={100}
          style={{ width: '100%' }}
          parser={(value) => value.replace(/\D/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="department"
        label="Departamento"
        required
        validateStatus={errors.department ? 'error' : ''}
        help={errors.department}
      >
        <Input placeholder="Ingrese el departamento" />
      </Form.Item>

      <Form.Item
        name="position"
        label="Puesto"
        required
        validateStatus={errors.position ? 'error' : ''}
        help={errors.position}
      >
        <Input placeholder="Ingrese el puesto" />
      </Form.Item>

      <Form.Item
        name="salary"
        label="Salario"
        required
        validateStatus={errors.salary ? 'error' : ''}
        help={errors.salary}
      >
        <InputNumber
          placeholder="Ingrese el salario"
          min={0}
          step={0.01}
          style={{ width: '100%' }}
          formatter={(value) => {
            if (!value) return ''
            const parts = value.toString().split('.')
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return parts.join('.')
          }}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          decimalSeparator="."
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Registrar Empleado
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EmployeeForm

