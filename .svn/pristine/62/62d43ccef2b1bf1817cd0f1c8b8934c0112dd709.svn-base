/**
 * @typedef SQLResultSetRowList
 * @property {number} length numero de resultados
 * @property {Function} item regresa un resultado basado en indice, uso result.item(1)
 */

/**
 * @typedef {Object} SQLResultSet
 * @property {number} insertId id del objeto que fue insertado
 * @property {SQLResultSetRowList} rows Arreglo de objeto que se obtuvieron como resultado, 
 * hay que usar rows.item() para acceder a un indice
 * @property {number} rowsAffected Numero def filas que fueron afectadas
 */

/**
 * @typedef {Object} DatosUsuario 
 * @property {number} user_id
 * @property {string} user_rut
 * @property {string} user_nombre
 * @property {string} user_iniciales
 * @property {string} tipo_user_nombre
 * @property {string} user_fono,
 * @property {string} user_celular
 * @property {string} user_mail
 */

/**
 * @typedef {Object} DetalleGasto
 * @property {number} idDetalleGasto PRIMARY KEY
 * @property {number} gastos_id
 * @property {number} gastos_caso
 * @property {number} gastos_user
 * @property {number} gastos_ajustador
 * @property {number} gastos_visada
 * @property {number} gastos_id_reporte
 * @property {string} gastos_valor
 * @property {string} gastos_cargar
 * @property {string} gastos_moneda
 * @property {string} gastos_fecha_real
 * @property {string} gastos_emisor
 * @property {string} gastos_descripcion
 * @property {string} gastos_concepto
 * @property {string} gastos_razon_social
 * @property {string} gastos_viaje_ini
 * @property {string} gastos_viaje_fin
 * @property {string} gastos_amex
 * @property {string} gastos_nulo
 * @property {string} gastos_archivo
 * @property {string} gastos_archivo_xml
 * @property {string} gastos_archivo_3
 * @property {string} gastos_fecha
 * @property {string} ajustador
 * @property {number} fk_idGasto
 * @property {number} gastos_repor_id
 * @property {number} gastos_movil_caso
 * @property {string} anio
 * @property {string} mes
 * @property {string} dia
 * @property {string} up_documento_2
 */

/**
 * @typedef {Object} Gasto
 * @property {number} idGasto PRIMARY KEY,
 * @property {number} gastos_repor_id,
 * @property {number} gastos_repor_caso,
 * @property {number} gastos_repor_consecu,
 * @property {number} gastos_repor_user,
 * @property {number} gastos_repor_ajustador,
 * @property {string} gastos_repor_moneda,
 * @property {string} gastos_repor_anticipo,
 * @property {string} gastos_repor_nombre,
 * @property {string} gastos_repor_f_ini,
 * @property {string} gastos_repor_f_fin,
 * @property {string} gastos_repor_mail,
 * @property {string} gastos_repor_coment,
 * @property {string} gastos_repor_fecha_envi,
 * @property {string} gastos_repor_fecha,
 * @property {string} ajustador,
 * @property {number} correspon_caso,
 * @property {string} changeLocal,
 * @property {number} page
 */

/**
 * @typedef {Object} DocumentoGasto
 * @property {number} idDocumentoGasto PRIMARY KEY,
 * @property {string} gasto_id,
 * @property {string} filetype,
 * @property {string} mimeType,
 * @property {string} up_documento,
 * @property {number} fk_idDetalleGasto
 */

/**
 * @typedef {Object} SendMailGasto
 * @property {number} idMail PRIMARY KEY,
 * @property {string} anio 
 * @property {string} mes 
 * @property {string} dia
 * @property {string} anio_2
 * @property {string} mes_2
 * @property {string} dia_2
 * @property {string} gastos_repor_nombre
 * @property {string} gastos_repor_mail
 * @property {string} gastos_repor_coment
 * @property {number} gastos_repor_id_anti
 * @property {number} siniestro
 * @property {number} fk_idGasto
 */

