var isFacturable = false;
var salir = false;
var bitacoraLog = getLogger('bitacora');

/**
 * @typedef BitacoraParams
 * @property {string|any} id
 * @property {string|any} fecha_orden
 * @property {string|any} fecha
 * @property {string|any} gestion
 * @property {string|any} tiempo
 * @property {string|any} comentario
 * @property {string|any} usuario
 * @property {string|any} subtarea
 * @property {string|any} bitacora_caso
 * @property {string|any} fk_idSiniestro
 * @property {string|any} bitacora_observacion
 * @property {string|any} anio
 * @property {string|any} mes
 * @property {string|any} dia
 * @property {string|any} bitacora_accion
 * @property {string|any} objetivo
 * @property {string|any} bitacora_tiempo
 */
/**
 * Funcion que muestra los datos de la bitacora
 *
 */
function bitacora() {
    var numSin = window.localStorage.getItem("idSiniestroServidor");
    window.localStorage.removeItem("idBitacoraLocal"); //Inicio sesión
    fn.load('bitacora.html');
    bitacoraLog.debug('consultando bitacoras', {conexion: verificarConexion(), synced: isSynced(), numSin});
    if (verificarConexion() == true && (isSynced() == true || isSynced() == "true")) {
        sendGetRequest('siniestro_bitacora.php?caso=' + numSin, function (lstBitacoras) {
            // convertir fechas a yyyy-mm-dd
            lstBitacoras.resultados = lstBitacoras.resultados.map(b => {
                let parte = b.fecha.split('-');
                if (parte[1].length < 2) {
                    parte[1] = '0' + parte[1]
                }
                if (parte[2].length < 2) {
                    parte[2] = '0' + parte[2]
                }
                b.fecha = parte[0] + '-' + parte[1] + '-' + parte[2];
                return b;
            })
            if (lstBitacoras != null && lstBitacoras != undefined) {
                if (lstBitacoras.resultados != null && lstBitacoras.resultados != undefined && lstBitacoras.resultados.length != 0) {
                    if(isSynced() == true || isSynced() == 'true') {
                        showNotice('Cargando la información, espere un momento');
                        guardarBitacoras(lstBitacoras.resultados, function (success) {
                            getBitacoraData();
                        });
                    } else {
                        getBitacoraData();
                    }
                } else {
                    bitacoraLog.debug('no se encontraron bitácoras relacionadas con el siniestro');
                    showNotice('No se encontraron bitácoras relacionadas con el siniestro');
                    getBitacoraData();
                }
            } else {
                bitacoraLog.debug('no se encontraron bitácoras relacionadas con el siniestro');
                showNotice('No se encontraron bitácoras relacionadas con el siniestro');
                getBitacoraData();
            }
        }, function (error) {
            bitacoraLog.debug('ocurrió un error al consultar las bitácoras', error);
            showError('Ocurrió un error al consultar las bitácoras');
            getBitacoraData();
        });
    } else {
        //Se consulta de la BD del celular
        getBitacoraData();
    }
}

/**
 * Función para guardar las bitácoras
 * @param {*} lstBitacoras 
 * @param {*} callback 
 */
function guardarBitacoras(lstBitacoras, callback) {
    var idSiniestro = window.localStorage.getItem("idSiniestroLocal");
    var caso_id = window.localStorage.getItem("idSiniestroServidor");
    var count = 0;
    BitacoraService.detectarYBorrarBitacorasEliminadasDelServidor(lstBitacoras).finally(() => {
        lstBitacoras.forEach(function (bitacora) {
            //consulta la informacion de la BD movil y hace la validacion de si ya existe
            sqlQuery('SELECT * FROM Bitacora WHERE id = ?', [bitacora.id], function (noExiste) {
                if (noExiste != true) {
                    bitacoraLog.debug('guardando bitacora nueva', bitacora);
                    //Si existe un registro entonces lo actualiza
                    sqlQuery('UPDATE Bitacora SET id = ?, fecha = ?, gestion = ?, subtarea = ?, tiempo = ?, usuario = ?, comentario = ? WHERE id = ?',
                        [bitacora.id, bitacora.fecha, bitacora.gestion, bitacora.subtarea, bitacora.tiempo, bitacora.usuario, bitacora.cometario, bitacora.id], 
                        function() {
                            if(lstBitacoras.length == (count+1)){
                                callback(true);
                            }
                        }
                    );
                } else {
                    bitacoraLog.debug('guardando bitacora existente', bitacora);
                    sqlQuery('INSERT INTO Bitacora (id, fecha, gestion, tiempo, comentario, usuario, subtarea, bitacora_caso , fk_idSiniestro) VALUES (?,?,?,?,?,?,?,?,?)',
                        [bitacora.id, bitacora.fecha, bitacora.gestion, bitacora.tiempo, bitacora.cometario, bitacora.usuario, bitacora.subtarea, caso_id, idSiniestro], 
                        function(last_id) {
                            if(lstBitacoras.length == (count+1)){
                                callback(true);
                            }
                        }
                    );
                }
                if ((count + 1) === lstBitacoras.length) {
                    callback(true);
                }
                count++;
            });
        });
    })
}

