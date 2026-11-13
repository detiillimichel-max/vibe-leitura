/* Vibe Leitura 3.0 — motor de sugestão de sequência.
 * Não cria ruas: só trabalha com as ruas permitidas e geometrias fornecidas.
 * A ordem original permanece intacta e sempre é devolvida para comparação.
 */
(function(global){
  const normalizar=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  const distancia=(a,b)=>{
    const R=6371000,p=Math.PI/180,d1=(b.lat-a.lat)*p,d2=(b.lng-a.lng)*p;
    const x=Math.sin(d1/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(d2/2)**2;
    return 2*R*Math.asin(Math.sqrt(x));
  };
  function extremos(way){
    const g=way?.geometry||[];
    if(g.length<2)return null;
    const first=g[0],last=g[g.length-1];
    return {a:{lat:first[0],lng:first[1]},b:{lat:last[0],lng:last[1]}};
  }
  function geometriaPermitida(streets,ways){
    const allowed=new Set((streets||[]).map(normalizar));
    return (ways||[]).filter(w=>allowed.has(normalizar(w.name))&&extremos(w));
  }
  function nearestSequence(streets,ways,start){
    const original=[...(streets||[])];
    const candidates=geometriaPermitida(original,ways);
    if(!start||!candidates.length)return {sequence:original,optimized:false,reason:"Sem GPS inicial ou geometrias suficientes; mantida a ordem original."};
    const groups=new Map();
    for(const w of candidates){
      const k=normalizar(w.name);
      if(!groups.has(k))groups.set(k,[]);
      groups.get(k).push(w);
    }
    const remaining=new Set(original.map(normalizar));
    const sequence=[],usedWays=new Set();
    let cursor={lat:start.lat,lng:start.lng};
    while(remaining.size){
      let best=null;
      for(const name of remaining){
        for(const way of groups.get(name)||[]){
          if(usedWays.has(way.id))continue;
          const ex=extremos(way);
          for(const [side,point] of [["a",ex.a],["b",ex.b]]){
            const d=distancia(cursor,point);
            if(!best||d<best.distance)best={name,way,side,point,d};
          }
        }
      }
      if(!best)break;
      sequence.push(original.find(s=>normalizar(s)===best.name));
      remaining.delete(best.name);
      usedWays.add(best.way.id);
      cursor=best.side==="a"?extremos(best.way).b:extremos(best.way).a;
    }
    // Ruas sem geometria são mantidas, sem inventar ligação ou removê-las.
    for(const name of remaining){
      const item=original.find(s=>normalizar(s)===name);
      if(item)sequence.push(item);
    }
    const usable=sequence.filter(Boolean);
    return {sequence:usable,optimized:usable.length===original.length&&candidates.length>0,
      reason:"Sugestão por proximidade entre extremidades das geometrias OSM disponíveis. Não considera ainda mão de direção, barreiras, travessias ou numeração predial.",
      coveredStreets:candidates.length,missingGeometry:Math.max(0,original.length-new Set(candidates.map(w=>normalizar(w.name))).size)};
  }
  function analyze(streets,ways,start){
    const result=nearestSequence(streets,ways,start);
    return {original:[...(streets||[])],suggested:result.sequence,optimized:result.optimized,reason:result.reason,
      coveredStreets:result.coveredStreets||0,missingGeometry:result.missingGeometry??(streets||[]).length};
  }
  global.RouteOptimizer={analyze,normalizar,distancia};
})(window);
