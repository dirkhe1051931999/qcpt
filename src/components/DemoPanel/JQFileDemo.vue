<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQFormLabel label="上传文件">
          <JQFile 
            v-model="basicFiles"
            accept="image/*"
            max-file-size="5 MB"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件数: {{ basicFiles.length }}</p>
          <p v-if="basicFiles.length > 0">
            文件列表: {{ basicFiles.map(f => f.name).join(', ') }}
          </p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多文件上传（限制数量）</h4>
        <JQFormLabel label="上传文件（最多5个）">
          <JQFile 
            v-model="multipleFiles"
            accept="image/*"
            :maxlength="5"
            max-file-size="2 MB"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件数: {{ multipleFiles.length }}/5</p>
          <p v-if="multipleFiles.length > 0">
            文件列表: {{ multipleFiles.map(f => f.name).join(', ') }}
          </p>
        </div>
      </div>

      <div class="demo-section">
        <h4>文件类型限制</h4>
        <div class="q-gutter-md">
          <JQFormLabel label="PDF/Word 文档 (.pdf, .doc, .docx)">
            <JQFile 
              v-model="pdfFiles"
              accept=".pdf,.doc,.docx"
              max-file-size="10 MB"
            />
          </JQFormLabel>
          <JQFormLabel label="图片文件 (image/*)">
            <JQFile 
              v-model="imageFiles"
              accept="image/*"
              max-file-size="5 MB"
            />
          </JQFormLabel>
          <JQFormLabel label="视频文件 (video/*)">
            <JQFile 
              v-model="videoFiles"
              accept="video/*"
              max-file-size="100 MB"
            />
          </JQFormLabel>
        </div>
        <div class="demo-value">
          <p>PDF文件数: {{ pdfFiles.length }}</p>
          <p>图片文件数: {{ imageFiles.length }}</p>
          <p>视频文件数: {{ videoFiles.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>文件处理前验证</h4>
        <JQFormLabel label="上传文件（验证大小）">
          <JQFile 
            v-model="validatedFiles"
            accept="image/*"
            :before-handle="handleBeforeUpload"
            max-file-size="5 MB"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件数: {{ validatedFiles.length }}</p>
          <p v-if="validatedFiles.length > 0">
            文件列表: {{ validatedFiles.map(f => `${f.name} (${formatFileSize(f.size)})`).join(', ') }}
          </p>
          <p v-if="lastValidationMessage" style="color: #f56c6c; margin-top: 8px;">
            {{ lastValidationMessage }}
          </p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <JQFormLabel label="上传文件" required>
          <JQFile 
            v-model="validatedFormFiles"
            accept="image/*"
            :rules="[
              val => val.length > 0 || '请至少上传一个文件'
            ]"
            max-file-size="5 MB"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件数: {{ validatedFormFiles.length }}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">提示：当文件列表为空时会显示验证错误</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQFormLabel label="上传文件（禁用）">
          <JQFile 
            v-model="disabledFiles"
            accept="image/*"
            disable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件数: {{ disabledFiles.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义提示信息</h4>
        <JQFormLabel label="上传文件">
          <JQFile 
            v-model="hintFiles"
            accept="image/*"
            max-file-size="5 MB"
          >
            <template #hint>
              <div style="padding: 8px; background: #f5f6fa; border-radius: 4px; font-size: 12px; color: #666;">
                <p style="margin: 0;">提示：支持拖拽上传，单个文件最大 5MB</p>
                <p style="margin: 4px 0 0 0;">支持格式：JPG、PNG、GIF</p>
              </div>
            </template>
          </JQFile>
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件数: {{ hintFiles.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>单文件上传</h4>
        <JQFormLabel label="上传文件（单个）">
          <JQFile 
            v-model="singleFile"
            accept="image/*"
            :maxlength="1"
            max-file-size="5 MB"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择文件: {{ singleFile.length > 0 ? singleFile[0].name : '(无)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（图片上传）</h4>
        <JQFormLabel label="上传图片" required>
          <JQFile 
            ref="completeExampleRef"
            v-model="completeExampleFiles"
            accept="image/*"
            :maxlength="3"
            max-file-size="5 MB"
            :before-handle="handleImageBeforeUpload"
            :rules="[
              val => val.length > 0 || '请至少上传一张图片',
              val => val.length <= 3 || '最多只能上传3张图片'
            ]"
          >
            <template #hint>
              <div style="padding: 8px; background: #e6f7ff; border-radius: 4px; font-size: 12px; color: #1890ff;">
                <p style="margin: 0;">📸 支持上传最多3张图片，单个文件最大5MB</p>
              </div>
            </template>
          </JQFile>
        </JQFormLabel>
        <div class="demo-value">
          <p>已选择: {{ completeExampleFiles.length }}/3</p>
          <p v-if="completeExampleFiles.length > 0">
            文件: {{ completeExampleFiles.map(f => f.name).join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQFile, JQFormLabel } from 'qcpt';

// 基础用法
const basicFiles = ref<File[]>([]);

// 多文件上传
const multipleFiles = ref<File[]>([]);

// 文件类型限制
const pdfFiles = ref<File[]>([]);
const imageFiles = ref<File[]>([]);
const videoFiles = ref<File[]>([]);

// 文件处理前验证
const validatedFiles = ref<File[]>([]);
const lastValidationMessage = ref('');

const handleBeforeUpload = async (newFiles: File[]) => {
  // 验证文件大小
  const maxSize = 5 * 1024 * 1024; // 5MB
  const oversizedFiles = newFiles.filter(f => f.size > maxSize);
  
  if (oversizedFiles.length > 0) {
    lastValidationMessage.value = `文件 ${oversizedFiles.map(f => f.name).join(', ')} 超过大小限制`;
    return []; // 返回空数组表示拒绝这些文件
  }
  
  lastValidationMessage.value = '';
  console.log('准备上传的文件:', newFiles);
  return newFiles; // 返回处理后的文件
};

// 表单验证
const validatedFormFiles = ref<File[]>([]);
const completeExampleRef = ref<InstanceType<typeof JQFile>>();

// 禁用状态
const disabledFiles = ref<File[]>([]);

// 自定义提示
const hintFiles = ref<File[]>([]);

// 单文件上传
const singleFile = ref<File[]>([]);

// 完整示例
const completeExampleFiles = ref<File[]>([]);

const handleImageBeforeUpload = async (newFiles: File[]) => {
  // 验证图片格式
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const invalidFiles = newFiles.filter(f => !validTypes.includes(f.type));
  
  if (invalidFiles.length > 0) {
    alert(`文件 ${invalidFiles.map(f => f.name).join(', ')} 格式不支持，仅支持 JPG、PNG、GIF`);
    return [];
  }
  
  return newFiles;
};

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