/**
 * Función que consulta el listado de bitácoras
 * en base al id del siniestro actual
 */
function getBitacoraData() {
    let numSin = window.localStorage.getItem("idSiniestroServidor"); //Numero de siniestro
    return sqlPromise(`SELECT b.*
        FROM Bitacora b
        WHERE bitacora_caso = ?
        ORDER BY case WHEN date(b.fecha) IS NOT NULL THEN date(b.fecha) ELSE date(b.fecha_orden) END ASC`, [numSin])
    .then(sqlResult => {
        return rowsAsList(sqlResult);
    }).then(listado => {
        resultadosBitacora(listado);
    })
}

/**
 * Función para procesar los datos del
 * siniestro
 * @param {Array<Bitacora>} bitacoras
 */
function resultadosBitacora(bitacoras) {
    var fechaActual = obtenerFechaHHMMSS(new Date());
    var html = '';
    var titleApp = window.localStorage.getItem("titleApp");
    $('#titleApp').html(titleApp);
    if (bitacoras != null) {
        html += '<table class="table tableKronos table-striped table-sm shadow-sm m-0">';
        //Encabezado de tabla
        html += '<thead>' +
            '<tr>' +
            '<th>Fecha</th>' +
            '<th>Tarea</th>' +
            '<th>Tiempo</th>' +
            '<th>Usuario</th>' +
            '</tr>' +
            '</thead>';
        //Elementos de la tabla
        html += '<tbody>';
        var count = 0;
        var tipoBitacora = null;
        var perfilUsuario = window.localStorage.getItem("perfilUsuario");
        bitacoras.forEach(function (bitacora) {
            sqlQuery('SELECT bita_accion_id FROM CatalogoTarea WHERE bita_accion_tex = ? AND bita_accion_facturable = ?', [bitacora.gestion, 'Facturable'], function (noFacturable) {
                if (noFacturable != true) { //Solo muestra las bitácoras facturables
                    tipoBitacora = "Facturable"; //Guarda el tipo de bitacora
                    if (perfilUsuario == "Administrador") { //Usuario con perfil administrador
                        html += '<tr onclick="verBitacora(' + bitacora.idBitacora + ');">' +
                            '<td style="color:#FE8416;">' + fn.formatDate(bitacora.fecha) + '</td>' +
                            '<td>' + bitacora.gestion + '</td>' +
                            '<td>' + bitacora.tiempo + '</td>' +
                            '<td>' + bitacora.usuario + '</td>' +
                            '</tr>';
                    } else { //Usuarios sin perfil administrador
                        //Fechas a objetos Moment
                        var mFechaActual = moment(fechaActual);
                        var mFecha_orden = moment(bitacora.fecha_orden);
                        //Se obtiene la diferencia de cada fecha
                        var validDay = moment.duration(mFechaActual.diff(mFecha_orden, 'days'));
                        var validTime = moment.duration(mFechaActual.diff(mFecha_orden, 'hours'));
                        //Se valida que el día sea el mismo
                        if (validDay == 0 || validDay == "0") {
                            //Se válida que la diferencia de horas sea menor a 2hrs.
                            if (validTime < 2) {
                                html += '<tr onclick="verBitacora(' + bitacora.idBitacora + ');">' +
                                    '<td style="color:#FE8416;">' + fn.formatDate(bitacora.fecha) + '</td>' +
                                    '<td>' + bitacora.gestion + '</td>' +
                                    '<td>' + bitacora.tiempo + '</td>' +
                                    '<td>' + bitacora.usuario + '</td>' +
                                    '</tr>';
                            } else {
                                html += '<tr>' +
                                    '<td style="color:#0081BD;">' + fn.formatDate(bitacora.fecha) + '</td>' +
                                    '<td>' + bitacora.gestion + '</td>' +
                                    '<td>' + bitacora.tiempo + '</td>' +
                                    '<td>' + bitacora.usuario + '</td>' +
                                    '</tr>';
                            }
                        } else {
                            html += '<tr>' +
                                '<td style="color:#0081BD;">' + fn.formatDate(bitacora.fecha) + '</td>' +
                                '<td>' + bitacora.gestion + '</td>' +
                                '<td>' + bitacora.tiempo + '</td>' +
                                '<td>' + bitacora.usuario + '</td>' +
                                '</tr>';
                        }
                    }
                } else if (bitacora.subtarea != 'Non Authorized Time') {
                    tipoBitacora = "No Facturable"; //Guarda el tipo de bitacora
                    if (perfilUsuario == 'Administrador') { //Puede editar las bitacoras no facturables
                        html += '<tr onclick="verBitacoraNoFact(' + bitacora.idBitacora + ');">' +
                            '<td style="color:#FE8416;">' + fn.formatDate(bitacora.fecha) + '</td>' +
                            '<td>' + bitacora.gestion + '</td>' +
                            '<td>' + bitacora.tiempo + '</td>' +
                            '<td>' + bitacora.usuario + '</td>' +
                            '</tr>';
                    } else {
                        html += '<tr>' +
                            '<td style="color:#0081BD;">' + fn.formatDate(bitacora.fecha) + '</td>' +
                            '<td>' + bitacora.gestion + '</td>' +
                            '<td>' + bitacora.tiempo + '</td>' +
                            '<td>' + bitacora.usuario + '</td>' +
                            '</tr>';
                    }
                }
                if (bitacoras.length == (count + 1)) {
                    html += '</tbody>';
                    html += '</table>';
                    $('#resultadoBitacora').html(html);
                }
                count++;
            });
        });
    } else { //SI no hay bitácoras relacionadas
        html += '<h4>No se encontraron resultados</h4>';
        $('#resultadoBitacora').html(html);
    }
}

