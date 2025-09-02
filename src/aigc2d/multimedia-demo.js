// AIGC2D 多媒体功能综合演示
const testTextToSpeech = require('./test-text-to-speech');
const testImageGeneration = require('./test-image-generation');
const testSpeechToText = require('./test-speech-to-text');
const testVision = require('./test-vision');

async function runMultimediaDemo() {
  console.log('🎬 开始AIGC2D多媒体功能综合演示\n');
  console.log('=' .repeat(60));
  
  try {
    // Demo 1: 语音合成
    console.log('🔊 第一部分：语音合成演示');
    console.log('-' .repeat(30));
    await testTextToSpeech();
    console.log('\n' + '=' .repeat(60));
    
    // Wait to avoid rate limiting
    console.log('⏳ 等待5秒避免频率限制...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Demo 2: 图片生成
    console.log('🎨 第二部分：图片生成演示');
    console.log('-' .repeat(30));
    await testImageGeneration();
    console.log('\n' + '=' .repeat(60));
    
    // Wait to avoid rate limiting
    console.log('⏳ 等待5秒避免频率限制...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Demo 3: 语音识别
    console.log('🎤 第三部分：语音识别演示');
    console.log('-' .repeat(30));
    await testSpeechToText();
    console.log('\n' + '=' .repeat(60));
    
    // Wait to avoid rate limiting
    console.log('⏳ 等待3秒避免频率限制...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Demo 4: 图像分析
    console.log('👁️ 第四部分：图像分析演示');
    console.log('-' .repeat(30));
    await testVision();
    console.log('\n' + '=' .repeat(60));
    
    console.log('🎉 AIGC2D多媒体功能演示完成！\n');
    
    console.log('📋 功能总结：');
    console.log('✅ 语音合成(TTS): 文本转换为自然语音');
    console.log('✅ 图片生成(DALL-E): 根据描述生成高质量图片');
    console.log('✅ 语音识别(STT): 音频转换为文本');
    console.log('✅ 图像分析(Vision): 分析和理解图片内容');
    
    console.log('\n💡 应用场景：');
    console.log('🎯 内容创作: 生成图片、音频、文本内容');
    console.log('🎯 辅助工具: 语音转文字、图片理解');
    console.log('🎯 教育培训: 多媒体学习材料制作');
    console.log('🎯 企业应用: 自动化内容生成和处理');
    
    console.log('\n📁 生成文件位置：src/aigc2d/outputs/');
    console.log('🔗 查看生成的音频和图片文件');
    
  } catch (error) {
    console.error('❌ 多媒体演示过程中出现错误：', error.message);
  }
}

// 如果直接运行此文件，则执行演示
if (require.main === module) {
  runMultimediaDemo();
}

module.exports = runMultimediaDemo;
