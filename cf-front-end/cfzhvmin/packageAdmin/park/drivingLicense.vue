<template>
  <view class="container">
    <!-- 上传行驶证正面照 -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="upload-section">
      <ocr-navigator ref="ocr" @onSuccess="handleSucces" certificateType="drivingLicense">
        <view class="images" v-if="image_path"><img :src="image_path" style="width: 100px; height: 100px;" /></view>
        <view class="upload-box" v-else>
          <uni-icons type="camera" size="26"></uni-icons>
          <view class="text">行驶证正面照</view>
        </view>
      </ocr-navigator>
    </view>
    <!-- #endif -->
    <form @submit="submitForm">
      <!-- 车牌号码 -->
      <view class="form-item">
        <label class="form-label" for="plate">
          <span class="required">*</span>
          车牌号码
        </label>
        <input class="form-input" id="plate" type="text" placeholder="请输入车牌号码" v-model="form.plateNumber" />
        <view v-if="form.plateNumber" class="clear-btn" @click="clearInput('plateNumber')">×</view>
      </view>

      <!-- 车牌号颜色 -->
      <view class="form-item">
        <label class="form-label" for="vehicleType">
          <span class="required">*</span>
          车牌颜色
        </label>
        <uni-data-select v-model="form.numberPlateColor" :localdata="numberPlateColorList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 车辆类型 -->
      <view class="form-item">
        <label class="form-label" for="vehicleType">
          <span class="required">*</span>
          车辆类型
        </label>
        <uni-data-select v-model="form.vehicleType" :localdata="vehicleTypeList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 车辆识别码 -->
      <view class="form-item">
        <label class="form-label" for="vehicleId">
          <span class="required">*</span>
          车辆识别码
        </label>
        <input class="form-input" id="vehicleId" type="text" placeholder="请输入车辆识别码" v-model="form.vehicleId" />
        <view v-if="form.vehicleId" class="clear-btn" @click="clearInput('vehicleId')">×</view>
      </view>

      <!-- 使用性质 -->
      <view class="form-item">
        <label class="form-label" for="useNature">
          <span class="required">*</span>
          使用性质
        </label>
        <uni-data-select v-model="form.useNature" :localdata="useNatureList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 发动机号码 -->
      <view class="form-item">
        <label class="form-label" for="engineNumber">
          <span class="required">*</span>
          发动机号码
        </label>
        <input class="form-input" id="engineNumber" type="text" placeholder="请输入发动机号码" v-model="form.engineNumber" />
        <view v-if="form.engineNumber" class="clear-btn" @click="clearInput('engineNumber')">×</view>
      </view>

      <!-- 所有人 -->
      <view class="form-item">
        <label class="form-label" for="owner">
          <span class="required">*</span>
          所有人
        </label>
        <input class="form-input" id="owner" type="text" placeholder="请输入所有人" v-model="form.owner" />
        <view v-if="form.owner" class="clear-btn" @click="clearInput('owner')">×</view>
      </view>

      <!-- 地址 -->
      <view class="form-item">
        <label class="form-label" for="address">
          <span class="required">*</span>
          地址
        </label>
        <input class="form-input" id="address" type="text" placeholder="请输入地址" v-model="form.address" />
        <view v-if="form.address" class="clear-btn" @click="clearInput('address')">×</view>
      </view>

      <!-- 品牌型号 -->
      <view class="form-item">
        <label class="form-label" for="brandModel">
          <span class="required">*</span>
          品牌型号
        </label>
        <input class="form-input" id="brandModel" type="text" placeholder="请输入品牌型号" v-model="form.brandModel" />
        <view v-if="form.brandModel" class="clear-btn" @click="clearInput('brandModel')">×</view>
      </view>

      <!-- 注册日期 -->
      <view class="form-item">
        <label class="form-label" for="registerDate">
          <span class="required">*</span>
          注册日期
        </label>
        <picker class="form-picker" mode="date" :value="pickerValues.registerDate" @change="onDateChange('registerDate', $event)">
          <view class="picker">{{ form.registerDate || registerDateType }}</view>
        </picker>
      </view>

      <!-- 发证日期 -->
      <view class="form-item">
        <label class="form-label" for="issueDate">
          <span class="required">*</span>
          发证日期
        </label>
        <picker class="form-picker" mode="date" :value="pickerValues.issueDate" @change="onDateChange('issueDate', $event)">
          <view class="picker">{{ form.issueDate || issueDateType }}</view>
        </picker>
      </view>

      <!-- 排放阶段 -->
      <view class="form-item">
        <label class="form-label" for="emissionStage">
          <span class="required">*</span>
          排放阶段
        </label>
        <uni-data-select v-model="form.emissionStage" :localdata="emissionStageList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 燃料类型 -->
      <view class="form-item">
        <label class="form-label" for="fuelType">
          <span class="required">*</span>
          燃料类型
        </label>
        <uni-data-select v-model="form.fuelType" :localdata="fuelTypeList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 是否联网 -->
      <view class="form-item">
        <label class="form-label" for="fuelType">
          联网状态
        </label>
        <uni-data-select v-model="form.networkStatus" :localdata="networkStatusList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 所属单位 -->
      <view class="form-item">
        <label class="form-label" for="belongingCompany">
          单位/车队
        </label>
        <input class="form-input" id="belongingCompany" type="text" placeholder="请输入地址" v-model="form.belongingCompany" />
        <view v-if="form.belongingCompany" class="clear-btn" @click="clearInput('belongingCompany')">×</view>
      </view>

      <!-- 环保登记编号 -->
      <view class="form-item">
        <label class="form-label" for="erCode">
          环保编号
        </label>
        <input class="form-input" id="erCode" type="text" placeholder="请输入地址" v-model="form.erCode" />
        <view v-if="form.erCode" class="clear-btn" @click="clearInput('erCode')">×</view>
      </view>

      <!-- 生产日期 -->
      <view class="form-item">
        <label class="form-label" for="productionDate">
          生产日期
        </label>
        <picker class="form-picker" mode="date" :value="form.productionDate" @change="onDateChange('productionDate', $event)">
          <view class="picker">{{ selectProductionDate }}</view>
        </picker>
      </view>


      <!-- 环保清单车辆类型 -->
      <view class="form-item">
        <label class="form-label" for="fuelType">
          <span class="required">*</span>
          随车清单类型
        </label>
        <uni-data-select v-model="form.accompanyingVehiclesType" :localdata="accompanyingVehiclesTypeList" style="width: 157px;"></uni-data-select>
      </view>

      <!-- 上传随车清单 -->
      <view class="form-item">
        <label class="form-label">随车清单</label>
        <view class="upload-section" style="background-color: #fff">
          <view class="upload-box" style="background-color: #f4f4f4" @click="chooseFile(1)">
            <uni-icons type="camera" size="26"></uni-icons>
            <view class="text">随车清单</view>
          </view>
        </view>
      </view>
    </form>
    <!-- 提交按钮 -->
    <button type="submit" class="submit-btn" @click="submitForm">提交</button>
  </view>
