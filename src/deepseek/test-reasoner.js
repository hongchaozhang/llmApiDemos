// Reasoning model test with DeepSeek
const DeepSeekClient = require('./deepseek-client');

async function testReasoner() {
  console.log('🧠 测试推理模型功能...\n');
  
  const client = new DeepSeekClient();
  
  const messages = [
    { role: 'system', content: 'You are a helpful assistant that can reason step by step. Respond in Chinese.' },
    { role: 'user', content: '有一个房间里有3只猫，每只猫能抓到2只老鼠，但是房间里只有5只老鼠。请分析这个情况并解释结果。' }
  ];

  try {
    const response = await client.reason(messages);
    
    console.log('✅ 推理模型请求成功！');
    console.log('🤔 推理过程和结果：');
    console.log(response.choices[0].message.content);
    console.log('\n📊 使用统计：');
    console.log(`- 输入tokens: ${response.usage.prompt_tokens}`);
    console.log(`- 输出tokens: ${response.usage.completion_tokens}`);
    console.log(`- 总共tokens: ${response.usage.total_tokens}`);
    
  } catch (error) {
    console.error('❌ 推理模型测试失败：', error.message);
  }
}

if (require.main === module) {
  testReasoner();
}

module.exports = testReasoner;
