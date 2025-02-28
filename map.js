let map;
let marker;

function initMap() {
  // Initialize map with your company's GIS coordinates
  map = L.map('map').setView([-0.02449, 37.11904], 13);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Handle map clicks
  map.on('click', (e) => {
    if (marker) marker.remove();
    marker = L.marker(e.latlng).addTo(map);
    document.getElementById('locationName').value = 
      `Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`;
  });
}

// Address search using Nominatim
window.searchAddress = async () => {
  const address = document.getElementById('searchAddress').value;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
  );
  const data = await response.json();
  
  if (data.length > 0) {
    const { lat, lon } = data[0];
    map.setView([lat, lon], 15);
    if (marker) marker.remove();
    marker = L.marker([lat, lon]).addTo(map);
    document.getElementById('locationName').value = 
      `Lat: ${Number(lat).toFixed(5)}, Lng: ${Number(lon).toFixed(5)}`;
  }
};
