"use strict";
/**
 * Funcionalidad para seleccionar un documento en inspeccion
 * @class
 */
const InspeccionSubirDocumento = {
    label: null,
    boton: null,
    span: null,
    texto: 'Cargar documento',
    textoExito: 'Cargar documento',
    extensiones: ['pdf', 'doc', 'docx'],

    /**
     * Funcion para cargar un documetno
     * en iOS utiliza FilePicker y en 
     * android utiliza un input
     * @param {Event} e 
     */
    cargarDocumento(e) {
        this.boton = e.target;
        this.label = this.boton.parentNode;
        this.span = this.label.querySelector('span');
        if (device.platform == 'iOS') {
            this.cargarDocumentoIOS();
        } else {
            let inputFile = document.getElementById('documentoArchivo');
            inputFile.onchange = e => this.cargarDocumentoAndroid(e);
            inputFile.click();
        }
    },

    /**
     * Funcion para cargar el documento en Android utilizando un input,
     * la funcion es disparada con el evento onchange del input
     * @returns {Promise}
     */
    cargarDocumentoAndroid(e) {
        return Promise.resolve().then(() => {
            /** @type {HTMLInputElement} */
            let input = e.target;
            let extension = input.value.split('.').pop().toLowerCase();   
            let newName = getUUID() + '.' + extension;
            let extensionValida = this.extensiones.find(e => e == extension);
            if (!extensionValida) {
                showError('La extension no es valida');
                return Promise.reject('Extension invalida'); 
            }
            // si es valido se guarda
            return Promise.all([
                Directorios.obtenerDirectorioGasto(), // 0
                Directorios.obtenerBlobInput(input) // 1
            ]).then(data => {
                return Directorios.guardarArchivo(data[0].nativeURL, newName, data[1])
            })
        }).then(fileEntry => {
            this.mostrarExito(fileEntry);
        }).catch(error => {
            fotoLog.error('Fallo carga de foto de gasto', error)
            showError('No se pudo cargar el documento de gasto')
            this.restablecer();
        })
    },

    /**
     * Funcion para cargar el documento en iOS usando el plugin FilePicker
     * @returns {Promise}
     */
    cargarDocumentoIOS() {
        return new Promise((resolve, reject) => {
            FilePicker.pickFile(resolve, reject);
        }).then(file => {    
            file = file.replace("/private", "file://");
            let extension = file.split('.').pop().toLowerCase();
            let newName = getUUID() + '.' + extension;
            // rechazar si la extension es invalida
            if (!(extension == 'doc' || extension == 'docx' || extension == 'pdf')) {
                showError('La extension no es valida');
                return Promise.reject('Extension invalida'); 
            }
            // si es valido se guarda
            return Promise.all([
                Directorios.obtenerDirectorioGasto(), // 0
                Directorios.obtenerBlobArchivo(file) // 1
            ]).then(data => {
                return Directorios.guardarArchivo(data[0].nativeURL, newName, data[1])
            })
        }).then(fileEntry => {
            this.mostrarExito(fileEntry);
        }).catch(error => {
            fotoLog.error('Fallo carga de foto de gasto', error)
            showError('No se pudo cargar el documento de gasto')
            this.restablecer();
        })
    },

    mostrarExito(fileEntry) {
        document.querySelector('[data-documento]').value = fileEntry.nativeURL;
        this.label.style.backgroundColor = '#FE8416';
        this.label.style.color = 'white';
        this.span.innerHTML = 'Documento cargado';
    },

    restablecer() {
        this.label.style.backgroundColor = 'white';
        this.label.style.color = '#FE8416';
        this.span.innerHTML = 'Cargar documento';
    }
}