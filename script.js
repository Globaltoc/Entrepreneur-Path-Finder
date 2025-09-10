/* ---------- script.js (updated) ---------- */
/* Quiz engine: 4 context-specific 15-question banks
   Archetypes: Visionary, Builder, Hustler, Specialist
   - Background choice on Welcome page chooses one of the 4 banks
   - Results, suggested paths, and roadmap are tailored by archetype + background
*/

/* ---------- Globals & State ---------- */
let userContext = null;         // 'freshGrad' | 'job' | 'hustler' | 'smallBiz'
let Q = [];                     // active questions
let idx = 0;                    // current question index
let answers = [];               // stores index of chosen option for each Q
let lastCounts = {};            // tally of archetype counts
const archetypeOrder = ["Visionary","Builder","Hustler","Specialist"]; // tie-break order

/* ---------- DOM refs ---------- */
const bgOptionsEl = document.getElementById("backgroundOptions");
const startQuizBtn = document.getElementById("startQuizBtn");
const qText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const archetypeTitleEl = document.getElementById("archetypeTitle");
const profileReadEl = document.getElementById("profileRead");
const pathsWrap = document.getElementById("paths");
const pathwaySelect = document.getElementById("pathwaySelect");
const roadmapEl = document.getElementById("roadmap");

/* ---------- Render background options on Welcome page ---------- */
const backgrounds = [
  { key: "freshGrad", label: "Fresh Graduate (just finished school)" },
  { key: "job", label: "Working in a Job / Internship" },
  { key: "hustler", label: "Hustling / Side Gigs" },
  { key: "smallBiz", label: "Running a Small Business" }
];

function renderBackgroundOptions(){
  if(!bgOptionsEl) return;
  bgOptionsEl.innerHTML = "";
  backgrounds.forEach((bg, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = bg.label;
    btn.setAttribute("data-key", bg.key);
    btn.addEventListener("click", (e) => selectBackground(bg.key, e.currentTarget));
    bgOptionsEl.appendChild(btn);
  });
  if(startQuizBtn) startQuizBtn.style.display = "none";
}
renderBackgroundOptions();

/* ---------- select background ---------- */
function selectBackground(key, buttonEl){
  userContext = key;
  // UI highlight
  Array.from(bgOptionsEl.children).forEach(b => b.classList.remove("active"));
  if(buttonEl) buttonEl.classList.add("active");
  if(startQuizBtn) startQuizBtn.style.display = "inline-block";
}

