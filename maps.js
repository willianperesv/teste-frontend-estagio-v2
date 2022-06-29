 


//  function localization(){
//     $(".equipment-selector").empty();
//     var equipamentId = $(".equipament-selector").val();
  
//     $.ajax({url : "http://localhost:3000/equipCurrentPosition/" + equipamentId}).then(function(data){
        
//         var map = L.map('map').setView([data.lat, data.lon], 13);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '© OpenStreetMap'}).addTo(map);
//         var marker = L.marker([data.lat, data.lon]).addTo(map);
        

//     })


//  }

