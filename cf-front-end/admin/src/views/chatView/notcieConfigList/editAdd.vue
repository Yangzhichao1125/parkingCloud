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
        {{ formData?.id ? '编辑消息配置' : '新增消息配置' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col  :span="8">
                <a-form-item label="店铺" field="shopId">
                  <a-select
                      v-model="formData.scene"
                      :options="sceneOptions"
                      placeholder="请选择场景"
                      @change="handleShopSearch('')"
                      allow-clear
                  />
                  <a-select v-model="formData.shopId" :loading="loading" placeholder="输入店铺名" allow-search :allow-clear=true
                            :filter-option="false" @search="handleShopSearch">
                    <a-option v-for="item of shopList" :key="item?.id" :value="item?.id">{{ item.name }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col  :span="8">
                <a-form-item label="资源" field="sourceId">
                  <a-select
                      v-model="formData.noticePlatform"
                      :options="platformOptions"
                      placeholder="请选择平台"
                      @change="handlePlatformSearch()"
                      allow-clear
                  />
                  <a-select v-model="formData.sourceId" :loading="loading" placeholder="输入资源名" :allow-clear=true
                            :filter-option="false">
                    <a-option v-for="item of sourceList" :key="item?.id" :value="item?.id">{{ item.name || item.templateNotes }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="通知类型" field="noticeType" required>
                  <a-select
                    v-model="formData.noticeType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">停车套餐到期通知</a-option>
                    <a-option :value="2">停车套餐续费成功通知</a-option>
                    <a-option :value="3">车辆审核通知</a-option>
                    <a-option :value="4">收款账号申请通知</a-option>
                    <a-option :value="5">车辆辆入场通知</a-option>
                    <a-option :value="6">车辆出场通知</a-option>
                    <a-option :value="7">开始充电通知</a-option>
                    <a-option :value="8">充电结束通知</a-option>
                    <a-option :value="9">预约到访审核通知</a-option>
                    <a-option :value="10">停车追缴通知</a-option>
                    <a-option :value="11">会员到期通知</a-option>
                    <a-option :value="12">会员续费成功通知</a-option>
                    <a-option :value="13">物业费欠费通知</a-option>
                    <a-option :value="14">物业费缴费成功通知</a-option>
                    <a-option :value="15">上门报修下单通知</a-option>
                    <a-option :value="16">上门报修接单通知</a-option>
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
  import { ref } from 'vue';
  import { addNoticeSetting, updateNoticeSetting } from '@/api/chatApi';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const shopList = ref([]);
  const sourceList = ref([]);
  import {cfCarParkSearch, cfChargingStationSearch} from "@/api/internetOfThings";
  import { getSmsConfigListByQuery } from '@/api/verification';
  import { getSubscribeMessageTemplateListByQuery } from '@/api/user';
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    noticePlatform: '',
    noticeType: '',
    scene: 1,
    shopId: '',
    sourceId: '',
    id: '',
  });
  const sceneOptions = [
    {
      label: '通用',
      value: 0,
    },
    {
      label: '停车场',
      value: 1,
    },
    {
      label: '商城',
      value: 2,
    },
    {
      label: '充电',
      value: 3,
    },
    {
      label: '洗车',
      value: 4,
    },
    {
      label: '加油',
      value: 5,
    }
  ];
  const platformOptions = [
    {
      label: '微信公众号',
      value: 1,
    },
    {
      label: '微信小程序',
      value: 2,
    },
    {
      label: '系统消息',
      value: 3,
    },
    {
      label: '阿里小程序',
      value: 4,
    },
    {
      label: '阿里生活号',
      value: 5,
    },
    {
      label: '短信',
      value: 6,
    }
  ];
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
      shopList.value = [{"id": newInfo.shopId, "name": newInfo.shopName}];
      sourceList.value = [{"id": newInfo.sourceId, "name": newInfo.sourceName}];
    }else{
      handleShopSearch('');
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
        const { code } = await updateNoticeSetting(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addNoticeSetting(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('添加成功!');
          emit('fetchData');
        }
      }
    });
  };

  /**
   * 搜索店铺（判断类型）
   * @param value
   */
  const handleShopSearch = async (value: any) => {
    switch (formData.value.scene){
      case 0:
        //通用
        shopList.value = [];
        break;
      case 1:
        //停车
        const { data, code } = await cfCarParkSearch({
          params: {
            name: value,
            page: 1,
            size: 200,
          },
        });
        if (code === 10002) {
          shopList.value = data;
        } else {
          shopList.value = [];
        }
        break;
      case 2:
        //商城
        shopList.value = [];
        break;
      case 3:
        //充电
        const cfChargingStationSearchData = await cfChargingStationSearch({
          params: {
            stationName: value,
            page: 1,
            size: 200,
          },
        });
        if (cfChargingStationSearchData.code === 10002) {
          shopList.value = cfChargingStationSearchData.data;
        } else {
          shopList.value = [];
        }
        break;
      case 4:
        //洗车
        shopList.value = [];
        break;
      case 5:
        //加油
        shopList.value = [];
        break;
      default:
        shopList.value = [];
    }
  };

  /**
   * 搜索资源（判断类型）
   * @param value
   */
  const handlePlatformSearch = async () => {
    console.log('资源切换',formData.value.noticePlatform)
    switch (formData.value.noticePlatform){
      case 1:
        //微信公众号
        sourceList.value = [];
        break;
      case 2:
        //微信小程序
        const result = await getSubscribeMessageTemplateListByQuery({
          params: {
            page: 1,
            size: 200,
          },
        });
        if (result.code === 10002) {
          sourceList.value = result.data;
        } else {
          sourceList.value = [];
        }
        break;
      case 3:
        //系统消息
        sourceList.value = [];
        break;
      case 4:
        //阿里小程序
        sourceList.value = [];
        break;
      case 5:
        //阿里生活号
        sourceList.value = [];
        break;
      case 6:
        //短信
        const { data, code } = await getSmsConfigListByQuery({
          params: {
            page: 1,
            size: 200,
          },
        });
        if (code === 10002) {
          sourceList.value = data;
        } else {
          sourceList.value = [];
        }
        break;
      default:
        sourceList.value = [];
    }
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