/* *
 * Funcion que inicializa la pantalla de
 * nueva bitacora facturable
 */
function nuevaBitacoraFacturable() {
    var numCaso = window.localStorage.getItem("idSiniestroServidor");
    numCaso = numCaso != null && numCaso != undefined ?
        numCaso : window.localStorage.getItem("idSiniestroLocal");
    sqlQuery('SELECT * FROM Siniestro WHERE caso_id = ?', [numCaso],
        function (datosSiniestro) {
            if (datosSiniestro != true) {
                var estado_real = datosSiniestro[0].estado;
                if (estado_real === "Finalizado") {
                    showNotice('El caso actual se encuentra finalizado, '
                            +   'no se pueden agregar más bitácoras facturables');
                } else {
                    fn.load('bitFacturable.html');
                    initBitacora('Facturable');
                }
            } else {
                showNotice("No se encontró información del siniestro, intente nuevamente");
            }
        }
    );
}

/**
 * Función que inicializa la pantalla
 * de bitacora no facturable
 */
function nuevaBitacoraNoFacturable() {
    fn.load('bitNoFacturable.html');
    initBitacora("No Facturable");
}

/**
 * Inicializa los datos
 * generales de la pantalla
 * para capturar una nueva bitácora
 */
function initBitacora(tipoBitacora) {
    //Se consultan los datos del usuario logeado
    sqlQuery('SELECT * FROM DatosUsuario', null, function (datos) {
        if (datos != true) {
            $('#usuario_caso').val(datos[0].user_nombre);
        }
        var titleApp = window.localStorage.getItem("titleApp");
        $('#titleApp').html(titleApp);
        $('#comentario').val('');
        document.getElementById('fecha').value = obtenerFecha(new Date());
        validacionNuevaBitacora(); // Se valida el formulario de nueva bitacora
    });

    //Carga el select de tareas
    sqlQuery('SELECT * FROM CatalogoTarea WHERE bita_accion_facturable = ? ORDER BY bita_accion_tex ASC', [tipoBitacora], function (tareas) {
        showLoading();
        if (tareas != true) {
            var selectTareas = '';
            selectTareas += '<ons-select id="select_tareas" name="select_tareas" onchange="loadSubtareas();" required>';
            selectTareas += '<option value="">Seleccione una opción...</option>';
            tareas.forEach(function (tarea) {
                selectTareas += '<option value="' + tarea.bita_accion_id + '" >' + tarea.bita_accion_tex + '</option>';
            });
            selectTareas += '</ons-select>';
            $('#bita_tareas').html(selectTareas);
            if (tipoBitacora === 'Facturable') {
                var caso_id = window.localStorage.getItem("idSiniestroServidor");
                $('#caso_id').val(caso_id);
            } else if (tipoBitacora === 'No Facturable') {
                $('#caso_id').val(0);
            }
        }
        hideLoading();
    });
}

/**
 * Función para ver una bitácora ya creada
 * @param {*} idBitacora 
 */
function verBitacora(idBitacora) {
    bitacoraLog.debug('consultando bitacora con id:', idBitacora);
    window.localStorage.setItem("idBitacoraLocal", idBitacora); //Inicio sesión
    fn.load('bitFacturable.html');
    loadBitacora(idBitacora, "Facturable");
}

