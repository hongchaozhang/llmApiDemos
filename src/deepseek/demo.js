// DeepSeek API Demo - 运行所有测试
const testBasicChat = require('./test-basic-chat');
const testReasoner = require('./test-reasoner');
const testStream = require('./test-stream');

async function runAllTests() {
  console.log('🚀 开始DeepSeek API演示\n');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Basic Chat
    // await testBasicChat();
    // console.log('\n' + '=' .repeat(50));
    
    // // Wait a bit to avoid rate limiting
    // console.log('⏳ 等待2秒避免频率限制...\n');
    // await new Promise(resolve => setTimeout(resolve, 2000));
    
    // // Test 2: Reasoner
    // await testReasoner();
    // console.log('\n' + '=' .repeat(50));
    
    // // Wait a bit to avoid rate limiting
    // console.log('⏳ 等待2秒避免频率限制...\n');
    // await new Promise(resolve => setTimeout(resolve, 2000));
    
    // // Test 3: Stream
    await testStream();
    console.log('\n' + '=' .repeat(50));
    
    console.log('🎉 所有测试完成！');
    
  } catch (error) {
    console.error('❌ 演示过程中出现错误：', error.message);
  }
}

// 如果直接运行此文件，则执行演示
if (require.main === module) {
  runAllTests();
}

module.exports = runAllTests;
