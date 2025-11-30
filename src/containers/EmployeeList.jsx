import React, { useState, useEffect, useCallback } from 'react'
import { Input, Select, Card, Spin, Button } from 'antd'
import { employeeService } from '../services/employeeService'
import { useNotification } from '../context/NotificationContext'
import EmployeeTable from '../components/EmployeeTable'

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [nameInputValue, setNameInputValue] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [departments, setDepartments] = useState([])
  const { showLoading, showError, hideNotification } = useNotification()

  const loadDepartments = useCallback(async () => {
    try {
      const data = await employeeService.getAllDepartments()
      if (Array.isArray(data)) {
        setDepartments(data)
      } else {
        setDepartments([])
      }
    } catch (error) {
      console.error('Error loading departments:', error)
      setDepartments([])
    }
  }, [])

  useEffect(() => {
    loadDepartments()
  }, [loadDepartments])

  const loadEmployees = useCallback(async () => {
    showLoading()
    setLoading(true)
    try {
      const filters = {
        pageNumber: page,
        pageSize: pageSize,
        sortBy: sortBy || undefined,
        orderBy: orderBy || undefined,
      }

      if (departmentFilter) {
        filters.filterBy = 'department'
        filters.filterValue = departmentFilter
      } else if (nameFilter && nameFilter.trim().length >= 3) {
        filters.filterBy = 'name'
        filters.filterValue = nameFilter.trim()
      }

      const data = await employeeService.getAllEmployees(filters)

      if (data && data.items) {
        setEmployees(data.items)
        setTotal(data.totalCount || 0)
      } else if (Array.isArray(data)) {
        setEmployees(data)
        setTotal(data.length)
      } else {
        setEmployees([])
        setTotal(0)
      }

      hideNotification()
    } catch (error) {
      hideNotification()
      const errorMessage = error.message || 'Error al obtener empleados'
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [nameFilter, departmentFilter, sortBy, orderBy, page, pageSize, showLoading, showError, hideNotification])

  useEffect(() => {
    loadEmployees()
  }, [loadEmployees])

  const handleNameInputChange = (value) => {
    setNameInputValue(value)
  }

  const handleNameSearch = () => {
    const trimmedValue = nameInputValue.trim()

    if (trimmedValue.length === 0) {
      setNameFilter('')
      setPage(1)
      return
    }

    setNameFilter(trimmedValue)
    setPage(1)
  }

  const handleDepartmentFilterChange = (value) => {
    setDepartmentFilter(value)
    setPage(1)
  }

  const handleTableChange = (pagination, tableFilters, sorter) => {
    if (pagination.current !== page) {
      setPage(pagination.current)
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize)
      setPage(1)
    }

    if (sorter && sorter.field) {
      setSortBy(sorter.field)
      setOrderBy(sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : null)
      setPage(1)
    } else {
      setSortBy(null)
      setOrderBy(null)
    }
  }

  const handleResetFilters = () => {
    setNameFilter('')
    setNameInputValue('')
    setDepartmentFilter('')
    setSortBy(null)
    setOrderBy(null)
    setPage(1)
  }

  return (
    <Card title="Lista de Empleados">
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Input
          placeholder="Filtrar por nombre y presione Enter"
          value={nameInputValue}
          onChange={(e) => handleNameInputChange(e.target.value)}
          onPressEnter={handleNameSearch}
          style={{ width: 250 }}
          allowClear
          onClear={() => {
            setNameInputValue('')
            setNameFilter('')
            setPage(1)
          }}
        />
        <Select
          placeholder="Filtrar por departamento"
          value={departmentFilter || undefined}
          onChange={handleDepartmentFilterChange}
          style={{ width: 250 }}
          allowClear
          showSearch
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {departments.map((dept) => (
            <Select.Option key={dept} value={dept}>
              {dept}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={handleResetFilters}>
          Limpiar Filtros
        </Button>
      </div>

      <Spin spinning={loading}>
        <EmployeeTable
          employees={employees}
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
          }}
        />
      </Spin>
    </Card>
  )
}

export default EmployeeList

