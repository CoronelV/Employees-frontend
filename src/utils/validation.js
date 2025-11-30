export const validateEmployeeForm = (values) => {
  const errors = {}

  const docNumber = values.docNumber ? String(values.docNumber).trim() : ''
  if (!docNumber) {
    errors.docNumber = 'El número de documento es requerido'
  } else if (!/^\d{10}$/.test(docNumber)) {
    errors.docNumber = 'El número de documento debe tener 10 dígitos'
  }

  const name = values.name ? String(values.name).trim() : ''
  if (!name) {
    errors.name = 'El nombre es requerido'
  } else if (name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }

  const surname = values.surname ? String(values.surname).trim() : ''
  if (!surname) {
    errors.surname = 'El apellido es requerido'
  } else if (surname.length < 2) {
    errors.surname = 'El apellido debe tener al menos 2 caracteres'
  }

  const age = values.age !== null && values.age !== undefined ? Number(values.age) : null
  if (age === null || isNaN(age)) {
    errors.age = 'La edad es requerida'
  } else if (!Number.isInteger(age)) {
    errors.age = 'La edad debe ser un número entero'
  } else if (age <= 18) {
    errors.age = 'La edad debe ser superior a 18'
  } else if (age > 100) {
    errors.age = 'La edad no puede ser mayor a 100'
  }

  const department = values.department ? String(values.department).trim() : ''
  if (!department) {
    errors.department = 'El departamento es requerido'
  }

  const position = values.position ? String(values.position).trim() : ''
  if (!position) {
    errors.position = 'El puesto es requerido'
  }

  const salary = values.salary !== null && values.salary !== undefined ? Number(values.salary) : null
  if (salary === null || isNaN(salary)) {
    errors.salary = 'El salario es requerido'
  } else if (!Number.isFinite(salary)) {
    errors.salary = 'El salario debe ser un número válido'
  } else if (salary <= 0) {
    errors.salary = 'El salario debe ser superior a 0'
  }

  return errors
}

