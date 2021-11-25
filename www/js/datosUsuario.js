/**
 * Almacena los datos de usuario en la base de
 * datos
 * @param {* datos del usuario} dataUser 
 */
function saveDataUser(dataUser) {
    window.localStorage.setItem("perfilUsuario", dataUser.tipo_user_nombre);
    sqlQuery('SELECT * FROM DatosUsuario WHERE user_id = ?', [dataUser.user_id], function (datos) {
        if (datos == true) {
            sqlQuery('INSERT INTO DatosUsuario (user_id, user_rut, user_nombre, user_iniciales, user_fono, user_celular, user_mail, tipo_user_nombre) VALUES (?,?,?,?,?,?,?,?)',
                fn.JsonToArray(dataUser));
        } else {
            sqlQuery('UPDATE DatosUsuario SET user_rut = ?, user_nombre = ?, user_iniciales = ?, tipo_user_nombre = ?, ' +
                'user_fono = ?, user_celular = ?, user_mail = ? WHERE user_id = ?',
                [dataUser.user_rut, dataUser.user_nombre, dataUser.user_iniciales, dataUser.tipo_user_nombre,
                    dataUser.user_fono, dataUser.user_celular, dataUser.user_mail, dataUser.user_id
                ]);
        }
    });
}

/**
 * Función para imprimir el panel de usuario
 */
function panelUsuario() {
    var html = '';
    var titleApp = window.localStorage.getItem("titleApp");
    var idSiniestro = window.localStorage.getItem("idSiniestroLocal");
    if (idSiniestro == null || idSiniestro == undefined) {
        idSiniestro = window.localStorage.getItem("idSiniestroServidor");
    }
    html += '<ons-list id="paneOptions">'
        //Encabezado de panel
        +
        '<ons-list-header id="userPaneHeader" modifier="longdivider">' +
        'Panel de Usuario';
    //Numero de siniestro
    if (titleApp != null && titleApp != undefined) {
        html += '<br/><center><strong>' + titleApp + '</strong></center>';
    }
    html += '</ons-list_header>';

    if (idSiniestro != null && idSiniestro != undefined) {
        //Inicio
        html += '<center>' +
            '<div onclick="cambiarSiniestro();">' +
            '<img src="img/Logo_RG_V1.png" width="150px">' +
            '</div>' +
            '</center>';

        //Botón cambiar siniestro
        html += '<ons-list-item onclick="cambiarSiniestro();" style="font-size: 14px;" tappable modifier="longdivider">' +
            '<div class="left">' +
            '<ons-icon style="color:#FE8416;" icon="md-shuffle"></ons-icon>' +
            '</div>' +
            '<div class="center">Cambiar Siniestro</div>' +
            '</ons-list-item>';
        //Botón para datos
        html += '<ons-list-item onclick="datos();" style="font-size: 14px;" tappable modifier="longdivider">' +
            '<div class="left">' +
            '<ons-icon style="color:#FE8416;" icon="md-folder-outline"></ons-icon>' +
            '</div>' +
            '<div class="center">Datos</div>' +
            '</ons-list-item>';
    } else {
        //Botón pagina de inicio
        html += '<center>' +
            '<div onclick="cambiarSiniestro();">' +
            '<img src="img/Logo_RG_V1.png" width="150px">' +
            '</div>' +
            '</center>';
    }
    //Botón para gastos
    html += '<ons-list-item onclick="consultarGastos(1);" style="font-size: 14px;" tappable modifier="longdivider">' +
        '<div class="left">' +
        '<ons-icon style="color:#FE8416;" icon="md-money"></ons-icon>' +
        '</div>' +
        '<div class="center">Gastos</div>' +
        '</ons-list-item>';

    if (idSiniestro == null || idSiniestro == undefined) {
        //Botón para buscar inspeccion sin siniestro
        html += '<ons-list-item onclick="inspeccionBuscarSin();"style="font-size: 14px;" tappable modifier="longdivider">' +
            '<div class="left">' +
            '<ons-icon style="color:#FE8416;" icon="md-calendar"></ons-icon>' +
            '</div>' +
            '<div class="center">Inspección</div>' +
            '</ons-list-item>';
    } else {
        html += '<ons-list-item onclick="inspeccion(1);" style="font-size: 14px;" tappable modifier="longdivider">' +
            '<div class="left">' +
            '<ons-icon style="color:#FE8416;" icon="md-calendar"></ons-icon>' +
            '</div>' +
            '<div class="center">Inspección</div>' +
            '</ons-list-item>';
        //Botón para consultar la bitacora
        html += '<ons-list-item onclick="bitacora();" style="font-size: 14px;" tappable modifier="longdivider">' +
            '<div class="left">' +
            '<ons-icon style="color:#FE8416;" icon="md-time-restore"></ons-icon>' +
            '</div>' +
            '<div class="center">Bitácora</div>' +
            '</ons-list-item>';
    }

    /* Mostrar Peticiones */
    html += '<ons-list-item onclick="ListadoPeticiones.mostrarPeticiones();" style="font-size: 14px;" tappable modifier="longdivider">' +
        '<div class="left">' +
        '<ons-icon style="color:#FE8416;" icon="md-refresh-sync"></ons-icon>' +
        '</div>' +
        '<div class="center">Sincronización</div>' +
        '</ons-list-item>';
    /* Cerrar Sesión */
    html += `<ons-list-item onclick="DialogoCerrarSesion.mostrar(event);" style="font-size: 14px;" tappable>
                <div class="left">
                    <ons-icon style="color:#FE8416;" icon="md-power"></ons-icon>
                </div>
                <div class="center">Salir</div>
            </ons-list-item>`
    html += `<ons-list-item onclick="DialogoRestablecer.mostrar()" style="font-size: 14px;" tappable>
                <div class="left">
                    <ons-icon style="color:red;" icon="md-alert-circle"></ons-icon>
                </div>
                <div class="center">Restablecer</div>
            </ons-list-item>`
    html += '</ons-list>'
    //Se imprime el panel
    $('#paneContent').html(html);
}

/**
 * Funcion para cambiar de siniestro
 */
function cambiarSiniestro() {
    window.localStorage.removeItem("titleApp");
    window.localStorage.removeItem("idSiniestro");
    window.localStorage.removeItem("numeroSiniestro");
    window.localStorage.removeItem("estatusSiniestro");
    window.localStorage.removeItem("idSiniestroServidor");
    window.localStorage.removeItem("idSiniestroLocal");
    window.localStorage.removeItem("inspeccionSinSiniestro");
    window.localStorage.removeItem("limitGastoUsuario");
    window.localStorage.removeItem("totalRegIns");
    window.localStorage.removeItem("totalRegGastos");
    window.localStorage.removeItem("lastPageGasto");
    window.localStorage.removeItem("lastPageIns");
    window.localStorage.removeItem("pageActual");
    fn.load('buscar.html');
}

function getDatosUsuario(callback) {
    sqlQuery('SELECT * FROM DatosUsuario', null, 
        function(datos) {
            if(datos != true) {
                callback(datos[0]);
            } else {
                callback(null);
            }
        }
    );
}