/* ---------- QUESTION BANKS (4 sets x 15 Qs) ---------- */
/* Each question has: q (text) and a: [{text, type}, ...]  */
const Q_sets = {
  freshGrad: [
    { q: "When you imagine starting something, what excites you most?", a:[
      {text:"Creating fresh ideas that could change things", type:"Visionary"},
      {text:"Planning the steps to make it work", type:"Builder"},
      {text:"Finding quick ways to earn from it", type:"Hustler"},
      {text:"Using my skills to solve problems", type:"Specialist"}
    ]},
    { q: "If someone gave you 5000 today, what would you do?", a:[
      {text:"Try a small creative project", type:"Visionary"},
      {text:"Save and plan before spending", type:"Builder"},
      {text:"Flip it quickly for profit", type:"Hustler"},
      {text:"Buy tools or a course to learn", type:"Specialist"}
    ]},
    { q: "In school, what did you enjoy most?", a:[
      {text:"Imagining big possibilities", type:"Visionary"},
      {text:"Organising group work", type:"Builder"},
      {text:"Presenting and persuading", type:"Hustler"},
      {text:"Doing hands-on practical tasks", type:"Specialist"}
    ]},
    { q: "If a friend asks you to join their idea, what do you bring?", a:[
      {text:"Vision and direction", type:"Visionary"},
      {text:"Plans and checklists", type:"Builder"},
      {text:"Sales energy and contacts", type:"Hustler"},
      {text:"Technical know-how", type:"Specialist"}
    ]},
    { q: "What motivates you to start?", a:[
      {text:"Making an impact", type:"Visionary"},
      {text:"Building something that works", type:"Builder"},
      {text:"Getting income fast", type:"Hustler"},
      {text:"Being excellent at a skill", type:"Specialist"}
    ]},
    { q: "How do you learn best?", a:[
      {text:"By imagining and trying", type:"Visionary"},
      {text:"By following a plan", type:"Builder"},
      {text:"By doing and selling", type:"Hustler"},
      {text:"By practicing deeply", type:"Specialist"}
    ]},
    { q: "Which role fits you in a group?", a:[
      {text:"Idea person", type:"Visionary"},
      {text:"Implementer", type:"Builder"},
      {text:"Closer / seller", type:"Hustler"},
      {text:"Technical doer", type:"Specialist"}
    ]},
    { q: "How do you feel about risk?", a:[
      {text:"Worth it for big change", type:"Visionary"},
      {text:"Manage it with a plan", type:"Builder"},
      {text:"Take it if you can hustle", type:"Hustler"},
      {text:"Avoid by getting better", type:"Specialist"}
    ]},
    { q: "Your biggest strength?", a:[
      {text:"Creativity", type:"Visionary"},
      {text:"Organisation", type:"Builder"},
      {text:"Persuasion", type:"Hustler"},
      {text:"Skill depth", type:"Specialist"}
    ]},
    { q: "How would you use social media?", a:[
      {text:"Share ideas and stories", type:"Visionary"},
      {text:"Research and build systems", type:"Builder"},
      {text:"Promote and sell", type:"Hustler"},
      {text:"Showcase portfolio and skills", type:"Specialist"}
    ]},
    { q: "If someone doubts you, you...", a:[
      {text:"Show the big picture", type:"Visionary"},
      {text:"Show a step-by-step plan", type:"Builder"},
      {text:"Get quick proof via sales", type:"Hustler"},
      {text:"Demonstrate expertise", type:"Specialist"}
    ]},
    { q: "Which business would you start first?", a:[
      {text:"An app or creative project", type:"Visionary"},
      {text:"A small shop or service with processes", type:"Builder"},
      {text:"A fast-moving product to resell", type:"Hustler"},
      {text:"A skills-based service", type:"Specialist"}
    ]},
    { q: "What frustrates you most?", a:[
      {text:"No space for imagination", type:"Visionary"},
      {text:"Disorder and chaos", type:"Builder"},
      {text:"Slow money or no customers", type:"Hustler"},
      {text:"Poor-quality work around me", type:"Specialist"}
    ]},
    { q: "Who inspires you most?", a:[
      {text:"Founders and creators", type:"Visionary"},
      {text:"Great operators", type:"Builder"},
      {text:"Top sellers and hustlers", type:"Hustler"},
      {text:"Master practitioners", type:"Specialist"}
    ]},
    { q: "After 5 years you hope to...", a:[
      {text:"See ideas change lives", type:"Visionary"},
      {text:"Run a dependable operation", type:"Builder"},
      {text:"Have steady income from hustles", type:"Hustler"},
      {text:"Be recognized for skills", type:"Specialist"}
    ]}
  ],

  job: [
    { q: "At work, what part do you enjoy most?", a:[
      {text:"Suggesting new approaches", type:"Visionary"},
      {text:"Organising tasks and people", type:"Builder"},
      {text:"Convincing others and pitching", type:"Hustler"},
      {text:"Doing technical work well", type:"Specialist"}
    ]},
    { q: "When handed a task, your first step is...", a:[
      {text:"Think of a better way", type:"Visionary"},
      {text:"Plan the steps and timeline", type:"Builder"},
      {text:"Find quick wins to show progress", type:"Hustler"},
      {text:"Check what skills/tools are needed", type:"Specialist"}
    ]},
    { q: "If you got 5000 as a work bonus, you'd...", a:[
      {text:"Try a creative side idea", type:"Visionary"},
      {text:"Save for a future plan", type:"Builder"},
      {text:"Invest in a small hustle", type:"Hustler"},
      {text:"Buy training or tools", type:"Specialist"}
    ]},
    { q: "Which office task annoys you most?", a:[
      {text:"Routine with no room for ideas", type:"Visionary"},
      {text:"Unclear structure", type:"Builder"},
      {text:"No reward for effort", type:"Hustler"},
      {text:"Poor tools or training", type:"Specialist"}
    ]},
    { q: "How do you meet deadlines?", a:[
      {text:"Find a creative shortcut", type:"Visionary"},
      {text:"Follow a checklist", type:"Builder"},
      {text:"Put in extra hours, hustle", type:"Hustler"},
      {text:"Focus intensively on tasks", type:"Specialist"}
    ]},
    { q: "Colleagues call you...", a:[
      {text:"The idea person", type:"Visionary"},
      {text:"The reliable one", type:"Builder"},
      {text:"The connector", type:"Hustler"},
      {text:"The expert", type:"Specialist"}
    ]},
    { q: "In meetings you usually...", a:[
      {text:"Bring new possibilities", type:"Visionary"},
      {text:"Create next steps", type:"Builder"},
      {text:"Push for decisions", type:"Hustler"},
      {text:"Share technical insight", type:"Specialist"}
    ]},
    { q: "Promotion would mean to you...", a:[
      {text:"More freedom to innovate", type:"Visionary"},
      {text:"Bigger teams to organise", type:"Builder"},
      {text:"Higher income and influence", type:"Hustler"},
      {text:"Recognition for skills", type:"Specialist"}
    ]},
    { q: "A boss asks you to run a short project; you...", a:[
      {text:"Add a new creative twist", type:"Visionary"},
      {text:"Make a tight plan and follow it", type:"Builder"},
      {text:"Find quick revenue or results", type:"Hustler"},
      {text:"Ensure technical excellence", type:"Specialist"}
    ]},
    { q: "Work stress makes you...", a:[
      {text:"Dream of a different path", type:"Visionary"},
      {text:"Organise more tightly", type:"Builder"},
      {text:"Push harder and hustle", type:"Hustler"},
      {text:"Focus on solving tasks", type:"Specialist"}
    ]},
    { q: "Your proudest work moment was when...", a:[
      {text:"You launched something new", type:"Visionary"},
      {text:"You fixed a broken process", type:"Builder"},
      {text:"You closed an important deal", type:"Hustler"},
      {text:"You solved a hard technical problem", type:"Specialist"}
    ]},
    { q: "What blocks you at work?", a:[
      {text:"Too many rules", type:"Visionary"},
      {text:"Chaos and no systems", type:"Builder"},
      {text:"Low pay or few results", type:"Hustler"},
      {text:"No chance to learn", type:"Specialist"}
    ]},
    { q: "If you left the job, you'd most likely...", a:[
      {text:"Start something creative", type:"Visionary"},
      {text:"Build a structured small business", type:"Builder"},
      {text:"Grow your side hustle full-time", type:"Hustler"},
      {text:"Offer your skills as a consultant", type:"Specialist"}
    ]},
    { q: "In 5 years you want to...", a:[
      {text:"Lead an innovative project", type:"Visionary"},
      {text:"Manage a reliable team/business", type:"Builder"},
      {text:"Have steady side-income streams", type:"Hustler"},
      {text:"Be known for your craft", type:"Specialist"}
    ]},
    { q: "Work success to you is...", a:[
      {text:"Creating something people remember", type:"Visionary"},
      {text:"Delivering consistently", type:"Builder"},
      {text:"Making money and hitting targets", type:"Hustler"},
      {text:"Building a reputation for excellence", type:"Specialist"}
    ]}
  ],

  hustler: [
    { q: "When hustling, your strongest move is...", a:[
      {text:"Playing with new product ideas", type:"Visionary"},
      {text:"Making a plan to scale", type:"Builder"},
      {text:"Selling hard and fast", type:"Hustler"},
      {text:"Delivering high-quality work", type:"Specialist"}
    ]},
    { q: "With $2000 profit you’d...", a:[
      {text:"Test a creative growth idea", type:"Visionary"},
      {text:"Reinvest to systemise", type:"Builder"},
      {text:"Buy stock to flip quickly", type:"Hustler"},
      {text:"Get a tool that improves work", type:"Specialist"}
    ]},
    { q: "Customers say you’re great at...", a:[
      {text:"Bringing new ideas", type:"Visionary"},
      {text:"Being consistent", type:"Builder"},
      {text:"Closing deals", type:"Hustler"},
      {text:"High-quality output", type:"Specialist"}
    ]},
    { q: "If a hustle fails you usually...", a:[
      {text:"Try a new angle", type:"Visionary"},
      {text:"Adjust the process", type:"Builder"},
      {text:"Move onto the next hustle", type:"Hustler"},
      {text:"Improve the skill and retry", type:"Specialist"}
    ]},
    { q: "Your dream hustle does...", a:[
      {text:"Reach many people creatively", type:"Visionary"},
      {text:"Run like a small machine", type:"Builder"},
      {text:"Bring cash quickly", type:"Hustler"},
      {text:"Show your craft", type:"Specialist"}
    ]},
    { q: "Friends call you...", a:[
      {text:"The idea maker", type:"Visionary"},
      {text:"The planner", type:"Builder"},
      {text:"The connector", type:"Hustler"},
      {text:"The pro", type:"Specialist"}
    ]},
    { q: "When trend appears, you...", a:[
      {text:"Think of creative uses", type:"Visionary"},
      {text:"See how to systemize it", type:"Builder"},
      {text:"Jump in and sell", type:"Hustler"},
      {text:"Check if it fits your skill", type:"Specialist"}
    ]},
    { q: "When sales slow, you...", a:[
      {text:"Try a new promo idea", type:"Visionary"},
      {text:"Review operations", type:"Builder"},
      {text:"Increase outreach", type:"Hustler"},
      {text:"Improve quality", type:"Specialist"}
    ]},
    { q: "Your best partner is...", a:[
      {text:"An innovator", type:"Visionary"},
      {text:"A manager", type:"Builder"},
      {text:"A marketer", type:"Hustler"},
      {text:"A skilled craftsman", type:"Specialist"}
    ]},
    { q: "What drains you most while hustling?", a:[
      {text:"No creative space", type:"Visionary"},
      {text:"Too much chaos", type:"Builder"},
      {text:"Low cash flow", type:"Hustler"},
      {text:"Poor tools", type:"Specialist"}
    ]},
    { q: "If you must pick, you choose the hustle that...", a:[
      {text:"Is most creative", type:"Visionary"},
      {text:"Has structure", type:"Builder"},
      {text:"Pays fastest", type:"Hustler"},
      {text:"Fits your skillset", type:"Specialist"}
    ]},
    { q: "What do you reinvest in most?", a:[
      {text:"New ideas", type:"Visionary"},
      {text:"Systems or helpers", type:"Builder"},
      {text:"Ads and stock", type:"Hustler"},
      {text:"Tools and training", type:"Specialist"}
    ]},
    { q: "Failure teaches you to...", a:[
      {text:"Try bolder ideas", type:"Visionary"},
      {text:"Make better systems", type:"Builder"},
      {text:"Move faster next time", type:"Hustler"},
      {text:"Level up your skills", type:"Specialist"}
    ]},
    { q: "Your 5-year goal is...", a:[
      {text:"A well-known creative venture", type:"Visionary"},
      {text:"A stable business with SOPs", type:"Builder"},
      {text:"Multiple income streams", type:"Hustler"},
      {text:"A brand built on quality", type:"Specialist"}
    ]},
    { q: "When rushed, you...", a:[
      {text:"Cut to the core idea", type:"Visionary"},
      {text:"Follow the checklist", type:"Builder"},
      {text:"Push outreach harder", type:"Hustler"},
      {text:"Focus on doing it perfectly", type:"Specialist"}
    ]}
  ],

  smallBiz: [
    { q: "As a small business owner your main focus is...", a:[
      {text:"Trying new products/services", type:"Visionary"},
      {text:"Keeping operations smooth", type:"Builder"},
      {text:"Getting more customers", type:"Hustler"},
      {text:"Improving product quality", type:"Specialist"}
    ]},
    { q: "With 5000 profit you'd...", a:[
      {text:"Test a small launch", type:"Visionary"},
      {text:"Top up working capital", type:"Builder"},
      {text:"Run a promo to attract buyers", type:"Hustler"},
      {text:"Buy a tool to improve quality", type:"Specialist"}
    ]},
    { q: "Biggest headache in business?", a:[
      {text:"Finding fresh demand", type:"Visionary"},
      {text:"Bad systems and tracking", type:"Builder"},
      {text:"Inconsistent sales", type:"Hustler"},
      {text:"Unreliable suppliers", type:"Specialist"}
    ]},
    { q: "When sales drop you...", a:[
      {text:"Think of new offers", type:"Visionary"},
      {text:"Check operations", type:"Builder"},
      {text:"Increase outreach", type:"Hustler"},
      {text:"Improve product", type:"Specialist"}
    ]},
    { q: "Your ideal partner is...", a:[
      {text:"A creative thinker", type:"Visionary"},
      {text:"An operations person", type:"Builder"},
      {text:"A marketer", type:"Hustler"},
      {text:"A technical expert", type:"Specialist"}
    ]},
    { q: "If scaling, you focus on...", a:[
      {text:"New market angles", type:"Visionary"},
      {text:"Systems and people", type:"Builder"},
      {text:"Distribution and sales", type:"Hustler"},
      {text:"Product upgrades", type:"Specialist"}
    ]},
    { q: "What frustrates you most?", a:[
      {text:"People who resist change", type:"Visionary"},
      {text:"No clear process", type:"Builder"},
      {text:"Low customer turnout", type:"Hustler"},
      {text:"Poor quality from suppliers", type:"Specialist"}
    ]},
    { q: "Your staff would say you are...", a:[
      {text:"The visionary boss", type:"Visionary"},
      {text:"The organiser", type:"Builder"},
      {text:"The hustler boss", type:"Hustler"},
      {text:"The quality-focused boss", type:"Specialist"}
    ]},
    { q: "If a new idea looks risky you...", a:[
      {text:"Try a small pilot for it", type:"Visionary"},
      {text:"Structure a safe test", type:"Builder"},
      {text:"Try selling the idea in small batches", type:"Hustler"},
      {text:"Check if your supply can handle it", type:"Specialist"}
    ]},
    { q: "Your top reinvestment is in...", a:[
      {text:"Marketing new concepts", type:"Visionary"},
      {text:"People and systems", type:"Builder"},
      {text:"Stock and promotions", type:"Hustler"},
      {text:"Tools and quality", type:"Specialist"}
    ]},
    { q: "You judge success by...", a:[
      {text:"How many lives you touch", type:"Visionary"},
      {text:"How smoothly things run", type:"Builder"},
      {text:"How much profit you make", type:"Hustler"},
      {text:"How well-made your products are", type:"Specialist"}
    ]},
    { q: "When hiring, you look for...", a:[
      {text:"Creative thinkers", type:"Visionary"},
      {text:"Reliable operators", type:"Builder"},
      {text:"Hungry sellers", type:"Hustler"},
      {text:"Skilled practitioners", type:"Specialist"}
    ]},
    { q: "If you had to pivot fast you...", a:[
      {text:"Try a bold new idea", type:"Visionary"},
      {text:"Rebuild processes quickly", type:"Builder"},
      {text:"Push a new sales channel", type:"Hustler"},
      {text:"Refine the product", type:"Specialist"}
    ]},
    { q: "In 5 years you want to be...", a:[
      {text:"Known for a bold brand", type:"Visionary"},
      {text:"Running a stable firm", type:"Builder"},
      {text:"Managing several profit streams", type:"Hustler"},
      {text:"Respected for quality", type:"Specialist"}
    ]},
    { q: "What gives you the most pride?", a:[
      {text:"New ideas customers love", type:"Visionary"},
      {text:"A well-run operation", type:"Builder"},
      {text:"Strong sales numbers", type:"Hustler"},
      {text:"Top-notch products", type:"Specialist"}
    ]}
  ]
}; // end Q_sets

