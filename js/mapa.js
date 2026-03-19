// CÉREBRO VIBE LEITURA - VERSÃO ESTRUTURADA
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let camadaDelineacao = null;

// 1. INICIAR APP
function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    map.locate({setView: true, watch: true, maxZoom: 18});
    renderizarBotoesRotas();
}

// 2. GPS (PONTO AZUL)
map.on('locationfound', (e) => {
    if (window.userMarker) {
        window.userMarker.setLatLng(e.latlng);
    } else {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, color: '#ffffff', fillColor: '#007bff', fillOpacity: 1, weight: 3
        }).addTo(map);
    }
});

// 3. RENDERIZAR BOTÕES (Vem do rotas-data.js)
function renderizarBotoesRotas() {
    const container = document.getElementById('salto-quantico');
    container.innerHTML = ""; 
    Object.keys(bancoDeRotas).forEach(id => {
        const btn = document.createElement('div');
        btn.className = 'mini-rota';
        btn.style.backgroundColor = bancoDeRotas[id].cor;
        btn.innerText = id.replace('ROTA ', '');
        btn.onclick = () => selecionarRota(id);
        container.appendChild(btn);
    });
}

// 4. SELECIONAR ROTA (Lê o rotas-data e o delineacao)
function selecionarRota(id) {
    const rota = bancoDeRotas[id];
    const coordenadas = caminhosGeograficos[id]; // BUSCA NO NOVO ARQUIVO

    if (camadaDelineacao) { map.removeLayer(camadaDelineacao); }

    if (coordenadas) {
        camadaDelineacao = L.polyline(coordenadas, {
            color: rota.cor, weight: 8, opacity: 0.7
        }).addTo(map);
        map.fitBounds(camadaDelineacao.getBounds());
    }

    document.getElementById('rua-nome').innerText = id;
    document.getElementById('rua-nome').style.color = rota.cor;
    document.getElementById('gaveta').style.bottom = '0';
}

// 5. SALVAR (PREPARAÇÃO FIREBASE)
function salvar() {
    const valor = document.getElementById('leitura').value;
    alert("Vibe Leitura: Registro salvo localmente. Preparando para nuvem...");
    document.getElementById('gaveta').style.bottom = '-420px';
}
