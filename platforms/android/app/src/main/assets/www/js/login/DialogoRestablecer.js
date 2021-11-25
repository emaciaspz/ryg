/**
 * Dialogo para restablecer aplicacion, sirve para borrar toda la base de datos y rediridigir al login
 */
const DialogoRestablecer = {
    /** @type{boolean} bandera para evitar que el proceso de borrar se ejecute dos veces */
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

    cancelar() {
        hideAlertDialog('restablecerAplicacion')
        hideAlertDialog('confirmarRestablecerAplicacion')
    },
    
    borrarTodosLosDatos(e) {
        if (!this.enProceso) {
            this.enProceso = true;
            console.error(e)
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
