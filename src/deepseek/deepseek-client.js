// DeepSeek API client using OpenAI SDK
const { OpenAI } = require('openai');
const config = require('./config');

class DeepSeekClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL
    });
  }

  // Basic chat completion
  async chat(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: config.models.chat,
        messages: messages,
        stream: options.stream || false,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        ...options
      });

      return response;
    } catch (error) {
      console.error('Chat API Error:', error.message);
      throw error;
    }
  }

  // Reasoning model (thinking mode)
  async reason(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: config.models.reasoner,
        messages: messages,
        stream: options.stream || false,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        ...options
      });

      return response;
    } catch (error) {
      console.error('Reasoner API Error:', error.message);
      throw error;
    }
  }

  // Stream chat
  async streamChat(messages, onChunk, options = {}) {
    try {
      const stream = await this.client.chat.completions.create({
        model: config.models.chat,
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
      console.error('Stream Chat Error:', error.message);
      throw error;
    }
  }
}

module.exports = DeepSeekClient;
