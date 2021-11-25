/**
 * Servicio para catalogos
 * @class
 */
const CatalogoService = {
    /** 
     * Obtener listado de ajustadores 
     * @returns {Promise<CatalogoAjustador[]>}
     */
    obtenerListadoAjustadores() {
        return sqlPromise('SELECT * FROM CatalogoAjustador ORDER BY nombre ASC').then(rowsAsList);
    },

    /**
     * Obtener el ajustador por su id
     * @param {string|number} id
     * @return {Promise<CatalogoAjustador>}
     */
    obtenerAjustadorPorId(id) {
        return sqlPromise('SELECT * FROM CatalogoAjustador WHERE id = ?', [id])
            .then(result => result.rows.length >= 1 ? result.rows.item(0) : Promise.reject('No hay datos'))
    },

    /**
     * Obtener el ajustador por su id
     * @param {string|number} id
     * @return {Promise<DatosUsuario>}
     */
    obtenerDatosUsuarioActual() {
        return sqlPromise('SELECT * FROM DatosUsuario').then(resultado => {
            if (resultado.rows.length >= 1) {
                return resultado.rows.item(0);
            } else {
                return Promise.reject('No hay datos')
            }
        });
    },

    /**
     * Obtener listado conceptos
     * @param {string|number} id
     * @return {Promise<CatalogoConcepto[]>}
     */
    obtenerListadoConceptos() {
        return sqlPromise('SELECT * FROM CatalogoConcepto').then(rowsAsList);
    }
}