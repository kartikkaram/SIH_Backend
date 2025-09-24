import axios from "axios";

export const getAiScore = async (videoUrl) => {
  try {
    // Replace with your actual AI API endpoint
    const apiEndpoint = "https://your-ai-api.com/score-video";

    const response = await axios.post(apiEndpoint, {
      videoUrl, // send the Cloudinary URL
    });

    if (!response.data || typeof response.data.score !== "number") {
      throw new Error("Invalid AI API response");
    }

    return response.data.score; // numeric score
  } catch (err) {
    console.error("AI scoring error:", err.message);
    throw new Error("AI scoring failed");
  }
};