</template>
<script>
import { zh_timeFormat, formatTimestamp, timeDifference } from '../../utils/index.js';
import { cfAdminUpdateCarParkPackage, getInfoByVin, getVehicleTypeList, addDrivingLicense } from '../../network/api.js';
import dayjs from 'dayjs';
import { baseUrl } from '../../common/config';
export default {
  data() {
    return {
      plateColorList: ['蓝色', '黄色', '白色', '黑色', '新能源', '其他'],
      vehicleTypeList: [],
      numberPlateColorList: [
        { value: '0', text: '未知' },
        { value: '1', text: '蓝色' },
        { value: '2', text: '黄色' },
        { value: '3', text: '白色' },
        { value: '4', text: '黑色' },
        { value: '5', text: '绿色' }
      ],
      networkStatusList: [
        { value: '0', text: '未联网' },
        { value: '1', text: '已联网' }
      ],
      useNatureList: [
        { value: 'A', text: '非营运' },
        { value: 'B', text: '公路客运' },
        { value: 'C', text: '公交客运' },
        { value: 'D', text: '出租客运' },
        { value: 'E', text: '旅游客运' },
        { value: 'F', text: '货运' },
        { value: 'G', text: '租赁' },
        { value: 'H', text: '警用' },
        { value: 'I', text: '消防' },
        { value: 'J', text: '救护' },
        { value: 'K', text: '工程抢险' },
        { value: 'L', text: '营转非' },
        { value: 'M', text: '出租转非' },
        { value: 'N', text: '教练' },
        { value: 'O', text: '幼儿校车' },
        { value: 'P', text: '小学生校车' },
        { value: 'Q', text: '初中生校车' },
        { value: 'R', text: '危险品运输' },
        { value: 'S', text: '中小学生校车' }
      ],
      fuelTypeList: [
        { value: 'A', text: '汽油' },
        { value: 'B', text: '柴油' },
        { value: 'C', text: '电' },
        { value: 'D', text: '混合油' },
        { value: 'E', text: '天然气' },
        { value: 'F', text: '液化石油气' },
        { value: 'L', text: '甲醇' },
        { value: 'M', text: '乙醇' },
        { value: 'N', text: '太阳能' },
        { value: 'O', text: '混合动力' },
        { value: 'P', text: '氢' },
        { value: 'Q', text: '生物燃料' },
        { value: 'Y', text: '无' },
        { value: 'Z', text: '其它' }
      ],
      accompanyingVehiclesTypeList: [{ value: '0', text: '2017年前车辆' }, { value: '1', text: '2017年后车辆' }, { value: '2', text: '非道路移动机械' }],
      registerDateList: ['2024-01-01'],
      issueDateList: ['2024-01-01'],
      emissionStageList: [
        { value: '0', text: '国零' },
        { value: '1', text: '国一' },
        { value: '2', text: '国二' },
        { value: '3', text: '国三' },
        { value: '4', text: '国四' },
        { value: '5', text: '国五' },
        { value: '6', text: '国六' },
        { value: 'D', text: '电动' }
      ],
      selectedCompany: '点击选择企业名称',
      selectedPlateColor: '点击选择号牌颜色',
      selectedVehicleType: '点击选择车辆类型',
      selectedUseNature: '点击选择使用性质',
      selectedEmissionStage: '点击选择排放阶段',
      selectedFuelType: '点击选择燃料类型',
      registerDateType: '点击选择注册日期',
      issueDateType: '点击选择发证日期',
      selectProductionDate: '点击选择生产日期',
      image_path: '',
      form: {
        plateNumber: '', //车牌号码
        vehicleType: '', //车辆类型
        vehicleId: '', //车辆识别码
        engineNumber: '', //发动机号码
        owner: '', //所有人
        address: '', //地址
        brandModel: '', //品牌型号
        registerDate: '', //注册日期
        issueDate: '', //发证日期
        emissionStage: '', // 排放阶段
        fuelType: '', //燃料类型
        useNature: '', //使用性质
        accompanyingVehiclesType: '', //随车清单类型
        phone: '', //手机号
        image: '', //行驶证图片
        accompanyingVehiclesList: '', //随车清单
        numberPlateColor: '', //车牌颜色
        networkStatus: '', //联网状态
        belongingCompany: '', //所属单位（车队）
        erCode: '', //环保登记编号
        productionDate: '', //生成日期
        zoneId: '', //录入场地id
      },
      originPage: '',
      carParkId: ''
    };
  },
  computed: {
    pickerValues() {
      return {
        vehicleType: this.vehicleTypeList.indexOf(this.selectedVehicleType),
        // useNature: this.useNatureList.indexOf(this.selectedUseNature),
        registerDate: this.registerDateType,
        issueDate: this.issueDateType
      };
    }
  },
  onLoad(e) {
    if (e.originPage) {
      this.originPage = e.originPage;
    }
    if (e.carParkId) {
      this.carParkId = e.carParkId;
      this.form.zoneId = e.carParkId;
    }
    this.queryVehicleTypeList();
  },
  methods: {
    async queryVehicleTypeList() {
      const { data, code } = await getVehicleTypeList({
        page: 1,
        size: 200
      });
      for (let index = 0; index < data.length; index++) {
        data[index]['value'] = data[index].code;
        data[index]['text'] = data[index].name;
      }
      this.vehicleTypeList = data;
    },
    async queryByVin(_vin) {
      const { data, code } = await getInfoByVin({
        vin: _vin
      });
      if (code === 10002) {
        switch (data.fueltype) {
          case '汽油':
            this.form.fuelType = 'A';
            break;
          case '柴油':
            this.form.fuelType = 'B';
            break;
          case '电':
            this.form.fuelType = 'C';
            break;
          case '混合油':
            this.form.fuelType = 'D';
            break;
          case '天然气':
            this.form.fuelType = 'E';
            break;
          case '液化石油气':
            this.form.fuelType = 'F';
            break;
          case '甲醇':
            this.form.fuelType = 'L';
            break;
          case '乙醇':
            this.form.fuelType = 'M';
            break;
          case '太阳能':
            this.form.fuelType = 'N';
            break;
          case '混合动力':
            this.form.fuelType = 'O';
            break;
          case '氢':
            this.form.fuelType = 'P';
            break;
          case '生物燃料':
            this.form.fuelType = 'Q';
            break;
          case '无':
            this.form.fuelType = 'Y';
            break;
          case '其它':
            this.form.fuelType = 'Z';
            break;
          case '油电混合':
            this.form.fuelType = 'O';
            break;
        }
        switch (data.environmentalstandards) {
          case '国零':
            this.form.emissionStage = '0';
            break;
          case '国一':
            this.form.emissionStage = '1';
            break;
          case '国二':
            this.form.emissionStage = '2';
            break;
          case '国三':
            this.form.emissionStage = '3';
            break;
          case '国四':
            this.form.emissionStage = '4';
            break;
          case '国五':
            this.form.emissionStage = '5';
            break;
          case '国六':
            this.form.emissionStage = '6';
            break;
          case '电动':
            this.form.emissionStage = 'D';
            break;
        }
      }
    },
    updateSelectedValue(field, value) {
      if (field === 'registerDate') {
        this.form.registerDate = value;
        this.registerDateType = value;
      } else if (field === 'issueDate') {
        this.form.issueDate = value;
        this.issueDateType = value;
      } else {
        this[`selected${field.charAt(0).toUpperCase() + field.slice(1)}`] = value;
      }
    },
    handleSucces(e) {
      const { vehicle_type, owner, model, plate_num, vin, engine_num, addr, issue_date, register_date, use_character, image_path } = e.detail;
      this.image_path = image_path;
      this.form.owner = owner.text;
      //车辆类型
      for (let index = 0; index < this.vehicleTypeList.length; index++) {
        if (this.vehicleTypeList[index]['text'] == vehicle_type.text) {
          this.form.vehicleType = this.vehicleTypeList[index]['value'];
        }
      }
      // this.form.vehicleType = vehicle_type.text
      this.form.plateNumber = plate_num.text;
      this.form.vehicleId = vin.text;
      //通过车架号查询车辆其它信息
      if (vin.text) {
        this.queryByVin(vin.text);
      }
      this.form.engineNumber = engine_num.text;
      this.form.brandModel = model.text;
      this.form.address = addr.text;
      this.form.registerDate = register_date.text;
      this.form.issueDate = issue_date.text;
      // 回显下拉框选中值
      this.updateSelectedValue('vehicleType', vehicle_type.text);

      //使用i性质
      for (let index = 0; index < this.useNatureList.length; index++) {
        if (this.useNatureList[index]['text'] == use_character.text) {
          this.form.useNature = this.useNatureList[index]['value'];
          break;
        }
      }
      // this.updateSelectedValue('useNature', use_character.text);
      this.updateSelectedValue('registerDate', register_date.text);
      this.updateSelectedValue('issueDate', issue_date.text);

      //上传图片
      const filePath = this.image_path; // 选择图片的临时路径
      let that = this;
      uni.uploadFile({
        url: `${baseUrl}/file/cfFile/upload`,
        filePath,
        name: 'file',
        formData: {
          businesskey: 'file',
          fileType: 1,
          scene: 'certificates'
        },
        header: {
          Authorization: uni.getStorageSync('token')
        },
        success: async res => {
          console.log(JSON.parse(res.data));
          const newRes = JSON.parse(res.data);
          if (newRes.code == 10002) {
            that.form.image = newRes.data.id;
          } else {
            uni.showToast({
              title: '未知错误',
              icon: 'none'
            });
          }
        }
      });
    },
    // 下拉框选择事件
    onPickerChange(field, event) {
      const selectedValue = this[`${field}List`][event.mp.detail.value];
      this[`selected${field.charAt(0).toUpperCase() + field.slice(1)}`] = selectedValue;
      this.form[field] = selectedValue; // 更新 form 对象中的对应字段
      this[`${field}Selected`] = true; // 更新选中状态
    },
    onDateChange(field, event) {
      this.form[field] = event.mp.detail.value;
    },
    chooseFile(type) {
      uni.chooseImage({
        count: 1,
        success: res => {
          const filePath = res.tempFilePaths[0]; // 选择图片的临时路径
          let that = this;
          // const name = that.avatarUrl.substring(that.avatarUrl.lastIndexOf(".") + 1); // 获取图片格式 png jpg 等
          uni.uploadFile({
            url: `${baseUrl}/file/cfFile/upload`,
            filePath,
            name: 'file',
            formData: {
              businesskey: 'file',
              fileType: 1,
              scene: 'certificates'
            },
            header: {
              Authorization: uni.getStorageSync('token')
            },
            success: async res => {
              const newRes = JSON.parse(res.data);
              if (newRes.code == 10002) {
                that.form.accompanyingVehiclesList = newRes.data.id;
              } else {
                uni.showToast({
                  title: '未知错误',
                  icon: 'none'
                });
              }
            }
          });
        }
      });
    },
    // 清空输入框
    clearInput(field) {
      this.form[field] = '';
    },
    // 提交表单校验
    async submitForm() {
      if (this.form.id == null) {
        const { data, code, message, mixMessage } = await addDrivingLicense({
          address: this.form.address,
          brandModel: this.form.brandModel,
          emissionStage: this.form.emissionStage,
          engineNumber: this.form.engineNumber,
          fuelType: this.form.fuelType,
          issuanceTime: dayjs(this.form.issueDate).unix() * 1000,
          numberPlate: this.form.plateNumber,
          ownerName: this.form.owner,
          phone: this.form.phone,
          registrationTime: dayjs(this.form.registerDate).unix() * 1000,
          useNature: this.form.useNature,
          vehicleType: this.form.vehicleType,
          vin: this.form.vehicleId,
          image: this.form.image,
          accompanyingVehiclesList: this.form.accompanyingVehiclesList,
          zoneId: this.form.zoneId
        });
        if (code === 10002) {
          if (this.originPage) {
            //跳转到 添加 行驶证 页面
            uni.navigateTo({
              url: this.originPage + '?carParkId=' + this.carParkId
            });
          } else {
            //跳转到 个人中心页面
            uni.switchTab({
              url: '/pages/index/my'
            });
          }
        } else {
          uni.showToast({
            title: message,
            icon: 'none',
            content: mixMessage
          });
        }
      } else {
        const { data, code, message, mixMessage } = await cfAdminUpdateCarParkPackage(newFormData);
        if (code === 10002) {
          this.$refs['showLeft'].close();
          this.stopGetUseLog = false;
          this.queryForm.page = 1;
          this.list = [];
          this.getList();

          keys.forEach(key => {
            this.formData[key] = null;
          });
        } else {
          uni.showToast({
            title: message,
            icon: 'none',
            content: mixMessage
          });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;
  padding: 10px 20px 0 20px;

  .upload-section {
    background-color: #f2f2f2;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;

    .upload-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 80px;
      height: 60px;
      text-align: center;
      background-color: #f7f8fa;
      padding-top: 20px;

      .text {
        font-size: 10px;
        color: #9d9d9d;
      }
    }
  }

  .form-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ebedf0;
  }

  .form-label {
    flex-basis: 35%;
  }

  .form-input,
  .form-picker {
    color: #6d6d6d;
    flex-basis: 60%;
    font-size: 13px;
  }

  .clear-btn {
    background-color: #c3c3c3;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50% 50%;
    text-align: center;
    line-height: 20px;
  }

  .required {
    color: red;
    margin-right: 5px;
  }

  .picker {
    font-size: 13px;
    border-radius: 5px;
    color: #6d6d6d;
  }

  .submit-btn {
    width: 100%;
    position: absolute;
    left: 0;
    background-color: #2db7f5;
    color: #fff;
    text-align: center;
    border-radius: 0;
    margin-top: 20px;
  }
}
</style>
