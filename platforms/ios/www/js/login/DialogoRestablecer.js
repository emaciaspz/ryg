/**
 * Dialogo para restablecer aplicacion, sirve para borrar toda la base de datos y 
 * rediridigir al login
 * @class
 */
const DialogoRestablecer = {
    /** 
     * @type{boolean} bandera para evitar que el proceso de borrar 
     * se ejecute dos veces 
     */
    enProceso: false,
    /**
     * Muestra el dialogo de restablecer
     * @returns {void}
     */
    mostrar() {
        createAlertDialog('restablecerAplicacion', 'restablecerAplicacion.html');
    },

    /**
     * Muestra un subdialogo para confirmar que se van a borrar los datos
     */
    mostrarConfirmacion() {
        createAlertDialog('confirmarRestablecerAplicacion', 'confirmarRestablecerAplicacion.html');
    },

    /**
     * Oculta los dialogo
     */
    cancelar() {
        hideAlertDialog('restablecerAplicacion')
        hideAlertDialog('confirmarRestablecerAplicacion')
    },
    
    /**
     * Borra todos la BD y redirige al login
     * @param {Event} e 
     */
    borrarTodosLosDatos() {
        if (!this.enProceso) {
            this.enProceso = true;
            return dropDatabasePromise()
                .then(createDatabase)
                .then(() => {
                    window.localStorage.clear();
                    window.localStorage.setItem("synced", true);
                    hideAlertDialog('restablecerAplicacion')
                    hideAlertDialog('confirmarRestablecerAplicacion')
                    fn.load('login.html');

                })
                .finally(() => DialogoRestablecer.enProceso = false);
        }
        return Promise.resolve()
    }    
};
