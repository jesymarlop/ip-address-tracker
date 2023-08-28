//Buscar
const inputip = document.getElementById('inputip');
const btnip = document.getElementById('btnip');
//Mostrar
const ipAddress = document.getElementById('ipa');
const local = document.getElementById('local');
const time = document.getElementById('time');
const isp = document.getElementById('isp');
//Vmapa
let lat;
let lon;

function buildMap(Lat, Lon) {
    document.getElementById('mapa').innerHTML ="<div id='map' style='width:100%; height:100%'> </div>";

    let OpenStreetMapUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let OpenStreetMapAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' ;

    let OpenStreetMapLayer = L.tileLayer(OpenStreetMapUrl, {
        maxZoom: 19,
        attribution: OpenStreetMapAttribution
    })

    let map = new L.Map("map");
   map.setView(new L.latLng(Lat, Lon), 13);
   map.addLayer(OpenStreetMapLayer);  
}

const searchip = (event)=> {
event.preventDefault();
const ip = inputip.value;

const goTosearch = async (url) =>{
    const searchData = await fetch(url);
    const data = await searchData.json();
    console.log(data);
    return data;
};
goTosearch("https://geo.ipify.org/api/v2/country,city?apiKey=at_hL4C37V8qM4mW5uV5By97WYSqPhqc&ipAddress=" + ip)
.then( (data) => {
    ipAddress.textContent = data.ip;
    local.textContent = data.location.region;
    time.textContent = "UTC " + data.location.timezone;
    isp.textContent = data.isp;
    lat = data.location.lat;
     lon = data.location.lng;
    buildMap(lat, lon);
    
})
.catch((e) => {
    console.error("hubo un error!")
    console.log(e);
  });
 }
 

btnip.addEventListener('click', searchip);
