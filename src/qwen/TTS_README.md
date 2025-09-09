# Qwen TTS (Text-to-Speech) Demo

这个目录包含了通义千问（Qwen）文本转语音功能的演示代码。

## 文件说明

- `qwen-tts-client.js` - Qwen TTS 客户端，使用 DashScope 原生 API
- `test-tts.js` - 基本 TTS 功能测试
- `demo-tts.js` - 多音色 TTS 演示
- `outputs/` - 生成的音频文件保存目录

## 使用前准备

1. 确保你的 `.env` 文件中设置了 `DASHSCOPE_API_KEY`：
   ```
   DASHSCOPE_API_KEY=你的API密钥
   ```

2. 安装依赖（如果还没有安装）：
   ```bash
   npm install axios fs-extra
   ```

## 运行演示

### 快速测试
```bash
npm run test:qwen-tts
```

### 多音色演示
```bash
npm run demo:qwen-tts
```

### 完整演示（包含聊天和TTS）
```bash
npm run demo:qwen
```

## 支持的音色

- **Chelsie** - 女声，温和
- **Cherry** - 女声，活泼  
- **Serena** - 女声，甜美
- **Ethan** - 男声，磁性

## API 参数

TTS 客户端支持以下参数：

- `text` - 要转换的文本（必需）
- `voice` - 音色选择（默认：'Chelsie'）
- `speechRate` - 语速调节（可选）
- `pitchRate` - 音调调节（可选）
- `volume` - 音量调节（可选）

## 示例代码

```javascript
const QwenTTSClient = require('./qwen-tts-client');

const client = new QwenTTSClient();

// 基本使用
await client.synthesizeToFile(
  '你好，世界！', 
  './output.mp3', 
  { voice: 'Chelsie' }
);

// 带参数使用
await client.synthesizeToFile(
  '这是一个语速较快的语音测试', 
  './output.mp3', 
  { 
    voice: 'Serena',
    speechRate: 1.2,
    volume: 90
  }
);
```

## 注意事项

1. 生成的音频文件为 MP3 格式
2. 文件会自动保存到 `outputs` 目录
3. API 调用有频率限制，演示中加入了延迟
4. 确保网络连接稳定，音频文件需要下载
