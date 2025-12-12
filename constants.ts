
import { LevelDescription, AssessmentArea, ScoringDimension, MaturityArchetype } from './types';

// ==========================================
// SCORING MATRIX CONFIGURATION
// ==========================================
export const SCORING_DIMENSIONS: ScoringDimension[] = [
  { 
    id: "d1", 
    name: "Integrated Operations", 
    weight: 0.30, 
    description: "Pit-to-Port integration, value chain visibility, and real-time operational control." 
  },
  { 
    id: "d2", 
    name: "Smart Assets", 
    weight: 0.25, 
    description: "Predictive maintenance (PdM), reliability, digital twins, and asset performance." 
  },
  { 
    id: "d3", 
    name: "Data Foundation", 
    weight: 0.20, 
    description: "IT/OT convergence, cloud architecture, data quality, and cybersecurity." 
  },
  { 
    id: "d4", 
    name: "Safety & ESG", 
    weight: 0.15, 
    description: "Digital safety, carbon tracking, circular economy, and regulatory compliance." 
  },
  { 
    id: "d5", 
    name: "Organization", 
    weight: 0.10, 
    description: "Digital culture, agile ways of working, and workforce upskilling." 
  }
];

export const MATURITY_ARCHETYPES: MaturityArchetype[] = [
  {
    minScore: 1.00,
    maxScore: 1.99,
    label: "Digital Novice",
    description: "Traditional Operator. Focus on survival and manual processes. Risk of losing competitiveness.",
    colorClass: "bg-slate-100 text-slate-600 border-slate-300"
  },
  {
    minScore: 2.00,
    maxScore: 2.99,
    label: "Digital Follower",
    description: "Functional Optimizer. Digital islands of excellence (e.g. maintenance) but lacking value chain integration.",
    colorClass: "bg-blue-100 text-blue-700 border-blue-300"
  },
  {
    minScore: 3.00,
    maxScore: 3.99,
    label: "Digital Adopter",
    description: "Connected Enterprise. Data-driven decisions and Integrated Operations Center (IOC). Industry standard.",
    colorClass: "bg-indigo-100 text-indigo-700 border-indigo-300"
  },
  {
    minScore: 4.00,
    maxScore: 4.75,
    label: "Digital Innovator",
    description: "Predictive Powerhouse. AI and prediction at scale. Automated decision processes.",
    colorClass: "bg-purple-100 text-purple-700 border-purple-300"
  },
  {
    minScore: 4.76,
    maxScore: 5.00,
    label: "Future Miner",
    description: "Autonomous & Cognitive. Zero-entry mining, self-optimizing value chain, generative AI.",
    colorClass: "bg-teal-100 text-teal-800 border-teal-300"
  }
];

// Market Research Benchmarks by Industry (d1: Ops, d2: Assets, d3: Data, d4: ESG, d5: Org)
export const INDUSTRY_DIMENSION_BENCHMARKS: Record<string, Record<string, number>> = {
  mining:         { d1: 2.8, d2: 3.4, d3: 2.2, d4: 3.8, d5: 2.1 }, // Asset heavy, ESG focus
  energy:         { d1: 3.2, d2: 3.5, d3: 2.9, d4: 3.6, d5: 2.4 }, // Grid modernization drives Ops/Data
  manufacturing:  { d1: 3.1, d2: 3.0, d3: 2.5, d4: 2.8, d5: 2.3 }, // Factory automation
  automotive:     { d1: 3.5, d2: 3.8, d3: 3.1, d4: 3.2, d5: 2.9 }, // High competition, robotics
  logistics:      { d1: 3.6, d2: 2.8, d3: 3.0, d4: 2.5, d5: 2.4 }, // Tracking is key (Ops)
  retail:         { d1: 3.2, d2: 1.8, d3: 4.1, d4: 2.9, d5: 3.3 }, // Customer data is king, assets low
  finance:        { d1: 3.9, d2: 1.5, d3: 4.5, d4: 3.5, d5: 3.6 }, // Pure digital/data players
  healthcare:     { d1: 2.4, d2: 3.1, d3: 2.6, d4: 4.0, d5: 2.2 }, // Privacy slows data, high ESG/Safety
  tech:           { d1: 4.2, d2: 2.5, d3: 4.6, d4: 3.1, d5: 4.5 }, // Leaders in Data/Org
  construction:   { d1: 2.1, d2: 2.3, d3: 1.8, d4: 2.7, d5: 1.9 }, // Laggards generally
  other:          { d1: 2.5, d2: 2.5, d3: 2.5, d4: 2.5, d5: 2.5 }  // Generic fallback
};


// ==========================================
// GENERIC CONFIGURATION (Default)
// ==========================================

