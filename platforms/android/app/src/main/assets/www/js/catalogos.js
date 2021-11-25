function getCatalogosVersion(callback, catalogoVersion){
    // ?v= mandar la ultima version no regresa los catalogos correctos
    var obtenerCatalogos = () => new Promise((resolve, reject) => sendGetRequest('catalogos.php', resolve, reject));
    
    showLoading()
    return obtenerCatalogos()
        .then(catalogos => {
            if (catalogos != null && catalogos["bita_objetivo "] != null) {
                // aplicar correccion el nombre que regresa el webservice es incorrecto
                catalogos.bita_objetivo = catalogos["bita_objetivo "];
            }
            // verificar catalogos
            if (catalogos == null || catalogos.moneda == null || catalogos.moneda.length == 0 || catalogos.concepto == null || 
                catalogos.concepto == null || catalogos.concepto.length == 0 ||
                catalogos.estado_inspeccion == null || catalogos.concepto.length == 0 ||
                catalogos.tipo_anexo_g == null || catalogos.tipo_anexo_g.length == 0 ||
                catalogos.tipo_anexo == null || catalogos.tipo_anexo.length == 0 ||
                catalogos.tipo_foto == null || catalogos.tipo_foto.length == 0 ||
                catalogos.bita_accion == null || catalogos.bita_accion.length == 0 ||
                catalogos.bita_objetivo == null || catalogos.bita_objetivo.length == 0) {
                    return Promise.reject({message: 'Faltan catalogos', catalogos})
                }
            
                //Guardar catalogo de moneda
            if(catalogos.moneda){
                if(catalogos.moneda.length != 0 && catalogos.moneda != null && catalogos.moneda != undefined){
                    guardarMonedas(catalogos.moneda);
                }
            }
            
            //Guardar catalogo de concepto
            if(catalogos.concepto){
                if(catalogos.concepto != null && catalogos.concepto != undefined && catalogos.concepto.length != 0){
                    guardarConceptos(catalogos.concepto);
                }
            }
            
            //Guardar catalogo de estatus inspeccion
            if(catalogos.estado_inspeccion){
                if(catalogos.estado_inspeccion != null && catalogos.estado_inspeccion != undefined && catalogos.estado_inspeccion.length != 0){
                    guardarEstadoInspeccion(catalogos.estado_inspeccion);
                }
            }
            
            //Guardar catalogo de grupo de documentos
            if(catalogos.tipo_anexo_g){
                if(catalogos.tipo_anexo_g != null && catalogos.tipo_anexo_g != undefined && catalogos.tipo_anexo_g.length != 0){
                    guardarGrupoDocumento(catalogos.tipo_anexo_g);
                }
            }
            
            //Guardar catalogo de tipo de anexos
            if(catalogos.tipo_anexo){
                if(catalogos.tipo_anexo != null && catalogos.tipo_anexo != undefined && catalogos.tipo_anexo.length != 0){
                    guardarTipoAnexo(catalogos.tipo_anexo);
                }
            }
            
            //Guardar catalogo de tipo de fotos
            if(catalogos.tipo_foto){
                if(catalogos.tipo_foto != null && catalogos.tipo_foto != undefined && catalogos.tipo_foto.length != 0){
                    guardarTipoFoto(catalogos.tipo_foto);
                }
            }
            
            //Guarda catalogo de tareas
            if(catalogos.bita_accion){
                if(catalogos.bita_accion != null && catalogos.bita_accion != undefined && catalogos.bita_accion.length != 0){
                    guardarTarea(catalogos.bita_accion);
                }
            }
            
            //Guarda cataloogo de subtareas
            if(catalogos["bita_objetivo "]){
                if(catalogos["bita_objetivo "] != null && catalogos["bita_objetivo "] != undefined && catalogos["bita_objetivo "].length != 0){
                    guardarSubtarea(catalogos["bita_objetivo "]);
                }
            }  

            if (catalogos.user) {
                guardarUsuariosAjustadores(catalogos.user);
            }
            return Promise.resolve('algo');
        })
}

/**
 * Funcion que almacena el catalogo de moneda
 * @param {*} catalogoMoneda 
 */
function guardarMonedas(catalogoMoneda){
    var query = 'INSERT INTO CatalogoMoneda (moneda_id, '
                + 'moneda_user, '
                + 'moneda_estado, '
                + 'moneda_nombre, '
                + 'moneda_simbolo, '
                + 'moneda_id_penta, '
                + 'moneda_nombre_penta, '
                + 'moneda_fecha) VALUES (?,?,?,?,?,?,?,?)';
    catalogoMoneda.forEach(function(moneda){
        sqlQuery('SELECT * FROM CatalogoMoneda WHERE moneda_id = ?', [moneda.moneda_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(moneda), null);
            }
        });
    }); 
}

/**
 * Funcion que almacena el catalogo de conceptos
 * @param {} catalogoConcepto 
 */
function guardarConceptos(catalogoConcepto){
    var query = 'INSERT INTO CatalogoConcepto (concepto_id, '
                + 'concepto_tex, '
                + 'concepto_grupo) VALUES (?,?,?)';
    
    catalogoConcepto.forEach(function(concepto){
        sqlQuery('SELECT * FROM CatalogoConcepto WHERE concepto_id = ?', [concepto.concepto_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(concepto), null);
            }
        });
    });         
}

/**
 * Función que almacena el catalogo
 * de estatus de inspección
 * @param {} catalogoEstatus 
 */
function guardarEstadoInspeccion(catalogoEstatus){
    var query = 'INSERT INTO CatalogoEstadoInspeccion (estado_inspecc_id, '
                + 'estado_inspecc_nombre) VALUES (?,?)';
    
    catalogoEstatus.forEach(function(estatus){
        sqlQuery('SELECT * FROM CatalogoEstadoInspeccion WHERE estado_inspecc_id = ?', [estatus.estado_inspecc_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(estatus), null);
            }
        });
    });        
}

