📚 Explicación de las Mejoras
1. Reemplazo de Métodos Nativos por SweetAlert2
ANTES:
window.alert("A continuación, deberá ingresar 3 notas...");
let nota1 = parseFloat(prompt("Ingrese nota 1:"));

DESPUÉS:
Swal.fire({
    title: '📚 Calculadora de Promedio',
    html: '...instrucciones...',
    icon: 'info',
    confirmButtonText: 'Comenzar'
});

2. Validación Mejorada de Datos
Nuevas validaciones implementadas:

Verificación de rango (1.0 a 7.0)

Validación de formato decimal

Comprobación de números válidos

Mensajes de error personalizados

3. Experiencia de Usuario Mejorada
Flujo interactivo:

Botón inicial para comenzar

Modal con instrucciones

Entrada secuencial de 3 notas

Resultado con iconos y colores

Opción de ver en página o cerrar

4. Presentación Visual Profesional
Características:

Diseño responsive con gradientes

Colores según el resultado (éxito, advertencia, error)

Animaciones suaves

Organización clara de la información

Feedback visual inmediato

5. Estructura de Código Mejorada
Principales mejoras:

Uso de funciones con responsabilidades únicas

Manejo de eventos DOMContentLoaded

Variables con nombres descriptivos

Comentarios explicativos

Código más mantenible y escalable

🎯 Puntos Clave para Comprender
Conceptos Importantes:
Recursividad: La función pedirNota() se llama a sí misma para pedir las 3 notas secuencialmente.

Validación de Inputs: SweetAlert2 permite validaciones personalizadas con inputValidator.

Manejo de Arrays: Uso de push() para agregar elementos y reduce() para sumar.

Condicionales Múltiples: Mantenemos la lógica original de if/else if/else pero con mejor presentación.

Manipulación del DOM: Mostrar/ocultar elementos y actualizar contenido dinámicamente.

Buenas Prácticas Implementadas:
✅ Separación de preocupaciones: HTML, CSS y JavaScript en sus respectivas secciones
✅ Nombres descriptivos: Variables y funciones con nombres claros
✅ Manejo de errores: Validación completa de entradas del usuario
✅ Experiencia de usuario: Interfaz intuitiva y atractiva
✅ Accesibilidad: Colores con buen contraste, tamaños de texto adecuados

📱 Cómo Funciona la Aplicación
Inicio: El usuario hace clic en "Calcular Promedio"

Instrucciones: Se muestra un modal con las instrucciones

Entrada de datos: Se piden las 3 notas una por una

Cálculo: El sistema calcula el promedio automáticamente

Resultado: Se muestra el resultado con mensaje personalizado

Visualización: Opción de ver el resultado detallado en la página

Reinicio: Posibilidad de calcular otro promedio

Este ejercicio mejorado no solo cumple con los requisitos originales, sino que también introduce conceptos importantes de desarrollo front-end moderno que los alumnos usarán en proyectos reales.