/**
 * @typedef {Object} Bitacora 
 * @property {number} idBitacora PRIMARY KEY
 * @property {number} id
 * @property {string} fecha_orden
 * @property {string} fecha
 * @property {string} gestion
 * @property {number} tiempo
 * @property {string} comentario
 * @property {string} usuario
 * @property {string} subtarea
 * @property {number} bitacora_caso
 * @property {number} fk_idSiniestro
 * @property {string} bitacora_observacion
 * @property {string} anio
 * @property {string} mes
 * @property {string} dia
 * @property {number} bitacora_accion
 * @property {number} objetivo
 * @property {number} bitacora_tiempo
 */

/**
 * @typedef {Object} BitacoraEliminar 
 * @property {number} idBitacoraEliminar PRIMARY KEY
 * @property {number} bitacora_id)`))
 */

 /**
 * @typedef {Object} CambioBitacora 
 * @property {number} idCambioBitacora PRIMARY KEY
 * @property {number} filt_caso
 * @property {string} tipo_oper
 * @property {string} bitacora_observacion
 * @property {number} bitacora_id
 * @property {number} bitacora_accion
 * @property {number} objetivo
 * @property {string} anio
 * @property {number} mes
 * @property {number} dia
 * @property {string} bitacora_tiempo
 * @property {number} fk_idBitacora)
 */

/**
 * @typedef {Object} Inspeccion
 * @property {number} tableInspeccionID PRIMARY KEY
 * @property {string} inspector,
 * @property {number} inspeccion_id
 * @property {string} fecha,
 * @property {string} estado,
 * @property {number} inspeccion_tipo
 * @property {number} caso_id
 * @property {number} page
 * @property {string} changeLocal
 */

/**
 * @typedef {Object} DetalleInspeccion 
 * @property {number} idDetalleInspeccion PRIMARY KEY
 * @property {number} caso_id
 * @property {string} estado
 * @property {number} inspeccion_id
 * @property {string} dateInspeccion
 * @property {number} idInspeccion
 * @property {number} inspeccion_estado
 * @property {number} correspon_caso
 * @property {number} inspeccion_tipo
 * @property {string} inspeccion_contacto
 * @property {string} inspeccion_mail
 * @property {string} inspeccion_dano_estr
 * @property {string} inspeccion_declaracion
 * @property {string} inspeccion_descrip
 * @property {string} inspeccion_comentario
 * @property {string} inspeccion_almacen
 * @property {number} idDocumento
 * @property {string} nombreInspector
 * @property {string} inspeccion_fecha_realizada
 * @property {number} inspeccion_caso
 * @property {number} inspeccion_inspector
 * @property {string} dia
 * @property {string} mes
 * @property {string} anio
 */

 /**
 * @typedef {Object} DetalleInspeccionServidor
 * @property {number} idDetalleInspeccion PRIMARY KEY
 * @property {number} caso_id
 * @property {string} estado
 * @property {number} inspeccion_id
 * @property {string} dateInspeccion
 * @property {number} idInspeccion
 * @property {number} inspeccion_estado
 * @property {number} correspon_caso
 * @property {number} inspeccion_tipo
 * @property {string} inspeccion_contacto
 * @property {string} inspeccion_mail
 * @property {string} inspeccion_daño_estr
 * @property {string} inspeccion_declaracion
 * @property {string} inspeccion_descrip
 * @property {string} inspeccion_comentario
 * @property {string} inspeccion_almacen
 * @property {number} idDocumento
 * @property {string} nombreInspector
 * @property {string} inspeccion_fecha_realizada
 * @property {number} inspeccion_caso
 * @property {string} inspeccion_fecha_crea
 * @property {number} inspeccion_inspector
 * @property {string} dia
 * @property {string} mes
 * @property {string} anio
 * @property {Object} caso_detalle 
 */


