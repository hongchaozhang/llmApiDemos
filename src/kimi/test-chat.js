// Kimi basic chat test
const KimiClient = require('./kimi-client');

async function testChat() {
  console.log('🧪 测试 Kimi 基础聊天功能...\n');

  const client = new KimiClient();

  const messages = [
    {
      role: 'system',
      content: '你是一个 helpful AI 助手，名字是 Kimi。请用中文回答用户的问题。'
    },
    {
      role: 'user',
      content: '你好！请介绍一下你自己，并告诉我今天天气如何？'
    }
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
  testChat();
}

module.exports = testChat;