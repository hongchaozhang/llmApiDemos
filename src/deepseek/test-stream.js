// Stream chat test with DeepSeek
const DeepSeekClient = require('./deepseek-client');

async function testStream() {
  console.log('🌊 测试流式聊天功能...\n');
  
  const client = new DeepSeekClient();
  
  const messages = [
    { role: 'system', content: 'You are a creative writer. Respond in Chinese.' },
    { role: 'user', content: '请写一个关于AI和人类协作的短故事，大约200字' }
  ];

  try {
    console.log('📝 正在生成回复（流式输出）：\n');
    
    let fullResponse = '';
    await client.streamChat(messages, (chunk) => {
      process.stdout.write(chunk);
      fullResponse += chunk;
    });
    
    console.log('\n\n✅ 流式输出完成！');
    console.log(`📏 总共输出了 ${fullResponse.length} 个字符`);
    
  } catch (error) {
    console.error('❌ 流式聊天测试失败：', error.message);
  }
}

if (require.main === module) {
  testStream();
}

module.exports = testStream;
