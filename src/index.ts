import { startServer } from './server.js';

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
});

// 启动服务器
const main = async () => {
  try {
    // required: VOLCENGINE_ACCESS_KEY
    // required: VOLCENGINE_SECRET_KEY
    if (!process.env.VOLCENGINE_ACCESS_KEY) {
      throw new Error('VOLCENGINE_ACCESS_KEY is required!')
    }
    if (!process.env.VOLCENGINE_SECRET_KEY) {
      throw new Error('VOLCENGINE_SECRET_KEY is required!')
    }

    await startServer();
  } catch (error) {
    console.error('启动服务器时出错:', error);
    process.exit(1);
  }
};

main(); 