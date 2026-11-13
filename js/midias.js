/* Galeria por rota. Os Blobs continuam armazenados no IndexedDB. */
let urlsTemporariasGaleria=[];
function limparUrlsGaleria(){urlsTemporariasGaleria.forEach(url=>URL.revokeObjectURL(url));urlsTemporariasGaleria=[]}
async function abrirGaleriaDaRota(routeId){
 const modal=document.getElementById("galeria-rota-modal"),titulo=document.getElementById("galeria-rota-titulo"),resumo=document.getElementById("galeria-rota-resumo"),lista=document.getElementById("galeria-rota-itens");
 if(!modal||!lista)return;
 limparUrlsGaleria();titulo.textContent="Mídias da "+routeId;resumo.textContent="Carregando arquivos salvos neste aparelho…";lista.innerHTML='<div class="galeria-rota-vazio">Buscando fotos e vídeos…</div>';
 modal.classList.remove("oculto");modal.setAttribute("aria-hidden","false");
 try{
  const itens=await listarMidiasDaRota(routeId);resumo.textContent=itens.fotos.length+" fotos · "+itens.videos.length+" vídeos · armazenamento local";lista.innerHTML="";
  if(!itens.total){lista.innerHTML='<div class="galeria-rota-vazio">Ainda não existem fotos ou vídeos associados a esta rota.</div>';return}
  const criarCard=(item,tipo)=>{
   const card=document.createElement("article");card.className="galeria-rota-card";const abrir=document.createElement("button");abrir.type="button";const url=URL.createObjectURL(item.blob);urlsTemporariasGaleria.push(url);
   const midia=document.createElement(tipo==="video"?"video":"img");midia.src=url;if(tipo==="video"){midia.muted=true;midia.playsInline=true;midia.preload="metadata"}else midia.alt="Foto da "+routeId;
   const info=document.createElement("div");info.className="galeria-rota-card-info";const data=item.criadaEm||item.criadoEm||item.data||"Data não informada";info.textContent=(tipo==="video"?"Vídeo":"Foto")+" · "+(item.rua||"Rua não identificada")+" · "+(typeof data==="string"?data.slice(0,16):"Data não informada");
   abrir.append(midia,info);abrir.onclick=()=>visualizarMidiaDaRota(item,tipo,routeId);card.appendChild(abrir);lista.appendChild(card);
  };
  itens.fotos.forEach(item=>criarCard(item,"image"));itens.videos.forEach(item=>criarCard(item,"video"));
 }catch(err){console.error("Galeria da rota:",err);resumo.textContent="Não foi possível consultar o armazenamento local.";lista.innerHTML='<div class="galeria-rota-vazio">Erro ao carregar as mídias. Os arquivos não foram apagados.</div>'}
}
function visualizarMidiaDaRota(item,tipo,routeId){
 const modal=document.getElementById("visualizador-midia"),conteudo=document.getElementById("viewer-conteudo");if(!modal||!conteudo)return;
 const url=URL.createObjectURL(item.blob);urlsTemporariasGaleria.push(url);conteudo.innerHTML="";const el=document.createElement(tipo==="video"?"video":"img");el.src=url;
 if(tipo==="video"){el.controls=true;el.autoplay=true;el.playsInline=true}else el.alt="Mídia da "+routeId;
 conteudo.appendChild(el);modal.classList.remove("oculto");
}
function fecharGaleriaDaRota(){const modal=document.getElementById("galeria-rota-modal");if(modal){modal.classList.add("oculto");modal.setAttribute("aria-hidden","true")}limparUrlsGaleria()}
async function listarMidiasDaRota(routeId){
  if(!routeId) return {fotos:[],videos:[],total:0};
  const [fotos,videos]=await Promise.all([
    obterFotosDaRota(routeId),
    obterVideosDaRota(routeId)
  ]);
  const ordenar=(a,b)=>new Date(b.criadaEm||b.criadoEm||0)-new Date(a.criadaEm||a.criadoEm||0);
  fotos.sort(ordenar);
  videos.sort(ordenar);
  return {fotos,videos,total:fotos.length+videos.length};
}
async function obterResumoMidiasDasRotas(routeIds){
  const resumo={};
  for(const routeId of routeIds||[]){
    const itens=await listarMidiasDaRota(routeId);
    resumo[routeId]={fotos:itens.fotos.length,videos:itens.videos.length,total:itens.total};
  }
  return resumo;
}
window.VibeMidias={listarMidiasDaRota,obterResumoMidiasDasRotas};
