// Compare different GPT models via AIGC2D
const AIGC2DClient = require('./aigc2d-client');
const config = require('./config');

async function compareModels() {
  console.log('🔄 比较不同GPT模型的表现...\n');
  
  const client = new AIGC2DClient();
  
  const testQuestion = '请用一句话解释什么是人工智能。';
  const messages = [
    { role: 'system', content: '请简洁准确地回答问题。' },
    { role: 'user', content: testQuestion }
  ];

  // 要测试的模型列表
  const modelsToTest = [
    { name: 'GPT-3.5-turbo', model: config.models.gpt35 },
    { name: 'GPT-4o-mini', model: config.models.gpt4o_mini }
  ];

  console.log(`❓ 测试问题: "${testQuestion}"\n`);
  console.log('=' .repeat(60));

  for (const modelInfo of modelsToTest) {
    console.log(`\n🤖 测试模型: ${modelInfo.name}`);
    console.log('-' .repeat(30));
    
    try {
      const startTime = Date.now();
      const response = await client.chat(messages, modelInfo.model, {
        temperature: 0.3,
        maxTokens: 100
      });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log('✅ 请求成功');
      console.log(`📝 回答: ${response.choices[0].message.content}`);
      console.log(`⏱️  响应时间: ${responseTime}ms`);
      console.log(`📊 Tokens: 输入${response.usage.prompt_tokens} | 输出${response.usage.completion_tokens} | 总计${response.usage.total_tokens}`);
      
    } catch (error) {
      console.log(`❌ 测试失败: ${error.message}`);
    }
    
    // 避免频率限制
    if (modelsToTest.indexOf(modelInfo) < modelsToTest.length - 1) {
      console.log('⏳ 等待2秒避免频率限制...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('🏁 模型比较完成！');
}

if (require.main === module) {
  compareModels();
}

module.exports = compareModels;
