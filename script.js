/**********************
  script.js - Full Production Version
  - Background-aware 15 questions each
  - 5 archetypes
  - 5 pathways per archetype
  - 6-month roadmaps per pathway
  - Dynamic currency formatting ($5,000)
**********************/

/* ---------- Utilities ---------- */
function formatCurrency(amount){
  // ensure number -> formatted with comma separators
  if (typeof amount !== "number") amount = Number(amount) || 0;
  return `$${amount.toLocaleString()}`;
}

function el(id){ return document.getElementById(id); }

function goTo(pageId){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = el(pageId);
  if(target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Fill footer year if present */
if(el("year")) el("year").textContent = new Date().getFullYear();

/* ---------- App Data: Backgrounds ---------- */
const backgrounds = [
  { id:"office", label:"I have worked in an office or company before" },
  { id:"graduate", label:"I am a fresh graduate" },
  { id:"unfinished", label:"I did not finish school or equivalent" },
  { id:"aspiring", label:"I am simply interested in starting a business" }
];

/* ---------- Archetypes & Pathways ---------- */
const archetypeProfiles = {
  Hustler: {
    title: "Hustler ⚡",
    desc: "You move fast, test quickly, and focus on results. You spot market gaps and can turn small wins into steady cash.",
    pathways: [
      "Buying & Selling",
      "Importation",
      "Affiliate/Reseller",
      "Local Market Hustle",
      "Street Food / Quick Service"
    ]
  },
  Planner: {
    title: "Planner 🛠️",
    desc: "You prefer structure, process and building things that scale reliably. You like checklists, SOPs and step-by-step growth.",
    pathways: [
      "Consulting / Coaching",
      "Professional Services",
      "Event Planning / Management",
      "Accounting & Bookkeeping",
      "Project Management / Ops"
    ]
  },
  Learner: {
    title: "Learner 🧠",
    desc: "You invest in skill and craft. You build deep capability, credibility and monetize expertise through services or products.",
    pathways: [
      "Fashion Design & Tailoring",
      "Hair & Beauty / Salon",
      "Catering & Small Meals",
      "Handmade Crafts & Products",
      "Technical Freelance / Specialist Services"
    ]
  },
  DigitalDreamer: {
    title: "Digital Dreamer 🌐",
    desc: "You like online channels and tech-enabled models — building products or services that can scale via the internet.",
    pathways: [
      "Freelancing (Design/Dev/Copy)",
      "E-commerce Store",
      "App / No-code Product",
      "Content Creator Brand",
      "Online Tutoring / Courses"
    ]
  },
  Connector: {
    title: "Connector 🤝",
    desc: "You thrive on people, networks and partnerships. You can build distribution, sales and relationships to make things happen.",
    pathways: [
      "Agency / Partnerships",
      "Community Hub / Marketplace",
      "Logistics & Delivery",
      "Import & Wholesale Distribution",
      "Real Estate Linking / Referrals"
    ]
  }
};

/* ---------- Roadmaps: 6 months per pathway ---------- */
/* Every pathway used above must have a roadmap here */
const roadmaps = {
  /* HUSTLER */
  "Buying & Selling": [
    "Month 1: Research high-demand local items and list 8 potential SKUs to test.",
    `Month 2: Start with a small stock purchase and begin selling to friends/family/community.`,
    "Month 3: Track daily sales and identify top 2 winners; reinvest profits into those items.",
    "Month 4: Expand to social channels and a local marketplace presence.",
    "Month 5: Introduce bundles or small promos to increase average order value.",
    "Month 6: Formalize supplier relationships and consider a fixed stall or online shop."
  ],
  "Importation": [
    "Month 1: Research suppliers on global marketplaces and calculate landed cost & margins.",
    `Month 2: Place a small trial order (e.g. ${formatCurrency(200)}–${formatCurrency(500)}) to test quality.`,
    "Month 3: Receive items, list them online and sell to initial customers.",
    "Month 4: Collect feedback and improve packaging/pricing.",
    "Month 5: Negotiate better shipping terms & reorder bestsellers.",
    "Month 6: Establish a regular import rhythm and scale order volumes."
  ],
  "Affiliate/Reseller": [
    "Month 1: Choose a niche and sign up for 2–3 affiliate programs or reseller platforms.",
    "Month 2: Build a simple online presence: Instagram, WhatsApp catalogue or a landing page.",
    "Month 3: Publish review-style content and start sharing affiliate links.",
    "Month 4: Test small paid boosts or micro-influencer collaborations.",
    "Month 5: Double down on top-performing offers and optimise promos.",
    "Month 6: Automate posts and track commissions, then expand product offerings."
  ],
  "Local Market Hustle": [
    "Month 1: Talk to market sellers and customers; identify gaps in offerings.",
    "Month 2: Source small stock and begin selling on market days.",
    "Month 3: Build repeat customers via simple loyalty (discounts, bundles).",
    "Month 4: Improve displays and packaging to stand out.",
    "Month 5: Add one complementary product line.",
    "Month 6: Consider hiring a helper or renting a more permanent space."
  ],
  "Street Food / Quick Service": [
    "Month 1: Decide on a simple, repeatable menu and test recipes.",
    "Month 2: Get permits (where required) and start selling to neighbours/friends.",
    "Month 3: Record costs and set profitable pricing.",
    "Month 4: Improve packaging and add delivery options.",
    "Month 5: Build small catering for events or offices.",
    "Month 6: Scale kitchen capacity and consider a stall or kiosk."
  ],

  /* PLANNER */
  "Consulting / Coaching": [
    "Month 1: Choose a niche and define your core offer and outcome.",
    "Month 2: Create a one-page service offer and pricing options.",
    "Month 3: Reach out to 10 potential clients for paid pilots or trials.",
    "Month 4: Collect testimonials and document case studies.",
    "Month 5: Package services into defined programs and retainer options.",
    "Month 6: Automate onboarding and scale with part-time contractors."
  ],
  "Professional Services": [
    "Month 1: Formalize your skills and create clear service packages.",
    "Month 2: Build a professional profile and sample work pieces.",
    "Month 3: Network with industry groups and pitch to clients.",
    "Month 4: Deliver and document 2–3 paid engagements.",
    "Month 5: Build SOPs for repeatable delivery.",
    "Month 6: Consider a small team to increase capacity."
  ],
  "Event Planning / Management": [
    "Month 1: Define your event niche (weddings, corporate, pop-ups).",
    "Month 2: Create sample packages and pricing templates.",
    "Month 3: Run 1–2 small events at a discount to build a portfolio.",
    "Month 4: Collect visuals, testimonials and vendor partners.",
    "Month 5: Create referral partnerships with venues and suppliers.",
    "Month 6: Scale with a repeatable event checklist and hire support staff."
  ],
  "Accounting & Bookkeeping": [
    "Month 1: Choose accounting software and prepare sample templates.",
    "Month 2: Offer bookkeeping to 2–3 small businesses at a discount.",
    "Month 3: Standardize monthly reporting and billing.",
    "Month 4: Build packages (monthly, quarterly, tax prep).",
    "Month 5: Get referrals and build steady revenue.",
    "Month 6: Hire or partner with another bookkeeper to serve more clients."
  ],
  "Project Management / Ops": [
    "Month 1: Document common processes in a single business scenario.",
    "Month 2: Offer process audits to local businesses for a fee.",
    "Month 3: Implement 1–2 process improvements and measure results.",
    "Month 4: Create SOP templates and training materials.",
    "Month 5: Sell process packages to small companies.",
    "Month 6: Expand to managed services and contract staff."
  ],

  /* LEARNER */
  "Fashion Design & Tailoring": [
    "Month 1: Learn basic patterns or partner with an experienced tailor; sketch ideas.",
    "Month 2: Produce 3–5 sample pieces and test fit/quality.",
    "Month 3: Take custom orders and collect feedback.",
    "Month 4: Build a social portfolio with photos and client reviews.",
    "Month 5: Offer limited pre-orders or small collections.",
    "Month 6: Attend local markets or pop-ups and expand production."
  ],
  "Hair & Beauty / Salon": [
    "Month 1: Train or apprentice with a local professional for the basics.",
    "Month 2: Offer services at a discount to build a client base.",
    "Month 3: Collect testimonials and optimize pricing.",
    "Month 4: Improve space/kit and build booking processes.",
    "Month 5: Launch small package deals and referral offers.",
    "Month 6: Hire a junior stylist or open a small chair rental model."
  ],
  "Catering & Small Meals": [
    "Month 1: Finalize a small menu and pilot with friends/office.",
    "Month 2: Track food costs and pricing for profitability.",
    "Month 3: Start regular deliveries or pre-order services.",
    "Month 4: Build packaging and hygiene standards.",
    "Month 5: Target small events and build repeat clients.",
    "Month 6: Scale production with a partner kitchen or assistant."
  ],
  "Handmade Crafts & Products": [
    "Month 1: Create 10–20 items and take photos for listing.",
    "Month 2: List on local marketplaces and social platforms.",
    "Month 3: Collect early reviews and improve listing copy.",
    "Month 4: Test small paid promotions and local pop-ups.",
    "Month 5: Build repeat custom orders and wholesale inquiries.",
    "Month 6: Systematize production and onboard a helper."
  ],
  "Technical Freelance / Specialist Services": [
    "Month 1: Pick a marketable skill and build 1–2 strong portfolio pieces.",
    "Month 2: Create profiles on freelance platforms and reach out to clients.",
    "Month 3: Deliver stellar work for first clients and collect testimonials.",
    "Month 4: Package repeatable services and increase rates.",
    "Month 5: Build a small network of other specialists for referrals.",
    "Month 6: Consider forming a micro-agency or consolidated offer."
  ],

  /* DIGITALDREAMER */
  "Freelancing (Design/Dev/Copy)": [
    "Month 1: Pick a specialization and create 3 portfolio samples.",
    "Month 2: Register on 1–2 freelance platforms and pitch weekly.",
    "Month 3: Secure first paid client and collect a review.",
    "Month 4: Standardize proposals and delivery templates.",
    "Month 5: Raise rates for proven clients and automate billing.",
    "Month 6: Build recurring clients or subscription services."
  ],
  "E-commerce Store": [
    "Month 1: Choose a niche, choose products and define brand voice.",
    "Month 2: Set up a store (Shopify/Shopline/WooCommerce) and add 8–12 products.",
    "Month 3: Optimize product pages and images for conversion.",
    "Month 4: Start organic and small-paid channels for traffic.",
    "Month 5: Improve conversion & shipping, measure CAC/LTV basics.",
    "Month 6: Scale winners and automate fulfilment."
  ],
  "App / No-code Product": [
    "Month 1: Validate problem with 20 interviews and define core user story.",
    "Month 2: Build clickable mockups or no-code prototype.",
    "Month 3: Test prototype with 10–20 users and iterate.",
    "Month 4: Build an MVP and onboard beta users.",
    "Month 5: Get usage metrics, refine retention flow.",
    "Month 6: Launch publicly and plan growth channels."
  ],
  "Content Creator Brand": [
    "Month 1: Pick niche, create a content plan and 20 pieces of content.",
    "Month 2: Post consistently and engage early viewers.",
    "Month 3: Test monetization (affiliate links, simple product).",
    "Month 4: Build an email/newsletter or paid community.",
    "Month 5: Launch an initial paid offering (ebook, course, merch).",
    "Month 6: Systematize content production and delegate editing tasks."
  ],
  "Online Tutoring / Courses": [
    "Month 1: Pick teachable skills and outline a beginner course.",
    "Month 2: Record lessons and create course materials.",
    "Month 3: Run a beta cohort for feedback and testimonials.",
    "Month 4: Iterate and improve the course structure.",
    "Month 5: Market via partnerships and student referrals.",
    "Month 6: Automate admissions and scale cohorts."
  ],

  /* CONNECTOR */
  "Agency / Partnerships": [
    "Month 1: Identify a partner-friendly service and define deliverables.",
    "Month 2: Create a pitch and reach out to 10 potential partners.",
    "Month 3: Land first partner project and build a case study.",
    "Month 4: Standardize delivery and revenue splits.",
    "Month 5: Expand to 3 recurring partners.",
    "Month 6: Hire or contract specialists and create retainer packages."
  ],
  "Community Hub / Marketplace": [
    "Month 1: Define community niche and value proposition.",
    "Month 2: Build a simple presence (WhatsApp/Telegram/FB group and landing page).",
    "Month 3: Invite early members and run events or offers.",
    "Month 4: Monetize with small fees, marketplace commissions or ads.",
    "Month 5: Build partnerships to add value to members.",
    "Month 6: Scale community growth and create tiered memberships."
  ],
  "Logistics & Delivery": [
    "Month 1: Survey local delivery needs and price points.",
    "Month 2: Partner with 1–2 riders and trial small routes.",
    "Month 3: Offer reliable service to local businesses.",
    "Month 4: Improve scheduling and tracking (WhatsApp/Excel to start).",
    "Month 5: Create recurring contracts with 3–5 businesses.",
    "Month 6: Formalize as a branded local logistics service."
  ],
  "Import & Wholesale Distribution": [
    "Month 1: Map local retail demand and potential wholesale items.",
    "Month 2: Source a supplier and bring a small test batch.",
    "Month 3: Approach small retailers with samples and offers.",
    "Month 4: Build a reorder schedule and manage inventory.",
    "Month 5: Negotiate better terms and expand SKU range.",
    "Month 6: Scale to multiple retail clients and formalize invoicing."
  ],
  "Real Estate Linking / Referrals": [
    "Month 1: Build local network of agents and landlords.",
    "Month 2: Learn referral rules and value-add services.",
    "Month 3: Refer first clients and collect referral fees.",
    "Month 4: Build a simple listing database and outreach system.",
    "Month 5: Add small property management or leasing support.",
    "Month 6: Scale referrals and create steady commission income."
  ]
}; // end roadmaps

/* ---------- Questions: 15 per background (each option maps to one of 5 archetypes) ---------- */
/* Archetype keys used here: "Hustler","Planner","Learner","DigitalDreamer","Connector" */

const questionSets = {
  office: [
    {
      q: "In your office role, which part of work gave you the most energy?",
      o:[
        {text:"Finding quick wins and closing deals", type:"Hustler"},
        {text:"Designing processes and systems", type:"Planner"},
        {text:"Learning new technical skills", type:"Learner"},
        {text:"Using tools and tech to improve work", type:"DigitalDreamer"},
        {text:"Building relationships and partnerships", type:"Connector"}
      ]
    },
    {
      q: `If you had ${formatCurrency(5000)} to test a side-business, what would you do?`,
      o:[
        {text:"Buy stock and sell quickly", type:"Hustler"},
        {text:"Plan a pilot and document SOPs", type:"Planner"},
        {text:"Buy training or tools to improve a skill", type:"Learner"},
        {text:"Build a simple online service or landing page", type:"DigitalDreamer"},
        {text:"Partner with colleagues to sell to networks", type:"Connector"}
      ]
    },
    {
      q: "When you solve problems what’s your default approach?",
      o:[
        {text:"Try something fast to see if it works", type:"Hustler"},
        {text:"Map steps and test carefully", type:"Planner"},
        {text:"Read & learn to find best practice", type:"Learner"},
        {text:"Prototype digitally (sheet, mockup)", type:"DigitalDreamer"},
        {text:"Ask who else can help or distribute the solution", type:"Connector"}
      ]
    },
    {
      q: "Which of these excites you about starting a business?",
      o:[
        {text:"Making immediate sales and cash", type:"Hustler"},
        {text:"Creating repeatable systems", type:"Planner"},
        {text:"Becoming the expert people trust", type:"Learner"},
        {text:"Building something that can scale online", type:"DigitalDreamer"},
        {text:"Growing through partnerships and referrals", type:"Connector"}
      ]
    },
    {
      q: "How do you feel about risk?",
      o:[
        {text:"I accept risk if I can hustle to cover it", type:"Hustler"},
        {text:"I prefer to mitigate with a plan", type:"Planner"},
        {text:"I reduce risk by learning more", type:"Learner"},
        {text:"I test digital channels with low budget", type:"DigitalDreamer"},
        {text:"I spread risk by working with partners", type:"Connector"}
      ]
    },
    {
      q: "Which role suits you in an early-stage team?",
      o:[
        {text:"Sales/closing deals", type:"Hustler"},
        {text:"Operations & processes", type:"Planner"},
        {text:"Product/technical expert", type:"Learner"},
        {text:"Product/UX or tech builder", type:"DigitalDreamer"},
        {text:"Partnerships & biz dev", type:"Connector"}
      ]
    },
    {
      q: "Which outcome impresses you most in a business?",
      o:[
        {text:"High daily revenue", type:"Hustler"},
        {text:"Reliable monthly systems", type:"Planner"},
        {text:"Recognized expertise and quality", type:"Learner"},
        {text:"Fast-growing online users", type:"DigitalDreamer"},
        {text:"Strong referral pipeline", type:"Connector"}
      ]
    },
    {
      q: "When you sell, what do you rely on?",
      o:[
        {text:"Energy and persistence", type:"Hustler"},
        {text:"Offer clarity and structure", type:"Planner"},
        {text:"Trust built through skill", type:"Learner"},
        {text:"Digital storytelling and UX", type:"DigitalDreamer"},
        {text:"Warm introductions and networks", type:"Connector"}
      ]
    },
    {
      q: "Your ideal first month result would be:",
      o:[
        {text:"Make several fast sales", type:"Hustler"},
        {text:"Prove a process works", type:"Planner"},
        {text:"Deliver a high-quality first product/service", type:"Learner"},
        {text:"Launch a landing page and get users", type:"DigitalDreamer"},
        {text:"Sign up partners or local sellers", type:"Connector"}
      ]
    },
    {
      q: "What slows you down most?",
      o:[
        {text:"Paperwork and slow payments", type:"Hustler"},
        {text:"Lack of structure", type:"Planner"},
        {text:"Not enough training/resources", type:"Learner"},
        {text:"Limited tech knowledge", type:"DigitalDreamer"},
        {text:"No access to the right people", type:"Connector"}
      ]
    },
    {
      q: "When building products you focus on:",
      o:[
        {text:"What sells quickly", type:"Hustler"},
        {text:"What can be repeated reliably", type:"Planner"},
        {text:"What shows skill/quality", type:"Learner"},
        {text:"What delights users digitally", type:"DigitalDreamer"},
        {text:"What partners can help distribute", type:"Connector"}
      ]
    },
    {
      q: "How do you prefer to learn business skills?",
      o:[
        {text:"On-the-job, learning as I go", type:"Hustler"},
        {text:"Systematic courses & playbooks", type:"Planner"},
        {text:"Guided mentorship and deep practice", type:"Learner"},
        {text:"Online tutorials and building projects", type:"DigitalDreamer"},
        {text:"Networking events and peer groups", type:"Connector"}
      ]
    },
    {
      q: "If you had to pick a first customer, you'd choose:",
      o:[
        {text:"Someone who buys now and pays", type:"Hustler"},
        {text:"Someone who helps you refine the process", type:"Planner"},
        {text:"Someone who demands quality and feedback", type:"Learner"},
        {text:"Someone who will share your online content", type:"DigitalDreamer"},
        {text:"Someone who can introduce you to others", type:"Connector"}
      ]
    },
    {
      q: "What do you want to be known for in 3 years?",
      o:[
        {text:"Making things that people buy daily", type:"Hustler"},
        {text:"Running a dependable operation", type:"Planner"},
        {text:"Being the go-to expert in a skill", type:"Learner"},
        {text:"Creating popular digital products", type:"DigitalDreamer"},
        {text:"Building a strong network of partners", type:"Connector"}
      ]
    },
    {
      q: "Which sounds like a better next step for you?",
      o:[
        {text:"A quick buyer test to prove demand", type:"Hustler"},
        {text:"A 30-day plan and checklist", type:"Planner"},
        {text:"A short course to level up", type:"Learner"},
        {text:"Build a small prototype online", type:"DigitalDreamer"},
        {text:"Call 10 people who can help you sell", type:"Connector"}
      ]
    }
  ], // end office questions

  graduate: [
    {
      q: "Imagine you just graduated and someone gave you " + formatCurrency(5000) + " to start — what do you try first?",
      o:[
        {text:"Buy stock and sell in my community", type:"Hustler"},
        {text:"Make a plan and test step-by-step", type:"Planner"},
        {text:"Use it to buy a short course and tools", type:"Learner"},
        {text:"Build a simple online service or offer", type:"DigitalDreamer"},
        {text:"Partner with friends and split roles", type:"Connector"}
      ]
    },
    {
      q: "Which would you rather learn right now?",
      o:[
        {text:"How to close quick deals", type:"Hustler"},
        {text:"How to run operations", type:"Planner"},
        {text:"A practical technical skill", type:"Learner"},
        {text:"Basic web or design building", type:"DigitalDreamer"},
        {text:"How to find and keep clients", type:"Connector"}
      ]
    },
    {
      q: "Your ideal first month outcome from a start-up test is:",
      o:[
        {text:"Make quick revenue", type:"Hustler"},
        {text:"Prove a repeatable process", type:"Planner"},
        {text:"Deliver a high-quality sample", type:"Learner"},
        {text:"Get early users online", type:"DigitalDreamer"},
        {text:"Get 3 referrals from partners", type:"Connector"}
      ]
    },
    {
      q: "What’s most important when choosing an idea?",
      o:[
        {text:"Can I sell it quickly?", type:"Hustler"},
        {text:"Can I make a process for it?", type:"Planner"},
        {text:"Will it let me improve my skills?", type:"Learner"},
        {text:"Can it be scaled online?", type:"DigitalDreamer"},
        {text:"Will others help me distribute it?", type:"Connector"}
      ]
    },
    {
      q: "When someone asks about your strengths, you’d say:",
      o:[
        {text:"I can hustle and make things happen", type:"Hustler"},
        {text:"I’m organized and reliable", type:"Planner"},
        {text:"I learn quickly and care about quality", type:"Learner"},
        {text:"I can build things on the internet", type:"DigitalDreamer"},
        {text:"I know how to connect people", type:"Connector"}
      ]
    },
    {
      q: "If friends wanted to start with you, your role would be:",
      o:[
        {text:"Get initial buyers", type:"Hustler"},
        {text:"Create the plan & timeline", type:"Planner"},
        {text:"Handle technical work", type:"Learner"},
        {text:"Build online presence", type:"DigitalDreamer"},
        {text:"Reach out to contacts & partners", type:"Connector"}
      ]
    },
    {
      q: "Which of these early tactics appeals most?",
      o:[
        {text:"Door-to-door or market selling", type:"Hustler"},
        {text:"Lean process and MVP-driven", type:"Planner"},
        {text:"Take a paid project to build portfolio", type:"Learner"},
        {text:"Make a simple landing page", type:"DigitalDreamer"},
        {text:"Run club or campus referrals", type:"Connector"}
      ]
    },
    {
      q: `Would you use ${formatCurrency(5000)} to import goods as a test?`,
      o:[
        {text:"Yes — if I can resell quickly", type:"Hustler"},
        {text:"Maybe — only with a clear plan", type:"Planner"},
        {text:"Only if product improves my craft", type:"Learner"},
        {text:"If I can list it in an online store", type:"DigitalDreamer"},
        {text:"If I have partner retailers to sell", type:"Connector"}
      ]
    },
    {
      q: "How do you prefer feedback?",
      o:[
        {text:"Quick, real customer feedback", type:"Hustler"},
        {text:"Measured tests and metrics", type:"Planner"},
        {text:"Expert critique to improve skill", type:"Learner"},
        {text:"User experience and analytics", type:"DigitalDreamer"},
        {text:"Partner insights and referrals", type:"Connector"}
      ]
    },
    {
      q: "What would make you stop a test?",
      o:[
        {text:"No immediate buyers", type:"Hustler"},
        {text:"Process too messy", type:"Planner"},
        {text:"Quality concerns", type:"Learner"},
        {text:"Too few online signals", type:"DigitalDreamer"},
        {text:"No supportive partners", type:"Connector"}
      ]
    },
    {
      q: "Which monthly goal sounds best to you?",
      o:[
        {text:"Hit first sales target", type:"Hustler"},
        {text:"Document and refine a workflow", type:"Planner"},
        {text:"Deliver a high-quality sample project", type:"Learner"},
        {text:"Get first 50 website/social followers", type:"DigitalDreamer"},
        {text:"Sign 3 partner agreements", type:"Connector"}
      ]
    },
    {
      q: "How important is branding to you early on?",
      o:[
        {text:"Important if it helps sell quickly", type:"Hustler"},
        {text:"Important but secondary to process", type:"Planner"},
        {text:"Important to show craft", type:"Learner"},
        {text:"Very important for online presence", type:"DigitalDreamer"},
        {text:"Important for partner credibility", type:"Connector"}
      ]
    },
    {
      q: "What would you rather invest in first?",
      o:[
        {text:"Stock to sell", type:"Hustler"},
        {text:"A simple operations tool", type:"Planner"},
        {text:"A course or toolkit", type:"Learner"},
        {text:"A landing page or app prototype", type:"DigitalDreamer"},
        {text:"A small marketing meetup to meet partners", type:"Connector"}
      ]
    },
    {
      q: "Which feels more rewarding to you?",
      o:[
        {text:"Closing deals and getting paid", type:"Hustler"},
        {text:"Systems working smoothly", type:"Planner"},
        {text:"Becoming known for your craft", type:"Learner"},
        {text:"Seeing content/users grow fast", type:"DigitalDreamer"},
        {text:"Watching your network bring opportunities", type:"Connector"}
      ]
    },
    {
      q: "After 6 months, you'd most like to have:",
      o:[
        {text:"A small, profitable hustle", type:"Hustler"},
        {text:"A repeatable business process", type:"Planner"},
        {text:"A strong reputation/portfolio", type:"Learner"},
        {text:"A growing online audience/customer base", type:"DigitalDreamer"},
        {text:"A pipeline of partners/customers", type:"Connector"}
      ]
    }
  ], // end graduate set

  unfinished: [
    {
      q: `If you had ${formatCurrency(5000)} today, what would be your first move to start hustling?`,
      o:[
        {text:"Buy goods to sell quickly", type:"Hustler"},
        {text:"Plan out a small stall or shop", type:"Planner"},
        {text:"Use some to learn a craft/trade", type:"Learner"},
        {text:"Try to set up an online sale page", type:"DigitalDreamer"},
        {text:"Talk to shop owners and ask to sell for them", type:"Connector"}
      ]
    },
    {
      q: "Which daily activity do you enjoy most?",
      o:[
        {text:"Talking and selling to people", type:"Hustler"},
        {text:"Organizing materials and money", type:"Planner"},
        {text:"Making or crafting things", type:"Learner"},
        {text:"Posting items and chatting online", type:"DigitalDreamer"},
        {text:"Asking people for advice and contacts", type:"Connector"}
      ]
    },
    {
      q: "When something goes wrong with a sale, you:",
      o:[
        {text:"Try another angle quickly", type:"Hustler"},
        {text:"Write steps to avoid it again", type:"Planner"},
        {text:"Practice to improve the product", type:"Learner"},
        {text:"Change the online listing", type:"DigitalDreamer"},
        {text:"Ask other sellers what they did", type:"Connector"}
      ]
    },
    {
      q: "You prefer business that:",
      o:[
        {text:"Gives quick cash every day", type:"Hustler"},
        {text:"Grows steady and predictable", type:"Planner"},
        {text:"Gets better as you get skilled", type:"Learner"},
        {text:"Can reach many people online", type:"DigitalDreamer"},
        {text:"Is spread through word of mouth", type:"Connector"}
      ]
    },
    {
      q: "If you join a group business, you'd want to:",
      o:[
        {text:"Handle sales and customers", type:"Hustler"},
        {text:"Manage stock and money", type:"Planner"},
        {text:"Make the product/service", type:"Learner"},
        {text:"Manage online presence", type:"DigitalDreamer"},
        {text:"Bring in other sellers/buyers", type:"Connector"}
      ]
    },
    {
      q: "What scares you most about starting?",
      o:[
        {text:"Lack of quick buyers", type:"Hustler"},
        {text:"Chaos without a plan", type:"Planner"},
        {text:"Not having the right skill", type:"Learner"},
        {text:"No idea how to sell online", type:"DigitalDreamer"},
        {text:"No one to help me connect with buyers", type:"Connector"}
      ]
    },
    {
      q: "Your small business dream after one year is:",
      o:[
        {text:"A daily money-making stall", type:"Hustler"},
        {text:"A well-run small shop", type:"Planner"},
        {text:"Known for quality work", type:"Learner"},
        {text:"A small online storefront", type:"DigitalDreamer"},
        {text:"A list of regular customers & partners", type:"Connector"}
      ]
    },
    {
      q: "Which task would you do yourself?",
      o:[
        {text:"Negotiate prices and sell", type:"Hustler"},
        {text:"Keep accurate records", type:"Planner"},
        {text:"Fix or make the product", type:"Learner"},
        {text:"Take photos and post online", type:"DigitalDreamer"},
        {text:"Call vendors and build relationships", type:"Connector"}
      ]
    },
    {
      q: "If money is low one month, you'd:",
      o:[
        {text:"Work harder to sell more", type:"Hustler"},
        {text:"Cut costs and tighten process", type:"Planner"},
        {text:"Improve the product to charge more", type:"Learner"},
        {text:"Run promotions online", type:"DigitalDreamer"},
        {text:"Ask partners for short-term help", type:"Connector"}
      ]
    },
    {
      q: "Which would you rather focus on first?",
      o:[
        {text:"Getting customers", type:"Hustler"},
        {text:"Getting systems in place", type:"Planner"},
        {text:"Improving your craft", type:"Learner"},
        {text:"Learning simple online tools", type:"DigitalDreamer"},
        {text:"Building a network of sellers", type:"Connector"}
      ]
    },
    {
      q: "What gives you confidence?",
      o:[
        {text:"When people buy from me", type:"Hustler"},
        {text:"When processes run smoothly", type:"Planner"},
        {text:"When my work looks good", type:"Learner"},
        {text:"When posts get likes/shares", type:"DigitalDreamer"},
        {text:"When someone introduces me to a client", type:"Connector"}
      ]
    },
    {
      q: "If you could quickly learn one thing, it would be:",
      o:[
        {text:"Selling techniques", type:"Hustler"},
        {text:"Money and stock tracking", type:"Planner"},
        {text:"A craft/skill (tailoring, cooking)", type:"Learner"},
        {text:"How to set up a simple online shop", type:"DigitalDreamer"},
        {text:"How to pitch to store owners", type:"Connector"}
      ]
    },
    {
      q: "What is more satisfying to you?",
      o:[
        {text:"A day with many sales", type:"Hustler"},
        {text:"A day where everything ran well", type:"Planner"},
        {text:"A day I made something great", type:"Learner"},
        {text:"A day with many online messages/orders", type:"DigitalDreamer"},
        {text:"A day I met new helpful people", type:"Connector"}
      ]
    },
    {
      q: "After 6 months you hope to have:",
      o:[
        {text:"Daily sales and small savings", type:"Hustler"},
        {text:"A repeatable selling routine", type:"Planner"},
        {text:"Proof of quality and customer reviews", type:"Learner"},
        {text:"A small online audience and sales", type:"DigitalDreamer"},
        {text:"A few regular partners/referrers", type:"Connector"}
      ]
    },
    {
      q: "If a customer asks for something new, you:",
      o:[
        {text:"Try to upsell something else", type:"Hustler"},
        {text:"Add it to the standard process if repeatable", type:"Planner"},
        {text:"Make it carefully to keep quality", type:"Learner"},
        {text:"Share it online to attract more customers", type:"DigitalDreamer"},
        {text:"Ask other sellers if they can help deliver", type:"Connector"}
      ]
    }
  ], // end unfinished

  aspiring: [
    {
      q: `If someone gave you ${formatCurrency(5000)} to try business, which first move fits you best?`,
      o:[
        {text:"Start buying & selling to test demand", type:"Hustler"},
        {text:"Make a written 30-day plan and test", type:"Planner"},
        {text:"Spend part on learning a useful skill", type:"Learner"},
        {text:"Set up an online page to offer a service", type:"DigitalDreamer"},
        {text:"Call people who can help you sell", type:"Connector"}
      ]
    },
    {
      q: "Which benefits of business appeal to you most?",
      o:[
        {text:"Earning daily money", type:"Hustler"},
        {text:"Creating a stable income source", type:"Planner"},
        {text:"Gaining a respected skill", type:"Learner"},
        {text:"Working and selling online", type:"DigitalDreamer"},
        {text:"Working with others and referrals", type:"Connector"}
      ]
    },
    {
      q: "When you start small, you prefer to:",
      o:[
        {text:"Start selling things people need now", type:"Hustler"},
        {text:"Try a simple tested system", type:"Planner"},
        {text:"Learn then sell with skill", type:"Learner"},
        {text:"Make content/offers online", type:"DigitalDreamer"},
        {text:"Ask people to spread the word", type:"Connector"}
      ]
    },
    {
      q: "What would make you stop trying an idea?",
      o:[
        {text:"If no one buys quickly", type:"Hustler"},
        {text:"If it can't be made repeatable", type:"Planner"},
        {text:"If I can't improve the quality", type:"Learner"},
        {text:"If online traction is zero", type:"DigitalDreamer"},
        {text:"If partners are unreliable", type:"Connector"}
      ]
    },
    {
      q: "Which of these would you rather do today?",
      o:[
        {text:"Walk market and sell items", type:"Hustler"},
        {text:"Write a 7-step plan to test", type:"Planner"},
        {text:"Practice a craft for customers", type:"Learner"},
        {text:"Make a post and try to sell online", type:"DigitalDreamer"},
        {text:"Call people who could help you sell", type:"Connector"}
      ]
    },
    {
      q: "How do you react to criticism about your product?",
      o:[
        {text:"Try another selling approach", type:"Hustler"},
        {text:"Improve process to avoid that issue", type:"Planner"},
        {text:"Work on the skill to make it better", type:"Learner"},
        {text:"Change the online presentation", type:"DigitalDreamer"},
        {text:"Ask someone experienced for introductions", type:"Connector"}
      ]
    },
    {
      q: "Which monthly milestone matters most to you?",
      o:[
        {text:"First 20 sales", type:"Hustler"},
        {text:"A working system for orders", type:"Planner"},
        {text:"5 positive testimonials", type:"Learner"},
        {text:"First 100 followers or visitors", type:"DigitalDreamer"},
        {text:"3 regular partners or recurring customers", type:"Connector"}
      ]
    },
    {
      q: "When deciding a price, you consider:",
      o:[
        {text:"What people will pay now", type:"Hustler"},
        {text:"Costs + sustainable margin", type:"Planner"},
        {text:"Quality and reputation", type:"Learner"},
        {text:"Competitor prices online", type:"DigitalDreamer"},
        {text:"What partners can still sell", type:"Connector"}
      ]
    },
    {
      q: "If you must choose a marketing step it would be:",
      o:[
        {text:"Talk to customers directly", type:"Hustler"},
        {text:"Create a repeatable marketing playbook", type:"Planner"},
        {text:"Show the craft and process", type:"Learner"},
        {text:"Run simple social media posts/ads", type:"DigitalDreamer"},
        {text:"Ask partners to list or promote you", type:"Connector"}
      ]
    },
    {
      q: "What is your biggest advantage starting now?",
      o:[
        {text:"Energy & willingness to hustle", type:"Hustler"},
        {text:"Ability to plan & stick to it", type:"Planner"},
        {text:"Willingness to learn until great", type:"Learner"},
        {text:"Comfort with online tools or curiosity", type:"DigitalDreamer"},
        {text:"Friendship networks & community", type:"Connector"}
      ]
    },
    {
      q: "What would you be proud to show after 6 months?",
      o:[
        {text:"A daily-income hustle", type:"Hustler"},
        {text:"A documented, working system", type:"Planner"},
        {text:"A strong portfolio of work", type:"Learner"},
        {text:"An active online storefront/audience", type:"DigitalDreamer"},
        {text:"A network of customers & partners", type:"Connector"}
      ]
    },
    {
      q: "Which resource would you invest in first?",
      o:[
        {text:"More stock to sell", type:"Hustler"},
        {text:"A small tool to make process easier", type:"Planner"},
        {text:"A local course or teacher", type:"Learner"},
        {text:"A simple website or hosting", type:"DigitalDreamer"},
        {text:"A meetup to meet sellers and buyers", type:"Connector"}
      ]
    },
    {
      q: "When you pitch your idea, what do you emphasise?",
      o:[
        {text:"How quickly people will buy", type:"Hustler"},
        {text:"How it can be run reliably", type:"Planner"},
        {text:"The quality & craft behind it", type:"Learner"},
        {text:"The online reach and market", type:"DigitalDreamer"},
        {text:"The partners and path to customers", type:"Connector"}
      ]
    },
    {
      q: "If you had to pick one strength to use now, you pick:",
      o:[
        {text:"Talking to customers & selling", type:"Hustler"},
        {text:"Organising and planning", type:"Planner"},
        {text:"Learning and improving craft", type:"Learner"},
        {text:"Using online tools to reach people", type:"DigitalDreamer"},
        {text:"Linking people and building networks", type:"Connector"}
      ]
    }
  ] // end aspiring
}; // end questionSets

/* ---------- State ---------- */
let selectedBackground = null;
let activeQuestions = [];
let answers = []; // each element will be { type: 'Hustler'|'Planner'... , text: 'option text' }
let currentIndex = 0;
let finalArchetype = null;

/* ---------- UI Refs ---------- */
const bgWrap = el("backgroundOptions");
const startBtn = el("startQuizBtn");
const qTextEl = el("questionText");
const optionsEl = el("options");
const progressBar = el("progressBar");
const progressText = el("progressText");
const backBtn = el("backBtn");
const nextBtn = el("nextBtn");
const archetypeTitle = el("archetypeTitle");
const profileRead = el("profileRead");
const pathsWrap = el("paths");
const pathwaySelect = el("pathwaySelect");
const roadmapWrap = el("roadmap");

/* ---------- Render background buttons ---------- */
function renderBackgroundButtons(){
  if(!bgWrap) return;
  bgWrap.innerHTML = "";
  backgrounds.forEach(bg => {
    const b = document.createElement("button");
    b.className = "option";
    b.type = "button";
    b.textContent = bg.label;
    b.onclick = () => {
      selectedBackground = bg.id;
      // highlight
      bgWrap.querySelectorAll(".option").forEach(n => n.classList.remove("active"));
      b.classList.add("active");
      if(startBtn) startBtn.style.display = "inline-block";
    };
    bgWrap.appendChild(b);
  });
}
renderBackgroundButtons();

/* ---------- Quiz Controls ---------- */
function startQuiz(){
  if(!selectedBackground){ alert("Please choose your current stage first."); return; }
  activeQuestions = questionSets[selectedBackground];
  if(!activeQuestions || !activeQuestions.length){ alert("No questions available for this stage."); return; }
  answers = new Array(activeQuestions.length).fill(null);
  currentIndex = 0;
  showQuestion();
  goTo("quiz");
}

function showQuestion(){
  const q = activeQuestions[currentIndex];
  qTextEl.textContent = q.q;
  optionsEl.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = opt.text;
    btn.onclick = () => {
      answers[currentIndex] = { type: opt.type, text: opt.text };
      // update UI
      optionsEl.querySelectorAll(".option").forEach(n => n.classList.remove("active"));
      btn.classList.add("active");
      // enable next
      if(nextBtn) nextBtn.disabled = false;
    };
    // restore state if selected
    if(answers[currentIndex] && answers[currentIndex].text === opt.text) btn.classList.add("active");
    optionsEl.appendChild(btn);
  });

  // progress UI
  progressText.textContent = `Question ${currentIndex+1} of ${activeQuestions.length}`;
  const pct = Math.round(((currentIndex)/activeQuestions.length)*100);
  if(progressBar) progressBar.style.width = `${pct}%`;

  // nav buttons
  if(backBtn) backBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
  if(nextBtn) {
    nextBtn.textContent = currentIndex === activeQuestions.length - 1 ? "Finish" : "Next";
    nextBtn.disabled = answers[currentIndex] == null;
  }
}

