/**
 * Funcion que muestra los datos del siniestro
 *
 */
function datos() {
    var numSin = window.localStorage.getItem('idSiniestroServidor');
    fn.load('datos.html');
    if (verificarConexion()) {
        return obtenerInformacionServidor(numSin).then(response => {
            return existeSiniestro(numSin).then(existe => {
                let perdidaEstimada = getPerdidaEstimada(response);
                if (existe) {
                    return actualizar(response, perdidaEstimada)
                } else {
                    return insertar(response, perdidaEstimada)
                }
            })
        }).then(() => {
            return obtenerInformacionLocal(numSin).then(datos => {
                resultadosDatos([datos]);
            })
        }).catch(error => {
            showNotice("No se encontraron datos del siniestro actual")
        })
    } else {
        return obtenerInformacionLocal(numSin).then(datos => {
            resultadosDatos([datos]);
        })
        .catch(error => { 
            showNotice("No se encontraron datos del siniestro actual")
        })
    }

    function obtenerInformacionServidor(numSin) {
        return new Promise((resolve, reject) => sendGetRequest('siniestro.php?caso=' + numSin, resolve, reject));
    }

    function obtenerInformacionLocal(caso_id) {
        return sqlPromise('SELECT * FROM Siniestro WHERE caso_id = ?', [caso_id])
            .then(r => r.rows.item(0));
    }

    function existeSiniestro(caso_id) {
        return sqlPromise('SELECT COUNT(*) as conteo FROM Siniestro WHERE caso_id = ?', [caso_id])
            .then(r => r.rows.item(0).conteo > 0)
    }

    function insertar(results, perdidaEstimada) {
        return sqlPromise(`INSERT INTO Siniestro (
                caso_n_siniestro, estado_real, caso_fech_ocurren, 
                cia_seg, asegurados, ajustador, 
                causas, perdidaEstimada, caso_n_poliza, 
                caso_direccion, regiones, comunas,
                caso_fech_ini_poliza, caso_fech_fin_poliza, corredores, 
                beneficiarios) 
            VALUES (?,?,?,
                    ?,?,?,
                    ?,?,?,
                    ?,?,?,
                    ?,?,?)`, [
                results.caso_n_siniestro, results.estatus_real != null ? results.estatus_real.valor : null, results.caso_fech_ocurren, 
                results.cia_seg, results.asegurados, results.ajustador,
                results.causas, perdidaEstimada, results.caso_n_poliza, 
                results.caso_direccion, results.regiones, results.comunas, 
                results.caso_fech_ini_poliza, results.caso_fech_fin_poliza, results.corredores, 
                results.beneficiarios
        ]);
    }

    function actualizar(results, perdidaEstimada) {
        return sqlPromise(`UPDATE Siniestro SET 
                estado_real = ?, caso_fech_ocurren = ?, cia_seg = ?, 
                asegurados = ?, ajustador = ?, causas = ?, 
                perdidaEstimada = ?, caso_n_poliza = ?, caso_direccion = ?, 
                regiones = ?, comunas = ?, caso_fech_ini_poliza = ?,
                caso_fech_fin_poliza = ?, corredores = ?, beneficiarios = ? 
            WHERE caso_id = ?`,[
                results.estatus_real != null ? results.estatus_real.valor : null, results.caso_fech_ocurren, results.cia_seg, 
                results.asegurados, results.ajustador, results.causas, 
                perdidaEstimada, results.caso_n_poliza, results.caso_direccion, 
                results.regiones, results.comunas, results.caso_fech_ini_poliza,
                results.caso_fech_fin_poliza, results.corredores, results.beneficiarios, 
                results.caso_id
        ]);
    }
}
/**
 * Función para procesar los datos del
 * siniestro
 * 
 */
