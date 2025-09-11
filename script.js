/* ===========================
   script.js — Full Production
   Entrepreneur Self-Discovery Quiz
   Targets ages 18–26 (clear adult tone)
   - 4 backgrounds × 15 questions
   - 5 archetypes: Visionary, Builder, Hustler, Specialist, Investor
   - 5 pathways per archetype
   - 6-month dynamic roadmap per pathway
   - Dynamic currency formatting (e.g. $5,000)
   =========================== */

/* ---------- Utilities ---------- */
function formatCurrency(amount){
  if (typeof amount !== "number") amount = Number(amount) || 0;
  return `$${amount.toLocaleString()}`;
}
const $ = (id) => document.getElementById(id);
function goTo(pageId){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const el = $(pageId);
  if(el) el.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
if($("year")) $("year").textContent = new Date().getFullYear();

/* ---------- Backgrounds (4) ---------- */
const backgrounds = [
  { id: "job", label: "Finished school and have/had a job" },
  { id: "graduate", label: "Fresh graduate (just finished school)" },
  { id: "noSchool", label: "I did not finish school / equivalent" },
  { id: "aspiring", label: "I’m interested in business (no formal work yet)" }
];

/* ---------- Archetypes (5) ---------- */
/* Each archetype includes: title, core strengths, blindspots, background-specific note, 5 pathways */
const archetypeProfiles = {
  Visionary: {
    title: "The Visionary 🌍",
    strengths: ["Big-picture thinking", "Creative problem solving", "Inspiring others"],
    blindspots: ["Follow-through on details", "Over-optimism without tests"],
    byBackground: {
      job: "From your job experience you can see systems — pair that with your vision to design better solutions.",
      graduate: "As a fresh grad, your imagination and energy make you great at launching bold experiments.",
      noSchool: "Without formal schooling, your fresh perspective lets you spot overlooked opportunities.",
      aspiring: "Your curiosity positions you to test bold ideas early and build a unique position."
    },
    pathways: [
      "Tech product / app startup",
      "Creative agency / brand studio",
      "Social impact venture",
      "Platform / community play",
      "Fashion & creative brand"
    ]
  },
  Builder: {
    title: "The Builder 🛠️",
    strengths: ["Operational excellence", "Systems and process", "Reliable delivery"],
    blindspots: ["Over-optimization before demand", "May undervalue storytelling"],
    byBackground: {
      job: "You already understand routine and operations — great foundation to scale an idea.",
      graduate: "You can apply school frameworks to build repeatable systems quickly.",
      noSchool: "Practical, hands-on experience helps you create processes that simply work.",
      aspiring: "Your careful approach will help you create durable, reliable offerings."
    },
    pathways: [
      "D2C / retail brand with solid ops",
      "Service business with SOPs (e.g., cleaning, logistics)",
      "Marketplace / fulfilment-focused startup",
      "Small-scale manufacturing",
      "Franchise or replicated store model"
    ]
  },
  Hustler: {
    title: "The Hustler ⚡",
    strengths: ["Sales & persuasion", "Speed & resourcefulness", "Resilience"],
    blindspots: ["Burnout risk", "Underinvesting in systems"],
    byBackground: {
      job: "Experience with targets and clients makes you excellent at traction & partnerships.",
      graduate: "You can convert energy into early revenue and rapid tests.",
      noSchool: "Street-smartness and hustle convert small capital into real transactions.",
      aspiring: "Your drive will help you find paying customers fast and validate ideas quickly."
    },
    pathways: [
      "Buying & Selling (retail arbitrage)",
      "Import & distribution (small-batch)",
      "Affiliate/reseller & micro-commerce",
      "Events & pop-up commerce",
      "Food stalls / quick-service business"
    ]
  },
  Specialist: {
    title: "The Specialist 🧪",
    strengths: ["Technical depth", "Quality & credibility", "Trust-building with clients"],
    blindspots: ["Analysis paralysis", "Avoiding sales/storytelling"],
    byBackground: {
      job: "Your on-the-job skills are monetisable — consulting or specialized services fit well.",
      graduate: "A degree + niche skill can make you a high-value provider quickly.",
      noSchool: "Trade skills (tailoring, electrical, mechanics) can be turned into profitable services.",
      aspiring: "Self-study or apprenticeship can make you a sought-after expert."
    },
    pathways: [
      "Consultancy / specialized services",
      "Freelance technical work (dev/design/finance)",
      "High-quality crafts & bespoke products",
      "Professional training & workshops",
      "Technical SaaS/tool built from expertise"
    ]
  },
  Investor: {
    title: "The Investor ♟️",
    strengths: ["Strategic thinking", "Risk/reward optimisation", "Portfolio mindset"],
    blindspots: ["Too abstract; delays action", "Over-analysis"],
    byBackground: {
      job: "Regular income allows you to start building a small investment portfolio strategically.",
      graduate: "Starting early gives you compounding advantage — learn risk rules now.",
      noSchool: "Practical eyes for opportunistic buys (inventory, properties, micro-assets) work well.",
      aspiring: "You can begin with small bets and learn to scale them with data."
    },
    pathways: [
      "Real estate micro-investing",
      "Buying & flipping small businesses",
      "Micro private equity / roll-ups",
      "Market trading & crypto (education-first)",
      "Asset-backed product businesses (leasing, rentals)"
    ]
  }
};

/* ---------- Roadmaps: 6-month plans for each pathway (tailored & actionable) ---------- */
/* Key design: roadmaps are universal but we may reference $5,000 dynamically where helpful */
const roadmaps = {
  /* Visionary */
  "Tech product / app startup": [
    "Month 1: Conduct 20 user interviews to validate a single problem. Write a one-page value prop.",
    "Month 2: Build a clickable prototype (no-code) or design screens and test with 10 users.",
    `Month 3: Build an MVP with minimal features (use freelancers/no-code; budget example: ${formatCurrency(5000)} for early build).`,
    "Month 4: Run small beta, collect metrics on activation & retention, iterate.",
    "Month 5: Prepare a simple GTM: landing page, 3 content pieces, early adopters program.",
    "Month 6: Decide go-to-scale: organic growth, partnerships or seed raise."
  ],
  "Creative agency / brand studio": [
    "Month 1: Define your niche, create 3 sample case studies or mock projects.",
    "Month 2: Build a portfolio site and social presence; outreach to 10 potential clients.",
    "Month 3: Do 1–2 paid pilots at a discounted rate and document results.",
    "Month 4: Convert pilots to standard packages and build SOPs for delivery.",
    "Month 5: Systematize pricing, onboarding and referrals.",
    "Month 6: Hire one contractor and scale client acquisition channels."
  ],
  "Social impact venture": [
    "Month 1: Clarify the impact thesis and identify beneficiaries; validate with stakeholders.",
    "Month 2: Build a lean program or pilot to test the model with 10 users.",
    "Month 3: Collect data and stories to show impact; prepare a short deck.",
    "Month 4: Secure partnerships and small grants or paying customers.",
    "Month 5: Improve delivery systems and measure KPIs.",
    "Month 6: Plan next stage funding or scale via partners."
  ],
  "Platform / community play": [
    "Month 1: Define the community’s core value and recruiting plan.",
    "Month 2: Build a simple platform (WhatsApp/Telegram + landing page) and invite 50 members.",
    "Month 3: Run events and gather feedback; test monetization ideas.",
    "Month 4: Improve engagement with content and partnerships.",
    "Month 5: Test paid membership or marketplace features.",
    "Month 6: Grow retention and formalize governance/moderation."
  ],
  "Fashion & creative brand": [
    "Month 1: Design 5 sample pieces and test with 10 friends/customers.",
    "Month 2: Source small-batch suppliers and price items.",
    "Month 3: Do a pre-order or pop-up to validate demand.",
    "Month 4: Invest in product photography and social campaigns.",
    "Month 5: Launch a small collection and track unit economics.",
    "Month 6: Build partnerships with local stores or online consignment."
  ],

  /* Builder */
  "D2C / retail brand with solid ops": [
    "Month 1: Pick product vertical and map supplier options; budget initial stock.",
    `Month 2: Buy your first small stock using part of ${formatCurrency(5000)} for purchase and fulfilment.`,
    "Month 3: Launch with a simple online shop and track conversion.",
    "Month 4: Set up SOPs for packing, shipping & returns.",
    "Month 5: Improve margins and reduce fulfillment time.",
    "Month 6: Consider a physical pop-up or expand SKU list."
  ],
  "Service business with SOPs (e.g., cleaning, logistics)": [
    "Month 1: Define service offering, pricing and create checklists for delivery.",
    "Month 2: Acquire first 3–5 clients with discounts and careful delivery.",
    "Month 3: Train an assistant and document SOPs.",
    "Month 4: Set monthly recurring pricing and contract templates.",
    "Month 5: Build a referral program to find new clients.",
    "Month 6: Scale regionally by replicating processes."
  ],
  "Marketplace / fulfilment-focused startup": [
    "Month 1: Map supply and demand sides and pick a narrow niche.",
    "Month 2: Recruit first suppliers and list sample inventory.",
    "Month 3: Attract early buyers via community outreach.",
    "Month 4: Solve the cold-start problem (guarantee supply/delivery).",
    "Month 5: Harden disputes, returns and logistics SOPs.",
    "Month 6: Launch wider marketing and expand categories."
  ],
  "Small-scale manufacturing": [
    "Month 1: Prototype product and list BOM (bill of materials).",
    "Month 2: Source local suppliers and test quality.",
    "Month 3: Produce a small first batch and price with margins.",
    "Month 4: Sell to local stores and test order fulfilment.",
    "Month 5: Improve production efficiency and reduce waste.",
    "Month 6: Prepare for larger batch orders and formalize agreements."
  ],
  "Franchise or replicated store model": [
    "Month 1: Validate a working store process in one location.",
    "Month 2: Document all operational steps & financials.",
    "Month 3: Pilot a second location with tight SOPs.",
    "Month 4: Standardize onboarding for managers and staff.",
    "Month 5: Create a simple franchise/repeatable kit.",
    "Month 6: Offer the model to one partner or investor to scale."
  ],

  /* Hustler */
  "Buying & Selling (retail arbitrage)": [
    "Month 1: Find 5 fast-moving items and source at good margins.",
    "Month 2: Buy a small initial stock and sell through WhatsApp/markets.",
    "Month 3: Track cashflow, reinvest profits into the best-sellers.",
    "Month 4: Build a catalog and use promotions to drive repeat purchases.",
    "Month 5: Secure a reliable supplier and negotiate price breaks.",
    "Month 6: Scale sales channels to include online marketplaces."
  ],
  "Import & distribution (small-batch)": [
    "Month 1: Identify light, high-margin import items (phone accessories, small electronics).",
    "Month 2: Source suppliers and learn shipping / customs basics.",
    `Month 3: Place a small trial order (e.g. ${formatCurrency(500)}), list and sell locally.`,
    "Month 4: Collect feedback and improve listings.",
    "Month 5: Reinvest profits and place a larger order.",
    "Month 6: Build a small distribution network to local retailers."
  ],
  "Affiliate/reseller & micro-commerce": [
    "Month 1: Pick niche and sign up to affiliate networks or suppliers.",
    "Month 2: Create simple content and share offers with immediate networks.",
    "Month 3: Track conversions and double down on channels that work.",
    "Month 4: Build a small landing page to capture leads.",
    "Month 5: Test small paid ads to accelerate growth.",
    "Month 6: Expand product mix and standardize commission flows."
  ],
  "Events & pop-up commerce": [
    "Month 1: Book a local event or market stall and plan offer mix.",
    "Month 2: Prepare stock and simple display that converts.",
    "Month 3: Test pricing and gather customer contacts.",
    "Month 4: Use events as market research for product expansion.",
    "Month 5: Partner with complementary sellers to share costs.",
    "Month 6: Run a branded pop-up and consider regular slots."
  ],
  "Food stalls / quick-service business": [
    "Month 1: Finalize a simple menu and perfect recipes.",
    "Month 2: Validate via pop-ups or pre-orders (manage waste).",
    "Month 3: Establish pricing and track cost-per-portion.",
    "Month 4: Add delivery or catering options for recurring income.",
    "Month 5: Systematize prep and ordering for scaling.",
    "Month 6: Secure a regular stall or small kitchen space."
  ],

  /* Specialist */
  "Consultancy / specialized services": [
    "Month 1: Define a niche consulting offer and outcomes for clients.",
    "Month 2: Build a one-page service offer and reach out to target clients.",
    "Month 3: Run paid pilot engagements and gather testimonials.",
    "Month 4: Package services into retainers and fixed-scope offers.",
    "Month 5: Create case studies and referral incentives.",
    "Month 6: Scale with contracted associates or junior consultants."
  ],
  "Freelance technical work (dev/design/finance)": [
    "Month 1: Build 2–3 high-quality portfolio pieces.",
    "Month 2: Join 1–2 freelance platforms and pitch consistently.",
    "Month 3: Secure first paid client and overdeliver for testimonials.",
    "Month 4: Bundle services into productized offers.",
    "Month 5: Increase rates and focus on niche clients.",
    "Month 6: Build a referral network and steady lead generation."
  ],
  "High-quality crafts & bespoke products": [
    "Month 1: Make 10 signature pieces and photograph them professionally.",
    "Month 2: List on local marketplaces and test pricing.",
    "Month 3: Build local consignment or pop-up sales.",
    "Month 4: Collect reviews and improve quality where needed.",
    "Month 5: Offer custom orders and deposits to manage cash flow.",
    "Month 6: Explore wholesale or boutique partnerships."
  ],
  "Professional training & workshops": [
    "Month 1: Package a short workshop or course and create materials.",
    "Month 2: Run a paid pilot with discounted seats.",
    "Month 3: Gather feedback and testimonials to refine content.",
    "Month 4: Build a repeatable delivery template and pricing.",
    "Month 5: Partner with organizations or campuses for delivery.",
    "Month 6: Scale cohort size and consider recorded course options."
  ],
  "Technical SaaS/tool built from expertise": [
    "Month 1: Identify a repetitive pain in your specialist work.",
    "Month 2: Build a no-code or minimal prototype to automate it.",
    "Month 3: Test with real users and iterate quickly.",
    "Month 4: Prepare pricing & small subscription plan.",
    "Month 5: Drive first conversions and measure retention.",
    "Month 6: Improve UX and prepare for paid growth."
  ],

  /* Investor */
  "Real estate micro-investing": [
    "Month 1: Learn local market dynamics and small-lot opportunities.",
    "Month 2: Save a seed (example target $5,000) and review financing options.",
    "Month 3: Acquire or partner on a small property or plot.",
    "Month 4: Improve value via small enhancements or lease agreements.",
    "Month 5: Reinvest rental income or flip for a profit.",
    "Month 6: Build a repeatable investment checklist & pipeline."
  ],
  "Buying & flipping small businesses": [
    "Month 1: Study acquisition basics and checklist for small businesses.",
    "Month 2: Find 5 potential micro-business targets to vet.",
    "Month 3: Run quick diligence and make an offer on a promising small biz.",
    "Month 4: Improve operations and cashflow.",
    "Month 5: Revalue or grow for resale/long-term hold.",
    "Month 6: Document playbook and prepare the next acquisition."
  ],
  "Micro private equity / roll-ups": [
    "Month 1: Define a thesis and vertical to buy small operators.",
    "Month 2: Build deal flow by talking to brokers and owners.",
    "Month 3: Pilot with one small acquisition or partnership.",
    "Month 4: Improve margins via operational fixes.",
    "Month 5: Consolidate similar businesses for efficiencies.",
    "Month 6: Prepare a growth/exit strategy and reporting."
  ],
  "Market trading & crypto (education-first)": [
    "Month 1: Educate yourself: risk management and basic instruments.",
    "Month 2: Paper-trade or use tiny amounts (e.g. $100) to practice.",
    "Month 3: Build a disciplined trade plan and track results.",
    "Month 4: Increase position size carefully with proven edge.",
    "Month 5: Diversify into multiple low-correlation ideas.",
    "Month 6: Review performance, refine rules, and scale winning strategies."
  ],
  "Asset-backed product businesses (leasing, rentals)": [
    "Month 1: Identify assets that rent well locally (tools, chairs, equipment).",
    "Month 2: Purchase a starter asset and list for rental.",
    "Month 3: Build booking & maintenance process.",
    "Month 4: Secure repeat clients and automate bookings.",
    "Month 5: Reinvest profits into additional assets.",
    "Month 6: Offer package deals and scale the rental fleet."
  ]
}; // end roadmaps

/* ---------- 15 Questions per background (mapping to archetypes) ----------
   Questions are written for 18–26-year-olds: adult tone, practical, concise.
   Each question object: { q: "text", o: [ { text, type }, ... 5 options ] }
   Note: some questions mention formatCurrency(5000) dynamically where needed.
   --------------------------------------------------------------------- */
const questionSets = {
  job: [
    { q:"In past jobs, what part of your work energized you most?", o:[
      {text:"Sparking new ideas and improvements", type:"Visionary"},
      {text:"Setting systems and making things run", type:"Builder"},
      {text:"Closing deals and talking to customers", type:"Hustler"},
      {text:"Mastering a technical task or tool", type:"Specialist"},
      {text:"Managing small budgets and investments", type:"Investor"}
    ]},
    { q:`If you had ${formatCurrency(5000)} to test a side project, you'd:`, o:[
      {text:"Prototype a big idea and show it", type:"Visionary"},
      {text:"Plan the pilot and hire reliable help", type:"Builder"},
      {text:"Buy stock and sell quickly to validate demand", type:"Hustler"},
      {text:"Buy a course/tool to level-up skill", type:"Specialist"},
      {text:"Place small diversified bets and track returns", type:"Investor"}
    ]},
    { q:"Which makes you proud at work?", o:[
      {text:"When a new idea influences others", type:"Visionary"},
      {text:"When processes reduce errors", type:"Builder"},
      {text:"When you hit revenue targets", type:"Hustler"},
      {text:"When you solve a technical problem", type:"Specialist"},
      {text:"When investments return profit", type:"Investor"}
    ]},
    { q:"When teammates need help you usually:", o:[
      {text:"Share a new direction or vision", type:"Visionary"},
      {text:"Help create a checklist or plan", type:"Builder"},
      {text:"Grab the phone and find buyers", type:"Hustler"},
      {text:"Teach them the technical fix", type:"Specialist"},
      {text:"Recommend a financial approach", type:"Investor"}
    ]},
    { q:"How do you approach risk on a new plan?", o:[
      {text:"Embrace it if idea is big", type:"Visionary"},
      {text:"Break it into small, testable steps", type:"Builder"},
      {text:"Move fast and adapt", type:"Hustler"},
      {text:"Reduce it by sharpening skills", type:"Specialist"},
      {text:"Model outcomes to reduce downside", type:"Investor"}
    ]},
    { q:"Your free time preference:", o:[
      {text:"Sketching big ideas or projects", type:"Visionary"},
      {text:"Organizing personal systems", type:"Builder"},
      {text:"Side gigs and selling things", type:"Hustler"},
      {text:"Online courses and practice", type:"Specialist"},
      {text:"Reading market trends & investing", type:"Investor"}
    ]},
    { q:"What slows down a project for you?", o:[
      {text:"Too much small detail", type:"Visionary"},
      {text:"Lack of clear process", type:"Builder"},
      {text:"Slow payments and no traction", type:"Hustler"},
      {text:"Unclear technical requirements", type:"Specialist"},
      {text:"Insufficient data to decide", type:"Investor"}
    ]},
    { q:"A customer-first approach means:", o:[
      {text:"Designing transformational experiences", type:"Visionary"},
      {text:"Documenting the delivery process", type:"Builder"},
      {text:"Meeting them quickly and closing the deal", type:"Hustler"},
      {text:"Ensuring quality every time", type:"Specialist"},
      {text:"Balancing margin & risk to retain clients", type:"Investor"}
    ]},
    { q:"On a team, people call you:", o:[
      {text:"The big-thinker", type:"Visionary"},
      {text:"The executor", type:"Builder"},
      {text:"The closer", type:"Hustler"},
      {text:"The expert", type:"Specialist"},
      {text:"The strategist", type:"Investor"}
    ]},
    { q:"What matters most to you in Year 1?", o:[
      {text:"Creating something memorable", type:"Visionary"},
      {text:"Building a reliable process", type:"Builder"},
      {text:"Making early revenue", type:"Hustler"},
      {text:"Growing my skillset", type:"Specialist"},
      {text:"Growing capital responsibly", type:"Investor"}
    ]},
    { q:"If a product failed, you'd:", o:[
      {text:"Pivot idea and try another angle", type:"Visionary"},
      {text:"Analyze where process broke down", type:"Builder"},
      {text:"Try a different sales channel", type:"Hustler"},
      {text:"Improve the product quality", type:"Specialist"},
      {text:"Review cost and stop losses quickly", type:"Investor"}
    ]},
    { q:"Which role would you hire first?", o:[
      {text:"Creative lead", type:"Visionary"},
      {text:"Operations manager", type:"Builder"},
      {text:"Head of sales", type:"Hustler"},
      {text:"Technical lead", type:"Specialist"},
      {text:"Finance/analyst", type:"Investor"}
    ]},
    { q:"What do you want to be known for?", o:[
      {text:"Changing how people do something", type:"Visionary"},
      {text:"Running a smooth business", type:"Builder"},
      {text:"Being the go-to seller", type:"Hustler"},
      {text:"Top-quality work and results", type:"Specialist"},
      {text:"Smart bets that grow wealth", type:"Investor"}
    ]},
    { q:"If given 24 hours to launch something, you'd:", o:[
      {text:"Create a minimal vision pitch", type:"Visionary"},
      {text:"Set up a landing + fulfillment steps", type:"Builder"},
      {text:"Post to sell and take orders", type:"Hustler"},
      {text:"Prototype with high quality", type:"Specialist"},
      {text:"Test a small investment idea", type:"Investor"}
    ]},
    { q:"Your preferred learning style:", o:[
      {text:"Conceptual & big-picture", type:"Visionary"},
      {text:"Hands-on templates & SOPs", type:"Builder"},
      {text:"Practical on-the-job learning", type:"Hustler"},
      {text:"Focused deep study & practice", type:"Specialist"},
      {text:"Case studies and numbers", type:"Investor"}
    ]}
  ], // end job

  graduate: [
    { q:`You just graduated. If someone gave you ${formatCurrency(5000)} to try business, you'd:`, o:[
      {text:"Start an idea I believe can change things", type:"Visionary"},
      {text:"Plan the pilot and hire help", type:"Builder"},
      {text:"Buy goods to resell for quick revenue", type:"Hustler"},
      {text:"Invest in a course or tools to build skill", type:"Specialist"},
      {text:"Start small investments to learn returns", type:"Investor"}
    ]},
    { q:"Which excites you most about starting out?", o:[
      {text:"Building something people remember", type:"Visionary"},
      {text:"Creating a step-by-step plan", type:"Builder"},
      {text:"Earning money quickly", type:"Hustler"},
      {text:"Becoming excellent at a craft", type:"Specialist"},
      {text:"Learning how to grow capital", type:"Investor"}
    ]},
    { q:"Your main worry starting now is:", o:[
      {text:"Missing a bigger opportunity", type:"Visionary"},
      {text:"Not having a process", type:"Builder"},
      {text:"Not getting paying customers", type:"Hustler"},
      {text:"Not being skilled enough", type:"Specialist"},
      {text:"Losing money by mistake", type:"Investor"}
    ]},
    { q:"Early traction matters because:", o:[
      {text:"It validates a bold vision", type:"Visionary"},
      {text:"It proves systems work", type:"Builder"},
      {text:"It means money in the bank", type:"Hustler"},
      {text:"It shows your skill is valuable", type:"Specialist"},
      {text:"It demonstrates return on investment", type:"Investor"}
    ]},
    { q:"Which first customer would you target?", o:[
      {text:"Early adopters who love novelty", type:"Visionary"},
      {text:"People who need reliable delivery", type:"Builder"},
      {text:"Immediate buyers in your network", type:"Hustler"},
      {text:"Clients who value quality", type:"Specialist"},
      {text:"Those likely to pay for premium value", type:"Investor"}
    ]},
    { q:"Your first job in a team would be:", o:[
      {text:"Idea & product direction", type:"Visionary"},
      {text:"Project manager / builder", type:"Builder"},
      {text:"Sales & customer wins", type:"Hustler"},
      {text:"Technical contributor", type:"Specialist"},
      {text:"Financial/strategy thinking", type:"Investor"}
    ]},
    { q:"You learn fastest by:", o:[
      {text:"Trying lots of ideas", type:"Visionary"},
      {text:"Following clear frameworks", type:"Builder"},
      {text:"Doing real-world sales", type:"Hustler"},
      {text:"Taking expert courses & practice", type:"Specialist"},
      {text:"Studying outcomes & trends", type:"Investor"}
    ]},
    { q:"If something fails, you'll:", o:[
      {text:"Try a new bold pivot", type:"Visionary"},
      {text:"Improve the process and retry", type:"Builder"},
      {text:"Try a different sales angle", type:"Hustler"},
      {text:"Fix the technical issues", type:"Specialist"},
      {text:"Cut losses and reallocate funds", type:"Investor"}
    ]},
    { q:"Which type of mentor would you prefer?", o:[
      {text:"A founder who built something big", type:"Visionary"},
      {text:"An ops leader who scales teams", type:"Builder"},
      {text:"A top salesperson/marketer", type:"Hustler"},
      {text:"A senior technical expert", type:"Specialist"},
      {text:"An investor or financial strategist", type:"Investor"}
    ]},
    { q:"Your three-month goal is:", o:[
      {text:"Share a bold prototype or idea", type:"Visionary"},
      {text:"Run a pilot with clear steps", type:"Builder"},
      {text:"Make consistent sales each week", type:"Hustler"},
      {text:"Deliver a high-quality sample", type:"Specialist"},
      {text:"Grow a small investment account", type:"Investor"}
    ]},
    { q:"When picking a team you value:", o:[
      {text:"Diverse thinkers & creators", type:"Visionary"},
      {text:"Dependable operators", type:"Builder"},
      {text:"Hungry sellers", type:"Hustler"},
      {text:"Skilled craftsmen", type:"Specialist"},
      {text:"People who understand finance", type:"Investor"}
    ]},
    { q:"If you had to pick one activity today it would be:", o:[
      {text:"Sketch product ideas", type:"Visionary"},
      {text:"Map a one-month plan", type:"Builder"},
      {text:"Call & sell to 10 people", type:"Hustler"},
      {text:"Practice a key skill for 2 hours", type:"Specialist"},
      {text:"Read market data & reports", type:"Investor"}
    ]},
    { q:"Which success story inspires you most?", o:[
      {text:"Founders who changed lives", type:"Visionary"},
      {text:"Operators who built reliable firms", type:"Builder"},
      {text:"People who turned small hustles into businesses", type:"Hustler"},
      {text:"Top-rated professionals in their craft", type:"Specialist"},
      {text:"Investors who created lasting wealth", type:"Investor"}
    ]},
    { q:"After one year, you want to have:", o:[
      {text:"A working prototype & early users", type:"Visionary"},
      {text:"A repeatable service or product", type:"Builder"},
      {text:"Steady income from hustles", type:"Hustler"},
      {text:"Credible projects in your portfolio", type:"Specialist"},
      {text:"A small but growing investment pot", type:"Investor"}
    ]},
    { q:"Which trade-off will you accept early?", o:[
      {text:"Risk for big upside", type:"Visionary"},
      {text:"Slow growth but stable operations", type:"Builder"},
      {text:"Hard work and long hours for fast cash", type:"Hustler"},
      {text:"Time invested in mastery over quick wins", type:"Specialist"},
      {text:"Conservative bets to preserve capital", type:"Investor"}
    ]}
  ], // end graduate

  noSchool: [
    { q:`With ${formatCurrency(5000)} in hand, what's your most likely move?`, o:[
      {text:"Try a new product idea to sell locally", type:"Hustler"},
      {text:"Set up basic shop with clear systems", type:"Builder"},
      {text:"Pay for hands-on training or tools", type:"Specialist"},
      {text:"Partner with someone to scale reach", type:"Investor"},
      {text:"Make a creative thing to test demand", type:"Visionary"}
    ]},
    { q:"Which gives you confidence to start?", o:[
      {text:"Selling something and seeing money", type:"Hustler"},
      {text:"Knowing the steps and following them", type:"Builder"},
      {text:"Being skilled and trusted", type:"Specialist"},
      {text:"Having someone to back an idea", type:"Investor"},
      {text:"Having a unique idea people notice", type:"Visionary"}
    ]},
    { q:"On a market day, you'd prefer to:", o:[
      {text:"Find customers and sell fast", type:"Hustler"},
      {text:"Control stock and orders", type:"Builder"},
      {text:"Show off quality craftsmanship", type:"Specialist"},
      {text:"Speak to shop owners about bulk deals", type:"Investor"},
      {text:"Create a display that grabs attention", type:"Visionary"}
    ]},
    { q:"When a product doesn't sell, you:", o:[
      {text:"Try a different product", type:"Hustler"},
      {text:"Fix the supply & pricing", type:"Builder"},
      {text:"Improve the product quality", type:"Specialist"},
      {text:"Offer a small discount to keep cashflow", type:"Investor"},
      {text:"Rebrand or repackage creatively", type:"Visionary"}
    ]},
    { q:"What matters most in your community?", o:[
      {text:"People who can get things sold", type:"Hustler"},
      {text:"People who keep promises and deliver", type:"Builder"},
      {text:"Skilled hands you can trust", type:"Specialist"},
      {text:"People who understand money and deals", type:"Investor"},
      {text:"People who make things special", type:"Visionary"}
    ]},
    { q:"Your day would feel successful if:", o:[
      {text:"You made daily sales and kept cash", type:"Hustler"},
      {text:"Stocking, orders & customers all ran smoothly", type:"Builder"},
      {text:"Customers praised your workmanship", type:"Specialist"},
      {text:"You covered costs and saved a little", type:"Investor"},
      {text:"People shared your product for its uniqueness", type:"Visionary"}
    ]},
    { q:"You learn best by:", o:[
      {text:"Selling and fixing what doesn't work", type:"Hustler"},
      {text:"Watching how things are done and copying", type:"Builder"},
      {text:"Apprenticing with a skilled person", type:"Specialist"},
      {text:"Practicing small investments & tracking returns", type:"Investor"},
      {text:"Trying creative changes and seeing reactions", type:"Visionary"}
    ]},
    { q:"When cash is tight, you:", o:[
      {text:"Hustle harder to find buyers", type:"Hustler"},
      {text:"Cut unnecessary costs and streamline", type:"Builder"},
      {text:"Offer a small high-quality service", type:"Specialist"},
      {text:"Look for a short-term low-risk investment", type:"Investor"},
      {text:"Try a creative one-off product", type:"Visionary"}
    ]},
    { q:"If you had to partner with someone, pick:", o:[
      {text:"Someone with many customers", type:"Hustler"},
      {text:"Someone who can manage logistics", type:"Builder"},
      {text:"A skilled craftsperson", type:"Specialist"},
      {text:"A small investor with steady funds", type:"Investor"},
      {text:"An artist or creative who stands out", type:"Visionary"}
    ]},
    { q:"Your top priority for the next 6 months:", o:[
      {text:"Make enough cash to save", type:"Hustler"},
      {text:"Get a repeatable daily operation", type:"Builder"},
      {text:"Improve the quality of offerings", type:"Specialist"},
      {text:"Start a tiny investment plan", type:"Investor"},
      {text:"Launch something people remember", type:"Visionary"}
    ]},
    { q:"What frightens you most about business?", o:[
      {text:"No customers showing up", type:"Hustler"},
      {text:"Chaos and missed orders", type:"Builder"},
      {text:"Losing reputation for quality", type:"Specialist"},
      {text:"Losing capital quickly", type:"Investor"},
      {text:"My ideas being misunderstood", type:"Visionary"}
    ]},
    { q:"Which resource would help you most now?", o:[
      {text:"Faster ways to find buyers", type:"Hustler"},
      {text:"A checklist to manage stock & cash", type:"Builder"},
      {text:"Tools to improve craft", type:"Specialist"},
      {text:"Basic investment learning", type:"Investor"},
      {text:"A creative mentor to refine ideas", type:"Visionary"}
    ]},
    { q:"On social media you would:", o:[
      {text:"Post offers and close sales", type:"Hustler"},
      {text:"Show how your process works", type:"Builder"},
      {text:"Share craftsmanship and tutorials", type:"Specialist"},
      {text:"Share market insights and deals", type:"Investor"},
      {text:"Tell stories that build brand image", type:"Visionary"}
    ]},
    { q:"Your best short-term strategy is:", o:[
      {text:"Daily hustles and quick wins", type:"Hustler"},
      {text:"Tight operations and cost control", type:"Builder"},
      {text:"High-quality small orders", type:"Specialist"},
      {text:"Small low-risk investments to grow capital", type:"Investor"},
      {text:"A standout creative product to attract attention", type:"Visionary"}
    ]},
    { q:"After 6 months, you'd be happiest with:", o:[
      {text:"A steady small income from sales", type:"Hustler"},
      {text:"A working routine and the ability to replicate", type:"Builder"},
      {text:"A set of satisfied customers praising quality", type:"Specialist"},
      {text:"An initial investment that returned profit", type:"Investor"},
      {text:"A creative product that got noticed in the market", type:"Visionary"}
    ]}
  ], // end noSchool

  aspiring: [
    { q:`If someone gave you ${formatCurrency(5000)} to start experimenting, you would:`, o:[
      {text:"Try selling something fast to test demand", type:"Hustler"},
      {text:"Write a 30-day plan and simple schedule", type:"Builder"},
      {text:"Enroll in a short practical course", type:"Specialist"},
      {text:"Build a small online presence to experiment", type:"Visionary"},
      {text:"Set aside funds to try small investments", type:"Investor"}
    ]},
    { q:"What motivates you to start now?", o:[
      {text:"Extra income and independence", type:"Hustler"},
      {text:"Creating a reliable routine", type:"Builder"},
      {text:"Gaining a valuable trade or skill", type:"Specialist"},
      {text:"Bringing new ideas to life", type:"Visionary"},
      {text:"Putting small sums into promising opportunities", type:"Investor"}
    ]},
    { q:"You prefer immediate action or planning?", o:[
      {text:"Immediate action and testing", type:"Hustler"},
      {text:"Plan-first and then execute", type:"Builder"},
      {text:"Practice a skill then monetise", type:"Specialist"},
      {text:"Prototype the idea quickly", type:"Visionary"},
      {text:"Model the returns and then act", type:"Investor"}
    ]},
    { q:"Early customers for you are:", o:[
      {text:"People in your immediate network", type:"Hustler"},
      {text:"People who appreciate reliability", type:"Builder"},
      {text:"People looking for quality and craft", type:"Specialist"},
      {text:"Early adopters of creative products", type:"Visionary"},
      {text:"Those comfortable with small investments", type:"Investor"}
    ]},
    { q:"Where would you spend most of your first month?", o:[
      {text:"Talking to buyers & selling", type:"Hustler"},
      {text:"Mapping steps and securing basics", type:"Builder"},
      {text:"Practicing the main skill daily", type:"Specialist"},
      {text:"Testing ideas with mockups", type:"Visionary"},
      {text:"Researching small investments", type:"Investor"}
    ]},
    { q:"Which is your strength today?", o:[
      {text:"Energy and persistence", type:"Hustler"},
      {text:"Organisation and follow-through", type:"Builder"},
      {text:"Willingness to learn & practice", type:"Specialist"},
      {text:"Big-picture and creativity", type:"Visionary"},
      {text:"Number sense and planning", type:"Investor"}
    ]},
    { q:"If launch day is tomorrow, you:", o:[
      {text:"Get on phone and sell", type:"Hustler"},
      {text:"Check the checklist and run it", type:"Builder"},
      {text:"Ensure product quality", type:"Specialist"},
      {text:"Share a compelling story with visuals", type:"Visionary"},
      {text:"Ensure you understand the financials", type:"Investor"}
    ]},
    { q:"After 3 months you want:", o:[
      {text:"Reliable daily sales", type:"Hustler"},
      {text:"A documented process you can repeat", type:"Builder"},
      {text:"A portfolio of quality work", type:"Specialist"},
      {text:"A validated idea with early fans", type:"Visionary"},
      {text:"A small but growing savings/investment", type:"Investor"}
    ]},
    { q:"What scares you most about starting?", o:[
      {text:"Not finding customers", type:"Hustler"},
      {text:"Things being disorganized", type:"Builder"},
      {text:"Not being skilled enough", type:"Specialist"},
      {text:"My ideas not being taken seriously", type:"Visionary"},
      {text:"Losing capital quickly", type:"Investor"}
    ]},
    { q:"Your networking approach would be:", o:[
      {text:"Ask around for buyers & quick wins", type:"Hustler"},
      {text:"Build a list and reach out methodically", type:"Builder"},
      {text:"Find a mentor and practice under them", type:"Specialist"},
      {text:"Share creative samples and build buzz", type:"Visionary"},
      {text:"Find small co-investors to test ideas", type:"Investor"}
    ]},
    { q:"Which tool would you learn first?", o:[
      {text:"Simple sales/ordering tools (WhatsApp, Excel)", type:"Hustler"},
      {text:"A planning template or checklist app", type:"Builder"},
      {text:"A tool that improves your craft", type:"Specialist"},
      {text:"A basic website or design tool", type:"Visionary"},
      {text:"A simple finance/investment tracker", type:"Investor"}
    ]},
    { q:"A successful first sale means to you:", o:[
      {text:"Proof that people will pay", type:"Hustler"},
      {text:"The process can work repeatedly", type:"Builder"},
      {text:"My quality is valued", type:"Specialist"},
      {text:"People like the idea", type:"Visionary"},
      {text:"My money move worked", type:"Investor"}
    ]},
    { q:"After 6 months, you'd like:", o:[
      {text:"A small business that pays the bills", type:"Hustler"},
      {text:"A repeatable, reliable business unit", type:"Builder"},
      {text:"Recognized skill and steady clients", type:"Specialist"},
      {text:"A creative product or community with fans", type:"Visionary"},
      {text:"A growing portfolio of small wins", type:"Investor"}
    ]},
    { q:"If you could have one help, you'd choose:", o:[
      {text:"Someone who finds customers", type:"Hustler"},
      {text:"Someone who sets up operations", type:"Builder"},
      {text:"A skilled trainer to speed up mastery", type:"Specialist"},
      {text:"A creative partner to co-create", type:"Visionary"},
      {text:"A mentor who knows investments", type:"Investor"}
    ]}
  ] // end aspiring
}; // end questionSets

/* ---------- State ---------- */
let selectedBackground = null;
let activeQs = [];
let idx = 0;
let answers = []; // store objects {type, text}

/* ---------- UI refs ---------- */
const bgWrap = $("backgroundOptions");
const startBtn = $("startQuizBtn");
const qText = $("questionText");
const optsWrap = $("options");
const progressText = $("progressText");
const progressBar = $("progressBar");
const backBtn = $("backBtn");
const nextBtn = $("nextBtn");
const archetypeTitle = $("archetypeTitle");
const profileRead = $("profileRead");
const pathsWrap = $("paths");
const pathwaySelect = $("pathwaySelect");
const roadmapWrap = $("roadmap");

/* ---------- Render background choices ---------- */
function renderBackgrounds(){
  if(!bgWrap) return;
  bgWrap.innerHTML = "";
  backgrounds.forEach(bg => {
    const b = document.createElement("button");
    b.className = "option";
    b.type = "button";
    b.textContent = bg.label;
    b.onclick = () => {
      selectedBackground = bg.id;
      // highlight selection
      bgWrap.querySelectorAll(".option").forEach(n => n.classList.remove("active"));
      b.classList.add("active");
      if(startBtn) startBtn.style.display = "inline-block";
    };
    bgWrap.appendChild(b);
  });
}
renderBackgrounds();

/* ---------- Quiz control functions ---------- */
function startQuiz(){
  if(!selectedBackground){ alert("Please choose your current stage."); return; }
  activeQs = questionSets[selectedBackground] || [];
  if(!activeQs.length){ alert("No questions found for this stage."); return; }
  idx = 0;
  answers = new Array(activeQs.length).fill(null);
  goTo("quiz");
  renderQuestion();
}

function renderQuestion(){
  const q = activeQs[idx];
  if(!q){ console.error("Question missing at index", idx); return; }
  qText.textContent = q.q;
  optsWrap.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = opt.text;
    btn.onclick = () => {
      answers[idx] = { type: opt.type, text: opt.text };
      // UI selection
      optsWrap.querySelectorAll(".option").forEach(n => n.classList.remove("active"));
      btn.classList.add("active");
      if(nextBtn) nextBtn.disabled = false;
    };
    // restore selection
    if(answers[idx] && answers[idx].text === opt.text) btn.classList.add("active");
    optsWrap.appendChild(btn);
  });

  // progress
  progressText.textContent = `Question ${idx+1} of ${activeQs.length}`;
  const pct = Math.round(((idx)/activeQs.length) * 100);
  if(progressBar) progressBar.style.width = `${pct}%`;

  // nav
  backBtn.style.visibility = idx === 0 ? "hidden" : "visible";
  nextBtn.textContent = idx === activeQs.length - 1 ? "Finish" : "Next";
  nextBtn.disabled = !answers[idx];
}

