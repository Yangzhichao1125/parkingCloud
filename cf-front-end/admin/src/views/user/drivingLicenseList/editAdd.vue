<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑行驶证' : '新增行驶证' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
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
                <a-form-item label="车辆类型" field="vehicleType">
                  <a-select
                      v-model="formData.vehicleType"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option
                        :value="item.code"
                        v-for="item in vehicleTypeList"
                        :key="item.id"
                    >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="车辆识别码(车架号)"
                    field="vin"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.vin"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="车辆使用性质" field="useNature">
                  <a-select
                      v-model="formData.useNature"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option
                        :value="item.code"
                        v-for="item in useNatureList"
                        :key="item.id"
                    >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="发动机编号"
                    field="engineNumber"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.engineNumber"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="车主姓名"
                    field="ownerName"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.ownerName"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="地址"
                    field="address"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.address"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="品牌型号"
                    field="brandModel"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.brandModel"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="注册时间"
                    field="registrationTime"
                    validate-trigger="input"
                >
                  <a-date-picker
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      v-model="formData.registrationTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="发证时间"
                    field="issuanceTime"
                    validate-trigger="input"
                >
                  <a-date-picker
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      v-model="formData.issuanceTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="排放阶段" field="emissionStage">
                  <a-select
                      v-model="formData.emissionStage"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option
                        :value="item.code"
                        v-for="item in emissionStageList"
                        :key="item.id"
                    >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="燃油类型" field="fuelType">
                  <a-select
                      v-model="formData.fuelType"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option
                        :value="item.code"
                        v-for="item in fuelTypeList"
                        :key="item.id"
                    >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="审核状态"
                    field="checkStatus"
                    validate-trigger="input"
                    required
                >
                  <a-select
                      v-model="formData.checkStatus"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option :value="0">审核中</a-option>
                    <a-option :value="1">审核成功</a-option>
                    <a-option :value="2">审核失败</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="车牌颜色"
                    field="numberPlateColor"
                    validate-trigger="input"
                    required
                >
                  <a-select
                      v-model="formData.numberPlateColor"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option :value="0">未知</a-option>
                    <a-option :value="1">蓝色</a-option>
                    <a-option :value="2">黄色</a-option>
                    <a-option :value="3">白色</a-option>
                    <a-option :value="4">黑色</a-option>
                    <a-option :value="5">绿色</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="联网状态"
                    field="networkStatus"
                    validate-trigger="input"
                    required
                >
                  <a-select
                      v-model="formData.networkStatus"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="所属单位"
                    field="belongingCompany"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.belongingCompany"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="环保登记编号"
                    field="erCode"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.erCode"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="生产日期"
                    field="productionDate"
                    validate-trigger="input"
                >
                  <a-date-picker
                      show-time
                      format="YYYY-MM-DD HH:mm:ss"
                      v-model="formData.productionDate"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="zoneId" label="录入场地" required>
                  <a-select
                      :loading="loading"
                      placeholder="请输入"
                      allow-search
                      allow-clear
                      @search="handleSelectSearch"
                      :filter-option="false"
                      v-model="formData.zoneId"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                        item.name
                      }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="车辆场景"
                    field="vehicleScene"
                    validate-trigger="input"
                    required
                >
                  <a-select
                      v-model="formData.vehicleScene"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                    <a-option :value="2">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="发动机型号"
                    field="engineModel"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.engineModel"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="发动机生产厂"
                    field="engineManufacturer"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.engineManufacturer"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="发动机铭牌"
                    field="engineNameplate"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.engineNameplate"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="车辆铭牌"
                    field="vehicleNameplate"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.vehicleNameplate"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="环保标签"
                    field="ecoLabel"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.ecoLabel"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="机械种类" field="machineType">
                  <a-select
                      v-model="formData.machineType"
                      placeholder="请选择"
                      allow-clear
                  >
                    <a-option
                        :value="item.code"
                        v-for="item in machineTypeList"
                        :key="item.id"
                    >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="机械码/产品识别码pin"
                    field="machineNo"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.machineNo"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="机械码/产品识别码pin"
                    field="machineNo"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.machineNo"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    label="地址"
                    field="address"
                    validate-trigger="input"
                    required
                >
                  <a-input
                      v-model="formData.address"
                      placeholder="请输入"
                      allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>





              <a-col :span="8">
                <a-form-item
                  label="地址"
                  field="address"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.address"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            
              <a-col :span="8">
                <a-form-item
                  label="生日-年"
                  field="birthdayYear"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.birthdayYear"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="生日-月"
                  field="birthdayMonth"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.birthdayMonth"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="生日-日"
                  field="birthdayDay"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.birthdayDay"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="准驾车型"
                  field="carClass"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.carClass"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="身份证号"
                  field="certificateNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.certificateNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="审核状态"
                  field="checkStatus"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.checkStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">未上传</a-option>
                    <a-option :value="1">上传待审核</a-option>
                    <a-option :value="2">审核通过</a-option>
                    <a-option :value="3">审核不通过</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="有效期起"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.startTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="有效期止"
                  field="endTime"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.endTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="档案编号"
                  field="fileNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.fileNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="初次领证日期-日"
                  field="firstIssueDay"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.firstIssueDay"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="初次领证日期-月"
                  field="firstIssueMonth"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.firstIssueMonth"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="初次领证日期-年"
                  field="firstIssueYear"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.firstIssueYear"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="实习期截至"
                  field="internshipPeriodEnds"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.internshipPeriodEnds"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="签发机关"
                  field="issuingAuthority"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.issuingAuthority"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="国籍"
                  field="nationality"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.nationality"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="手机号"
                  field="phone"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.phone"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="性别"
                  field="sex"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.sex"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">保密</a-option>
                    <a-option :value="1">男</a-option>
                    <a-option :value="2">女</a-option>
                  </a-select>
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
import {onMounted, ref} from 'vue';
  import {
    addUserDrivingLicense, getEmissionStageListByQuery, getFuelTypeListByQuery, getMachineTypeListByQuery,
    getUseNatureListByQuery,
    getVehicleTypeListByQuery,
    updateUserDrivingLicense
  } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
