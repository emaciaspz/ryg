"use strict";
var inspeccionLog = getLogger('inspeccion');
/**
 * Funcion que muestra los datos de inspección
 */

function inspeccion(page) {
    // si esta en la pantalla de nuevo gasto y esta eligiendo un ajustador
    // se debe ocultar la seleccion del ajustador
    let seleccionAjustador = document.getElementById('seleccionarAjustador');
    if (seleccionAjustador != null && seleccionAjustador.style.display == 'block') {
        document.querySelectorAll('ons-card').forEach(card => card.style.display = 'block');
        document.getElementById('seleccionarAjustador').style.display = 'none';
        return;
    }
    fn.load('inspeccion.html');
    window.localStorage.removeItem("inspeccion_id_login");
    window.localStorage.removeItem("idInspeccion_login");
    var numSin = window.localStorage.getItem("idSiniestroServidor");
    if (verificarConexion() == true && page == 1) {
        let inspecciones = InspeccionService.obtenerInspeccionesInternet(numSin, page)
            .then(response => InspeccionService.actualizarInspecciones(response, numSin, page))
            .then(() => InspeccionService.actualizarPaginacion(numSin))
            .catch(error => {
                showError('No se pudo sincronizar las inspecciones')
                inspeccionLog.error('Error al obtener inspecciones internet', error)
            })
            .then(() => InspeccionService.obtenerInspeccionesBD(numSin, page))
            .then(lista => resultadosInspeccion(lista, page, numSin))
            .catch(error => {
                showError('No se pudo obtener las inspecciones')
                inspeccionLog.error('Error al obtener las inspecciones', error)
            })

    } else {
        let inspecciones = InspeccionService.obtenerInspeccionesBD(numSin, page)
            .then(lista => resultadosInspeccion(lista, page, numSin))
            .catch(error => {
                showError('No se pudo obtener las inspecciones')
                inspeccionLog.error('Error al obtener las inspecciones', error)
            });
    }
}

/**
/**
 * Función para procesar los datos del
 * siniestro
 */
function resultadosInspeccion(siniestros, pageActual, numSin) {
    var estadoInspecciones = siniestros.map(inspeccion => { 
        return {'id': inspeccion.inspeccion_id, 'estado': inspeccion.estado}
    });
    inspeccionLog.debug('estado inspecciones', estadoInspecciones);
    var html = '';
    var titleApp = window.localStorage.getItem("titleApp");
    $('#titleApp').html(titleApp);
    var gastoUserLim = window.localStorage.getItem("limitGastoUsuario");
    window.localStorage.setItem("limitGastoUsuario", 10);
    gastoUserLim = 10;
    var totalRegIns = window.localStorage.getItem("totalRegIns");
    window.localStorage.removeItem('inspeccion_id');
    var agregarTabla = (html, total, paginaActual) => {
        if (total > 0) {
            html += fn.pagination(total, paginaActual);
            html += fn.dataViewed(total, paginaActual, fn.dinamicLimit(gastoUserLim ? gastoUserLim : 10)); //Indica numero de resultados
        }
        $('#inspeccionSiniestro').html(html);
        $('#page-' + pageActual).addClass("active");
        if (siniestros != null) {
            //Funcion cuando se presiona el botón
            $('.pagNumberPage').click(function () {
                let id = $(this).attr('id');
                console.error('id', id);
                let pageObj = id.split("-")[1];
                console.error(parseInt(pageObj))
                inspeccion(parseInt(pageObj));
            });
        }
    }
    if (siniestros != null && siniestros.length > 0) {
        if (totalRegIns < siniestros.length) {
            totalRegIns = siniestros.length;
        }

        html += '<table id="resultadoInspeccion" ' +
            'class="table tableKronos table-striped table-sm shadow-sm"' +
            'style="width: 100%">';

        html += '<thead>' +
            '<tr>' +
            '<th>Creación</td>' +
            '<th>Inspector</td>' +
            '<th>Estado</td>' +
            '</tr>' +
            '</thead>';

        siniestros.forEach(function (data) {
            html += '<tbody>';

            html += '<tr onclick="verInspeccion(' + data.inspeccion_id + ',' + data.tableInspeccionID + ',' + numSin + ');">' +
                '<td style="color:#FE8416;">' + fn.formatDate(data.fecha.split(" ")[0]) + '</td>' +
                '<td>' + data.inspector + '</td>' +
                '<td>' + data.estado + '</td>' +
                '</tr>';

            html += '</tbody>';
        });
        html += '</table>';
        inspeccionLog.debug('registro totales, pagina actual', totalRegIns, pageActual)
        InspeccionService.obtenerTotal(numSin).then(total => {
            agregarTabla(html, total, pageActual)
        })
    } else {
        html += '<center><h4>No se encontraron resultados</h4></center>';
    }   
    agregarTabla(html, 0, pageActual);
}