function nextQ(){
  if(!answers[idx]){ alert("Please choose an option to continue."); return; }
  if(idx < activeQs.length - 1){ idx++; renderQuestion(); }
  else { finishQuiz(); }
}
function prevQ(){ if(idx>0){ idx--; renderQuestion(); } }

/* ---------- Scoring & Results ---------- */
function finishQuiz(){
  // tally
  const scores = { Visionary:0, Builder:0, Hustler:0, Specialist:0, Investor:0 };
  answers.forEach(a => { if(a && a.type) scores[a.type] = (scores[a.type]||0) + 1; });

  // winner, tie-break by fixed priority Visionary>Builder>Hustler>Specialist>Investor
  const order = ["Visionary","Builder","Hustler","Specialist","Investor"];
  let winner = order[0], best = -1;
  order.forEach(k => {
    if(scores[k] > best){ best = scores[k]; winner = k; }
  });

  renderResults(winner, scores);
  goTo("results");
}

function renderResults(arch, counts){
  const profile = archetypeProfiles[arch];
  if(!profile){ console.error("Missing profile", arch); return; }

  archetypeTitle.textContent = `${profile.title} — (${counts[arch]||0} signals)`;
  profileRead.innerHTML = `
    <p><strong>Strengths:</strong> ${profile.strengths.join(" • ")}</p>
    <p><strong>Blindspots:</strong> ${profile.blindspots.join(" • ")}</p>
    <p><strong>How this fits your background:</strong> ${profile.byBackground[selectedBackground]}</p>
  `;

  // show pathways and populate selector
  pathsWrap.innerHTML = "";
  pathwaySelect.innerHTML = "";
  profile.pathways.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "path-item";
    d.textContent = `• ${p}`;
    pathsWrap.appendChild(d);

    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    if(i===0) opt.selected = true;
    pathwaySelect.appendChild(opt);
  });

  roadmapWrap.innerHTML = ""; // clear previous
}

