export const mockSchemes = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi Yojana",
    benefit: "₹6,000 per year (in 3 equal installments of ₹2,000)",
    category: "Farmer",
    gender: "All",
    states: ["All", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Maharashtra", "Tamil Nadu", "Andhra Pradesh", "Karnataka"],
    maxIncome: 300000,
    minAge: 18,
    maxAge: 100,
    criteria: "Small and marginal farmers holding cultivable land up to 2 hectares in their name.",
    requiredDocs: ["Aadhaar Card", "Land Ownership Papers (Khasra/Khatauni)", "Bank Account Passbook", "Mobile Number linked with Aadhaar"],
    steps: [
      "Visit official website pmkisan.gov.in",
      "Click on 'New Farmer Registration'",
      "Enter Aadhaar number and select state",
      "Fill registration details and land record information",
      "Upload documents and submit form"
    ],
    officialLink: "https://pmkisan.gov.in/",
    deadline: "Open throughout the year"
  },
  {
    id: "post-matric-sc",
    name: "Post Matric Scholarship Scheme for SC Students",
    benefit: "100% Tuition fee waiver + Monthly maintenance allowance up to ₹1,200",
    category: "Student",
    gender: "All",
    states: ["All"],
    maxIncome: 250000,
    minAge: 15,
    maxAge: 30,
    criteria: "Students belonging to Scheduled Caste (SC) studying at post-matriculation or post-secondary level.",
    requiredDocs: ["Caste Certificate", "Income Certificate (issued by competent authority)", "Class 10/12 Marksheet", "Fee Receipt of Current Year", "Aadhaar Card", "Bank Passbook"],
    steps: [
      "Register on National Scholarship Portal (scholarships.gov.in)",
      "Select 'Post Matric SC Scholarship' under Ministry of Social Justice",
      "Fill academic, personal, and bank details",
      "Upload caste, income, and marksheets",
      "Submit and take a printout for college verification"
    ],
    officialLink: "https://scholarships.gov.in/",
    deadline: "2026-11-30"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PM-JAY) Health Card",
    benefit: "Free health insurance cover up to ₹5,00,000 per family per year for secondary/tertiary hospitalisation",
    category: "All",
    gender: "All",
    states: ["All"],
    maxIncome: 120000,
    minAge: 0,
    maxAge: 110,
    criteria: "Families listed in SECC-2011 database, low-income households, landless laborers, or manual scavengers.",
    requiredDocs: ["Aadhaar Card", "Ration Card (NFSA)", "Active Mobile Number", "Government ID Proof"],
    steps: [
      "Go to pmjay.gov.in or visit the nearest Ayushman Mitra at a government hospital",
      "Click 'Am I Eligible' and enter mobile number to check SECC record",
      "If eligible, go to nearest Common Service Center (CSC) with Aadhaar and Ration Card",
      "Get e-KYC done using fingerprint or iris scan",
      "Download and print the Golden Ayushman Card"
    ],
    officialLink: "https://pmjay.gov.in/",
    deadline: "No deadline (Continuous scheme)"
  },
  {
    id: "pm-awas-urban",
    name: "Pradhan Mantri Awas Yojana (Urban)",
    benefit: "Interest subsidy of up to 6.5% on housing loans or direct grant of ₹1.5 Lakh for house construction",
    category: "All",
    gender: "All",
    states: ["All"],
    maxIncome: 600000,
    minAge: 21,
    maxAge: 70,
    criteria: "Families belonging to EWS (income < 3L) or LIG (income 3L-6L) who do not own a pucca house anywhere in India.",
    requiredDocs: ["Aadhaar Card", "Income Proof / Salary Slip", "Bank Statement (6 months)", "Affidavit stating no pucca house ownership", "Land registry papers (if applicable)"],
    steps: [
      "Visit pmaymis.gov.in",
      "Click 'Citizen Assessment' and select 'Benefit under other 3 components'",
      "Enter Aadhaar details to verify",
      "Complete the application form with personal, income, and bank details",
      "Save application number for tracking"
    ],
    officialLink: "https://pmaymis.gov.in/",
    deadline: "2026-12-31"
  },
  {
    id: "ladli-behna",
    name: "Mukhyamantri Ladli Behna Yojana (MP)",
    benefit: "₹1,250 transferred directly to bank account every month",
    category: "Women",
    gender: "Female",
    states: ["Madhya Pradesh"],
    maxIncome: 250000,
    minAge: 21,
    maxAge: 60,
    criteria: "Married/widowed/divorced women residing in Madhya Pradesh, with family income under ₹2.5 Lakh and landholding under 5 acres.",
    requiredDocs: ["Samagra ID (Family & Personal)", "Aadhaar Card", "Bank Account linked with Aadhaar & DBT enabled", "Mobile Number"],
    steps: [
      "Go to your local Gram Panchayat or Ward Office",
      "Submit the pre-filled application form to the camp coordinator",
      "The official will perform live e-KYC using biometric authentication",
      "Confirm that Aadhaar-Bank Seeding & DBT are active",
      "Receive confirmation message and track status online"
    ],
    officialLink: "https://cmladlibahna.mp.gov.in/",
    deadline: "Monthly registrations"
  }
];