/**
 * Función que almacena el catalogo
 * de grupo documento
 * @param {* JSON} catalogoGrupoDoc 
 */
function guardarGrupoDocumento(catalogoGrupoDoc){
    var query = 'INSERT INTO CatalogoGrupoDocumento (tipo_anexo_g_id, '
                + 'tipo_anexo_g_user, '
                + 'tipo_anexo_g_nombre, '
                + 'tipo_anexo_g_fecha) VALUES (?,?,?,?)';
    
    catalogoGrupoDoc.forEach(function(grupo){
        sqlQuery('SELECT * FROM CatalogoGrupoDocumento WHERE tipo_anexo_g_id = ?', [grupo.tipo_anexo_g_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(grupo), null);
            }
        });
    });        
}

/**
 * Función que almacena el catalogo de 
 * los tipos de anexo
 * @param {*} catalogoAnexo 
 */
function guardarTipoAnexo(catalogoAnexo){
    var query = 'INSERT INTO CatalogoTipoAnexo (tipo_anexo_id, '
                + 'tipo_anexo_user, '
                + 'tipo_anexo_grupo, '
                + 'tipo_anexo_nombre, '
                + 'tipo_anexo_fecha, '
                + 'tipo_anexo_cia, '
                + 'tipo_anexo_aseg, '
                + 'tipo_anexo_corred) VALUES (?,?,?,?,?,?,?,?)';

    catalogoAnexo.forEach(function(tipo){
        sqlQuery('SELECT * FROM CatalogoTipoAnexo WHERE tipo_anexo_id = ?', [tipo.tipo_anexo_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(tipo), null);
            }
        });
    });        
}

/**
 * Función que almacena el catalogo
 * de los tipos de foto
 * @param {*} catalogoFoto 
 */
function guardarTipoFoto(catalogoFoto){
    var query = 'INSERT INTO CatalogoTipoFoto (tipo_foto_id, '
                + 'tipo_foto_user, '
                + 'tipo_foto_nombre, '
                + 'tipo_foto_fecha) VALUES (?,?,?,?)';
    
    catalogoFoto.forEach(function(tipoFoto){
        sqlQuery('SELECT * FROM CatalogoTipoFoto WHERE tipo_foto_id = ?', [tipoFoto.tipo_foto_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(tipoFoto), null);
            }
        });
    });
}

/**
 * Función que guarda el catalogo
 * de tarea
 * @param {} catalogoTarea 
 */
function guardarTarea(catalogoTarea){
    var query = 'INSERT INTO CatalogoTarea (bita_accion_id, '
                + 'bita_accion_estado, '
                + 'bita_accion_tex, '
                + 'bita_accion_cia, '
                + 'bita_accion_aseg, '
                + 'bita_accion_corre, '
                + 'bita_accion_facturable) VALUES (?,?,?,?,?,?,?)';

    catalogoTarea.forEach(function(tarea){
        sqlQuery('SELECT * FROM CatalogoTarea WHERE bita_accion_id = ?', [tarea.bita_accion_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(tarea), null);
            }
        });
    });
}

/**
 * Función que guarda el catalogo
 * de subtarea
 * @param {*} catalogoSubtarea 
 */
function guardarSubtarea(catalogoSubtarea){
    var query = 'INSERT INTO CatalogoSubtarea (bita_objetivo_id, '
                + 'bita_objetivo_accion, '
                + 'bita_objetivo_estado, '
                + 'bita_objetivo_text) VALUES (?,?,?,?)';

    catalogoSubtarea.forEach(function(subtarea){
        sqlQuery('SELECT * FROM CatalogoSubtarea WHERE bita_objetivo_id = ?', [subtarea.bita_objetivo_id], function(result){
            if(result == true){
                sqlQuery(query, fn.JsonToArray(subtarea), null);
            }
        });
    });
}


function getConceptoPorId(idConcepto, callback){
    sqlQuery('SELECT * FROM CatalogoConcepto WHERE concepto_id = ?', [idConcepto], function(conceptos){
        if(conceptos != true){
            callback(conceptos[0]);        
        }else{
            showNotice("No se encontro el concepto solicitado");
        }
    });
}

function getMonedaPorId(idMoneda, callback){
    sqlQuery('SELECT * FROM CatalogoMoneda WHERE moneda_id = ?', [idMoneda], function(monedas){
        if(monedas != true){
            callback(monedas[0]);
        }else{
            showNotice("No se encontró la moneda solicitada");
        }
    });
}

function guardarUsuariosAjustadores(usuarios) {
    let promesasInsertar = usuarios.map(u => {
        return sqlPromise(`INSERT INTO CatalogoAjustador(
            id, departamento, division,
            division_2, comuna, sucursal,
            tipo, tipo_tarifa, activo,
            caso_bloqueo, rut, nombre,
            iniciales, direccion, fono,
            celular, mail, web,
            firma, clave
        ) VALUES (
            ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?
        )`, [
            parseInt(u.user_id), u.user_departamento, u.user_division,
            u.user_division_2, u.user_comuna, u.user_sucursal,
            u.user_tipo, u.user_tipo_tarifa, u.user_activo,
            u.user_caso_bloqueo, u.user_rut, u.user_nombre != null ? u.user_nombre.trim() : '',
            u.user_iniciales, u.user_direccion, u.user_fono,
            u.user_celular, u.user_mail, u.user_web,
            u.user_firma, u.user_clave
         ]).catch(e => {

         })
    })
    return Promise.all(promesasInsertar);
}