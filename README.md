# Employees Frontend

Aplicación de gestión de empleados desarrollada con React 19 y Ant Design.

## Características

- **Lista de Empleados**: Tabla con funcionalidades de sorting, ordering y filtering. El backend procesa las peticiones aplicando los filtros y orden seleccionados.

- **Filtro de Departamentos**: El frontend carga todos los departamentos disponibles para que el filtro funcione independientemente de los filtros aplicados o la página actual.

- **Registro de Empleados**: Formulario con validaciones para registrar nuevos empleados.

## Instalación

La ruta de la API es: https://localhost:7055/api (si se ejecuta el back como https, se debe cambiar la ruta en el archivo src/utils/fetchEndpoint.js)
La ruta de la aplicación es: http://localhost:5173

Para ejecutar la aplicación, se debe ejecutar el siguiente comando:

```bash
npm install
npm run dev
```