export const mockCollegesExams = [
  {
    id: "cuet-ug",
    type: "exam",
    name: "CUET (UG) - Common University Entrance Test",
    stream: "Arts, Science, Commerce",
    state: "All India",
    status: "Open",
    fees: "General: ₹750 | OBC: ₹700 | SC/ST/PwD: ₹650",
    dates: "Application Window: Feb 20 - April 15, 2026. Exam: May 15 - May 31, 2026.",
    requiredDocs: ["Class 10 Marksheet", "Class 12 Marksheet (or appearing admit card)", "Passport Photo (white background, JPEG)", "Scanned Signature (JPEG)", "Category Certificate (SC/ST/OBC/EWS) if applicable"],
    eligibility: "Passed Class 12 or equivalent exam from a recognized board. No age limit.",
    process: [
      "Go to exams.nta.ac.in/CUET-UG/",
      "Register using Email ID and Mobile number",
      "Fill Personal Details & Education Qualification",
      "Select Exam Center Cities and University-Course preferences",
      "Upload photo, signature, and category certificate",
      "Pay application fees online and print confirmation page"
    ],
    website: "https://exams.nta.ac.in/CUET-UG/",
    cutoffs: "Varies by participating universities. High demand courses in DU require 98+ percentile."
  },
  {
    id: "du-admission",
    type: "college",
    name: "Delhi University (DU) Undergraduate Admission",
    stream: "Arts, Science, Commerce",
    state: "Delhi",
    status: "Closed",
    fees: "CSAS Registration: ₹250 (General/OBC) | ₹100 (SC/ST/PwD)",
    dates: "Portal opens in June 2026 (Expected post-CUET results). First cutoff/allotment in July 2026.",
    requiredDocs: ["CUET UG Scorecard", "Class 10 Certificate (for Date of Birth)", "Class 12 Marksheet", "Category Certificate (OBC-NCL/EWS issued after March 31, 2026)", "Aadhaar Card"],
    eligibility: "Must have appeared in CUET UG in subjects corresponding to Class 12 choices.",
    process: [
      "Register on DU CSAS (Common Seat Allocation System) portal du.ac.in",
      "Login using CUET Application Number",
      "Phase 1: Enter personal details and academic scores",
      "Phase 2: Fill colleges and programs preferences in order of choice",
      "Phase 3: Accept seat allocation, verify documents, and pay fees online"
    ],
    website: "https://admission.uod.ac.in/",
    cutoffs: "Previous Year Cutoffs: BA Hons Political Science (Hindu College) - 795/800, BCom Hons (SRCC) - 797/800, BSc Hons Physics (Stephen's) - 785/800."
  },
  {
    id: "jee-main",
    type: "exam",
    name: "JEE Main (Joint Entrance Examination)",
    stream: "Engineering / Science",
    state: "All India",
    status: "Closed",
    fees: "Male (Gen/OBC): ₹1,000 | Female/SC/ST: ₹500",
    dates: "Session 1: Jan 2026. Session 2: April 2026. Registrations typically start in November.",
    requiredDocs: ["Class 10 Certificate", "Class 12 Marksheet", "Category Certificate", "Passport Photo with name and date printed", "Left-hand thumb impression"],
    eligibility: "Passed Class 12 with Physics, Chemistry, and Mathematics. No age bar, but restricted to 3 consecutive years.",
    process: [
      "Register on jeemain.nta.nic.in",
      "Complete application form and generate Application Number",
      "Upload image credentials according to sizing specifications (Passport size: 10-200KB)",
      "Pay fees using Net Banking/UPI",
      "Save receipt and download Admit Card when available"
    ],
    website: "https://jeemain.nta.ac.in/",
    cutoffs: "Previous JEE Main Cutoff for JEE Advanced: General - 93.23, OBC-NCL - 79.67, SC - 51.93, ST - 37.18 percentile."
  },
  {
    id: "neet-ug",
    type: "exam",
    name: "NEET UG (National Eligibility cum Entrance Test)",
    stream: "Medical (MBBS, BDS, AYUSH)",
    state: "All India",
    status: "Open",
    fees: "General: ₹1,700 | OBC: ₹1,600 | SC/ST: ₹1,000",
    dates: "Application Window: March 9 - May 5, 2026. Exam: May 3, 2026.",
    requiredDocs: ["Passport Photo (white background, with name/date)", "Postcard Size Photo (4x6 inch)", "Signature", "Left and Right hands fingers & thumb impressions", "Class 10 Certificate", "Citizenship Certificate (if applicable)"],
    eligibility: "Minimum 17 years of age as of Dec 31 of the admission year. Passed Class 12 with Physics, Chemistry, Biology, and English (minimum 50% aggregate for General, 40% for SC/ST/OBC).",
    process: [
      "Go to neet.nta.nic.in and create login ID",
      "Complete the application form details carefully (no correction window guaranteed)",
      "Upload scanned photos and thumb prints (ensure correct background and size limits)",
      "Submit fee payment and print confirmation page"
    ],
    website: "https://neet.nta.nic.in/",
    cutoffs: "Previous Qualifying Cutoff: General - 137/720 (50th percentile), OBC/SC/ST - 107/720 (40th percentile)."
  }
];

