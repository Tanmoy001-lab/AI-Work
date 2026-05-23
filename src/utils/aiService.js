import { mockSchemes, mockCollegesExams, mockStatusChecks, mockFormTemplates } from './mockDatabase';
import { translations } from './translations';

// Simple answer cache to avoid repeated AI/Database queries
const answerCache = {};

/**
 * Searches the mock database for relevant terms to provide instant high-fidelity guided answers.
 */
function searchLocalDatabase(query, lang = 'en') {
  const q = query.toLowerCase();
  
  // 1. Check schemes
  for (const scheme of mockSchemes) {
    if (q.includes(scheme.name.toLowerCase()) || 
        q.includes(scheme.id.replace('-', ' ')) || 
        (lang === 'hi' && q.includes('किसान')) ||
        (q.includes('scheme') && q.includes(scheme.category.toLowerCase()))) {
      return formatSchemeAnswer(scheme, lang);
    }
  }

  // 2. Check colleges / exams
  for (const item of mockCollegesExams) {
    if (q.includes(item.name.toLowerCase()) || 
        q.includes(item.id.replace('-', ' ')) || 
        (lang === 'hi' && item.name.includes('दिल्ली') && q.includes('प्रवेश')) ||
        q.includes(item.id.split('-')[0])) {
      return formatCollegeExamAnswer(item, lang);
    }
  }

  // 3. Check status checks
  for (const status of mockStatusChecks) {
    if (q.includes(status.name.toLowerCase()) || 
        q.includes(status.id.replace('-', ' ')) || 
        q.includes('status') && q.includes(status.id.split('-')[0]) ||
        (lang === 'hi' && q.includes('आधार') && q.includes('पैन')) ||
        (lang === 'hi' && q.includes('पासपोर्ट'))) {
      return formatStatusAnswer(status, lang);
    }
  }

  // Generic templates
  if (q.includes('document') || q.includes('कागजात') || q.includes('दस्तावेज')) {
    return {
      text: lang === 'hi' 
        ? "भारतीय सरकारी सेवाओं (जैसे आधार, पैन, डीएल) के लिए आवश्यक सामान्य दस्तावेज:\n1. पहचान का प्रमाण (आधार, पैन, वोटर आईडी)\n2. पते का प्रमाण (बिजली बिल, राशन कार्ड, आधार)\n3. जन्म तिथि का प्रमाण (कक्षा 10वीं की अंकतालिका, जन्म प्रमाण पत्र)\n\nसलाह: सभी दस्तावेजों में आपके नाम की स्पेलिंग और जन्म तिथि बिल्कुल समान होनी चाहिए।"
        : "Standard documents required for most Indian Government services:\n1. Proof of Identity (Aadhaar, PAN, Voter ID)\n2. Proof of Address (Electricity bill, Ration Card, Aadhaar)\n3. Proof of Date of Birth (Class 10 marksheet, Birth Certificate)\n\nTip: Ensure name spellings and DOB match exactly across all documents to prevent processing rejections.",
      source: "UIDAI, IT Department",
      updated: "2026-05-23",
      related: ["Aadhaar-PAN linking status", "How to apply for new PAN Card", "Passport documents required"]
    };
  }

  return null;
}

function formatSchemeAnswer(scheme, lang) {
  const isHi = lang === 'hi';
  let text = `### **${scheme.name}**\n\n`;
  text += isHi ? `💰 **लाभ विवरण:** ${scheme.benefit}\n` : `💰 **Benefit:** ${scheme.benefit}\n`;
  text += isHi ? `📋 **पात्रता मानदंड:** ${scheme.criteria}\n\n` : `📋 **Eligibility:** ${scheme.criteria}\n\n`;
  
  text += isHi ? `📁 **आवश्यक दस्तावेज़:**\n` : `📁 **Required Documents:**\n`;
  scheme.requiredDocs.forEach(doc => { text += `- ${doc}\n`; });
  
  text += isHi ? `\n🛠️ **आवेदन कैसे करें (चरण-दर-चरण):**\n` : `\n🛠️ **How to Apply (Step-by-Step):**\n`;
  scheme.steps.forEach((step, i) => { text += `${i + 1}. ${step}\n`; });
  
  text += isHi 
    ? `\n⏰ **अंतिम तिथि:** ${scheme.deadline === 'Open throughout the year' ? 'पूरे वर्ष खुला है' : scheme.deadline}`
    : `\n⏰ **Deadline:** ${scheme.deadline}`;

  return {
    text,
    source: scheme.name,
    officialLink: scheme.officialLink,
    updated: "2026-05-23",
    related: ["What documents are required for Aadhaar?", "Check NPCI Bank Seeding status"]
  };
}

