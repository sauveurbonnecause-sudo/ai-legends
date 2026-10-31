import{r,body,me,save,cfg,plan,pub,wrap}from'./_lib.js';
export default wrap(async(req,res)=>{
const a=await me(req);if(!a||a.role!=='admin')return res.status(403).json({error:'Accès refusé'});
const c=await cfg(),get=async k=>{const v=await r('GET',k);return v&&JSON.parse(v)};
if(req.method==='GET'){
const em=await r('SMEMBERS','users'),ids=await r('SMEMBERS','pays');
const us=em.length?(await r('MGET',...em.map(e=>'u:'+e))).filter(Boolean).map(JSON.parse):[];
const ps=ids.length?(await r('MGET',...ids.map(i=>'p:'+i))).filter(Boolean).map(JSON.parse):[];
ps.sort((x,y)=>y.created-x.created);
const users=[];for(const u of us)users.push({...pub(u),active:plan(u,c),tokens:+(await r('GET','tok:'+u.email))||0});
const rev=ps.filter(p=>p.status==='confirmed').reduce((s,p)=>s+p.amount,0);
return res.json({users,payments:ps,plans:c,stats:{users:us.length,msgs:+(await r('GET','stat:msgs'))||0,revenue:rev,pending:ps.filter(p=>p.status==='pending').length}})}
const b=body(req);
if(b.op==='confirm'||b.op==='reject'){const p=await get('p:'+b.id);if(!p||p.status!=='pending')return res.status(400).json({error:'Paiement introuvable ou déjà traité'});
p.status=b.op==='confirm'?'confirmed':'rejected';p.by=a.email;p.at=Date.now();await r('SET','p:'+p.id,JSON.stringify(p));
if(b.op==='confirm'){const raw=await r('GET','u:'+p.email);const u=JSON.parse(raw);u.plan=p.plan;u.until=Math.max(Date.now(),u.until||0)+30*864e5;await save(u)}
return res.json({ok:true})}
if(b.op==='suspend'){const raw=await r('GET','u:'+String(b.email).toLowerCase());if(!raw)return res.status(404).json({error:'Introuvable'});const u=JSON.parse(raw);u.suspended=!!b.on;await save(u);return res.json({ok:true})}
if(b.op==='config'){const n=b.plans,o={};
for(const k of Object.keys(c)){const v=n&&n[k];if(!v||!(v.price>=0)||!(v.daily>=0)||!(v.agents>=1&&v.agents<=10))return res.status(400).json({error:'Configuration invalide : '+k});o[k]={name:c[k].name,price:+v.price,daily:Math.floor(v.daily),agents:Math.floor(v.agents)}}
await r('SET','cfg',JSON.stringify(o));return res.json({ok:true})}
res.status(400).json({error:'Opération inconnue'})});
