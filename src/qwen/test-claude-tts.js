// Qwen TTS for Claude documentation text
const QwenTTSClient = require("./qwen-tts-client");
const path = require("path");

async function generateClaudeTTS() {
    console.log("🔊 Generating TTS for Claude documentation text\n");
    console.log("=".repeat(60));

    const client = new QwenTTSClient();

    const text = "Development guidelines cover environment variables, error handling, and file outputs";
    const voice = "Chelsie"; // Using a clear female voice

    console.log("📝 Text:", text);
    console.log("🎭 Voice:", voice);

    const outputDir = path.join(__dirname, "outputs");
    const outputPath = path.join(outputDir, `claude-guidelines-tts-${Date.now()}.mp3`);

    try {
        console.log("⏳ Synthesizing...");
        const startTime = Date.now();

        const result = await client.synthesizeToFile(text, outputPath, {
            voice: voice,
        });

        const duration = Date.now() - startTime;

        console.log(`✅ Synthesis completed (${duration}ms)`);
        console.log(`📁 File: ${path.basename(outputPath)} (${(result.audioSize / 1024).toFixed(2)}KB)`);
        console.log(`📂 Location: ${outputPath}`);

    } catch (error) {
        console.error("❌ TTS synthesis failed:", error.message);
        throw error;
    }

    console.log("\n" + "=".repeat(60));
    console.log("🎉 TTS generation completed successfully!");
}

if (require.main === module) {
    generateClaudeTTS();
}

module.exports = generateClaudeTTS;