/**
 * Función para consultar los datos
 * especificos de una inspeccion
 * @param {*} inspeccion_id Id de inspeccion del servidor
 * @param {*} idInspeccion id inspeccion local
 * @param {*} numSin numero siniestro
 */
function verInspeccion(inspeccion_id, idInspeccion, numSin) {
    inspeccionLog.debug('cargango ', inspeccion_id, idInspeccion, numSin)
    window.localStorage.setItem("inspeccion_id_login", inspeccion_id);
    window.localStorage.setItem("idInspeccion_login", idInspeccion);
    // inspeccion
    window.localStorage.setItem("inspeccion_id", idInspeccion);
    window.localStorage.setItem("idInspeccionServidor", inspeccion_id);
    fn.load('inspeccionSeleccionada.html');
    inspeccionLog.debug('obteniendo informacion inspeccion', inspeccion_id, idInspeccion, numSin)
    InspeccionService.obtenerDetallePorIdInspeccion(idInspeccion)
        .then(detalle => {
            return InspeccionService.tienePeticionesPendientes(detalle.inspeccion_id).then(tienePendiente => {
                if (!tienePendiente && detalle.inspeccion_id != null && verificarConexion()) {
                    // ACTUALIZAR si no tiene pendientes y ya esta en el servidor(inspeccion_id != null)
                    InspeccionService.obtenerDetalleInternet(inspeccion_id)
                        .then(InspeccionService.actualizarDetalleServidor)
                        .then(() => mostrarInspeccion(idInspeccion))
                } else {
                    mostrarInspeccion(idInspeccion)
                }
            })
        })
        .catch(error => {
            if (error == 'No hay datos' && inspeccion_id != null && verificarConexion()) {
                return InspeccionService.obtenerDetalleInternet(inspeccion_id)
                    .then(detalle => InspeccionService.agregarIdInspeccion(detalle, inspeccion_id))
                    .then(detalle => InspeccionService.insertarDetalleInternet(detalle, inspeccion_id))
                    .then(idInspeccion => {
                        inspeccionLog.debug('mostrando detalle ', idInspeccion);
                        return mostrarInspeccion(idInspeccion)
                    })
                    .then(() => showSuccess("Se han obtenido los detalles de la inspección"))
                    .catch(error => {
                        inspeccionLog.error('No se pudo obtener los detalles de la inspección', error)
                        showError('No se pudo sincronizar la inspeccion')
                        inspeccion(1)
                    })
            } else if (inspeccion_id != null) {
                showError('No hay conexion')
                inspeccion(1)
            } else {
                showError('No se pudo obtener el detalle');
                inspeccion(1);
            }
        })
}

