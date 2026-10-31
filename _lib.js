import crypto from 'node:crypto';
const U=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,T=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
export async function r(...c){if(!U)throw new Error('Base de données non configurée');const x=await fetch(U,{method:'POST',headers:{Authorization:'Bearer '+T},body:JSON.stringify(c)});const j=await x.json();if(j.error)throw new Error(j.error);return j.result}
export const body=req=>typeof req.body==='object'&&req.body?req.body:JSON.parse(req.body||'{}');
export const ip=req=>(req.headers['x-forwarded-for']||'x').split(',')[0].trim();
const ck=req=>Object.fromEntries((req.headers.cookie||'').split(';').map(s=>s.trim().split('=')).filter(a=>a[0]));
export async function me(req){const t=ck(req).sid;if(!t||!/^[a-f0-9]{64}$/.test(t))return null;const e=await r('GET','s:'+t);if(!e)return null;const u=await r('GET','u:'+e);return u?JSON.parse(u):null}
export const save=u=>r('SET','u:'+u.email,JSON.stringify(u));
export async function startSession(res,u){const t=crypto.randomBytes(32).toString('hex');await r('SET','s:'+t,u.email,'EX',604800);res.setHeader('Set-Cookie',`sid=${t}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`)}
export const hash=(p,s=crypto.randomBytes(16).toString('hex'))=>s+':'+crypto.scryptSync(p,s,64).toString('hex');
export const check=(p,h)=>{const[s,x]=h.split(':');return crypto.timingSafeEqual(Buffer.from(x,'hex'),crypto.scryptSync(p,s,64))};
export const DEF={basic:{name:'BASIC',price:0,daily:10,agents:2},premium:{name:'PREMIUM',price:9.99,daily:60,agents:5},gold:{name:'GOLD',price:19.99,daily:150,agents:8},diamond:{name:'DIAMOND',price:39.99,daily:400,agents:10},legende:{name:'LÉGENDE',price:79.99,daily:1000,agents:10}};
export async function cfg(){const c=await r('GET','cfg');return c?JSON.parse(c):DEF}
export const plan=(u,c)=>u.until&&u.until>Date.now()&&c[u.plan]?u.plan:'basic';
export async function rate(k,max,ttl){const n=await r('INCR',k);if(n===1)await r('EXPIRE',k,ttl);return n<=max}
export const pub=u=>({email:u.email,role:u.role,plan:u.plan,until:u.until,suspended:!!u.suspended,created:u.created});
export const wrap=f=>async(req,res)=>{try{await f(req,res)}catch(e){console.error(e);res.status(500).json({error:'Erreur serveur'})}};
