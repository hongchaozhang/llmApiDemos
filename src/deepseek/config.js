// DeepSeek API configuration
require("dotenv").config();

const config = {
    apiKey: process.env.DEEPSEEK_API_KEY || (() => {
        throw new Error('DEEPSEEK_API_KEY is required. Please set it in your .env file');
    })(),
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    models: {
        chat: "deepseek-chat", // Non-thinking mode (DeepSeek-V3.1)
        reasoner: "deepseek-reasoner", // Thinking mode (DeepSeek-V3.1)
    },
};

module.exports = config;