function formatCollegeExamAnswer(item, lang) {
  const isHi = lang === 'hi';
  let text = `### **${item.name}**\n\n`;
  text += isHi ? `📅 **महत्वपूर्ण तिथियां:** ${item.dates}\n` : `📅 **Dates:** ${item.dates}\n`;
  text += isHi ? `💵 **आवेदन शुल्क:** ${item.fees}\n` : `💵 **Application Fees:** ${item.fees}\n`;
  text += isHi ? `🎓 **पात्रता:** ${item.eligibility}\n\n` : `🎓 **Eligibility:** ${item.eligibility}\n\n`;
  
  text += isHi ? `📁 **आवश्यक दस्तावेज़:**\n` : `📁 **Required Documents:**\n`;
  item.requiredDocs.forEach(doc => { text += `- ${doc}\n`; });
  
  text += isHi ? `\n📝 **आवेदन करने की प्रक्रिया:**\n` : `\n📝 **Application Process:**\n`;
  item.process.forEach((step, i) => { text += `${i + 1}. ${step}\n`; });
  
  if (item.cutoffs) {
    text += isHi ? `\n📊 **कट-ऑफ विवरण:** ${item.cutoffs}` : `\n📊 **Last Year Cutoffs:** ${item.cutoffs}`;
  }

  return {
    text,
    source: item.name,
    officialLink: item.website,
    updated: "2026-05-23",
    related: [`CUET UG required documents`, `Delhi University admission guidelines`]
  };
}

function formatStatusAnswer(status, lang) {
  const isHi = lang === 'hi';
  let text = `### **${status.name}**\n\n`;
  text += isHi ? `📁 **आवश्यक विवरण/दस्तावेज:**\n` : `📁 **Required Details:**\n`;
  status.requiredDocs.forEach(doc => { text += `- ${doc}\n`; });
  
  text += isHi ? `\n🔍 **जाँच करने के चरण:**\n` : `\n🔍 **Step-by-Step Tracking Guide:**\n`;
  status.steps.forEach((step, i) => { text += `${i + 1}. ${step}\n`; });
  
  text += isHi ? `\n⚠️ **संभावित समस्याएं और उनके समाधान:**\n` : `\n⚠️ **Common Issues & Solutions:**\n`;
  status.issues.forEach(issue => {
    text += `* **${issue.problem}**: ${issue.solution}\n`;
  });

  return {
    text,
    source: status.name,
    officialLink: status.officialLink,
    updated: "2026-05-23",
    related: ["Aadhaar Update process", "Voter ID application lookup"]
  };
}

/**
 * Handles Q&A using the Gemini API client side if a key is configured,
 * otherwise falls back beautifully to semantic matching in our mock database.
 */
export async function getAIAnswer(question, lang = 'en', userProfile = null) {
  const cacheKey = `${lang}:${question.trim().toLowerCase()}`;
  if (answerCache[cacheKey]) {
    return answerCache[cacheKey];
  }

  // 1. Try local database matching first (perfect for offline & zero-latency typical questions)
  const localMatch = searchLocalDatabase(question, lang);
  if (localMatch) {
    answerCache[cacheKey] = localMatch;
    return localMatch;
  }

  // 2. Check if a Gemini API Key is saved in localStorage (Settings panel)
  const apiKey = localStorage.getItem('jan_sahayak_gemini_api_key');
  if (apiKey) {
    try {
      const response = await callGeminiAPI(question, lang, apiKey, userProfile);
      answerCache[cacheKey] = response;
      return response;
    } catch (e) {
      console.error("Gemini API Error, falling back to smart generation", e);
    }
  }

  // 3. Fallback standard AI response generator
  // Synthesizes a structured answer utilizing local translations and user profile details if available
  const result = generateGenericFallback(question, lang, userProfile);
  answerCache[cacheKey] = result;
  return result;
}

/**
 * Directly invokes Gemini API client side
 */
