/**
 * Inicia la carga del formulario
 * de fotografías
 * @class
 */

let InspeccionFotografia = {
    /** @type {HTMLInputElement} */
    input: null,
    /** @type {HTMLInputElement} */
    inputFile: null,
    /** @type {HTMLInputElement} */
    inputBase64: null,
    boton: null,

    /**
     * Muestra las opciones para subir una imagen
     * Android - muestra un action sheet
     * iOS - utiliza un input file
     * @param {*} e 
     */
    mostrarOpciones(e) {
        this.boton = e.target;
        this.input = e.target.parentElement.querySelector('[data-foto]');
        this.inputBase64 = e.target.parentElement.querySelector('[data-base64]');
        this.inputFile = e.target.parentElement.querySelector('[data-archivo-asociado]');        
        fn.showActionSheet();
    },

    /**
     * Opcion para cargar imagen con camara con cordova-plugin-camera
     */
    abrirCamara() {
        openPhotoCamera(foto => {
            console.error('camara', foto)
            this.copiarImagen(foto)
                .catch(error => this.mostrarError(error))
        }, error => this.mostrarError(error));
    },
    
    /**
     * Opcion para cargar imagen de galeria con cordova-plugin-camera
     */
    abrirGaleria() {
        openPhotoLibrary(foto => {
            this.copiarImagen(foto)
                .catch(error => this.mostrarError(error))
        }, error => this.mostrarError(error));
    },

    /**
     * Opcion para cargar imagen utilizando un input
     */
    abrirArchivos(e) {
        return new Promise((resolve, reject) => {
            DocumentPicker.getFile('all', resolve, reject);
        }).then(fileURL => {
            let extension = fileURL.split('.').pop().toLowerCase();
            let nombre = getUUID() + '.' + extension;
            if (!(extension == 'jpg' || extension == 'png' || extension == 'jpeg')) {
                showError('Extension del archivo debe ser jpg, jpeg o png');
                return;
            }
            return Promise.all([
                Directorios.obtenerDirectorioGasto(), // 0
                nombre, // 1
                Directorios.obtenerBlobArchivo(fileURL), // 2
                Directorios.obtenerBase64Archivo(fileURL) // 3
            ])
        }).then(data => {
            return Directorios.guardarArchivo(data[0].nativeURL, data[1], data[2])
                .then(fileEntry => ({fileEntry, base64: data[3]}))
        }).then(resultado => {
            if (device.platform == 'iOS') {
                this.input.value = resultado.fileEntry.fullPath;
                this.inputBase64.value = resultado.base64;
            } else {
                this.input.value = resultado.fileEntry.nativeURL;
            }
            this.exito();
        }).catch(error => {
            showError('No se pudo cargar la imagen');
            this.mostrarError(error);
        })
    },

    /** 
     * Dada la direccion de una foto la copia a la aplicacion
     * @param {string} foto direccion de la foto
     */
    copiarImagen(foto) {
        console.error('entrada', foto)
        let idSiniestro = window.localStorage.getItem("idSiniestroServidor");

        return Directorios.obtenerArchivo(foto).then(fileEntry => {
            let extension = fileEntry.name.split('.').pop().toLowerCase();
            let tieneExtension = extension == 'jpg' || extension == 'jpeg' || extension == 'png';
            let nombre = getUUID() + '.' + (tieneExtension ? extension : 'jpg');

            return Promise.all([
                Directorios.obtenerDirectorioEspinosaPhotos(idSiniestro)
                    .then(dir => Directorios.copiarArchivo(fileEntry, dir, nombre)),
                Directorios.obtenerBase64Archivo(foto)
            ]).then(resultados => {
                console.error('resultados', resultados);
                this.input.value = resultados[0].fullPath;
                if (device.platform == 'iOS') {
                    this.input.value = resultados[0].fullPath;
                } else {
                    this.input.value = resultados[0].nativeURL;
                }
                this.inputBase64.value = resultados[1];
                this.exito();
            })
        })
    },

    /**
     * Funcion para guardar las fotos en la base de datos
     */
    guardarFotos() {
        document.getElementById('btnSubirFotografiasInspeccion').setAttribute('disabled', 'disabled');
        document.getElementById('btnSubirFotografiasInspeccion').insertAdjacentHTML('beforeend', `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style="margin-bottom: 2px;"></span>`)
        let obtenerFecha = (date) => date.getDate().toString().padStart(2, 0) + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear().toString();
        let numeroSiniestro = window.localStorage.getItem("idSiniestroServidor");
        let promesas = [];
        let secciones = document.querySelectorAll('[data-seccion-foto]');
        for (let i = 0; i < secciones.length; i++) {
            /** @type {HTMLInputElement} */
            let fotoInput = secciones[i].querySelector('[data-foto]');
            let fotoBase64 = secciones[i].querySelector('[data-base64]').value;
            let fotoPromesa = Promise.resolve(fotoInput.value)
            let comentario = secciones[i].querySelector('[data-comentario]').value;
            /** @type {HTMLSelectElement} */
            let tipoSelect = secciones[i].querySelector('[data-tipo]');
            let fechaIngreso = obtenerFecha(new Date());
            let tipoTexto = tipoSelect.options[tipoSelect.selectedIndex].innerText;
            let tipo = tipoSelect.value;
            console.error('guardando foto', {fotoInput, fotoBase64});
            let promesa = fotoPromesa
                .then(foto => sqlPromise(`INSERT INTO FotoInspeccion (fotos_nombre, fotos_observaciones, up_documento, 
                        base64, edita_dato, fecha_ingreso, tipo_foto_nombre) VALUES (?,?,?,?,?,?,?)`, 
                    [tipo, comentario, foto, fotoBase64, numeroSiniestro, fechaIngreso, tipoTexto]))
                .then(r => r.insertId)
                .then(fotoId => guardarPeticionPromise(server + 'fotos.php', 'DOCUMENT', 'FotoInspeccion', 'idFoto', fotoId))
                .catch(error => fotoLog.error(error))
            promesas.push(promesa)
        }
        return Promise.all(promesas)
            .then(() => {
                showSuccess("Se han guardado las fotos exitosamente");
                window.localStorage.removeItem('cantidadFotosTotal');
                backVerInspeccion();
        })
    },

    /**
     * Muestra la foto cargada exitosamente
     */
    exito() {
        this.boton.style.backgroundColor = '#FE8416';
        this.boton.style.color = 'white';
        this.boton.innerHTML = 'Seleccionada';
    },

    /**
     * Muestra la foto sin cargar
     * @param {Error} error 
     */
    mostrarError(error) {
        if (error != null)
            fotoLog.error('Fallo carga de foto de inspeccion', error)
        this.input.type = 'text';
        this.input.val = null;
        this.boton.style.backgroundColor = 'white';
        this.boton.style.color = '#FE8416';
        this.boton.innerHTML = 'Cargar Fotografia';
    }
};