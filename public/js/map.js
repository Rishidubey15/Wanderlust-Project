document.addEventListener('DOMContentLoaded', function () {
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 9, // starting zoom
});



const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
.setPopup(new mapboxgl.Popup().setHTML(`<h3>${listing.title}</h3><p>Exact location after booking</p>`))
.addTo(map);

});
