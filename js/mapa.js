// CONFIGURAÇÃO DO MAPA - VIBE LEITURA
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 1. INICIAR APP (AO TOCAR NA FOTO)
function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    
    // Ativa o GPS e te segue no mapa
    map.locate({setView: true, watch: true, maxZoom: 18});
    
    // Cria os botões das 20 rotas no topo (Salto Quântico)
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

// 2. GPS EM TEMPO REAL
map.on('locationfound', (e) => {
    if (window.userMarker) {
        window.userMarker.setLatLng(e.latlng);
    } else {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, color: '#ffffff', fillColor: '#007bff', fillOpacity: 1, weight: 3
        }).addTo(map);
    }
});

// 3. SELECIONAR ROTA E ABRIR GAVETA
function selecionarRota(id) {
    const rota = bancoDeRotas[id];
    document.getElementById('rua-nome').innerText = id;
    document.getElementById('rua-nome').style.color = rota.cor;
    document.getElementById('gaveta').style.bottom = '0'; // Sobe a gaveta
}

// 4. SALVAR LEITURA (PREPARAÇÃO PARA O FIREBASE)
function salvar() {
    const valor = document.getElementById('leitura').value;
    if(!valor) return alert("Michel, digite a leitura!");
    
    alert("Vibe Leitura: Registro de " + valor + " preparado para o Firebase.");
    document.getElementById('gaveta').style.bottom = '-420px';
}

// Fechar gaveta ao tocar no mapa
map.on('click', () => { document.getElementById('gaveta').style.bottom = '-420px'; });
