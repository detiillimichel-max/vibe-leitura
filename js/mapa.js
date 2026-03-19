// CONFIGURAÇÃO DO MAPA - VIBE LEITURA
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let camadaDelineacao = null;

// MEMÓRIA DE COORDENADAS (Unificada para as 20 rotas)
const coordenadasDasRotas = {
    "ROTA 1": [[-23.1330, -46.3010], [-23.1340, -46.3020], [-23.1350, -46.3030]],
    "ROTA 2": [[-23.1320, -46.3015], [-23.1325, -46.3025], [-23.1330, -46.3035]],
    "ROTA 3": [[-23.1352, -46.3005], [-23.1358, -46.3012], [-23.1365, -46.3020]],
    "ROTA 4": [[-23.1340, -46.2990], [-23.1345, -46.2980], [-23.1350, -46.2970]],
    "ROTA 5": [[-23.1310, -46.3000], [-23.1315, -46.2990], [-23.1320, -46.2980]],
    "ROTA 6": [[-23.1360, -46.3040], [-23.1370, -46.3050], [-23.1380, -46.3060]],
    "ROTA 7": [[-23.1335, -46.3045], [-23.1340, -46.3055], [-23.1345, -46.3065]],
    "ROTA 8": [[-23.1334, -46.3018], [-23.1345, -46.3014], [-23.1355, -46.3010]],
    "ROTA 9": [[-23.1300, -46.3020], [-23.1290, -46.3010], [-23.1280, -46.3000]],
    "ROTA 10": [[-23.1370, -46.3000], [-23.1380, -46.2990], [-23.1390, -46.2980]],
    "ROTA 11": [[-23.1320, -46.3050], [-23.1310, -46.3060], [-23.1300, -46.3070]],
    "ROTA 12": [[-23.1350, -46.3080], [-23.1360, -46.3090], [-23.1370, -46.3100]],
    "ROTA 13": [[-23.1340, -46.3030], [-23.1330, -46.3025], [-23.1320, -46.3020]],
    "ROTA 14": [[-23.1380, -46.3020], [-23.1390, -46.3030], [-23.1400, -46.3040]],
    "ROTA 15": [[-23.1390, -46.3050], [-23.1400, -46.3060], [-23.1410, -46.3070]],
    "ROTA 16": [[-23.1305, -46.3040], [-23.1295, -46.3050], [-23.1285, -46.3060]],
    "ROTA 17": [[-23.1345, -46.2975], [-23.1355, -46.2965], [-23.1365, -46.2955]],
    "ROTA 18": [[-23.1325, -46.3085], [-23.1335, -46.3095], [-23.1345, -46.3105]],
    "ROTA 19": [[-23.1285, -46.3025], [-23.1275, -46.3035], [-23.1265, -46.3045]],
    "ROTA 20": [[-23.1375, -46.3085], [-23.1385, -46.3095], [-23.1395, -46.3105]]
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

// 4. SELECIONAR ROTA (DELINEAÇÃO + GAVETA)
function selecionarRota(id) {
    const rota = bancoDeRotas[id];
    const pts = coordenadasDasRotas[id]; // <-- NOME CORRIGIDO AQUI

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

// 5. SALVAR
function salvar() {
    const valor = document.getElementById('leitura').value;
    alert("Vibe Leitura: Registro de " + (valor || "Sem leitura") + " salvo!");
    document.getElementById('gaveta').style.bottom = '-420px';
}