const GENERIC_LEVELS: LevelDescription[] = [
  {
    level: 1,
    title: "Initial",
    subtitle: "Unpredictable and reactive",
    characteristics: [
      "Processes are ad-hoc, chaotic, and often rely on individual heroics.",
      "Data is fragmented, stored in spreadsheets or paper, with no single source of truth.",
      "Technology adoption is minimal and disconnected from strategy.",
      "No formal governance; security and compliance are afterthoughts.",
      "Decision-making is purely reactive to failures and incidents."
    ],
    symptoms: [
      "Frequent operational firefighting and unplanned downtime.",
      "Weeks spent manually compiling basic monthly reports.",
      "Key knowledge leaves when employees retire or quit.",
      "Shadow IT: Departments buy their own tools without oversight.",
      "Inability to answer simple questions like 'What is our yield?'"
    ]
  },
  {
    level: 2,
    title: "Defined",
    subtitle: "Project-based and documented",
    characteristics: [
      "Basic processes are documented and repeatable, but not standardized company-wide.",
      "Data is collected digitally but remains siloed in functional departments.",
      "Pilots and POCs (Proof of Concepts) are common but rarely scale.",
      "Basic dashboards replace some spreadsheets; IT starts to manage data.",
      "Focus is on functional optimization rather than value chain integration."
    ],
    symptoms: [
      "Departments argue over whose data is correct ('Excel wars').",
      "We have many dashboards, but they don't drive action.",
      "Digital initiatives stall after the pilot phase.",
      "Integration between systems (e.g., ERP and Operational data) is manual.",
      "Cybersecurity is basic firewalling; OT security is weak."
    ]
  },
  {
    level: 3,
    title: "Managed",
    subtitle: "Proactive and integrated",
    characteristics: [
      "Standardized processes across the enterprise; cross-functional teams collaborate.",
      "Integrated data platform (Data Lake/Warehouse) provides a single source of truth.",
      "Focus shifts from 'what happened' to 'why it happened' (diagnostics).",
      "IT and OT convergence is underway; real-time monitoring is established.",
      "Governance, security, and data quality programs are operational."
    ],
    symptoms: [
      "Operators use real-time data to adjust shifts on the fly.",
      "Management trusts the automated reports without double-checking.",
      "We can trace the impact of a delay across the entire value chain.",
      "New digital tools are adopted quickly due to standard platforms.",
      "Sustainability and ESG metrics are tracked automatically."
    ]
  },
  {
    level: 4,
    title: "Measured",
    subtitle: "Quantitatively managed",
    characteristics: [
      "Data-driven culture; decisions are backed by statistical evidence.",
      "Advanced Analytics and Machine Learning used for prediction (PdM, forecasting).",
      "Process performance is measured quantitatively; variances are detected instantly.",
      "Automation of complex workflows (RPA, unattended operations).",
      "Digital Twins used to simulate scenarios before execution."
    ],
    symptoms: [
      "The system predicts failures weeks before they occur.",
      "Supply chain automatically adjusts to predicted weather/demand.",
      "We optimize for margin and value, not just volume/throughput.",
      "Employees act as 'exception handlers' rather than manual operators.",
      "Innovations are rapidly scaled across all sites/assets."
    ]
  },
  {
    level: 5,
    title: "Optimized",
    subtitle: "Continuous improvement",
    characteristics: [
      "Self-optimizing, autonomous systems (autonomous haulage, lights-out mfg).",
      "Generative AI and cognitive computing assist strategic planning.",
      "Focus on continuous innovation and disrupting the business model.",
      "Seamless ecosystem integration with suppliers and customers.",
      "Technology is invisible; the business is agile and resilient."
    ],
    symptoms: [
      "The operation runs itself for long periods without intervention.",
      "AI suggests new revenue streams or efficiency gains autonomously.",
      "Zero-harm safety record achieved through predictive intervention.",
      "Real-time energy trading and circular economy integration.",
      "We are setting the digital benchmark for the entire industry."
    ]
  }
];

const GENERIC_AREAS: AssessmentArea[] = [
  { id: "ops_efficiency", category: "Operational Efficiency", title: "Core Operational Efficiency", description: "Optimizing the primary value chain and production processes.", requiredLevel: 3 },
  { id: "asset_mgmt", category: "Operational Efficiency", title: "Asset Management", description: "Tracking and maintaining physical or digital assets.", requiredLevel: 4 },
  { id: "supply_chain", category: "Operational Efficiency", title: "Supply Chain & Logistics", description: "Managing inventory, flow of goods, and supplier networks.", requiredLevel: 3 },
  { id: "proc_auto", category: "Operational Efficiency", title: "Process Automation", description: "Automating repetitive manual tasks (RPA).", requiredLevel: 2 },
  { id: "res_alloc", category: "Operational Efficiency", title: "Resource Allocation", description: "Data-driven workforce and budget optimization.", requiredLevel: 3 },
  { id: "quality_ctrl", category: "Operational Efficiency", title: "Quality Control", description: "Monitoring and improving product/service quality standards.", requiredLevel: 3 },
  { id: "data_fdn", category: "Data Management & Intelligence", title: "Data Integration", description: "Connecting disparate systems into a unified view.", requiredLevel: 2 },
  { id: "data_gov", category: "Data Management & Intelligence", title: "Data Governance", description: "Managing data quality, access, and security.", requiredLevel: 2 },
  { id: "adv_analytics", category: "Data Management & Intelligence", title: "Advanced Analytics / AI", description: "Using machine learning for predictive insights.", requiredLevel: 4 },
  { id: "data_lit", category: "Data Management & Intelligence", title: "Data Literacy", description: "Upskilling the workforce to read and argue with data.", requiredLevel: 3 },
  { id: "mdm", category: "Data Management & Intelligence", title: "Master Data Management", description: "Single source of truth for critical entities (Customer, Product).", requiredLevel: 3 },
  { id: "self_service", category: "Data Management & Intelligence", title: "Self-Service Analytics", description: "Empowering business users to build their own reports.", requiredLevel: 3 },
  { id: "esg_carbon", category: "ESG & Sustainability", title: "Carbon Footprint Tracking", description: "Real-time monitoring of Scope 1, 2, and 3 emissions.", requiredLevel: 4 },
  { id: "esg_social", category: "ESG & Sustainability", title: "Social Impact Metrics", description: "Tracking DEI, labor standards, and community engagement.", requiredLevel: 3 },
  { id: "esg_waste", category: "ESG & Sustainability", title: "Circular Economy & Waste", description: "Optimizing material usage and waste reduction flows.", requiredLevel: 3 },
  { id: "esg_supply", category: "ESG & Sustainability", title: "Sustainable Supply Chain", description: "Auditing and monitoring supplier sustainability performance.", requiredLevel: 3 },
  { id: "esg_reporting_auto", category: "ESG & Sustainability", title: "Automated ESG Reporting", description: "Streamlining non-financial disclosures (CSRD, ISSB).", requiredLevel: 3 },
  { id: "esg_governance", category: "ESG & Sustainability", title: "ESG Data Governance", description: "Ensuring auditability and quality of sustainability data.", requiredLevel: 2 }
];