/**
 * @typedef {Object} FotoInspeccion
 * @property {number} idFoto PRIMARY KEY
 * @property {number} fotos_id
 * @property {number} fotos_nombre
 * @property {string} fotos_observaciones
 * @property {string} up_documento
 * @property {string} base64
 * @property {number} edita_dato
 * @property {string} fecha_ingreso
 * @property {number} cantidadFotosPlus
 * @property {string} nombre_foto
 * @property {string} tipo_foto_nombre
 */

/**
 * @typedef {Object} DocumentoInspeccion
 * @property {number} idDocumento PRIMARY KEY
 * @property {number} edita_dato
 * @property {string} anio
 * @property {string} mes
 * @property {string} dia
 * @property {string} selecsecundario
 * @property {string} up_documento
 * @property {string} fecha
 * @property {string} grupo
 * @property {string} anexos_observaciones
 * @property {string} mimetype

/**
 * @typedef {Object} SendMailInspeccion
 * @property {number} idMail PRIMARY KEY
 * @property {number} casos
 * @property {string} contacto_mail
 */

/**
 * @typedef {Object} PdfInspeccion
 * @property {number} idPdf PRIMARY KEY
 * @property {number} documentos_caso
 * @property {string} documentos_observaciones
 * @property {string} up_documento
 * @property {string} mimetype
 */

 /**
 * @typedef {Object} CatalogoAjustador
 * @property {number} id PRIMARY KEY
 * @property {string} departamento 
 * @property {string} division 
 * @property {string} division_2 
 * @property {string} comuna 
 * @property {string} sucursal 
 * @property {string} tipo 
 * @property {string} tipo_tarifa 
 * @property {string} activo 
 * @property {string} caso_bloqueo 
 * @property {string} rut 
 * @property {string} nombre 
 * @property {string} iniciales 
 * @property {string} direccion 
 * @property {string} fono 
 * @property {string} celular 
 * @property {string} mail 
 * @property {string} web 
 * @property {string} firma 
 * @property {string} clave
 */


/**
 * @typedef {Object} CatalogoConcepto 
 * @property {number} concepto_id
 * @property {string} concepto_tex
 * @property {number} concepto_grupo
 */

/** 
 * @global 
 * @type {Logger} 
 */
var baseDatosLog = getLogger('baseDatos');

