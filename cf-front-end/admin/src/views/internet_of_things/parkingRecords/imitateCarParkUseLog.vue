<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1000"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                  label="车牌号"
                  field="numberPlate"
                  validate-trigger="input"
                  required
              >
                <a-input
                    v-model="formData.numberPlate"
                    placeholder="请输入"
                    allow-clear
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="carParkId" label="停车场">
                <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.carParkId"
                    @change="parkChange"
                >
                  <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="入口" field="inCheckPointId">
                <a-select
                    v-model="formData.inCheckPointId"
                    placeholder="请选择"
                    allow-clear
                    @change="checkPointChange"
                >
                  <a-option
                      :value="item.id"
                      v-for="item in inCheckPointList"
                      :key="item.id"
                  >{{ item.name }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="出口" field="outCheckPointId">
                <a-select
                    v-model="formData.outCheckPointId"
                    placeholder="请选择"
                    allow-clear
                    @change="checkPointChange"
                >
                  <a-option
                      :value="item.id"
                      v-for="item in outCheckPointList"
                      :key="item.id"
                  >{{ item.name }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="设备" field="deviceId">
                <a-select
                    v-model="formData.deviceId"
                    placeholder="请选择"
                    allow-clear
                >
                  <a-option
                      :value="item.id"
                      v-for="item in deviceList"
                      :key="item.id"
                  >{{ item.deviceName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="入场时间"
                  field="inTime"
                  validate-trigger="input"
              >
                <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.inTime"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="出场时间"
                  field="outTime"
                  validate-trigger="input"
              >
                <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.outTime"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="realMachineDebug" label="真机调试">
                <a-switch v-model="formData.realMachineDebugSwitch" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-space>
        <div class="actions">
          <a-space>
            <a-button type="primary" :loading="loading" @click="onSubmitClick">
              录入
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import { cfCarParkSearch, imitateCarParkUseLog,  } from '@/api/internetOfThings';
import {cfCheckPointGet, cfDeviceGet} from "@/api/park";
import dayjs from "dayjs";
import {cloneDeep} from "lodash";
import {Message} from "@arco-design/web-vue";

const visible = ref(false);
const loading = ref(false);
const selectLoading = ref(false);
const modalTitle = ref('模拟车辆进出');
const formRef = ref();
const orderData = ref({numberPlate: '', cfOrder: {amountsPayable: '0'}});
const formData = ref({
  numberPlate: '',
  carParkId: '',
  inTime: '',
  outTime: '',
  inCheckPointId: '',
  outCheckPointId: '',
  deviceId: '',
  realMachineDebugSwitch: false,
  realMachineDebug: '',
});
const carTypeList = ref([]);
const parkList = ref([]);
const inCheckPointList = ref([]);
const outCheckPointList = ref([]);
const deviceList = ref([]);
const emit = defineEmits(['fetchData', 'fetch-data', 'resetSelectedKeys']);
onMounted(() => {
  handleSelectSearch(null);
});


  const handleSelectSearch = async (value: any) => {
    selectLoading.value = true;
    const { data, code } = await cfCarParkSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      parkList.value = data;
    } else {
      parkList.value = [];
    }
  };
  const handleClick = (_selectedKeys: any) => {
    visible.value = true;
  };

  const onSubmitClick = async () => {
    const newForm = cloneDeep(formData.value);
    newForm.inTime = dayjs(formData.value.inTime).valueOf();
    newForm.outTime = dayjs(formData.value.outTime).valueOf();
    newForm.realMachineDebug = formData.value.realMachineDebugSwitch ? '1' : '0';

    const { code, message } = await imitateCarParkUseLog(newForm);
    if (code === 10002) {
      formRef.value.resetFields();
      visible.value = false;
      emit('fetchData');
    }else{
      Message.error(message);
    }
  };
  const parkChange = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfCheckPointGet({
        params: {
          areaId: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        inCheckPointList.value = [];
        outCheckPointList.value = [];
        for(const checkPoint of data){
          if(checkPoint.features=='in'){
            inCheckPointList.value.push(checkPoint);
          }else{
            outCheckPointList.value.push(checkPoint);
          }
        }
      } else {
        inCheckPointList.value = [];
        outCheckPointList.value = [];
      }
    } else {
      inCheckPointList.value = [];
      outCheckPointList.value = [];
    }
    deviceList.value = [];
  };
  const checkPointChange = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfDeviceGet({
        params: {
          carParkId: formData.value.carParkId,
          checkPointId: value,
          deviceType: 2,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        deviceList.value = data;
      } else {
        deviceList.value = [];
      }
    } else {
      deviceList.value = [];
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