// Definitions for missing industries (using generic as placeholder where content was missing)
const MINING_LEVELS = GENERIC_LEVELS;
const MINING_AREAS = GENERIC_AREAS;
const AUTOMOTIVE_LEVELS = GENERIC_LEVELS;
const AUTOMOTIVE_AREAS = GENERIC_AREAS;
const MANUFACTURING_LEVELS = GENERIC_LEVELS;
const MANUFACTURING_AREAS = GENERIC_AREAS;
const RETAIL_LEVELS = GENERIC_LEVELS;
const RETAIL_AREAS = GENERIC_AREAS;
const FINANCE_LEVELS = GENERIC_LEVELS;
const FINANCE_AREAS = GENERIC_AREAS;
const HEALTHCARE_LEVELS = GENERIC_LEVELS;
const HEALTHCARE_AREAS = GENERIC_AREAS;
const TECH_LEVELS = GENERIC_LEVELS;
const TECH_AREAS = GENERIC_AREAS;


// ==========================================
// NEW: ENERGY, UTILITIES & WASTE
// ==========================================
const ENERGY_LEVELS: LevelDescription[] = [
  { level: 1, title: "Analog Grid", subtitle: "Manual reads and reactive outages", characteristics: ["Manual meter reading", "Outage response via phone calls", "Scattered asset data", "Paper-based field work orders", "No real-time grid visibility"], symptoms: ["Billing based on estimates leads to complaints", "No visibility into low-voltage grid health", "Reactive maintenance only after failure", "Data trapped in proprietary SCADA silos", "High non-technical losses (theft/leakage)"] },
  { level: 2, title: "Connected", subtitle: "Smart metering (AMI) initiated", characteristics: ["Basic SCADA usage for high voltage", "AMI deployment begun (smart meters)", "Siloed OT/IT data architecture", "Digital maps (GIS) replace paper", "Basic mobile apps for workforce"], symptoms: ["Smart meter data collected but not used for ops", "Manual dispatch of field crews via radio", "Data overload from sensors without insights", "Cybersecurity is per-device, not systemic", "Spreadsheets used for asset health index"] },
  { level: 3, title: "Intelligent", subtitle: "Grid visibility and predictive ops", characteristics: ["ADMS (Advanced Distribution Mgmt) implementation", "Predictive asset health models", "Digital Field Worker with tablets", "IT/OT convergence in data lake", "Automated outage reporting"], symptoms: ["Real-time outage maps for customers", "Condition-based maintenance reduces costs", "Integration of DERs (Solar/Wind) visibility", "Single view of the grid and customer", "Automated compliance reporting"] },
  { level: 4, title: "Flexible", subtitle: "DER orchestration and optimization", characteristics: ["DERMS (Distributed Energy Resource Mgmt) usage", "Dynamic pricing models (ToU)", "AI load forecasting and balancing", "Virtual Power Plant (VPP) pilots", "Drone/Vision AI for line inspection"], symptoms: ["Grid handles two-way power flow smoothly", "Automated fault location & self-healing (FLISR)", "Proactive customer engagement on usage", "Predictive vegetation management", "Optimization of EV charging loads"] },
  { level: 5, title: "Autonomous", subtitle: "Self-healing, zero-carbon grid", characteristics: ["Autonomous grid control with AI", "P2P energy trading on blockchain", "Generative AI for grid design", "Fully automated demand response", "Carbon-neutral operations"], symptoms: ["Grid balances itself in real-time (ms)", "Fully automated energy trading markets", "AI-driven infrastructure planning", "Self-scheduling maintenance robots", "Seamless islanding microgrids"] }
];

const ENERGY_AREAS: AssessmentArea[] = [
  { id: "grid_opt", category: "Operations", title: "Grid Optimization (ADMS)", description: "Real-time monitoring and control of distribution networks.", requiredLevel: 3 },
  { id: "asset_health_energy", category: "Operations", title: "Asset Performance Mgmt", description: "Predictive maintenance for transformers and turbines.", requiredLevel: 4 },
  { id: "smart_metering", category: "Operations", title: "AMI Analytics", description: "Using smart meter data for leak/theft detection and load analysis.", requiredLevel: 3 },
  { id: "renewables_int", category: "Operations", title: "Renewables Integration", description: "Managing intermittency of Solar/Wind/Storage.", requiredLevel: 4 },
  { id: "field_force", category: "Operations", title: "Digital Field Force", description: "Mobile tools and AR for technicians.", requiredLevel: 3 },
  { id: "customer_energy", category: "Customer", title: "Energy Usage Insights", description: "Providing customers with breakdown of consumption.", requiredLevel: 3 },
  { id: "load_forecasting", category: "Intelligence", title: "AI Load Forecasting", description: "Predicting demand spikes for trading and balancing.", requiredLevel: 4 },
  { id: "digital_twin_grid", category: "Intelligence", title: "Grid Digital Twin", description: "Simulation for capacity planning and scenarios.", requiredLevel: 5 },
  { id: "waste_route", category: "Waste & Enviro", title: "Waste Route Optimization", description: "Dynamic routing based on bin sensor fill levels.", requiredLevel: 3 },
  { id: "circular_tracking", category: "Waste & Enviro", title: "Circular Material Tracking", description: "Traceability of recycled materials.", requiredLevel: 3 },
  { id: "emissions_mon", category: "ESG", title: "Real-time Emissions", description: "Direct monitoring of smokestack/effluent quality.", requiredLevel: 3 },
  { id: "reg_reporting_energy", category: "ESG", title: "Regulatory Reporting", description: "Automating FERC/EPA/NERC compliance data.", requiredLevel: 3 }
];

