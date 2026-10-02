const map=L.map("map",{zoomControl:false}).setView([-23.1337,-46.3015],16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(map);
let camadaDelineacao=null,rotaSelecionadaId=null,ruaSelecionada=null,fotoPendente=null;
const coordenadasDasRotas={
"ROTA 1":[[-23.1330,-46.3010],[-23.1340,-46.3020],[-23.1350,-46.3030]],"ROTA 2":[[-23.1320,-46.3015],[-23.1325,-46.3025],[-23.1330,-46.3035]],"ROTA 3":[[-23.1352,-46.3005],[-23.1358,-46.3012],[-23.1365,-46.3020]],"ROTA 4":[[-23.1340,-46.2990],[-23.1345,-46.2980],[-23.1350,-46.2970]],"ROTA 5":[[-23.1310,-46.3000],[-23.1315,-46.2990],[-23.1320,-46.2980]],"ROTA 6":[[-23.1360,-46.3040],[-23.1370,-46.3050],[-23.1380,-46.3060]],"ROTA 7":[[-23.1335,-46.3045],[-23.1340,-46.3055],[-23.1345,-46.3065]],"ROTA 8":[[-23.1310,-46.3050],[-23.1300,-46.3060],[-23.1290,-46.3070]],"ROTA 9":[[-23.1300,-46.3020],[-23.1285,-46.3015],[-23.1270,-46.3010]],"ROTA 10":[[-23.1370,-46.3000],[-23.1385,-46.2995],[-23.1400,-46.2990]],"ROTA 11":[[-23.1320,-46.3080],[-23.1310,-46.3090],[-23.1300,-46.3100]],"ROTA 12":[[-23.1350,-46.3080],[-23.1365,-46.3095],[-23.1380,-46.3110]],"ROTA 13":[[-23.1340,-46.3030],[-23.1325,-46.3035],[-23.1310,-46.3040]],"ROTA 14":[[-23.1380,-46.3020],[-23.1395,-46.3015],[-23.1410,-46.3010]],"ROTA 15":[[-23.1390,-46.3050],[-23.1405,-46.3055],[-23.1420,-46.3060]],"ROTA 16":[[-23.1305,-46.3040],[-23.1290,-46.3045],[-23.1275,-46.3050]],"ROTA 17":[[-23.1345,-46.2975],[-23.1360,-46.2970],[-23.1375,-46.2965]],"ROTA 18":[[-23.1325,-46.3115],[-23.1335,-46.3125],[-23.1345,-46.3135]],"ROTA 19":[[-23.1285,-46.3025],[-23.1270,-46.3020],[-23.1255,-46.3015]],"ROTA 20":[[-23.1375,-46.3085],[-23.1390,-46.3090],[-23.1405,-46.3095]]
};
function atualizarStatus(){const el=document.getElementById("status-offline");if(!navigator.onLine){el.textContent="● OFFLINE — DADOS LOCAIS";el.className="status-offline-mode"}else{el.textContent="● ONLINE";el.className="status-online"}}
window.addEventListener("online",atualizarStatus);window.addEventListener("offline",atualizarStatus);
function abrirMapa(){document.getElementById("tela-identidade").style.transform="translateY(-100%)";atualizarStatus();map.locate({setView:true,watch:true,maxZoom:18});renderizarBotoesRotas()}
map.on("locationfound",e=>{if(window.userMarker)window.userMarker.setLatLng(e.latlng);else window.userMarker=L.circleMarker(e.latlng,{radius:8,color:"#fff",fillColor:"#007bff",fillOpacity:1,weight:3}).addTo(map)});
map.on("locationerror",()=>{});
function renderizarBotoesRotas(){const c=document.getElementById("salto-quantico");c.innerHTML="";Object.keys(bancoDeRotas).forEach(id=>{const b=document.createElement("button");b.className="mini-rota";b.style.backgroundColor=bancoDeRotas[id].cor;b.textContent=id.replace("ROTA ","");b.title=id;b.onclick=()=>selecionarRota(id);c.appendChild(b)})}
async function selecionarRota(id){rotaSelecionadaId=id;ruaSelecionada=null;fotoPendente=null;const rota=bancoDeRotas[id];const pts=coordenadasDasRotas[id];
document.querySelectorAll(".mini-rota").forEach(b=>b.classList.toggle("ativa",b.title===id));
if(camadaDelineacao)map.removeLayer(camadaDelineacao);
if(pts){camadaDelineacao=L.polyline(pts,{color:rota.cor,weight:12,opacity:.8}).addTo(map);map.fitBounds(camadaDelineacao.getBounds(),{padding:[30,120]})}
const t=document.getElementById("rua-nome");t.textContent=id;t.style.color=rota.cor;
document.getElementById("rota-badge").textContent=id+" • "+rota.ruas.length+" ENDEREÇOS";
document.getElementById("rota-contador").textContent="Toque em uma rua para registrar a leitura.";
document.getElementById("busca-rua").value="";
document.getElementById("gaveta").classList.add("aberta");
document.getElementById("painel-rua").classList.add("oculto");
await renderizarListaRuas();
}
async function renderizarListaRuas(filtro=""){if(!rotaSelecionadaId)return;const rota=bancoDeRotas[rotaSelecionadaId];const registros=await obterRegistrosDaRota(rotaSelecionadaId);const salvos=new Map(registros.map(x=>[x.rua,x]));const termo=filtro.trim().toLowerCase();const lista=rota.ruas.filter(r=>r.toLowerCase().includes(termo));const c=document.getElementById("lista-ruas");c.innerHTML="";
lista.forEach((rua,i)=>{const reg=salvos.get(rua);const item=document.createElement("div");item.className="item-rua"+(rua===ruaSelecionada?". selecionada":"");item.innerHTML=`<span class="check">${reg?"✔️":"○"}</span><button>${i+1}. ${rua}</button><button class="pin" title="Abrir navegação">📍</button>`;item.querySelector("button").onclick=()=>selecionarRua(rua);item.querySelector(".pin").onclick=()=>abrirNavegacao(rua);c.appendChild(item)})}
function filtrarRuas(v){renderizarListaRuas(v)}
async function selecionarRua(rua){ruaSelecionada=rua;fotoPendente=null;document.getElementById("painel-rua").classList.remove("oculto");document.getElementById("painel-rua-nome").textContent=rua;document.getElementById("rua-nome").textContent=rua;document.getElementById("status-salvo").textContent="";document.getElementById("foto-status").textContent="";
const r=await obterRegistroOffline(rotaSelecionadaId+"::"+rua);document.getElementById("leitura").value=r?.leitura||"";document.getElementById("obs").value=r?.obs||"";if(r?.foto){document.getElementById("foto-status").textContent="📷 Foto já salva neste endereço."}
await renderizarListaRuas(document.getElementById("busca-rua").value);document.getElementById("painel-rua").scrollIntoView({behavior:"smooth",block:"nearest"})}
function selecionarFoto(e){const file=e.target.files?.[0];if(!file)return;fotoPendente=file;document.getElementById("foto-status").textContent="📷 Foto pronta para salvar: "+file.name}
function abrirNavegacao(rua){const q=encodeURIComponent(rua+", Bom Jesus dos Perdões, SP, Brasil");window.open("https://www.google.com/maps/search/?api=1&query="+q,"_blank","noopener")}
function navegarParaRua(){if(ruaSelecionada)abrirNavegacao(ruaSelecionada)}
async function salvar(){if(!rotaSelecionadaId||!ruaSelecionada){alert("Selecione uma rua primeiro.");return}
const id=rotaSelecionadaId+"::"+ruaSelecionada;const anterior=await obterRegistroOffline(id);const registro={id,rotaId:rotaSelecionadaId,rua:ruaSelecionada,leitura:document.getElementById("leitura").value,obs:document.getElementById("obs").value,foto:fotoPendente||anterior?.foto||null,atualizadoEm:new Date().toISOString()};
try{await salvarRegistroOffline(registro);fotoPendente=null;document.getElementById("status-salvo").textContent="✅ Salvo neste aparelho (offline).";await renderizarListaRuas(document.getElementById("busca-rua").value)}catch(e){document.getElementById("status-salvo").textContent="❌ Não foi possível salvar localmente.";console.error(e)}}
function fecharGaveta(){document.getElementById("gaveta").classList.remove("aberta")}
map.on("click",e=>{if(e.originalEvent?.target?.closest?.(".leaflet-control"))return});
atualizarStatus();