function mostrarInspeccion(idInspeccion) {
    var numSin = window.localStorage.getItem("idSiniestroServidor");
    var titleApp = window.localStorage.getItem("titleApp");
    
    InspeccionService.obtenerDetallePorIdInspeccion(idInspeccion)
        .then(detalle => {
            return InspeccionService.obtenerInspeccion(detalle.idInspeccion)
                .then(inspeccion => {
                    return InspeccionService.obtenerSiniestro(numSin)
                        .then(siniestro => {
                            return {
                                siniestro,
                                inspeccion,
                                detalle
                            }
                        })
                })
        })
        .then(informacion => {
            let detalle = informacion.detalle
            let inspeccion = informacion.inspeccion
            let siniestro = informacion.siniestro;
            console.error('siniestro', siniestro);
            if (siniestro.estado_real == null || siniestro.estado_real.trim() == '') {
                let numSin = window.localStorage.getItem("idSiniestroServidor");
                $('#encabezado-siniestro').html(`
                    <ons-icon icon="md-info" style="vertical-align: middle;"> </ons-icon>
                    <span style="vertical-align: middle;"> Siniestro no disponible</span>
                    <ons-button modifier="quiet" style="font-size: inherit; margin: 0; padding: 0" 
                        onclick="descargarInformacionSiniestro(${numSin})">Descargar</ons-button>
                `)
            }
            inspeccionLog.warn('mostrar inspeccion', {detalle, inspeccion})
            //validateFormInspeccionSeleccionada();
            var estadoActualIns;
            $('#titleApp').html(titleApp);
            // detalle
            $("input[name='idInspeccion']").val(detalle.idInspeccion);
            $('#idDetalleInspeccion').val(detalle.idDetalleInspeccion);
            $('#idAtendido').val(detalle.inspeccion_contacto);
            $('#idDatosContacto').val(detalle.inspeccion_mail);
            $('#idDeclaracion').val(detalle.inspeccion_declaracion);
            $('#idDescripcion').val(detalle.inspeccion_descrip);
            $('#idAlcance').html(detalle.inspeccion_dano_estr);
            $('#idPresupuesto').html(detalle.inspeccion_almacen);
            $('#idNotas').html(detalle.inspeccion_comentario);
            $('#dateInspeccion').val(detalle.dateInspeccion);
            estadoActualIns = detalle.inspeccion_estado;

            if (detalle.inspeccion_estado == 2) {
                var btn = '';
                btn += '<center>';
                btn += '<ons-button modifier="quiet" onclick="openEnviarIns();" class="center sh-none"' +
                    'style="font-size: 16px;color: #0081BD;background-color: #D8DADB;width: 120px;">' +
                    '<ons-icon icon="paper-plane" style="color: #FE8416;"></ons-icon> ' +
                    'Enviar' +
                    '</ons-button><br/>'
                btn += '</center>';
                $('#contentEnviar').html(btn);
            }
            // siniestro
            window.localStorage.setItem("inspeccion_id", inspeccion.tableInspeccionID);
            //Si no se encuentra la fecha del detalle de inspeccion, se coloca de la inspeccion en general
            if (detalle == null || detalle == undefined) {
                try {
                    $('#dateInspeccion').val(inspeccion.fecha.split(" ")[0]);
                } catch(err) {
                    $('#dateInspeccion').val('');
                }
            }
            $('#idSiniestro').val(siniestro.idSiniestro);
            $('#numeroSiniestro').val(siniestro.caso_n_siniestro);
            if (siniestro.cia_seg == null || siniestro.cia_seg == undefined || siniestro.cia_seg == "") {
                $('#ciaSeguros').val("");
            } else {
                $('#ciaSeguros').val(siniestro.cia_seg);
            }
            if (siniestro.asegurados == null || siniestro.asegurados == undefined || siniestro.asegurados == "") {
                $('#asegurado').val("");
            } else {
                $('#asegurado').val(siniestro.asegurados);
            }
            $('#causas').val(siniestro.causas);
            if (siniestro.caso_fech_ocurren != null && siniestro.caso_fech_ocurren != '') {
                $('#fechaSiniestro > input').val(siniestro.caso_fech_ocurren);
            }
            $('[data-ajustador-id]').val(detalle.inspeccion_inspector);
            $('[data-ajustador-id-defecto]').val(detalle.inspeccion_inspector);
            CatalogoService.obtenerAjustadorPorId(detalle.inspeccion_inspector).then(ajustador => {
                $('[data-ajustador-nombre]').val(ajustador.nombre);
                $('[data-ajustador-nombre-defecto]').val(ajustador.nombre);
                $('[data-ajustador-iniciales]').val(ajustador.iniciales);
                $('[data-ajustador-iniciales-defecto]').val(ajustador.iniciales);
            }).catch(e => {
                $('[data-ajustador-nombre]').val(inspeccion.inspector);
                $('[data-ajustador-nombre-defecto]').val(inspeccion.inspector);
                $('[data-ajustador-iniciales]').val(inspeccion.inspector);
                $('[data-ajustador-iniciales-defecto]').val(inspeccion.inspector);
            })
            $('#estado').val(inspeccion.estado);
            // estado
            var estadoActualName;
            sqlQuery('SELECT * FROM CatalogoEstadoInspeccion', null, function (lstEstado) {
                var selectEstado = '';
                if (lstEstado != true) {
                    selectEstado += '<input type="hidden" id="estado"/>';
                    // selectEstado += '<ons-select id="idEstado" class="border-0 rounded shadow-sm form-control" style="color: #0081BD;width: 100%;font-size: 18px; font-weight:bold;padding-left: 30% !important;" onchange="updateEstado();">';
                    selectEstado += '<ons-select id="idEstado" class="" onchange="updateEstado();">';
                    selectEstado += '<option value="" >Seleccione una opción</option>';
                    lstEstado.forEach(function (estado) {
                        if (estado.estado_inspecc_id == estadoActualIns) {
                            selectEstado += '<option value="' + estado.estado_inspecc_id + '" selected>' + estado.estado_inspecc_nombre + '</option>';
                            estadoActualName = estado.estado_inspecc_nombre;
                        } else {
                            selectEstado += '<option value="' + estado.estado_inspecc_id + '" >' + estado.estado_inspecc_nombre + '</option>';
                        }
                    });
                    selectEstado += '</ons-select>';
                    $('#selectEstado').html(selectEstado);
                    $('#estado').val(estadoActualName);
                }
            });
        });
}