// ==========================================
// NEW: LOGISTICS, TRANSPORT & MARITIME
// ==========================================
const LOGISTICS_LEVELS: LevelDescription[] = [
  { level: 1, title: "Manual", subtitle: "Paper-based and phone calls", characteristics: ["Spreadsheet routing and scheduling", "No visibility once cargo leaves dock", "Reactive repairs on fleet", "Paper BOL/POD documents", "Communication via phone/email"], symptoms: ["'Where is my cargo?' calls dominate CS", "Deadhead miles unknown or high", "Billing delays due to lost paperwork", "Maintenance only when breakdown occurs", "No data on driver behavior"] },
  { level: 2, title: "Tracked", subtitle: "GPS dots on a map", characteristics: ["Basic Telematics installed", "WMS/TMS installed but siloed", "EDI integration with major partners", "Basic fuel monitoring", "Alerts for speed/harsh braking"], symptoms: ["We know where trucks are, but not why they stopped", "Too many alerts create noise", "Manual scheduling despite TMS", "Data entry duplication between systems", "Limited visibility into subcontractor fleet"] },
  { level: 3, title: "Connected", subtitle: "Integrated supply chain view", characteristics: ["Real-time ETA calculation", "Digital Freight Matching platforms", "Predictive Maintenance based on usage", "Paperless BOL/POD via mobile apps", "Control Tower visibility"], symptoms: ["Customers see real-time status links", "Automated invoicing upon delivery", "Maintenance based on mileage/engine hours", "Seamless data sharing with carriers", "Load optimization reduces empty miles"] },
  { level: 4, title: "Predictive", subtitle: "Anticipating disruption", characteristics: ["Dynamic Route Optimization (AI)", "AI Demand Sensing and planning", "Port Congestion prediction", "Automated load balancing", "Robotics in warehouses"], symptoms: ["Routes adjust to weather/traffic automatically", "Predicting port bottlenecks days ahead", "Capacity optimization before booking", "Driver fatigue predicted and managed", "Warehouse picking optimized by AI"] },
  { level: 5, title: "Autonomous", subtitle: "Self-correcting logistics network", characteristics: ["Autonomous Trucks/Vessels pilots", "Self-healing supply chain logic", "Physical Internet concepts", "Drone/Bot last mile delivery", "Blockchain for chain of custody"], symptoms: ["Warehouses run dark (no lights/humans)", "Drones/Bots handle last mile automatically", "Automated brokerage and pricing", "Supply chain re-routes without human input", "Zero-emission autonomous fleet"] }
];

const LOGISTICS_AREAS: AssessmentArea[] = [
  { id: "route_opt", category: "Operations", title: "Dynamic Routing", description: "AI-driven route planning accounting for traffic/weather.", requiredLevel: 4 },
  { id: "fleet_maint", category: "Operations", title: "Fleet Predictive Maint", description: "Avoiding breakdowns via telematics data.", requiredLevel: 3 },
  { id: "fuel_opt", category: "Operations", title: "Fuel & Energy Mgmt", description: "Monitoring driver behavior and vessel trim for efficiency.", requiredLevel: 3 },
  { id: "asset_tracking", category: "Operations", title: "Real-time Asset Tracking", description: "IoT on containers, chassis, and pallets.", requiredLevel: 2 },
  { id: "warehouse_auto", category: "Operations", title: "Warehouse Automation", description: "Robotics and AI in picking/packing.", requiredLevel: 4 },
  { id: "capacity_match", category: "Commercial", title: "Digital Freight Matching", description: "Automated brokerage and load matching.", requiredLevel: 3 },
  { id: "supply_vis", category: "Intelligence", title: "End-to-End Visibility", description: "Control tower view of inventory in motion.", requiredLevel: 3 },
  { id: "port_ops", category: "Maritime", title: "Port Call Optimization", description: "Just-in-time arrival to reduce idle time.", requiredLevel: 4 },
  { id: "crew_welfare", category: "Maritime", title: "Crew Welfare & Safety", description: "Monitoring fatigue and health onboard.", requiredLevel: 3 },
  { id: "carbon_calc", category: "ESG", title: "Scope 3 Calculation", description: "Accurate carbon accounting per shipment.", requiredLevel: 3 },
  { id: "doc_digitization", category: "Admin", title: "Document Digitization", description: "OCR/AI for Bills of Lading and Invoices.", requiredLevel: 2 },
  { id: "rate_analytics", category: "Commercial", title: "Rate Intelligence", description: "Market benchmarking for spot vs contract rates.", requiredLevel: 3 }
];