function resultadosDatos(siniestro) {
    var html = '';
    var titleApp = window.localStorage.getItem("titleApp");
    $('#titleApp').html(titleApp);
    if (siniestro != null) {

        html += '<table id="resultadoDatos" ' +
            'class="table tableKronos table-striped shadow-sm"' +
            'style="width: 100%">';

        siniestro.forEach(function (data) {
            //Numero de siniestro
            html += '<tr>' +
                '<td><strong>Siniestro N°</strong></td>';
            if (data.caso_n_siniestro) {
                html += '<td>' + data.caso_n_siniestro + '</td>';
            } else if (data.caso_id) {
                html += '<td>' + data.caso_id + '</td>';
            } else if(verificarConexion() == false) {
                html += '<td>Sin conexi&oacute;n a internet</td>';
            }
            html += '</tr>';
            //Fecha de siniestro
            html += '<tr>' +
                '<td><strong>Fecha de Siniestro</strong></td>';
            if (data.caso_fech_ocurren == null || data.caso_fech_ocurren == "") {
                html += `<td> No disponible (Sin internet) </td>`;
            } else {
                if (fn.formatDate2(data.caso_fech_ocurren) != "Invalid date") {
                    html += '<td>' + fn.formatDate2(data.caso_fech_ocurren) + '</td>';
                } else {
                    html += '<td>' + fn.formatDate(data.caso_fech_ocurren) + '</td>';
                }
            }
            html += '</tr>';
            //Cia de seguros
            html += '<tr>' +
                '<td><strong>Cia. de Seguros</strong></td>';
            if (data.cia_seg) {
                html += '<td>' + data.cia_seg + '</td>';
            } else if(verificarConexion() == false) {
                html += '<td>Cia Aseguradora (Sin internet)</td>';
            }
            html += '</tr>';
            //Asegurados
            html += '<tr>' +
                '<td><strong>Asegurado</strong></td>';
            if (data.asegurados) {
                html += '<td>' + data.asegurados + '</td>';
            } else if(verificarConexion() == false) {
                html += '<td>Aseguradora (Sin internet)</td>';
            }
            html += '</tr>';
            //Ajustador
            html += '<tr>' +
                '<td><strong>Ajustador</strong></td>';
            if (data.ajustador) {
                html += '<td>' + data.ajustador + '</td>';
            } else if(verificarConexion() == false)  {
                html += '<td>Ajustador (Sin internet)</td>';
            }
            html += '</tr>';
            //Causas siniestro
            html += '<tr>' +
                '<td><strong>Causas</strong></td>';
            if (data.causas) {
                html += '<td>' + data.causas + '</td>';
            } else if(verificarConexion() == false) {
                html += '<td>Causas (Sin internet)</td>';
            } else {
                html += '<td></td>';
            }
            html += '</tr>';
            //Perdida estimada
            html += '<tr>' +
                '<td><strong>Pérdida estimada</strong></td>';
            if (data.perdidaEstimada) {
                html += '<td>' + data.perdidaEstimada + '</td>';
            } else if (data.simbolo && data.caso_perdida_estimada && data.caso_perdida_bruta) {
                html += '<td>' + data.simbolo + ' ' + numeral(data.caso_perdida_estimada).format('0,0.00') + ' (100% Bruta)'; + '</td>';
            } else if (data.caso_perdida_estimada == null && data.simbolo == null && data.caso_perdida_estimada == null && data.caso_perdida_bruta == null && verificarConexion() == false) {
                html += '<td>Perdida (Sin internet)</td>';
            } else {
                html += '<td></td>';
            }
            html += '</tr>';
            //Estatus Siniestro
            html += '<tr>' +
                '<td><strong>Estatus</strong></td>';
            if (data.estatus_real && data.estatus_real != undefined) {
                if (data.estatus_real.valor && data.estatus_real.valor != undefined) {
                    html += '<td>' + data.estatus_real.valor + '</td>';
                }
            } else if(verificarConexion() == false) {
                html += '<td>Estatus (Sin internet)</td>';
            } else if (data.estado_real && data.estado_real != undefined && data.estado_real != "undefined") {
                html += '<td>' + data.estado_real + '</td>';
            } else {
                html += '<td></td>';
            }
            html += '</tr>';
        });
        html += '</table>';

    } else {
        html += '<h4>No se encontraron resultados</h4>';
    }
    $('#datosSiniestro').html(html);
}

function verifySiniestroData(idSiniestro) {
    sqlQuery('SELECT * FROM Siniestro WHERE caso_id = ? AND estado = ?', [idSiniestro, "Sin Conexión"], function (noExiste) {
        if (noExiste != true) {
            window.localStorage.setItem("siniestroLoaded", true);
            fn.load('carga.html');
            //Validar si el siniestro ya existe
            sendGetRequest('siniestro_full.php?caso=' + idSiniestro, function (siniestro) {
                if (siniestro.caso_n_siniestro) {
                    setDataSiniestro(siniestro.caso_id, siniestro.caso_n_siniestro, siniestro.estado);
                    guardarSiniestro(siniestro);
                } else {
                    showNotice('N° Registro R&G o N° de Siniestro " ' + idSiniestro + ' " no se encuentra en el sistema');
                }
            });
        }
    });
}

function estadoCasoEsValido(estatus, callback) {
    var numCaso = window.localStorage.getItem("idSiniestroServidor");
    numCaso = numCaso != null & numCaso != undefined ?
        numCaso : window.localStorage.getItem("idSiniestroLocal");

    sqlQuery('SELECT * FROM Siniestro WHERE caso_i = ?', [numCaso], 
        function(datosSiniestro) {
            if(datosSiniestro != true) {
                var estado_real = datosSiniestro[0].estado;
                if(estado_real === estatus) {
                    callback(false);
                    showNotice('El caso actual se encuentra finalizado, '
                            +   'no se pueden agregar más bitácoras facturables');
                } else {
                    callback(true);
                    fn.load('bitFacturable.html');
                    initBitacora('Facturable');
                }
            } else {
                showNotice("No se encontró información del siniestro, intente nuevamente");
                callback(false);
            }
        }
    );
}

function getPerdidaEstimada(results) {
    //Simbolo
    var simbolo = results.simbolo;
        simbolo = simbolo != null && simbolo != undefined ? simbolo : '';
    // Perdida estimada
    var caso_perdida_estimada = results.caso_perdida_estimada;
        caso_perdida_estimada = caso_perdida_estimada != null && caso_perdida_estimada != undefined ? caso_perdida_estimada : '0.00';
    // Perdida bruta
    var caso_perdida_bruta = results.caso_perdida_bruta;
        caso_perdida_bruta = caso_perdida_bruta != null && caso_perdida_bruta != undefined ? caso_perdida_bruta : '100';

    var perdidaEstimada = simbolo + ' ' + numeral(caso_perdida_estimada).format('0,0.00') + ' (' + caso_perdida_bruta + '% Bruta)';
    return perdidaEstimada;
}