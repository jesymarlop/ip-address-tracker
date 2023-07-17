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

const searchip = (event)=> {

event.preventDefault();
const ip = inputip.value;

const goTosearch = async (url) =>{
    const searchData = await fetch(url);
    const data = await searchData.json();
    console.log(data);
    return data;
};
goTosearch("https://geo.ipify.org/api/v2/country,city?apiKey=at_hL4C37V8qM4mW5uV5By97WYSqPhqc&ipAddress=8.8.8.8")
.then( (data) => {
    ipAddress.textContent = data.ip
    local.textContent = data.location.region
    time.textContent = data.location.timezone
    isp.textContent = data.isp
    lat = data.location.lat
lon = data.location.lng
var map = L.map('map').setView([lat, lon], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

})
 }

btnip.addEventListener('click', searchip);
