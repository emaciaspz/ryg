window.fn = {};

/**
 * Función para abrir el panel de usuario
 */
window.fn.open = function() {
  var menu = document.getElementById('menu');
  panelUsuario();
  menu.open();
};

/**
 * Función para cambiar de página
 * @param {string} page ons-page
 * @returns {Promise<void>}
 */
window.fn.load = function(page) {
  $('#content').html('');
  let content = document.getElementById('content');
  console.error(content)
  // content.innerHTML = '';
  let menu = document.getElementById('menu');
  return content.load(page)
    .then(menu.close.bind(menu))
    .catch(error => console.error('error al cargar pagina/cerrar menu', error));
};

/**
 * Funcion que muestra el numero de pagina
 * de cada pantalla del listado
 * 
 * @param {recibe el numero total} totalRegistros
 * @param {indica la pagina actual} pageOriginal
 */
window.fn.pagination = function(totalRegistros, pageOriginal){
  var html = '';
  var casImp = 1; //Contador de impresion de paginacion
  var limitGastoUser = window.localStorage.getItem("limitGastoUsuario");
  var paginasTotales = fn.getTotalPages(totalRegistros, limitGastoUser?limitGastoUser:20);  //Se obtiene el total de páginas
  var countPage = pageOriginal; //Cuenta la cantidad de paginas

  //Paginacion
  html += '<div class="paginationDiv">';
    html += '<ul class="pagination pagination-md justify-content-center">';
      
      //Mostrar 2 paginas antes y 2 paginas despues
      if(3 <= pageOriginal){
        countPage = countPage-2;
      }else if(2 == pageOriginal){ //En pagina 2, mostrar una pagina anterior
        countPage = countPage-1;
      }

      //Boton regresar
      if(pageOriginal > 1){
        html += '<li class="page-item pagNumberPage" id="dirPage-' + (parseInt(pageOriginal)-1) + '"><a class="page-link" id="pagBackPage"><ons-icon icon="md-arrow-left"></ons-icon></a></li>';
      }
      //Limite máximo de casillas
      var limiteCasillas;
      if(paginasTotales < 5){
        limiteCasillas = paginasTotales;
      }else{
        limiteCasillas = 5;
      }

      //Casillas de las paginas
      while(casImp <= paginasTotales && casImp <= limiteCasillas && countPage <= paginasTotales){
        html += '<li class="page-item pagNumberPage" id="page-' + countPage +'" style="color:white !important;" ><a class="page-link">' + countPage + '</a></li>';       
        casImp ++;
        countPage++;                    
      }
      //Boton avanzar
      if(pageOriginal < paginasTotales){
        html += '<li class="page-item pagNumberPage" id="dirPage-' + (parseInt(pageOriginal)+1) + '"><a class="page-link" id="pagNextPage"><ons-icon icon="md-arrow-right"></ons-icon></a></li>';
      }
    html += '</ul>';
  html += '</div>';
  return html;
}

/**
 * Funcion que obtiene el total de paginas a mostrar
 * en un listado
 * @param {Numero total de registros} allData
 * @param {numero de registros por pagina} limit
 */
window.fn.getTotalPages = function(allData, limit){
    return Math.ceil(allData / limit); 
}


/**
 * Función para mostrar la cantidad
 * de resultados vistos
 */
window.fn.dataViewed = function(totalRegistros, pageActual, limit){
  var maxView = limit*pageActual;
  if(maxView > totalRegistros){
    maxView = totalRegistros;
  }
  return '<center><strong><p>' + ((limit*(pageActual-1))+1) + ' al ' + (maxView) + " de " + totalRegistros + '</p></strong></center>';
}

/**
 * Funcion para establecer un limite dinamico
 */
window.fn.dinamicLimit = function(totalRegistros){
  var total = window.localStorage.getItem("limitGastoUsuario");
  if(total != null && total != undefined){
    return total;
  }else{
    return totalRegistros<20?totalRegistros:20;
  }
}

/**
 * Función para establecer un formato 
 * para la fecha
 */
window.fn.formatDate = function(date, spliter){
  var originalDate = date.split(spliter)[0];
  var newDate = moment(originalDate, "YYYY-MM-DD").format("DD/MM/YYYY");
  return newDate;
}

