// CONFIGURAÇÃO DO MAPA - VIBE LEITURA
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Variável global para a linha da rota
let camadaDelineacao = null;

// 1. INICIAR APP (AO TOCAR NA FOTO DE IDENTIDADE)
function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    
    // Ativa o GPS em tempo real
    map.locate({setView: true, watch: true, maxZoom: 18});
    
    // Renderiza o SALTO QUÂNTICO (Botões de Rotas)
    renderizarBotoesRotas();
}

// 2. GPS EM TEMPO REAL (PONTO AZUL)
map.on('locationfound', (e) => {
    if (window.userMarker) {
        window.userMarker.setLatLng(e.latlng);
    } else {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, color: '#ffffff', fillColor: '#007bff', fillOpacity: 1, weight: 3
        }).addTo(map);
    }
});

// 3. RENDERIZAR BOTÕES DE ROTAS
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

// 4. SELECIONAR ROTA E DESENHAR DELINEAÇÃO
function selecionarRota(id) {
    const rota = bancoDeRotas[id];
    
    // Limpa delineação anterior
    if (camadaDelineacao) { map.removeLayer(camadaDelineacao); }

    // Desenha a linha se houver 'caminho' no rotas-data.js
    if (rota.caminho && rota.caminho.length > 0) {
        camadaDelineacao = L.polyline(rota.caminho, {
            color: rota.cor,
            weight: 8,
            opacity: 0.7
        }).addTo(map);
        
        map.fitBounds(camadaDelineacao.getBounds());
    }

    document.getElementById('rua-nome').innerText = id;
    document.getElementById('rua-nome').style.color = rota.cor;
    document.getElementById('gaveta').style.bottom = '0';
}

// 5. SALVAR LEITURA (PREPARAÇÃO FIREBASE)
function salvar() {
    const valor = document.getElementById('leitura').value;
    // No Vibe Leitura, o campo pode ser vazio se o hidrômetro não for visível
    const msg = valor ? "Leitura " + valor : "Registro sem leitura (Hidrômetro não visível)";
    
    alert("Vibe Leitura: " + msg + " salvo com sucesso!");
    document.getElementById('gaveta').style.bottom = '-420px';
}

// Fechar gaveta ao tocar no mapa
map.on('click', () => { document.getElementById('gaveta').style.bottom = '-420px'; });
