var loginLog = getLogger('login');


function revisarLogin(){
    //createDatabase();
    if(($('#rut').val()).trim() == "" && ($('#clave').val()).trim() == ""){
        showError("Debe ingresar los campos correspondientes");
    }else if(($('#rut').val()).trim() == ""){
        showError("El campo de usuario no puede estar vacio")
    }else if(($('#clave').val()).trim() == ""){
        showError("El campo de contraseña no puede estar vacio")
    }

    if(($('#rut').val()).trim() != "" && ($('#clave').val()).trim() != ""){
        iniciarSesion();
    }
}

function iniciarSesion() {
    var params = {
        rut: $('#rut').val().toLowerCase(),
        clave: $('#clave').val()
    }
    if (verificarConexion()) {
        sendPostRequest('login.php', params, function exito(data) {
            let usernameLocal = localStorage.getItem('username');
            let esElUsuarioAnterior = usernameLocal != null && usernameLocal.toLowerCase() === params.rut.toLowerCase();
            let noHayUsuarioAnterior = usernameLocal == null || usernameLocal == '';
            console.error('user data', {esElUsuarioAnterior, noHayUsuarioAnterior}, data)
            console.error('INICIANDO SESION', esElUsuarioAnterior, noHayUsuarioAnterior)
            if (data.user && (esElUsuarioAnterior || noHayUsuarioAnterior)) {
                // Se guarda la información del usuario
                localStorage.setItem('username', params.rut.toLowerCase());
                localStorage.setItem('password', params.clave);
                saveDataUser(data.user); 

                // Identifica la última pagina en la que se ingreso
                window.localStorage.setItem("tokenLogin", data.token); //Se guarda el token
                var lastPageUser = window.localStorage.getItem("lastPageUser");
                
                // Obtener catalogos
                getCatalogosVersion().then(() => {
                    if (lastPageUser == null || lastPageUser == undefined) {
                        window.localStorage.setItem("idUser", data.user.user_id);
                        fn.load("buscar.html");
                    } else {
                        lastUserAct(lastPageUser);
                    }
                }).catch(error => {
                    showError('No se pudiero obtener los catalogos')
                    loginLog.error('No se pudieron obtener los catalogos', error)
                    fn.load('login.html');
                })
            } else if (!esElUsuarioAnterior && !noHayUsuarioAnterior) {
                PeticionesDao.hayPeticionesPendientes().then(hayPeticionesPendientes => {
                    // si el usuario anterior tenia peticiones pendientes mostrar el dialogo para borrar datos
                    if (hayPeticionesPendientes) { 
                        DialogoNuevoUsuario.mostrar();
                    } else { // si no borrar datos e iniciar sesion normal
                        DialogoNuevoUsuario.borrarDatosYContinuar();
                    }
                })
            } else if (data.user == null || data.user == '') {
                showNotice('No hay conexion');
            } else {
                showError('Error inesperado')
            }
        }); 
    } else {
        showNotice('Conexión a Internet no disponible');
    }
}

function verificarSesion() {
    var token = window.localStorage.getItem("tokenLogin");
    if (localStorage['password'] == '') {
        salirYMostarLogin();    
    }
    if(token != null && token != undefined && $.trim(token) != '') {
        if(verificarConexion() == true) {
            getCatalogosVersion()
                .then(onInitApp)
                .catch(error => {
                    loginLog.error('No se pudieron obtener los catalogos', error)
                    showError('No se pudieron obtener los catalogos')
                })
        } else {
            onInitApp();
        }
    } else {
        fn.load('login.html');
    }
}

function onInitApp(){
    var idSiniestro = window.localStorage.getItem("idSiniestroServidor");
    if(idSiniestro != null && idSiniestro != undefined){
        fn.load('ref.html');
    }else{  
        cambiarSiniestro();
    }
}

function salirYMostarLogin() {
    window.localStorage.removeItem("tokenLogin");
    try {
        hideAlertDialog('logoutConfirmDialog');
    } catch (err) {
        loginLog.error('no se pudo ocultar el dialogo de cerrar sesion', err);
    }
    return fn.load('login.html');
}

/**
 * Función que identifica la ultima pagina en la que 
 * estuvo el usuario al expirar el token y 
 * al volver iniciar sesión lo redirige a dicha página
 * @param {*} lastPageUser 
 */
function lastUserAct(lastPageUser){
    var idSiniestro = window.localStorage.getItem("idSiniestroServidor");
    var htmlPage = lastPageUser + '.html';
    switch(lastPageUser){ // Pantalla para buscar un siniestro
        case 'buscar':
            fn.load(htmlPage);
        break;
        case 'resultadosSiniestro': //Pantalla lista de resultados
            fn.load('buscar.html');
        break;
        case 'ref': //Pantalla referencia
            if(idSiniestro != null && idSiniestro != undefined){
                fn.load(htmlPage);
            }else{
                fn.load('buscar.html');
            }
        break;
        case 'datos': //Pantalla datos del siniestro
            datos();
        break;
        case 'gastos':
            consultarGastos(1);
        break;
        case 'nuevoReporteGasto':
            initNuevoGasto();
        break;
        case 'reporteGasto':
            var idGasto = window.localStorage.getItem("idGastoLocal");
            var gastos_repor_id = window.localStorage.getItem("idGastoServidor");
            verReporteGasto(gastos_repor_id, idGasto);
        break;
        case 'detalleReporteGasto':
            var idDetalleGasto = window.localStorage.getItem("idDetalleGasto");
            var idGasto = window.localStorage.getItem("idGastoLocal");
            if(idDetalleGasto != null && idDetalleGasto != undefined){
                TablaDetalleGasto.verDetalleGasto(idDetalleGasto, idGasto);
            }else{
                initNuevoDetalle();
            }
        break;
        case 'inspeccion':
            inspeccion(1);
        break;
        case 'nuevaInspeccion':
            abrirNuevaInspeccion();
        break;
        case 'inspeccionSeleccionada':
            var inspeccion_id = window.localStorage.getItem("inspeccion_id_login");
            var idInspeccion = window.localStorage.getItem("idInspeccion_login");
            verInspeccion(inspeccion_id?inspeccion_id:null, idInspeccion?idInspeccion:null, idSiniestro);
        break;
        case 'documento':
            documento();
        break;
        case 'fotografiasCargadas':
            openFotografiasCargadas();
        break;
        case 'fotografias':
            openFotografia();
        break;
        case 'pdf':
            openPDF();
        break;
        case 'inspeccionSin':
            inspeccionBuscarSin();
        break;
        case 'bitacora':
            bitacora();
        break;
        case 'bitFacturable':
        var idBitacora = window.localStorage.getItem("idBitacoraLocal"); //Inicio sesión
            if(idBitacora != null && idBitacora != undefined){
                verBitacora(idBitacora);
            }else{
                nuevaBitacoraFacturable();
            }
        break;
        case 'bitNoFacturable':
            nuevaBitacoraNoFacturable();
        break;
        default:
            fn.load('buscar.html');
        break;
    }
    
}