/* ---------- Quiz UI Logic (safe selection, back/next) ---------- */
function startQuiz(){
  if(!userContext){
    alert("Please choose your current stage before starting the quiz.");
    return;
  }
  Q = Q_sets[userContext];
  if(!Q || !Q.length){ alert("No questions available for this stage."); return; }
  idx = 0;
  answers = new Array(Q.length).fill(null);
  goTo("quiz");
  renderQ();
}

function renderQ(){
  const item = Q[idx];
  qText.textContent = item.q;
  optionsEl.innerHTML = "";
  item.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.text;
    btn.type = "button";
    btn.addEventListener("click", () => {
      // set answer index (not archetype) so we can read the type later
      answers[idx] = i;
      // mark UI
      Array.from(optionsEl.children).forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      nextBtn.disabled = false;
    });
    // restore active state if previously selected
    if(typeof answers[idx] === "number" && answers[idx] === i) btn.classList.add("active");
    optionsEl.appendChild(btn);
  });

  // progress
  progressText.textContent = `Question ${idx+1} of ${Q.length}`;
  const pct = Math.round(((idx) / Q.length) * 100);
  progressBar.style.width = `${pct}%`;

  // prev/next buttons state
  backBtn.style.visibility = idx === 0 ? "hidden" : "visible";
  nextBtn.textContent = idx === Q.length - 1 ? "Finish" : "Next";
  nextBtn.disabled = answers[idx] == null;
}