// ==========================================
// NEW: TMT (Telco, Media, Tech)
// ==========================================
const TELCO_LEVELS: LevelDescription[] = [
  { level: 1, title: "Network Centric", subtitle: "Focus on uptime, not experience", characteristics: ["Siloed OSS/BSS systems", "Batch processing of CDRs (Call Records)", "Generic mass-market marketing", "Manual network planning", "Reactive customer support"], symptoms: ["Billing errors are common", "Customer service cannot see network status", "Capacity planning is a guess", "Long lead times for new services", "No single view of the customer"] },
  { level: 2, title: "Data Aware", subtitle: "Basic BI and Reporting", characteristics: ["Data Warehouse established", "Basic Churn reporting (historical)", "Digital channels (App/Web) exist", "Automated provisioning basics", "Segmented marketing campaigns"], symptoms: ["Reports are retrospective (last month)", "Marketing uses basic demographic segmentation", "Network data separated from Customer data", "Digital channels have limited functionality", "Root cause analysis is slow"] },
  { level: 3, title: "Customer Centric", subtitle: "Unified view and real-time ops", characteristics: ["360 Customer View implemented", "Real-time network monitoring", "Personalized Next Best Action/Offer", "Omnichannel consistency", "API-first architecture"], symptoms: ["Call center sees dropped calls in real-time", "Proactive retention offers before churn", "Automated provisioning of simple services", "Consistent experience App vs Store", "Partner ecosystem integration"] },
  { level: 4, title: "AI Driven", subtitle: "Predictive networks and content", characteristics: ["Self-Optimizing Networks (SON)", "AI Content Recommendation engines", "Predictive Churn models", "Zero-touch provisioning", "Hyper-personalization"], symptoms: ["Network heals itself before outage affects users", "Hyper-personalization of content/ads", "Zero-touch partnering and onboarding", "Predictive maintenance on towers/fiber", "Dynamic pricing based on demand"] },
  { level: 5, title: "Cognitive", subtitle: "Network as a Service platform", characteristics: ["Autonomous Network (Level 5)", "Generative AI Content creation", "Edge AI monetization", "Network Slicing on demand", "Cognitive Customer Care"], symptoms: ["Network slices created on-demand by AI", "Fully automated creative asset generation", "Predictive lifestyle services", "Bot-to-bot commerce support", "Self-driving network operations"] }
];

const TELCO_AREAS: AssessmentArea[] = [
  { id: "churn_red", category: "Growth", title: "Churn Prediction", description: "AI models to identify at-risk subscribers.", requiredLevel: 3 },
  { id: "network_opt", category: "Operations", title: "Network Optimization", description: "AI for capacity planning and traffic routing.", requiredLevel: 4 },
  { id: "cust_exp_telco", category: "Growth", title: "Customer Experience (CX)", description: "Connecting network quality to NPS/Sentiment.", requiredLevel: 3 },
  { id: "monetization_5g", category: "Growth", title: "5G Monetization", description: "Data products for B2B and Edge use cases.", requiredLevel: 4 },
  { id: "content_rec", category: "Media", title: "Content Recommendation", description: "Personalized viewing/listening algorithms.", requiredLevel: 3 },
  { id: "ad_tech", category: "Media", title: "AdTech Optimization", description: "Targeted advertising and yield management.", requiredLevel: 3 },
  { id: "fraud_telco", category: "Risk", title: "Fraud & Revenue Assurance", description: "Detecting SIM box and interconnect fraud.", requiredLevel: 3 },
  { id: "infra_mgmt", category: "Operations", title: "Tower/Fiber Asset Mgmt", description: "Digital twins of physical infrastructure.", requiredLevel: 3 },
  { id: "field_service_telco", category: "Operations", title: "Smart Field Service", description: "Optimizing rollouts and repairs.", requiredLevel: 3 },
  { id: "data_privacy_telco", category: "Risk", title: "Privacy & Consent", description: "Managing GDPR/CCPA for user data.", requiredLevel: 2 },
  { id: "audience_seg", category: "Media", title: "Audience Segmentation", description: "Granular behavioral clustering.", requiredLevel: 3 },
  { id: "content_gen", category: "Media", title: "GenAI Content Creation", description: "Assisting creative workflows with AI.", requiredLevel: 4 }
];

// ==========================================
// NEW: BUILT ENVIRONMENT (Construction, Real Estate)
// ==========================================
const CONSTRUCTION_LEVELS: LevelDescription[] = [
  { level: 1, title: "Paper & Drawings", subtitle: "Rolls of blueprints and Excel", characteristics: ["Paper daily logs and timesheets", "Siloed estimation/accounting software", "No field connectivity (offline)", "2D CAD drawings only", "Manual progress tracking"], symptoms: ["Rework due to outdated plans on site", "Budget overruns surprised at end of project", "Manual payroll entry errors", "Estimates based on gut feel, not data", "Safety incidents reported late"] },
  { level: 2, title: "Digitized", subtitle: "PDFs and Basic ERP", characteristics: ["Digital plans (PDF) on tablets", "Basic Project Mgmt software (cloud)", "Drone photos for site survey", "3D Modeling (basic BIM)", "Digital safety forms"], symptoms: ["Tablets on site but sync issues", "Data locked in proprietary file formats", "Safety data collected but not analyzed", "RFIs tracked digitally but slow", "Accounting disconnected from field ops"] },
  { level: 3, title: "BIM Connected", subtitle: "Building Information Modeling", characteristics: ["BIM Level 2 (Collaborative)", "Common Data Environment (CDE)", "Integrated Financials & Field Data", "IoT sensors for concrete/environment", "Real-time labor tracking"], symptoms: ["3D models used for clash coordination", "Real-time field reporting dashboard", "Supply chain visibility for materials", "Accurate daily cost tracking", "Digital twin handover to owners"] },
  { level: 4, title: "Integrated", subtitle: "Predictive project delivery", characteristics: ["4D/5D BIM (Time/Cost integration)", "Predictive Safety AI (Vision)", "Smart Building IoT integration", "AI-driven scheduling", "Automated progress via Computer Vision"], symptoms: ["Schedule delays predicted by AI", "Automated progress tracking via 360 cams", "Energy optimization in building ops", "Proactive safety alerts", "Generative design options"] },
  { level: 5, title: "Industrialized", subtitle: "Digital Twin and Prefabrication", characteristics: ["Full Lifecycle Digital Twin", "Robotic Construction / 3D Printing", "Generative Design at scale", "Modular/Prefab manufacturing data", "Autonomous site machinery"], symptoms: ["Factory-style modular construction", "Buildings optimize their own energy use", "Autonomous site machinery (excavators)", "Design-to-fabrication automation", "Carbon-neutral construction lifecycle"] }
];

