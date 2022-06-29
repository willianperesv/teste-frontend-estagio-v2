// ====Função que carrega os modelos===//

$(document).ready(function getModel() {
 
  $.ajax({ url: "http://localhost:3000/equipmentModel" }).then(function (data) {

    data.forEach((item) => {
      $(".model-selector").append(
        "<option value=" + item.id + ">" + item.name + "</option>"
      );
    });

    $(".model-selector").change();
  });
});

// ====Filtragem dos modelos e identificação de equipamento===//

function filterByModel() {
  var modelId = $(".model-selector").val();

  $.ajax({ url: "http://localhost:3000/equipment/" + modelId }).then(function (
    data
  ) {
   
    $(".equipament-selector").empty();


    data.forEach((item) => {
      $(".equipament-selector").append(
        "<option value=" + item.id + ">" + item.name + "</option>"
      );
    });
  });
}

// ====Entrega o estado do equipamento===//
function stateInfo() {
  $(".stateInfos").empty();
  var equipamentId = $(".equipament-selector").val();
  var lastStateId = "";


  $.ajax({
    url: "http://localhost:3000/equipmentLastState/" + equipamentId,
  }).then(function (data) {
    lastStateId = data;

    $.ajax({ url: "http://localhost:3000/equipmentState/" + lastStateId }).then(
      function (data) {
        $(".stateInfos")
          .append(
            '<p class = "mt-3 align-items-center    text-white">' +
              data.name +
              "</p>"
          )
          .css("background-color", data.color);
      }
    );
  });
}

//============Botão de listagem de informações=============
function plusInfo() {
  var equipamentId = $(".equipament-selector").val();
  $.ajax({
    url: "http://localhost:3000/equipmentStateHistory/" + equipamentId,
  }).then(function (data) {
    
    data.states.forEach((state) => {
      $(".table-historic").append(
        "<tr style='background-color:" +
          state.color +
          " '> <td>" +
          state.date +
          "</td> <td>" +
          state.time +
          "</td> <td >" +
          state.name +
          "</td> </tr>"
      );
    });
  });
}


//==========Busca a Localização do equipamento=============//


function localization() {

  $(".equipment-selector").empty();
  var equipamentId = $(".equipament-selector").val();

  $.ajax({ url: "http://localhost:3000/equipCurrentPosition/" + equipamentId }).then(function (data) {


    maps(data.lat, data.lon)


  })



}


var marker = null;
var map = null;

function maps(lat, lon) {

  // seta uma variavel com a latitute e longitude vindo por parametro
  var latLong = [lat, lon];

  // verifica se o map esta null
  if (map == null) {
    map = L.map('map', {
      center: latLong,
      zoom: 13
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
  }


  if (marker != null) {
    marker.setLatLng(latLong);
    marker.addTo(map);
    map.panTo(latLong);
  } else {
    marker = L.marker(latLong);
    marker.addTo(map)
    map.panTo(latLong);
  }

}

