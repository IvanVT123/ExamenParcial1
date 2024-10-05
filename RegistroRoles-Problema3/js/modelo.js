const Modelo = {
    obtenerLista: function() {
        return JSON.parse(localStorage.getItem('roles')) || [];
    },
    
    guardarLista: function(lista) {
        localStorage.setItem('roles', JSON.stringify(lista));
    },
    
    agregarRol: function(rol) {
        const lista = this.obtenerLista();
        lista.push(rol);
        this.guardarLista(lista);
    },

    cambiarEstado: function(nombreUsuario, nuevoEstado) {
        const lista = this.obtenerLista();
        const rol = lista.find(item => item.nombreUsuario === nombreUsuario);
        if (rol) {
            rol.estado = nuevoEstado;
            this.guardarLista(lista);
        }
    },

    eliminarRol: function(nombreUsuario) {
        let lista = this.obtenerLista();
        lista = lista.filter(rol => rol.nombreUsuario !== nombreUsuario);
        this.guardarLista(lista);
    }
};