const CONSTRUCTION_AREAS: AssessmentArea[] = [
  { id: "bim_adoption", category: "Operations", title: "BIM Maturity", description: "Moving from 3D modeling to data-rich information models.", requiredLevel: 3 },
  { id: "project_controls", category: "Operations", title: "Project Controls", description: "Integrated cost, schedule, and risk data.", requiredLevel: 3 },
  { id: "safety_ai", category: "Risk", title: "Predictive Safety", description: "Using NLP and Vision to prevent accidents.", requiredLevel: 4 },
  { id: "supply_chain_con", category: "Operations", title: "Material Supply Chain", description: "Tracking JIT delivery of materials to site.", requiredLevel: 3 },
  { id: "smart_building", category: "Real Estate", title: "Smart Building IoT", description: "Tenant experience and energy optimization.", requiredLevel: 3 },
  { id: "portfolio_analytics", category: "Real Estate", title: "Portfolio Analytics", description: "Valuation and utilization metrics across assets.", requiredLevel: 3 },
  { id: "labor_prod", category: "Operations", title: "Labor Productivity", description: "Tracking installer efficiency and bottlenecks.", requiredLevel: 3 },
  { id: "bid_intelligence", category: "Growth", title: "Bid Intelligence", description: "Data-driven estimating and win-probablity.", requiredLevel: 3 },
  { id: "carbon_embodied", category: "ESG", title: "Embodied Carbon", description: "Calculating CO2 of concrete/steel choices.", requiredLevel: 3 },
  { id: "lease_admin", category: "Real Estate", title: "Lease Administration", description: "Automated abstraction and critical date alerts.", requiredLevel: 2 },
  { id: "facility_mgmt", category: "Real Estate", title: "Predictive FM", description: "Maintenance based on usage not calendar.", requiredLevel: 3 },
  { id: "gen_design", category: "Design", title: "Generative Design", description: "AI-optimized spatial planning.", requiredLevel: 5 }
];

// ==========================================
// NEW: PUBLIC SECTOR & EDUCATION
// ==========================================
const PUBLIC_LEVELS: LevelDescription[] = [
  { level: 1, title: "Bureaucratic", subtitle: "Paper forms and long lines", characteristics: ["Physical files and paper forms", "Departmental data silos", "Yearly lagging reports", "In-person service delivery", "Legacy mainframe systems"], symptoms: ["Citizens must visit offices for basic tasks", "Data re-entry across agencies", "Decisions based on politics not data", "Backlogs in case processing", "No sharing of critical information"] },
  { level: 2, title: "E-Gov", subtitle: "Forms are online but backend is manual", characteristics: ["Web portals for PDFs", "Digitized records (scanned)", "Basic open data initiatives", "Email-based workflows", "Ad-hoc data sharing"], symptoms: ["PDF forms instead of paper (still manual)", "Email is the integration layer", "Cybersecurity vulnerability", "Website is just a brochure", "Limited cross-agency collaboration"] },
  { level: 3, title: "Connected", subtitle: "Integrated services and 'Single Window'", characteristics: ["'Once-only' principle implemented", "Inter-agency data sharing bus", "Citizen 360 view", "Real-time operational dashboards", "Cloud adoption"], symptoms: ["Services anticipate life events (birth, move)", "Real-time operational awareness", "Standardized identity management (Digital ID)", "Mobile-first citizen services", "Automated simple approvals"] },
  { level: 4, title: "Insight Driven", subtitle: "Policy based on evidence", characteristics: ["Predictive policing/risk models", "Personalized learning paths", "Fraud detection AI", "Smart City IoT platform", "Automated benefits adjudication"], symptoms: ["Resources allocated by predictive risk", "Student dropout intervention early", "Automated benefits payments", "Traffic flows optimized by data", "Evidence-based policy making"] },
  { level: 5, title: "Smart", subtitle: "Proactive and invisible government", characteristics: ["Smart City Ecosystem integration", "AI Policy Simulation", "Personalized Medicine/Education", "Proactive service delivery", "Blockchain identity/voting"], symptoms: ["Traffic lights optimize for emergency vehicles", "Curriculum adapts to student real-time", "Proactive healthcare interventions", "Invisible background compliance", "Real-time pulse of the citizen"] }
];

const PUBLIC_AREAS: AssessmentArea[] = [
  { id: "citizen_exp", category: "Service", title: "Citizen Experience (CX)", description: "Seamless digital journey across agencies.", requiredLevel: 3 },
  { id: "data_sharing", category: "Foundations", title: "Inter-Agency Sharing", description: "Legal and technical framework to share data.", requiredLevel: 3 },
  { id: "fraud_waste", category: "Finance", title: "Fraud, Waste & Abuse", description: "Detecting improper payments in tax/benefits.", requiredLevel: 3 },
  { id: "smart_city", category: "Infrastructure", title: "Smart City Ops", description: "IoT for traffic, lights, and utilities.", requiredLevel: 3 },
  { id: "public_safety", category: "Safety", title: "Public Safety Analytics", description: "Crime analysis and emergency response optimization.", requiredLevel: 3 },
  { id: "student_success", category: "Education", title: "Student Success", description: "Predicting dropout risk and personalization.", requiredLevel: 3 },
  { id: "enrollment_mgmt", category: "Education", title: "Enrollment Mgmt", description: "Forecasting and optimizing admissions.", requiredLevel: 3 },
  { id: "learning_analytics", category: "Education", title: "Learning Analytics", description: "LMS data to improve curriculum.", requiredLevel: 3 },
  { id: "defense_logistics", category: "Defense", title: "Defense Logistics", description: "Readiness based maintenance and supply.", requiredLevel: 3 },
  { id: "threat_intel", category: "Defense", title: "Threat Intelligence", description: "Aggregating signals for situational awareness.", requiredLevel: 4 },
  { id: "policy_impact", category: "Strategy", title: "Policy Impact Analysis", description: "Measuring outcomes of social programs.", requiredLevel: 3 },
  { id: "open_data", category: "Foundations", title: "Open Data", description: "Publishing datasets for transparency and innovation.", requiredLevel: 2 }
];