export const mockStatusChecks = [
  {
    id: "aadhaar-pan",
    name: "Aadhaar-PAN Card Linking Status",
    officialLink: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status",
    requiredDocs: ["PAN Card Number", "Aadhaar Card Number"],
    steps: [
      "Go to the Income Tax e-Filing portal link-aadhaar-status page.",
      "Enter your 10-character alphanumeric PAN Number (e.g. ABCDE1234F).",
      "Enter your 12-digit Aadhaar Card Number.",
      "Click on the 'View Link Aadhaar Status' button.",
      "If linked, it will say: 'Your PAN is already linked to given Aadhaar'. If not, click the link to pay ₹1,000 penalty and link them immediately."
    ],
    issues: [
      {
        problem: "Name Mis-match error",
        solution: "Your name spelling on Aadhaar must exactly match PAN. If there is a mismatch, update PAN details using NSDL or Aadhaar details using UIDAI first, then apply for linking."
      },
      {
        problem: "Date of Birth Mis-match",
        solution: "Apply for a correction in either PAN or Aadhaar card so they have the identical date, month, and year of birth."
      }
    ]
  },
  {
    id: "passport-track",
    name: "Passport Application Tracking",
    officialLink: "https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew",
    requiredDocs: ["File Number (found on the fee acknowledgment receipt)", "Applicant's Date of Birth"],
    steps: [
      "Open the official Passport Seva status tracker.",
      "Select 'Application Type' as 'Passport/PCC/IC/GEP'.",
      "Enter your 15-digit File Number (e.g. DL1071234567823).",
      "Input your Date of Birth in DD/MM/YYYY format.",
      "Click 'Track Status' to see live status: 'Pending for police verification', 'Printed', or 'Dispatched via Speed Post'."
    ],
    issues: [
      {
        problem: "Status shows 'Adverse Police Verification'",
        solution: "Visit your local police station or passport office (RPO) with proof of address and identity to clear any address doubts."
      },
      {
        problem: "Status shows 'Returned undelivered'",
        solution: "This means Speed Post returned your passport because house was locked. Visit your local Speed Post hub or write to the RPO with tracking details for re-dispatch."
      }
    ]
  },
  {
    id: "driving-licence",
    name: "Driving Licence (DL) Status",
    officialLink: "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do",
    requiredDocs: ["DL Application Number (or DL number if already issued)", "Applicant's Date of Birth", "State in which applied"],
    steps: [
      "Open Sarathi Parivahan portal, select your State.",
      "From the top menu, hover over 'Application Status' or click 'Driving Licence' -> 'Services on DL'.",
      "Enter your Application Number or DL Number (e.g. DL-1320230004561) and DOB.",
      "Solve the CAPTCHA and click 'Submit' to view approval status, driving test results, and dispatch details."
    ],
    issues: [
      {
        problem: "Invalid DL format error",
        solution: "Standard Indian DL format is: State Code (2 letters) + RTO Code (2 digits) + Year (4 digits) + 7 digits serial number (e.g. DL13 2023 0001234). Do not include spaces or slashes unless specified."
      }
    ]
  },
  {
    id: "voter-id-status",
    name: "Voter ID Card (EPIC) Status & Correction",
    officialLink: "https://voters.eci.gov.in/",
    requiredDocs: ["EPIC Card Number (Voter ID Number) OR Reference Form ID"],
    steps: [
      "Visit the Voters Service Portal (voters.eci.gov.in).",
      "To check application: Click 'Track Application Status', enter Reference ID (received when applying).",
      "To check Voter list name: Click 'Search in Electoral Roll', enter EPIC Number, State, and CAPTCHA.",
      "If your name is listed, you can download your e-EPIC (digital voter card) PDF instantly."
    ],
    issues: [
      {
        problem: "Name not found in Electoral Roll despite having Card",
        solution: "Your voter card might be active, but if your name is deleted from the village/ward list, you cannot vote. Immediately file Form 6 online to add your name to the current roll."
      }
    ]
  },
  {
    id: "bank-aadhaar-seeding",
    name: "Bank Account Aadhaar Seeding (NPCI Mapping)",
    officialLink: "https://resident.uidai.gov.in/bank-mapper",
    requiredDocs: ["Aadhaar Card Number", "Mobile number linked with Aadhaar"],
    steps: [
      "Open the UIDAI Aadhaar Bank Mapping portal (or access NPCI tracker).",
      "Enter your 12-digit Aadhaar Number and solving security verification CAPTCHA.",
      "Click 'Send OTP'. You will receive a 6-digit OTP on your Aadhaar-registered mobile.",
      "Enter OTP and click 'Submit'. The screen will show which Bank is currently mapped to your Aadhaar for Direct Benefit Transfer (DBT) and whether seeding is 'Active'."
    ],
    issues: [
      {
        problem: "No Bank Mapped / Inactive DBT status",
        solution: "Your government subsidies (scholarships, PM-Kisan) will bounce. Visit your bank branch and submit a physical 'Aadhaar DBT Seeding Consent Form', requesting them to map your account on the NPCI mapper."
      }
    ]
  }
];

