# 环境变量配置指南

## 安全提醒 ⚠️
**API密钥已从代码中移除，现在必须通过环境变量配置！**

## 快速设置

### 1. 创建 .env 文件
在项目根目录创建 `.env` 文件：

```bash
# 在项目根目录运行
touch .env
```

### 2. 复制以下内容到 .env 文件

```env
# AI Model API Keys Configuration

# DeepSeek API Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com

# AIGC2D API Configuration  
AIGC2D_API_KEY=your_aigc2d_api_key_here
AIGC2D_BASE_URL=https://api.aigc2d.com/v1
```

### 3. 替换为您的真实API密钥

#### DeepSeek API密钥
1. 访问 [DeepSeek平台](https://platform.deepseek.com/api_keys)
2. 注册/登录账号
3. 创建API密钥
4. 复制密钥替换 `your_deepseek_api_key_here`

#### AIGC2D API密钥  
1. 访问 [AIGC2D平台](https://docs.aigc2d.com/)
2. 注册/登录账号
3. 获取API密钥
4. 复制密钥替换 `your_aigc2d_api_key_here`

## 安全说明

- ✅ `.env` 文件已在 `.gitignore` 中排除，不会被提交到版本控制
- ✅ 配置文件现在会检查环境变量，如未设置将抛出错误
- ✅ 避免了API密钥意外泄露到代码仓库
- ⚠️ 请勿将真实API密钥分享给他人
- ⚠️ 如果密钥意外泄露，请立即在平台上撤销并重新生成

## 测试配置

配置完成后，运行任意测试验证：

```bash
# 测试DeepSeek配置
yarn test:deepseek-chat

# 测试AIGC2D配置  
yarn test:gpt35
```

如果看到 "API_KEY is required" 错误，说明需要正确设置环境变量。