/* Called by HTML button */
function nextQ(){
  if(answers[idx] == null){
    alert("Please choose an option to continue.");
    return;
  }
  if(idx < Q.length - 1){
    idx++;
    renderQ();
  } else {
    finishQuiz();
  }
}
function prevQ(){
  if(idx > 0){
    idx--;
    renderQ();
  }
}

/* ---------- Scoring & Results ---------- */
function finishQuiz(){
  // tally
  const counts = { Visionary:0, Builder:0, Hustler:0, Specialist:0 };
  answers.forEach((ansIdx, qIdx) => {
    if(ansIdx == null) return;
    const type = Q[qIdx].a[ansIdx].type;
    if(type) counts[type] = (counts[type] || 0) + 1;
  });
  lastCounts = counts;

  // determine winner (highest count, break ties by archetypeOrder)
  let winner = archetypeOrder[0];
  let best = -1;
  archetypeOrder.forEach(a => {
    const v = counts[a] || 0;
    if(v > best || (v === best && archetypeOrder.indexOf(a) < archetypeOrder.indexOf(winner))){
      best = v; winner = a;
    }
  });

  renderResults(winner, counts);
  goTo("results");
}

/* ---------- Profile generation tailored by background ---------- */
function getProfileFor(arch, context){
  // base descriptions
  const base = {
    Visionary: {
      title: "The Visionary 🌍",
      strengths: ["Think big", "Great at spotting opportunities", "Can inspire people"],
      blindspots: ["May skip details", "Needs help with operations"],
      encouragement: "Your imagination is a big asset — test small, learn fast."
    },
    Builder: {
      title: "The Builder 🛠️",
      strengths: ["Organized", "Reliable delivery", "Makes systems work"],
      blindspots: ["Can over-plan", "Needs differentiation"],
      encouragement: "Your ability to execute is rare — attach it to proven demand."
    },
    Hustler: {
      title: "The Hustler ⚡",
      strengths: ["Energetic seller", "Gets quick results", "Networker"],
      blindspots: ["Burnout risk", "Might underinvest in product"],
      encouragement: "Channel your energy into repeatable growth systems."
    },
    Specialist: {
      title: "The Specialist 🧪",
      strengths: ["Deep skill", "High quality", "Credibility"],
      blindspots: ["Overthinking", "Avoids selling sometimes"],
      encouragement: "Share your skill early — customers will value that credibility."
    }
  };

  // deep-copy base
  const p = JSON.parse(JSON.stringify(base[arch] || base.Visionary));

  // tailor text & paths based on context
  p.paths = [];
  if(arch === "Visionary"){
    if(context === "freshGrad") p.paths = ["Start a campus/community project","Build a simple app or product","Content/creative brand"];
    else if(context === "job") p.paths = ["Intrapreneur / side project at work","Product/creative lead","Social impact initiative"];
    else if(context === "hustler") p.paths = ["Viral product launch","Community-driven marketplace","Creative agency"];
    else if(context === "smallBiz") p.paths = ["New product line","Online community for customers","Brand storytelling"];
    p.blindspots.push(context === "freshGrad" ? "Limited experience — start small" : "May need to slow down and test");
  } else if(arch === "Builder"){
    if(context === "freshGrad") p.paths = ["E-commerce shop with SOPs","Service business with playbook","Operations role in startups"];
    else if(context === "job") p.paths = ["COO / ops lead track","Build internal tools/processes","Franchise/replicable business"];
    else if(context === "hustler") p.paths = ["Turn hustle into a productized service","Operations for multi-hustle creator","Fulfillment/management services"];
    else if(context === "smallBiz") p.paths = ["Scale operations","Improve supply chain","Turn business into a repeatable model"];
    p.blindspots.push("Watch out for over-optimising before demand is proven.");
  } else if(arch === "Hustler"){
    if(context === "freshGrad") p.paths = ["Sales-driven startup","Affiliate/reseller business","Small events/market stalls"];
    else if(context === "job") p.paths = ["Business development role","Independent sales consultant","Start a side hustle brand"];
    else if(context === "hustler") p.paths = ["Growth agency","High-margin trading","Performance marketing services"];
    else if(context === "smallBiz") p.paths = ["Local distribution partnerships","Aggressive sales growth plan","Expand product SKUs"];
    p.blindspots.push("Be careful about burning out — build simple repeatable sales processes.");
  } else if(arch === "Specialist"){
    if(context === "freshGrad") p.paths = ["Freelance projects","Teach skill online","Small consultancy"];
    else if(context === "job") p.paths = ["Technical lead / consultant","Productized service","SaaS tools built from your skill"];
    else if(context === "hustler") p.paths = ["Niche service with clear pricing","Skill+sales combo","Paid workshops"];
    else if(context === "smallBiz") p.paths = ["Quality-driven product line","Training & certification services","Technical consultancy"];
    p.blindspots.push("Start selling small projects early — don’t wait for perfection.");
  }

  return p;
}

