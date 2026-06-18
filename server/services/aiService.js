

// const { GoogleGenAI } = require("@google/genai");

// exports.generateItinerary = async (extractedText) => {
//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: `You are an expert travel planner. Analyze the following travel booking documents and generate a detailed day-by-day travel itinerary.

// Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
// {
//   "title": "Trip to [Destination]",
//   "summary": "2-3 line overview",
//   "travelers": "names if available",
//   "flights": [{"flightNo":"","airline":"","from":"","to":"","departure":"","arrival":"","class":""}],
//   "hotels": [{"name":"","location":"","checkIn":"","checkOut":"","nights":0,"confirmationNo":""}],
//   "days": [{"day":1,"date":"","location":"","activities":[{"time":"09:00 AM","activity":"","type":"sightseeing","notes":""}]}],
//   "tips": ["tip 1","tip 2"]
// }

// Travel Booking Documents:
// ${extractedText}`,
//   });

//   const raw = response.text.replace(/```json|```/g, "").trim();

//   try {
//     return JSON.parse(raw);
//   } catch {
//     return {
//       title: "Travel Itinerary",
//       summary: "Generated from your booking documents",
//       flights: [],
//       hotels: [],
//       days: [],
//       tips: [],
//     };
//   }
// };



exports.generateItinerary = async (extractedText) => {
  return {
    title: "Trip to Delhi & Agra",
    summary: "A 3-day trip covering Delhi and Agra with flights and hotel stays.",
    travelers: "1 passenger",
    flights: [{ flightNo: "6E-123", airline: "IndiGo", from: "Mumbai (BOM)", to: "Delhi (DEL)", departure: "June 25, 2026 06:00 AM", arrival: "June 25, 2026 08:15 AM", class: "Economy" }],
    hotels: [{ name: "Taj Palace New Delhi", location: "New Delhi", checkIn: "June 25, 2026", checkOut: "June 28, 2026", nights: 3, confirmationNo: "HTL987654" }],
    days: [
      { day: 1, date: "June 25, 2026", location: "Delhi", activities: [{ time: "08:30 AM", activity: "Arrive at Delhi Airport", type: "travel", notes: "Take cab to hotel" }, { time: "02:00 PM", activity: "Visit Red Fort", type: "sightseeing", notes: "UNESCO World Heritage Site" }] },
      { day: 2, date: "June 26, 2026", location: "Agra", activities: [{ time: "09:00 AM", activity: "Visit Taj Mahal", type: "sightseeing", notes: "Arrive early to avoid crowds" }, { time: "03:00 PM", activity: "Visit Agra Fort", type: "sightseeing", notes: "Mughal architecture" }] },
      { day: 3, date: "June 27, 2026", location: "Delhi", activities: [{ time: "10:00 AM", activity: "Visit Qutub Minar", type: "sightseeing", notes: "Tallest brick minaret" }, { time: "06:00 PM", activity: "Return flight to Mumbai", type: "flight", notes: "Reach airport 2 hours early" }] }
    ],
    tips: ["Carry valid photo ID", "Book Taj Mahal tickets online", "Avoid peak afternoon heat", "Keep cash handy"]
  };
};