function updateEstado() {
    var idEstado = $('#idEstado').val();
    sqlQuery('SELECT * FROM CatalogoEstadoInspeccion WHERE estado_inspecc_id = ?', [idEstado], function (estadoInspeccion) {
        inspeccionLog.debug('actualizando estado formulario', {idEstado, 'nombre': estadoInspeccion[0].estado_inspecc_nombre,})
        if (estadoInspeccion != true) {
            $('#estado').val(estadoInspeccion[0].estado_inspecc_nombre);
        }
    });
}

function abrirNuevaInspeccion() {
    fn.load('nuevaInspeccion.html');
    var numSin = window.localStorage.getItem("idSiniestroServidor");
    sqlQuery('SELECT * FROM Siniestro WHERE caso_id = ?', [numSin], function (siniestro) {
        if (siniestro != true) {
            mostrarNuevaInspeccion(siniestro);
        } else {
            showNotice("Ha ocurrido un error inesperado");
        }
    });
}

function mostrarNuevaInspeccion(siniestro) {
    console.error('siniestro', siniestro)
    let numSin = window.localStorage.getItem("idSiniestroServidor");
    let titleApp = window.localStorage.getItem("titleApp");
    $('#titleApp').html(titleApp);
    if (siniestro == null) {
        showNotice('No se encontraron resultados');
        return;
    }
    CatalogoService.obtenerDatosUsuarioActual().then(datosUsuario => {
        $('[data-ajustador-nombre]').val(datosUsuario.user_nombre);
        $('[data-ajustador-nombre-defecto]').val(datosUsuario.user_nombre);
        $('[data-ajustador-iniciales]').val(datosUsuario.user_iniciales);
        $('[data-ajustador-iniciales-defecto]').val(datosUsuario.user_iniciales);
        $('[data-ajustador-id]').val(datosUsuario.user_id);
        $('[data-ajustador-id-defecto]').val(datosUsuario.user_id);
        $('#gastos_fecha_real').val(obtenerFecha(new Date()));
    }).finally(() => {
        $('#numeroSiniestro').html(siniestro[0].caso_n_siniestro);
        if (siniestro[0].cia_seg == null || siniestro[0].cia_seg == undefined || siniestro[0].cia_seg == "") {
            $('#ciaSeguros').val("");
        } else {
            $('#ciaSeguros').val(siniestro[0].cia_seg);
        }
        if (siniestro[0].asegurados == null || siniestro[0].asegurados == undefined || siniestro[0].asegurados == "") {
            $('#asegurado').val("");
        } else {
            $('#asegurado').val(siniestro[0].asegurados);
        }
        $('#fechaSiniestro').val(siniestro[0].caso_fech_ocurren);
    })
}

/**
 * Función para crear una nueva inspección
 * junto con su detalle inspeccion
 */
function crearInspeccion() {
    document.getElementById('btnCrearInspeccion').setAttribute('disabled', 'disabled');
    document.getElementById('btnCrearInspeccion').insertAdjacentHTML('beforeend', `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style="margin-bottom: 2px;"></span>`)
    var numSin = window.localStorage.getItem("idSiniestroServidor");
    var inspeccion_inspector = $('[data-ajustador-id]').val();
    var inspeccion_contacto = $('#idAtendido').val();
    var inspeccion_mail = $('#idDatosContacto').val();
    var inspeccion_declaracion = $('#idDeclaracion').val();
    var inspeccion_descrip = $('#idDescripcion').val();
    var inspeccion_dano_estr = $('#idAlcance').val();
    var inspeccion_almacen = $('#idPresupuesto').val();
    var inspeccion_comentario = $('#idNotas').val();
    var iniciales_ajustador = $('[data-ajustador-iniciales]').val();
    var fecha_inspeccion = obtenerFecha(new Date());
    var dateInspeccion = fn.getDateYMD(new Date());
    var inspeccion_id = window.localStorage.getItem("inspeccion_id");

    var estado = 'Pendiente';
    var pageIni = window.localStorage.getItem("lastPageIns");
    sqlPromise('INSERT INTO Inspeccion (fecha, inspector, estado, caso_id, page) VALUES (?,?,?,?,?)', 
                [fecha_inspeccion, iniciales_ajustador, estado, numSin, 1])
        .then(r => r.insertId)
        .then(idInspeccion => sqlPromise('INSERT INTO DetalleInspeccion (dateInspeccion, inspeccion_estado, correspon_caso, inspeccion_tipo, inspeccion_contacto, inspeccion_mail, inspeccion_dano_estr, inspeccion_declaracion, inspeccion_descrip, inspeccion_comentario, inspeccion_almacen, caso_id, idInspeccion, inspeccion_id, inspeccion_inspector) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [dateInspeccion, 1, numSin, 4, inspeccion_contacto, 
                    inspeccion_mail, inspeccion_dano_estr, inspeccion_declaracion, 
                    inspeccion_descrip, inspeccion_comentario, inspeccion_almacen, 
                    numSin, idInspeccion, inspeccion_id, inspeccion_inspector])
                .then(r => {
                    return {
                        idInspeccion: idInspeccion,
                        idDetalleInspeccion: r.insertId
                    }
                })
        )
        .then(insertado => {
            localStorage.removeItem('formularioInspeccion'); // limpiar datos temporales del formulario
            return guardarPeticionPromise('inspeccion_detalle.php', 'POST', 'DetalleInspeccion', 'idDetalleInspeccion', insertado.idDetalleInspeccion)
                .then(() => {
                    showSuccess("Se ha creado la inspección correctamente");
                    var totalRegIns = window.localStorage.getItem("totalRegIns");
                    window.localStorage.removeItem("totalRegIns");
                    totalRegIns++;
                    window.localStorage.setItem("totalRegIns", totalRegIns);
                    return insertado
                });
        })
        .then(insertado => {
            InspeccionService.actualizarPaginacion(numSin)
            return insertado;
        })
        .then(function (insertado) {    
            window.fn.load('inspeccionSeleccionada.html')
                .catch(error => window.fn.load('inspeccionSeleccionada.html'))
                .catch(error => {
                    verInspeccionSin(insertado.idInspeccion, null);
                    console.error(error);
                })
                .then(() => mostrarInspeccion(insertado.idInspeccion) )
        })
        .catch(error => {
            inspeccionLog.error(error);
            showError('No se pudo crear la inspeccion')
        });
}