/* ---------- Render Results (context-aware) ---------- */
function renderResults(arch, counts){
  const profile = getProfileFor(arch, userContext);
  const signals = counts && counts[arch] ? counts[arch] : 0;

  archetypeTitleEl.textContent = `${profile.title} — (${signals} of ${Q.length} signals)`;

  // Profile read
  profileReadEl.innerHTML = `
    <p><strong>Strengths:</strong> ${profile.strengths.join(" • ")}</p>
    <p><strong>Blind Spots:</strong> ${profile.blindspots.join(" • ")}</p>
    <p><strong>Coach’s Note:</strong> ${profile.encouragement}</p>
  `;

  // Paths display & selector (context-aware)
  pathsWrap.innerHTML = "";
  pathwaySelect.innerHTML = "";
  profile.paths.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "path-item";
    div.textContent = `• ${p}`;
    pathsWrap.appendChild(div);

    const opt = document.createElement("option");
    opt.value = p; opt.textContent = p;
    if(i === 0) opt.selected = true;
    pathwaySelect.appendChild(opt);
  });

  roadmapEl.innerHTML = ""; // clear previous roadmap
}

/* ---------- Roadmap Builder (tailored by archetype + context + pathway) ---------- */
function generateRoadmap(){
  const chosen = pathwaySelect.value;
  if(!chosen) { alert("Pick a pathway first."); return; }
  // determine current archetype from title (we stored title earlier)
  const archText = archetypeTitleEl.textContent || "";
  const arch = archetypeOrder.find(a => archText.startsWith(a)) || archetypeOrder[0];

  const roadmap = buildRoadmap(chosen, arch, userContext);
  roadmapEl.innerHTML = `<h3>6-Month Roadmap: ${chosen}</h3>`;
  roadmap.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "month";
    div.innerHTML = `
      <h4>Month ${i+1}: ${m.milestone}</h4>
      <p><strong>Actions:</strong> ${m.actions.join(" • ")}</p>
      <p><strong>Learning:</strong> ${m.learning.join(" • ")}</p>
      <p><strong>Success Metrics:</strong> ${m.metrics.join(" • ")}</p>
    `;
    roadmapEl.appendChild(div);
  });
}