// ==========================================
// NEW: SERVICES (Hospitality, Professional, Legal)
// ==========================================
const SERVICES_LEVELS: LevelDescription[] = [
  { level: 1, title: "Transactional", subtitle: "Booking and Billing focus", characteristics: ["PMS/ERP focus on transactions", "Time & Material billing (manual)", "Siloed CRM / Guest profiles", "Paper contracts and files", "Reactive staffing"], symptoms: ["Guest/Client history fragmented", "Revenue management is manual/gut feel", "Staffing based on fixed shifts, not demand", "Lost billable hours", "No personalization"] },
  { level: 2, title: "Reporting", subtitle: "Understanding what happened", characteristics: ["Central Reservations / Practice Mgmt", "Basic utilization reporting", "Digital timesheets", "Email marketing blasts", "Basic expense automation"], symptoms: ["Weekly reports on occupancy/utilization", "Manual expense processing reduced", "Marketing is generic email blasts", "Client portals for basic docs", "Data cleaned manually for reports"] },
  { level: 3, title: "Personalized", subtitle: "Knowing the guest/client", characteristics: ["Single Guest/Client View (CDP)", "Dynamic Pricing algorithms", "Resource Management / Scheduling", "Knowledge Management search", "Mobile check-in/out"], symptoms: ["Check-in tailored to preferences", "Staffing aligns with demand forecast", "Client profitability known per project", "Loyalty program data integration", "Automated contract generation"] },
  { level: 4, title: "Predictive", subtitle: "Anticipating needs", characteristics: ["AI Revenue Management", "Predictive Legal/Case outcome", "Talent retention AI", "Sentiment analysis on feedback", "Robotic Process Automation (RPA)"], symptoms: ["Price changes automatically with demand", "Predicting case outcomes/costs", "Proactive service recovery", "Automated audit/compliance checks", "Churn prediction for clients"] },
  { level: 5, title: "Experiential", subtitle: "Frictionless and bespoke", characteristics: ["Biometric recognition / Invisible payments", "Generative AI Knowledge drafting", "DAO / Smart Contract structures", "Hyper-local / Hyper-personal", "Emotion AI"], symptoms: ["Invisible check-in/out (Uber-like)", "AI drafts complex legal contracts", "Hyper-local unique experiences", "Service robots for basic tasks", "Predictive lifestyle concierge"] }
];

const SERVICES_AREAS: AssessmentArea[] = [
  { id: "rev_mgmt", category: "Growth", title: "Revenue Management", description: "Dynamic pricing and yield optimization.", requiredLevel: 3 },
  { id: "cust_360_svc", category: "Growth", title: "Guest/Client 360", description: "Unified profile of preferences and history.", requiredLevel: 3 },
  { id: "labor_opt", category: "Operations", title: "Labor Optimization", description: "Scheduling staff based on demand forecast.", requiredLevel: 3 },
  { id: "loyalty_analytics", category: "Growth", title: "Loyalty Analytics", description: "Maximizing lifetime value of members.", requiredLevel: 3 },
  { id: "legal_analytics", category: "Legal", title: "Legal Analytics", description: "Mining case law and contracts for insights.", requiredLevel: 3 },
  { id: "utilization", category: "Professional", title: "Resource Utilization", description: "Matching skills to billable projects.", requiredLevel: 3 },
  { id: "knowledge_mgmt", category: "Professional", title: "Knowledge Mgmt", description: "Searchability of internal IP and precedents.", requiredLevel: 3 },
  { id: "food_waste_hosp", category: "ESG", title: "Food Waste (Kitchen)", description: "Tracking and reducing kitchen waste.", requiredLevel: 3 },
  { id: "energy_hosp", category: "ESG", title: "Energy Management", description: "Smart room controls based on occupancy.", requiredLevel: 3 },
  { id: "contract_ai", category: "Legal", title: "Contract AI", description: "Automated review and risk extraction.", requiredLevel: 4 },
  { id: "donor_analytics", category: "Non-Profit", title: "Donor Analytics", description: "Propensity to give and retention.", requiredLevel: 3 },
  { id: "program_efficacy", category: "Non-Profit", title: "Program Efficacy", description: "Measuring real-world impact of funds.", requiredLevel: 3 }
];

