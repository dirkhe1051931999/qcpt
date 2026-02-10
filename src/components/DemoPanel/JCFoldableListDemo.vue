<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法（默认折叠）</h4>
        <p class="demo-hint">当内容超过 maxHeight 时，会自动显示折叠/展开按钮。默认状态为折叠。</p>
        <JCFoldableList :max-height="150">
          <div 
            v-for="item in basicItems" 
            :key="item.id"
            class="demo-list-item"
          >
            <strong>{{ item.name }}</strong> - {{ item.description }}
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>列表项数量:</strong> {{ basicItems.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>默认展开</h4>
        <p class="demo-hint">设置 defaultCollapsed=false，组件默认展开显示所有内容。</p>
        <JCFoldableList :max-height="150" :default-collapsed="false">
          <div 
            v-for="item in expandedItems" 
            :key="item.id"
            class="demo-list-item"
          >
            <strong>{{ item.name }}</strong> - {{ item.description }}
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>列表项数量:</strong> {{ expandedItems.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不同高度限制</h4>
        <p class="demo-hint">可以设置不同的 maxHeight 值来控制折叠高度。</p>
        <div style="margin-bottom: 16px;">
          <strong>高度限制: 80px</strong>
          <JCFoldableList :max-height="80">
            <div 
              v-for="item in heightItems" 
              :key="item.id"
              class="demo-list-item"
            >
              {{ item.name }}
            </div>
          </JCFoldableList>
        </div>
        <div>
          <strong>高度限制: 200px</strong>
          <JCFoldableList :max-height="200">
            <div 
              v-for="item in heightItems" 
              :key="item.id"
              class="demo-list-item"
            >
              {{ item.name }}
            </div>
          </JCFoldableList>
        </div>
        <div class="demo-value">
          <p><strong>列表项数量:</strong> {{ heightItems.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>对话框查看模式</h4>
        <p class="demo-hint">设置 viewInDialog=true，点击"查看全部"会在对话框中显示完整内容。</p>
        <JCFoldableList 
          :max-height="120" 
          view-in-dialog
          dialog-title="查看全部标签"
          dialog-max-width="60vw"
        >
          <div 
            v-for="tag in dialogTags" 
            :key="tag"
            class="demo-tag"
          >
            {{ tag }}
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>标签数量:</strong> {{ dialogTags.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>动态内容变化</h4>
        <p class="demo-hint">当内容动态变化时，可以使用 remeasure 方法重新测量高度。点击按钮添加/删除项目。</p>
        <div style="margin-bottom: 12px;">
          <button @click="addDynamicItem" class="demo-button">添加项目</button>
          <button @click="removeDynamicItem" class="demo-button" style="margin-left: 8px;">删除项目</button>
          <button @click="remeasureDynamic" class="demo-button" style="margin-left: 8px;">重新测量</button>
        </div>
        <JCFoldableList 
          ref="dynamicListRef"
          :max-height="150"
        >
          <div 
            v-for="item in dynamicItems" 
            :key="item.id"
            class="demo-list-item"
          >
            <strong>项目 {{ item.id }}</strong> - {{ item.content }}
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>当前项目数量:</strong> {{ dynamicItems.length }}</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 组件会自动监听内容变化，但某些情况下可能需要手动调用 remeasure</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>用户列表示例</h4>
        <p class="demo-hint">实际应用场景：显示用户列表，当用户过多时自动折叠。</p>
        <JCFoldableList :max-height="180">
          <div 
            v-for="user in userList" 
            :key="user.id"
            class="demo-user-item"
          >
            <div class="demo-user-avatar">{{ user.name.charAt(0) }}</div>
            <div class="demo-user-info">
              <div class="demo-user-name">{{ user.name }}</div>
              <div class="demo-user-email">{{ user.email }}</div>
            </div>
            <div class="demo-user-role">{{ user.role }}</div>
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>用户数量:</strong> {{ userList.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>标签列表示例</h4>
        <p class="demo-hint">实际应用场景：显示标签列表，支持在对话框中查看全部标签。</p>
        <JCFoldableList 
          :max-height="100" 
          view-in-dialog
          dialog-title="所有标签"
          dialog-max-width="50vw"
        >
          <div class="demo-tags-container">
            <span 
              v-for="tag in tagList" 
              :key="tag"
              class="demo-tag-large"
            >
              {{ tag }}
            </span>
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>标签数量:</strong> {{ tagList.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>内容不超过高度</h4>
        <p class="demo-hint">当内容高度不超过 maxHeight 时，不会显示折叠按钮。</p>
        <JCFoldableList :max-height="200">
          <div 
            v-for="item in shortItems" 
            :key="item.id"
            class="demo-list-item"
          >
            {{ item.name }}
          </div>
        </JCFoldableList>
        <div class="demo-value">
          <p><strong>列表项数量:</strong> {{ shortItems.length }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 内容高度未超过限制，不显示折叠按钮</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCFoldableList } from 'qcpt';
import type { ComponentPublicInstance } from 'vue';

// 基础用法
const basicItems = ref([
  { id: 1, name: '项目1', description: '这是第一个项目的描述信息' },
  { id: 2, name: '项目2', description: '这是第二个项目的描述信息' },
  { id: 3, name: '项目3', description: '这是第三个项目的描述信息' },
  { id: 4, name: '项目4', description: '这是第四个项目的描述信息' },
  { id: 5, name: '项目5', description: '这是第五个项目的描述信息' },
  { id: 6, name: '项目6', description: '这是第六个项目的描述信息' },
  { id: 7, name: '项目7', description: '这是第七个项目的描述信息' },
]);

// 默认展开
const expandedItems = ref([
  { id: 1, name: '展开项1', description: '默认展开显示的内容' },
  { id: 2, name: '展开项2', description: '默认展开显示的内容' },
  { id: 3, name: '展开项3', description: '默认展开显示的内容' },
  { id: 4, name: '展开项4', description: '默认展开显示的内容' },
  { id: 5, name: '展开项5', description: '默认展开显示的内容' },
]);

// 不同高度限制
const heightItems = ref([
  { id: 1, name: '项目 A' },
  { id: 2, name: '项目 B' },
  { id: 3, name: '项目 C' },
  { id: 4, name: '项目 D' },
  { id: 5, name: '项目 E' },
  { id: 6, name: '项目 F' },
  { id: 7, name: '项目 G' },
  { id: 8, name: '项目 H' },
]);

// 对话框查看模式
const dialogTags = ref([
  'Vue', 'React', 'Angular', 'TypeScript', 'JavaScript', 
  'Node.js', 'Python', 'Java', 'Go', 'Rust',
  'CSS', 'HTML', 'SCSS', 'Less', 'Stylus',
  'Webpack', 'Vite', 'Rollup', 'Babel', 'ESLint'
]);

// 动态内容变化
const dynamicItems = ref([
  { id: 1, content: '动态内容1' },
  { id: 2, content: '动态内容2' },
  { id: 3, content: '动态内容3' },
]);

let nextId = 4;

const dynamicListRef = ref<ComponentPublicInstance | null>(null);

const addDynamicItem = () => {
  dynamicItems.value.push({
    id: nextId++,
    content: `动态内容${nextId - 1}`
  });
};

const removeDynamicItem = () => {
  if (dynamicItems.value.length > 0) {
    dynamicItems.value.pop();
  }
};

const remeasureDynamic = () => {
  if (dynamicListRef.value && typeof (dynamicListRef.value as any).remeasure === 'function') {
    (dynamicListRef.value as any).remeasure();
  }
};

// 用户列表示例
const userList = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '普通用户' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '普通用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '普通用户' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: '访客' },
  { id: 6, name: '孙八', email: 'sunba@example.com', role: '普通用户' },
  { id: 7, name: '周九', email: 'zhoujiu@example.com', role: '普通用户' },
]);

// 标签列表示例
const tagList = ref([
  '前端开发', '后端开发', '全栈开发', '移动开发', '桌面应用',
  'Vue.js', 'React', 'Angular', 'Node.js', 'Python',
  'Java', 'Go', 'Rust', 'TypeScript', 'JavaScript',
  '数据库', 'Redis', 'MongoDB', 'MySQL', 'PostgreSQL',
  'Docker', 'Kubernetes', 'CI/CD', 'DevOps', '微服务'
]);

// 内容不超过高度
const shortItems = ref([
  { id: 1, name: '短列表项1' },
  { id: 2, name: '短列表项2' },
  { id: 3, name: '短列表项3' },
]);
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-list-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  background: rgba(128, 128, 128, 0.05);
  border-radius: 4px;
  font-size: 13px;
  color: var(--sl-color-text);
}

.demo-list-item:last-child {
  margin-bottom: 0;
}

.demo-tag {
  display: inline-block;
  padding: 4px 12px;
  margin: 4px;
  background: rgba(64, 128, 255, 0.1);
  border: 1px solid rgba(64, 128, 255, 0.3);
  border-radius: 12px;
  font-size: 12px;
  color: var(--sl-color-text);
}

.demo-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-tag-large {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(64, 128, 255, 0.1);
  border: 1px solid rgba(64, 128, 255, 0.3);
  border-radius: 16px;
  font-size: 13px;
  color: var(--sl-color-text);
}

.demo-user-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(128, 128, 128, 0.05);
  border-radius: 4px;
}

.demo-user-item:last-child {
  margin-bottom: 0;
}

.demo-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;
}

.demo-user-info {
  flex: 1;
}

.demo-user-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--sl-color-text);
  margin-bottom: 4px;
}

.demo-user-email {
  font-size: 12px;
  color: var(--sl-color-text-accent);
}

.demo-user-role {
  padding: 4px 12px;
  background: rgba(64, 128, 255, 0.1);
  border-radius: 12px;
  font-size: 12px;
  color: var(--sl-color-text);
}

.demo-button {
  padding: 6px 12px;
  background: var(--sl-color-accent);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

.demo-button:hover {
  background: var(--sl-color-accent-high);
}

.demo-button:active {
  background: var(--sl-color-accent-low);
}
</style>
