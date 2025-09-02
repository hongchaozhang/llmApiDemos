// Basic chat test with DeepSeek
const DeepSeekClient = require('./deepseek-client');

async function testBasicChat() {
  console.log('🤖 测试基本聊天功能...\n');
  
  const client = new DeepSeekClient();
  
  const messages = [
    { role: 'system', content: 'You are a helpful assistant that responds in Chinese.' },
    { role: 'user', content: '请简单介绍一下DeepSeek模型的特点' }
  ];

  try {
    const response = await client.chat(messages);
    
    console.log('✅ 请求成功！');
    console.log('📝 回复内容：');
    console.log(response.choices[0].message.content);
    console.log('\n📊 使用统计：');
    console.log(`- 输入tokens: ${response.usage.prompt_tokens}`);
    console.log(`- 输出tokens: ${response.usage.completion_tokens}`);
    console.log(`- 总共tokens: ${response.usage.total_tokens}`);
    
  } catch (error) {
    console.error('❌ 测试失败：', error.message);
  }
}

if (require.main === module) {
  testBasicChat();
}

module.exports = testBasicChat;
