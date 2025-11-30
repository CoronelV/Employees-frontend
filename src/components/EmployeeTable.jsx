import React from 'react'
import { Table, Tag } from 'antd'

function EmployeeTable({ employees, onChange, pagination }) {
  const columns = [
    {
      title: 'Número de Documento',
      dataIndex: 'docNumber',
      key: 'docNumber',
      sorter: true,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Apellido',
      dataIndex: 'surname',
      key: 'surname',
      sorter: true,
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
      render: (department) => <Tag color="blue">{department}</Tag>,
      sorter: true,
    },
    {
      title: 'Puesto',
      dataIndex: 'position',
      key: 'position',
      sorter: true,
    },
    {
      title: 'Salario',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => {
        const formatted = salary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return `$${formatted}`
      },
      sorter: true,
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={employees.map((emp, index) => ({ ...emp, key: emp.docNumber || index }))}
      onChange={onChange}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total) => `Total: ${total} empleado(s)`,
      }}
      locale={{
        emptyText: 'No hay empleados registrados',
      }}
    />
  )
}

export default EmployeeTable