export const mockFormTemplates = [
  {
    id: "pan-card",
    title: "New PAN Card Form Guidance (Form 49A)",
    category: "Government",
    officialLink: "https://www.tin-nsdl.com/services/pan/pan-index.html",
    steps: [
      {
        fieldId: "fullName",
        label: "Full Name (पूरा नाम)",
        type: "text",
        placeholder: "e.g. Ramesh Kumar",
        englishTooltip: "Enter your full name. Do not use initials. It must match your Aadhaar name exactly.",
        localTooltip: "यहाँ अपना पूरा नाम लिखें, जैसा आपके आधार कार्ड पर छपा है। शॉर्टकट (जैसे R. K.) का उपयोग न करें।",
        warning: "Spellings must be exact. Match Aadhaar letters."
      },
      {
        fieldId: "dob",
        label: "Date of Birth (जन्म तिथि)",
        type: "date",
        englishTooltip: "Select your Date of Birth in DD/MM/YYYY format.",
        localTooltip: "अपनी जन्म तिथि चुनें। यह आपके स्कूल प्रमाण पत्र या आधार के समान होनी चाहिए।",
        warning: "Ensure your age is verified."
      },
      {
        fieldId: "fatherName",
        label: "Father's Name (पिता का नाम)",
        type: "text",
        placeholder: "e.g. Suresh Kumar",
        englishTooltip: "Enter father's full name. Even married women must write father's name, not husband's name.",
        localTooltip: "अपने पिता का नाम दर्ज करें। विवाहित महिलाओं को भी यहाँ पति का नहीं, बल्कि पिता का नाम लिखना होगा।",
        warning: "Write father's full legal name."
      },
      {
        fieldId: "email",
        label: "Email Address (ईमेल पता)",
        type: "email",
        placeholder: "e.g. ramesh@gmail.com",
        englishTooltip: "Enter your active email to receive the digital e-PAN PDF within 48 hours.",
        localTooltip: "अपनी चालू ईमेल आईडी दर्ज करें। डिजिटल ई-पैन (PDF) इसी ईमेल पर 2 दिनों में भेजा जाएगा।",
        warning: "Make sure you have access to this email."
      },
      {
        fieldId: "mobile",
        label: "Mobile Number (मोबाइल नंबर)",
        type: "tel",
        placeholder: "e.g. 9876543210",
        englishTooltip: "Enter mobile number linked to Aadhaar for OTP verification.",
        localTooltip: "अपना आधार से जुड़ा मोबाइल नंबर डालें, जिस पर ई-केवाईसी का ओटीपी प्राप्त हो सके।",
        warning: "Must be active for receiving SMS OTPs."
      },
      {
        fieldId: "aadhaarNum",
        label: "Aadhaar Last 4 Digits (आधार के अंतिम 4 अंक)",
        type: "password",
        placeholder: "e.g. 4321",
        englishTooltip: "Enter the last 4 digits of your Aadhaar card. We do not store this data.",
        localTooltip: "अपने आधार कार्ड के अंतिम 4 अंक लिखें। सुरक्षा कारणों से हम आपकी पूरी आधार संख्या कभी संग्रहित नहीं करते।",
        warning: "Never share your full Aadhaar number anywhere."
      }
    ],
    mistakes: [
      "Writing Husband's name: PAN rules strictly require Father's name for all individuals.",
      "Using Initials: Forms get rejected if you write 'R. K. Sharma' instead of 'Rajesh Kumar Sharma'.",
      "DBT status missing: If bank account is not linked, you can't get refund checks from income tax."
    ]
  },
  {
    id: "cuet-ug-form",
    title: "CUET UG Entrance Exam Form Guidance",
    category: "Exam",
    officialLink: "https://exams.nta.ac.in/CUET-UG/",
    steps: [
      {
        fieldId: "candidateName",
        label: "Candidate Full Name (उम्मीदवार का नाम)",
        type: "text",
        placeholder: "e.g. Sunita Devi",
        englishTooltip: "Write name as shown on Class 10 Certificate.",
        localTooltip: "उम्मीदवार का पूरा नाम लिखें जो कक्षा 10 के प्रमाण पत्र पर लिखा हुआ है।",
        warning: "Mismatch with class 10 record will reject registration."
      },
      {
        fieldId: "class10Score",
        label: "Class 10 Percentage / CGPA (कक्षा 10 का परिणाम)",
        type: "number",
        placeholder: "e.g. 84.5",
        englishTooltip: "Enter total aggregate score of Class 10 board exam.",
        localTooltip: "कक्षा 10 बोर्ड परीक्षा में प्राप्त कुल प्रतिशत या सीजीपीए दर्ज करें।",
        warning: "Write aggregate of all major subjects."
      },
      {
        fieldId: "subjectsChoice",
        label: "Subject Domain Selection (परीक्षा के विषय)",
        type: "text",
        placeholder: "e.g. Physics, Chemistry, Mathematics, English",
        englishTooltip: "Choose subjects you studied in Class 12. Universities require matches.",
        localTooltip: "उन विषयों को चुनें जो आपने कक्षा 12 में पढ़े हैं। कॉलेज प्रवेश के लिए यह विषय मिलना आवश्यक है।",
        warning: "Do not select subjects you didn't have in Class 12."
      },
      {
        fieldId: "categorySelect",
        label: "Category (वर्ग / श्रेणी)",
        type: "select",
        options: ["General", "OBC-NCL", "SC", "ST", "EWS"],
        englishTooltip: "Select category. OBC and EWS certificates must be current (issued after March 31).",
        localTooltip: "अपनी आरक्षित श्रेणी चुनें। ध्यान दें, ओबीसी-एनसीएल और ईडब्ल्यूएस प्रमाण पत्र 31 मार्च के बाद का होना चाहिए।",
        warning: "Wrong category claims can lead to seat cancellation."
      }
    ],
    mistakes: [
      "Selecting subjects not in Class 12: You will be disqualified from colleges like DU which enforce matching rules.",
      "Uploading low-resolution documents: Photos and signatures must meet strict pixel and size limits (10KB - 200KB).",
      "Incorrect exam center: Fill preference 1 closest to your hometown as centers are allotted fast."
    ]
  }
];
