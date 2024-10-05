const Controlador = {
    inicializar: function() {
        this.cargarDatos();
        this.configurarEventos();
        this.establecerFechaMinima();
    },

    cargarDatos: function() {
        const lista = Modelo.obtenerLista();
        Vista.actualizarTabla(lista);
    },

    configurarEventos: function() {
        $('#registroForm').on('submit', this.registrarRol.bind(this));
        $('#rolesTableBody').on('click', '.cambiarEstadoBtn', this.cambiarEstado.bind(this));
    },

    registrarRol: function(event) {
        event.preventDefault();
        
        const nombre = $('#nombre').val();
        const apellidos = $('#apellidos').val();
        const nombreUsuario = $('#nombreUsuario').val();
        const rol = $('#rol').val();
        const estado = $('input[name="estado"]:checked').val();
        const fechaLimite = $('#fechaLimite').val();
        const fechaRegistro = new Date().toLocaleDateString();

        const lista = Modelo.obtenerLista();
        if (lista.some(item => item.nombreUsuario === nombreUsuario)) {
            Vista.mostrarMensaje("El nombre de usuario ya está registrado.");
            return;
        }

        const nuevoRol = { nombre, apellidos, nombreUsuario, rol, estado, fechaLimite, fechaRegistro };
        Modelo.agregarRol(nuevoRol);
        Vista.resetFormulario();
        this.cargarDatos();
    },

    cambiarEstado: function(event) {
        const nombreUsuario = $(event.target).data('usuario');
        const lista = Modelo.obtenerLista();
        const rol = lista.find(item => item.nombreUsuario === nombreUsuario);
        const nuevoEstado = rol.estado === 'Activo' ? 'Inactivo' : 'Activo';
        Modelo.cambiarEstado(nombreUsuario, nuevoEstado);
        this.cargarDatos();
    },

    establecerFechaMinima: function() {
        const hoy = new Date().toISOString().split('T')[0];
        $('#fechaLimite').attr('min', hoy);
    }
};

// Inicializar el controlador cuando se carga la página
$(document).ready(function() {
    Controlador.inicializar();
});