import {cfCarParkSearch} from "@/api/internetOfThings";

  const vehicleTypeList = ref([]);
  const useNatureList = ref([]);
  const emissionStageList = ref([]);
  const fuelTypeList = ref([]);
  const machineTypeList = ref([]);
  const parkList = ref([]);
  const selectLoading = ref(false);
  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    id: '',
    numberPlate: '',
    vehicleType: '',
    vin: '',
    useNature: '',
    engineNumber: '',
    ownerName: '',
    address: '',
    brandModel: '',
    registrationTime: '',
    issuanceTime: '',
    emissionStage: '',
    fuelType: '',
    accompanyingVehiclesList: '',
    uid: '',
    checkStatus: '',
    image: '',
    numberPlateColor: '',
    networkStatus: '',
    belongingCompany: '',
    erCode: '',
    productionDate: '',
    zoneId: '',
    vehicleScene: '',
    engineModel: '',
    engineManufacturer: '',
    engineNameplate: '',
    vehicleNameplate: '',
    ecoLabel: '',
    machineType: '',
    machineNo: '',
    machineModel: '',
    machineName: ''

  });
onMounted(() => {
  getVehicleType();
  getUseNature();
  getEmissionStage();
  getFuelType();
  getMachineType();
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
  const getVehicleType = async () => {
    const { data, code, message } = await getVehicleTypeListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      vehicleTypeList.value = data;
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const getUseNature = async () => {
    const { data, code, message } = await getUseNatureListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      useNatureList.value = data;
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const getEmissionStage = async () => {
    const { data, code, message } = await getEmissionStageListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      emissionStageList.value = data;
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const getFuelType = async () => {
    const { data, code, message } = await getFuelTypeListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      fuelTypeList.value = data;
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const getMachineType = async () => {
    const { data, code, message } = await getMachineTypeListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      machineTypeList.value = data;
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateUserDrivingLicense(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addUserDrivingLicense(formData.value);
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
