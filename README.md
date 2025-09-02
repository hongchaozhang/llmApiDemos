# AI 模型 API 测试项目

这是一个综合的AI模型API测试项目，支持多个AI服务平台：

## 支持的服务

### 🤖 DeepSeek API
基于 [DeepSeek API 文档](https://api-docs.deepseek.com/) 开发
- ✅ 基本聊天功能测试 (deepseek-chat)
- 🧠 推理模型测试 (deepseek-reasoner) 
- 🌊 流式输出测试

### 🚀 AIGC2D API网关
基于 [AIGC2D 文档](https://docs.aigc2d.com/guide/quick-start.html) 开发

**文本模型:**
- ✅ GPT-3.5-turbo模型测试
- 🚀 GPT-4o-mini模型测试
- 🌊 流式输出测试
- 🔄 模型对比测试

**多媒体功能:**
- 🔊 语音合成(TTS) - 文本转语音
- 🎤 语音识别(STT) - 音频转文本
- 🎨 图片生成(DALL-E) - AI绘画
- 👁️ 图像分析(Vision) - 图片内容理解

## 通用功能特点

- 📊 Token 使用统计
- 🛡️ 完善的错误处理
- 🔄 网络重试机制
- 📝 中文友好界面

## 环境配置

### 1. 安装依赖
```bash
yarn install
```

### 2. 配置API密钥 ⚠️ **必需步骤**

**重要安全更新：API密钥已从代码中移除，现在必须通过环境变量配置！**

#### 创建 .env 文件
在项目根目录创建 `.env` 文件：

```bash
touch .env
```

#### 添加API密钥到 .env 文件
```env
# DeepSeek API Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com

# AIGC2D API Configuration
AIGC2D_API_KEY=your_aigc2d_api_key_here
AIGC2D_BASE_URL=https://api.aigc2d.com/v1
```

#### 获取API密钥：
- **DeepSeek**: 访问 [DeepSeek平台](https://platform.deepseek.com/api_keys) 申请API密钥
- **AIGC2D**: 访问 [AIGC2D平台](https://docs.aigc2d.com/) 注册并获取API密钥

#### 安全说明：
- ✅ `.env` 文件已被 `.gitignore` 排除，不会提交到版本控制
- ⚠️ 如未正确配置环境变量，测试将显示错误提示
- 📖 详细配置步骤请查看 `setup-env-template.md` 文件

## 运行测试

### 运行完整演示
```bash
# DeepSeek 完整演示
yarn demo:deepseek

# AIGC2D GPT模型完整演示  
yarn demo:aigc2d

# AIGC2D 多媒体功能演示
yarn demo:multimedia
```

### DeepSeek 单独测试
```bash
# 基本聊天测试
yarn test:deepseek-chat

# 推理模型测试  
yarn test:deepseek-reasoner

# 流式输出测试
yarn test:deepseek-stream
```

### AIGC2D 文本模型测试
```bash
# GPT-3.5-turbo测试
yarn test:gpt35

# GPT-4o-mini测试
yarn test:gpt4o-mini

# 流式输出测试
yarn test:aigc2d-stream

# 模型对比测试
yarn test:models-comparison
```

### AIGC2D 多媒体功能测试
```bash
# 语音合成测试
yarn test:tts

# 语音识别测试
yarn test:stt

# 图片生成测试
yarn test:image-gen

# 图像分析测试
yarn test:vision
```

## 项目结构

```
src/
├── deepseek/                    # DeepSeek相关测试
│   ├── config.js               # DeepSeek API配置
│   ├── deepseek-client.js      # DeepSeek客户端封装
│   ├── demo.js                 # DeepSeek演示程序
│   ├── test-basic-chat.js      # 基本聊天测试
│   ├── test-reasoner.js        # 推理模型测试
│   └── test-stream.js          # 流式输出测试
└── aigc2d/                     # AIGC2D相关测试
    ├── config.js               # AIGC2D API配置
    ├── aigc2d-client.js        # AIGC2D客户端封装
    ├── demo.js                 # AIGC2D文本模型演示
    ├── multimedia-demo.js      # 多媒体功能演示
    ├── test-gpt35.js           # GPT-3.5测试
    ├── test-gpt4o-mini.js      # GPT-4o-mini测试
    ├── test-stream.js          # 流式输出测试
    ├── test-models-comparison.js # 模型对比测试
    ├── test-text-to-speech.js  # 语音合成测试
    ├── test-speech-to-text.js  # 语音识别测试
    ├── test-image-generation.js # 图片生成测试
    ├── test-vision.js          # 图像分析测试
    └── outputs/                # 生成文件输出目录
```

## API 模型说明

### DeepSeek 模型
- **deepseek-chat**: DeepSeek-V3.1 非思维模式，适用于一般对话和任务
- **deepseek-reasoner**: DeepSeek-V3.1 思维模式，适用于需要推理的复杂问题

### AIGC2D 支持的模型

**文本模型:**
- **gpt-3.5-turbo**: 快速、经济的通用模型
- **gpt-3.5-turbo-16k**: 支持更长上下文的GPT-3.5
- **gpt-4**: 更强的推理能力
- **gpt-4-turbo-preview**: GPT-4的优化版本
- **gpt-4o**: 最新的多模态模型
- **gpt-4o-mini**: 轻量级的GPT-4o版本

**多媒体模型:**
- **dall-e-2**: 图像生成模型（经济版）
- **dall-e-3**: 高质量图像生成模型
- **tts-1**: 语音合成模型（标准版）
- **tts-1-hd**: 高清语音合成模型
- **whisper-1**: 语音识别模型，支持多语言

## 代码示例

### DeepSeek 使用示例
```javascript
const DeepSeekClient = require('./src/deepseek/deepseek-client');

const client = new DeepSeekClient();

// 基本聊天
const response = await client.chat([
  { role: 'user', content: '你好！' }
]);

// 推理模型
const reasoned = await client.reason([
  { role: 'user', content: '解释一个数学问题...' }
]);

// 流式输出
await client.streamChat(messages, (chunk) => {
  process.stdout.write(chunk);
});
```

### AIGC2D 使用示例
```javascript
const AIGC2DClient = require('./src/aigc2d/aigc2d-client');
const config = require('./src/aigc2d/config');

const client = new AIGC2DClient();

// GPT-3.5 聊天
const response = await client.chat([
  { role: 'user', content: '你好！' }
], config.models.gpt35);

// GPT-4o-mini 聊天
const response = await client.chat([
  { role: 'user', content: '解释量子计算' }
], config.models.gpt4o_mini);

// 流式输出
await client.streamChat(messages, (chunk) => {
  process.stdout.write(chunk);
}, config.models.gpt35);

// 使用备用地址
const backupClient = new AIGC2DClient(true);

// 语音合成
const audioResponse = await client.textToSpeech('Hello, world!', {
  voice: 'alloy',
  model: config.models.tts
});

// 图片生成
const imageResponse = await client.generateImage('一只可爱的猫咪', {
  model: config.models.dalle3,
  size: '1024x1024',
  style: 'vivid'
});

// 语音识别
const audioFile = new File([audioBuffer], 'audio.mp3');
const transcription = await client.speechToText(audioFile);

// 图像分析
const analysis = await client.analyzeImage(imageUrl, '描述这张图片');
```

## 注意事项

- 🔑 确保已设置有效的 API 密钥
- 📈 注意 API 使用量和费率限制
- 🚦 测试之间有延迟以避免频率限制
- 🛡️ 所有错误都有适当的处理和提示
- 🌐 AIGC2D支持备用地址，网络问题时自动切换
- 💰 注意不同模型的计费标准

## 相关链接

### DeepSeek 相关
- [DeepSeek API 文档](https://api-docs.deepseek.com/)
- [DeepSeek 平台](https://platform.deepseek.com/)
- [API 密钥申请](https://platform.deepseek.com/api_keys)

### AIGC2D 相关
- [AIGC2D 快速开始](https://docs.aigc2d.com/guide/quick-start.html)
- [AIGC2D 平台](https://docs.aigc2d.com/)
- [AIGC2D OpenAI接口文档](https://docs.aigc2d.com/guide/openai/)

## 项目特色

🌟 **双平台支持**: 同时支持DeepSeek和AIGC2D两个AI服务平台  
🤖 **多模型测试**: 涵盖推理模型、聊天模型、不同规模的GPT模型  
🎨 **多媒体功能**: 语音合成、语音识别、图片生成、图像分析  
🛡️ **健壮性**: 完善的错误处理和网络重试机制  
📊 **使用统计**: 详细的token使用和性能统计  
🌊 **流式支持**: 支持实时流式输出  
🔄 **模型对比**: 直观的不同模型性能对比  
📁 **文件管理**: 自动保存生成的音频和图片文件  
🇨🇳 **中文友好**: 全中文界面和文档

## 🎯 多媒体功能详解

### 🔊 语音合成(TTS)
- **支持语言**: 中文、英文等多种语言
- **声音选项**: alloy, echo, fable, onyx, nova, shimmer
- **输出格式**: mp3, opus, aac, flac
- **应用场景**: 有声读物、语音助手、内容播音

### 🎨 图片生成(DALL-E)
- **模型版本**: DALL-E 2 (经济) / DALL-E 3 (高质量)
- **图片尺寸**: 256x256, 512x512, 1024x1024
- **风格选项**: vivid (鲜明) / natural (自然)
- **应用场景**: 创意设计、营销素材、插图制作

### 🎤 语音识别(STT)
- **支持格式**: mp3, mp4, mpeg, mpga, m4a, wav, webm
- **语言支持**: 中文、英文等99种语言
- **文件大小**: 最大25MB
- **应用场景**: 会议记录、字幕生成、语音转文档

### 👁️ 图像分析(Vision)
- **支持格式**: PNG, JPEG, GIF, WebP
- **分析能力**: 物体识别、文字提取、场景理解
- **最大尺寸**: 20MB
- **应用场景**: 图片标注、内容审核、辅助阅读
