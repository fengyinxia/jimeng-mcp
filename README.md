# Jimeng MCP 服务器

使用TypeScript实现的Model Context Protocol (MCP) 服务器项目，集成了即梦AI图像生成服务，通过逆向工程直接调用即梦官方API。

## 功能

- 基于TypeScript构建
- 使用tsup作为构建工具
- 实现了MCP协议，支持标准的stdio通信
- 直接调用即梦AI图像生成服务，无需第三方API
- 提供多种即梦模型的图像生成工具
- 支持多种图像参数调整，如尺寸、精细度、负面提示词等

## 安装

```bash
# 使用yarn安装依赖
yarn install

# 或使用npm安装依赖
npm install
```

## 环境配置

在MCP客户端配置（如Claude Desktop）中设置以下环境变量：

```json
{
  "mcpServers": {
    "jimeng": {
      "command": "node",
      "args": ["lib/index.js"],
      "cwd": "/path/to/jimeng-mcp",
      "env": {
        "JIMENG_API_TOKEN": "your_jimeng_session_id_here"
      }
    }
  }
}
```

### 获取JIMENG_API_TOKEN

1. 访问 [即梦AI官网](https://jimeng.jianying.com) 并登录账号
2. 按F12打开浏览器开发者工具
3. 在Application > Cookies中找到`sessionid`的值
4. 将找到的sessionid值配置为JIMENG_API_TOKEN环境变量

## 开发

```bash
# 开发模式运行
yarn dev

# 使用nodemon开发并自动重启
yarn start:dev
```

## 构建

```bash
# 构建项目
yarn build
```

## 运行

```bash
# 启动服务器
yarn start

# 测试MCP服务器
yarn test
```

## Claude Desktop 配置示例

以下是在Claude Desktop中配置此MCP服务器的完整示例:

```json
{
  "mcpServers": {
    "jimeng": {
      "command": "node",
      "args": ["/path/to/jimeng-mcp/lib/index.js"],
      "env": {
        "JIMENG_API_TOKEN": "your_jimeng_session_id_here"
      }
    }
  }
}
```

## 即梦AI图像生成

本MCP服务器直接调用即梦AI图像生成API，提供图像生成工具：

`generateImage` - 提交图像生成请求并返回图像URL列表
- 参数：
  - `prompt`：生成图像的文本描述（必填）
  - `model`：模型名称，可选值: jimeng-3.0, jimeng-2.1, jimeng-2.0-pro, jimeng-2.0, jimeng-1.4, jimeng-xl-pro（可选，默认为jimeng-2.1）
  - `width`：图像宽度，默认值：1024（可选）
  - `height`：图像高度，默认值：1024（可选）
  - `sample_strength`：精细度，默认值：0.5，范围0-1（可选）
  - `negative_prompt`：反向提示词，告诉模型不要生成什么内容（可选）

### 支持的模型

服务器支持以下即梦AI模型：

- `jimeng-3.0`：即梦第三代模型，效果更好，支持更强的图像生成能力
- `jimeng-2.1`：即梦2.1版本模型，默认模型
- `jimeng-2.0-pro`：即梦2.0 Pro版本
- `jimeng-2.0`：即梦2.0标准版本
- `jimeng-1.4`：即梦1.4版本
- `jimeng-xl-pro`：即梦XL Pro特殊版本

### 技术实现

- 直接调用即梦官方API，无需第三方服务
- 逆向工程API调用流程，实现完整的图像生成过程
- 支持积分自动领取和使用
- 基于面向对象设计，将API实现封装为类
- 返回高质量图像URL列表

### 使用示例

通过MCP协议调用图像生成功能：

```javascript
// 生成图像
client.callTool({
  name: "generateImage",
  arguments: {
    prompt: "一只可爱的猫咪在草地上",
    model: "jimeng-3.0",
    width: 1024,
    height: 1024,
    sample_strength: 0.7,
    negative_prompt: "模糊，扭曲，低质量"
  }
});
```

## 响应格式

API将返回生成的图像URL数组，可以直接在各类客户端中显示：

```javascript
[
  "https://example.com/generated-image-1.jpg",
  "https://example.com/generated-image-2.jpg",
  "https://example.com/generated-image-3.jpg",
  "https://example.com/generated-image-4.jpg"
]
```

## 资源

服务器还提供了以下信息资源：

- `greeting://{name}` - 提供个性化问候
- `info://server` - 提供服务器基本信息
- `jimeng-ai://info` - 提供即梦AI图像生成服务的使用说明

## Cursor或Claude使用提示

在Cursor或Claude中，你可以这样使用Jimeng图像生成服务：

1. 确保已经配置了MCP服务器
2. 提示Claude/Cursor生成图像，例如：
   ```
   请生成一张写实风格的日落下的山脉图片
   ```
3. Claude/Cursor会调用Jimeng MCP服务器生成图像并显示

## 常见问题

1. **图像生成失败**
   - 检查JIMENG_API_TOKEN是否正确配置
   - 登录即梦官网检查账号积分是否充足
   - 尝试更换提示词，避免敏感内容

2. **服务器无法启动**
   - 确保已安装所有依赖
   - 确保环境变量正确设置
   - 检查Node.js版本是否为14.0或更高

## 许可证

MIT 