/* Vibe Leitura 3.0 — acesso às mídias por rota.
 * Os arquivos binários continuam no IndexedDB; este módulo só consulta e organiza.
 */
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
