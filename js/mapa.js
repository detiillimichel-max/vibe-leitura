// CONFIGURAÇÃO DO MAPA - VIBE LEITURA (OIO ONE)
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let camadaDelineacao = null;
let rotaSelecionadaId = null; // Armazena qual rota está ativa

// PROTOCOLO DE MEMÓRIA INTERNA (Para 20 leituras separadas)
const memoriasDeLeitura = {};

// MEMÓRIA DE COORDENADAS E CORES (20 ROTAS COMPLETAS)
const coordenadasDasRotas = {
    "ROTA 1": [[-23.1330, -46.3010], [-23.1340, -46.3020], [-23.1350, -46.3030]], // Rosa
    "ROTA 2": [[-23.1320, -46.3015], [-23.1325, -46.3025], [-23.1330, -46.3035]], // Azul
    "ROTA 3": [[-23.1352, -46.3005], [-23.1358, -46.3012], [-23.1365, -46.3020]], // Verde
    "ROTA 4": [[-23.1340, -46.2990], [-23.1345, -46.2980], [-23.1350, -46.2970]], // Amarelo
    "ROTA 5": [[-23.1310, -46.3000], [-23.1315, -46.2990], [-23.1320, -46.2980]], // Roxo
    "ROTA 6": [[-23.1360, -46.3040], [-23.1370, -46.3050], [-23.1380, -46.3060]], // Ciano
    "ROTA 7": [[-23.1335, -46.3045], [-23.1340, -46.3055], [-23.1345, -46.3065]], // Laranja
    "ROTA 8": [[-23.1310, -46.3050], [-23.1300, -46.3060], [-23.1290, -46.3070]], // Vermelho
    "ROTA 9": [[-23.1300, -46.3020], [-23.1285, -46.3015], [-23.1270, -46.3010]], // Lima
    "ROTA 10": [[-23.1370, -46.3000], [-23.1385, -46.2995], [-23.1400, -46.2990]], // Magenta
    "ROTA 11": [[-23.1320, -46.3080], [-23.1310, -46.3090], [-23.1300, -46.3100]], // DeepSkyBlue
    "ROTA 12": [[-23.1350, -46.3080], [-23.1365, -46.3095], [-23.1380, -46.3110]], // Gold
    "ROTA 13": [[-23.1340, -46.3030], [-23.1325, -46.3035], [-23.1310, -46.3040]], // Violet
    "ROTA 14": [[-23.1380, -46.3020], [-23.1395, -46.3015], [-23.1410, -46.3010]], // SpringGreen
    "ROTA 15": [[-23.1390, -46.3050], [-23.1405, -46.3055], [-23.1420, -46.3060]], // Coral
    "ROTA 16": [[-23.1305, -46.3040], [-23.1290, -46.3045], [-23.1275, -46.3050]], // Turquesa
    "ROTA 17": [[-23.1345, -46.2975], [-23.1360, -46.2970], [-23.1375, -46.2965]], // Crimson
    "ROTA 18": [[-23.1325, -46.3115], [-23.1335, -46.3125], [-23.1345, -46.3135]], // RoyalBlue
    "ROTA 19": [[-23.1285, -46.3025], [-23.1270, -46.3020], [-23.1255, -46.3015]], // HotPink
    "ROTA 20": [[-23.1375, -46.3085], [-23.1390, -46.3090], [-23.1405, -46.3095]]  // DarkOrange
};

// 1. ABRIR APP (MICHEL NO CENTRO)
function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    map.locate({setView: true, watch: true, maxZoom: 18});
    renderizarBotoesRotas();
}

// 2. MONITORAMENTO GPS (PONTO AZUL)
map.on('locationfound', (e) => {
    if (window.userMarker) { 
        window.userMarker.setLatLng(e.latlng); 
    } else {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, color: '#ffffff', fillColor: '#007bff', fillOpacity: 1, weight: 3
        }).addTo(map);
    }
});

// 3. RENDERIZAR BOTÕES DO SALTO QUÂNTICO
function renderizarBotoesRotas() {
    const container = document.getElementById('salto-quantico');
    if (!container) return;
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

// 4. SELECIONAR ROTA (DELINEAÇÃO + MEMÓRIA DE GAVETA)
function selecionarRota(id) {
    rotaSelecionadaId = id; // Define a rota ativa
    const rota = bancoDeRotas[id];
    const pts = coordenadasDasRotas[id];

    // Limpeza de rastro anterior e desenho da nova delineação
    if (camadaDelineacao) { map.removeLayer(camadaDelineacao); }
    if (pts) {
        camadaDelineacao = L.polyline(pts, {
            color: rota.cor, weight: 12, opacity: 0.8
        }).addTo(map);
        map.fitBounds(camadaDelineacao.getBounds());
    }

    // PROTOCOLO ERGONÔMICO: Atualiza o conteúdo da gaveta
    const gavetaTitle = document.getElementById('rua-nome');
    if (gavetaTitle) {
        gavetaTitle.innerText = id;
        gavetaTitle.style.color = rota.cor;
    }

    // Carrega a leitura salva para ESTA rota (se existir)
    const inputLeitura = document.getElementById('leitura');
    if (inputLeitura) {
        inputLeitura.value = memoriasDeLeitura[id] ? memoriasDeLeitura[id].leitura : "";
    }

    // Abre a gaveta
    const gaveta = document.getElementById('gaveta');
    if (gaveta) {
        gaveta.style.bottom = '0'; 
    }
}

// 5. SALVAR LEITURA (COM MEMÓRIA INTERNA E STATUS VISUAL)
function salvar() {
    const valorInput = document.getElementById('leitura');
    const valor = valorInput ? valorInput.value : "";
    const rua = document.getElementById('rua-nome');
    const nomeRua = rua ? rua.innerText : "";
    const dataHora = new Date().toLocaleString('pt-BR');

    // Salva na memória interna associado ao ID da rota
    if (rotaSelecionadaId) {
        memoriasDeLeitura[rotaSelecionadaId] = {
            rua: nomeRua,
            leitura: valor || "Hidrômetro não visível",
            data: dataHora,
            usuario: "Michel"
        };
    }

    alert("✅ Registro de " + (valor || "Hidrômetro") + " salvo com sucesso na rota ativa!");
    
    // Status Visual: Muda a linha para Dourado/Amarelo para indicar conclusão
    if (camadaDelineacao) {
        camadaDelineacao.setStyle({ color: '#FFD700', weight: 15, opacity: 1 }); 
    }

    // Protocolo Visual: A gaveta some e indica conclusão
    const gaveta = document.getElementById('gaveta');
    if (gaveta) {
        gaveta.style.bottom = '-420px'; // Ajustado para sumir completamente
    }
}

// Fechar gaveta ao tocar no mapa
map.on('click', () => { 
    const gaveta = document.getElementById('gaveta');
    if (gaveta) {
        gaveta.style.bottom = '-420px'; 
    }
});