function verBitacoraNoFact(idBitacora) {
    bitacoraLog.debug('consultando bitacora con id:', idBitacora);
    window.localStorage.setItem("idBitacoraLocal", idBitacora); //Inicio sesión
    fn.load('bitFacturable.html');
    loadBitacora(idBitacora, "No Facturable");
}

/**
 * Carga la información de una bitácora 
 * facturable ya creada
 * @param {*} idBitacora 
 */
function loadBitacora(idBitacora, tipoBitacora) {
    sqlQuery('SELECT * FROM Bitacora WHERE idBitacora = ?', [idBitacora], function (bitacoraData) {
        if (bitacoraData != true) {
            var bitacora = bitacoraData[0];
            $('#bitacora_id').val(bitacora.id);
            $('#idBitacora').val(bitacora.idBitacora);
            $('#caso_id').val(bitacora.bitacora_caso);
            sqlQuery('SELECT * FROM CatalogoTarea WHERE bita_accion_facturable = ?', [tipoBitacora], function (tareas) {
                if (tareas != true) {
                    var selectTareas = '';
                    selectTareas += '<ons-select id="select_tareas" name="select_tareas" onchange="loadSubtareas();" required>';
                    selectTareas += '<option value="">Seleccione una opción...</option>';
                    tareas.forEach(function (tarea) {
                        if (tarea.bita_accion_tex == bitacora.gestion) {
                            selectTareas += '<option value="' + tarea.bita_accion_id + '" selected>' + tarea.bita_accion_tex + '</option>';
                        } else {
                            selectTareas += '<option value="' + tarea.bita_accion_id + '" >' + tarea.bita_accion_tex + '</option>';
                        }
                    });
                    selectTareas += '</ons-select>';
                    $('#bita_tareas').html(selectTareas);
                    loadSubtareas(bitacora.subtarea);
                }
            });
            sqlQuery('SELECT * FROM DatosUsuario', null, function (datos) {
                var perfilUsuario = null;
                if (datos != true) {
                    $('#usuario_caso').val(datos[0].user_nombre);
                    perfilUsuario = datos[0].tipo_user_nombre;
                }
                // correccion en fecha de bitacoras
                // el servidor guarda las fechas en formato 2020-1-3
                // pero la aplicacion requiere el formato 2020-01-03
                let anio = bitacora.fecha.split('-')[0]
                let mes = bitacora.fecha.split('-')[1]
                let dia = bitacora.fecha.split('-')[2]
                let fechaCorrecta = anio + '-' + mes.padStart(2,0) + '-' + dia.padStart(2,0);
                var titleApp = window.localStorage.getItem("titleApp");
                $('#titleApp').html(titleApp);
                $('#comentario').val(bitacora.comentario);
                $('#fecha').val(fechaCorrecta);
                $('#tiempo').val(bitacora.tiempo);
                optionBitaFact('edita', perfilUsuario);
            });
        }
    });
}

/**
 * Función que se utiliza para 
 * mostrar las opciones de una bitácora
 * facturable ya creada
 * @param {*} accion 
 */
function optionBitaFact(accion, perfil) {
    var html = '';
    if (accion == 'edita') {
        //Botón eliminar
        html += 
            '<ons-button modifier="quiet" style="background-color:#D8DADB;color: #0081BD;" ' +
            'class="center shadow-sm" onclick="deleteBitacora();">' +
            '<ons-icon icon="md-delete" style="color: #FE8416;font-size:18px;"></ons-icon>' +
            '  Eliminar' +
            '</ons-button>&nbsp;';
        //Botón Guardar Cambios
        html += 
            '<ons-button id="btnActualizarBitacora" modifier="quiet" style="background-color:#D8DADB;color: #0081BD;"' +
            'onclick="updateBitacora();">' +
            '<ons-icon icon="md-card-sd" style="color: #FE8416;font-size:18px;"></ons-icon>' +
            '  Guardar Cambios' +
            '</ons-button>';
        //Transferir a tarea no facturable
        if (perfil != undefined) {
            if (perfil != null && perfil == "Administrador") {
                html += '<ons-button modifier="quiet" style="background-color:#D8DADB;color:#0081BD;" ' +
                    'onclick="cambiarTareaNoFact();" >' +
                    '<ons-icon icon="md-shuffle" style="color: #FE8416;font-size:18px;"></ons-icon>' +
                    ' Cambiar a Tarea No Facturable' +
                    '</ons-button>'
            }
        }
        $('#bitaOptions').html(html);
    }
}

/**
 * Función que cambia el select 
 * de subtareas
 */
