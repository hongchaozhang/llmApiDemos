// Text to Speech (TTS) test with AIGC2D
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');

async function testTextToSpeech() {
  console.log('🔊 测试语音合成(TTS)功能...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  // 创建输出目录
  const outputDir = path.join(__dirname, 'outputs');
  await fs.ensureDir(outputDir);
  
  const testTexts = [
    {
      text: 'Hello, this is a text-to-speech test using AIGC2D platform.',
      filename: 'hello-english.mp3',
      voice: 'nova'
    }
  ];

  for (const testItem of testTexts) {
    try {
      console.log(`📝 正在合成语音: "${testItem.text}"`);
      console.log(`🎭 使用声音: ${testItem.voice}`);
      
      const startTime = Date.now();
      const response = await client.textToSpeech(testItem.text, {
        voice: testItem.voice,
        model: config.models.tts,
        response_format: 'mp3',
        speed: '1.0'
      });
      const endTime = Date.now();
      
      // 保存音频文件
      const outputPath = path.join(outputDir, testItem.filename);
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(outputPath, buffer);
      
      console.log('✅ 语音合成成功！');
      console.log(`📁 文件已保存: ${outputPath}`);
      console.log(`📊 文件大小: ${(buffer.length / 1024).toFixed(2)} KB`);
      console.log(`⏱️  合成耗时: ${endTime - startTime}ms\n`);
      
    } catch (error) {
      console.error(`❌ 语音合成失败 (${testItem.voice}):`, error.message);
      
      if (error.message.includes('model')) {
        console.log('💡 提示: 可能该TTS模型不可用，请检查AIGC2D支持的模型列表\n');
      }
    }
    
    // 避免频率限制
    if (testTexts.indexOf(testItem) < testTexts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('🎵 语音合成测试完成！');
  console.log('💡 可以使用音频播放器播放生成的文件。');
}

if (require.main === module) {
  testTextToSpeech();
}

module.exports = testTextToSpeech;