// ==========================================
// NEW: PROCESS & BIO (Pharma, Chemical, Agri, FMCG)
// ==========================================
const PROCESS_LEVELS: LevelDescription[] = [
  { level: 1, title: "Lab & Batch", subtitle: "Paper notebooks and silos", characteristics: ["Paper batch records and logbooks", "R&D disconnected from Mfg", "Field data manual (clipboard)", "Siloed LIMS/ERP", "Quality checks manual"], symptoms: ["Data trapped in paper LIMS/ELN", "No yield visibility until batch ends", "Recall traceability is slow (days)", "Manual planting/harvesting decisions", "Compliance is a heavy manual burden"] },
  { level: 2, title: "Compliant", subtitle: "Digital records for regulators", characteristics: ["Electronic Batch Records (EBR)", "ERP integration basic", "Basic farm/plant IoT sensors", "Compliance reporting digitized", "Demand planning spreadsheets"], symptoms: ["Data collected for compliance, not optimization", "Siloed supply chain data", "Manual demand planning adjustments", "Traceability improved but not real-time", "Sensor data stored but not analyzed"] },
  { level: 3, title: "Integrated", subtitle: "End-to-End Visibility", characteristics: ["Real-time release testing", "Supply Chain Control Tower", "Precision Agriculture (VRA)", "Integrated PLM (Product Lifecycle)", "Clinical trial data aggregation"], symptoms: ["Yield optimization across sites", "Farm-to-fork traceability", "Clinical trial adaptive designs", "OEE monitoring in real-time", "Integrated business planning (IBP)"] },
  { level: 4, title: "Predictive", subtitle: "In-silico and AI-driven", characteristics: ["AI Drug Discovery / Mol. Modeling", "Predictive Maintenance of plant", "Demand Sensing / AI Forecasting", "Digital Twin of process/patient", "Remote patient monitoring"], symptoms: ["Simulating molecules before testing", "Yield prediction based on weather/soil", "Predicting equipment failure", "Personalized marketing at scale", "Automated quality release"] },
  { level: 5, title: "Autonomous", subtitle: "Self-optimizing ecosystems", characteristics: ["Autonomous Labs / Closed-loop", "Personalized Nutrition/Medicine", "Regenerative AI Agriculture", "Self-adjusting process parameters", "Ecosystem data sharing"], symptoms: ["Closed-loop autonomous manufacturing", "Treatments tailored to genome", "Ecosystem-aware farming robots", "AI-driven formulation", "Zero-waste circular loops"] }
];

const PROCESS_AREAS: AssessmentArea[] = [
  { id: "rd_efficiency", category: "R&D", title: "R&D Efficiency", description: "Data sharing and analytics in discovery.", requiredLevel: 3 },
  { id: "clinical_trials", category: "R&D", title: "Clinical Trial Analytics", description: "Patient selection and monitoring.", requiredLevel: 3 },
  { id: "batch_opt", category: "Manufacturing", title: "Batch Yield Optimization", description: "Golden batch analysis for chemicals/pharma.", requiredLevel: 3 },
  { id: "reg_compliance", category: "Risk", title: "Regulatory Compliance", description: "Automated FDA/EMA/EPA reporting.", requiredLevel: 3 },
  { id: "traceability", category: "Supply Chain", title: "Serialization & Trace", description: "Track and trace for anti-counterfeit/safety.", requiredLevel: 3 },
  { id: "trade_promo", category: "Commercial", title: "Trade Promo Opt (TPM)", description: "ROI of retail promotions (FMCG).", requiredLevel: 3 },
  { id: "shelf_analytics", category: "Commercial", title: "Shelf Analytics", description: "Image recognition for stock availability.", requiredLevel: 3 },
  { id: "ag_yield", category: "Agriculture", title: "Yield Analytics", description: "Soil, weather, and seed data integration.", requiredLevel: 3 },
  { id: "precision_ag", category: "Agriculture", title: "Precision Farming", description: "Variable rate application of inputs.", requiredLevel: 3 },
  { id: "claims_auto", category: "Insurance", title: "Claims Automation", description: "Straight-through processing of simple claims.", requiredLevel: 3 },
  { id: "risk_modeling_ins", category: "Insurance", title: "Risk Modeling", description: "Hyper-granular pricing models.", requiredLevel: 4 },
  { id: "underwriting", category: "Insurance", title: "Underwriting Workbench", description: "Data augmentation for risk assessment.", requiredLevel: 3 }
];

// ==========================================
// EXPORTS & HELPERS
// ==========================================

export const TIMELINE_OPTIONS = [
  { months: 6, label: "Accelerated", desc: "For urgent turnarounds. High intensity." },
  { months: 12, label: "Standard", desc: "Balanced pace. Most common choice." },
  { months: 24, label: "Strategic", desc: "Deep transformation. Lower risk." }
];

export interface IndustryConfig {
  levels: LevelDescription[];
  areas: AssessmentArea[];
}

export function getAssessmentConfig(industry: string): IndustryConfig {
  switch (industry) {
    case 'energy':
    case 'waste':
      return { levels: ENERGY_LEVELS, areas: ENERGY_AREAS };
    case 'logistics':
    case 'maritime':
      return { levels: LOGISTICS_LEVELS, areas: LOGISTICS_AREAS };
    case 'telco':
    case 'media':
      return { levels: TELCO_LEVELS, areas: TELCO_AREAS };
    case 'construction':
      return { levels: CONSTRUCTION_LEVELS, areas: CONSTRUCTION_AREAS };
    case 'government':
    case 'education':
    case 'defense':
      return { levels: PUBLIC_LEVELS, areas: PUBLIC_AREAS };
    case 'hospitality':
    case 'professional':
    case 'legal':
    case 'nonprofit':
      return { levels: SERVICES_LEVELS, areas: SERVICES_AREAS };
    case 'pharma':
    case 'chemical':
    case 'agri':
    case 'fmcg':
    case 'insurance':
      return { levels: PROCESS_LEVELS, areas: PROCESS_AREAS };
    case 'mining':
      return { levels: MINING_LEVELS, areas: MINING_AREAS };
    case 'automotive':
      return { levels: AUTOMOTIVE_LEVELS, areas: AUTOMOTIVE_AREAS };
    case 'manufacturing':
      return { levels: MANUFACTURING_LEVELS, areas: MANUFACTURING_AREAS };
    case 'retail':
      return { levels: RETAIL_LEVELS, areas: RETAIL_AREAS };
    case 'finance':
      return { levels: FINANCE_LEVELS, areas: FINANCE_AREAS };
    case 'healthcare':
      return { levels: HEALTHCARE_LEVELS, areas: HEALTHCARE_AREAS };
    case 'tech':
      return { levels: TECH_LEVELS, areas: TECH_AREAS };
    default:
      return { levels: GENERIC_LEVELS, areas: GENERIC_AREAS };
  }
}
