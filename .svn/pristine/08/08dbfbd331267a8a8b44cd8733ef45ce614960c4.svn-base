
/**
 * Funcion para realizar la busqueda
 * @param {number|string} page 
 */
function initResultadosSiniestro(page) {
    var idSiniestro = $('#buscarInput').val();
    if (idSiniestro.trim() == '') {
        showError("Debe ingresar un numero de búsqueda o referencia");
    } else {
        buscarSiniestro(page);
    }
}

/**
 * Función para buscar un siniestro en el 
 * servidor
 * @param {number|string} page
 * @param {number|string} numSin numero o id del siniestro
 */
function buscarSiniestro(page, numSin) {
    if (verificarConexion()) {
        var siniestro = numSin != null ? numSin : $('#buscarInput').val();
        console.error('buscando', $('#buscarInput').val(), siniestro);
        fn.load('resultadosSiniestro.html');
        sendGetRequest('busqueda.php?caso=' + encodeURI(siniestro) + '&pag=' + page, function (results) {
            resultadosBusqueda(siniestro, results, page);
        });
    } else {
        showNotice("Conexión a Internet no disponible");
    }
}

/**
 * Función para procesar el resultado de la 
 * lista de siniestros
 * @param {Object} data data.resultados {Array<Siniestro>}
 */
var paginasTotales;
function resultadosBusqueda(siniestro, data, pageActual) {
    var html = ''; //String para html
    if (data != null) {
        if (data.resultados != null) {
            //Tabla
            html += '<table id="resultadoBusqueda" '
                + 'class="table tableKronos table-striped table-sm shadow-sm"'
                + 'style="width: 100%;">';
            //Encabezado de tabla
            html += '<thead>'
                + '<tr>'
                + '<th>N° R&G</th>'
                + '<th>N° Siniestro</th>'
                + '<th>Ajustador</th>'
                + '</tr>'
                + '</thead>';

            //Elementos de la tabla
            html += '<tbody>';
            data.resultados.forEach(function (siniestroObj) {
                html += '<tr onclick="buscarReferencia(' + siniestroObj.caso + ');">';
                html += '<th style="color:#0081BD;">' + siniestroObj.caso + '</th>';
                html += '<th>' + siniestroObj.caso_n_siniestro + '</th>';
                html += '<th>' + siniestroObj.ajustador + '</th>';
                html += '</tr>';
            });
            html += '</tbody>';

            html += '</table>';
            html += fn.pagination(data.registros, pageActual);
            html += fn.dataViewed(data.registros, pageActual, 20); //Indica numero de resultados
        } else {
            html += '<h4>No se encontraron resultados</h4>';
        }
    } else {
        html += '<h4>No se pudo buscar el siniestro</h4>';
    }
    $('#siniestrosContent').html(html);

    if (pageActual != undefined && pageActual != null) {
        $('#page-' + pageActual).addClass("active");

        //Funcion cuando se presiona el botón
        $('.pagNumberPage').click(function () {
            var id = $(this).attr('id');
            pageObj = id.split("-")[1];
            buscarSiniestro(pageObj, siniestro);
        });
    }
}