function loadSubtareas(bitaSubtarea) {
    var idTarea = $('#select_tareas').val();
    sqlQuery('SELECT * FROM CatalogoSubtarea WHERE bita_objetivo_accion = ? ORDER BY bita_objetivo_text ASC', [idTarea], function (subtareas) {
        showLoading();
        if (subtareas != true) {
            var selectSubtareas = '';
            selectSubtareas += '<ons-select id="select_subtareas" name="select_subtareas" required>';
            selectSubtareas += '<option value="">Seleccione una opción...</option>';
            subtareas.forEach(function (subtarea) {
                if (subtarea.bita_objetivo_text == bitaSubtarea) {
                    selectSubtareas += '<option value="' + subtarea.bita_objetivo_id + '" selected>' + subtarea.bita_objetivo_text + '</option>';
                } else {
                    selectSubtareas += '<option value="' + subtarea.bita_objetivo_id + '" >' + subtarea.bita_objetivo_text + '</option>';
                }
            });
            selectSubtareas += '</ons-select>';
            $('#bita_subtarea').html(selectSubtareas);
        }
        hideLoading();
    });
}

/**
 * Función para actualizar los datos de
 * una bitácora
 */
function updateBitacora() {
    document.getElementById('btnActualizarBitacora').setAttribute('disabled', 'disabled');
    document.getElementById('btnActualizarBitacora').insertAdjacentHTML('beforeend', `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style="margin-bottom: 2px;"></span>`)
    var updateBitacora = 'UPDATE Bitacora SET id = ?, ' +
        'fecha_orden = ?, ' +
        'fecha = ?, ' +
        'gestion = ?, ' +
        'tiempo = ?, ' +
        'comentario = ?, ' +
        'usuario = ?, ' +
        'subtarea = ?, ' +
        'bitacora_caso = ?, ' +
        'fk_idSiniestro = ?, ' +
        'bitacora_observacion = ?, ' +
        'anio = ?, ' +
        'mes = ?, ' +
        'dia = ?, ' +
        'bitacora_accion = ?, ' +
        'objetivo = ?, ' +
        'bitacora_tiempo = ? WHERE idBitacora = ?';

    var idTarea = $('#select_tareas').val();
    var idSubtarea = $('#select_subtareas').val();
    var idBitacora = $('#idBitacora').val();
    var gestion;
    var subtarea;

    //Se obtiene la tarea en base al id
    sqlQuery('SELECT * FROM CatalogoTarea WHERE bita_accion_id = ?', [idTarea], function (tareas) {
        if (tareas != true) {
            gestion = {
                tarea_id: idTarea,
                tarea_tex: tareas[0].bita_accion_tex
            };
            //Se obtiene la subtarea en base al id
            sqlQuery('SELECT * FROM CatalogoSubtarea WHERE bita_objetivo_accion = ? AND bita_objetivo_id = ? LIMIT 1', [idTarea, idSubtarea], function (subtareas) {
                if (subtareas != true) {
                    subtarea = {
                        subtarea_id: idSubtarea,
                        subtarea_tex: subtareas[0].bita_objetivo_text
                    };
                    //Se obtienen los datos del usuario actual
                    sqlQuery('SELECT * FROM DatosUsuario', null, function (datosUser) {
                        if (datosUser != true) {
                            var bitacoraParams = getBitacoraParams(gestion, subtarea, datosUser[0].user_iniciales); //Se genera el objeto JSON de bitacora
                            var params = fn.JsonToArray(bitacoraParams);
                            params.push(idBitacora);
                            sqlQuery(updateBitacora, params, function (success) {
                                showSuccess('Se han guardado los cambios');
                                if (bitacoraParams.id != null) {
                                    sendCambiosBitacora(bitacoraParams);
                                } else {
                                    bitacora();
                                }
                            });
                        } else {
                            showNotice("No se obtuvo la información del ajustador actual");
                        }
                    });
                } else {
                    showNotice("No se encontró la subtarea seleccionada");
                }
            });
        } else {
            showNotice("No se encontró la tarea seleccionada");
        }
    });
}

/**
 * Función que envia o almacena la petición para
 * cambiar o modificar los datos de una
 * bitácora
 * @param {*} bitacoraParams 
 */