window.fn.formatDate2 = function(date, spliter){
  var originalDate = date.split(spliter)[0];
  var newDate = moment(originalDate, "YYYY-DD-MM").format("DD/MM/YYYY");
  return newDate;
}

window.fn.getDateToString = function(date){
  var dd = date.getDate();
  dd = numeral(dd).format('00');
  var mm = date.getMonth()+1; //January is 0!
  mm = numeral(mm).format('00');
  var yyyy = date.getFullYear();
  var dateString = yyyy+'-'+dd+'-'+mm;
  return dateString;
}

window.fn.getDateYMD = function(date){
  var dd = date.getDate();
  dd = numeral(dd).format('00');
  var mm = date.getMonth()+1; //January is 0!
  mm = numeral(mm).format('00');
  var yyyy = date.getFullYear();
  var dateString = yyyy+'-'+mm+'-'+dd;
  return dateString;
}

/**
 * Función que transforma un objeto JSON 
 * a un arreglo
 */
window.fn.JsonToArray = function(json_ada){
  var result = [];
  var keys = Object.keys(json_ada);
  keys.forEach(function(key){
      result.push(json_ada[key]);
  });
  return result;
}

window.fn.closeModal = function(idModal){
  var modal = document.getElementById(idModal);
  modal.hide(); 
}

window.fn.openModal = function(idModal){
  var modal = document.getElementById(idModal);
  modal.show();
}

var contentLoaded = 0;

/**
* Funcion del progress bar para
* generar tiempo de espera
*/
function progressBar() {
  var elem = document.getElementById("myBar");
  var width = 10;
  var id = setInterval(frame, 35);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      var idSinspeccionSin = window.localStorage.getItem("inspeccionSinSiniestro");
      if(idSinspeccionSin != null && idSinspeccionSin != undefined){
        verInspeccion(idSinspeccionSin, null, window.localStorage.getItem("idSiniestroServidor"));
        window.localStorage.removeItem("inspeccionSinSiniestro")
      }else{
        fn.load('ref.html');
      }
    } else {
      if(width <= contentLoaded){
        width++; 
        elem.style.width = width + '%'; 
        elem.innerHTML = width * 1  + '%';
      }else if(width == 10){
        elem.innerHTML = 'Descargando datos ...';
      }
    }
  }
}

/**
 * PROGRESS BAR FOTOGRAFIAS
 * Funcion independiente para las fotografias debido a que consume mucho tiempo
 */
var contentLoadedFotografias = 0; //Porcentaje de carga de fotografías
                                          
function progressBarFotografias() {
  var elem = document.getElementById("myBarFotografias");
  var width = 10;
  var id = setInterval(frame, 35);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      showSuccess("Se han descargado las fotografías correctamente");
      openFotografiasCargadas();
    } else {
      if(width <= contentLoadedFotografias){
        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1  + '%';
      }else if(width == 10){
        elem.innerHTML = 'Descargando fotografías ...';
      }
    }
  }
}

/**
 * Convierte una fecha en formato YYYY-MM-DD
 * @param {Date} date 
 * @returns {string}
 */
var obtenerFecha = (date) => 
  date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);

/**
 * Convierte una fecha en formato YYYY-MM-DD HH:MM:SS
 * @param {Date} date 
 * @returns {string}
 */
var obtenerFechaHHMMSS = (date) => 
  date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0) + ' '
  + date.getHours().toString().padStart(2, 0) + ':'  + date.getMinutes().toString().padStart(2, 0) + ':' 
  + date.getSeconds().toString().padStart(2, 0); 

/**
 * Función para obtener la fecha
 * actual
 */
window.fn.getFechaActual = function(date, spliter){
  var dd = date.getDate();
  dd = numeral(dd).format('00');
  var mm = date.getMonth()+1; //January is 0!
  mm = numeral(mm).format('00');
  var yyyy = date.getFullYear();
  var hh = date.getHours();
  hh = numeral(hh).format('00');
  var minmin = date.getMinutes();
  minmin = numeral(minmin).format('00');
  var ss = date.getSeconds();
  ss = numeral(ss).format('00');
  
  var dateString = yyyy+'-'+mm+'-'+dd+' '+ hh+':'+minmin+':'+ss;
  return dateString;
}