function nextQ(){
  if(!answers[currentIndex]){ alert("Please select an option before continuing."); return; }
  if(currentIndex < activeQuestions.length - 1){
    currentIndex++;
    showQuestion();
  } else {
    finishQuiz();
  }
}

function prevQ(){
  if(currentIndex > 0){
    currentIndex--;
    showQuestion();
  }
}

/* ---------- Scoring & Results ---------- */
function finishQuiz(){
  // Count per archetype
  const counts = { Hustler:0, Planner:0, Learner:0, DigitalDreamer:0, Connector:0 };
  answers.forEach(a => { if(a && a.type) counts[a.type] = (counts[a.type]||0) + 1; });
  // choose winner by max count, tie-break deterministic order
  const order = ["Hustler","Planner","Learner","DigitalDreamer","Connector"];
  let winner = order[0], best = -1;
  order.forEach(k => {
    if(counts[k] > best){ best = counts[k]; winner = k; }
  });
  finalArchetype = winner;

  renderResults();
  goTo("results");
}

function renderResults(){
  if(!finalArchetype) return;
  const profile = archetypeProfiles[finalArchetype];
  archetypeTitle.textContent = `${profile.title}`;
  profileRead.innerHTML = `<p>${profile.desc}</p><p><strong>Background:</strong> ${backgrounds.find(b=>b.id===selectedBackground).label}</p>`;

  // populate paths & dropdown
  pathsWrap.innerHTML = "";
  pathwaySelect.innerHTML = "";
  profile.pathways.forEach((p, idx) => {
    const div = document.createElement("div");
    div.className = "path-item";
    div.textContent = `• ${p}`;
    pathsWrap.appendChild(div);

    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    if(idx === 0) opt.selected = true;
    pathwaySelect.appendChild(opt);
  });

  roadmapWrap.innerHTML = "";
}

