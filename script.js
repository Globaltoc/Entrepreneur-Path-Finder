/* ---------- App Shell Navigation ---------- */
const pages = ["landing","welcome","quiz","results"];
function goTo(id){
  pages.forEach(p => document.getElementById(p).classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Quiz Data (20 Questions) ---------- */
/* Archetypes: Visionary, Builder, Hustler, Specialist, Investor */

const backgroundQ = [
  "Fresh graduate (just finished school / NYSC)",
  "Not in school but want to do business",
  "Working in a job / internship",
  "Already running a small hustle / side-business"
];

const Q = [
  { t:"When you face a new challenge, what do you do first?",
    o:[["Think of big, bold ideas","Visionary"],["Start trying small steps to see if it works","Builder"],["Tell people about it and try to get them interested","Hustler"],["Research deeply, check YouTube/Google/books for answers","Specialist"]] },
  { t:"Which activity do you enjoy most?",
    o:[["Dreaming up new ideas for the future","Visionary"],["Fixing problems and organizing how things should work","Builder"],["Talking to people and convincing them","Hustler"],["Learning a skill really well","Specialist"]] },
  { t:"How do you see risk?",
    o:[["I’m okay taking big risks if the reward is big","Visionary"],["I like small, safe steps with a clear plan","Builder"],["I take risks but try to make money back quickly","Investor"],["I prefer to reduce risk by becoming skilled","Specialist"]] },
  { t:"How do you like to test new ideas?",
    o:[["Make a short story/sketch to inspire people","Visionary"],["Create a simple version first and test it","Builder"],["Try selling it quickly to see if people will pay","Hustler"],["Compare it with what already works in the market","Specialist"]] },
  { t:"In a group, what’s your main strength?",
    o:[["Bringing exciting new ideas","Visionary"],["Organizing things and making sure work gets done","Builder"],["Talking to people and motivating them","Hustler"],["Being the expert in a subject","Specialist"]] },
  { t:"Which result makes you happiest?",
    o:[["People using something I created","Visionary"],["Seeing a system I built work smoothly","Builder"],["Closing a deal / making sales","Hustler"],["Doing quality work people respect","Specialist"]] },
  { t:"If you got 10000 today, what would you do?",
    o:[["Make a short video or poster to promote my idea","Visionary"],["Pay freelancers/friends to help me build","Builder"],["Use it to run ads or test selling","Hustler"],["Buy tools, equipment, or training to upskill","Specialist"]] },
  { t:"A perfect workday for you looks like…",
    o:[["Sharing ideas and inspiring people","Visionary"],["Building or fixing something","Builder"],["Meeting people, making calls, closing deals","Hustler"],["Learning and solving tough problems","Specialist"]] },
  { t:"What slows you down the most?",
    o:[["Too many small details","Visionary"],["Thinking too much without acting","Builder"],["Getting stuck without sales","Hustler"],["Unclear goals / no clear direction","Specialist"]] },
  { t:"People often praise you for…",
    o:[["Creativity and fresh ideas","Visionary"],["Getting work done","Builder"],["Energy and charm","Hustler"],["Knowledge and skills","Specialist"]] },
  { t:"If you invest money, how do you think?",
    o:[["Big risky ideas that can change the world","Visionary"],["Put it back into operations and delivery","Builder"],["Bet on quick returns and fast growth","Hustler"],["Spread it out, balance risk and reward","Investor"]] },
  { t:"How do you prefer to grow a business?",
    o:[["With new creative products","Visionary"],["By making processes better","Builder"],["Through marketing, networking, partnerships","Hustler"],["By analyzing data and smart investing","Investor"]] },
  { t:"In negotiations, you usually…",
    o:[["Sell the dream/vision","Visionary"],["Show your ability to deliver","Builder"],["Push to close fast","Hustler"],["Calculate the numbers and weigh options","Investor"]] },
  { t:"How do you like learning?",
    o:[["By trying and experimenting","Visionary"],["By building and testing","Builder"],["By practicing conversations and hustling","Hustler"],["By reading, watching videos, and studying","Specialist"]] },
  { t:"Your leadership style is…",
    o:[["Inspire people with ideas","Visionary"],["Organize people and processes","Builder"],["Motivate and coach for results","Hustler"],["Teach skills and guide with knowledge","Specialist"]] },
  { t:"If the market suddenly changes, you…",
    o:[["Change your strategy quickly","Visionary"],["Adjust your system and process","Builder"],["Look for new sales angles","Hustler"],["Spread your risk and test small","Investor"]] },
  { t:"Which role excites you most?",
    o:[["Creative founder / product creator","Visionary"],["Operations manager","Builder"],["Sales/growth leader","Hustler"],["Specialist / technical expert","Specialist"]] },
  { t:"You’d love to be known for…",
    o:[["Changing lives with new ideas","Visionary"],["Building something that runs well","Builder"],["Being a great seller/dealmaker","Hustler"],["Being the go-to expert","Specialist"]] },
  { t:"Your common blind spot is…",
    o:[["Forgetting details","Visionary"],["Over-focusing on process before sales","Builder"],["Overpromising and stressing yourself","Hustler"],["Thinking too long before acting","Specialist"]] },
  { t:"What gives you the biggest satisfaction?",
    o:[["Creating a better future","Visionary"],["Running things smoothly","Builder"],["Winning sales and deals","Hustler"],["Mastering a skill","Specialist"]] },
];

/* ---------- State ---------- */
let idx = 0;
const answers = new Array(Q.length).fill(null);
const scores = { Visionary:0, Builder:0, Hustler:0, Specialist:0, Investor:0 };

/* ---------- UI Refs ---------- */
const qText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

/* ---------- Start Quiz ---------- */
function startQuiz(){ idx = 0; answers.fill(null); Object.keys(scores).forEach(k => scores[k]=0); goTo("quiz"); renderQ(); }
function renderQ(){
  const q = Q[idx];
  qText.textContent = q.t;
  optionsEl.innerHTML = "";
  q.o.forEach((pair, i)=>{
    const [label, type] = pair;
    const div = document.createElement("button");
    div.className = "option" + (answers[idx]===i ? " active" : "");
    div.textContent = label;
    div.onclick = () => { answers[idx] = i; renderQ(); };
    div.setAttribute("data-type", type);
    optionsEl.appendChild(div);
  });
  progressText.textContent = `Question ${idx+1} of ${Q.length}`;
  progressBar.style.width = `${((idx)/Q.length)*100}%`;
  backBtn.style.visibility = idx === 0 ? "hidden" : "visible";
  nextBtn.textContent = idx === Q.length-1 ? "Finish" : "Next";
}
function nextQ(){
  if(answers[idx] == null){ alert("Please choose an option to continue."); return; }
  if(idx < Q.length-1){ idx++; renderQ(); }
  else { finishQuiz(); }
}
function prevQ(){ if(idx>0){ idx--; renderQ(); }}

/* ---------- Results & Profile ---------- */
const archetypeProfiles = {
  Visionary: {
    title: "The Visionary 🌍",
    strengths: ["Creative, inspiring, sees the future"],
    blindspots: ["Can forget details", "Sometimes jumps too fast"],
    encouragement: "Your ideas are powerful—remember to test small before going big.",
    paths: ["Tech startup", "Creative studio", "Social project", "Online community"]
  },
  Builder: {
    title: "The Builder 🛠️",
    strengths: ["Makes systems work", "Reliable, loves organizing"],
    blindspots: ["Can over-plan", "Needs exciting ideas to build on"],
    encouragement: "Your gift is execution—just make sure demand is real.",
    paths: ["E-commerce brand", "Service business", "SaaS", "Ops-based business"]
  },
  Hustler: {
    title: "The Hustler ⚡",
    strengths: ["Strong sales", "Convincing, energetic"],
    blindspots: ["Can overpromise", "Sometimes neglects product quality"],
    encouragement: "Use your energy to build repeatable sales systems.",
    paths: ["Agency", "Consulting", "Trading", "Community-driven business"]
  },
  Specialist: {
    title: "The Specialist 🧪",
    strengths: ["Deep skills", "Quality", "Mastery"],
    blindspots: ["Can delay action", "Avoids selling"],
    encouragement: "Share your skills faster—people value what you know.",
    paths: ["Tech tools", "Consultancy", "Education", "Compliance services"]
  },
  Investor: {
    title: "The Investor ♟️",
    strengths: ["Good with money", "Risk management", "Strategy"],
    blindspots: ["May overthink", "Not take action fast"],
    encouragement: "Start small, place smart bets, and grow.",
    paths: ["Buying/reselling businesses", "Investment groups", "Digital assets"]
  }
};

function finishQuiz(){
  Object.keys(scores).forEach(k => scores[k]=0);
  answers.forEach((choiceIdx, qIdx)=>{
    const type = Q[qIdx].o[choiceIdx][1];
    scores[type] = (scores[type]||0)+1;
  });
  const order = ["Visionary","Builder","Hustler","Specialist","Investor"];
  let winner = order[0], best = -1;
  order.forEach(t => { if((scores[t]||0) > best){ best = scores[t]; winner = t; } });
  renderResults(winner);
  goTo("results");
}

function renderResults(arch){
  const prof = archetypeProfiles[arch];
  document.getElementById("archetypeTitle").textContent = `${prof.title} — (${scores[arch]} of ${Q.length} signals)`;

  const read = `
    <p><strong>Strengths:</strong> ${prof.strengths.join(" • ")}</p>
    <p><strong>Blind Spots:</strong> ${prof.blindspots.join(" • ")}</p>
    <p><strong>Coach’s Note:</strong> ${prof.encouragement}</p>
  `;
  document.getElementById("profileRead").innerHTML = read;

  const pathsWrap = document.getElementById("paths");
  pathsWrap.innerHTML = "";
  prof.paths.forEach(p => {
    const div = document.createElement("div");
    div.className = "path-item";
    div.textContent = `• ${p}`;
    pathsWrap.appendChild(div);
  });

  const sel = document.getElementById("pathwaySelect");
  sel.innerHTML = "";
  prof.paths.forEach((p,i)=>{
    const opt = document.createElement("option");
    opt.value = p; opt.textContent = p;
    if(i===0) opt.selected = true;
    sel.appendChild(opt);
  });

  document.getElementById("roadmap").innerHTML = "";
}

/* ---------- Roadmap Generator (6 months) ---------- */
function generateRoadmap(){
  const sel = document.getElementById("pathwaySelect");
  const chosen = sel.value;
  if(!chosen) return;
  const archTitle = document.getElementById("archetypeTitle").textContent;
  const arch = Object.keys(archetypeProfiles).find(k => archTitle.startsWith(archetypeProfiles[k].title));
  const roadmap = buildRoadmap(chosen, arch);
  const box = document.getElementById("roadmap");
  box.innerHTML = `<h3>6-Month Roadmap: ${chosen}</h3>`;
  roadmap.forEach((m, i)=>{
    const div = document.createElement("div");
    div.className = "month";
    div.innerHTML = `
      <h4>Month ${i+1}: ${m.milestone}</h4>
      <p><strong>Actions:</strong> ${m.actions.join(" • ")}</p>
      <p><strong>Learning:</strong> ${m.learning.join(" • ")}</p>
      <p><strong>Success Metrics:</strong> ${m.metrics.join(" • ")}</p>
    `;
    box.appendChild(div);
  });
}

function buildRoadmap(path, arch){
  const base = [
    { milestone:"Clarity & Research", actions:["Talk to at least 10 people","Write your idea in one page","Join Facebook/WhatsApp groups to check demand"], learning:["Market pains","Opportunities"], metrics:["10 conversations"] },
    { milestone:"Prototype / Test Run", actions:["Make a simple version (poster, WhatsApp broadcast, demo)","Sell/test with a few people","Track feedback"], learning:["Customer feedback"], metrics:["First 5 users"] },
    { milestone:"First Customers", actions:["Hustle to get first paying users","Try 2–3 sales channels (WhatsApp, Instagram, local market)","Improve delivery"], learning:["Channel fit"], metrics:["5 paying users"] },
    { milestone:"System & Process", actions:["Write down repeat steps","Automate simple things (Excel, WhatsApp replies)","Keep customers happy"], learning:["Basic automation"], metrics:["Repeat sales"] },
    { milestone:"Growth Tests", actions:["Try paid ads (small budget)","Partner with someone (influencer/shop)","Adjust pricing if needed"], learning:["Partnerships"], metrics:["New sales + customers"] },
    { milestone:"Scale Plan", actions:["Decide: reinvest profit or seek support","Set 12-month target","Plan basic hiring"], learning:["Finance basics"], metrics:["20+ regular customers"] }
  ];

  return base;
}

/* ---------- Public Helpers ---------- */
window.goTo = goTo;
window.startQuiz = startQuiz;
window.nextQ = nextQ;
window.prevQ = prevQ;
window.generateRoadmap = generateRoadmap;