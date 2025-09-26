# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Installation & Setup
```bash
yarn install
```

### Environment Configuration
Create `.env` file with required API keys:
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
AIGC2D_API_KEY=your_aigc2d_api_key_here
AIGC2D_BASE_URL=https://api.aigc2d.com/v1
```

### Build Commands
```bash
# TypeScript compilation
tsc

# Build with watch mode
tsc --watch
```

### Test Commands

**DeepSeek Tests:**
```bash
yarn test:deepseek-chat       # Basic chat test
yarn test:deepseek-reasoner   # Reasoning model test
yarn test:deepseek-stream     # Streaming output test
```

**AIGC2D Tests:**
```bash
yarn test:gpt35               # GPT-3.5-turbo test
yarn test:gpt4o-mini          # GPT-4o-mini test
yarn test:aigc2d-stream       # Streaming output test
yarn test:models-comparison   # Model comparison test
```

**AIGC2D Multimedia Tests:**
```bash
yarn test:tts                 # Text-to-speech test
yarn test:stt                 # Speech-to-text test
yarn test:image-gen           # Image generation test
yarn test:vision              # Image analysis test
```

**Qwen Tests:**
```bash
yarn test:qwen-chat           # Basic chat test
yarn test:qwen-stream         # Streaming output test
yarn test:qwen-tts            # Text-to-speech test
```

### Demo Commands
```bash
yarn demo:deepseek           # DeepSeek full demo
yarn demo:aigc2d             # AIGC2D text models demo
yarn demo:multimedia         # AIGC2D multimedia demo
yarn demo:qwen               # Qwen full demo
```

## Code Architecture

### Project Structure
```
src/
├── deepseek/                 # DeepSeek API integration
│   ├── config.js            # API configuration
│   ├── deepseek-client.js   # Client wrapper
│   ├── demo.js              # Demo program
│   └── test-*.js           # Individual test files
├── aigc2d/                  # AIGC2D API integration
│   ├── config.js            # API configuration
│   ├── aigc2d-client.js     # Client wrapper
│   ├── demo.js              # Text models demo
│   ├── multimedia-demo.js   # Multimedia demo
│   ├── outputs/             # Generated files
│   └── test-*.js           # Individual test files
└── qwen/                    # Qwen API integration
    ├── config.js            # API configuration
    ├── qwen-client.js       # Chat client
    ├── qwen-tts-client.js   # TTS client
    ├── demo.js              # Demo program
    ├── outputs/             # Generated audio files
    └── test-*.js           # Individual test files
```

### Key Technologies
- **Node.js** with TypeScript
- **Axios** for HTTP requests
- **OpenAI SDK** for AIGC2D integration
- **dotenv** for environment variables
- **fs-extra** for file operations

### Configuration Pattern
Each platform has a `config.js` file that exports:
- API endpoints and base URLs
- Model identifiers and parameters
- Default request configurations

### Client Architecture
Each platform has a client class that provides:
- Unified interface for different model types
- Error handling and retry mechanisms
- Streaming support with callback functions
- Token usage statistics

## Development Guidelines

### Environment Variables
- Always use environment variables for API keys
- `.env` file is gitignored for security
- Required variables are documented in README.md

### Error Handling
- All API calls include proper error handling
- Network retry mechanisms are implemented
- User-friendly error messages are provided

### File Outputs
- Generated files (audio, images) are saved to platform-specific `outputs/` directories
- Output directories are gitignored
- File naming includes timestamps for organization

### TypeScript Usage
- Project uses TypeScript with strict mode
- Source files are in `src/`, compiled to `dist/`
- Type definitions are available for all major components