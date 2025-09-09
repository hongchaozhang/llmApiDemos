// Basic chat test with Qwen
const QwenClient = require('./qwen-client');

async function testBasicChat() {
  console.log('🤖 测试Qwen基本聊天功能...\n');

  const client = new QwenClient();

  const messages = [
    { role: 'system', content: 'You are a helpful assistant that responds in Chinese.' },
    { role: 'user', content: '请用三句话介绍一下通义千问。' }
  ];

  try {
    const response = await client.chat(messages);
    console.log('✅ 请求成功！');
    console.log('📝 回复内容：');
    console.log(response.choices[0].message.content);
    if (response.usage) {
      console.log('\n📊 使用统计：');
      console.log(`- 输入tokens: ${response.usage.prompt_tokens}`);
      console.log(`- 输出tokens: ${response.usage.completion_tokens}`);
      console.log(`- 总共tokens: ${response.usage.total_tokens}`);
    }
  } catch (error) {
    console.error('❌ 测试失败：', error.message);
  }
}

if (require.main === module) {
  testBasicChat();
}

module.exports = testBasicChat;



