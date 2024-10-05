const Modelo = {
    obtenerLista: function() {
        return JSON.parse(localStorage.getItem('shoppingList')) || [];
    },
    
    guardarLista: function(lista) {
        localStorage.setItem('shoppingList', JSON.stringify(lista));
    },
    
    agregarItem: function(item) {
        const lista = this.obtenerLista();
        lista.push(item);
        this.guardarLista(lista);
    },
    
    eliminarItem: function(id) {
        let lista = this.obtenerLista();
        lista = lista.filter(item => item.id != id); // Usar != para evitar problemas de tipo
        this.guardarLista(lista);
    },
    
    actualizarItem: function(id, datosActualizados) {
        let lista = this.obtenerLista();
        const index = lista.findIndex(item => item.id == id); // Usar == para evitar problemas de tipo
        if (index !== -1) {
            lista[index] = { ...lista[index], ...datosActualizados };
            console.log("Lista actualizada:", lista); // Debug
            this.guardarLista(lista);
        } else {
            console.error("Ítem no encontrado para actualizar:", id); // Debug
        }
    }
};