function guardarCambios() {
    document.getElementById('btnGuardarInspeccion').setAttribute('disabled', 'disabled');
    document.getElementById('btnGuardarInspeccion').insertAdjacentHTML('beforeend', `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style="margin-bottom: 2px;"></span>`);
    let idInspeccion = $("input[name='idInspeccion']").val();
    let dateInspeccion = $('#dateInspeccion').val();
    let nombreInspector = $('#idInspector').val();
    let inspeccion_contacto = $('#idAtendido').val();
    let inspeccion_mail = $('#idDatosContacto').val();
    let inspeccion_declaracion = $('#idDeclaracion').val();
    let inspeccion_descrip = $('#idDescripcion').val();
    let inspeccion_dano_estr = $('#idAlcance').val();
    let inspeccion_almacen = $('#idPresupuesto').val();
    let inspeccion_comentario = $('#idNotas').val();
    let estado = $('#estado').val();
    let idDetalleInspeccion = $('#idDetalleInspeccion').val();
    let inspeccion_id = window.localStorage.getItem("idInspeccionServidor");
    let correspon_caso = window.localStorage.getItem('idSiniestroServidor');
    let inspeccion_tipo = 4;
    let inspeccion_estado = $('#idEstado').val();
    let dia = dateInspeccion.split("-")[2];
    let mes = dateInspeccion.split("-")[1];
    let anio = dateInspeccion.split("-")[0];
    let inspeccion_inspector = $('[data-ajustador-id]').val();
    let iniciales = $('[data-ajustador-iniciales]').val();
    inspeccionLog.debug(`guardando cambios en inspeccion ${idInspeccion} estado ${estado}`);
    
    if (estado != null && estado != undefined) {
        
    }
    var updateQuery = `UPDATE DetalleInspeccion SET dateInspeccion = ?,
        inspeccion_estado = ?,
        nombreInspector = ?,
        idInspeccion = ?,
        inspeccion_contacto = ?, 
        inspeccion_mail = ?,
        inspeccion_declaracion = ?,
        inspeccion_descrip = ?,
        inspeccion_dano_estr = ?,
        inspeccion_almacen = ?,
        inspeccion_comentario = ?,
        correspon_caso = ?,
        inspeccion_tipo = ?,
        estado = ?,
        inspeccion_caso = ?,
        dia = ?,
        mes = ?,
        anio = ?,
        inspeccion_inspector = ? 
        WHERE idInspeccion = ?`;
    return sqlPromise(updateQuery,
        [dateInspeccion, inspeccion_estado, nombreInspector, idInspeccion,
            inspeccion_contacto, inspeccion_mail, inspeccion_declaracion,
            inspeccion_descrip, inspeccion_dano_estr, inspeccion_almacen,
            inspeccion_comentario, correspon_caso,
            inspeccion_tipo, estado, correspon_caso, dia, mes, anio, 
            inspeccion_inspector,
            idInspeccion
        ]
    ).then(() => {
        if (estado == null)
            return;
        return sqlPromise(`UPDATE Inspeccion SET estado = ?, changeLocal = ?, inspector = ?
            WHERE tableInspeccionID = ?`, [estado, true, iniciales, String(idInspeccion)]);
    }).then(() => {
        // actualizar datos del siniestro
        let seDebeActualizarSiniestro =  !$('#numeroSiniestro > input').is('[readonly]');
        if (seDebeActualizarSiniestro) {
            let numeroSiniestro = $('#numeroSiniestro').val();
            let ciaSeguros = $('#ciaSeguros').val();
            let asegurado = $('#asegurado').val();
            let causas = $('#causas').val();
            let fechaSiniestro = $('#fechaSiniestro > input').val();
            let idSiniestro = $('#idSiniestro').val();
            console.error({numeroSiniestro, ciaSeguros, asegurado, causas, fechaSiniestro, idSiniestro})
            return sqlPromise(`UPDATE Siniestro SET caso_n_siniestro = ?, cia_seg = ?, 
                asegurados = ?, causas = ?, caso_fech_ocurren = ? WHERE idSiniestro = ?`, [
                    numeroSiniestro, ciaSeguros, asegurado, causas, fechaSiniestro, idSiniestro
            ]).then(() => {
                showSuccess('Actualizada informacion local del siniestro');
            }).catch(error => {
                inspeccionLog.error('No se pudo actualizar el siniestro local', error);
            })
        }
    }).then(() => {
        fn.load('inspeccionSeleccionada.html');
        mostrarInspeccion(idInspeccion) //Recarga la pagina de inspeccion
        guardarPeticion('inspeccion_detalle.php?id=' + inspeccion_id, 'PUT', 'DetalleInspeccion', 'idDetalleInspeccion', idDetalleInspeccion, function (update) {
            if (update) {
                showSuccess('Se ha actualizado la inspección correctamente');
            }
        });
    }).catch(error => {
        inspeccionLog.error('error al guardar cambios', error)
        showNotice('Ha ocurrido un problema al actualizar la inspección');
        document.getElementById('btnGuardarInspeccion').removeAttribute('disabled', 'disabled');
        var spinner = document.querySelector('#btnGuardarInspeccion span');
        if (spinner != null) {
            spinner.parentNode.removeChild(spinner)
        }
    })
}

