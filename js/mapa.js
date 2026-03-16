const map = L.map('map').setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    map.locate({setView: true, watch: true, maxZoom: 18});
}

map.on('locationfound', (e) => {
    if (window.userMarker) { 
        window.userMarker.setLatLng(e.latlng); 
    } else { 
        window.userMarker = L.circleMarker(e.latlng, {radius: 8, color: '#007bff', fillColor: '#007bff', fillOpacity: 1}).addTo(map); 
    }
});

function criarRua(coords, nome) {
    const linha = L.polyline(coords, {color: '#00ff00', weight: 10, opacity: 0.7}).addTo(map);
    linha.on('click', function() {
        document.getElementById('rua-nome').innerText = nome;
        document.getElementById('gaveta').style.bottom = '0';
    });
}