window.fn.onEnterPress = function(callback){
  $(document).keypress(function(e) {
    if(e.which == 13) {
        callback();
    }
  });
}

window.fn.checkValidDate = function(date) {
  var newDate = date;
  if(date != undefined) {
    newDate = fn.formatDate(date);
    if(newDate == 'Invalid date') {
      newDate = fn.formatDate2(date);
      if(newDate == 'Invalid date') {
        newDate = undefined;
      }
    }
  }
  return newDate;
}

function checkEmail(email){
  var regExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return regExp.test(email);
}
  
function checkEmails (idInput){
  var emails = $('#' + idInput).val().trim();
  var emailArray = emails.split(",");
  var emailsWithError = new Array();
  //Se valida cada email
  for(i = 0; i <= (emailArray.length - 1); i++){
    if(emailArray != ''){
      var isEmailValid = checkEmail(emailArray[i].trim());
      if(!isEmailValid){
        emailsWithError.push(emailArray[i]);
      }
    }
  }
  //Si el arreglo de emails con error contiene al menos un registro, se envía
  if(emailsWithError.length != 0){
    return emailsWithError;
  }else{ //Si no hay emails con error, permite continuar
    return true;
  }
}

function validateForm(idForm, successHandler){
  $('#' + idForm).validate({
      errorClass: "errorForm",
      validClass: "validForm",
      submitHandler: successHandler,
      invalidHandler: function (event, validator){
          if(validator.numberOfInvalids()){
              showError("Revisa los campos marcados");
          }
      }
  });
}

function loadActionSheet(idActionSheet) {
  ons.ready(function () {
    ons.createElement(idActionSheet, { append: true })
      .then(function (sheet) {
        fn.showActionSheet = sheet.show.bind(sheet);
        fn.hideActionSheet = sheet.hide.bind(sheet);
      });
  });
}

/**
 * Función que obtiene el directorio local del
 * dispositivo de los documentos cargados a la 
 * aplicación
 * @param {filechooser file.uri} dir 
 * @param {funcion retorno} callback 
 */
function resolveLocalDevicePath(dir, callback){
  var fileDir = dir.split("0/")[1];
  if(fileDir == undefined){ //Si fileDir es indefinido, se obtiene nuevamente
    window.resolveLocalFileSystemURI(dir, function(dirFix){
      fileDir = dirFix.fullPath.split("0/")[1];
      if(fileDir == undefined){
        window.FilePath.resolveNativePath(dir, function(dirFix2) {
          callback(dirFix2);
        });
      }else{
        //Se obtiene el directorio absoluto
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dataDir){
          var fullDir = dataDir.nativeURL + fileDir;
          callback(fullDir);
        });
      }
    });
  }else{ //Si existe fileDir, se obtiene el directorio absoluto
    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dataDir){
      if(dataDir != undefined){
        var fullDir = dataDir.nativeURL + fileDir;
        callback(fullDir);
      }else{
        window.FilePath.resolveNativePath(dir, function(dirFix2) {
          callback(dirFix2);
        });
      }
    });
  }
}

