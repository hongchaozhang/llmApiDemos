// Speech to Text (STT) test with AIGC2D Whisper
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');

async function testSpeechToText() {
  console.log('🎤 测试语音识别(STT)功能...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  const outputDir = path.join(__dirname, 'outputs');
  
  // 检查是否有之前生成的音频文件
  const audioFiles = [
    { filename: 'hello-chinese.mp3', expectedLanguage: 'zh' },
    { filename: 'hello-english.mp3', expectedLanguage: 'en' }
  ];
  
  console.log('🔍 检查音频文件...');
  
  for (const audioInfo of audioFiles) {
    const audioPath = path.join(outputDir, audioInfo.filename);
    
    if (await fs.pathExists(audioPath)) {
      console.log(`📁 找到音频文件: ${audioInfo.filename}`);
      
      try {
        console.log(`🎧 正在识别语音内容...`);
        
        const startTime = Date.now();
        
        // 创建文件流
        const audioBuffer = await fs.readFile(audioPath);
        const audioFile = new File([audioBuffer], audioInfo.filename, {
          type: 'audio/mpeg'
        });
        
        const response = await client.speechToText(audioFile, {
          model: config.models.whisper,
          language: audioInfo.expectedLanguage,
          response_format: 'json',
          temperature: '0.0'
        });
        
        const endTime = Date.now();
        
        console.log('✅ 语音识别成功！');
        console.log(`📝 识别结果: "${response.text}"`);
        console.log(`🌍 检测语言: ${response.language || audioInfo.expectedLanguage}`);
        console.log(`⏱️  识别耗时: ${endTime - startTime}ms\n`);
        
      } catch (error) {
        console.error(`❌ 语音识别失败 (${audioInfo.filename}):`, error.message);
        
        if (error.message.includes('model')) {
          console.log('💡 提示: 可能Whisper模型不可用，请检查AIGC2D支持的模型列表\n');
        } else if (error.message.includes('file')) {
          console.log('💡 提示: 音频文件格式可能不支持，请尝试其他格式\n');
        }
      }
    } else {
      console.log(`⚠️  未找到音频文件: ${audioInfo.filename}`);
      console.log('💡 请先运行 yarn test:tts 生成测试音频文件\n');
    }
    
    // 避免频率限制
    if (audioFiles.indexOf(audioInfo) < audioFiles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 演示自定义音频识别
  console.log('📋 语音识别功能说明：');
  console.log('- 支持多种音频格式: mp3, wav, m4a, webm等');
  console.log('- 支持多语言识别，包括中文和英文');
  console.log('- 使用Whisper模型，具有高准确率');
  console.log('- 可以处理长达25MB的音频文件');
  
  console.log('\n🎤 语音识别测试完成！');
  console.log('💡 要测试自定义音频文件，请将文件放入outputs文件夹并修改代码中的文件名。');
}

if (require.main === module) {
  testSpeechToText();
}

module.exports = testSpeechToText;
