const CACHE_NAME="vibe-leitura-shell-v7";
const SHELL=["./","./index.html","./css/style.css","./js/rotas-data.js","./js/db.js","./js/mapa.js","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(u.origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{
   const copy=r.clone();
   caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));
   return r;
 }).catch(()=>caches.match(e.request).then(c=>c||caches.match("./index.html"))));
});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))));