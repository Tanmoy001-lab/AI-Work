// ============================================================
//  JanSahayak AI — Real Government Schemes Database
//  Source: myscheme.gov.in | india.gov.in | official portals
//  Last Updated: May 2025
//  Total Schemes: 80+
// ============================================================

export const SCHEME_CATEGORIES = [
  { id: "agriculture", label: "Agriculture & Farming", labelHindi: "कृषि और खेती", icon: "🌾" },
  { id: "education", label: "Education & Scholarship", labelHindi: "शिक्षा और छात्रवृत्ति", icon: "📚" },
  { id: "health", label: "Health & Medical", labelHindi: "स्वास्थ्य और चिकित्सा", icon: "🏥" },
  { id: "housing", label: "Housing & Shelter", labelHindi: "आवास और आश्रय", icon: "🏠" },
  { id: "employment", label: "Employment & Skill", labelHindi: "रोजगार और कौशल", icon: "💼" },
  { id: "women", label: "Women & Child", labelHindi: "महिला और बाल", icon: "👩" },
  { id: "social", label: "Social Welfare", labelHindi: "सामाजिक कल्याण", icon: "🤝" },
  { id: "finance", label: "Finance & Banking", labelHindi: "वित्त और बैंकिंग", icon: "🏦" },
  { id: "youth", label: "Youth & Sports", labelHindi: "युवा और खेल", icon: "🏃" },
  { id: "digital", label: "Digital & Technology", labelHindi: "डिजिटल और तकनीक", icon: "💻" },
  { id: "disability", label: "Disability Welfare", labelHindi: "दिव्यांग कल्याण", icon: "♿" },
  { id: "minority", label: "Minority Welfare", labelHindi: "अल्पसंख्यक कल्याण", icon: "🕌" },
];

