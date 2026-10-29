const agents = [
  {id:"business",name:"Business Strategist",category:"Business",icon:"🚀",desc:"Clarifie une idée, construis une offre et prépare les prochaines étapes.",prompt:"Tu es un conseiller en entrepreneuriat. Pose les questions utiles et propose des étapes concrètes, sans promettre de résultats garantis."},
  {id:"marketing",name:"Marketing & Réseaux",category:"Business",icon:"📣",desc:"Idées de contenus, messages commerciaux et calendriers éditoriaux.",prompt:"Tu es un spécialiste du marketing éthique et de la création de contenu. Donne des conseils pratiques et adaptés au budget."},
  {id:"study",name:"Coach d'études",category:"Études",icon:"🎓",desc:"Comprends un sujet, révise et transforme tes notes en exercices.",prompt:"Tu es un tuteur pédagogique. Explique progressivement, vérifie la compréhension et ne fais pas passer une supposition pour un fait."},
  {id:"code",name:"Développeur",category:"Technique",icon:"💻",desc:"Débogage, code, architecture et création de sites web.",prompt:"Tu es un développeur logiciel senior. Fournis du code cohérent, explique les prérequis et signale les risques de sécurité."},
  {id:"documents",name:"Documents & PDF",category:"Création",icon:"📄",desc:"Structure, résume et améliore des documents et des textes.",prompt:"Tu es un assistant de rédaction et d'analyse documentaire. Demande le contenu du document si nécessaire et signale les limites d'accès aux fichiers."},
  {id:"creative",name:"Studio créatif",category:"Création",icon:"🎨",desc:"Trouve des concepts, des noms, des scripts et des idées originales.",prompt:"Tu es un directeur créatif. Propose des idées distinctes et adaptées au brief de l'utilisateur."},
  {id:"research",name:"Analyste recherche",category:"Technique",icon:"🔎",desc:"Compare des options, organise les informations et identifie les inconnues.",prompt:"Tu es un analyste. Distingue faits, hypothèses et informations à vérifier. Ne prétends pas avoir consulté le web sans outil de recherche."},
  {id:"productivity",name:"Coach productivité",category:"Business",icon:"🧭",desc:"Priorités, organisation, routines et planification réaliste.",prompt:"Tu es un coach de productivité. Réduis les tâches à une prochaine action claire et réaliste."},
  {id:"writing",name:"Rédacteur & traducteur",category:"Création",icon:"✍️",desc:"Rédaction, correction, reformulation et traduction.",prompt:"Tu es un rédacteur et traducteur polyvalent. Respecte le ton, la langue et le format demandés."},
  {id:"general",name:"Assistant polyvalent",category:"Tous",icon:"✦",desc:"Un assistant général pour réfléchir, apprendre et résoudre des problèmes.",prompt:"Tu es un assistant utile, honnête et clair. Demande une précision si elle est indispensable."}
];
const plans = [
 {name:"Basic",price:"4,99 €",desc:"Pour découvrir les agents.",features:"Accès essentiel • Quota limité"},
 {name:"Premium",price:"9,99 €",desc:"Pour un usage régulier.",features:"Plus d'agents • Quota supérieur"},
 {name:"Gold",price:"19,99 €",desc:"Pour créer et travailler.",features:"Outils avancés • Analyse de fichiers prévue",featured:true},
 {name:"Diamond",price:"39,99 €",desc:"Pour un usage intensif.",features:"Quotas élevés • Modèles avancés si disponibles"},
 {name:"Légende",price:"79,99 €",desc:"Pour les professionnels.",features:"Quota professionnel • Options premium"}
];
let selectedAgent = agents[0];
const $ = (s)=>document.querySelector(s);
const grid=$("#agent-grid");
function renderAgents(filter="Tous"){
  grid.innerHTML="";
  agents.filter(a=>filter==="Tous"||a.category===filter||a.category==="Tous").forEach(a=>{
    const card=document.createElement("article");card.className="agent-card";
    card.innerHTML=`<div class="agent-top"><div class="agent-icon">${a.icon}</div><span class="tag">${a.category}</span></div><h3>${a.name}</h3><p>${a.desc}</p><button class="agent-launch">Ouvrir cet agent ↗</button>`;
    card.querySelector("button").addEventListener("click",()=>openAgent(a));grid.appendChild(card);
  });
}
function renderPlans(){
  $("#plan-grid").innerHTML="";
  plans.forEach(p=>{
    const el=document.createElement("article");el.className="plan-card"+(p.featured?" featured":"");
    el.innerHTML=`<h3>${p.name}</h3><div class="plan-price">${p.price}<small> / mois</small></div><p>${p.desc}<br><br>${p.features}</p><button class="button ${p.featured?"":"secondary"}">Choisir ${p.name}</button>`;
    el.querySelector("button").addEventListener("click",()=>showAccount("Les paiements ne sont pas encore activés. Aucun débit ne sera effectué. La formule "+p.name+" sera proposée une fois le paiement sécurisé configuré."));
    $("#plan-grid").appendChild(el);
  });
}
function openAgent(agent){
  selectedAgent=agent;$("#chat-title").textContent=agent.name;$("#chat-panel").hidden=false;
  $("#chat-log").innerHTML=`<div class="message assistant">Salut ! Je suis ${agent.name}.<br><br>${agent.desc}<br><br>Écris ta demande ci-dessous. Pour recevoir une réponse réelle, le serveur devra être configuré avec un fournisseur IA.</div>`;
  $("#chat-panel").scrollIntoView({behavior:"smooth",block:"start"});$("#chat-input").focus();
}
function addMessage(text,role){const el=document.createElement("div");el.className="message "+role;el.textContent=text;$("#chat-log").appendChild(el);$("#chat-log").scrollTop=$("#chat-log").scrollHeight;}
function showAccount(feedback=""){
  $("#account-feedback").textContent=feedback;
  if(!$("#account-dialog").open)$("#account-dialog").showModal();
}
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderAgents(b.dataset.filter);});
$("#close-chat").addEventListener("click",()=>$("#chat-panel").hidden=true);
$("#account-button").addEventListener("click",()=>showAccount());
$("#cta-account").addEventListener("click",()=>showAccount());
$("#account-form").addEventListener("submit",e=>{e.preventDefault();$("#account-feedback").textContent="Cette interface est une maquette. Aucun compte n'a été créé et tes identifiants ne sont pas envoyés ni enregistrés. La prochaine étape est de connecter l'authentification serveur.";});
$("#chat-form").addEventListener("submit",e=>{
  e.preventDefault();const input=$("#chat-input");const value=input.value.trim();if(!value)return;
  addMessage(value,"user");input.value="";
  addMessage("La conversation visuelle fonctionne, mais les réponses IA réelles ne sont pas encore connectées. Pour activer cet agent, il faut configurer le serveur et une clé API côté serveur. Ta demande n'a pas été envoyée à un fournisseur externe.","assistant");
});
$("#menu-toggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
$("#year").textContent=new Date().getFullYear();
renderAgents();renderPlans();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("/sw.js").catch(()=>{});