var FormularioInspeccion = {

    abrirNuevaInspeccion() {
        fn.load('nuevaInspeccion.html');
        var numSin = window.localStorage.getItem("idSiniestroServidor");
        sqlPromise('SELECT * FROM Siniestro WHERE caso_id = ?', [numSin]).then(result => {
            return result.rows.item(0);
        }).then(siniestro => { 
            if (siniestro) {
                mostrarNuevaInspeccion([siniestro]);
            } else {
                showNotice("Ha ocurrido un error inesperado");
            }
        }).finally(() => {
            let formulario = document.getElementById('formNuevaInspeccion');
            formulario.addEventListener('input', e => FormularioInspeccion.guardarCambiosFormulario());
            FormularioInspeccion.restaurar();
        });
    },

    guardarCambiosFormulario() {
        let formulario = document.getElementById('formNuevaInspeccion');
        let campos = $(formulario).serializeArray();
        let datos = {};
        for (let i = 0; i < campos.length; i++) {
            datos[campos[i].name] = campos[i].value;
        }
        console.error('guardando', datos);
        localStorage['formularioInspeccion'] = JSON.stringify(datos);
    },

    restaurar() {
        let formulario = document.getElementById('formNuevaInspeccion');
        let datos = localStorage['formularioInspeccion'];
        if (datos != null) {
            let campos = JSON.parse(datos);
            formulario.querySelector('[name="idInspector"]').value = campos['idInspector'];
            formulario.querySelector('[name="idAtendido"]').value = campos['idAtendido'];
            formulario.querySelector('[name="idDatosContacto"]').value = campos['idDatosContacto'];
            formulario.querySelector('[name="idDeclaracion"]').value = campos['idDeclaracion'];
            formulario.querySelector('[name="idDescripcion"]').value = campos['idDescripcion'];
            formulario.querySelector('[name="idAlcance"]').value = campos['idAlcance'];
            formulario.querySelector('[name="idPresupuesto"]').value = campos['idPresupuesto'];
            formulario.querySelector('[name="idNotas"]').value = campos['idNotas'];
        }
    },
    
    dialogoLimpiar: {
        abrir: () => createAlertDialog('nuevaInspeccionLimpiar', 'nuevaInspeccionLimpiar.html'),
        limpiar: () => {
            hideAlertDialog('nuevaInspeccionLimpiar');
            $('[data-form-inspeccion]').val(null)
            localStorage['formularioInspeccion'] = null;
            let inspector = document.getElementById('idInspector');
            inspector.value = inspector.dataset.inspectorPorDefecto;
        },
        cerrar: () => hideAlertDialog('nuevaInspeccionLimpiar')
    },

    mostrarDialogoLimpiar() {
        
        let formulario = document.getElementById('formNuevaInspeccion');
        let dialogo = document.getElementById('nuevaInspeccionLimpiar');
        dialogo.querySelector('[data-limpiar]').onclick = e => {
            formulario.reset();
            hideAlertDialog('nuevaInspeccionLimpiar')
        }
        dialogo.querySelector('[data-cancelar]').onclick = e => hideAlertDialog('nuevaInspeccionLimpiar')
    },

    crear() {
        var form = $('#formNuevaInspeccion');
        form.validate({
            errorClass: "errorForm",
            validClass: "validForm",
            submitHandler: function () {
                crearInspeccion();
            },
            invalidHandler: function (event, validator) {
                if (validator.numberOfInvalids()) {
                    showError("Revisa los campos marcados");
                }
            }
        });
        form.submit(function (e) {
            e.preventDefault();
        });
        form.submit();
    }
}