/* ---------- Roadmap generation (dynamic) ---------- */
function generateRoadmap(){
  const path = pathwaySelect.value;
  if(!path){ alert("Please choose a pathway."); return; }
  const steps = roadmaps[path] || ["No roadmap configured for this pathway yet."];
  roadmapWrap.innerHTML = `<h3>6-Month Roadmap — ${path}</h3>`;
  steps.forEach((s, i) => {
    const m = document.createElement("div");
    m.className = "month";
    m.innerHTML = `<h4>Month ${i+1}</h4><p>${s}</p>`;
    roadmapWrap.appendChild(m);
  });

  // quick tailored tip based on background
  const tip = document.createElement("div");
  tip.className = "card";
  tip.style.marginTop = "12px";
  tip.innerHTML = `<strong>Quick tip:</strong> As someone who is "${backgrounds.find(b=>b.id===selectedBackground).label}", focus the first 30 days on validating demand (sales or user tests) before expanding.`;
  roadmapWrap.appendChild(tip);
}

/* ---------- Expose to global (HTML buttons call these) ---------- */
window.goTo = goTo;
window.startQuiz = startQuiz;
window.nextQ = nextQ;
window.prevQ = prevQ;
window.generateRoadmap = generateRoadmap;

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderBackgrounds();
  // Defensive UI states
  if(startBtn) startBtn.style.display = "none";
  if(nextBtn) nextBtn.disabled = true;
  if(backBtn) backBtn.style.visibility = "hidden";
});