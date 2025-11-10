##Pude hacer solo el parte 1
## Mejoras implementadas
### 1. localStorage - Persistencia de datos
- Las tareas se guardan automáticamente en el navegador
- Al recargar la página, las tareas siguen ahí
- Use el `useEffect` para guardar cada cambio
- Use el `useState` con función inicial para cargar datos guardados

### 2. Contador de tareas pendientes
- Muestra cuántas tareas faltan por completar
- Se actualiza automáticamente al marcar/desmarcar tareas
- Use `.filter()` para contar solo las tareas con `done: false`
