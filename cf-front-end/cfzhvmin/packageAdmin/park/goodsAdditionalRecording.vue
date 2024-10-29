<template>
	<view class="container">
		<form @submit="submitForm">

      <!-- 停车场 -->
      <view class="form-item">
        <label class="form-label" for="carParkId"><span class="required">*</span> 停车场</label>
        {{carParkName}}
      </view>

      <!-- 行驶证 -->
<!--      <view class="form-item">-->
<!--        <label class="form-label" for="drivingId"><span class="required">*</span>行驶证</label>-->
<!--        <uni-data-select-->
<!--            v-model="form.drivingId"-->
<!--            :localdata="drivingList"-->
<!--            style="width: 157px;"-->
<!--        ></uni-data-select>-->
<!--      </view>-->

      <!-- 车牌号 -->
      <view class="form-item">
        <label class="form-label" for="plateNumber"><span class="required">*</span>车牌号</label>
        <input class="form-input" id="plateNumber" type="text" placeholder="请输入车牌号" v-model="form.plateNumber" />
        <view v-if="form.plateNumber" class="clear-btn" @click="clearInput('plateNumber')">×</view>
      </view>

      <!-- 始发地 -->
      <view class="form-item">
        <label class="form-label" for="departure">始发地</label>
        <input class="form-input" id="departure" type="text" placeholder="请输入始发地" v-model="form.departure" />
        <view v-if="form.departure" class="clear-btn" @click="clearInput('departure')">×</view>
      </view>

      <!-- 目的地 -->
      <view class="form-item">
        <label class="form-label" for="destination">目的地</label>
        <input class="form-input" id="destination" type="text" placeholder="请输入目的地" v-model="form.destination" />
        <view v-if="form.destination" class="clear-btn" @click="clearInput('destination')">×</view>
      </view>

			<!-- 入场货物 -->
      <view class="example-info">
        <input type="text" v-model="form.inLoadingGoods" placeholder="入场货物" style="padding-left:20rpx;border: 1rpx solid #dcdfe6;height: 80rpx;" class="numberPlateInput" />
        <input type="text" v-model="form.inGoodsQuantity" placeholder="货物数量" style="padding-left:20rpx;border: 1rpx solid #dcdfe6;height: 80rpx;width: 85px;" class="numberPlateInput" />
        <uni-data-select
            v-model="form.inGoodsUnit"
            :localdata="goodsUnitList"
            style="width: 75px;float: right;"
        ></uni-data-select>
      </view>

      <!-- 出场货物 -->
      <view class="example-info">
        <input type="text" v-model="form.outLoadingGoods" placeholder="出场货物" style="padding-left:20rpx;border: 1rpx solid #dcdfe6;height: 80rpx;" class="numberPlateInput" />
        <input type="text" v-model="form.outGoodsQuantity" placeholder="货物数量" style="padding-left:20rpx;border: 1rpx solid #dcdfe6;height: 80rpx;width: 85px;" class="numberPlateInput" />
        <uni-data-select
            v-model="form.outGoodsUnit"
            :localdata="goodsUnitList"
            style="width: 75px;float: right;"
        ></uni-data-select>
      </view>

      <!-- 车队 -->
      <view class="form-item">
        <label class="form-label" for="affiliatedUnit">车队</label>
        <input class="form-input" id="affiliatedUnit" type="text" placeholder="请输入车队" v-model="form.affiliatedUnit" />
        <view v-if="form.affiliatedUnit" class="clear-btn" @click="clearInput('affiliatedUnit')">×</view>
      </view>

		</form>
		<!-- 提交按钮 -->
		<button type="submit" class="submit-btn" @click="submitForm">提交</button>
	</view>
