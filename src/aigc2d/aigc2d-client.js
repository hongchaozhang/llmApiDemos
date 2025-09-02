// AIGC2D API client using OpenAI SDK
const { OpenAI } = require('openai');
const config = require('./config');

class AIGC2DClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL
    });
    this.currentURL = config.baseURL;
  }

  // Basic chat completion
  async chat(messages, model = config.models.gpt35, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: messages,
        stream: options.stream || false,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        ...options
      });

      return response;
    } catch (error) {
      console.error('AIGC2D Chat API Error:', error.message);
      throw error;
    }
  }

  // Stream chat
  async streamChat(messages, onChunk, model = config.models.gpt35, options = {}) {
    try {
      const stream = await this.client.chat.completions.create({
        model: model,
        messages: messages,
        stream: true,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        ...options
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content && onChunk) {
          onChunk(content);
        }
      }
    } catch (error) {
      console.error('AIGC2D Stream Chat Error:', error.message);
      throw error;
    }
  }

  // Get available models
  async listModels() {
    try {
      const response = await this.client.models.list();
      return response;
    } catch (error) {
      console.error('List Models Error:', error.message);
      throw error;
    }
  }

  // Image generation using DALL-E
  async generateImage(prompt, options = {}) {
    try {
      const response = await this.client.images.generate({
        model: options.model || config.models.dalle3,
        prompt: prompt,
        n: options.n || 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        style: options.style || 'vivid',
        response_format: options.response_format || 'url'
      });

      return response;
    } catch (error) {
      console.error('Image Generation Error:', error.message);
      throw error;
    }
  }

  // Text to speech
  async textToSpeech(text, options = {}) {
    try {
      const response = await this.client.audio.speech.create({
        model: options.model || config.models.tts,
        voice: options.voice || 'alloy',
        input: text,
        response_format: options.response_format || 'mp3',
        speed: options.speed || '1.0'
      });

      return response;
    } catch (error) {
      console.error('Text to Speech Error:', error.message);
      throw error;
    }
  }

  // Speech to text (Whisper)
  async speechToText(audioFile, options = {}) {
    try {
      const response = await this.client.audio.transcriptions.create({
        file: audioFile,
        model: options.model || config.models.whisper,
        language: options.language || 'zh',
        response_format: options.response_format || 'json',
        temperature: options.temperature || 0.0
      });

      return response;
    } catch (error) {
      console.error('Speech to Text Error:', error.message);
      throw error;
    }
  }

  // Vision (image analysis)
  async analyzeImage(imageUrl, prompt, options = {}) {
    try {
      const messages = [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: options.detail || 'auto'
              }
            }
          ]
        }
      ];

      const response = await this.client.chat.completions.create({
        model: options.model || config.models.gpt4o,
        messages: messages,
        max_tokens: options.max_tokens || 300
      });

      return response;
    } catch (error) {
      console.error('Image Analysis Error:', error.message);
      throw error;
    }
  }

  // Get current URL
  getCurrentURL() {
    return this.currentURL;
  }
}

module.exports = AIGC2DClient;
