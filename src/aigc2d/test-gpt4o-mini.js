// GPT-4o-mini test with AIGC2D
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');

async function testGPT4oMini() {
  console.log('🚀 测试GPT-4o-mini模型...\n');
  
  const client = new AIGC2DClient();
  console.log('🌐 使用接口地址:', client.getCurrentURL());
  
  const messages = [
    { role: 'system', content: '你是一个编程专家，擅长解释技术概念。请用中文回答。' },
    { role: 'user', content: '请解释什么是API网关，它的主要作用是什么？并举一个实际应用的例子。' }
  ];

  try {
    const response = await client.chat(messages, config.models.gpt4o_mini, {
      temperature: 0.3, // 更严格的输出
      maxTokens: 500
    });
    
    console.log('✅ GPT-4o-mini请求成功！');
    console.log('📝 模型:', response.model);
    console.log('🔤 回复内容：');
    console.log(response.choices[0].message.content);
    console.log('\n📊 使用统计：');
    console.log(`- 输入tokens: ${response.usage.prompt_tokens}`);
    console.log(`- 输出tokens: ${response.usage.completion_tokens}`);
    console.log(`- 总共tokens: ${response.usage.total_tokens}`);
    
  } catch (error) {
    console.error('❌ GPT-4o-mini测试失败：', error.message);
    
    if (error.message.includes('model')) {
      console.log('💡 提示: 可能该模型不可用，请检查AIGC2D支持的模型列表');
    }
  }
}

if (require.main === module) {
  testGPT4oMini();
}

module.exports = testGPT4oMini;
