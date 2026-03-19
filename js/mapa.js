const map = L.map('map', { zoomControl: false }).setView([-23.1337, -46.3015], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function abrirMapa() {
    document.getElementById('tela-identidade').style.transform = 'translateY(-100%)';
    map.locate({setView: true, watch: true, maxZoom: 18});
    renderizarBotoesRotas();
}

function renderizarBotoesRotas() {
    const container = document.getElementById('salto-quantico');
    Object.keys(bancoDeRotas).forEach(id => {
        const btn = document.createElement('div');
        btn.className = 'mini-rota';
        btn.style.backgroundColor = bancoDeRotas[id].cor;
        btn.innerText = id.replace('ROTA ', '');
        btn.onclick = () => desenharRotaNoMapa(id);
        container.appendChild(btn);
    });
}

function desenharRotaNoMapa(id) {
    const rota = bancoDeRotas[id];
    alert("Rota selecionada: " + id + "\nFoque nas ruas em destaque!");
    
    // Simulação: Aqui o código desenharia as linhas das ruas (Polyline)
    // Para teste, vamos apenas atualizar o nome na gaveta
    document.getElementById('rua-nome').innerText = "Iniciando " + id;
    document.getElementById('rua-nome').style.color = rota.cor;
}

function salvar() {
    const valor = document.getElementById('leitura').value;
    if(!valor) return alert("Michel, digite a leitura antes de salvar!");
    
    alert("Sucesso! Leitura de " + valor + " registrada na memória.");
    document.getElementById('gaveta').style.bottom = '-420px';
    document.getElementById('leitura').value = "";
}

// Fechar gaveta ao clicar no mapa
map.on('click', () => { document.getElementById('gaveta').style.bottom = '-420px'; });
