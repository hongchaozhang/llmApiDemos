// Qwen TTS client using DashScope native API
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

class QwenTTSClient {
  constructor() {
    this.apiKey = config.apiKey;
    this.baseURL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
  }

  // Text to speech synthesis
  async synthesize(text, options = {}) {
    try {
      const requestBody = {
        model: 'qwen-tts',
        input: {
          text: text,
          voice: options.voice || 'Chelsie'
        }
      };

      // Add optional parameters if provided
      if (options.speechRate) requestBody.input.speech_rate = options.speechRate;
      if (options.pitchRate) requestBody.input.pitch_rate = options.pitchRate;
      if (options.volume) requestBody.input.volume = options.volume;

      const response = await axios.post(this.baseURL, requestBody, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 seconds timeout
      });

      if (response.data.code) {
        throw new Error(`API Error: ${response.data.message} (Code: ${response.data.code})`);
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('TTS API Error Response:', error.response.data);
        throw new Error(`TTS API Error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error('TTS API Error: No response received');
      } else {
        console.error('TTS Error:', error.message);
        throw error;
      }
    }
  }

  // Synthesize and save to file
  async synthesizeToFile(text, outputPath, options = {}) {
    try {
      const result = await this.synthesize(text, options);
      
      if (!result.output || !result.output.audio || !result.output.audio.url) {
        throw new Error('No audio URL in response');
      }

      // Download audio file
      const audioResponse = await axios.get(result.output.audio.url, {
        responseType: 'arraybuffer',
        timeout: 60000 // 60 seconds for audio download
      });

      // Ensure output directory exists
      await fs.ensureDir(path.dirname(outputPath));

      // Save audio file
      await fs.writeFile(outputPath, audioResponse.data);

      return {
        ...result,
        audioPath: outputPath,
        audioSize: audioResponse.data.length
      };
    } catch (error) {
      console.error('Synthesize to file error:', error.message);
      throw error;
    }
  }

  // Get available voices (based on API error response - actual supported voices)
  getAvailableVoices() {
    return [
      'Chelsie',  // 女声，温和
      'Cherry',   // 女声，活泼
      'Serena',   // 女声，甜美
      'Ethan'     // 男声，磁性
    ];
  }
}

module.exports = QwenTTSClient;
