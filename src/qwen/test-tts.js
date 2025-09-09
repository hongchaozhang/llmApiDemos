// Qwen TTS Demo with multiple voices
const QwenTTSClient = require("./qwen-tts-client");
const path = require("path");

async function demonstrateQwenTTS() {
    console.log("🚀 Qwen TTS 功能演示\n");
    console.log("=".repeat(60));

    const client = new QwenTTSClient();

    // Test different voices
    const testCases = [
        {
            //   text: '你好，我是通义千问的语音合成助手，很高兴为您服务！',
            text: "To support version management of Mosaic dataset objects, we are introducing Git-based version control. ",
            voice: "Chelsie",
            description: "女声 - 温和",
        },
        // {
        //   text: '这是一个测试语音，听起来怎么样呢？',
        //   voice: 'Cherry',
        //   description: '女声 - 活泼'
        // },
        // {
        //   text: '欢迎使用阿里云通义千问的文本转语音功能。',
        //   voice: 'Serena',
        //   description: '女声 - 甜美'
        // },
        // {
        //   text: '人工智能技术正在改变我们的生活方式。',
        //   voice: 'Ethan',
        //   description: '男声 - 磁性'
        // }
    ];

    const outputDir = path.join(__dirname, "outputs");

    console.log("🎭 可用音色：");
    client.getAvailableVoices().forEach((voice, index) => {
        console.log(`${index + 1}. ${voice}`);
    });
    console.log();

    for (const [index, testCase] of testCases.entries()) {
        console.log(
            `\n🎵 测试 ${index + 1}: ${testCase.description} (${
                testCase.voice
            })`
        );
        console.log("📝 文本:", testCase.text);

        const outputPath = path.join(
            outputDir,
            `qwen-tts-${testCase.voice.toLowerCase()}-${Date.now()}.mp3`
        );

        try {
            console.log("⏳ 合成中...");
            const startTime = Date.now();

            const result = await client.synthesizeToFile(
                testCase.text,
                outputPath,
                {
                    voice: testCase.voice,
                }
            );

            const duration = Date.now() - startTime;

            console.log(`✅ 合成完成 (${duration}ms)`);
            console.log(
                `📁 文件: ${path.basename(outputPath)} (${(
                    result.audioSize / 1024
                ).toFixed(2)}KB)`
            );
        } catch (error) {
            console.error(`❌ ${testCase.voice} 音色合成失败:`, error.message);
        }

        // Add delay between requests to avoid rate limiting
        if (index < testCases.length - 1) {
            console.log("⏱️  等待 2 秒...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }

    console.log("\n" + "=".repeat(60));
    console.log("🎉 Qwen TTS 演示完成！");
    console.log("📂 所有音频文件已保存到 outputs 目录");
}

if (require.main === module) {
    demonstrateQwenTTS();
}

module.exports = demonstrateQwenTTS;
