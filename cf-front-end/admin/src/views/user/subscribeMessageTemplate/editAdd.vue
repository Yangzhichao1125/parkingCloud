<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title>
        {{ formData?.id ? '编辑消息模板' : '新增消息模板' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="模板名称" field="templateNotes" validate-trigger="input" required>
                  <a-input v-model="formData.templateNotes" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="应用id" field="appid" validate-trigger="input" required>
                  <a-input v-model="formData.appid" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="模板id" field="templateId" validate-trigger="input" required>
                  <a-input v-model="formData.templateId" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="使用场景" field="messageScenes" required>
                  <a-select v-model="formData.messageScenes" placeholder="请选择" allow-clear>
                    <a-option :value="'car_park_package_expire_notice'">停车套餐过期提醒</a-option>
                    <a-option :value="'car_charge_notice'">车辆充电结束提醒</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="消息内容" field="templateContents" validate-trigger="input">
                  <a-input v-model="formData.templateContents" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="详情页面" field="detailPage" validate-trigger="input">
                  <a-input v-model="formData.detailPage" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-space>
        <div class="actions">
          <a-space>
            <a-button @click="resetFields"> 重置 </a-button>
            <a-button type="primary" :loading="loading" @click="onSubmitClick">
              保存
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { addSubscribeMessageTemplate, updateSubscribeMessageTemplate } from '@/api/user';
import { Message } from '@arco-design/web-vue';

const visible = ref(false);
const loading = ref(false);
const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const formData = ref({
  id: "",
  appid: "",
  messageScenes: "",
  templateId: "",
  templateContents: "",
  templateNotes: "",
  detailPage: "",
});
const handleClick = (e: any = null) => {
  if (e?.id) {
    const newInfo = JSON.parse(JSON.stringify(e));
    formData.value = newInfo;
  }
  visible.value = true;
};
const resetFields = () => {
  formData.value.id = '';
  formRef.value.resetFields();
};
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    // @ts-ignore
    if (formData.value.id) {
      const { code } = await updateSubscribeMessageTemplate(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('更新成功!');
        emit('fetchData');
      }
    } else {
      const { code } = await addSubscribeMessageTemplate(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('添加成功!');
        emit('fetchData');
      }
    }
  });
};

defineExpose({ handleClick });
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 40px 20px;
  overflow: hidden;
}

.actions {
  height: 60px;
  padding: 14px 20px 14px 0;
  background: var(--color-bg-2);
  text-align: right;
}
</style>