function submitNuevaInspeccion() {
    var form = $('#formNuevaInspeccion');
    form.validate({
        errorClass: "errorForm",
        validClass: "validForm",
        submitHandler: function () {
            crearInspeccion();
        },
        invalidHandler: function (event, validator) {
            if (validator.numberOfInvalids()) {
                showError("Revisa los campos marcados");
            }
        }
    });
    form.submit(function (e) {
        e.preventDefault();
    });
    form.submit();
}

/*******************************************************************
 *                Buscar Inspección Sin Siniestro
 *******************************************************************/
function inspeccionBuscarSin() {
    fn.load('inspeccionSin.html');
}

/**
 * Funcion para disparar el evento submit del formulario de inspeccion
 * y poder validar con Jquery
 * @returns {Promise}
 */
function submitInspeccionSeleccionada() {
    return new Promise((resolve, reject) => {
        var form = $('#formSiniestroSeleccionado');
        form.validate({
            errorClass: "errorForm",
            validClass: "validForm",
            submitHandler: function (e) {
                guardarCambios()
                    .then(resolve)
                    .catch(reject)
            },
            invalidHandler: function (e, validator) {
                if (validator.numberOfInvalids()) {
                    showError("Revisa los campos marcados");
                }
                reject();
            }
        });
        form.submit(function (e) {
            e.preventDefault();
        })
        form.submit();
    });
}


function validarInspeccionSinSiniestro() {
    var numSin = $('#insNumSiniestro').val();
    if (numSin.trim() == '') {
        showError("Debe ingresar un numero de siniestro o referencia");
    } else {
        buscarInspeccionSinSiniestro(numSin, 1);
    }
}

/**
 * Función para buscar inspecciones
 * (sin siniestro seleccionado) en el servidor
 * @param {*} numSin 
 */
function buscarInspeccionSinSiniestro(numSin, page) {
    window.localStorage.removeItem("limitGastoUsuario");
    if (verificarConexion() == true) {
        var searchPage = parseInt(page) - 1;
        sendGetRequest('siniestro_inspecciones.php?caso=' + numSin + '&pageNum_user=' + searchPage, function (lstInspecciones) {
            window.localStorage.setItem("limitGastoUsuario", 10);
            if (lstInspecciones.registros != 0) {
                resultadosInspeccionSin(lstInspecciones, page, numSin);
            } else {
                showNotice("El siniestro " + numSin + " no cuenta con inspecciones");
            }
        });
    } else {
        showNotice("Conexión a Internet no disponible");
    }
}

/**
 * Carga los resultados de la busqueda de 
 * inspecciones sin siniestro
 * @param {*} lstInspecciones 
 * @param {*} pageActual 
 * @param {*} numSin 
 */
function resultadosInspeccionSin(lstInspecciones, pageActual, numSin) {
    inspeccionLog.debug('inspecciones sin siniestro')
    var html = '';
    var titleApp = window.localStorage.getItem("titleApp");
    $('#titleApp').html(titleApp);
    window.localStorage.removeItem('inspeccion_id');
    if (lstInspecciones != null) {
        html += '<table id="resultadoInspeccion" ' +
            'class="table tableKronos table-striped table-sm shadow-sm"' +
            'style="width: 100%">';

        html += '<thead>' +
            '<tr>' +
            '<td>Ref. N°</td>' +
            '<td>Creación</td>' +
            '<td>Inspector</td>' +
            '<td>Estado</td>' +
            '</tr>' +
            '</thead>';

        lstInspecciones.resultados.forEach(function (inspeccion) {
            html += '<tbody>';
            html += '<tr onclick="verInspeccionSin(' + inspeccion.inspeccion_id + ',' + numSin + ');">' +
                '<td>' + numSin + '</td>' +
                '<td style="color:#FE8416;">' + fn.formatDate(inspeccion.fecha.split(" ")[0]) + '</td>' +
                '<td>' + inspeccion.inspector + '</td>' +
                '<td>' + inspeccion.estado + '</td>' +
                '</tr>';
            html += '</tbody>';
        });
        html += '</table>';
        html += fn.pagination(lstInspecciones.registros, pageActual);
        html += fn.dataViewed(lstInspecciones.registros, pageActual, fn.dinamicLimit(lstInspecciones.resultados.length)); //Indica numero de resultados
    } else {
        html += '<h4>No se encontraron resultados</h4>';
    }
    $('#inspeccionSiniestro').html(html);
    $('#page-' + pageActual).addClass("active");

    //Funcion cuando se presiona el botón
    $('.pagNumberPage').click(function () {
        var id = $(this).attr('id');
        pageObj = id.split("-")[1];
        buscarInspeccionSinSiniestro(numSin, pageObj);
    });
}