async function callGeminiAPI(question, lang, apiKey, userProfile) {
  const systemPrompt = `You are JanSahayak AI, a helpful Indian government services and admissions assistant.
Answer questions about Indian government documents (Aadhaar, PAN, Passport, DL, Voter ID, Bank Aadhaar Seeding), university admissions (DU, etc.), entrance exams (CUET, JEE, NEET), and schemes (PM Kisan, Ayushman Bharat, Post Matric Scholarship).
Always answer in the language the user is asking in.
Give direct, simple, step-by-step answers.
Include document requirements, fees, and deadlines when relevant.
Always add links to official portals (e.g. uidai.gov.in, pmkisan.gov.in, etc.) for registration.
If you're unsure about current dates, say so honestly and suggest checking the official website.
Current date: 2026-05-23.
User details for context if helpful (Do not disclose storage mechanism): ${userProfile ? JSON.stringify(userProfile) : 'None'}.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${question}` }] }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I could not generate an answer right now.";

  return {
    text,
    source: "JanSahayak Live Gemini AI",
    updated: "Live Check",
    related: ["How to check Aadhaar link status", "Trending Indian schemes for EWS"]
  };
}

/**
 * Generates a high quality response when offline/no API key exists and query doesn't match predefined database.
 */
function generateGenericFallback(question, lang, userProfile) {
  const isHi = lang === 'hi';
  const q = question.toLowerCase();
  
  // Custom greeting / conversational response
  if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('नमस्ते') || q.includes('कौन')) {
    return {
      text: isHi
        ? "नमस्ते! मैं जनसहायक AI हूँ। मैं आधार, पैन, ड्राइविंग लाइसेंस, सरकारी योजनाओं, छात्रवृत्ति और कॉलेज प्रवेश फॉर्म के संबंध में आपकी सहायता कर सकता हूँ। आप मुझसे हिंदी या अन्य क्षेत्रीय भाषाओं में बोलकर या लिखकर सवाल पूछ सकते हैं।\n\nआप आज क्या जानकारी प्राप्त करना चाहते हैं?"
        : "Namaste! I am JanSahayak AI. I can guide you through government documents (Aadhaar, PAN, DL), national/state schemes, scholarships, and university entrance exams. You can speak or write to me in any of the 9 Indian languages.\n\nWhat can I help you with today?",
      source: "JanSahayak System Voice",
      updated: "2026-05-23",
      related: ["PM Kisan Scheme Eligibility", "Check Aadhaar PAN Link status"]
    };
  }

  // Standard generic template tailored with user profile details
  let userName = userProfile?.fullName || (isHi ? "उपयोगकर्ता" : "User");
  let userState = userProfile?.state || "India";
  let userCategory = userProfile?.category || "General";
  
  let text = isHi
    ? `नमस्ते ${userName}, आपके प्रश्न **"${question}"** के बारे में हमारे पास तत्काल रिकॉर्ड नहीं है।\n\n**सामान्य दिशा-निर्देश:**\n1. सभी सरकारी तथा कॉलेज फॉर्मों में अपने विवरण आधार कार्ड के स्पेलिंग के अनुसार ही भरें।\n2. यदि आप ${userState} से हैं, तो राज्य स्तर की योजनाओं के लिए आपको वहां का मूल निवासी (Domicile) प्रमाण पत्र होना अनिवार्य है।\n3. ${userCategory} श्रेणी के तहत लाभ प्राप्त करने के लिए नवीनतम जाति प्रमाण पत्र तैयार रखें।\n\nक्या आप इससे जुड़े किसी विशेष दस्तावेज़ (जैसे आधार, पैन या छात्रवृत्ति) की खोज करना चाहते हैं?`
    : `Hello ${userName}, regarding your query **"${question}"**, here are some key guidance points based on your profile in ${userState}:\n\n**General Guidelines:**\n1. Ensure your profile name matches your Aadhaar records exactly before applying to any colleges or schemes.\n2. Since you reside in ${userState}, ensure you possess a valid domicile certificate for local reservation benefits.\n3. As a ${userCategory} category member, keep your caste/EWS certificate updated (issued after March 31, 2026) for reservations.\n\nWould you like to check one of our document checklists (Aadhaar, PAN, Passport, DL) or find specific local schemes?`;

  return {
    text,
    source: "JanSahayak Dynamic Guidance",
    updated: "2026-05-23",
    related: ["Search Matching Schemes", "Check CUET application checklist"]
  };
}
