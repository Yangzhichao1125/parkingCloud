<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.ucenter',
        'menu.ucenter.certificate',
        'menu.ucenter.certificate.drivinglicenselist',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.ucenter.certificate.drivinglicenselist')"
    >
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="userName" label="姓名">
                  <a-input
                    v-model="formModel.userName"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="phone" label="手机号">
                  <a-input
                    v-model="formModel.phone"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 40px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <!-- <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button> -->
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :columns="columns"
        :data="state.list"
        :style="{ height: '700px' }"
        :pagination="pagination"
        :loading="loading"
        @page-change="pageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleEdit(record)"
              >编辑</a-button
            >
          </a-space>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    getUserDrivingLicenseListByQuery,
    deleteUserDrivingLicense,
    getVehicleTypeListByQuery,
    getUseNatureListByQuery,
    getEmissionStageListByQuery,
    getFuelTypeListByQuery, getMachineTypeListByQuery,
  } from '@/api/user';
  import editAdd from './editAdd.vue';
  import {parseTime, timeFn} from "@/utils";
  import {cfCarParkSearch} from "@/api/internetOfThings";

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const columns = [
    {
      width: 115,
      title: '车牌号',
      dataIndex: 'numberPlate',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
      bodyCellStyle: (record: any) => {
        let colorStr: string = '';
        switch (record.numberPlateColor){
          case 1:
            colorStr = 'blue';
            break;
          case 2:
            colorStr = 'orange';
            break;
            // case 3:
            //   colorStr = 'white';
            break;
          case 5:
            colorStr = 'green';
            break;
        }
        return {
          color: colorStr
        }
      }
    },
    {
      width: 120,
      title: '汽车类型',
      dataIndex: 'newVehicleType',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '停车场名称',
      dataIndex: 'zoneName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车辆识别码',
      dataIndex: 'vin',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车辆性质',
      dataIndex: 'newUseNature',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车辆铭牌',
      dataIndex: 'vehicleNameplate',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '发动机编号',
      dataIndex: 'engineNumber',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '发动机型号',
      dataIndex: 'engineModel',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '发动机生产厂',
      dataIndex: 'engineManufacturer',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '发动机铭牌',
      dataIndex: 'engineNameplate',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车主姓名',
      dataIndex: 'ownerName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '品牌型号',
      dataIndex: 'brandModel',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '注册时间',
      dataIndex: 'newRegistrationTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '发证时间',
      dataIndex: 'newIssuanceTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '排放阶段',
      dataIndex: 'newEmissionStage',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '燃油类型',
      dataIndex: 'newFuelType',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '联网状态',
      dataIndex: 'newNetworkStatus',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车队/单位',
      dataIndex: 'belongingCompany',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '环保编号',
      dataIndex: 'erCode',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '环保标签',
      dataIndex: 'ecoLabel',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '生产日期',
      dataIndex: 'newProductionDate',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '车辆类型',
      dataIndex: 'newVehicleScene',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '机械种类',
      dataIndex: 'newMachineType',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '机械码/pin码',
      dataIndex: 'machineNo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '机械型号',
      dataIndex: 'machineModel',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 120,
      title: '机械名称',
      dataIndex: 'machineName',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 90,
      title: '随车清单',
      dataIndex: 'accompanyingVehiclesListUrl',
      slotName: 'accompanyingVehiclesListUrl',
    },
    {
      width: 90,
      title: '行驶证图',
      dataIndex: 'imageUrl',
      slotName: 'imageUrl',
    },
    {
      width: 170,
      title: '录入时间',
      dataIndex: 'newCreateTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      userName: '',
      phone: '',
    };
  };
  const formModel = ref(generateFormModel());

  const selectLoading = ref(false);
  const vehicleTypeList = ref([]);
  const useNatureList = ref([]);
  const emissionStageList = ref([]);
  const fuelTypeList = ref([]);
  const machineTypeList = ref([]);
  const parkList = ref([]);
  const inCheckPointList = ref([]);
  const outCheckPointList = ref([]);
  const userList = ref([]);
  const vehicleSceneList = ref([
    {
      "id": 0,
      "name": '外部车辆'
    },
    {
      "id": 1,
      "name": '内部车辆'
    },
    {
      "id": 2,
      "name": '非道路移动机械'
    }
  ]);

  onMounted(() => {
    fetchData();
    getVehicleType();
    getUseNature();
    getEmissionStage();
    getFuelType();
    getMachineType();
    handleSelectSearch(null);
  });
  const statusToText = (status) => {
    switch (status) {
      case 0:
        return '未上传';
      case 1:
        return '上传待审核';
      case 2:
        return '审核通过';
      case 3:
        return '审核不通过';
      default:
        return '未知状态';
    }
  };
  const genderToText = (gender) => {
    switch (gender) {
      case 0:
        return '保密';
      case 1:
        return '男';
      case 2:
        return '女';
      default:
        return '未知性别';
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
  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const handleAdd = () => {
    editAddRef.value.handleClick();
  };
  const handleEdit = (e: any) => {
    editAddRef.value.handleClick(e);
  };
  const search = () => {
    fetchData();
  };
  const onDelete = async (id: string) => {
    await deleteUserDrivingLicense({ params: { id } });
    fetchData();
  };
  const checkParams = (obj: any) => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in obj) {
      if (!obj[i]) {
        if (obj[i] !== 0) {
          obj[i] = null;
        }
      }
    }
    return obj;
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getUserDrivingLicenseListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        userName: formModel.value.userName,
        phone: formModel.value.phone,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newVehicleType = getVehicleTypeName(i.vehicleType) || '-';
        i.newUseNature = getUseNatureName(i.useNature) || '-';
        i.newEmissionStage = getEmissionStageName(i.emissionStage) || '-';
        i.newFuelType = getFuelTypeName(i.fuelType) || '-';
        i.newVehicleScene = getVehicleSceneName(i.vehicleScene) || '-';
        i.newMachineType = getMachineTypeName(i.machineType) || '-';
        i.inCheckPointInfo = i.inCheckPointName + '/' + i.inCheckPointNo + '/' + i.inCheckPointCode;
        i.outCheckPointInfo = i.outCheckPointName + '/' + i.outCheckPointNo + '/' + i.outCheckPointCode;
        i.newNetworkStatus = i.networkStatus ? '已联网' : '未联网' ;
        i.newRegistrationTime = parseTime(i.registrationTime) || '-';
        i.newIssuanceTime = parseTime(i.issuanceTime) || '-';
        i.newProductionDate = parseTime(i.productionDate) || '-';
        i.newInTime = parseTime(i.inTime) || '-';
        i.newOutTime = parseTime(i.outTime) || '-';
        i.newCreateTime = parseTime(i.createTime) || '-';
        i.newCreateTime = parseTime(i.createTime) || '-';
        i.parkingDuration = (i.inTime && i.outTime) ? timeFn(Number(i.inTime), Number(i.outTime)) : '-';
      }
      state.list = data;
    } else {
      state.list = [];
    }
    // console.log(data, code, 999);
  };

  const getVehicleTypeName = (key: string) => {
    // @ts-ignore
    const findRes: any = vehicleTypeList.value.find((i) => i.code === key);
    return findRes?.name;
  };
  const getUseNatureName = (key: string) => {
    // @ts-ignore
    const findRes: any = useNatureList.value.find((i) => i.code === key);
    return findRes?.name;
  };
  const getEmissionStageName = (key: string) => {
    // @ts-ignore
    const findRes: any = emissionStageList.value.find((i) => i.code === key);
    return findRes?.name;
  };
  const getFuelTypeName = (key: string) => {
    // @ts-ignore
    const findRes: any = fuelTypeList.value.find((i) => i.code === key);
    return findRes?.name;
  };
  const getMachineTypeName = (key: string) => {
    // @ts-ignore
    const findRes: any = machineTypeList.value.find((i) => i.code === key);
    return findRes?.name;
  };
  const getVehicleSceneName = (key: number) => {
    // @ts-ignore
    let vehicleSceneName = '-';
    switch (key){
      case 0:
        vehicleSceneName = '外部车辆';
        break;
      case 1:
        vehicleSceneName = '内部车辆';
        break;
      case 2:
        vehicleSceneName = '非道路移动机械';
        break;
    }
    return vehicleSceneName;
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
