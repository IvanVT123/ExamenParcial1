// Vista: Controla la interfaz y el renderizado de los datos
const Vista = {
    actualizarTabla: function(lista) {
        const $cuerpoTabla = $('#shoppingTableBody');
        $cuerpoTabla.empty();
        
        lista.forEach(item => {
            $cuerpoTabla.append(`
                <tr data-id="${item.id}">
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.description}</td>
                    <td>${item.image ? `<img src="${item.image}" alt="Imagen de ${item.name}" width="50">` : 'Sin imagen'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editBtn">Editar</button>
                        <button class="btn btn-danger btn-sm deleteBtn">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    },
    
    resetFormulario: function() {
        $('#shoppingForm')[0].reset();
        $('#addItemBtn').removeClass('d-none');
        $('#updateItemBtn').addClass('d-none');
        $('#editItemId').val('');
    }
};
