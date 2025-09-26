// Kimi API client using OpenAI SDK
const { OpenAI } = require('openai');
const config = require('./config');

class KimiClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL
    });
  }

  async chat(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: options.model || config.models.chat,
        messages: messages,
        stream: false,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        top_p: options.topP || 1,
        frequency_penalty: options.frequencyPenalty || 0,
        presence_penalty: options.presencePenalty || 0,
        ...options
      });
      return response;
    } catch (error) {
      console.error('Kimi Chat API Error:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      throw error;
    }
  }

  async streamChat(messages, onChunk, options = {}) {
    try {
      const stream = await this.client.chat.completions.create({
        model: options.model || config.models.chat,
        messages: messages,
        stream: true,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        top_p: options.topP || 1,
        frequency_penalty: options.frequencyPenalty || 0,
        presence_penalty: options.presencePenalty || 0,
        ...options
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
          fullResponse += content;
        }
      }

      return {
        fullResponse,
        usage: null // Kimi streaming doesn't include usage stats
      };
    } catch (error) {
      console.error('Kimi Stream Chat API Error:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      throw error;
    }
  }

  async chatWithModel(model, messages, options = {}) {
    return this.chat(messages, { ...options, model });
  }
}

module.exports = KimiClient;