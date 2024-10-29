<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.pay.internetofthings',
        'menu.pay.internetofthings.carpark',
        'menu.pay.internetofthings.carpark.electronicledgerlog',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.pay.internetofthings.carpark.electronicledgerlog')"
    >
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-tabs>
              <a-tab-pane key="1">
                <template #title>
                  <icon-calendar/> 输入搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item field="id" label="记录id">
                      <a-input
                        v-model="formModel.id"
                        placeholder="请输入数据id精准搜索"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="numberPlate" label="车牌号">
                      <a-input
                        v-model="formModel.numberPlate"
                        placeholder="请输入4个以上字符搜索"
                        allow-clear
                      />
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
                        v-model="formModel.carParkId"
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
                        v-model="formModel.inCheckPointId"
                        placeholder="请选择"
                        allow-clear
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
                        v-model="formModel.outCheckPointId"
                        placeholder="请选择"
                        allow-clear
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
                    <a-form-item label="用户" field="uid">
                      <a-select
                        v-model="formModel.uid"
                        :style="{ width: '320px' }"
                        :loading="loading"
                        placeholder="请输入录入人手机号"
                        allow-search
                        :filter-option="false"
                        allow-clear
                        @search="handleSearch"
                      >
                        <a-option
                          v-for="item of userList"
                          :key="item?.id"
                          :value="item?.id"
                          >{{ item.userName }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #title>
                  <icon-clock-circle/> 时间搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item label="入场时间" field="inTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onInTimeChange"
                        @select="onInTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="出场时间" field="outTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onOutTimeChange"
                        @select="onOutTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="录入时间" field="createTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onCreateTimeChange"
                        @select="onCreateTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
              <a-tab-pane key="3">
                <template #title>
                  <icon-user/> 选择搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item label="汽车类型" field="vehicleType">
                      <a-select
                        v-model="formModel.vehicleType"
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
                      label="入场方式"
                      field="inReleaseType"
                      validate-trigger="input"
                    >
                      <a-select
                        v-model="formModel.inReleaseType"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.value"
                          v-for="item in releaseTypeArr"
                          :key="item.value"
                          >{{ item.label }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      label="出场方式"
                      field="outReleaseType"
                      validate-trigger="input"
                    >
                      <a-select
                        v-model="formModel.outReleaseType"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.value"
                          v-for="item in releaseTypeArr"
                          :key="item.value"
                          >{{ item.label }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="vehicleScene" label="车辆类型">
                      <a-select
                        v-model="formModel.vehicleScene"
                        placeholder="请选择车辆类型"
                        allow-clear
                      >
                        <a-option v-for="vehicleScene in vehicleSceneList" :key="vehicleScene.id" :value="vehicleScene.id">
                            {{ vehicleScene.name }}
                        </a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
            
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <!-- <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button> -->
<!--            <a-button @click="importUseLog">-->
<!--              {{ $t('searchTable.operation.import') }}-->
<!--            </a-button>-->
            <a-button type="primary" status="danger" @click="onBatchDelete"
              >删除</a-button
            >
<!--            <a-button type="dashed" status="success" @click="oneClickProcessingUseLog">一键处理</a-button>-->
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button @click="downloadUseLog">
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
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #inBigImageUrl="{ record }">
          <a-image
            :src="record.inBigImageUrl"
            :width="80"
            :height="30"
          ></a-image>
        </template>
        <template #outBigImageUrl="{ record }">
          <a-image
            :src="record.outBigImageUrl"
            :width="80"
            :height="30"
          ></a-image>
        </template>
        <template #accompanyingVehiclesListUrl="{ record }">
          <a-image
              :src="record.accompanyingVehiclesListUrl"
              :width="80"
              :height="30"
          ></a-image>
        </template>
        <template #imageUrl="{ record }">
          <a-image
              :src="record.imageUrl"
              :width="80"
              :height="30"
          ></a-image>
        </template>
        <!-- <template #operations="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template> -->
        <template #operations="{ record }">
          <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>操作</a-link>
            <template #content>
<!--              <a-doption>-->
<!--                <a-space @click="getUseLogImages(record)">-->
<!--                  <icon-eye />-->
<!--                  <span> 显示图片 </span>-->
<!--                </a-space>-->
<!--              </a-doption>-->
              <a-doption>
                <a-space @click="handleEdit(record)">
                  <icon-edit />
                  <span> 编辑 </span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <useLogImport ref="useLogImportRef" />
    <oneClickProcessing ref="oneClickProcessingRef" @fetch-data="resetSelectedKeys" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    useLogDelete,
    cfCarParkSearch,
    exportElectronicLedger,
    getCarParkUseLogImages, electronicLedgerLogGet,
  } from '@/api/internetOfThings';
  import {cfCheckPointGet } from '@/api/park';
  import { cfUserQuicklySearchUser, getVehicleTypeListByQuery, getUseNatureListByQuery, getEmissionStageListByQuery, getFuelTypeListByQuery, getMachineTypeListByQuery } from '@/api/user';
  import editAdd from './editAdd.vue';
  import { parseTime, timeFn } from '@/utils';
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';
  import { getPaymentAgencyListByQuery } from '@/api/pay';
  import useLogImport from './useLogImport.vue';
  import oneClickProcessing from './oneClickProcessing.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    fixed: true,
    onlyCurrent: true,
  });
  const selectedKeys = ref([]);
  const loading = ref(false);
  const selectLoading = ref(false);
  const editAddRef = ref();
  const useLogImportRef = ref();
  const oneClickProcessingRef = ref();
  const columns = [
    {
      width: 60,
      title: 'id',
      dataIndex: 'id',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
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
      dataIndex: 'carParkName',
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
      width: 170,
      title: '入场货物',
      dataIndex: 'inLoadingGoodsInfo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '出场货物',
      dataIndex: 'outLoadingGoodsInfo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '入口名称/入口编号/道闸编号',
      dataIndex: 'inCheckPointInfo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '出口名称/出口编号/道闸编号',
      dataIndex: 'outCheckPointInfo',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '进场时间',
      dataIndex: 'newInTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      width: 170,
      title: '出场时间',
      dataIndex: 'newOutTime',
      ellipsis: true,
      tooltip: {
        'background-color': '#3491FA',
      },
    },
    {
      title: '入场方式',
      dataIndex: 'newInReleaseType',
      width: '90',
    },
    {
      title: '出场方式',
      dataIndex: 'newOutReleaseType',
      width: '90',
    },
    {
      width: 90,
      title: '入场大图',
      dataIndex: 'inBigImageUrl',
      slotName: 'inBigImageUrl',
    },
    {
      width: 90,
      title: '出场大图',
      dataIndex: 'outBigImageUrl',
      slotName: 'outBigImageUrl',
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
      width: 90,
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
      fixed: 'right',
    },
  ];

  //0-未放行/1-自动抬杆/2-人工抬杆/3-手机放行，断电断网时/4-扫码
  const releaseTypeArr = [
    { value: 0, label: '未放行' },
    { value: 1, label: '自动抬杆' },
    { value: 2, label: '人工抬杆' },
    { value: 3, label: '手机放行' },
    { value: 4, label: '扫码' },
    { value: 5, label: '异常放行' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      id: '',
      numberPlate: '',
      carParkId: '',
      vehicleType: '',
      uid: '',
      minInTime: '',
      maxInTime: '',
      minOutTime: '',
      maxOutTime: '',
      minCreateTime: '',
      maxCreateTime: '',
      paymentAgencyShortName: '',
      inReleaseType: '',
      outReleaseType: '',
      inCheckPointId: '',
      outCheckPointId: '',
      homeGroup: '',
      visitUnit: '',
      noInTime: false,
      notPay: false,
    };
  };
  const handleSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      userList.value = data;
    } else {
      userList.value = [];
    }
  };

  const importUseLog = () => {
    useLogImportRef.value.handleClick();
  }

  const oneClickProcessingUseLog = () => {
    oneClickProcessingRef.value.handleClick(selectedKeys.value);
  }

  //下载停车记录
  const downloadUseLog = async () => {
    let newForm = cloneDeep(formModel.value);
    if (newForm.noInTime===true) {
      newForm.inTime = 0;
    }else{
      newForm.inTime = null;
    }
    if (newForm.notPay===true) {
      newForm.createTime = 0;
    }else{
      newForm.createTime = null;
    }
    await exportElectronicLedger({
      params: checkParams({
        ...newForm,
      }),
      responseType: 'blob',
    })
    .then((data) => {
      const link = document.createElement('a')
      let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      // link.download = res.headers['content-disposition'] //下载后文件名
      link.download = '电子台账' //下载的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const onInTimeSelect = (dateString: any, date: any) => {
    //不做任何操作
  };
  const onInTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minInTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxInTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minInTime = '';
      formModel.value.maxInTime = '';
    }
    
  };
  const onOutTimeSelect = (dateString: any, date: any) => {
    //不做任何操作
  };
  const onOutTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minOutTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxOutTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minOutTime = '';
      formModel.value.maxOutTime = '';
    }
    
  };
  const onCreateTimeSelect = (dateString: any, date: any) => {
    //不做任何操作
  };
  const onCreateTimeChange = (dateString: any, date: Date[]) => {
    if(date!=undefined){
      formModel.value.minCreateTime = dayjs(date[0]).valueOf() + '';
      formModel.value.maxCreateTime = dayjs(date[1]).valueOf() + '';
    }else{
      formModel.value.minCreateTime = '';
      formModel.value.maxCreateTime = '';
    }
    
  };
  const formModel = ref(generateFormModel());
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
  const onBatchDelete = async () => {
    if(selectedKeys.value.length==0){
      return;
    }
    await useLogDelete({ params: { ids: selectedKeys.value.join(',') } });
    selectedKeys.value = [];
    fetchData();
  };
  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const handleAdd = () => {
    editAddRef.value.handleClick({});
  };
  const handleEdit = (e: any) => {
    editAddRef.value.handleClick(e);
  };
  const search = () => {
    pagination.current = 1;
    fetchData();
  };
  const onDelete = async (id: string) => {
    await useLogDelete({ params: { id } });
    fetchData();
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
  const getUseLogImages = async (useLog: any) => {
    const { data, code, message } = await getCarParkUseLogImages({
      params: {
        page: 1,
        size: 200,
        id: useLog.id
      },
    });
    if (code === 10002) {
      useLog.inSmallImageUrl = data.inSmallImageUrl
      useLog.outSmallImageUrl = data.outSmallImageUrl
      useLog.inBigImageUrl = data.inBigImageUrl
      useLog.outBigImageUrl = data.outBigImageUrl
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const reset = () => {
    formModel.value = generateFormModel();
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
  const getGoodsUnitName = (key: string) => {
    // @ts-ignore
    let goodsUnitName = '-';
    switch (key){
      case 'ton':
        goodsUnitName = '吨';
        break;
      case 'packet':
        goodsUnitName = '包';
        break;
      case 'liter':
        goodsUnitName = '升';
        break;
    }
    return goodsUnitName;
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
  const resetSelectedKeys = async () => {
    selectedKeys.value = [];
    fetchData();
  }
  const fetchData = async () => {
    loading.value = true;
    let newForm = cloneDeep(formModel.value);
    if (newForm.noInTime===true) {
      newForm.inTime = 0;
    }else{
      newForm.inTime = null;
    }
    if (newForm.notPay===true) {
      newForm.createTime = 0;
    }else{
      newForm.createTime = null;
    }
    // @ts-ignore
    const { data, code, total } = await electronicLedgerLogGet({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        ...newForm,
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
        i.inLoadingGoodsInfo = i.inLoadingGoods + '/' + i.inGoodsQuantity + '/' + getGoodsUnitName(i.inGoodsUnit);
        i.outLoadingGoodsInfo = i.outLoadingGoods + '/' + i.outGoodsQuantity + '/' + getGoodsUnitName(i.outGoodsUnit);
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
        for(const j of releaseTypeArr){
          // console.log(j);
          if(i.inReleaseType == j.value){
            i.newInReleaseType = j.label;
          }
          if(i.outReleaseType == j.value){
            i.newOutReleaseType = j.label;
          }
        }
      }
      state.list = data;
    } else {
      state.list = [];
    }
    // console.log(data, code, 999);
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
