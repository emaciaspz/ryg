/**
 * Objeto para generar una descripcion de las peticiones,
 * se utiliza en el listado de peticiones
 * Entidad => funcion
 */
const DescripcionPeticion = {
    /**
     * Funcion para agregar descripcion a peticion de Gasto
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    Gasto(peticion) {
        if (peticion.metodo.toUpperCase() == "POST") {
            peticion.descripcion = "Crear nuevo gasto";
        } else {
            peticion.descripcion = "Actualizar anticipo ";
        }
        return peticion;
    },
    /**
     * Funcion para agregar descripcion a peticion de DetalleGasto
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    DetalleGasto(peticion) {
        if (peticion.metodo.toUpperCase() == "PUT") {
            peticion.descripcion = 'Actualizar detalle de gasto';
        } else { // DOCUMENT
            peticion.descripcion = 'Crear detalle gasto';
        }
        return peticion;
    },
    /**
     * Funcion para agregar descripcion a peticion de DocumentoGasto
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    DocumentoGasto(peticion) {
        peticion.descripcion = 'Subir documento de gasto';
        return peticion;
    },
    /**
     * Funcion para agregar descripcion a peticion de DetalleInspeccion
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    DetalleInspeccion(peticion) {
        if (peticion.metodo.toUpperCase() == "POST") {
            peticion.descripcion = 'Crear nueva inspección';
        } else { // DOCUMENT
            peticion.descripcion = 'Actualizar inspección';
        }
        return peticion;
    },
    /**
     * Funcion para agregar descripcion a peticion de FotoInspeccion
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    FotoInspeccion(peticion) {
        peticion.descripcion = 'Subir fotografia de inspección';
        return peticion;
    },
    /**
     * Funcion para agregar descripcion
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    Documento(peticion) {
        peticion.descripcion = 'Subir documento de inspección';
        return peticion;
    },
    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    Pdf(peticion) {
        peticion.descripcion = 'Subir pdf de inspección';
        return peticion;
    },
    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    SendMailGasto(peticion) {
        peticion.descripcion = 'Enviar gasto por correo';
        return peticion;
    },
    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    SendMailInspeccion(peticion) {
        peticion.descripcion = 'Enviar inspección por correo';
        return peticion;
    },
    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    Bitacora(peticion) {
        peticion.descripcion = 'Crear nueva bitácora';
        return peticion;
    },

    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    BitacoraEliminar(peticion) {
        peticion.descripcion = 'Eliminar bitacora';
        return peticion;
    },

    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    CambioBitacora(peticion) {
        peticion.descripcion = 'Actualizar bitácora';
        return peticion;
    },

    /**
     * @param {Peticion} peticion
     * @returns {Peticion}
     */
    EliminarDetalleGasto(peticion) {
        peticion.descripcion = 'Eliminar detalle gasto';
        return peticion;
    }
};