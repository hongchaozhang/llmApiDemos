// Kimi API configuration
require('dotenv').config();

const config = {
  apiKey: process.env.KIMI_API_KEY || process.env.MOONSHOT_API_KEY || (() => {
    throw new Error('KIMI_API_KEY or MOONSHOT_API_KEY is required. Please set it in your .env file');
  })(),
  baseURL: process.env.KIMI_BASE_URL || process.env.MOONSHOT_BASE_URL || 'https://api.moonshot.cn/v1',
  models: {
    chat: 'moonshot-v1-8k',
    chat32k: 'moonshot-v1-32k',
    chat128k: 'moonshot-v1-128k'
  }
};

module.exports = config;