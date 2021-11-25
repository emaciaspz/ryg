/**
 * Dialogo para cerrar sesion
 * - el usuario tiene peticiones pendientes => muestra un modal con las peticiones
 * pendientes con opciones de sincronizar o cerrar
 * - el usuario no tiene internet muestra un dialogo para cofirmar
 * si quiere cerrar sesion
 * @class
 */
const DialogoCerrarSesion = {
    mostrar(e) {
        let menu = document.getElementById('menu');
        menu.close(); // ocultar menu
        let modalSincronizarPendiente = document.getElementById('sincronizarPendiente');
        PeticionesDao.hayPeticionesPendientes().then(existePeticionesPendientes => {
            if (existePeticionesPendientes) { 
                modalSincronizarPendiente.show().then(() => {
                    ListadoPeticiones.mostrarSoloPendiente = true;
                    ListadoPeticiones.actualizarListado();
                    modalSincronizarPendiente.querySelector('[data-cerrar]')
                        .onclick = e => modalSincronizarPendiente.hide();
                    modalSincronizarPendiente.querySelector('[data-sincronizar]')
                        .onclick =  e => this.sincronizarPendiente(modalSincronizarPendiente);
                    modalSincronizarPendiente.querySelector('[data-cerrar-sesion]')
                        .onclick = e => this.salir(e, modalSincronizarPendiente);
                })
            } else if (verificarConexion()) { // no hay peticiones pendientes y tiene internet
                salirYMostarLogin();
            } else { 
                // no hay peticiones pendientes, pero no tiene internet 
                // se muestra una advertencia
                createAlertDialog('logoutConfirmDialog', 'logoutConfirmDialog.html');
            }
        })
    },

    sincronizarPendiente(modal) {
        console.error('modal', modal);
        // sincroniza las peticiones y luego verifica que todas se hayan completado
        modal.querySelector('[data-icono-sincronizar]').classList.add('zmdi-hc-spin')
        return resetAllError().then(() => {
            return PeticionesDao.hayPeticionesPendientes().then(existePeticionesPendientes => {
                if (existePeticionesPendientes) {
                    // hubo algun problema
                } else if (verificarConexion()) { // no hay peticiones pendientes y tiene internet
                    modal.hide()
                    this.salir()
                } else { 
                    // no hay peticiones pendientes, pero no tiene internet 
                    // se muestra una advertencia
                    modal.hide();
                    createAlertDialog('logoutConfirmDialog', 'logoutConfirmDialog.html');
                }
            })
        }).finally(() => {
            modal.querySelector('[data-icono-sincronizar]').classList.remove('zmdi-hc-spin')
        })
    },

    /**
     * Si hay internet borra el totken y redirige al inicio, si no muestra un dialogo para confirmar
     * @param {Event} e 
     * @param {HTMLDivElement} modal 
     */
    salir(e, modal) {
        let boton = e.target;
        boton.setAttribute('disabled', 'disabled');
        if (verificarConexion()) { // no hay peticiones pendientes y tiene internet
            modal.hide()
            salirYMostarLogin()
                .then(() => boton.removeAttribute('disabled'));
        } else { 
            // no hay peticiones pendientes, pero no tiene internet 
            // se muestra una advertencia
            modal.hide();
            createAlertDialog('logoutConfirmDialog', 'logoutConfirmDialog.html');
        }
    },

    cancelar() {
        hideAlertDialog('logoutConfirmDialog')
    },
};