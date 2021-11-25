/**
 * @global
 */
var CONFIGURACION_LOGGER = {
    baseDatos: {
        disponible: false
    }
}

/** 
 * @global
 * @type {Logger}
 * */
var appLog = getLogger('applog');

/**
 * @typedef {Object} Logger
 * @property {function} warn
 * @property {function} trace
 * @property {function} debug
 * @property {function} info
 * @property {function} error
 */

/**
 * Funcion para crear logger
 * @param {string} name 
 * @returns {Logger}
 */
function getLogger(name) {
    return {
        format(level, args) {
            var msg = '';
            for (var i = 0; i < args.length; i++) {
                if (typeof(args[i]) != 'object' || args[i] == null || args[i] instanceof String || args[i] instanceof Number || args[i] instanceof Boolean) {
                    msg += args[i] + ' ';
                } else {
                    try {
                        msg += JSON.stringify(args[i]) + ' ';
                    } catch(e) {
                        msg += args[i] + ' ';
                    }
                }
            }
            return `[${new Date().toLocaleString()}] ${level} ${name != null ? '[' + name + '] ' : ''}${msg}`;
        },
        logToDB(msg) {
            if (CONFIGURACION_LOGGER.baseDatos.disponible) {
                sqlQuery('SELECT count(msg) as conteo FROM Logger', [], resultado => {
                    if (resultado[0].conteo > 100) {
                        sqlQuery(`DELETE FROM Logger WHERE rowid IN (SELECT rowid FROM Logger limit ${parseInt(resultado[0].conteo)-100})`)
                    }
                });
                sqlQuery('INSERT INTO Logger (msg) VALUES (?)', [msg]);
            }
        },
        logToConsole(level, logFunction, logArgs) {
            args = [`[${new Date().toLocaleString()}] ${level} ${name != null ? '[' + name + ']' : ''}`];
            for( var i = 0; i < logArgs.length; i++ ) {
                args.push(logArgs[i] );
            }
            logFunction.apply( console, args );
        },
        warn() {
            this.logToConsole('WARN', console.warn, arguments)
            this.logToDB(this.format('WARN', arguments));
        },
        trace() {
            this.logToConsole('TRACE', console.log, arguments)
            this.logToDB(this.format('TRACE', arguments));
        },
        debug() {
            this.logToConsole('DEBUG', console.log, arguments)
            this.logToDB(this.format('DEBUG', arguments));
        },
        info() {
            this.logToConsole('INFO', console.info, arguments)
            this.logToDB(this.format('INFO', arguments));
        },
        error() {
            this.logToConsole('ERROR', console.error, arguments)
            this.logToDB(this.format('ERROR', arguments));
        }
    }
}

/** 
 * Descargar log
 */
function downloadLogFile() {
    var obtenerLogs = () => sqlPromise('SELECT * FROM Logger', [])
        .then(rowsAsList)
        .then(lista => lista.map(log => log.msg))
        .then(logs => logs.join('\n'));
    
    return obtenerLogs().then(logs => {
        let blob = stringToBlob(logs, 'text/plain');
        console.error('logs', logs)
        return Directorios.obtenerDirectorioEspinosaDocs().then(dir => {
            console.error('directorio', dir)
            return Directorios.guardarArchivo(dir.nativeURL, 'kronos.log', blob, 'text/plain')
        })
    })
    .then(file => {
        showSuccess('Se descargo kronos.log en ' + file.nativeURL)
        abrirDocumentoConAplicacionDeTerceros(file.nativeURL, 'text/plain');
    })
    .catch(error => console.error(error))
}

/**
 * Atrapar los errores que no fueron atrapado y ponerlos en el log
 */
window.onerror = function(msg, url, line, col, error) {
    appLog.error(`Unhandled line ${line} column ${col} message:${msg} \n stacktrace:`, error.stack)
 };