/* Build roadmap template and tailor it for arch+context+path */
function buildRoadmap(path, arch, context){
  // a friendly base roadmap (youth-friendly, Africa-aware)
  const base = [
    { milestone: "Clarity & Research",
      actions: ["Talk to 10 people (friends, neighbours, online groups)","Write your idea on one page","Check local demand in WhatsApp/Facebook groups"],
      learning: ["Who needs this locally","What price people will pay"],
      metrics: ["10 conversations","1-page note"] },
    { milestone: "Prototype / Test",
      actions: ["Make a simple version (WhatsApp pitch, small sample, poster)","Share with 5 people for feedback"],
      learning: ["Which parts customers like","What to change first"],
      metrics: ["Prototype shared","Feedback collected"] },
    { milestone: "First Customers",
      actions: ["Sell to first 5–10 customers","Track feedback and fix delivery","Record basic sales data (Excel/notes)"],
      learning: ["Which channel brings customers","What the real cost is"],
      metrics: ["5–10 paying customers","Initial revenue"] },
    { milestone: "System & Process",
      actions: ["Write simple repeatable steps (SOP)","Automate or simplify one task (messages/orders)","Train one helper if needed"],
      learning: ["What you can automate","How to reduce errors"],
      metrics: ["Written SOP","Repeat purchases"] },
    { milestone: "Growth Tests",
      actions: ["Try a growth idea (small ads, referrals, market stall)","Test a partnership or reseller","Measure ROI on small spend"],
      learning: ["Which growth channel scales","Customer acquisition cost"],
      metrics: ["10–30 new leads","Conversion data"] },
    { milestone: "Scale Plan",
      actions: ["Decide next: reinvest or seek support","Set 12-month targets","Create a simple budget & hiring plan"],
      learning: ["How much to scale safely","What operations need to handle growth"],
      metrics: ["12-month plan","Target customers"]
    }
  ];

  // Tuning by archetype
  if(arch === "Visionary"){
    base[0].actions.push("Make a 60–90s vision video or story");
    base[2].actions.push("Host a small community launch / invite beta users");
    base[4].actions.push("Use storytelling in growth tests (UGC, reels)");
  }
  if(arch === "Builder"){
    base[1].actions.push("Map user flows and checklists");
    base[3].actions.push("Automate the most time-consuming step");
    base[5].actions.push("Create hiring guidelines and role templates");
  }
  if(arch === "Hustler"){
    base[1].actions.push("Set daily outreach targets (e.g., 20 messages/calls)");
    base[2].actions.push("Secure 1 partnership or pop-up to sell");
    base[4].actions.push("Double down on the winning channel");
  }
  if(arch === "Specialist"){
    base[0].actions.push("Publish a short case study or demo of your work");
    base[1].actions.push("Offer service for free to 2 customers for testimonials");
    base[3].actions.push("Package your expertise into a paid offer (mini-course/service)");
  }

  // Tuning by context
  if(context === "freshGrad"){
    base[0].actions.push("Use campus/online groups for quick interviews");
    base[2].learning.push("How to use free platforms to reach people");
  }
  if(context === "job"){
    base[0].actions.push("Validate demand within your workplace/industry");
    base[5].actions.push("Consider starting as a side-hustle alongside your job");
  }
  if(context === "hustler"){
    base[1].actions.push("Run fast small tests you can afford to lose");
    base[4].actions.push("Leverage existing buyer lists and networks");
  }
  if(context === "smallBiz"){
    base[1].actions.push("Improve supplier reliability & inventory flow");
    base[3].actions.push("Document staff tasks and quality checks");
  }

  // Tuning by pathway keywords (optional tweaks)
  const p = path.toLowerCase();
  if(p.includes("tech") || p.includes("app") || p.includes("platform")){
    base[1].actions.push("Create basic prototype or clickable mockup");
    base[2].metrics.push("Prototype tested by 10 users");
  }
  if(p.includes("e-commerce")||p.includes("shop")||p.includes("brand")){
    base[1].actions.push("Test product in a small batch");
    base[2].actions.push("Record fulfillment & returns process");
  }
  if(p.includes("consult")||p.includes("service")||p.includes("freelance")){
    base[0].actions.push("Create a one-page offer and pricing");
    base[2].actions.push("Offer pilot services to 3 clients for testimonials");
  }

  // Make sure actions/learning/metrics are unique (no duplicates)
  base.forEach(m => {
    m.actions = Array.from(new Set(m.actions));
    m.learning = Array.from(new Set(m.learning || []));
    m.metrics = Array.from(new Set(m.metrics || []));
  });

  return base;
}

/* ---------- Utility / Exports ---------- */
window.goTo = function(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const el = document.getElementById(id);
  if(el) el.classList.add("active");
};
window.selectBackground = selectBackground;
window.startQuiz = startQuiz;
window.nextQ = nextQ;
window.prevQ = prevQ;
window.generateRoadmap = generateRoadmap;

/* ---------- Auto-year fill (HTML expects #year) ---------- */
const yEl = document.getElementById("year");
if(yEl) yEl.textContent = new Date().getFullYear();