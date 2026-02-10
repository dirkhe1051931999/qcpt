# QCPT 文档

## 项目结构

本项目使用 [Astro](https://astro.build) 和 [Starlight](https://starlight.astro.build) 构建，Starlight 是 Astro 的文档主题。

```
.
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   ├── content/
│   │   ├── docs/
│   │   ├── i18n/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 命令

本项目使用 npm 脚本来运行命令。以下是最重要的命令：

| 命令                      | 操作                                         |
| :------------------------ | :------------------------------------------- |
| `npm install`             | 安装依赖                                     |
| `npm run dev`             | 在 `localhost:4321` 启动本地开发服务器       |
| `npm run build`           | 构建生产环境站点到 `./dist/`                 |
| `npm run preview`         | 在部署前本地预览构建结果                     |
| `npm run astro ...`       | 运行 CLI 命令，如 `astro add`、`astro check` |
| `npm run astro -- --help` | 获取 Astro CLI 使用帮助                      |

## 想要了解更多？

查看 [Starlight 文档](https://starlight.astro.build/)，阅读 [Astro 文档](https://docs.astro.build)，或加入 [Astro Discord 服务器](https://astro.build/chat)。