const BitacoraService = {
    /**
     * @param {number} idBitacora
     * @returns {Promise<Bitacora>}
     */
    obtenerBitacora(idBitacora) {
        return sqlPromise('SELECT * FROM Bitacora where idBitacora = ?', idBitacora)
            .then(r => r.rows.item(0) != null ? r.rows.item(0) : Promise.reject('No hay datos'));
    },

    /**
     * Detectar y eliminar bitacoras borradas del servidor
     * @param {Bitacora[]} bitacorasServidor
     * @returns {Promise}
     */
    detectarYBorrarBitacorasEliminadasDelServidor(bitacorasServidor) {
        return sqlPromise('SELECT * FROM Bitacora').then(rowsAsList).then(bitacorasLocales => {
            let bitacorasEliminadas = bitacorasLocales.filter(local => {
                return !bitacorasServidor.find(servidor => servidor.id == local.id)
            });
            return Promise.all(bitacorasEliminadas.map(local => {
                // eliminar el registro de la bd
                return sqlPromise('DELETE FROM Bitacora WHERE id = ?', [local.id]).then(() => {
                    // eliminar peticiones actualizar
                    return sqlPromise(`
                        DELETE FROM Peticiones WHERE entidad = 'CambioBitacora' AND
                            identificador = (
                                SELECT p.identificador FROM Peticiones p 
                                    INNER JOIN CambioBitacora cb ON p.identificador = cb.idCambioBitacora AND p.entidad = 'CambioBitacora' 
                                WHERE bitacora_id = ?
                            )`, 
                        [local.id])
                }).then(() => {
                    // eliminar peticion para eliminar
                    return sqlPromise(`
                        DELETE FROM Peticiones WHERE entidad = 'BitacoraEliminar' AND
                            identificador = (
                                SELECT p.identificador FROM Peticiones p
                                    INNER JOIN BitacoraEliminar eb ON p.identificador = eb.idBitacoraEliminar AND p.entidad = 'BitacoraEliminar'
                                WHERE eb.bitacora_id = ?
                            )`, 
                        [local.id])
                })
            }))
        });
    }
}