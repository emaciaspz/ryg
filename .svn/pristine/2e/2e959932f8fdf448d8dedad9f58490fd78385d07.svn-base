/**
 * Utilidad para mostrar detalle de una peticion
 */
const FormatearPeticion = {
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    Gasto(peticion) {
        return GastosService.obtenerGasto(peticion.identificador).then(gasto => {
            console.error('gasto', gasto, peticion);
            return `
                <p>
                    <strong>Caso: </strong>${peticion.caso}<br>
                    ${gasto.gastos_repor_nombre != null ? 
                        `<strong>Gasto ${gasto.gastos_repor_nombre}</strong><br>` :
                        `<strong>Gasto consecutivo ${gasto.gastos_repor_consecu}(sin sincronizar)</strong><br>`
                    }
                    <strong>Moneda </strong>${gasto.gastos_repor_moneda}<br>
                    <strong>Anticipo: </strong> ${gasto.gastos_repor_anticipo}<br>
                    ${peticion.estatus  == 'OK' ? 
                        '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                        '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                    } <br>
                </p>`;
        })
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    DetalleGasto(peticion) {
        return GastosService.obtenerDetalleGasto(peticion.identificador).then(detalleGasto=> {
            return GastosService.obtenerGasto(detalleGasto.fk_idGasto).then(gasto => {
                return `
                    <p>
                        <strong>Caso: </strong>${peticion.caso}<br>
                        ${gasto.gastos_repor_nombre != null ? 
                            `<strong>Gasto ${gasto.gastos_repor_nombre}</strong><br>` :
                            `<strong>Gasto consecutivo ${gasto.gastos_repor_consecu}(sin sincronizar)</strong><br>`
                        }
                        <strong>Ajustador: </strong>${detalleGasto.gastos_ajustador}<br>
                        <strong>Concepto: </strong>${detalleGasto.gastos_concepto}<br>
                        <strong>Desripcion: </strong>${detalleGasto.gastos_descripcion}<br>
                        <strong>Razon social: </strong>${detalleGasto.gastos_razon_social}<br>
                        <strong>N° de Comprobante: </strong>:${detalleGasto.gastos_emisor}<br>
                        <strong>Moneda: </strong>:${detalleGasto.gastos_moneda}<br>
                        <strong>Pago T.C.: </strong>${detalleGasto.gastos_amex}<br>
                        <strong>Pago T.C.: </strong>${detalleGasto.gastos_amex}<br>
                        ${peticion.estatus  == 'OK' ? 
                            '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                            '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                        } <br>
                    </p>`;
            });
        });
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    DocumentoGasto(peticion) {
        return GastosService.obtenerDocumentoGasto(peticion.identificador).then(documento => {
            let extension = documento.up_documento.split('.').pop().toLowerCase();
            return `
                <strong>Caso: </strong>${peticion.caso}<br>
                <strong>Tipo documento: </strong>${extension} <br>
                ${peticion.estatus  == 'OK' ? 
                    '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                    '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' }
                <br>`
        });
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    DetalleInspeccion(peticion) {
        console.error('peticion', peticion);
        let detalleInspeccion = JSON.parse(peticion.request);
        console.error('detalle', detalleInspeccion);
        return Promise.resolve(`
            <p>
                <strong>Caso: </strong>${peticion.caso}<br>
                <strong>Fecha de la inspección: </strong>${detalleInspeccion.dateInspeccion}<br>
                ${detalleInspeccion.estado == null ? '' : '<strong>Estado: </strong>detalleInspeccion.estado<br>'}
                <strong>Atendido por: </strong>${detalleInspeccion.inspeccion_mail}<br>
                <strong>Datos de contacto: </strong>${detalleInspeccion.inspeccion_mail}<br>
                <strong>Declaración del Asegurado: </strong>${detalleInspeccion.inspeccion_declaracion}<br>
                <strong>Alcance del Lugar del Siniestro: </strong>${detalleInspeccion.inspeccion_descrip}<br>
                <strong>Alcance de daños: </strong>${detalleInspeccion.inspeccion_dano_estr}<br>
                <strong>Presupuesto: </strong>${detalleInspeccion.inspeccion_almacen}<br>
                <strong>Notas R&G: </strong>${detalleInspeccion.inspeccion_comentario}<br>
                ${peticion.estatus  == 'OK' ? 
                    '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                    '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                } <br>
            </p>`);
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    FotoInspeccion(peticion) {
        let datos = JSON.parse(peticion.request);
        return Promise.resolve(`  
            <p>
                <strong>Caso :</strong>${peticion.caso}<br>
                ${peticion.estatus  == 'OK' ? 
                    '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                    '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' }
                <br>
            </p>`);
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    Documento(peticion) {
        return InspeccionService.obtenerDocumento(peticion.identificador).then(documento => {
            let extension = documento.up_documento.split('.').pop().toLowerCase();
            return `
                <p>
                    <strong>Caso: </strong>${peticion.caso}<br>
                    <strong>Tipo documento: </strong>${extension} <br>
                    ${peticion.estatus  == 'OK' ? 
                        '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                        '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' }
                    <br>
                </p>`
        });
    },

    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    Pdf(peticion) {
        let informacion = JSON.parse(peticion.request);
        console.error('info', informacion);
        return InspeccionService.obtenerPdfInspeccion(peticion.identificador).then(pdf => {
            return `
                <p>
                    <strong>Caso: </strong> ${informacion.documentos_caso}<br>
                    <strong>Observaciones: </strong> ${informacion.documentos_observaciones}<br>
                    ${peticion.estatus  == 'OK' ? 
                        '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                        '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                    } <br>
                </p>`
        });
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    SendMailGasto(peticion) {
        return GastosService.obtenerSendMailGasto(peticion.identificador).then(email => {
            return GastosService.obtenerGasto(email.fk_idGasto).then(gasto => {
                return `
                    <p>
                        <strong>Caso: </strong>${peticion.caso}<br>
                        ${gasto.gastos_repor_nombre != null ? 
                            `<strong>Gasto ${gasto.gastos_repor_nombre}</strong><br>` :
                            `<strong>Gasto consecutivo ${gasto.gastos_repor_consecu}(sin sincronizar)</strong><br>`
                        }
                        <strong>Correos: </strong>${email.gastos_repor_mail}<br>
                        <strong>Comentario: </strong>${email.gastos_repor_coment}<br>
                        ${peticion.estatus  == 'OK' ? 
                            '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                            '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                        } <br>
                    </p>`
            })
        })
    },

    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    SendMailInspeccion(peticion) {
        let informacion = JSON.parse(peticion.request);
        return InspeccionService.obtenerSendMail(peticion.identificador).then(email => {
            return `
                <p>
                    <strong>Caso: </strong>${peticion.caso}<br>
                    <strong>Correos: </strong>${informacion.contacto_mail}<br>
                    ${peticion.estatus  == 'OK' ? 
                        '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                        '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                    } <br>
                </p>`
        });
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    Bitacora(peticion) {
        let informacion = JSON.parse(peticion.request);
        return Promise.resolve(`
            <p>
                <strong>Caso: </strong>${peticion.caso}<br>
                <strong>Fecha: </strong>${informacion.fecha}<br>
                <strong>Fecha creación: </strong>${informacion.fecha_orden}<br>
                <strong>Tiempo invertido: </strong>${informacion.tiempo}<br>
                <strong>Tarea: </strong>${informacion.gestion}<br>
                <strong>Subtarea: </strong>${informacion.subtarea}<br>
                <strong>Comentario/Detalle: </strong><br>${informacion.comentario}<br>
                ${peticion.estatus  == 'OK' ? 
                    '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                    '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                } <br>
            </p>
        `);
    },
    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    CambioBitacora(peticion) {
        let informacion = JSON.parse(peticion.request);
        return Promise.resolve(`
            <p>
                <strong>Caso: </strong>${peticion.caso}<br>
                <strong>Fecha: </strong>${informacion.anio.toString().padStart(2,0)}-
                ${informacion.mes.toString().padStart(2,0)}-
                ${informacion.dia.toString().padStart(2,0)}<br>
                <strong>Comentario/Detalle: </strong><br>${informacion.bitacora_observacion}<br>
                ${peticion.estatus  == 'OK' ? 
                    '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                    '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                } <br>
            </p>
        `);
    },

    /**
     * Regresa el html con la informacion de la peticion
     * @param {Peticion} peticion
     * @returns {Promise<string>}
     */
    EliminarDetalleGasto(peticion) {
        return Promise.resolve(`
            <p>
                <strong>Caso: </strong>${peticion.caso}<br>
                ${peticion.estatus  == 'OK' ? 
                    '<strong style="color: darkgreen">Estado: ' + peticion.estatus + '</strong>' : 
                    '<strong style="color: darkred">Estado: ' + peticion.estatus + '</strong>' 
                } <br>
            </p>
        `);
    }
};