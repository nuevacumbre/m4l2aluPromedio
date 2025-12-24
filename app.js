"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadoDiv = document.getElementById('resultado');
    let notas = [];
    
    calcularBtn.addEventListener('click', function() {
        iniciarCalculoPromedio();
    });

    function iniciarCalculoPromedio(){
        notas = [];

        Swal.fire({
            title: '📚 Calculadora de Promedio',
            html: `
                <div style="text-align: left; margin: 15px 0;">
                    <p><strong>Instrucciones:</strong></p>
                    <ul style="margin-left: 20px; margin-bottom: 20px;">
                        <li>Ingresa 3 notas (entre 1.0 y 7.0)</li>
                        <li>Usa punto para decimales (ej: 5.5)</li>
                        <li>Las notas deben ser números válidos</li>
                    </ul>
                    <p><strong>Fórmula:</strong> Promedio = (Nota1 + Nota2 + Nota3) ÷ 3</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Comenzar',
            confirmButtonColor: '#3498db',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#e74c3c'
        }).then((result) => {
            if (result.isConfirmed) {
                // Comenzar a pedir las notas
                pedirNota(1);
            }
        });
    }

    function pedirNota(numeroNota) {
        Swal.fire({
            title: `Nota ${numeroNota}`,
            input: 'number',
            inputLabel: `Ingresa la nota ${numeroNota}`,
            inputPlaceholder: 'Ejemplo: 5.8',
            inputAttributes: {
                min: '1.0',
                max: '7.0',
                step: '0.1'
            },
            showCancelButton: false,
            confirmButtonText: numeroNota < 3 ? 'Siguiente Nota' : 'Calcular Promedio',
            confirmButtonColor: '#3498db',
            showLoaderOnConfirm: false,
            
            // Validación del input
            inputValidator: (valor) => {
                if (!valor) {
                    return '¡Debes ingresar una nota!';
                }
                
                const nota = parseFloat(valor);
                
                if (isNaN(nota)) {
                    return '¡Debes ingresar un número válido!';
                }
                
                if (nota < 1.0 || nota > 7.0) {
                    return 'La nota debe estar entre 1.0 y 7.0';
                }
                
                // Validar formato decimal (máximo 1 decimal)
                const decimales = valor.split('.')[1];
                if (decimales && decimales.length > 1) {
                    return 'Usa máximo 1 decimal (ej: 5.8)';
                }
            }
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                // Almacenar la nota en el array
                const nota = parseFloat(resultado.value);
                notas.push(nota);
                
                // Si ya tenemos 3 notas, calcular el promedio
                if (notas.length === 3) {
                    calcularYMostrarPromedio();
                } else {
                    // Pedir la siguiente nota
                    pedirNota(numeroNota + 1);
                }
            }
        });
    }

    // Función para calcular y mostrar el promedio
    function calcularYMostrarPromedio() {
        // Calcular el promedio
        const suma = notas.reduce((total, nota) => total + nota, 0);
        const promedio = suma / 3;
        const promedioFinal = promedio.toFixed(1);
        
        // Determinar el mensaje según el promedio
        let mensaje = '';
        let icono = '';
        let claseCSS = '';
        
        if (promedioFinal >= 6.0) {
            mensaje = `¡Excelente! Tienes promedio ${promedioFinal}`;
            icono = 'success';
            claseCSS = 'excelente';
        } else if (promedioFinal >= 5.0 && promedioFinal < 6.0) {
            mensaje = `Tienes promedio ${promedioFinal}. ¡Sigue adelante, puedes mejorar!`;
            icono = 'info';
            claseCSS = 'bueno';
        } else if (promedioFinal >= 4.0 && promedioFinal < 5.0) {
            mensaje = `Tienes promedio ${promedioFinal}. Debes esforzarte más.`;
            icono = 'warning';
            claseCSS = 'regular';
        } else {
            mensaje = `Has reprobado con promedio ${promedioFinal}. Continúa intentándolo.`;
            icono = 'error';
            claseCSS = 'reprobado';
        }
        
        // Mostrar SweetAlert2 con el resultado
        Swal.fire({
            title: '🎓 Resultado del Promedio',
            html: `
                <div style="text-align: left; font-size: 16px; margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Nota 1:</span>
                        <span style="font-weight: bold; color: #3498db;">${notas[0].toFixed(1)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Nota 2:</span>
                        <span style="font-weight: bold; color: #3498db;">${notas[1].toFixed(1)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span>Nota 3:</span>
                        <span style="font-weight: bold; color: #3498db;">${notas[2].toFixed(1)}</span>
                    </div>
                    <hr style="margin: 15px 0;">
                    <div style="text-align: center; font-size: 18px; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
                        <strong>Promedio Final:</strong> 
                        <span style="color: #e74c3c; font-size: 20px; font-weight: bold;">${promedioFinal}</span>
                    </div>
                    <div style="margin-top: 15px; padding: 10px; background-color: #${icono === 'success' ? 'd4edda' : icono === 'error' ? 'f8d7da' : 'fff3cd'}; border-radius: 5px;">
                        <strong>Mensaje:</strong> ${mensaje.split('. ')[0]}.
                    </div>
                </div>
            `,
            icon: icono,
            confirmButtonText: 'Ver en Página',
            confirmButtonColor: '#3498db',
            showCancelButton: true,
            cancelButtonText: 'Cerrar',
            cancelButtonColor: '#95a5a6'
        }).then((result) => {
            if (result.isConfirmed) {
                // Mostrar resultados en la página
                mostrarResultadosEnPagina(notas, promedioFinal, mensaje, claseCSS);
            }
        });
        
        // Imprimir en consola para debugging
        console.log('📊 CALCULO DE PROMEDIO 📊');
        console.log(`Nota 1: ${notas[0].toFixed(1)}`);
        console.log(`Nota 2: ${notas[1].toFixed(1)}`);
        console.log(`Nota 3: ${notas[2].toFixed(1)}`);
        console.log(`Suma total: ${suma.toFixed(1)}`);
        console.log(`Promedio: ${promedioFinal}`);
        console.log(`Mensaje: ${mensaje}`);
    }

    // Función para mostrar los resultados en la página HTML
    function mostrarResultadosEnPagina(notas, promedioFinal, mensaje, claseCSS) {
        // Mostrar el div de resultados
        resultadoDiv.style.display = 'block';
        
        // Generar el contenido HTML
        resultadoDiv.innerHTML = `
            <h2>📋 Detalle del Cálculo</h2>
            
            <div class="notas-container">
                <div class="nota-item">
                    <span>Nota 1:</span>
                    <span class="nota-valor">${notas[0].toFixed(1)}</span>
                </div>
                <div class="nota-item">
                    <span>Nota 2:</span>
                    <span class="nota-valor">${notas[1].toFixed(1)}</span>
                </div>
                <div class="nota-item">
                    <span>Nota 3:</span>
                    <span class="nota-valor">${notas[2].toFixed(1)}</span>
                </div>
            </div>
            
            <div class="promedio-final">
                <strong>Promedio Calculado:</strong> 
                <span style="font-size: 1.5em; color: #e74c3c;">${promedioFinal}</span>
                <div style="font-size: 0.9em; margin-top: 5px; color: #7f8c8d;">
                    Fórmula: (${notas[0].toFixed(1)} + ${notas[1].toFixed(1)} + ${notas[2].toFixed(1)}) ÷ 3 = ${promedioFinal}
                </div>
            </div>
            
            <div class="mensaje-final ${claseCSS}">
                ${mensaje}
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button class="btn-reiniciar" id="reiniciarBtn">
                    🔄 Calcular Otro Promedio
                </button>
            </div>
        `;
        
        // Agregar evento al botón de reinicio
        document.getElementById('reiniciarBtn').addEventListener('click', function() {
            resultadoDiv.style.display = 'none';
            iniciarCalculoPromedio();
        });
        
        // Scroll suave al resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Mensaje inicial en consola
    console.log('✅ Calculadora de promedio cargada correctamente');
    console.log('🖱️ Haz clic en "Calcular Promedio" para comenzar');
});