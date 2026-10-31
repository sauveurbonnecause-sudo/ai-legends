import{r,body,me,cfg,plan,rate,wrap}from'./_lib.js';
const AG=[['WRITER','rédaction, correction et reformulation'],['DEVELOPER','programmation'],['BUSINESS','création d\'entreprise'],['MARKETING','marketing et stratégie commerciale'],['DESIGNER','idées créatives et direction artistique'],['STUDENT','aide aux études'],['RESEARCHER','recherche et analyse'],['ASSISTANT','assistance personnelle polyvalente'],['ANALYST','analyse de données et aide à la décision'],['AUTOMATION','workflows et automatisations']];
export default wrap(async(req,res)=>{
if(req.method!=='POST')return res.status(405).json({error:'Méthode non autorisée'});
const u=await me(req);if(!u)return res.status(401).json({error:'Connexion requise'});
if(u.suspended)return res.status(403).json({error:'Compte suspendu'});
if(!process.env.AI_API_KEY||!process.env.AI_BASE_URL)return res.status(503).json({error:'Aucun modèle IA n\'est connecté pour le moment'});
const b=body(req),id=+b.agent,c=await cfg(),p=c[plan(u,c)];
if(!AG[id])return res.status(400).json({error:'Agent inconnu'});
if(id>=p.agents)return res.status(403).json({error:'Agent non inclus dans votre formule'});
const day=new Date().toISOString().slice(0,10);
if(!await rate(`q:${u.email}:${day}`,p.daily,90000))return res.status(429).json({error:'Limite quotidienne atteinte pour votre formule'});
const m=(Array.isArray(b.messages)?b.messages:[]).slice(-20).filter(x=>(x.role==='user'||x.role==='assistant')&&typeof x.content==='string').map(x=>({role:x.role,content:x.content.slice(0,4000)}));
if(!m.length)return res.status(400).json({error:'Message vide'});
const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),25000);
try{const x=await fetch(process.env.AI_BASE_URL.replace(/\/$/,'')+'/chat/completions',{method:'POST',signal:ctl.signal,headers:{'Content-Type':'application/json',Authorization:'Bearer '+process.env.AI_API_KEY},body:JSON.stringify({model:process.env.AI_MODEL,max_tokens:800,messages:[{role:'system',content:`Tu es AI ${AG[id][0]}, spécialisé en ${AG[id][1]}. Réponds en français, en Markdown, de façon claire.`},...m]})});
const j=await x.json();if(!x.ok)throw new Error('ia');
await r('INCRBY','tok:'+u.email,j.usage?.total_tokens||0);await r('INCR','stat:msgs');
res.json({reply:j.choices[0].message.content})}
catch{res.status(502).json({error:'Le service IA est indisponible, réessayez'})}finally{clearTimeout(t)}});
