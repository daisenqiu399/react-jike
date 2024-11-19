import { resolve } from 'path'

export const webpack = {
  // 配置别名
  alias: {
    // 约定：使用 @ 表示 src 文件所在路径
    '@': resolve(__dirname, 'src')
  }
}