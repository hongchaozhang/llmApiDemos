// Vision (image analysis) test with AIGC2D GPT-4V
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');

async function testVision() {
  console.log('👁️ 测试图像分析(Vision)功能...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  const testImages = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
      prompt: '请描述这张图片中的场景，包括天气、环境和主要元素。',
      description: '自然风景图片'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/No_Image_Available.jpg/300px-No_Image_Available.jpg',
      prompt: '这是什么图片？请分析图片的内容和用途。',
      description: '示例图片'
    }
  ];

  for (const imageInfo of testImages) {
    try {
      console.log(`📸 正在分析图片: ${imageInfo.description}`);
      console.log(`🔗 图片URL: ${imageInfo.url}`);
      console.log(`❓ 分析问题: "${imageInfo.prompt}"`);
      
      const startTime = Date.now();
      const response = await client.analyzeImage(imageInfo.url, imageInfo.prompt, {
        model: config.models.gpt4o,
        detail: 'auto',
        max_tokens: 300
      });
      const endTime = Date.now();
      
      console.log('✅ 图像分析成功！');
      console.log(`📝 分析结果:`);
      console.log(response.choices[0].message.content);
      console.log(`\n📊 使用统计:`);
      console.log(`- 输入tokens: ${response.usage.prompt_tokens}`);
      console.log(`- 输出tokens: ${response.usage.completion_tokens}`);
      console.log(`- 总共tokens: ${response.usage.total_tokens}`);
      console.log(`⏱️  分析耗时: ${endTime - startTime}ms\n`);
      
    } catch (error) {
      console.error(`❌ 图像分析失败:`, error.message);
      
      if (error.message.includes('model')) {
        console.log('💡 提示: 可能GPT-4V模型不可用，请检查AIGC2D支持的模型列表\n');
      } else if (error.message.includes('image')) {
        console.log('💡 提示: 图片URL可能无效或格式不支持\n');
      }
    }
    
    // 避免频率限制
    if (testImages.indexOf(imageInfo) < testImages.length - 1) {
      console.log('⏳ 等待2秒避免频率限制...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // 测试本地生成的图片分析
  console.log('🔍 尝试分析本地生成的图片...');
  
  // 注意：这里需要将本地图片上传到可访问的URL，或使用base64编码
  console.log('💡 本地图片分析说明：');
  console.log('- 可以使用base64编码的图片数据');
  console.log('- 或将图片上传到公开的图床服务');
  console.log('- 支持多种格式：PNG, JPEG, GIF, WebP');
  console.log('- 单张图片最大20MB');
  
  console.log('\n👁️ 图像分析测试完成！');
  console.log('💡 Vision功能可以识别图片内容、回答相关问题、提取文字等。');
}

if (require.main === module) {
  testVision();
}

module.exports = testVision;
