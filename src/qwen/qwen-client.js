// Qwen API client using OpenAI SDK (compatible-mode)
const { OpenAI } = require('openai');
const config = require('./config');

class QwenClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL
    });
  }

  // Basic chat completion
  async chat(messages, model = config.models.qwen_plus, options = {}) {
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
      console.error('Qwen Chat API Error:', error.message);
      throw error;
    }
  }

  // Stream chat
  async streamChat(messages, onChunk, model = config.models.qwen_plus, options = {}) {
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
      console.error('Qwen Stream Chat Error:', error.message);
      throw error;
    }
  }
}

module.exports = QwenClient;



