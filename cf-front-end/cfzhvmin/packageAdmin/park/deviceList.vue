<template>
	<view>
		<view v-if="list.length == 0" style="margin-top: 300rpx;width: 750rpx;text-align: center;opacity: .7;">没有数据</view>
		<view v-if="list.length > 0">
			<view class="mySetMeal por flex-col" v-for="item in list" :key='item.id'>
				<view
					style="height: 44rpx;font-size: 38rpx;font-weight: 500;color: #323233;line-height: 44rpx;margin: 38rpx 0 0 40rpx;">
					{{item.deviceName}}
				</view>
				<view class="flex" style="margin-top: 12rpx;">
					<view
						style="opacity: .7;font-size: 28rpx;font-weight: 500;color: #323233;line-height: 40rpx;margin-left: 40rpx;">
						通道：{{item.checkPointName}}
					</view>
				</view>
				<view class="flex" style="margin-top: 12rpx;">
					<view
						style="opacity: .7;font-size: 28rpx;font-weight: 500;color: #323233;line-height: 40rpx;margin-left: 40rpx;">
						状态：{{item.status==1 ? '正常' : '掉线或其它异常'}}
					</view>
				</view>
				
				<view class="applyButton" @click="openOrClose(item,'on')">开闸</view>
				<view class="applyButtonDelete" @click="openOrClose(item,'off')">关闸</view>
				<!-- 装饰图片 -->
				<image src="../../static/images/zs.png" class="zs poa"></image>
			</view>
		</view>
		

	</view>
</template>

<script>
import {
  getChargingStoredCardListByQuery,
  rechargingChargingStoredCard,
  deleteChargingStoredCard,
  getDailyIncomeStatisticsListByQuery,
  getDeviceListByQuery, controllerCarParkDeviceSwitch
} from '../../network/api.js'
	import { formatTimestamp } from '../../utils/index.js'
	import { wxAppid, aliAppid } from '../../common/config.js'
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				list:[],
        carParkId: ''
			}
		},
		filters:{formatTimestamp},
		onLoad(e) {
			if(e.carParkId){
				this.carParkId = e.carParkId;
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			async openOrClose(item, action){
				const {
					code,
					message
				} = await controllerCarParkDeviceSwitch({
          deviceId: item.id,
          action,
        })
        uni.showToast({
          title: message,
          icon: 'none'
        })
			},
			async getList(){
				const { data, code } = await getDeviceListByQuery({
          areaId: this.carParkId,
          deviceType: 2,
          page: 1,
          size: 100,
				})
				if(code === 10002){
					this.list = data
				}else{
					this.list = []
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		padding-top: 36rpx;
	}
  .applyButton{
    width: 140rpx;height: 80rpx;right: 196rpx;bottom: 26rpx;
    position: absolute;
    line-height: 80rpx;
    border-radius: 10rpx;
    color: #fff;
    text-align: center;
    background-color: #6794f6;
  }
  .applyButtonDelete{
    width: 140rpx;height: 80rpx;right: 0rpx;bottom: 26rpx;
    position: absolute;
    line-height: 80rpx;
    border-radius: 10rpx;
    color: #fff;
    text-align: center;
    background-color: #f44336;
  }
	.nextButton {
		width: 586rpx;
		height: 100rpx;
		background: #6794F6;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.87);
		line-height: 100rpx;
		text-align: center;
		margin: 26rpx 0 0 50rpx;
	}
	.deleteButton {
		width: 586rpx;
		height: 100rpx;
		background: #f44336;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.87);
		line-height: 100rpx;
		text-align: center;
		margin: 26rpx 0 0 50rpx;
	}
	.flex-wrap{
		width: 686rpx;
		height: 740rpx;
		background: #FFFFFF;
	}
	.popupBox2 {
		width: 686rpx;
		height: 384rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin-left: 32rpx;
		overflow: hidden;
	
		.text1 {
			width: 252rpx;
			height: 50rpx;
			font-size: 36rpx;
			font-weight: 600;
			color: #323233;
			line-height: 50rpx;
			margin: 64rpx 0 0 34rpx;
		}
	
		.text2 {
			width: 500rpx;
			height: 50rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #f44336;
			line-height: 50rpx;
			margin: 64rpx 0 0 34rpx;
		}
	
		.intoOrder {
			width: 620rpx;
			height: 100rpx;
			background: #488CF5;
			border-radius: 16rpx;
			margin-top: 48rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 100rpx;
			text-align: center;
			margin-left: 33rpx;
		}
	}
	.mySetMeal {

		width: 670rpx;
		height: 328rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 22rpx 0rpx rgba(151, 151, 151, 0.2);
		border-radius: 16rpx;
		margin: 0rpx 0 32rpx 40rpx;

		.zs {
			width: 176rpx;
			height: 176rpx;
			top: 0;
			right: 0;
		}

		.title1 {
			height: 44rpx;
			font-size: 32rpx;
			
			font-weight: 500;
			color: #323233;
			line-height: 44rpx;
			margin-left: 32rpx;
			margin-top: 32rpx;
		}

		.title2 {
			height: 36rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(50, 50, 51, 0.5);
			line-height: 36rpx;
			margin-left: 32rpx;
			margin-top: 12rpx;
		}

		.upgrade {
			width: 242rpx;
			height: 108rpx;
			margin-left: 8rpx;
			margin-top: 24rpx;
		}
	}
	.monthlyCardButton {
		width: 670rpx;
		height: 96rpx;
		background: #6794f6;
		border-radius: 10rpx;
		position: fixed;
		left: 40rpx;
		bottom: 66rpx;
		.text {
			width: 128rpx;
			height: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
			line-height: 44rpx;
			margin-left: 12rpx;
		}
	}
</style>