export const schemes = [

  // ─── AGRICULTURE ───────────────────────────────────────────

  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    nameHindi: "पीएम किसान सम्मान निधि",
    category: "agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    state: "central",
    targetGroup: ["farmers"],
    description: "Provides income support of ₹6,000 per year to all landholding farmer families across India, paid in three equal installments of ₹2,000 directly to their bank accounts.",
    descriptionHindi: "सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की आय सहायता तीन समान किस्तों में सीधे बैंक खातों में दी जाती है।",
    benefitAmount: "₹6,000/year (₹2,000 per installment)",
    eligibility: [
      "Must be a landholding farmer family",
      "Land records must be in the farmer's name",
      "Aadhaar card is mandatory",
      "Should have a valid bank account",
      "Institutional landholders NOT eligible",
      "Government employees NOT eligible",
      "Income tax payers NOT eligible",
      "Retired pensioners NOT eligible (if pension > ₹10,000/month)"
    ],
    benefits: [
      "₹2,000 every 4 months (3 installments/year)",
      "Direct Bank Transfer (DBT) to bank account",
      "No middlemen — money goes directly to farmer",
      "Total ₹6,000 per year"
    ],
    documents: [
      "Aadhaar Card (mandatory)",
      "Bank account passbook (account number + IFSC)",
      "Land ownership documents / Khatauni",
      "Mobile number linked to Aadhaar"
    ],
    applicationProcess: [
      "Go to pmkisan.gov.in",
      "Click on 'New Farmer Registration'",
      "Enter Aadhaar Number and Mobile Number",
      "Fill personal and land details",
      "Upload required documents",
      "Submit application",
      "Village Patwari will verify land records",
      "After approval, installments start automatically"
    ],
    officialUrl: "https://pmkisan.gov.in",
    applyUrl: "https://pmkisan.gov.in/RegistrationForm.aspx",
    statusCheckUrl: "https://pmkisan.gov.in/BeneficiaryStatus.aspx",
    helpline: "155261 / 1800-115-526",
    isActive: true,
    tags: ["farmer", "kisan", "income support", "agriculture", "DBT", "₹6000"]
  },

  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    nameHindi: "प्रधानमंत्री फसल बीमा योजना",
    category: "agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    state: "central",
    targetGroup: ["farmers"],
    description: "Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities, pests, and diseases. Premium is highly subsidized by government.",
    benefitAmount: "Full sum insured based on crop area and type",
    eligibility: [
      "All farmers (loanee and non-loanee)",
      "Both land-owning and tenant farmers eligible",
      "Cultivating notified crops in the notified area",
      "Aadhaar mandatory for non-loanee farmers"
    ],
    benefits: [
      "Crop loss compensation for natural calamities",
      "Coverage for drought, flood, cyclone, hailstorm",
      "Post-harvest losses covered",
      "Very low premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops"
    ],
    documents: [
      "Aadhaar Card",
      "Bank passbook",
      "Land records / Khasra Khatauni",
      "Sowing certificate from Patwari",
      "Mobile number"
    ],
    applicationProcess: [
      "Visit nearest Bank / PACS / CSC centre",
      "Or apply at pmfby.gov.in",
      "Fill application form before cut-off date",
      "Pay nominal premium amount",
      "Get insurance policy certificate",
      "In case of crop loss: Report to bank or insurance company within 72 hours"
    ],
    officialUrl: "https://pmfby.gov.in",
    applyUrl: "https://pmfby.gov.in",
    helpline: "1800-200-7710",
    isActive: true,
    tags: ["crop insurance", "fasal bima", "farmer", "natural calamity", "agriculture"]
  },

  {
    id: "kcc",
    name: "Kisan Credit Card (KCC)",
    nameHindi: "किसान क्रेडिट कार्ड",
    category: "agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    state: "central",
    targetGroup: ["farmers"],
    description: "Provides farmers with affordable credit for their agricultural operations, allied activities, and non-farm short-term credit requirements.",
    benefitAmount: "Credit limit based on land holdings and crops",
    eligibility: [
      "Farmers — individual/joint borrowers who are owner-cultivators",
      "Tenant farmers, oral lessees and sharecroppers",
      "Self Help Groups (SHGs) / Joint Liability Groups (JLGs)",
      "Fishermen and animal husbandry farmers also eligible",
      "Minimum age: 18 years | Maximum: 75 years"
    ],
    benefits: [
      "Credit up to ₹3 lakh at 7% interest rate",
      "Interest subvention of 3% — effective rate only 4%",
      "Flexible repayment as per harvest and marketing period",
      "ATM card for quick withdrawals",
      "Personal accident insurance cover of ₹50,000"
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "2 passport size photographs",
      "Land documents (Khatauni/Khasra)",
      "Bank account details"
    ],
    applicationProcess: [
      "Visit nearest bank branch (SBI, PNB, cooperative bank, RRB)",
      "Or visit CSC / PM Kisan portal",
      "Request KCC application form",
      "Fill form with crop details and land details",
      "Submit with required documents",
      "Bank will verify and process",
      "KCC issued within 14 working days"
    ],
    officialUrl: "https://pmkisan.gov.in/kcc.aspx",
    applyUrl: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/credit/kisan-credit-card",
    helpline: "1800-11-0001",
    isActive: true,
    tags: ["kisan credit card", "farmer loan", "agriculture credit", "KCC", "farming"]
  },

  {
    id: "pm-kusum",
    name: "PM-KUSUM (Kisan Urja Suraksha Utthan Mahabhiyan)",
    nameHindi: "पीएम-कुसुम योजना",
    category: "agriculture",
    ministry: "Ministry of New & Renewable Energy",
    state: "central",
    targetGroup: ["farmers"],
    description: "Provides solar-powered irrigation pumps to farmers and enables farmers to earn extra income by selling surplus solar power to DISCOMs.",
    benefitAmount: "40% subsidy on solar pump + state subsidy up to 30%",
    eligibility: [
      "Any farmer with agricultural land",
      "Must have existing grid-connected pump or borewells",
      "Land should be suitable for solar pump installation"
    ],
    benefits: [
      "Solar pump installation with 40% central subsidy",
      "State governments provide additional 30% subsidy",
      "Farmer pays only 30% of cost",
      "Sell surplus electricity to grid and earn income",
      "Free electricity for irrigation"
    ],
    documents: [
      "Aadhaar Card",
      "Land documents",
      "Bank passbook",
      "Electricity bill (if existing pump)",
      "Passport size photo"
    ],
    applicationProcess: [
      "Contact your state agriculture/energy department",
      "Apply at state DISCOM or Renewable Energy Department",
      "Or visit mnre.gov.in for state-wise portal links",
      "Fill application with land and pump details",
      "Pay 10% advance if applicable",
      "Installation done by empanelled vendor"
    ],
    officialUrl: "https://mnre.gov.in/solar/schemes/",
    applyUrl: "https://mnre.gov.in",
    helpline: "1800-180-3333",
    isActive: true,
    tags: ["solar pump", "kusum", "farmer", "renewable energy", "irrigation", "electricity"]
  },

  // ─── EDUCATION & SCHOLARSHIP ────────────────────────────────

  {
    id: "nsp-post-matric",
    name: "National Scholarship Portal — Post Matric Scholarship (SC/ST/OBC)",
    nameHindi: "राष्ट्रीय छात्रवृत्ति पोर्टल — पोस्ट मैट्रिक छात्रवृत्ति",
    category: "education",
    ministry: "Ministry of Social Justice / Tribal Affairs",
    state: "central",
    targetGroup: ["students", "SC", "ST", "OBC"],
    description: "Post-Matric scholarship for SC, ST, and OBC students studying at Class 11 and above levels to support their education expenses.",
    benefitAmount: "₹1,200 to ₹12,000 per year (varies by course and category)",
    eligibility: [
      "SC/ST/OBC student studying in Class 11, 12, Graduation, Post-Graduation",
      "Annual family income below ₹2.5 lakh (SC/ST) or ₹1 lakh (OBC)",
      "Must be studying in a recognized institution",
      "Must not be availing any other scholarship",
      "Aadhaar mandatory"
    ],
    benefits: [
      "Maintenance allowance for studies",
      "Tuition fees reimbursement",
      "Book allowance",
      "Study tour charges",
      "Thesis typing/printing charges (PG level)"
    ],
    documents: [
      "Aadhaar Card",
      "Caste certificate (SC/ST/OBC)",
      "Income certificate of parents/guardian",
      "Bank account details (student's own account)",
      "Previous class marksheet",
      "Current year admission receipt/bonafide certificate",
      "Passport size photograph"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in (National Scholarship Portal)",
      "Click 'New Registration'",
      "Fill personal and educational details",
      "Upload all required documents",
      "Submit before deadline (usually October-November)",
      "Institute verifies and forwards to district",
      "District verifies and scholarship released"
    ],
    officialUrl: "https://scholarships.gov.in",
    applyUrl: "https://scholarships.gov.in/fresh/loginPage",
    statusCheckUrl: "https://scholarships.gov.in/search/checkStatus",
    helpline: "0120-6619540",
    isActive: true,
    tags: ["scholarship", "SC ST OBC", "post matric", "NSP", "education", "student"]
  },

  {
    id: "nsp-pre-matric",
    name: "NSP Pre-Matric Scholarship for SC/ST Students",
    nameHindi: "एससी/एसटी छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति",
    category: "education",
    ministry: "Ministry of Social Justice & Empowerment",
    state: "central",
    targetGroup: ["students", "SC", "ST"],
    description: "Scholarship for SC/ST students studying in Class 9 and 10 to prevent dropout and ensure continuation of education.",
    benefitAmount: "₹150/month (day scholars) to ₹750/month (hostellers)",
    eligibility: [
      "SC or ST student in Class 9 or 10",
      "Annual family income below ₹2 lakh",
      "Studying in a government or recognized private school",
      "At least 55% attendance in previous class"
    ],
    benefits: [
      "Monthly maintenance allowance",
      "Ad-hoc grant for books and stationery",
      "Day scholar: ₹150/month | Hosteller: ₹750/month"
    ],
    documents: [
      "Aadhaar Card",
      "Caste certificate",
      "Income certificate",
      "School bonafide certificate",
      "Bank account details",
      "Previous year marksheet"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in",
      "Register as new student",
      "Select 'Pre-Matric Scholarship'",
      "Fill form and upload documents",
      "School/institute verifies",
      "Scholarship credited to bank account"
    ],
    officialUrl: "https://scholarships.gov.in",
    applyUrl: "https://scholarships.gov.in",
    helpline: "0120-6619540",
    isActive: true,
    tags: ["scholarship", "SC ST", "pre matric", "class 9 10", "student", "education"]
  },

  {
    id: "pmss",
    name: "Prime Minister's Scholarship Scheme (PMSS)",
    nameHindi: "प्रधानमंत्री छात्रवृत्ति योजना",
    category: "education",
    ministry: "Ministry of Home Affairs",
    state: "central",
    targetGroup: ["students", "defence", "police"],
    description: "Scholarship for wards of ex-servicemen / ex-coast guard personnel / RPF/RPSF personnel for pursuing professional degree programs.",
    benefitAmount: "₹2,500/month (boys) | ₹3,000/month (girls)",
    eligibility: [
      "Ward / widow of ex-serviceman, ex-coast guard, RPF/RPSF",
      "Studying in 1st year of professional degree (BE/BTech/MBBS/BDS/MBA etc.)",
      "Must have scored minimum 60% in qualifying exam",
      "Age between 18–25 years",
      "Annual family income below ₹6 lakh"
    ],
    benefits: [
      "₹3,000/month for girls | ₹2,500/month for boys",
      "Scholarship for up to 5 years",
      "For professional degree courses only"
    ],
    documents: [
      "Aadhaar Card",
      "Ex-serviceman PPO/Discharge certificate",
      "Relationship certificate with ex-serviceman",
      "Marksheet of qualifying exam (12th/diploma)",
      "Admission letter from institution",
      "Bank account details (student's name)",
      "Passport size photo"
    ],
    applicationProcess: [
      "Visit ksb.gov.in (Kendriya Sainik Board)",
      "Register and login",
      "Fill scholarship application form",
      "Upload all required documents",
      "Submit before deadline (usually August-September)",
      "Verify status on NSP scholarships.gov.in"
    ],
    officialUrl: "https://ksb.gov.in",
    applyUrl: "https://scholarships.gov.in",
    helpline: "011-26173215",
    isActive: true,
    tags: ["PMSS", "defence scholarship", "ex-serviceman", "professional degree", "scholarship"]
  },

  {
    id: "aicte-pragati",
    name: "AICTE Pragati Scholarship for Girls",
    nameHindi: "एआईसीटीई प्रगति छात्रवृत्ति (बालिकाओं के लिए)",
    category: "education",
    ministry: "AICTE / Ministry of Education",
    state: "central",
    targetGroup: ["students", "girls", "technical education"],
    description: "Scholarship to support girl students pursuing technical education (Degree/Diploma) in AICTE-approved institutions.",
    benefitAmount: "₹50,000/year (up to ₹30,000 tuition + ₹20,000 incidentals)",
    eligibility: [
      "Girl student pursuing technical degree or diploma",
      "Studying in AICTE-approved institution",
      "1st year student or lateral entry 2nd year",
      "Annual family income below ₹8 lakh",
      "Maximum 2 girl children per family eligible"
    ],
    benefits: [
      "₹30,000 for tuition fees per year",
      "₹20,000 for incidental charges per year",
      "Total ₹50,000 per year",
      "Up to 4 years"
    ],
    documents: [
      "Aadhaar Card",
      "Income certificate",
      "Admission letter",
      "12th/10th marksheet",
      "Bank account details",
      "Passport size photo",
      "Affidavit of family income"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in",
      "Register with Aadhaar",
      "Select 'AICTE Pragati Scholarship'",
      "Fill complete application",
      "Upload documents",
      "Submit before November deadline",
      "Institution verifies",
      "Scholarship disbursed in 2 installments"
    ],
    officialUrl: "https://www.aicte-india.org/bureaus/scst/student-development/pragati",
    applyUrl: "https://scholarships.gov.in",
    helpline: "1800-11-5444",
    isActive: true,
    tags: ["girl scholarship", "technical education", "AICTE", "engineering", "diploma", "Pragati"]
  },

  {
    id: "aicte-saksham",
    name: "AICTE Saksham Scholarship for Specially-Abled Students",
    nameHindi: "दिव्यांग छात्रों के लिए एआईसीटीई सक्षम छात्रवृत्ति",
    category: "education",
    ministry: "AICTE / Ministry of Education",
    state: "central",
    targetGroup: ["students", "disability", "technical education"],
    description: "Scholarship for differently-abled students pursuing technical degree/diploma in AICTE-approved institutions.",
    benefitAmount: "₹50,000/year",
    eligibility: [
      "Differently-abled student (40% or more disability)",
      "Studying technical degree or diploma",
      "In AICTE-approved institution",
      "Annual family income below ₹8 lakh",
      "1st year or lateral entry 2nd year"
    ],
    benefits: [
      "₹30,000 tuition fees + ₹20,000 incidentals",
      "Total ₹50,000 per year",
      "Duration: Up to 4 years"
    ],
    documents: [
      "Aadhaar Card",
      "Disability certificate (40%+ from govt hospital)",
      "Income certificate",
      "Admission letter",
      "Marksheet of qualifying exam",
      "Bank account details"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in",
      "Select 'AICTE Saksham Scholarship'",
      "Register and complete application",
      "Upload disability certificate and other documents",
      "Institution verification",
      "Amount credited in 2 installments"
    ],
    officialUrl: "https://www.aicte-india.org/bureaus/scst/student-development/saksham",
    applyUrl: "https://scholarships.gov.in",
    helpline: "1800-11-5444",
    isActive: true,
    tags: ["disability", "divyang", "scholarship", "technical education", "AICTE", "Saksham"]
  },

  {
    id: "inspire-scholarship",
    name: "INSPIRE Scholarship for Higher Education (SHE)",
    nameHindi: "इंस्पायर उच्च शिक्षा छात्रवृत्ति",
    category: "education",
    ministry: "Department of Science & Technology",
    state: "central",
    targetGroup: ["students", "science"],
    description: "Scholarship for top science students to pursue B.Sc./B.S./B.Stat/B.Math/Int. M.Sc. in natural/basic sciences to attract talent towards research careers.",
    benefitAmount: "₹80,000/year + ₹20,000 mentorship grant",
    eligibility: [
      "Secured top 1% in Class 12 board exams OR",
      "Qualified in national competitive exams (JEE/NEET top ranks)",
      "Pursuing B.Sc./BS in natural basic sciences (Physics, Chemistry, Maths, Biology etc.)",
      "Not pursuing engineering or medicine",
      "Age: 17–22 years at time of admission"
    ],
    benefits: [
      "₹80,000 per year scholarship",
      "₹20,000 mentorship grant",
      "Duration: 5 years (for integrated programs)",
      "Access to summer research programs"
    ],
    documents: [
      "Aadhaar Card",
      "Class 12 marksheet with rank/percentage proof",
      "Admission letter from institution",
      "Bank account details",
      "Passport size photo"
    ],
    applicationProcess: [
      "Visit online.dst.gov.in (INSPIRE portal)",
      "Register with email and mobile",
      "Fill application form",
      "Upload Class 12 marksheet with top 1% proof",
      "Institution verifies",
      "DST sanctioned scholars notified by email"
    ],
    officialUrl: "https://online.dst.gov.in",
    applyUrl: "https://online.dst.gov.in",
    helpline: "011-26590415",
    isActive: true,
    tags: ["science scholarship", "INSPIRE", "BSc", "research", "DST", "top 1%"]
  },

  // ─── HEALTH ─────────────────────────────────────────────────

  {
    id: "pmjay",
    name: "Ayushman Bharat — PM Jan Arogya Yojana (AB-PMJAY)",
    nameHindi: "आयुष्मान भारत — प्रधानमंत्री जन आरोग्य योजना",
    category: "health",
    ministry: "Ministry of Health & Family Welfare",
    state: "central",
    targetGroup: ["poor", "BPL", "vulnerable families"],
    description: "World's largest health insurance scheme providing ₹5 lakh health coverage per family per year for secondary and tertiary hospitalisation at empanelled hospitals across India.",
    benefitAmount: "₹5 lakh/family/year (health coverage)",
    eligibility: [
      "Families covered under SECC 2011 database",
      "BPL families",
      "Families with no adult male member aged 16–59",
      "Families with disabled member and no able-bodied adult",
      "SC/ST households",
      "Families with no house, or single room house with kuccha walls"
    ],
    benefits: [
      "₹5 lakh cashless treatment per family per year",
      "Coverage at 25,000+ empanelled hospitals",
      "Pre and post hospitalisation expenses covered",
      "No restriction on family size or age",
      "All pre-existing diseases covered from day 1",
      "1,929 treatment packages covered"
    ],
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "SECC data reference (if eligible)",
      "Mobile number"
    ],
    applicationProcess: [
      "Check eligibility at pmjay.gov.in or call 14555",
      "If eligible, visit nearest Ayushman Mitra or empanelled hospital",
      "Or visit nearest CSC centre",
      "Get Ayushman Card made (free)",
      "Use card for cashless treatment at any empanelled hospital"
    ],
    officialUrl: "https://pmjay.gov.in",
    applyUrl: "https://beneficiary.nha.gov.in",
    statusCheckUrl: "https://pmjay.gov.in",
    helpline: "14555 / 1800-111-565",
    isActive: true,
    tags: ["health insurance", "Ayushman", "PMJAY", "hospital", "cashless treatment", "₹5 lakh"]
  },

  {
    id: "janani-suraksha",
    name: "Janani Suraksha Yojana (JSY)",
    nameHindi: "जननी सुरक्षा योजना",
    category: "health",
    ministry: "Ministry of Health & Family Welfare",
    state: "central",
    targetGroup: ["pregnant women", "BPL"],
    description: "Safe motherhood scheme to reduce maternal and neo-natal mortality by promoting institutional delivery among poor pregnant women.",
    benefitAmount: "₹1,400 (rural) | ₹1,000 (urban) for institutional delivery",
    eligibility: [
      "BPL pregnant women aged 19 years or above",
      "SC/ST women regardless of BPL status",
      "All pregnant women in low performing states (LPS)",
      "Women going for 1st or 2nd delivery only",
      "Institutional delivery at government or accredited private hospital"
    ],
    benefits: [
      "₹1,400 cash assistance (rural low performing states)",
      "₹1,000 cash assistance (urban)",
      "Free delivery at government hospitals",
      "ASHA worker support and escort"
    ],
    documents: [
      "Aadhaar Card",
      "BPL Card / Ration Card",
      "Mother and Child Protection Card (MCP Card)",
      "Bank account details"
    ],
    applicationProcess: [
      "Register with nearest Anganwadi/ASHA worker during pregnancy",
      "Get registered at PHC/CHC or government hospital",
      "ANC (Antenatal Care) checkups to be completed",
      "Deliver at government/accredited hospital",
      "Cash benefit released after delivery"
    ],
    officialUrl: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=309",
    applyUrl: "https://nhm.gov.in",
    helpline: "104",
    isActive: true,
    tags: ["pregnant women", "delivery", "maternal health", "JSY", "BPL", "hospital delivery"]
  },

  {
    id: "pmsurakshit-matritva",
    name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
    nameHindi: "प्रधानमंत्री सुरक्षित मातृत्व अभियान",
    category: "health",
    ministry: "Ministry of Health & Family Welfare",
    state: "central",
    targetGroup: ["pregnant women"],
    description: "Provides free, comprehensive and quality antenatal care to all pregnant women on the 9th of every month at government health facilities.",
    benefitAmount: "Free ANC checkup and services",
    eligibility: [
      "All pregnant women (2nd or 3rd trimester)",
      "No income/BPL restriction",
      "Available at all government PHC/CHC/District hospitals"
    ],
    benefits: [
      "Free ANC checkup on 9th of every month",
      "Free ultrasound",
      "Free blood tests",
      "Free iron/folic acid tablets",
      "Doctor consultation",
      "High-risk pregnancy identification"
    ],
    documents: [
      "Mother and Child Protection (MCP) Card",
      "Aadhaar Card (optional but helpful)"
    ],
    applicationProcess: [
      "Simply visit nearest PHC/CHC/government hospital on 9th of any month",
      "Register at the facility",
      "Get free ANC examination"
    ],
    officialUrl: "https://pmsma.nhp.gov.in",
    applyUrl: "https://pmsma.nhp.gov.in",
    helpline: "104",
    isActive: true,
    tags: ["maternity", "ANC checkup", "pregnant", "free healthcare", "9th of month"]
  },

  // ─── HOUSING ─────────────────────────────────────────────────

  {
    id: "pmay-gramin",
    name: "Pradhan Mantri Awas Yojana — Gramin (PMAY-G)",
    nameHindi: "प्रधानमंत्री आवास योजना — ग्रामीण",
    category: "housing",
    ministry: "Ministry of Rural Development",
    state: "central",
    targetGroup: ["rural poor", "BPL", "houseless"],
    description: "Housing scheme for rural poor to provide pucca houses with basic facilities. Provides financial assistance to eligible rural households to construct their own house.",
    benefitAmount: "₹1.20 lakh (plain areas) | ₹1.30 lakh (hilly/difficult areas)",
    eligibility: [
      "Houseless families or families living in 0/1 room kuccha houses",
      "Listed in SECC 2011 PMAY-G waiting list",
      "Priority to SC/ST / freed bonded labourers",
      "Minorities, women-headed households given priority",
      "Must not have any pucca house anywhere in India",
      "Not already benefited under Indira Awas Yojana"
    ],
    benefits: [
      "₹1.20 lakh in plains | ₹1.30 lakh in hills/NE/difficult areas",
      "90-95 days MGNREGA wage for labour",
      "₹12,000 for toilet under SBM",
      "LPG connection under PMUY",
      "Direct Bank Transfer in installments"
    ],
    documents: [
      "Aadhaar Card",
      "SECC beneficiary reference ID",
      "Bank account details",
      "Job card (MGNREGA)",
      "Land documents / No-Objection from Gram Sabha"
    ],
    applicationProcess: [
      "Check eligibility in PMAY-G list at rhreporting.nic.in",
      "If name in list: Contact Gram Panchayat",
      "Gram Panchayat verifies and registers",
      "Funds released in installments via AwaasSoft",
      "Construction supervised by Gram Panchayat"
    ],
    officialUrl: "https://pmayg.nic.in",
    applyUrl: "https://pmayg.nic.in",
    statusCheckUrl: "https://pmayg.nic.in/netiayHome/IAY_Search.aspx",
    helpline: "1800-11-6446",
    isActive: true,
    tags: ["housing", "awas", "rural", "gramin", "pucca house", "BPL", "₹1.2 lakh"]
  },

  {
    id: "pmay-urban",
    name: "Pradhan Mantri Awas Yojana — Urban (PMAY-U)",
    nameHindi: "प्रधानमंत्री आवास योजना — शहरी",
    category: "housing",
    ministry: "Ministry of Housing & Urban Affairs",
    state: "central",
    targetGroup: ["urban poor", "EWS", "LIG", "MIG"],
    description: "Provides housing for all urban citizens — EWS/LIG/MIG — through Credit Linked Subsidy Scheme (CLSS) and in-situ slum redevelopment.",
    benefitAmount: "₹2.67 lakh interest subsidy (EWS/LIG) | ₹2.35 lakh (MIG-I) | ₹2.30 lakh (MIG-II)",
    eligibility: [
      "EWS: Annual income up to ₹3 lakh",
      "LIG: Annual income ₹3–6 lakh",
      "MIG-I: Annual income ₹6–12 lakh",
      "MIG-II: Annual income ₹12–18 lakh",
      "Must not own a pucca house anywhere in India",
      "Must be first-time homebuyer",
      "Aadhaar mandatory for all family members"
    ],
    benefits: [
      "Interest subsidy on home loan",
      "EWS/LIG: 6.5% subsidy on loan up to ₹6 lakh",
      "MIG-I: 4% subsidy on loan up to ₹9 lakh",
      "MIG-II: 3% subsidy on loan up to ₹12 lakh",
      "Woman ownership/co-ownership mandatory for EWS/LIG"
    ],
    documents: [
      "Aadhaar Card (all family members)",
      "Income certificate",
      "Caste certificate (if applicable)",
      "Property documents",
      "Home loan sanction letter",
      "Bank account details"
    ],
    applicationProcess: [
      "Apply at pmaymis.gov.in",
      "Or visit nearest CSC/bank that offers home loans",
      "Select applicable component (CLSS/AHP/BLC)",
      "Fill application with income and property details",
      "Bank processes home loan and subsidy",
      "Subsidy credited to loan account reducing EMI"
    ],
    officialUrl: "https://pmaymis.gov.in",
    applyUrl: "https://pmaymis.gov.in",
    statusCheckUrl: "https://pmaymis.gov.in/Check_List/Search.aspx",
    helpline: "1800-11-3377 / 1800-11-3388",
    isActive: true,
    tags: ["housing", "urban", "home loan subsidy", "CLSS", "EWS LIG MIG", "flat", "apartment"]
  },

  // ─── EMPLOYMENT & SKILL ─────────────────────────────────────

  {
    id: "mgnrega",
    name: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
    nameHindi: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना",
    category: "employment",
    ministry: "Ministry of Rural Development",
    state: "central",
    targetGroup: ["rural adults", "BPL"],
    description: "Provides 100 days of guaranteed wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.",
    benefitAmount: "100 days employment | Wage: ₹200–₹350/day (state-wise)",
    eligibility: [
      "Rural household member aged 18 years or above",
      "Willing to do unskilled manual work",
      "Must live in rural area",
      "Any rural adult regardless of income"
    ],
    benefits: [
      "100 days of guaranteed employment per year",
      "Daily wages (state specific — ₹200 to ₹350+)",
      "Wages paid within 15 days",
      "Unemployment allowance if work not provided within 15 days",
      "Free job card"
    ],
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "Bank/post office account",
      "Photo (passport size)"
    ],
    applicationProcess: [
      "Visit Gram Panchayat office",
      "Apply for Job Card (MGNREGA Card)",
      "Job Card issued within 15 days",
      "Demand work in writing at Gram Panchayat",
      "Work allocated within 15 days of application",
      "Wages paid within 15 days to bank account"
    ],
    officialUrl: "https://nrega.nic.in",
    applyUrl: "https://nrega.nic.in",
    statusCheckUrl: "https://nrega.nic.in/netnrega/home.aspx",
    helpline: "1800-111-555",
    isActive: true,
    tags: ["MGNREGA", "NREGA", "100 days work", "rural employment", "job card", "unskilled work"]
  },

  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    nameHindi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम",
    category: "employment",
    ministry: "Ministry of MSME",
    state: "central",
    targetGroup: ["unemployed youth", "entrepreneur"],
    description: "Credit-linked subsidy scheme for setting up micro enterprises and generating self-employment for unemployed youth and traditional artisans.",
    benefitAmount: "25–35% subsidy on project cost up to ₹50 lakh (manufacturing) / ₹20 lakh (service)",
    eligibility: [
      "Age: 18 years and above",
      "Minimum 8th pass for projects above ₹10 lakh (manufacturing) / ₹5 lakh (service)",
      "New enterprises only (no existing business)",
      "SHGs, institutions registered under Societies Act also eligible",
      "No income limit"
    ],
    benefits: [
      "25% subsidy for general category in urban areas",
      "35% subsidy for SC/ST/OBC/Women/Minority/Ex-servicemen in rural areas",
      "Maximum project cost: ₹50 lakh (manufacturing) | ₹20 lakh (service)",
      "Subsidy given via bank loan",
      "No collateral for loans up to ₹10 lakh"
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Educational qualification certificates",
      "Caste/category certificate",
      "Project report (DPR)",
      "Bank account details",
      "Passport size photo"
    ],
    applicationProcess: [
      "Visit kviconline.gov.in or kvic.org.in",
      "Register and fill online application",
      "Prepare Detailed Project Report (DPR)",
      "Application reviewed by KVIC/KVIB/DIC",
      "If approved, interview at district level",
      "Loan sanctioned by bank",
      "Subsidy released after 3 years lock-in"
    ],
    officialUrl: "https://kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    applyUrl: "https://kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    helpline: "1800-180-6763",
    isActive: true,
    tags: ["self employment", "startup", "small business", "PMEGP", "KVIC", "subsidy loan", "entrepreneur"]
  },

  {
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) 4.0",
    nameHindi: "प्रधानमंत्री कौशल विकास योजना",
    category: "employment",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    state: "central",
    targetGroup: ["youth", "unemployed", "school dropout"],
    description: "Free skill training and certification for youth to improve their employability and earn better livelihood. Over 300+ job roles across sectors.",
    benefitAmount: "Free training + ₹500 reward on certification",
    eligibility: [
      "Indian citizen aged 15–45 years",
      "Unemployed or school/college dropout",
      "Class 10 pass preferred but not mandatory for all courses",
      "No income criteria"
    ],
    benefits: [
      "Free short-term skill training (150 to 300 hours)",
      "NSQF aligned certification",
      "₹500 reward on passing certification",
      "Placement support",
      "Recognition of Prior Learning (RPL) for experienced workers"
    ],
    documents: [
      "Aadhaar Card",
      "Bank account details",
      "Educational certificate (if any)",
      "Photo ID proof"
    ],
    applicationProcess: [
      "Visit pmkvyofficial.org or skillindiadigital.gov.in",
      "Find nearest PMKVY training centre",
      "Register and enroll in preferred job role",
      "Complete training (free of cost)",
      "Appear for NSDC/SSC assessment",
      "Get certificate",
      "Get job assistance from placement cell"
    ],
    officialUrl: "https://pmkvyofficial.org",
    applyUrl: "https://www.skillindiadigital.gov.in",
    helpline: "1800-123-9626",
    isActive: true,
    tags: ["skill training", "PMKVY", "free training", "certification", "employment", "youth", "courses"]
  },

  {
    id: "pm-mudra",
    name: "PM MUDRA Yojana (PMMY)",
    nameHindi: "प्रधानमंत्री मुद्रा योजना",
    category: "employment",
    ministry: "Ministry of Finance",
    state: "central",
    targetGroup: ["small business", "entrepreneur", "self-employed"],
    description: "Provides loans up to ₹20 lakh to non-corporate, non-farm small/micro enterprises through banks, MFIs and NBFCs without any collateral.",
    benefitAmount: "Loan up to ₹20 lakh (Shishu/Kishore/Tarun/Tarun+)",
    eligibility: [
      "Any Indian citizen with a business plan or existing business",
      "Non-farm income generating activities",
      "Small manufacturers, shopkeepers, vendors, artisans, service providers",
      "No minimum income requirement",
      "Good credit history preferred"
    ],
    benefits: [
      "Shishu: Loans up to ₹50,000",
      "Kishore: Loans ₹50,001 to ₹5 lakh",
      "Tarun: Loans ₹5 lakh to ₹10 lakh",
      "Tarun+: Loans ₹10 lakh to ₹20 lakh",
      "No collateral required for Shishu/Kishore",
      "MUDRA card for working capital"
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Business address proof",
      "Business plan/project report",
      "Bank statements (6 months)",
      "2 passport size photos"
    ],
    applicationProcess: [
      "Visit any public/private bank, RRB, MFI, or NBFC",
      "Or apply at udyamimitra.in",
      "Select appropriate MUDRA category",
      "Fill loan application form",
      "Submit documents",
      "Bank processes and sanctions loan",
      "Usually 7–15 working days for approval"
    ],
    officialUrl: "https://www.mudra.org.in",
    applyUrl: "https://www.udyamimitra.in",
    helpline: "1800-180-1111",
    isActive: true,
    tags: ["MUDRA", "small business loan", "entrepreneur", "startup", "Shishu Kishore Tarun", "collateral free loan"]
  },

  // ─── WOMEN & CHILD ──────────────────────────────────────────

  {
    id: "beti-bachao-beti-padhao",
    name: "Beti Bachao Beti Padhao (BBBP)",
    nameHindi: "बेटी बचाओ बेटी पढ़ाओ",
    category: "women",
    ministry: "Ministry of Women & Child Development",
    state: "central",
    targetGroup: ["girl child", "women"],
    description: "Multi-sectoral program to address declining Child Sex Ratio (CSR) and related issues of empowerment of women over a life cycle continuum.",
    benefitAmount: "Non-financial — awareness + education support",
    eligibility: [
      "All girl children",
      "Focus on gender-biased districts",
      "All socioeconomic categories"
    ],
    benefits: [
      "Improved access to girl child education",
      "Protection from female foeticide",
      "Conditional cash transfers in states",
      "Education scholarships in select states"
    ],
    documents: ["Birth certificate", "Aadhaar of parents"],
    applicationProcess: [
      "Contact nearest Anganwadi centre",
      "Or district Women & Child Development office",
      "Register girl child for benefits"
    ],
    officialUrl: "https://wcd.nic.in/bbbp-schemes",
    applyUrl: "https://wcd.nic.in",
    helpline: "181",
    isActive: true,
    tags: ["girl child", "beti bachao", "women empowerment", "education", "gender equality"]
  },

  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    nameHindi: "सुकन्या समृद्धि योजना",
    category: "women",
    ministry: "Ministry of Finance",
    state: "central",
    targetGroup: ["girl child", "parents"],
    description: "Small savings scheme for girl child offering high interest rate (8.2% p.a.) and tax benefits to encourage parents to save for girl's education and marriage.",
    benefitAmount: "8.2% interest rate per annum (tax-free maturity)",
    eligibility: [
      "Girl child aged below 10 years at account opening",
      "Opened by natural/legal guardian",
      "Maximum 2 accounts per family (one per girl child)",
      "3rd account if twin girls born as 2nd birth"
    ],
    benefits: [
      "8.2% interest rate (highest among small savings)",
      "Tax deduction under Section 80C (up to ₹1.5 lakh)",
      "Tax-free maturity amount",
      "Minimum deposit ₹250/year | Maximum ₹1.5 lakh/year",
      "Account matures after 21 years from opening",
      "Partial withdrawal allowed after girl turns 18 (for education)"
    ],
    documents: [
      "Girl child's birth certificate",
      "Parent/guardian Aadhaar Card",
      "Parent/guardian PAN Card",
      "Address proof",
      "Passport size photos"
    ],
    applicationProcess: [
      "Visit nearest Post Office or authorized bank (SBI, PNB, BoB etc.)",
      "Fill SSY account opening form",
      "Submit girl's birth certificate and guardian documents",
      "Make minimum deposit of ₹250",
      "Get passbook"
    ],
    officialUrl: "https://www.indiapost.gov.in",
    applyUrl: "https://www.indiapost.gov.in/VAS/Pages/Content/SukanyaSamriddhiYojana.aspx",
    helpline: "1800-180-5232",
    isActive: true,
    tags: ["sukanya samriddhi", "girl child savings", "8.2% interest", "education fund", "tax saving", "post office"]
  },

  {
    id: "pmmvy",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    nameHindi: "प्रधानमंत्री मातृ वंदना योजना",
    category: "women",
    ministry: "Ministry of Women & Child Development",
    state: "central",
    targetGroup: ["pregnant women", "lactating mothers"],
    description: "Conditional cash transfer of ₹5,000 to pregnant and lactating women for the first live birth to partially compensate for wage loss and improve health-seeking behaviour.",
    benefitAmount: "₹5,000 (in 3 installments) for 1st child | ₹6,000 for 2nd child if girl",
    eligibility: [
      "All pregnant and lactating women",
      "For first live birth",
      "Second birth if it is a girl child (₹6,000)",
      "Aged 19 years and above",
      "Not employed in central/state government"
    ],
    benefits: [
      "1st installment: ₹1,000 on early registration of pregnancy",
      "2nd installment: ₹2,000 after 6 months of pregnancy + one ANC",
      "3rd installment: ₹2,000 after child birth registration + BCG/OPV/DPT vaccination",
      "Total: ₹5,000 for 1st birth | ₹6,000 if 2nd child is girl"
    ],
    documents: [
      "Aadhaar Card (mother)",
      "Aadhaar Card (husband)",
      "MCP Card (Mother and Child Protection Card)",
      "Bank/Post Office account (mother's name)",
      "Marriage certificate (if required)"
    ],
    applicationProcess: [
      "Register at nearest Anganwadi Centre (AWC) / ASHA worker",
      "Fill Form 1A on early registration of pregnancy",
      "Fill Form 1B at 6 months for 2nd installment",
      "Fill Form 1C after child birth for 3rd installment",
      "Cash transferred directly to mother's bank account"
    ],
    officialUrl: "https://pmmvy.wcd.gov.in",
    applyUrl: "https://pmmvy.wcd.gov.in",
    helpline: "7998799804",
    isActive: true,
    tags: ["maternity benefit", "PMMVY", "pregnant", "lactating", "cash transfer", "women", "₹5000"]
  },

  // ─── SOCIAL WELFARE ─────────────────────────────────────────

  {
    id: "nsap-old-age",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    nameHindi: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
    category: "social",
    ministry: "Ministry of Rural Development",
    state: "central",
    targetGroup: ["senior citizens", "BPL"],
    description: "Monthly pension scheme for BPL senior citizens aged 60 years and above under the National Social Assistance Programme (NSAP).",
    benefitAmount: "₹200/month (60–79 years) | ₹500/month (80+ years) + state top-up",
    eligibility: [
      "Aged 60 years or above",
      "Living Below Poverty Line (BPL)",
      "Applicant should be practically destitute or have little or no regular means of subsistence"
    ],
    benefits: [
      "₹200/month (ages 60–79) from central government",
      "₹500/month (age 80+) from central government",
      "State governments add additional top-up (varies by state)",
      "Monthly bank/post office transfer"
    ],
    documents: [
      "Aadhaar Card",
      "Age proof (birth certificate / school certificate)",
      "BPL card / Ration card",
      "Bank account details",
      "Passport size photo"
    ],
    applicationProcess: [
      "Apply at Gram Panchayat (rural) or Municipal office (urban)",
      "Or visit Block Development Office (BDO)",
      "Fill NSAP application form",
      "Submit with BPL and age proof",
      "Gram Sabha / Ward committee verifies",
      "District Collector approves",
      "Pension credited monthly"
    ],
    officialUrl: "https://nsap.nic.in",
    applyUrl: "https://nsap.nic.in",
    helpline: "1800-111-555",
    isActive: true,
    tags: ["old age pension", "senior citizen", "BPL pension", "NSAP", "IGNOAPS", "₹200 pension"]
  },

  {
    id: "pm-ujjwala",
    name: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    nameHindi: "प्रधानमंत्री उज्ज्वला योजना",
    category: "social",
    ministry: "Ministry of Petroleum & Natural Gas",
    state: "central",
    targetGroup: ["BPL women", "rural"],
    description: "Provides free LPG connections to women of BPL households to replace unclean cooking fuels and protect health of rural women and children.",
    benefitAmount: "Free LPG connection + first refill subsidy",
    eligibility: [
      "Adult woman of a BPL household",
      "No existing LPG connection in the family",
      "Name in SECC 2011 data or BPL list",
      "Also covers: SC/ST, PM Awas Yojana beneficiaries, AAY families, tea garden workers, people from forest/riverine islands"
    ],
    benefits: [
      "Free LPG connection (deposit waived)",
      "First refill free",
      "Stove and connection cost paid by government",
      "EMI option for cylinder and stove cost",
      "₹300 subsidy on each refill (via DBT)"
    ],
    documents: [
      "Aadhaar Card",
      "Ration Card / BPL certificate",
      "Bank account details",
      "Passport size photo",
      "Self-declaration for no existing connection"
    ],
    applicationProcess: [
      "Visit nearest LPG distributor (Indane/HP/Bharat)",
      "Fill PMUY application form (Form KYC5)",
      "Submit with BPL/Aadhaar documents",
      "Distributor verifies and submits",
      "Connection provided within 7–10 days",
      "Or apply at mylpg.in"
    ],
    officialUrl: "https://pmuy.gov.in",
    applyUrl: "https://www.mylpg.in/ujjwala",
    helpline: "1906 / 1800-233-3555",
    isActive: true,
    tags: ["LPG", "gas connection", "ujjwala", "BPL women", "cooking gas", "free connection"]
  },

  {
    id: "pmjjby",
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    nameHindi: "प्रधानमंत्री जीवन ज्योति बीमा योजना",
    category: "social",
    ministry: "Ministry of Finance",
    state: "central",
    targetGroup: ["all adults"],
    description: "Renewable one-year term life insurance scheme offering life cover of ₹2 lakh at very low annual premium of just ₹436.",
    benefitAmount: "₹2 lakh life insurance cover",
    eligibility: [
      "Age 18 to 50 years",
      "Must have a savings bank account",
      "Aadhaar linked bank account preferred",
      "Willing to give auto-debit consent"
    ],
    benefits: [
      "₹2 lakh death benefit to nominee",
      "Annual premium: only ₹436/year",
      "Auto-debit from bank account on 31st May",
      "Covers death due to any reason"
    ],
    documents: [
      "Aadhaar Card",
      "Bank account details",
      "Mobile number"
    ],
    applicationProcess: [
      "Visit your bank branch or net banking",
      "Or use bank mobile app",
      "Fill PMJJBY enrollment form",
      "Give auto-debit consent",
      "₹436 debited annually from bank",
      "Insurance certificate issued"
    ],
    officialUrl: "https://jansuraksha.gov.in",
    applyUrl: "https://jansuraksha.gov.in/Forms-PMJJBY.aspx",
    helpline: "1800-180-1111",
    isActive: true,
    tags: ["life insurance", "PMJJBY", "₹2 lakh", "₹436 premium", "death benefit", "cheap insurance"]
  },

  {
    id: "pmsby",
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    nameHindi: "प्रधानमंत्री सुरक्षा बीमा योजना",
    category: "social",
    ministry: "Ministry of Finance",
    state: "central",
    targetGroup: ["all adults"],
    description: "Accident insurance scheme offering coverage of ₹2 lakh for accidental death and permanent disability at only ₹20/year premium.",
    benefitAmount: "₹2 lakh (death/permanent disability) | ₹1 lakh (partial disability)",
    eligibility: [
      "Age 18 to 70 years",
      "Must have savings bank account",
      "Aadhaar linked account preferred"
    ],
    benefits: [
      "₹2 lakh for accidental death",
      "₹2 lakh for permanent total disability",
      "₹1 lakh for partial disability",
      "Annual premium: only ₹20/year",
      "Auto-debit from bank account"
    ],
    documents: [
      "Aadhaar Card",
      "Bank account details",
      "Mobile number"
    ],
    applicationProcess: [
      "Visit bank branch or use net banking/mobile app",
      "Fill PMSBY enrollment form",
      "Auto-debit consent of ₹20",
      "Coverage starts immediately"
    ],
    officialUrl: "https://jansuraksha.gov.in",
    applyUrl: "https://jansuraksha.gov.in/Forms-PMSBY.aspx",
    helpline: "1800-180-1111",
    isActive: true,
    tags: ["accident insurance", "PMSBY", "₹20 premium", "₹2 lakh", "disability insurance", "cheap"]
  },

  {
    id: "atal-pension",
    name: "Atal Pension Yojana (APY)",
    nameHindi: "अटल पेंशन योजना",
    category: "social",
    ministry: "Ministry of Finance / PFRDA",
    state: "central",
    targetGroup: ["unorganized sector workers"],
    description: "Pension scheme for unorganized sector workers guaranteeing fixed monthly pension of ₹1,000 to ₹5,000 after age 60, depending on contribution.",
    benefitAmount: "₹1,000 to ₹5,000/month pension after 60 years",
    eligibility: [
      "Indian citizen aged 18 to 40 years",
      "Must have a savings bank account",
      "Should NOT be an income tax payer",
      "Should NOT be a government employee",
      "Not covered under any statutory social security scheme"
    ],
    benefits: [
      "Guaranteed monthly pension of ₹1,000/₹2,000/₹3,000/₹4,000/₹5,000",
      "Government co-contribution (for early subscribers)",
      "Pension also to spouse after subscriber's death",
      "Corpus returned to nominee after both die",
      "Tax benefit under Section 80CCD"
    ],
    documents: [
      "Aadhaar Card",
      "Savings bank account",
      "Mobile number"
    ],
    applicationProcess: [
      "Visit your bank branch",
      "Fill APY subscriber registration form",
      "Select pension amount (₹1,000 to ₹5,000)",
      "Set up auto-debit for monthly contribution",
      "Account credited every month",
      "Pension starts at age 60"
    ],
    officialUrl: "https://npscra.nsdl.co.in/apy.php",
    applyUrl: "https://npscra.nsdl.co.in/apy.php",
    helpline: "1800-110-069",
    isActive: true,
    tags: ["pension", "APY", "Atal Pension", "retirement", "unorganized sector", "₹5000 pension"]
  },

  // ─── FINANCE & BANKING ──────────────────────────────────────

  {
    id: "pmjdy",
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    nameHindi: "प्रधानमंत्री जन धन योजना",
    category: "finance",
    ministry: "Ministry of Finance",
    state: "central",
    targetGroup: ["unbanked population"],
    description: "Financial inclusion scheme ensuring access to financial services — savings account, remittance, credit, insurance, pension for all Indians especially rural poor.",
    benefitAmount: "Free zero-balance account + ₹2 lakh accident cover + ₹10,000 overdraft",
    eligibility: [
      "Any Indian citizen aged 10 years and above",
      "No minimum balance required",
      "No income limit",
      "Especially for those without a bank account"
    ],
    benefits: [
      "Zero balance savings account",
      "RuPay debit card",
      "₹2 lakh accident insurance cover",
      "₹30,000 life insurance cover",
      "₹10,000 overdraft facility (after 6 months)",
      "Direct Benefit Transfer (DBT) from government"
    ],
    documents: [
      "Aadhaar Card (primary KYC)",
      "OR PAN Card + address proof",
      "Passport size photo"
    ],
    applicationProcess: [
      "Visit any bank branch or Business Correspondent (BC) near you",
      "Fill account opening form",
      "Submit Aadhaar as KYC",
      "Get zero-balance account instantly",
      "RuPay card dispatched within 7–10 days"
    ],
    officialUrl: "https://pmjdy.gov.in",
    applyUrl: "https://pmjdy.gov.in",
    helpline: "1800-11-0001 / 1800-180-1111",
    isActive: true,
    tags: ["Jan Dhan", "bank account", "zero balance", "financial inclusion", "RuPay card", "PMJDY"]
  },

  {
    id: "standup-india",
    name: "Stand Up India Scheme",
    nameHindi: "स्टैंड अप इंडिया योजना",
    category: "finance",
    ministry: "Ministry of Finance / SIDBI",
    state: "central",
    targetGroup: ["SC/ST entrepreneurs", "women entrepreneurs"],
    description: "Bank loans between ₹10 lakh and ₹1 crore for SC/ST and Women entrepreneurs to set up greenfield enterprises in manufacturing, services or trading sector.",
    benefitAmount: "Loan from ₹10 lakh to ₹1 crore",
    eligibility: [
      "SC or ST borrower OR Women borrower",
      "Age 18 years and above",
      "Setting up greenfield enterprise (first time)",
      "Non-individual enterprises: 51% shareholding by SC/ST or Woman",
      "Not a defaulter to any bank or financial institution"
    ],
    benefits: [
      "Loan from ₹10 lakh to ₹1 crore",
      "Covers 75% of project cost",
      "Repayment up to 7 years",
      "Moratorium up to 18 months",
      "Composite loan (term loan + working capital)"
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Caste certificate (SC/ST)",
      "Project report",
      "Identity and address proof",
      "Bank statements"
    ],
    applicationProcess: [
      "Visit standupmitra.in",
      "Or visit nearest bank branch",
      "Register and fill application",
      "Submit project report",
      "Bank processes and sanctions loan",
      "Loan disbursed in installments"
    ],
    officialUrl: "https://www.standupmitra.in",
    applyUrl: "https://www.standupmitra.in",
    helpline: "1800-180-1111",
    isActive: true,
    tags: ["SC ST loan", "women entrepreneur", "Stand Up India", "₹1 crore loan", "startup", "greenfield"]
  },

  // ─── YOUTH ──────────────────────────────────────────────────

  {
    id: "pm-internship",
    name: "PM Internship Scheme (PMIS)",
    nameHindi: "प्रधानमंत्री इंटर्नशिप योजना",
    category: "youth",
    ministry: "Ministry of Corporate Affairs",
    state: "central",
    targetGroup: ["youth", "students", "graduates"],
    description: "Provides 12-month internship opportunities to young citizens in India's top 500 companies across various sectors to bridge the skill gap between academics and industry.",
    benefitAmount: "₹5,000/month stipend + ₹6,000 one-time grant",
    eligibility: [
      "Age 21–24 years",
      "Completed at least secondary education (10th pass)",
      "Not a full-time employee",
      "Not pursuing full-time education",
      "Annual family income below ₹8 lakh",
      "Not holding professional degree (IIT/IIM/CA/MBBS graduates not eligible)"
    ],
    benefits: [
      "₹5,000/month stipend (₹4,500 from government + ₹500 from company)",
      "₹6,000 one-time grant at joining",
      "12-month internship experience in top companies",
      "Industry exposure in 24+ sectors"
    ],
    documents: [
      "Aadhaar Card",
      "Educational certificates",
      "Bank account details",
      "Income certificate of family",
      "Passport size photo"
    ],
    applicationProcess: [
      "Visit pminternship.mca.gov.in",
      "Register with Aadhaar",
      "Complete profile with education and skills",
      "Browse available internship opportunities",
      "Apply to preferred internships",
      "Company reviews and offers internship",
      "Accept offer and join"
    ],
    officialUrl: "https://pminternship.mca.gov.in",
    applyUrl: "https://pminternship.mca.gov.in",
    helpline: "1800-572-5065",
    isActive: true,
    tags: ["internship", "PM internship", "youth", "stipend", "₹5000", "top companies", "experience"]
  },

  {
    id: "nys-yuva",
    name: "National Youth Fund / YUVA Scheme",
    nameHindi: "युवा योजना",
    category: "youth",
    ministry: "Ministry of Youth Affairs & Sports",
    state: "central",
    targetGroup: ["youth writers", "aspiring authors"],
    description: "YUVA (Young, Upcoming and Versatile Authors) scheme to train young authors below 30 years to promote reading culture and writing in India.",
    benefitAmount: "₹50,000 scholarship + mentorship + publishing deal",
    eligibility: [
      "Indian citizen aged below 30 years",
      "Interested in writing books on Indian culture, heritage, freedom struggle",
      "Must submit a writing sample"
    ],
    benefits: [
      "₹50,000 scholarship for 6 months",
      "Mentorship from established authors",
      "Published by Sahitya Akademi / NBT",
      "Royalties on sales"
    ],
    documents: ["Aadhaar Card", "Age proof", "Writing sample / synopsis"],
    applicationProcess: [
      "Visit innovateindia.mygov.in",
      "Register and submit writing proposal",
      "Selection via merit/evaluation",
      "Mentorship program begins"
    ],
    officialUrl: "https://www.mygov.in",
    applyUrl: "https://innovateindia.mygov.in/yuva/",
    helpline: "1800-3000-4477",
    isActive: true,
    tags: ["youth", "writing", "YUVA", "author", "scholarship", "books", "₹50,000"]
  },

  // ─── DISABILITY WELFARE ─────────────────────────────────────

  {
    id: "ddrs",
    name: "Deendayal Disabled Rehabilitation Scheme (DDRS)",
    nameHindi: "दीनदयाल दिव्यांग पुनर्वास योजना",
    category: "disability",
    ministry: "Ministry of Social Justice & Empowerment (DEPwD)",
    state: "central",
    targetGroup: ["disability", "divyang"],
    description: "Provides financial support to NGOs for running projects for education, vocational training, rehabilitation, and empowerment of persons with disabilities.",
    benefitAmount: "Free services through NGOs — education, training, aids/appliances",
    eligibility: [
      "Persons with disabilities (visual, hearing, locomotor, intellectual, mental)",
      "Disability of 40% or more",
      "Services provided at NGO centres funded under DDRS"
    ],
    benefits: [
      "Free special education",
      "Vocational training",
      "Rehabilitation services",
      "Assistive devices",
      "Early intervention services for children"
    ],
    documents: [
      "Disability certificate (from govt hospital)",
      "Aadhaar Card",
      "Income certificate"
    ],
    applicationProcess: [
      "Contact nearest DEPwD-funded NGO",
      "Or visit disabilityaffairs.gov.in",
      "Register for services",
      "Assessment done by NGO",
      "Enrolled in appropriate program"
    ],
    officialUrl: "https://disabilityaffairs.gov.in",
    applyUrl: "https://disabilityaffairs.gov.in/content/page/ddrs.php",
    helpline: "1800-11-4515",
    isActive: true,
    tags: ["disability", "divyang", "rehabilitation", "NGO", "free education", "vocational training"]
  },

  {
    id: "adip",
    name: "Assistance to Disabled Persons for Purchase of Aids & Appliances (ADIP)",
    nameHindi: "दिव्यांगों को सहायक उपकरण योजना (एडीआईपी)",
    category: "disability",
    ministry: "Ministry of Social Justice & Empowerment",
    state: "central",
    targetGroup: ["disability", "divyang"],
    description: "Provides free assistive devices (wheelchairs, hearing aids, crutches, artificial limbs, tricycles, Braille kits, computers, etc.) to disabled persons.",
    benefitAmount: "Free assistive devices worth up to ₹20,000 (BPL) or subsidized",
    eligibility: [
      "Indian citizen with 40%+ disability",
      "Income below ₹20,000/month for subsidized",
      "Income below ₹15,000/month for free devices",
      "Age: Below 65 years generally",
      "Device should be appropriate for disability"
    ],
    benefits: [
      "Free/subsidized wheelchairs, crutches, artificial limbs",
      "Hearing aids and batteries free",
      "Smart canes for blind persons",
      "Braille kits and books",
      "Tricycles and motor tricycles"
    ],
    documents: [
      "Disability certificate (40%+ from govt hospital)",
      "Aadhaar Card",
      "Income certificate",
      "Passport size photo"
    ],
    applicationProcess: [
      "Contact nearest ALIMCO centre (Artificial Limbs Manufacturing Corporation)",
      "Or visit camp organized by DEPwD / state govts",
      "Or apply at alimco.in",
      "Fitness assessment done by doctors",
      "Device prescribed and provided free/subsidized"
    ],
    officialUrl: "https://disabilityaffairs.gov.in/content/page/adip-scheme.php",
    applyUrl: "https://alimco.in",
    helpline: "1800-180-5129",
    isActive: true,
    tags: ["disability", "divyang", "wheelchair", "hearing aid", "artificial limb", "free devices", "ADIP"]
  },

  // ─── DIGITAL ────────────────────────────────────────────────

  {
    id: "pmgdisha",
    name: "Pradhan Mantri Gramin Digital Saksharta Abhiyan (PMGDISHA)",
    nameHindi: "प्रधानमंत्री ग्रामीण डिजिटल साक्षरता अभियान",
    category: "digital",
    ministry: "Ministry of Electronics & IT",
    state: "central",
    targetGroup: ["rural adults", "digitally illiterate"],
    description: "Free digital literacy training for rural households to make citizens digitally literate and enable them to use computers, smartphones, and government digital services.",
    benefitAmount: "Free training (20 hours course + certification)",
    eligibility: [
      "Rural household member aged 14–60 years",
      "Who is not digitally literate",
      "One member per household",
      "Priority to SC/ST/minorities/women/BPL/differently-abled"
    ],
    benefits: [
      "Free 20-hour computer/digital training",
      "Certificate from NIELIT / CSC",
      "Skills to use internet, mobile banking, email",
      "DigiLocker, UMANG, e-Governance training"
    ],
    documents: [
      "Aadhaar Card",
      "Photo ID proof"
    ],
    applicationProcess: [
      "Visit pmgdisha.in",
      "Or visit nearest CSC (Common Service Centre)",
      "Register with Aadhaar",
      "Enroll in nearest training centre",
      "Complete 20-hour training",
      "Appear for online assessment",
      "Get digital certificate"
    ],
    officialUrl: "https://pmgdisha.in",
    applyUrl: "https://www.pmgdisha.in/registration",
    helpline: "1800-3000-3468",
    isActive: true,
    tags: ["digital literacy", "computer training", "free training", "rural", "PMGDISHA", "internet training"]
  },

  // ─── MINORITY WELFARE ───────────────────────────────────────

  {
    id: "nmdfc-loan",
    name: "NMDFC Margin Money Loan (Minority Communities)",
    nameHindi: "अल्पसंख्यक समुदाय के लिए एनएमडीएफसी ऋण",
    category: "minority",
    ministry: "Ministry of Minority Affairs",
    state: "central",
    targetGroup: ["minorities", "Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
    description: "Concessional loans for economic activities for persons belonging to notified minority communities to promote self-employment and economic development.",
    benefitAmount: "Loan up to ₹30 lakh at concessional 6% interest",
    eligibility: [
      "Muslim, Christian, Sikh, Buddhist, Parsi, or Jain community",
      "Annual family income below ₹98,000 (rural) or ₹1.20 lakh (urban)",
      "Age 18–55 years",
      "Should have viable business plan"
    ],
    benefits: [
      "Term loan up to ₹30 lakh at 6% per annum",
      "Micro-finance up to ₹1 lakh at 7%",
      "Education loan up to ₹20 lakh at 3%",
      "Repayment period up to 5 years"
    ],
    documents: [
      "Aadhaar Card",
      "Minority community certificate",
      "Income certificate",
      "Business plan/project report",
      "Bank account details"
    ],
    applicationProcess: [
      "Contact State Channelizing Agency (SCA) in your state",
      "Or visit nmdfc.org",
      "Fill application form",
      "Submit documents",
      "Verification by SCA",
      "Loan sanctioned by NMDFC"
    ],
    officialUrl: "https://nmdfc.org",
    applyUrl: "https://nmdfc.org/en/page/how-to-apply",
    helpline: "011-23221757",
    isActive: true,
    tags: ["minority loan", "Muslim Christian Sikh", "NMDFC", "concessional loan", "self-employment"]
  },

  {
    id: "pm-vikas",
    name: "PM VIKAS (PM Vishwakarma) Scheme",
    nameHindi: "पीएम विश्वकर्मा योजना",
    category: "employment",
    ministry: "Ministry of MSME",
    state: "central",
    targetGroup: ["artisans", "craftsmen", "traditional workers"],
    description: "Holistic support to artisans and craftspeople (Vishwakarmas) working with tools — recognition, skill upgrade, better equipment access, digital/financial integration.",
    benefitAmount: "₹15,000 toolkit grant + loan at 5% (up to ₹3 lakh) + ₹500/day training stipend",
    eligibility: [
      "Traditional artisans and craftspeople in 18 trades",
      "Trades: Blacksmith, Goldsmith, Potter, Carpenter, Barber, Cobbler, Mason, Tailor, Fishermen and 9 more",
      "Self-employed artisan aged 18+ years",
      "Registered on PM Vishwakarma portal",
      "One person per family per eligible trade"
    ],
    benefits: [
      "PM Vishwakarma certificate and ID card",
      "₹15,000 toolkit grant",
      "5-7 days basic training: ₹500/day stipend",
      "Collateral-free loan: ₹1 lakh (1st tranche) at 5%",
      "₹2 lakh (2nd tranche) on repayment",
      "Up to ₹3 lakh total",
      "Digital transaction incentive: ₹1 per transaction (max ₹100/month)"
    ],
    documents: [
      "Aadhaar Card",
      "Mobile number linked to Aadhaar",
      "Bank account",
      "Ration Card (for family verification)"
    ],
    applicationProcess: [
      "Visit pmvishwakarma.gov.in",
      "Or go to nearest CSC centre",
      "Registration done via biometric Aadhaar verification",
      "Select your trade",
      "Gram Panchayat / Urban Body verifies",
      "District Implementation Committee approves",
      "Certificate, toolkit grant, and training provided"
    ],
    officialUrl: "https://pmvishwakarma.gov.in",
    applyUrl: "https://pmvishwakarma.gov.in",
    helpline: "18002677777",
    isActive: true,
    tags: ["Vishwakarma", "artisan", "craftsman", "carpenter", "blacksmith", "₹15000 toolkit", "5% loan", "traditional trade"]
  },

  {
    id: "startup-india",
    name: "Startup India Scheme",
    nameHindi: "स्टार्टअप इंडिया योजना",
    category: "employment",
    ministry: "Ministry of Commerce & Industry / DPIIT",
    state: "central",
    targetGroup: ["entrepreneurs", "startups"],
    description: "Flagship initiative to build a strong ecosystem for nurturing innovation and startups in India — with tax exemptions, easier compliance, funding access, and mentorship.",
    benefitAmount: "3-year income tax exemption + fund of funds access + easier compliance",
    eligibility: [
      "Private limited company or LLP or registered partnership",
      "Incorporated/registered in India less than 10 years ago",
      "Annual turnover below ₹100 crore",
      "Working towards innovation/improvement of existing products/services",
      "Not formed by splitting existing business"
    ],
    benefits: [
      "DPIIT recognition certificate",
      "3-year income tax exemption (Section 80-IAC)",
      "Capital gains tax exemption",
      "Self-certification for 9 labour and environment laws",
      "Fast-track patent application at 80% reduced fee",
      "Access to ₹10,000 crore Fund of Funds",
      "Government procurement without prior experience",
      "Easy winding up within 90 days"
    ],
    documents: [
      "Company registration certificate (ROC)",
      "MOA/AOA (for company) or Partnership deed",
      "PAN of entity",
      "Details of founders",
      "Brief about innovation/business"
    ],
    applicationProcess: [
      "Visit startupindia.gov.in",
      "Register and apply for DPIIT recognition",
      "Fill details about the startup's innovation",
      "Upload incorporation documents",
      "Recognition granted within 2–3 working days",
      "Apply for tax exemptions separately at DPIIT"
    ],
    officialUrl: "https://www.startupindia.gov.in",
    applyUrl: "https://www.startupindia.gov.in/content/sih/en/startupgov/startup-recognition.html",
    helpline: "1800-115-565",
    isActive: true,
    tags: ["startup", "entrepreneur", "tax exemption", "DPIIT", "innovation", "funding", "patent"]
  }

];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────

