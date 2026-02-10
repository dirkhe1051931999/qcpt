# QCPT - Vue 3 + Quasar 组件库

QCPT 是一个基于 Vue 3、TypeScript 和 Quasar 构建的现代企业级组件库。

### 分支管理

1. **创建开发分支**: 开发新功能或修复问题时，应基于 `dev` 分支创建对应的功能分支。分支命名格式为 `feat/`、`fix/`、
   `refactor/`、`docs/`、`perf/` 或 `chore/` 前缀，后跟具体描述。

2. **提交代码审查**: 完成开发后，通过 Pull Request (PR) 或 Merge Request (MR) 提交至 `dev` 分支进行代码审查。提交后可保留自建分支，无需删除。

3. **版本发布流程**: 在 `dev` 分支完成构建后（执行 `npm run build-all`），需先执行 `npm login` 进行身份验证，随后执行
   `npm run patch` 发布新版本。

## 项目特点

- 基于 Quasar 的现代化 UI 组件
- 全面的 TypeScript 类型支持
- 开箱即用的企业级业务组件
- 内置国际化支持 (i18n)
- 权限控制系统
- 基于 Chart.js 的数据可视化
- 高度可定制的主题配置

## 分支命名规范 (Branching Guidelines)

为了保持组件库开发的条理性以及 CI/CD 流程的自动化，本项目采用语义化分支命名规范。

### 1. 核心分支 (Core Branches)

| 分支名   | 说明                             |
|:------|:-------------------------------|
| `dev` | 开发分支。日常功能集成的基准分支，所有 PR 默认合并至此。 |

---

### 2. 短期协作分支 (Supporting Branches)

所有短期分支应遵循 `类别/描述` 的格式，使用小写字母并以中划线分隔。

#### 功能开发 (Feature)

用于开发新组件或新特性。

- 格式: `feat/description`
- 示例: `git checkout -b feat/button-component`

#### 缺陷修复 (Bugfix)

用于修复组件 Bug。

- 格式: `fix/description`
- 示例: `git checkout -b fix/select-dropdown-overflow`

#### 代码重构 (Refactor)

不影响功能逻辑的代码结构调整。

- 格式: `refactor/description`
- 示例: `git checkout -b refactor/use-callback-optimization`

#### 文档更新 (Docs)

仅涉及文档、注释、Storybook 示例的修改。

- 格式: `docs/description`
- 示例: `git checkout -b docs/add-api-tables`

#### 性能优化 (Perf)

专门针对组件渲染性能或包体积的优化。

- 格式: `perf/description`
- 示例: `git checkout -b perf/reduce-bundle-size`

#### 辅助任务 (Chore)

构建流程、依赖库更新、CI 配置等非业务逻辑修改。

- 格式: `chore/description`
- 示例: `git checkout -b chore/upgrade-react-18`

---

### 3. 工作流建议 (Workflow)

1. **同步主分支**: 开发前确保 `develop` 分支是最新的。
2. **创建分支**: 从 `develop` 拉取新分支。
   ```bash
   git checkout -b feat/your-feature-name