document.addEventListener('DOMContentLoaded', function () {
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  center: listing.geometry.coordinates,
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 9,
});



const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup().setHTML(`<h3>${listing.title}</h3><p>Exact location after booking</p>`))
.addTo(map);

});