const Migraciones = {
	inicial() {
        return sqlPromise(`CREATE TABLE IF NOT EXISTS Migracion (version REAL, estado TEXT)`)
			/******************************************************************************************
			 *							 			LOG
			******************************************************************************************/
			//Tabla del log
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Logger (msg TEXT)`))
			/******************************************************************************************
			 *							 			DATOS USUARIO
			******************************************************************************************/
			//Tabla de datos del usuario
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS DatosUsuario (user_id INTEGER PRIMARY KEY,
				user_rut TEXT,
				user_nombre TEXT,
				user_iniciales TEXT,
				tipo_user_nombre TEXT,
				user_fono TEXT,
				user_celular TEXT,
				user_mail TEXT)`))
			/******************************************************************************************
			 *							 	DATOS SINIESTRO
			******************************************************************************************/
			//Tabla del siniestro
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Siniestro (idSiniestro INTEGER PRIMARY KEY,
				caso_id INTEGER,
				caso_n_siniestro INTEGER,
				estado TEXT,
				estado_real TEXT,
				caso_fech_ocurren TEXT,
				cia_seg TEXT,
				asegurados TEXT,
				ajustador TEXT,
				causas TEXT,
				perdidaEstimada TEXT,` 
				//Reporte PDF
				+ `
				caso_n_poliza TEXT,
				caso_direccion TEXT,
				regiones TEXT,
				comunas TEXT,
				caso_fech_ini_poliza TEXT,
				caso_fech_fin_poliza TEXT,
				corredores TEXT,
				beneficiarios TEXT)`))
			/******************************************************************************************
			 *							 			GASTOS
			******************************************************************************************/
			//Tabla de gastos
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Gasto (idGasto INTEGER PRIMARY KEY,
				gastos_repor_id INTEGER,
				gastos_repor_caso INTEGER,
				gastos_repor_consecu INTEGER,
				gastos_repor_user INTEGER,
				gastos_repor_ajustador INTEGER,
				gastos_repor_moneda TEXT,
				gastos_repor_anticipo TEXT,
				gastos_repor_nombre TEXT,
				gastos_repor_f_ini TEXT,
				gastos_repor_f_fin TEXT,
				gastos_repor_mail TEXT,
				gastos_repor_coment TEXT,
				gastos_repor_fecha_envi TEXT,
				gastos_repor_fecha TEXT,
				ajustador TEXT,
				correspon_caso INTEGER,
				changeLocal TEXT,
				page INTEGER)`))
			//Tabla de reporte de gastos
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS DetalleGasto (idDetalleGasto INTEGER PRIMARY KEY,
				gastos_id INTEGER,
				gastos_caso INTEGER,
				gastos_user INTEGER,
				gastos_ajustador INTEGER,
				gastos_visada INTEGER,
				gastos_id_reporte INTEGER,
				gastos_valor TEXT,
				gastos_cargar TEXT,
				gastos_moneda TEXT,
				gastos_fecha_real TEXT,
				gastos_emisor TEXT,
				gastos_descripcion TEXT,
				gastos_concepto TEXT,
				gastos_razon_social TEXT,
				gastos_viaje_ini TEXT,
				gastos_viaje_fin TEXT,
				gastos_amex TEXT,
				gastos_nulo TEXT,
				gastos_archivo TEXT,
				gastos_archivo_xml TEXT,
				gastos_archivo_3 TEXT,
				gastos_fecha TEXT,
				ajustador TEXT,
				fk_idGasto INTEGER, `
				//Extra params para el post
				+ `gastos_repor_id INTEGER,
				gastos_movil_caso INTEGER,
				anio TEXT,
				mes TEXT,
				dia TEXT,
				up_documento_2 TEXT)`))
			//Tabla de documentos del gasto
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS DocumentoGasto (idDocumentoGasto INTEGER PRIMARY KEY,
				gasto_id TEXT,
				filetype TEXT,
				mimeType TEXT,
				up_documento TEXT,
				fk_idDetalleGasto INTEGER)`))
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS SendMailGasto(idMail INTEGER PRIMARY KEY,
				anio TEXT, 
				mes TEXT, 
				dia TEXT,
				anio_2 TEXT,
				mes_2 TEXT,
				dia_2 TEXT,
				gastos_repor_nombre TEXT,
				gastos_repor_mail TEXT,
				gastos_repor_coment TEXT,
				gastos_repor_id_anti INTEGER,
				siniestro INTEGER)`))
			/******************************************************************************************
			 *							 			BITÁCORA
			*******************************************************************************************/
			//Tabla de bitacora
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Bitacora (idBitacora INTEGER PRIMARY KEY,
				id INTEGER,
				fecha_orden TEXT,
				fecha TEXT,
				gestion TEXT,
				tiempo INTEGER,
				comentario TEXT,
				usuario TEXT,
				subtarea TEXT,
				bitacora_caso INTEGER,
				fk_idSiniestro INTEGER,
				bitacora_observacion TEXT,
				anio TEXT,
				mes TEXT,
				dia TEXT,
				bitacora_accion INTEGER,
				objetivo INTEGER,
				bitacora_tiempo INTEGER)`))
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS BitacoraEliminar (idBitacoraEliminar INTEGER PRIMARY KEY,
				bitacora_id INTEGER)`))
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CambioBitacora (idCambioBitacora INTEGER PRIMARY KEY,
				filt_caso INTEGER,
				tipo_oper TEXT,
				bitacora_observacion TEXT,
				bitacora_id INTEGER,
				bitacora_accion INTEGER,
				objetivo INTEGER,
				anio TEXT,
				mes INTEGER,
				dia INTEGER,
				bitacora_tiempo TEXT,
				fk_idBitacora INTEGER)`))
			/******************************************************************************************
			 *							 			INSPECCIONES
			******************************************************************************************/
			//Tabla de inspeccion		
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Inspeccion (tableInspeccionID INTEGER PRIMARY KEY AUTOINCREMENT,
				inspector TEXT,
				inspeccion_id INTEGER,
				fecha TEXT,
				estado TEXT,
				inspeccion_tipo INTEGER,
				caso_id INTEGER,
				page INTEGER,
				changeLocal TEXT)`))
			//Tabla detalle de inspección
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS DetalleInspeccion (idDetalleInspeccion INTEGER PRIMARY KEY,
				caso_id INTEGER,
				estado TEXT,
				inspeccion_id INTEGER,
				dateInspeccion TEXT,
				idInspeccion INTEGER,
				inspeccion_estado INTEGER,
				correspon_caso INTEGER,
				inspeccion_tipo INTEGER,
				inspeccion_contacto TEXT,
				inspeccion_mail TEXT,
				inspeccion_dano_estr TEXT,
				inspeccion_declaracion TEXT,
				inspeccion_descrip TEXT,
				inspeccion_comentario TEXT,
				inspeccion_almacen TEXT,
				idDocumento INTEGER,
				nombreInspector TEXT,
				inspeccion_fecha_realizada TEXT,
				inspeccion_caso INTEGER,
				dia TEXT,
				mes TEXT,
				anio TEXT)`))
			//Tabla foto de inspeccion
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS FotoInspeccion (idFoto INTEGER PRIMARY KEY,
				fotos_id INTEGER,
				fotos_nombre INTEGER,
				fotos_observaciones TEXT,
				up_documento TEXT,
				base64 TEXT,
				edita_dato INTEGER,
				fecha_ingreso TEXT,
				cantidadFotosPlus INTEGER,
				nombre_foto TEXT,
				tipo_foto_nombre TEXT)`))
			//Tabla de documento
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Documento (idDocumento INTEGER PRIMARY KEY AUTOINCREMENT,
				edita_dato INTEGER,
				anio TEXT,
				mes TEXT,
				dia TEXT,
				selecsecundario TEXT,
				up_documento TEXT,
				fecha TEXT,
				grupo TEXT,
				anexos_observaciones TEXT,
				mimetype TEXT)`))
			//Tabla de mail inspeccion
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS SendMailInspeccion (idMail INTEGER PRIMARY KEY AUTOINCREMENT,
				casos INTEGER,
				contacto_mail TEXT)`))
			//Tabla de pdf firmado
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Pdf (idPdf INTEGER PRIMARY KEY,
				documentos_caso INTEGER,
				documentos_observaciones TEXT,
				up_documento TEXT,
				mimetype TEXT)`))
			/******************************************************************************************
			 *							 			PETICIONES
			******************************************************************************************/
			//Tabla de peticiones / Post Pendientes
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS Peticiones (idPeticion INTEGER PRIMARY KEY AUTOINCREMENT,
				url TEXT,
				metodo TEXT,
				entidad TEXT,
				identificadorEntidad TEXT,
				identificador INTEGER,
				estatus TEXT,
				request TEXT,
				response TEXT, 
				caso TEXT)`))
			/******************************************************************************************
			 *							 			CATALOGOS
			******************************************************************************************/
			//Tabla catalogo de monedas
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoMoneda (moneda_id INTEGER PRIMARY KEY,
				moneda_user INTEGER,
				moneda_estado INTEGER,
				moneda_nombre TEXT,
				moneda_simbolo TEXT,
				moneda_id_penta TEXT,
				moneda_nombre_penta TEXT,
				moneda_fecha TEXT)`))
			//Tabla catalogo de conceptos
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoConcepto (concepto_id INTEGER PRIMARY KEY,
				concepto_tex TEXT,
				concepto_grupo INTEGER)`))
			//Tabla catalogo de estados de inspeccion
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoEstadoInspeccion (estado_inspecc_id INTEGER PRIMARY KEY,
				estado_inspecc_nombre TEXT)`))
			//Tabla catalogo de grupo de documento
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoGrupoDocumento (tipo_anexo_g_id INTEGER PRIMARY KEY,
				tipo_anexo_g_user INTEGER,
				tipo_anexo_g_nombre TEXT,
				tipo_anexo_g_fecha TEXT)`))
			//Tabla catalogo de tipo de anexos
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoTipoAnexo (tipo_anexo_id INTEGER PRIMARY KEY,
				tipo_anexo_user INTEGER,
				tipo_anexo_grupo INTEGER,
				tipo_anexo_nombre TEXT,
				tipo_anexo_fecha TEXT,
				tipo_anexo_cia INTEGER,
				tipo_anexo_aseg INTEGER,
				tipo_anexo_corred INTEGER)`))
			//Tabla catalogo de tipo de fotos
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoTipoFoto (tipo_foto_id INTEGER PRIMARY KEY,
				tipo_foto_user INTEGER,
				tipo_foto_nombre TEXT,
				tipo_foto_fecha TEXT)`))
			//Tabla catalogo de tareas
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoTarea (bita_accion_id INTEGER PRIMARY KEY,
				bita_accion_estado INTEGER,
				bita_accion_tex TEXT,
				bita_accion_cia INTEGER,
				bita_accion_aseg INTEGER,
				bita_accion_corre INTEGER,
				bita_accion_facturable TEXT)`))
			//Tabla catalogo de subtareas
			.then(() => sqlPromise(`CREATE TABLE IF NOT EXISTS CatalogoSubtarea (bita_objetivo_id INTEGER PRIMARY KEY,
				bita_objetivo_accion INTEGER,
				bita_objetivo_estado INTEGER,
				bita_objetivo_text TEXT)`))
			.then(() => sqlPromise("SELECT MAX(version) as version FROM Migracion"))
			.then(data => {
				if (data != null && data.rows.item(0).version == null) {
					return sqlPromise("INSERT INTO Migracion(version, estado) VALUES(1, 'EXITO')")
				}
			})
	},

	
	obtenerVersionBD() {
		return sqlPromise("SELECT MAX(version) as version FROM Migracion")
			.then(data => data.rows.item(0).version)
	},
	
	/**
	 * @returns {Promise}
	 */
	migracion2() {
		return Migraciones.obtenerVersionBD()
			.then(version => { 
				if (version < 2) {
					return sqlPromise(`ALTER TABLE SendMailGasto ADD COLUMN fk_idGasto INTEGER`)
						.catch((error) => baseDatosLog.error('Ya existe la columna?', error, error.message))
						.then(() => sqlPromise("INSERT INTO Migracion(version, estado) VALUES(2, 'EXITO')"))
				}
			});
	},

	/**
	 * @returns {Promise}
	 */
	migracion3() {
		return Migraciones.obtenerVersionBD().then(version => {
			if (version < 3) {
				return sqlPromise(`
					CREATE TABLE IF NOT EXISTS CatalogoAjustador (
						id INTEGER PRIMARY KEY,
						departamento TEXT,
						division TEXT,
						division_2 TEXT,
						comuna TEXT,
						sucursal TEXT,
						tipo TEXT,
						tipo_tarifa TEXT,
						activo TEXT,
						caso_bloqueo TEXT,
						rut TEXT,
						nombre TEXT,
						iniciales TEXT,
						direccion TEXT,
						fono TEXT,
						celular TEXT,
						mail TEXT,
						web TEXT,
						firma TEXT,
						clave TEXT
					)
				`).then(() => {
					return sqlPromise(`INSERT INTO Migracion(version, estado) 
						VALUES(3, 'EXITO')`);
				})
			}
		})
	},

	migracion4() {
		return Migraciones.obtenerVersionBD().then(version => {
			if (version < 4) {
				return sqlPromise(`ALTER TABLE DetalleInspeccion ADD COLUMN inspeccion_inspector INTEGER`).then(() => {
					return sqlPromise(`INSERT INTO Migracion(version, estado) 
						VALUES(4, 'EXITO')`);
				})
			}
		})
	}
}

