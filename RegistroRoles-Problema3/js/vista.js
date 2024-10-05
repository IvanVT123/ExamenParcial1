const Vista = {
    actualizarTabla: function(roles) {
        const tbody = $('#rolesTableBody');
        tbody.empty();
        roles.forEach(rol => {
            const diasRestantes = this.calcularDiasRestantes(rol.fechaLimite);
            tbody.append(`
                <tr>
                    <td>${rol.nombre}</td>
                    <td>${rol.apellidos}</td>
                    <td>${rol.nombreUsuario}</td>
                    <td>${rol.rol.join(', ')}</td>
                    <td>${rol.estado}</td>
                    <td>${rol.fechaLimite}</td>
                    <td>${rol.fechaRegistro}</td>
                    <td>${diasRestantes}</td>
                    <td>
                        <button class="btn btn-${rol.estado === 'Activo' ? 'warning' : 'success'} btn-sm cambiarEstadoBtn" data-usuario="${rol.nombreUsuario}">
                            ${rol.estado === 'Activo' ? 'Deshabilitar' : 'Habilitar'}
                        </button>
                    </td>
                </tr>
            `);
        });
    },
    
    calcularDiasRestantes: function(fechaLimite) {
        const fechaLimiteDate = new Date(fechaLimite);
        const hoy = new Date();
        const diferencia = fechaLimiteDate - hoy;
        return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    },
    
    mostrarMensaje: function(mensaje) {
        $('#mensaje').text(mensaje).addClass('alert alert-warning');
    },

    resetFormulario: function() {
        $('#registroForm')[0].reset();
        $('#mensaje').empty();
    }
};
