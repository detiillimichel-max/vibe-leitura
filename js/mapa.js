// Configuração do Mapa - Vibe Leitura
const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Função para abrir o mapa e ligar o GPS em tempo real
function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    
    // Liga o GPS e segue você no mapa
    map.locate({setView: true, watch: true, maxZoom: 18});
    
    // Desenha os botões das 20 rotas no topo
    renderizarBotoesRotas();
}

// Localização em tempo real (O ponto azul que te segue)
map.on('locationfound', (e) => {
    if (window.userMarker) {
        window.userMarker.setLatLng(e.latlng);
    } else {
        window.userMarker = L.circleMarker(e.latlng, {
            radius: 8, color: '#ffffff', fillColor: '#007bff', fillOpacity: 1, weight: 3
        }).addTo(map);
    }
});

// Renderiza os botões do Salto Quântico
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

function selecionarRota(id) {
    const rota = bancoDeRotas[id];
    document.getElementById('rua-nome').innerText = id;
    document.getElementById('rua-nome').style.color = rota.cor;
    document.getElementById('gaveta').style.bottom = '0';
}

function salvar() {
    const valor = document.getElementById('leitura').value;
    if(!valor) return alert("Digite a leitura!");
    alert("Sucesso! Leitura " + valor + " salva.");
    document.getElementById('gaveta').style.bottom = '-420px';
}
