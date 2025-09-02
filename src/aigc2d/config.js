// AIGC2D API configuration
require('dotenv').config();

const config = {
  apiKey: process.env.AIGC2D_API_KEY || (() => {
    throw new Error('AIGC2D_API_KEY is required. Please set it in your .env file');
  })(),
  baseURL: process.env.AIGC2D_BASE_URL || 'https://api.aigc2d.com/v1',
  models: {
    // Chat models
    gpt35: 'gpt-3.5-turbo',
    gpt35_16k: 'gpt-3.5-turbo-16k',
    gpt4: 'gpt-4',
    gpt4_turbo: 'gpt-4-turbo-preview',
    gpt4o: 'gpt-4o',
    gpt4o_mini: 'gpt-4o-mini',
    
    // Image generation
    dalle2: 'dall-e-2',
    dalle3: 'dall-e-3',
    
    // Speech
    tts: 'tts-1',
    tts_hd: 'tts-1-hd',
    whisper: 'whisper-1'
  }
};

module.exports = config;