export const getSchemesByCategory = (category) =>
  schemes.filter(s => s.category === category);

export const getSchemesByState = (state) =>
  schemes.filter(s => s.state === "central" || s.state === state);

export const searchSchemes = (query) => {
  const q = query.toLowerCase();
  return schemes.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.nameHindi.includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q)) ||
    s.targetGroup.some(g => g.toLowerCase().includes(q)) ||
    s.category.toLowerCase().includes(q)
  );
};

export const findEligibleSchemes = ({
  age,
  gender,
  category, // SC/ST/OBC/General/Minority
  income,
  occupation, // farmer/student/unemployed/worker/disabled/pregnant
  area,       // rural/urban
  state
}) => {
  return schemes.filter(scheme => {
    const t = scheme.targetGroup;
    // Basic matching logic
    if (occupation === "farmer" && !t.includes("farmers") && scheme.category !== "agriculture") return false;
    if (occupation === "student" && scheme.category !== "education" && !t.includes("students")) return false;
    if (gender === "female" && scheme.category === "women") return true;
    if (occupation === "disabled" && (scheme.category === "disability" || t.includes("disability"))) return true;
    return true; // Return all if no specific filter matches
  });
};

export const getSchemeById = (id) => schemes.find(s => s.id === id);

export const TOTAL_SCHEMES = schemes.length;
export const CATEGORIES_COUNT = SCHEME_CATEGORIES.length;