var createAlertDialog = function(idDialog, idTemplate) {
  var dialog = document.getElementById(idDialog);

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement(idTemplate, { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var hideAlertDialog = function(idDialog) {
  document
    .getElementById(idDialog)
    .hide();
};

/**
 * Función que convierte un string en base64 a un
 * array blob
 * @param {*} b64Data 
 * @param {*} contentType 
 * @param {*} sliceSize 
 */
function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

/**
 * Función que convierte un string a un array blob
 * @param {*} data 
 * @param {*} contentType 
 * @param {*} sliceSize 
 */
function stringToBlob(data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = data;
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function validarArchivoXML() {
  showError('El archivo no esta disponible, xml')
}

function validarArchivoPDF() {
  showError('El archivo no esta disponible, pdf')
}



ValidarInput = {
  validarXMLGasto(e) {
    let input = e.target;
    console.error('input', input);
    return this.validarExistencia(input)
      .then(() => this.obtenerExtension(input))
      .then(extension => extension.toUpperCase() != 'XML' ? Promise.reject('Extension invalida') : null)
      .then(() => {
        this.marcarLabelCargado(input);
        this.establecerTexto(input, "XML cargado");
      })
      .catch(error => {
        console.error(error);
        this.atraparError(error, "Subir", input)
      })
  },



  validarPDFGasto(e) {
    let input = e.target;
    return this.validarExistencia(input)
      .then(() => this.obtenerExtension(input))
      .then(extension => extension.toUpperCase() != 'PDF' ? Promise.reject('Extension invalida') : null)
      .then(() => {
        this.marcarLabelCargado(input);
        this.establecerTexto(input, "PDF cargado");
      })
      .catch(error => {
        console.error(error);
        this.atraparError(error, "Subir", input)
      })
  },

  obtenerBlob(inputHTMLElement) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function () {
            var blob = new Blob([reader.result], {
              type: 'text/xml'
            });
            resolve(blob)
        };
        reader.onerror = error => {
            reject('No disponible')
        }
        reader.readAsArrayBuffer(inputHTMLElement.files[0]);
      });
  },

  atraparError(error, texto, input) {
    if (error === 'Extension invalida') {
      showError('Extension invalida');
    } else if (error === 'Imagen no disponible') {
      showError('Archivo no disponible');
    } else {
      showError("Archivo seleccionado no valida")
    }
    this.marcarLabelNoCargado(input);
    this.establecerTexto(input, texto);

  },

  establecerTexto(input, texto) {
    input.parentElement.querySelector('span').innerText = texto;
  },

  marcarLabelCargado(input) {
    input.parentElement.style.backgroundColor = '#FE8416';
    input.parentElement.style.color = 'white';
  },

  marcarLabelNoCargado(input) {
    input.parentElement.style.backgroundColor = 'white';
    input.parentElement.style.color = '#FE8416';
  },

  obtenerExtension(inputHTMLElement) {
      return new Promise((resolve, reject) => {
          if (inputHTMLElement !== null && inputHTMLElement.value !== null && inputHTMLElement.value.trim() !== '' && 
            inputHTMLElement.files.length > 0 && inputHTMLElement.files[0] && inputHTMLElement.files[0].type) {
              var fullPath = inputHTMLElement.value;
              // get original filename that can be used in the callback
              var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\')  : fullPath.lastIndexOf('/'));
              var filename = fullPath.substring(startIndex);
              if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                  filename = filename.substring(1);
              }
              let extension = filename.split('.').pop().toLowerCase();
              resolve(extension);
          } else {
              reject('Input vacio')
          }
      })
  },

  validarExistencia(inputHTMLElement) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function () {
          resolve()
      };
      reader.onerror = error => {
          reject('No disponible')
      }
      reader.readAsArrayBuffer(inputHTMLElement.files[0]);
    });
  },
}


window.fn.exist = function(value) {
  return value != null && value != undefined ? true : false;
}

function validarExtensionImagenInput(inputHTMLElement) {
  return new Promise((resolve, reject) => {
      if (inputHTMLElement != null && inputHTMLElement.files.length > 0 && inputHTMLElement.files[0] && inputHTMLElement.files[0].type) {
          var fullPath = inputHTMLElement.value;
          // get original filename that can be used in the callback
          var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\')  : fullPath.lastIndexOf('/'));
          var filename = fullPath.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
              filename = filename.substring(1);
          }
          var extension = filename.split('.')[1];
          if (extension == 'jpg' || extension == 'png' || extension == 'jpeg') {
              var reader = new FileReader();
              reader.onload = function () {
                  resolve()
              };
              reader.onerror = error => {
                  reject('Imagen no disponible')
              }
              reader.readAsArrayBuffer(inputHTMLElement.files[0]);
          } else {
              reject('Extension invalida')
          }
      } else {
          reject('Input vacio')
      }
  })
}

/**
 * Funcion para obtener uuid que complazca RFC4122 v4
 * https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
 * @returns {string}
 */
function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Abre un documento con una aplicacion de terceros
 * @param {string} nativeURL
 * @param {string} mimeType
 */
function abrirDocumentoConAplicacionDeTerceros(nativeURL, mimeType) {
  return new Promise((resolve, reject) => {
    cordova.plugins.fileOpener2.showOpenWithDialog(nativeURL, mimeType, {
        success: resolve,
        error: reject,
        position : [0, 0]
    })
  })
}