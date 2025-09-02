// GPT-3.5-turbo test with AIGC2D
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');

async function testGPT35() {
  console.log('🤖 测试GPT-3.5-turbo模型...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  const messages = [
    { role: 'system', content: '你是一个有用的AI助手，请用中文回答。' },
    { role: 'user', content: '请介绍一下GPT-3.5模型的特点和优势，控制在100字以内。' }
  ];

  try {
    const response = await client.chat(messages, config.models.gpt35);
    
    console.log('✅ GPT-3.5请求成功！');
    console.log('📝 模型:', response.model);
    console.log('🔤 回复内容：');
    console.log(response.choices[0].message.content);
    console.log('\n📊 使用统计：');
    console.log(`- 输入tokens: ${response.usage.prompt_tokens}`);
    console.log(`- 输出tokens: ${response.usage.completion_tokens}`);
    console.log(`- 总共tokens: ${response.usage.total_tokens}`);
    
  } catch (error) {
    console.error('❌ GPT-3.5测试失败：', error.message);
    
    // 尝试切换到备用地址
    if (error.message.includes('timeout') || error.message.includes('network')) {
      console.log('🔄 尝试使用备用地址...');
      const backupClient = new AIGC2DClient(true);
      try {
        const response = await backupClient.chat(messages, config.models.gpt35);
        console.log('✅ 备用地址请求成功！');
        console.log('📝 回复内容：', response.choices[0].message.content);
      } catch (backupError) {
        console.error('❌ 备用地址也失败：', backupError.message);
      }
    }
  }
}

if (require.main === module) {
  testGPT35();
}

module.exports = testGPT35;
