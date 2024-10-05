const Controlador = {
    inicializar: function() {
        this.cargarDatos();
        this.configurarEventos();
    },

    cargarDatos: function() {
        const lista = Modelo.obtenerLista();
        Vista.actualizarTabla(lista);
    },

    configurarEventos: function() {
        // Agregar artículo
        $('#shoppingForm').on('submit', this.agregarOActualizarItem.bind(this));

        // Eliminar artículo
        $('#shoppingTableBody').on('click', '.deleteBtn', function() {
            const id = $(this).closest('tr').data('id');
            Modelo.eliminarItem(id);
            Controlador.cargarDatos();
        });

        // Editar artículo
        $('#shoppingTableBody').on('click', '.editBtn', function() {
            const id = $(this).closest('tr').data('id');
            const lista = Modelo.obtenerLista();
            const item = lista.find(item => item.id == id); // Usar == para evitar problemas de tipo

            // Rellenar el formulario con los datos del artículo seleccionado
            $('#itemName').val(item.name);
            $('#itemQuantity').val(item.quantity);
            $('#itemDescription').val(item.description);
            $('#editItemId').val(item.id);

            // Mostrar botón de actualizar y ocultar el de agregar
            $('#addItemBtn').addClass('d-none');
            $('#updateItemBtn').removeClass('d-none');
        });

        // Evento para el botón de actualizar
        $('#updateItemBtn').on('click', this.agregarOActualizarItem.bind(this));
    },

    agregarOActualizarItem: function(event) {
        event.preventDefault();

        const id = $('#editItemId').val() || Date.now(); // ID único
        const nombre = $('#itemName').val();
        const cantidad = $('#itemQuantity').val();
        const descripcion = $('#itemDescription').val();
        const imagenFile = $('#itemImage')[0].files[0];
        const imagenPromise = imagenFile ? this.leerImagen(imagenFile) : Promise.resolve('');

        imagenPromise.then(urlImagen => {
            const nuevoItem = { id, name: nombre, quantity: cantidad, description: descripcion, image: urlImagen };

            console.log("ID del artículo:", id); // Debug
            console.log("Nuevo item:", nuevoItem); // Debug

            if ($('#editItemId').val()) {
                // Actualizar artículo
                console.log("Actualizando artículo..."); // Debug
                Modelo.actualizarItem($('#editItemId').val(), nuevoItem);
            } else {
                // Agregar nuevo artículo
                console.log("Agregando nuevo artículo..."); // Debug
                Modelo.agregarItem(nuevoItem);
            }

            Vista.resetFormulario();
            Controlador.cargarDatos();
        });
    },

    leerImagen: function(archivo) {
        return new Promise((resolve) => {
            if (archivo) {
                const lector = new FileReader();
                lector.onloadend = function() {
                    resolve(lector.result);
                };
                lector.readAsDataURL(archivo);
            } else {
                resolve('');
            }
        });
    }
};

// Inicializar el controlador cuando se carga la página
$(document).ready(function() {
    Controlador.inicializar();
});