function sendCambiosBitacora(bitacoraParams) {
    var tipo_oper = 'UPD';
    var idSiniestro = window.localStorage.getItem("idSiniestroServidor");
    var bitacora_id = $('#bitacora_id').val();
    var params = {
        filt_caso: idSiniestro,
        tipo_oper: tipo_oper,
        bitacora_observacion: bitacoraParams.comentario,
        bitacora_id: bitacora_id,
        bitacora_accion: bitacoraParams.bitacora_accion,
        objetivo: bitacoraParams.objetivo,
        anio: bitacoraParams.anio,
        mes: bitacoraParams.mes,
        dia: bitacoraParams.dia,
        bitacora_tiempo: bitacoraParams.bitacora_tiempo
    }

    sqlQuery('INSERT INTO CambioBitacora (filt_caso, ' +
            'tipo_oper, ' +
            'bitacora_observacion, ' +
            'bitacora_id, ' +
            'bitacora_accion, ' +
            'objetivo, ' +
            'anio, ' +
            'mes, ' +
            'dia, ' +
            'bitacora_tiempo) VALUES (?,?,?,?,?,?,?,?,?,?)', fn.JsonToArray(params),
            function (last_id) {
                guardarPeticion('siniestro_bitacora.php', 'put', 'CambioBitacora', 'idCambioBitacora', last_id);
                showSuccess('Se ha guardado el cambio de bitacora con éxito');
                bitacora();
                if(verificarConexion() == true) {
                    syncLocalData('sync');
                }
            }, true);
}

/**
 * Función para eliminar una bitácora
 */
function deleteBitacora() {
    var bitacora_id = $('#bitacora_id').val();
    var idBitacora = $('#idBitacora').val();
    bitacoraLog.debug('borrando bitacora con id', idBitacora)
    sqlQuery('SELECT * FROM Bitacora WHERE idBitacora = ?', [idBitacora], function (bitacoraData) {
        if (bitacoraData != true) {
            sqlQuery('DELETE FROM Bitacora WHERE idBitacora = ?', [idBitacora], function (success) {
                if (success) {
                    if (bitacoraData[0].id != null) {
                        sqlQuery('INSERT INTO BitacoraEliminar(bitacora_id) VALUES (?)', [bitacora_id], function (last_id_bitEliminar) {
                            bitacora();
                            if (last_id_bitEliminar) {
                                showSuccess('Se ha eliminado la bitácora ' + bitacora_id);
                                var urlController = 'siniestro_bitacora.php?bitacora_id=' + bitacora_id;
                                guardarPeticion(urlController, 'DELETE', 'BitacoraEliminar', 'idBitacoraEliminar', last_id_bitEliminar, function(success){
                                    if(verificarConexion() == true) {
                                        syncLocalData('sync');
                                    }
                                });
                            }
                        }, true);
                    } else {
                        deletePeticion('Bitacora', 'idBitacora', bitacoraData[0].idBitacora, 'PEND', function (success) {
                            showSuccess('Se ha eliminado la bitácora ' + idBitacora);
                            bitacora();
                        });
                    }
                } else {
                    showError('Ocurrió un error al eliminar la bitácora ' + bitacora_id);
                }
            });
        } else {
            showError('No se pudo obtener la bitácora');
        }
    });
}

/**
 * Función para cambiar la tarea de una 
 * bitacora a NO Facturable
 */
function cambiarTareaNoFact() {
    var tipo_oper = 'NOFACT';
    var detalle = $('#comentario').val();;
    var bitacora_id = $('#bitacora_id').val();
    if (bitacora_id.trim() === "") {
        bitacora_id = null;
    }
    var idBitacora = $('#idBitacora').val();
    var idSiniestro = window.localStorage.getItem("idSiniestroServidor");
    bitacoraLog.debug('cambiando la tarea a no facturable', {bitacora_id, idBitacora, idSiniestro});
    var params = {
        filt_caso: idSiniestro,
        tipo_oper: tipo_oper,
        bitacora_observacion: detalle,
        bitacora_id: bitacora_id
    }
    sqlQuery('SELECT * FROM Bitacora WHERE idBitacora = ?', [idBitacora], function (bitacoraData) {
        if (bitacoraData != true) {
            var coment_original = bitacoraData[0].comentario;
            coment_original = coment_original ? coment_original : '';
            if (coment_original.trim() === detalle.trim()) {
                showError('Capture motivo de cambio a No Facturable');
            } else {
                if (params.bitacora_id != null) {
                    if (verificarConexion() == true) {
                        sendRequest('put', 'siniestro_bitacora.php', params, function (response) {
                            if (response.resultados) {
                                response.resultados.forEach(function (bitacora) {
                                    sqlQuery('UPDATE Bitacora SET fecha_orden = ?, fecha = ?, gestion = ?, tiempo = ?, comentario = ?, usuario = ?, subtarea = ? WHERE id = ?',
                                        [bitacora.fecha_orden, bitacora.fecha, bitacora.gestion, bitacora.tiempo, bitacora.cometario, bitacora.usuario, bitacora.subtarea, bitacora.id],
                                        function (success) {
                                            showSuccess('Se ha guardado el cambio de bitacora con éxito');
                                            hideLoading();
                                        });
                                });
                            }
                            showLoading();
                            bitacora();
                        }, function (error) {
                            guardarCambioBitacora(idBitacora, params);
                        })
                    } else {
                        guardarCambioBitacora(idBitacora, params);
                    }
                } else {
                    guardarCambioBitacora(idBitacora, params);
                }
            }
        } else {
            guardarCambioBitacora(idBitacora, params);
        }
    });
}

