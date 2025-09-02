// Image generation test with AIGC2D DALL-E
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');
const https = require('https');
const fs = require('fs-extra');
const path = require('path');

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (error) => {
      fs.unlink(filepath);
      reject(error);
    });
  });
}

async function testImageGeneration() {
  console.log('🎨 测试图片生成(DALL-E)功能...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  // 创建输出目录
  const outputDir = path.join(__dirname, 'outputs');
  await fs.ensureDir(outputDir);
  
  const prompts = [
    {
      prompt: '一只可爱的橙色猫咪坐在彩虹桥上，背景是星空，卡通风格',
      filename: 'cute-cat-rainbow.png',
      model: config.models.dalle3,
      size: '1024x1024',
      style: 'vivid'
    },
    {
      prompt: 'A futuristic city skyline at sunset with flying cars, cyberpunk style',
      filename: 'cyberpunk-city.png',
      model: config.models.dalle3,
      size: '1024x1024',
      style: 'natural'
    }
  ];

  for (const promptItem of prompts) {
    try {
      console.log(`🎭 正在生成图片...`);
      console.log(`📝 提示词: "${promptItem.prompt}"`);
      console.log(`🤖 使用模型: ${promptItem.model}`);
      console.log(`📏 图片尺寸: ${promptItem.size}`);
      
      const startTime = Date.now();
      const response = await client.generateImage(promptItem.prompt, {
        model: promptItem.model,
        size: promptItem.size,
        style: promptItem.style,
        quality: 'standard',
        n: 1
      });
      const endTime = Date.now();
      
      if (response.data && response.data.length > 0) {
        const imageUrl = response.data[0].url;
        const outputPath = path.join(outputDir, promptItem.filename);
        
        // 下载并保存图片
        await downloadImage(imageUrl, outputPath);
        
        console.log('✅ 图片生成成功！');
        console.log(`🔗 图片URL: ${imageUrl}`);
        console.log(`📁 文件已保存: ${outputPath}`);
        console.log(`⏱️  生成耗时: ${endTime - startTime}ms`);
        
        // 检查文件大小
        const stats = await fs.stat(outputPath);
        console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)} KB\n`);
        
      } else {
        console.log('❌ 没有收到图片数据\n');
      }
      
    } catch (error) {
      console.error(`❌ 图片生成失败:`, error.message);
      
      if (error.message.includes('content_policy')) {
        console.log('💡 提示: 提示词可能违反了内容政策，请修改提示词\n');
      } else if (error.message.includes('model')) {
        console.log('💡 提示: 可能该图片生成模型不可用，请检查AIGC2D支持的模型列表\n');
      }
    }
    
    // 避免频率限制
    if (prompts.indexOf(promptItem) < prompts.length - 1) {
      console.log('⏳ 等待3秒避免频率限制...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('🎨 图片生成测试完成！');
  console.log('💡 可以查看outputs文件夹中的生成图片。');
}

if (require.main === module) {
  testImageGeneration();
}

module.exports = testImageGeneration;