/**
 * Funcion que elimina las tablas
 * de la base de datos
 * @returns {Promise}
 */
function dropDatabasePromise() {
    //Logger
    return sqlPromise('DROP TABLE IF EXISTS Logger')
        //Migracion
        .then(() => sqlPromise('DROP TABLE IF EXISTS Migracion'))
        //Datos Usuario
        .then(() => sqlPromise('DROP TABLE IF EXISTS DatosUsuario'))
        //Datos Siniestro
        .then(() => sqlPromise('DROP TABLE IF EXISTS Siniestro'))
        //Gasto
        .then(() => sqlPromise('DROP TABLE IF EXISTS Gasto'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS DetalleGasto'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS DocumentoGasto'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS SendMailGasto'))
        //Bitacora
        .then(() => sqlPromise('DROP TABLE IF EXISTS Bitacora'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS BitacoraEliminar'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CambioBitacora'))
        //Inspeccion
        .then(() => sqlPromise('DROP TABLE IF EXISTS Inspeccion'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS DetalleInspeccion'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS FotoInspeccion'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS Documento'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS SendMailInspeccion'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS Pdf'))
        //Peticiones
        .then(() => sqlPromise('DROP TABLE IF EXISTS Peticiones'))
        //Catalogos
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoConcepto'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoMoneda'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoEstadoInspeccion'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoGrupoDocumento'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoTipoAnexo'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoTipoFoto'))
        .then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoTarea'))
		.then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoSubtarea'))
		.then(() => sqlPromise('DROP TABLE IF EXISTS CatalogoAjustador'))
}


/**
 * Función que inicializa las tablas
 * de la base de datos
 * @returns {Promise}
 */
function createDatabase() {
	return Migraciones.inicial()
        .then(() => CONFIGURACION_LOGGER.baseDatos.disponible = true)
		.then(Migraciones.migracion2)
		.then(Migraciones.migracion3)
		.then(Migraciones.migracion4)
        .then(() => sqlPromise('SELECT version, estado FROM Migracion'))
        .then(rowsAsList)
        .then(versiones => baseDatosLog.debug('Versiones BD', versiones))
        .catch( error => {
            alert('Error con migracion, reportar este error')
            baseDatosLog.error(`error migracion ${error.message}`); 
            return true
        })
}

/**
 * Función para eliminar toda la información de la 
 * base de datos
 * @deprecated
 */
function deleteDatabase() {
	db.transaction(function (tx) {
		//Logger
		tx.executeSql('DELETE FROM Logger');
		//Migraciones
		tx.executeSql('DELETE FROM Migracion');
		//Datos Usuario
		tx.executeSql('DELETE FROM DatosUsuario');
		//Datos Siniestro
		tx.executeSql('DELETE FROM Siniestro');
		//Gasto
		tx.executeSql('DELETE FROM Gasto');
		tx.executeSql('DELETE FROM DetalleGasto');
		tx.executeSql('DELETE FROM DocumentoGasto');
		tx.executeSql('DELETE FROM SendMailGasto');
		//Bitacora
		tx.executeSql('DELETE FROM Bitacora');
		tx.executeSql('DELETE FROM BitacoraEliminar');
		tx.executeSql('DELETE FROM CambioBitacora');
		//Inspeccion
		tx.executeSql('DELETE FROM Inspeccion');
		tx.executeSql('DELETE FROM DetalleInspeccion');
		tx.executeSql('DELETE FROM FotoInspeccion');
		tx.executeSql('DELETE FROM Documento');
		tx.executeSql('DELETE FROM SendMailInspeccion');
		tx.executeSql('DELETE FROM Pdf');
		//Peticiones
		tx.executeSql('DELETE FROM Peticiones');
		//Catalogos
		tx.executeSql('DELETE FROM CatalogoMoneda');
		tx.executeSql('DELETE FROM CatalogoConcepto');
		tx.executeSql('DELETE FROM CatalogoEstadoInspeccion');
		tx.executeSql('DELETE FROM CatalogoGrupoDocumento');
		tx.executeSql('DELETE FROM CatalogoTipoAnexo');
		tx.executeSql('DELETE FROM CatalogoTipoFoto');
		tx.executeSql('DELETE FROM CatalogoTarea');
		tx.executeSql('DELETE FROM CatalogoSubtarea');
		tx.executeSql('DELETE FROM CatalogoAjustador');
	});
}

/**
 * Funcion que ejecuta un query y ejecuta una callback
 * @param {string} query 
 * @param {Array<Object>=} params
 * @param {Function=} callback
 * @param {Object=} insert
 * @deprecated utilizar sqlPromise
 */
function sqlQuery(query, params, callback, insert) {
	var results = new Array();
	db.transaction(function (tx) {
		tx.executeSql(query, params, function (tx, data) {
			if (callback != undefined && callback != null) {
				if (data.rows.length != 0) {
					for (var i = 0; i < data.rows.length; i++) {
						results.push(data.rows.item(i));
					}
					callback(results);
				} else if (insert == true) {
					if (data.insertId) {
						callback(data.insertId);
					}
				} else {
					callback(true);
				}
			}
		});
	}, function(error) {
		console.error('query:', query)
		sqlError(error, query);
	});
}

/**
 * Funcion que ejecuta un query y regresa una promesa con el resultado
 * @param {string} query 
 * @param {Array<Object>=} params
 * @returns {Promise<SQLResultSet>}
 */
function sqlPromise(query, params) {
    return new Promise((resolve, reject) => {
        db.transaction(function (transaction) {
            transaction.executeSql(query, params, function (transaction, result) {
                resolve(result);
            });
        }, function(e) {
			if (CONFIGURACION_LOGGER.baseDatos.disponible === true) {
				if (e.code != null) {
					baseDatosLog.error(`error transaccion query ${query}\ncodigo:${e.code} mensaje:${e.message}`, e);
				} else {
					baseDatosLog.error(`error transaccion query ${query}`, e.toString(), e);
					baseDatosLog.error('error stacktrace', e.stack);
				}
			} else {
				console.error(`[baseDatos] query ${query}`, 'error transaccion', e);
				console.error('[baseDatos]', 'error stacktrace', e.stack);
			}
			reject(e)
		});
    })
}

/**
 * Funcion para convertir transformar un SQLResultSet en un arreglo normal
 * @param {SQLResultSet} result
 * @returns {Array<Object>}
 */
function rowsAsList(result) {
    let lista = []
    for (var i=0; i < result.rows.length; i++) {
        lista.push(result.rows.item(i));
    }
    return lista
}

/**
 * Función que muestra el mensaje
 * de error para los querys
 * @param {Error} e 
 */
function sqlError(e, query) {
	if (CONFIGURACION_LOGGER.baseDatos.disponible === true) {
		if (e.message != null) {
			baseDatosLog.error(`error transaccion query:${query}\nmensaje:${e.message}`, e);
		} else {
			baseDatosLog.error('error transaccion', e.toString(), e);
			baseDatosLog.error('error stacktrace', e.stack);
		}
	} else {
		console.error('[baseDatos]', 'error transaccion', e);
		console.error('[baseDatos]', 'error stacktrace', e.stack);
	}
}
