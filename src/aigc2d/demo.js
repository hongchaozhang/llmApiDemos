// AIGC2D GPT models demo - 运行所有测试
const testGPT35 = require('./test-gpt35');
const testGPT4oMini = require('./test-gpt4o-mini');
const testStream = require('./test-stream');
const compareModels = require('./test-models-comparison');

async function runAllTests() {
  console.log('🚀 开始AIGC2D GPT模型演示\n');
  console.log('=' .repeat(60));
  
  try {
    // Test 1: GPT-3.5-turbo
    await testGPT35();
    console.log('\n' + '=' .repeat(60));
    
    // // Wait to avoid rate limiting
    // console.log('⏳ 等待3秒避免频率限制...\n');
    // await new Promise(resolve => setTimeout(resolve, 3000));
    
    // // Test 2: GPT-4o-mini
    // await testGPT4oMini();
    // console.log('\n' + '=' .repeat(60));
    
    // // Wait to avoid rate limiting
    // console.log('⏳ 等待3秒避免频率限制...\n');
    // await new Promise(resolve => setTimeout(resolve, 3000));
    
    // // Test 3: Stream
    // await testStream();
    // console.log('\n' + '=' .repeat(60));
    
    // // Wait to avoid rate limiting
    // console.log('⏳ 等待3秒避免频率限制...\n');
    // await new Promise(resolve => setTimeout(resolve, 3000));
    
    // // Test 4: Compare models
    // await compareModels();
    // console.log('\n' + '=' .repeat(60));
    
    // console.log('🎉 AIGC2D所有测试完成！');
    // console.log('\n💡 提示:');
    // console.log('- 如果测试失败，请检查AIGC2D API密钥是否正确');
    // console.log('- 如果网络问题，可以尝试备用地址: https://apigw.aigc2d.com');
    // console.log('- 访问 https://docs.aigc2d.com 查看更多文档');
    
  } catch (error) {
    console.error('❌ 演示过程中出现错误：', error.message);
  }
}

// 如果直接运行此文件，则执行演示
if (require.main === module) {
  runAllTests();
}

module.exports = runAllTests;
