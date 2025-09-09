// Qwen (Tongyi Qianwen) API configuration using OpenAI-compatible mode
require('dotenv').config();

const config = {
  // Prefer DASHSCOPE_API_KEY to align with official docs; allow QWEN_API_KEY as alias
  apiKey: process.env.DASHSCOPE_API_KEY || process.env.QWEN_API_KEY || (() => {
    throw new Error('DASHSCOPE_API_KEY (or QWEN_API_KEY) is required. Please set it in your .env file');
  })(),
  // Region-specific baseURL: intl or cn. Allow override via env
  baseURL: process.env.QWEN_BASE_URL || process.env.DASHSCOPE_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  models: {
    // Common chat models
    qwen_max: 'qwen-max',
    qwen_plus: 'qwen-plus',
    qwen_turbo: 'qwen-turbo',
  }
};

module.exports = config;



