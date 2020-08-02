<template>
	<view style="line-height:200rpx; font-size:26rpx; text-align:center;">
		<view class="unlogin" v-show="!Object.keys(userInfo).length">
			<text class="title">请先登录</text>
			<view class="btn-wrap">
				<button type="primary" form-type="submit" class="cu-btn bg-blue lg" @tap="login">登录</button>
				<button type="primary" form-type="submit" class="cu-btn bg-blue lg margin-top-lg" @tap="register">注册</button>
			</view>
		</view>
		<view class="cu-form-group" v-show="userInfo.code">
			<view class="title">接单编号</view>
			<view class="text-right">{{userInfo.code}}</view>
		</view>
		<view class="cu-form-group" v-show="userInfo.telephone">
			<view class="title">手机号码</view>
			<view class="text-right">{{userInfo.telephone}}</view>
		</view>
		<view class="cu-form-group" v-show="userInfo.taobao">
			<view class="title">淘宝号</view>
			<view class="text-right">{{userInfo.taobao}}</view>
		</view>
		<view class="cu-form-group" v-show="userInfo.bankcard">
			<view class="title">银行卡</view>
			<view class="text-right">{{userInfo.bankcard}}</view>
		</view>
		<view class="padding flex flex-direction" v-show="Object.keys(userInfo).length">
			<button type="primary" form-type="submit" class="cu-btn bg-blue lg" @tap="logout">退出</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo(){
				this.userInfo = uni.getStorageSync('userInfo')
			},
			logout(){
				uni.removeStorageSync('userInfo')
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			login(){
				uni.navigateTo({
					url: '/pages/my/login'
				})
			},
			register(){
				uni.navigateTo({
					url: '/pages/my/register'
				})
			}
		}
	}
</script>

<style>
.unlogin{
	display: flex;
	flex-direction: column;
	padding: 20px;
	height: 100vh;
	justify-content: space-evenly;
}
.btn-wrap{
	display: flex;
	flex-direction: column;
}
.cu-form-group{
	line-height: initial;
}
</style>