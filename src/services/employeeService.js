import { fetchEndpoint } from '../utils/fetchEndpoint'

export const employeeService = {
  async getAllEmployees(filters = {}) {
    const params = {}

    if (filters.pageNumber) {
      params.pageNumber = filters.pageNumber
    }

    if (filters.pageSize) {
      params.pageSize = filters.pageSize
    }

    if (filters.filterBy) {
      params.filterBy = filters.filterBy
    }

    if (filters.filterValue) {
      params.filterValue = filters.filterValue
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy
    }

    if (filters.orderBy) {
      params.orderBy = filters.orderBy
    }

    return await fetchEndpoint('/employees', params, 'GET')
  },

  async createEmployee(employeeData) {
    return await fetchEndpoint('/employees', employeeData, 'POST')
  },

  async getAllDepartments() {
    return await fetchEndpoint('/employees/departments', {}, 'GET')
  },
}

