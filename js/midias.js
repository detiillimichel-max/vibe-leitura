/* Galeria por rota. Os Blobs continuam armazenados no IndexedDB. */
let urlsTemporariasGaleria=[];
function limparUrlsGaleria(){urlsTemporariasGaleria.forEach(url=>URL.revokeObjectURL(url));urlsTemporariasGaleria=[]}
let rotaGaleriaAtual=null;
function statusDaGaleria(texto,tipo=""){
 const el=document.getElementById("status-midia-rota");if(!el)return;
 el.textContent=texto;el.className="status-midia-rota"+(tipo?" "+tipo:"");
}
function mesDaMidia(){return typeof MES_ATUAL==="function"?MES_ATUAL():new Date().toISOString().slice(0,7)}
async function verificarEspacoParaMidia(bytes){
 if(!navigator.storage?.estimate)return;
 const uso=await navigator.storage.estimate(),livre=(uso.quota||0)-(uso.usage||0);
 if(livre>0&&bytes>livre*0.9)throw new Error("Espaço local insuficiente. Libere espaço no aparelho e tente novamente.");
}
async function adicionarFotoDiretoNaRota(event){
 const file=event.target.files?.[0],routeId=rotaGaleriaAtual;
 if(!file||!routeId){event.target.value="";return}
 try{
  if(!file.type.startsWith("image/"))throw new Error("Escolha um arquivo de imagem.");
  statusDaGaleria("Preparando foto…");
  const blob=await comprimirFoto(file);await verificarEspacoParaMidia(blob.size);
  const mes=mesDaMidia(),rua=ruaSelecionada||"Mídia da rota",registroId=routeId+"::"+mes+"::"+rua;
  await salvarFotoOffline({id:crypto.randomUUID(),registroId,rotaId:routeId,rua,mes,blob,criadaEm:new Date().toISOString(),origem:"galeria-da-rota"});
  await abrirGaleriaDaRota(routeId);
  statusDaGaleria("Foto gravada neste aparelho e vinculada à "+routeId+".","sucesso");
 }catch(err){console.error("Falha ao gravar foto da rota:",err);statusDaGaleria("Não foi possível gravar a foto: "+(err.message||"erro de armazenamento"),"erro")}
 finally{event.target.value=""}
}
async function adicionarVideoDiretoNaRota(event){
 const file=event.target.files?.[0],routeId=rotaGaleriaAtual;
 if(!file||!routeId){event.target.value="";return}
 let url=null;
 try{
  if(!file.type.startsWith("video/"))throw new Error("Escolha um arquivo de vídeo.");
  statusDaGaleria("Verificando vídeo…");url=URL.createObjectURL(file);
  const video=document.createElement("video");video.preload="metadata";video.muted=true;
  const duracao=await new Promise((resolve,reject)=>{video.onloadedmetadata=()=>resolve(Number(video.duration)||0);video.onerror=()=>reject(new Error("Vídeo inválido ou não suportado"));video.src=url});
  if(!duracao||duracao>30.5)throw new Error("O vídeo precisa ter no máximo 30 segundos.");
  await verificarEspacoParaMidia(file.size);
  const mes=mesDaMidia(),rua=ruaSelecionada||"Mídia da rota",registroId=routeId+"::"+mes+"::"+rua;
  const blob=file.slice(0,file.size,file.type||"video/mp4");
  await salvarVideoOffline({id:crypto.randomUUID(),registroId,rotaId:routeId,rua,mes,blob,duracao:Math.round(duracao),mimeType:file.type||"video/mp4",criadoEm:new Date().toISOString(),origem:"galeria-da-rota"});
  await abrirGaleriaDaRota(routeId);
  statusDaGaleria("Vídeo gravado neste aparelho e vinculado à "+routeId+".","sucesso");
 }catch(err){console.error("Falha ao gravar vídeo da rota:",err);statusDaGaleria("Não foi possível gravar o vídeo: "+(err.message||"erro de armazenamento"),"erro")}
 finally{if(url)URL.revokeObjectURL(url);event.target.value=""}
}
async function abrirGaleriaDaRota(routeId){
 const modal=document.getElementById("galeria-rota-modal"),titulo=document.getElementById("galeria-rota-titulo"),resumo=document.getElementById("galeria-rota-resumo"),lista=document.getElementById("galeria-rota-itens");
 if(!modal||!lista)return;
 rotaGaleriaAtual=routeId;
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
