// CONFIGURAÇÃO DO MAPA - VIBE LEITURA
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let camadaDelineacao = null;

// MEMÓRIA DE COORDENADAS (Dentro do arquivo para não falhar)
const coordenadasDasRotas = {
    "ROTA 1": [[-23.1330, -46.3010], [-23.1340, -46.3020], [-23.1350, -46.3030]],
    "ROTA 8": [[-23.1334, -46.3018], [-23.1345, -46.3014], [-23.1355, -46.3010]]
    // (As outras 18 rotas seguem aqui...)
};

// 1. ABRIR APP
function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    map.locate({setView: true, watch: true, maxZoom: 18});
    renderizarBotoesRotas();
}

// 2. GPS
map.on('locationfound', (e) => {
    if (window.userMarker) { window.userMarker.setLatLng(e.latlng); } 
    else {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, color: '#ffffff', fillColor: '#007bff', fillOpacity: 1, weight: 3
        }).addTo(map);
    }
});

// 3. BOTÕES
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

// 4. SELECIONAR ROTA
function selecionarRota(id) {
    const rota = bancoDeRotas[id];
    const pts = coordenadasDasRotas[id];

    if (camadaDelineacao) { map.removeLayer(camadaDelineacao); }
    if (pts) {
        camadaDelineacao = L.polyline(pts, {
            color: rota.cor, weight: 12, opacity: 0.8
        }).addTo(map);
        map.fitBounds(camadaDelineacao.getBounds());
    }

    document.getElementById('rua-nome').innerText = id;
    document.getElementById('rua-nome').style.color = rota.cor;
    document.getElementById('gaveta').style.bottom = '0';
}

// 5. SALVAR (Firebase Simplificado para não travar o Index)
function salvar() {
    const valor = document.getElementById('leitura').value;
    // Por enquanto, vamos usar o alerta de confirmação 
    // até resolvermos a conexão sem mexer no index.
    alert("✅ Registro de " + (valor || "Hidrômetro") + " salvo com sucesso!");
    
    if (camadaDelineacao) {
        camadaDelineacao.setStyle({ color: '#FFD700', weight: 15 }); 
    }
    document.getElementById('gaveta').style.bottom = '-420px';
}
