<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="600"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} </template>
      <a-timeline >
        <a-timeline-item v-for="item of useLogFeeIllustrateList" :label="parseTime(item.createTime)">{{ item.illustrate }}</a-timeline-item>
      </a-timeline>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getUseLogFeeIllustrateList } from '@/api/internetOfThings';
  import {parseTime} from "@/utils";

  const visible = ref(false);
  const modalTitle = ref('一键处理');
  const formRef = ref();
  const useLogFeeIllustrateList = ref();
  const handleClick = (useLog: any) => {
    visible.value = true;
    modalTitle.value = "【"+useLog.numberPlate+'】--收费原因...'

    getUseLogFeeIllustrate(useLog.id);
  };

  const getUseLogFeeIllustrate = async (useLogId: any) => {
    const { data, code } = await getUseLogFeeIllustrateList({
      params: {
        id: useLogId
      },
    });
    if (code === 10002) {
      useLogFeeIllustrateList.value = data;
    } else {
      useLogFeeIllustrateList.value = [];
    }
  };


  const resetFields = () => {
    formRef.value.resetFields();
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
