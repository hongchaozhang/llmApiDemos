// Stream test with AIGC2D GPT models
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');

async function testStream() {
  console.log('🌊 测试AIGC2D流式输出功能...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  const messages = [
    { role: 'system', content: '你是一个创意写作助手，请用中文写作。' },
    { role: 'user', content: '请写一个关于程序员使用AI工具提高工作效率的小故事，大约200字。' }
  ];

  try {
    console.log('📝 正在生成回复（流式输出）：\n');
    console.log('📖 故事内容：');
    console.log('-'.repeat(40));
    
    let fullResponse = '';
    await client.streamChat(messages, (chunk) => {
      process.stdout.write(chunk);
      fullResponse += chunk;
    }, config.models.gpt35, {
      temperature: 0.8, // 更有创意的输出
      maxTokens: 400
    });
    
    console.log('\n' + '-'.repeat(40));
    console.log('\n✅ 流式输出完成！');
    console.log(`📏 总共生成了 ${fullResponse.length} 个字符`);
    console.log(`📝 使用模型: ${config.models.gpt35}`);
    
  } catch (error) {
    console.error('❌ 流式输出测试失败：', error.message);
  }
}

if (require.main === module) {
  testStream();
}

module.exports = testStream;