</template>
<script>
  import {
    zh_timeFormat,
    formatTimestamp,
    timeDifference
  } from '../../utils/index.js'
  import {
    cfAdminUpdateCarParkPackage,
    getInfoByVin,
    getdrivingList,
    additionalRecordingTransportationGoods,
    getCarParkInfoById
  } from '../../network/api.js'
  import dayjs from 'dayjs'
	export default {
		data() {
			return {
				plateColorList: ['蓝色', '黄色', '白色', '黑色', '新能源', '其他'],
				drivingList: [],
        goodsUnitList: [
          {"value": "ton", "text": "吨"},
          {"value": "packet", "text": "包"},
          {"value": "liter", "text": "升"}
        ],
        carParkList: [],
				image_path: '',
        carParkName: '才风智慧大厦',
				form: {
					plateNumber: '', //车牌号码
          drivingId: '', //行驶证id
          departure: '', //始发地
          destination: '', //目的地
          inLoadingGoods: '', //入场货物
          outLoadingGoods: '', //出场货物
          inGoodsQuantity: '', //入场货物数量
          outGoodsQuantity: '', //出场货物数量
          inGoodsUnit: '', //入场货物单位
          outGoodsUnit: '', //出场货物单位
          affiliatedUnit: '' //所属单位，车队
				},
			};
		},
		computed: {
			pickerValues() {
				return {
					// useNature: this.useNatureList.indexOf(this.selectedUseNature),
					registerDate: this.registerDateType,
					issueDate: this.issueDateType,
				};
			}
		},
    onLoad(e) {
      if(e.carParkId){
        this.form.carParkId = e.carParkId;
        this.getCarParkInfo();
      }
      this.querydrivingList();
    },
		methods: {
      async getCarParkInfo() {
        const {
          data,
          code
        } = await getCarParkInfoById({
          carParkId: this.form.carParkId
        })
        if (code == 10002) {
          this.carParkName = data.name;
        } else {
          uni.showToast({
            title: '获取停车场详情失败',
            icon: 'none'
          })
          setTimeout(function() {
            uni.navigateBack()
          }, 1500);
        }
      },
      async querydrivingList(){
        const {
          data,
          code
        } = await getdrivingList({
          page: 1,
          size: 200
        })
        if(code===10002){
          for (let index = 0; index < data.length; index++) {
            data[index]['value'] = data[index].id
            data[index]['text'] = data[index].ownerName+'-'+data[index].numberPlate
          }
          this.drivingList = data;
        }else{
          this.drivingList = [];
          //跳转到 添加 行驶证 页面
          uni.navigateTo({
            url: '/packageAdmin/park/drivingLicense?originPage=/packageAdmin/park/goodsAdditionalRecording&carParkId='+this.form.carParkId
          });
        }

      },
      async queryByVin(_vin){
        const {
          data,
          code
        } = await getInfoByVin({
          vin: _vin
        })
        if(code===10002){
          switch (data.fueltype){
           case "汽油":
             this.form.fuelType ="A";
             break;
           case "柴油":
             this.form.fuelType ="B";
             break;
           case "电":
             this.form.fuelType ="C";
             break;
           case "混合油":
             this.form.fuelType ="D";
             break;
           case "天然气":
             this.form.fuelType ="E";
             break;
           case "液化石油气":
             this.form.fuelType ="F";
             break;
           case "甲醇":
             this.form.fuelType ="L";
             break;
           case "乙醇":
             this.form.fuelType ="M";
             break;
           case "太阳能":
             this.form.fuelType ="N";
             break;
           case "混合动力":
             this.form.fuelType ="O";
             break;
           case "氢":
             this.form.fuelType ="P";
             break;
           case "生物燃料":
             this.form.fuelType ="Q";
             break;
           case "无":
             this.form.fuelType ="Y";
             break;
           case "其它":
             this.form.fuelType ="Z";
             break;
           case "油电混合":
             this.form.fuelType ="O";
             break;
          }
          switch (data.environmentalstandards){
             case "国零":
               this.form.emissionStage = "0";
               break;
             case "国一":
               this.form.emissionStage = "1";
               break;
             case "国二":
               this.form.emissionStage = "2";
               break;
             case "国三":
               this.form.emissionStage = "3";
               break;
             case "国四":
               this.form.emissionStage = "4";
               break;
             case "国五":
               this.form.emissionStage = "5";
               break;
             case "国六":
               this.form.emissionStage = "6";
               break;
             case "电动":
               this.form.emissionStage = "D";
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
				const {
					vehicle_type,
					owner,
					model,
					plate_num,
					vin,
					engine_num,
					addr,
					issue_date,
					register_date,
					use_character,
					image_path
				} = e.detail;
				this.image_path = image_path
				this.form.owner = owner.text
        //车辆类型
        for (let index = 0; index < this.drivingList.length; index++) {
          if(this.drivingList[index]['text']==vehicle_type.text){
            this.form.vehicleType = this.drivingList[index]['value']
          }
        }
				// this.form.vehicleType = vehicle_type.text
				this.form.plateNumber = plate_num.text
        //通过车架号查询车辆其它信息
        if(vin.text){
          this.queryByVin(vin.text);
        }
				this.form.engineNumber = engine_num.text
				this.form.brandModel = model.text
				this.form.address = addr.text
				this.form.registerDate = register_date.text;
				this.form.issueDate = issue_date.text;
				// 回显下拉框选中值
				this.updateSelectedValue('vehicleType', vehicle_type.text);

        //使用i性质
        for (let index = 0; index < this.useNatureList.length; index++) {
          if(this.useNatureList[index]['text']==use_character.text){
            this.form.useNature = this.useNatureList[index]['value'];
            break
          }
        }
				// this.updateSelectedValue('useNature', use_character.text);
				this.updateSelectedValue('registerDate', register_date.text);
				this.updateSelectedValue('issueDate', issue_date.text);
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
					success: (res) => {
						console.log('image:', res.tempFilePaths[0]);
					}
				});
			},
			// 清空输入框
			clearInput(field) {
				this.form[field] = '';
			},
			// 提交表单校验
      async submitForm() {
        if(this.form.id==null){
          const {
            data,
            code,
            message,
            mixMessage
          } = await additionalRecordingTransportationGoods({
            "carParkId": this.form.carParkId,
            "plateNumber": this.form.plateNumber,
            "departure": this.form.departure,
            "destination": this.form.destination,
            "inLoadingGoods": this.form.inLoadingGoods,
            "outLoadingGoods": this.form.outLoadingGoods,
            "inGoodsQuantity": this.form.inGoodsQuantity,
            "outGoodsQuantity": this.form.outGoodsQuantity,
            "inGoodsUnit": this.form.inGoodsUnit,
            "outGoodsUnit": this.form.outGoodsUnit,
            "affiliatedUnit": this.form.affiliatedUnit
          })
          if(code===10002){
            uni.switchTab({
              url: '/pages/index/my'
            });
          }else{
            uni.showToast({
              title: message,
              icon: 'none',
              content: mixMessage
            })
          }
        }else{
          const {
            data,
            code,
            message,
            mixMessage
          } = await cfAdminUpdateCarParkPackage(newFormData)
          if(code===10002){
            this.$refs['showLeft'].close()
            this.stopGetUseLog = false;
            this.queryForm.page = 1;
            this.list = [];
            this.getList();

            keys.forEach((key) => {
              this.formData[key] = null;
            });
          }else{
            uni.showToast({
              title: message,
              icon: 'none',
              content: mixMessage
            })
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
			justify-content: end;
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

    .numberPlateInput {
      width: 117px;
      display: inline-flex;
    }
	}
</style>