/**
 * Dialogo que se muestra cuando se inicia con otro usuario y el usuario
 * anterior tenia datos pendientes de subir
 * @class
 */
const DialogoNuevoUsuario = {
    mostrar() {
        createAlertDialog('deleteLastUserData', 'deleteLastUserData.html');
        sqlPromise('SELECT * FROM DatosUsuario').then(r => {
            return r.rows.item(0);
        }).then(datosUsuario => {
            document.querySelector('[data-usuario-anterior]').innerHTML = `
                <p>
                    <strong>Información pendiente de subir del usuario anterior</strong><br>
                    Usuario: ${datosUsuario.user_rut}<br>
                    Nombre: ${datosUsuario.user_nombre}<br>
                </p>
            `
        })

        
    },

    regresar() {
        hideAlertDialog('deleteLastUserData');
    },
    
    borrarDatosYContinuar() {
        showLoading();
        return dropDatabasePromise()
            .then(createDatabase)
            .then(() => {
                window.localStorage.clear();
                window.localStorage.setItem("synced", true);
            })
            .then(iniciarSesion)
            .finally(() => {
                hideLoading();
                hideAlertDialog('deleteLastUserData');
            })
    }    
};