/**
 * Función para actualizar una bitacora a 
 * no facturable en la base de datos
 * local
 * @param {*} idBitacora 
 */
function updateBitaNoFact(idBitacora) {
    sqlQuery('SELECT * FROM CatalogoTarea WHERE bita_accion_id = ?', [2], function (tareaData) {
        if (tareaData != true) {
            sqlQuery('SELECT * FROM CatalogoSubtarea WHERE bita_objetivo_accion = ? AND bita_objetivo_id = ?', [2, 75], function (subtareaData) {
                sqlQuery('UPDATE Bitacora SET gestion = ?, subtarea = ? WHERE idBitacora = ?',
                    [tareaData[0].bita_accion_tex, subtareaData[0].bita_objetivo_text, idBitacora],
                    function (success) {
                        bitacora();
                        showSuccess('Se ha cambiado la bitácora a tarea no facturable');
                    });
            });
        }
    });
}

/**
 * Función para guardar los cambios de una
 * bitacora facturable a una no
 * facturable
 * @param {*} idBitacora 
 * @param {*} params 
 */
function guardarCambioBitacora(idBitacora, params) {
    var arrayParams = fn.JsonToArray(params);
    arrayParams.push(idBitacora);
    sqlQuery('INSERT INTO CambioBitacora (filt_caso, tipo_oper, bitacora_observacion, bitacora_id, fk_idBitacora) VALUES (?,?,?,?,?)',
        arrayParams,
        function (last_id) {
            guardarPeticion('siniestro_bitacora.php', 'put', 'CambioBitacora', 'idCambioBitacora', last_id);
            updateBitaNoFact(idBitacora);
        }, true);
}

/**
 * Guarda una bitacora facturable y 
 * regresa a la pantalla de bitácoras
 */
function guardarBitacoraFacturableYSalir() {
    isFacturable = true;
    salir = true;
    $('#nuevaBitacoraFact').submit();
}

/**
 * Guarda una bitacora facturable y 
 * prepara la pantalla para capturar una 
 * nueva bitácora
 */
function guardarBitacoraFacturableYNueva() {
    isFacturable = true;
    salir = false;
    $('#nuevaBitacoraFact').submit();
}

/**
 * Guarda una bitacora no facturable y
 * regresa al listado de bitácoras
 */
function guardarBitacoraNoFacturableYSalir() {
    isFacturable = false;
    salir = true;
    $('#nuevaBitacoraFact').submit();
}

/**
 * Guarda una bitacora no facturable y prepara 
 * la pantalla para capturar una nueva bitácora
 */
function guardarBitacoraNoFacturableYNueva() {
    isFacturable = false;
    salir = false;
    $('#nuevaBitacoraFact').submit();
}

/**
 * Función que inserta una nueva
 * bitácora en la base de datos
 */
function guardarBitacora(url, callback, salir) {
    let botonCrearYSalir = document.getElementById('btnCrearYSalirBitacora');
    let botonCrearYNuevo = document.getElementById('btnCrearYNuevoBitacora');
    botonCrearYSalir.setAttribute('disabled', 'disabled');
    botonCrearYNuevo.setAttribute('disabled', 'disabled');
    if (salir)
        botonCrearYSalir.insertAdjacentHTML('beforeend', `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>`);
    else
        botonCrearYNuevo.insertAdjacentHTML('beforeend', `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>`)
    var query = 'INSERT INTO Bitacora (id, ' +
        'fecha_orden, ' +
        'fecha, ' +
        'gestion, ' +
        'tiempo, ' +
        'comentario, ' +
        'usuario, ' +
        'subtarea, ' +
        'bitacora_caso, ' +
        'fk_idSiniestro, ' +
        'bitacora_observacion, ' +
        'anio, ' +
        'mes, ' +
        'dia, ' +
        'bitacora_accion, ' +
        'objetivo, ' +
        'bitacora_tiempo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    var idTarea = $('#select_tareas').val();
    var idSubtarea = $('#select_subtareas').val();
    var gestion;
    var subtarea;

    //Se obtiene la tarea en base al id
    sqlQuery('SELECT * FROM CatalogoTarea WHERE bita_accion_id = ?', [idTarea], function (tareas) {
        if (tareas != true) {
            gestion = {
                tarea_id: idTarea,
                tarea_tex: tareas[0].bita_accion_tex
            };
            //Se obtiene la subtarea en base al id
            sqlQuery('SELECT * FROM CatalogoSubtarea WHERE bita_objetivo_accion = ? AND bita_objetivo_id = ? LIMIT 1', [idTarea, idSubtarea], function (subtareas) {
                if (subtareas != true) {
                    subtarea = {
                        subtarea_id: idSubtarea,
                        subtarea_tex: subtareas[0].bita_objetivo_text
                    };
                    //Se obtienen los datos del usuario actual
                    sqlQuery('SELECT * FROM DatosUsuario', null, function (datosUser) {
                        if (datosUser != true) {
                            var bitacora = getBitacoraParams(gestion, subtarea, datosUser[0].user_iniciales); //Se genera el objeto JSON de bitacora
                            //Se guarda la nueva bitacora
                            sqlQuery(query, fn.JsonToArray(bitacora), function (last_id) {
                                //Se guarda la peticion del post
                                guardarPeticion(url, 'POST', 'Bitacora', 'idBitacora', last_id, function (saved) {
                                    if (saved) {
                                        callback(true);
                                    }
                                });
                            }, true);
                        } else {
                            showNotice("No se obtuvo la información del ajustador actual");
                        }
                    });
                } else {
                    showNotice("No se encontró la subtarea seleccionada");
                }
            });
        } else {
            showNotice("No se encontró la tarea seleccionada");
        }
    });
}