/* ---------- Roadmap generation (per selected pathway) ---------- */
function generateRoadmap(){
  const path = pathwaySelect.value;
  if(!path){ alert("Choose a pathway first."); return; }
  const steps = roadmaps[path];
  roadmapWrap.innerHTML = `<h3>6-Month Roadmap: ${path}</h3>`;
  if(!steps || !steps.length){
    roadmapWrap.innerHTML += "<p>No roadmap available yet for this pathway.</p>";
    return;
  }
  steps.forEach((s,i) => {
    const card = document.createElement("div");
    card.className = "month";
    card.innerHTML = `<h4>Month ${i+1}</h4><p>${s}</p>`;
    roadmapWrap.appendChild(card);
  });

  // After roadmap, show suggested quick resources (simple curated list)
  const resources = getResourcesForPath(path);
  if(resources && resources.length){
    const resCard = document.createElement("div");
    resCard.className = "card";
    resCard.style.marginTop = "14px";
    const html = `<h4>Starter Resources</h4><ul>${resources.map(r => `<li>${r}</li>`).join("")}</ul>`;
    resCard.innerHTML = html;
    roadmapWrap.appendChild(resCard);
  }
}

/* ---------- Small curated resources per pathway (helpful quick links / suggestions) ---------- */
function getResourcesForPath(path){
  // lightweight suggestions (generic, no external links embedded)
  const map = {
    "Buying & Selling": [
      "Spreadsheet: simple sales & inventory tracker (start with one sheet).",
      "Learn: Basic negotiation and sourcing tips (search free marketplace tutorials).",
      "Tip: Use WhatsApp & Instagram to take orders and close sales."
    ],
    "Importation": [
      "Guide: How to evaluate suppliers; ask for samples before bulk orders.",
      `Start small: Try a ${formatCurrency(200)}–${formatCurrency(500)} test order first.`,
      "Tip: Use courier services with tracking for safe delivery."
    ],
    "Affiliate/Reseller": [
      "Checklist: Choose a niche, set up social profiles, and post 3 review videos.",
      "Tool: Use a simple link-shortener & track clicks for conversions.",
      "Tip: Focus on trust—reviews and social proof are key."
    ],
    "Local Market Hustle": [
      "Template: Simple one-page order form for bulk buyers.",
      "Tip: Good packaging and clear pricing wins repeat buyers.",
      "Idea: Try a weekend market stall to test foot-traffic."
    ],
    "Street Food / Quick Service": [
      "Checklist: Food safety basics and simple packaging tips.",
      "Tip: Start with pre-orders to manage waste and demand.",
      "Idea: Offer meal bundles for offices or student hostels."
    ],
    "Consulting / Coaching": [
      "Template: One-page service offer and client onboarding checklist.",
      "Tip: Use LinkedIn & local networks to find first clients.",
      "Learn: How to create a simple case study from a pilot."
    ],
    "Professional Services": [
      "Tool: Free invoicing templates and time tracking sheets.",
      "Tip: Deliver 10x value on your first client to secure referrals.",
      "Guide: How to set professional rates and retain clients."
    ],
    "Event Planning / Management": [
      "Template: Event package pricing and vendor checklist.",
      "Tip: Build a vendor Rolodex (caterers, decorators, MCs).",
      "Idea: Offer 1–2 discounted events to build a portfolio."
    ],
    "Accounting & Bookkeeping": [
      "Tool: Simple monthly bookkeeping spreadsheet template.",
      "Tip: Offer a free month to get initial testimonials.",
      "Learn: Basic VAT/tax rules in your country (local workshop)."
    ],
    "Project Management / Ops": [
      "Template: SOP starter template (one process per page).",
      "Tip: Start with the top 3 tasks that cause delays and document them.",
      "Tool: Use free task tools (Trello/Notion) to track operations."
    ],
    "Fashion Design & Tailoring": [
      "Tip: Start with custom orders to finance samples.",
      "Idea: Use local tailors to prototype before scaling.",
      "Tool: Create a simple lookbook PDF for marketing."
    ],
    "Hair & Beauty / Salon": [
      "Tip: Offer trial sessions to collect testimonials.",
      "Idea: Bundle services for events or parties.",
      "Tool: Simple booking sheet and pre-payment method."
    ],
    "Catering & Small Meals": [
      "Checklist: Food safety and cost-per-portion calculator.",
      "Tip: Start with pre-orders and pop-up days.",
      "Idea: Partner with offices for weekday meals."
    ],
    "Handmade Crafts & Products": [
      "Tip: Take quality photos and start on a marketplace.",
      "Idea: Offer limited edition runs to build scarcity.",
      "Tool: Basic pricing formula: cost + time + margin."
    ],
    "Technical Freelance / Specialist Services": [
      "Template: Portfolio one-pager & contract basics.",
      "Tip: Overdeliver on first jobs to get word-of-mouth.",
      "Tool: Use simple invoicing & time-tracking tools."
    ],
    "Freelancing (Design/Dev/Copy)": [
      "Tip: Create three portfolio samples focused on results.",
      "Tool: Sign up on one freelance platform & pitch daily.",
      "Learn: Effective proposals convert better than wide-reaching ones."
    ],
    "E-commerce Store": [
      "Checklist: 10 product page essentials (photos, benefits, specs).",
      "Tool: Simple shop platforms (Shopify, WooCommerce, Jumia stores).",
      "Tip: Start small, track conversions and refine product listings."
    ],
    "App / No-code Product": [
      "Tool: Use no-code builders (Bubble, Glide, Adalo) for MVPs.",
      "Tip: Validate with clickable prototypes before building features.",
      "Resource: Run interviews with at least 20 target users."
    ],
    "Content Creator Brand": [
      "Tip: Batch 10–20 pieces of content and schedule consistently.",
      "Tool: Basic editing apps on mobile for fast output.",
      "Idea: Monetize via affiliate links and small paid products first."
    ],
    "Online Tutoring / Courses": [
      "Template: Course outline and 3-lesson beta run.",
      "Tip: Offer a discounted beta to get testimonials.",
      "Tool: Host on simple platforms (Gumroad, Teachable, YouTube + Patreon)."
    ],
    "Agency / Partnerships": [
      "Tip: Build 1–2 case studies to show results to clients.",
      "Template: Partnership revenue-share agreement basics.",
      "Tool: Simple CRM sheet for partner outreach and tracking."
    ],
    "Community Hub / Marketplace": [
      "Tip: Start with a small active group and run events to add value.",
      "Template: Membership tiers and benefits list.",
      "Idea: Monetize via commissions, ads or membership fees."
    ],
    "Logistics & Delivery": [
      "Checklist: Route optimization & rider tracking basics.",
      "Tip: Offer reliable slots for businesses (morning/afternoon).",
      "Tool: Simple booking via WhatsApp + Google Sheet."
    ],
    "Import & Wholesale Distribution": [
      "Tip: Start with small batches to reduce risk.",
      "Tool: Basic invoice and inventory templates.",
      "Idea: Offer credit terms to trusted small retailers to grow demand."
    ],
    "Real Estate Linking / Referrals": [
      "Tip: Document clear referral terms and commission rates.",
      "Tool: Simple property listing sheet and contact log.",
      "Idea: Build relationships with small owners & agents to capture deals."
    ]
  };

  return map[path] || [];
}

/* ---------- Expose functions globally for HTML buttons ---------- */
window.goTo = goTo;
window.startQuiz = startQuiz;
window.nextQ = nextQ;
window.prevQ = prevQ;
window.generateRoadmap = generateRoadmap;

/* ---------- Defensive init: disable next until selection ---------- */
if(nextBtn) nextBtn.disabled = true;
if(backBtn) backBtn.style.visibility = "hidden";

/* ---------- End of script.js ---------- */