/**
 * Función para ver una inspeccion sin siniestro
 * @param {*} idInspeccion 
 * @param {*} numSin 
 */
function verInspeccionSin(idInspeccion, numSin) {
    window.localStorage.removeItem("limitGastoUsuario");
    buscarReferencia(numSin);
    window.localStorage.setItem("inspeccionSinSiniestro", idInspeccion);
}

/**
 * Abre la pantalla para enviar
 * la inspección por correo
 */
function openEnviarIns() {
    fn.load('enviarIns.html');
}

function validateEnviarIns() {
    $('#enviarInsReport').validate({
        errorClass: "errorForm",
        validClass: "validForm",
        submitHandler: function () {
            var emailsValid = checkEmails('contacto_mail');
            if (emailsValid == true) {
                saveEmail();
            } else {
                $('#contacto_mail').removeClass('validForm');
                $('#contacto_mail').addClass('errorForm');
                if (emailsValid.length == 1) {
                    showError("E-mail inválido: " + emailsValid.toString());
                } else {
                    showError("E-mails inválidos: " + emailsValid.toString());
                }
            }

        },
        invalidHandler: function (event, validator) {
            if (validator.numberOfInvalids()) {
                showError("Revisa los campos marcados");
            }
        }
    });
}

function submitEnviarIns() {
    $('#enviarInsReport').submit();
}

/**
 * Función para enviar el mail con
 * los datos de la inspeccion del 
 * siniestro
 */
function saveEmail() {
    let casos = window.localStorage.getItem("idSiniestroServidor");
    let contacto_mail = $("#contacto_mail").val();
    let numSin = window.localStorage.getItem("idSiniestroServidor");
    
    var mailParams = {
        casos: casos,
        contacto_mail: contacto_mail
    }

    if (verificarConexion() == true) {
        sqlQuery('INSERT INTO SendMailInspeccion (casos, contacto_mail) VALUES (?,?)',
            fn.JsonToArray(mailParams),
            function (last_id) {
                guardarPeticion('envio_inspeccion.php', 'POST', 'SendMailInspeccion', 'idMail', last_id, function (success) {
                    showNotice('El correo se enviará en un momento');
                    backVerInspeccion();
                    syncLocalData('sync');
                });
        }, true);
    } else {
        sqlQuery('INSERT INTO SendMailInspeccion (casos, contacto_mail) VALUES (?,?)',
            fn.JsonToArray(mailParams),
            function (last_id) {
                guardarPeticion('envio_inspeccion.php', 'POST', 'SendMailInspeccion', 'idMail', last_id, function (success) {
                    showNotice('El correo se enviará cuando este conectado a internet');
                    backVerInspeccion();
                });
            }, true);
    }
}

/**
 * Función para regresar a la pantalla 
 * para ver inspeccion
 */
function backVerInspeccion() {
    var idSiniestro = window.localStorage.getItem("idSiniestroServidor");
    var idInspeccionLocal = window.localStorage.getItem("inspeccion_id");
    var idInspeccionServidor = window.localStorage.getItem("idInspeccionServidor");
    verInspeccion(idInspeccionServidor, idInspeccionLocal, idSiniestro);
}

function descargarInformacionSiniestro(numSin) {
    if (!verificarConexion()) {
        showError('No hay conexion a internet')
        return;
    } else {
        buscarReferencia(numSin);
    }
}

/**
 * Registra el cambios en el formulario de inspeccion
 */
function inspeccionCambioRegistrado() {
    document.getElementById('formSiniestroSeleccionado').dataset.cambio = 'true';
}

/**
 * Habilita los campos de siniestro en el formulario de inspeccion
 */
function inspeccionHabilitarEditarSiniestro() {
    $('[data-siniestro]').removeAttr('readonly');
    $('[data-siniestro]').removeAttr('disabled');
    $('[data-siniestro] ').css('color', 'blue');
    $('ons-page').animate({scrollTop: 0}, 600);
}