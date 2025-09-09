// Qwen API Demo - run tests
const testBasicChat = require('./test-basic-chat');
const testStream = require('./test-stream');
const testTTS = require('./test-tts');

async function runAllTests() {
  console.log('🚀 开始Qwen API演示\n');
  console.log('=' .repeat(50));

  try {
    // Chat tests
    await testBasicChat();
    console.log('\n' + '=' .repeat(50));

    await testStream();
    console.log('\n' + '=' .repeat(50));

    // TTS demo
    await testTTS();
    console.log('\n' + '=' .repeat(50));

    console.log('🎉 Qwen 所有测试完成！');
  } catch (error) {
    console.error('❌ 演示过程中出现错误：', error.message);
  }
}

if (require.main === module) {
  runAllTests();
}

module.exports = runAllTests;



