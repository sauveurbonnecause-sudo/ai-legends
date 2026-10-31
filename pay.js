import crypto from'node:crypto';
import{r,body,me,cfg,rate,wrap}from'./_lib.js';
export default wrap(async(req,res)=>{
const u=await me(req);if(!u)return res.status(401).json({error:'Connexion requise'});
if(req.method==='GET'){const ids=await r('LRANGE','up:'+u.email,0,19);const l=ids.length?await r('MGET',...ids.map(i=>'p:'+i)):[];return res.json({payments:l.filter(Boolean).map(JSON.parse)})}
const c=await cfg(),k=String(body(req).plan),p=c[k];
if(!p||!p.price)return res.status(400).json({error:'Formule payante inconnue'});
if(!await rate('rl:pay:'+u.email,5,3600))return res.status(429).json({error:'Trop de demandes'});
const id=crypto.randomBytes(6).toString('hex'),pay={id,ref:'AL-'+id.toUpperCase(),email:u.email,plan:k,amount:p.price,status:'pending',created:Date.now()};
await r('SET','p:'+id,JSON.stringify(pay));await r('SADD','pays',id);await r('LPUSH','up:'+u.email,id);
const base=(process.env.PAYPAL_ME||'https://paypal.me/Myo969').replace(/\/$/,'');
res.json({payment:pay,url:`${base}/${p.price.toFixed(2)}EUR`})});