/**
 * Función que obtiene los datos para agregar
 * una nueva bitácora del siniestro
 * @param {*} gestion 
 * @param {*} subtarea 
 * @param {*} user_iniciales 
 */
function getBitacoraParams(gestion, subtarea, user_iniciales) {
    var idSiniestro = window.localStorage.getItem("idSiniestroLocal");
    var caso_id = $('#caso_id').val();
    /* var caso_id = window.localStorage.getItem("idSiniestroServidor"); */
    var fecha = $('#fecha').val();
    var tiempo = $('#tiempo').val();
    var comentario = $('#comentario').val();
    var fechaActual = obtenerFechaHHMMSS(new Date());
    var bitacora_id = $('#bitacora_id').val();

    var bitacora = {
        id: bitacora_id ? bitacora_id : null,
        fecha_orden: fechaActual ? fechaActual : null,
        fecha: fecha ? fecha : null,
        gestion: gestion.tarea_tex ? gestion.tarea_tex : "No especificada",
        tiempo: tiempo ? tiempo : null,
        comentario: comentario ? comentario : null,
        usuario: user_iniciales ? user_iniciales : null,
        subtarea: subtarea.subtarea_tex ? subtarea.subtarea_tex : "No especificada",
        bitacora_caso: caso_id ? caso_id : null,
        fk_idSiniestro: idSiniestro ? idSiniestro : null,
        bitacora_observacion: comentario ? comentario : null,
        anio: fecha.split("-")[0] ? fecha.split("-")[0] : null,
        mes: fecha.split("-")[1] ? fecha.split("-")[1] : null,
        dia: fecha.split("-")[2] ? fecha.split("-")[2] : null,
        bitacora_accion: gestion.tarea_id ? gestion.tarea_id : null,
        objetivo: subtarea.subtarea_id ? subtarea.subtarea_id : null,
        bitacora_tiempo: tiempo ? tiempo : null
    }
    return bitacora;
}

/**
 * Limpia los campos del formulario
 */
function limpiarCampos() {
    $('#bitacora_tarea').val("");
    $('#bitacora_subtarea').val("");
    $('#usuario_caso').val('');
    $('#fecha').val('');
    $('#comentario').val('');
    $('#tiempo').val('');
}

/**
 * Función que válida el formulario de 
 * bitácora
 */
function validacionNuevaBitacora() {
    $('#nuevaBitacoraFact').validate({
        errorClass: "errorForm",
        validClass: "validForm",
        submitHandler: function () {
            if (isFacturable == true) {
                guardarBitacora('siniestro_bitacora.php', function (result) {
                    if (result == true) {
                        showSuccess('Se ha guardado la bitácora correctamente');
                        limpiarCampos();
                        if (salir == true) {
                            bitacora();
                        } else if (salir == false) {
                            nuevaBitacoraFacturable();
                        }
                    } else {
                        showNotice('Ocurrió un error al guardar la bitácora');
                    }
                }, salir);
            } else {
                guardarBitacora('siniestro_bitacora.php', function (result) {
                    if (result == true) {
                        showSuccess('Se ha guardado la bitácora correctamente');
                        limpiarCampos();
                        if (salir == true) {
                            bitacora();
                        } else if (salir == false) {
                            nuevaBitacoraNoFacturable();
                        }
                    } else {
                        showNotice('Ocurrió un error al guardar la bitácora');
                    }
                }, salir);
            }
        },
        invalidHandler: function (event, validator) {
            if (validator.numberOfInvalids()) {
                showError("Revisa los campos marcados");
            }
        }
    });
}
