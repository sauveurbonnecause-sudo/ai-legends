import{r,body,ip,me,save,startSession,hash,check,cfg,rate,pub,wrap}from'./_lib.js';
export default wrap(async(req,res)=>{
const a=req.query.a;
if(a==='me'){const c=await cfg();const u=await me(req);return res.json({user:u?pub(u):null,plans:c,ai:!!process.env.AI_API_KEY})}
if(req.method!=='POST')return res.status(405).json({error:'Méthode non autorisée'});
if(a==='logout'){res.setHeader('Set-Cookie','sid=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');return res.json({ok:true})}
if(!await rate('rl:auth:'+ip(req),15,3600))return res.status(429).json({error:'Trop de tentatives, réessayez plus tard'});
const b=body(req),email=String(b.email||'').trim().toLowerCase(),pw=String(b.password||'');
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||email.length>120)return res.status(400).json({error:'Email invalide'});
const raw=await r('GET','u:'+email);
if(a==='register'){
if(pw.length<8||pw.length>100)return res.status(400).json({error:'Mot de passe : 8 caractères minimum'});
if(raw)return res.status(409).json({error:'Compte déjà existant'});
const u={email,pass:hash(pw),role:email===(process.env.ADMIN_EMAIL||'').toLowerCase()?'admin':'user',plan:'basic',until:0,created:Date.now()};
await save(u);await r('SADD','users',email);await startSession(res,u);return res.json({user:pub(u)})}
if(a==='login'){const u=raw&&JSON.parse(raw);
if(!u||!check(pw,u.pass))return res.status(401).json({error:'Identifiants incorrects'});
await startSession(res,u);return res.json({user:pub(u)})}
res.status(404).json({error:'Action inconnue'})});
