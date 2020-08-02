<template>
	<view class="identify">
		<form @submit="submit">
			<view class="cu-form-group">
				<view class="title">淘宝号</view>
				<input placeholder="请输入淘宝号" name="taobao" v-model="taobao" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">银行卡</view>
				<input placeholder="请输入银行卡" name="bankcard" v-model="bankcard" class="text-right"></input>
			</view>
			<view class="cu-form-group" v-show="bankObj.bankName && bankObj.cardTypeName">
				<view class="title">银行识别</view>
				<text>{{bankObj.bankName}}-{{bankObj.cardTypeName}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" name="telephone" v-model="telephone" class="text-right"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" name="password" v-model="password" class="text-right"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="请输入验证码" name="input" v-model="verify_code"></input>
				<button class='cu-btn bg-green shadow' @tap="getVerifyCode()">{{ verify_text }}</button>
			</view> -->
			<view class="padding flex flex-direction">
				<button type="primary" form-type="submit" class="cu-btn bg-blue lg">注册</button>
			</view>
		</form>
	</view>
</template>
<script>
import validator from '@/common/validator.js';
import bank from '@/common/bankcard.js'
let timing;
let bankObj = {
	bankName: '',
	cardTypeName: ''
}
export default{
	data() {
		return {
			telephone: "",
			taobao: "",
			bankcard: "",
			password: "",
			bankObj: { ...bankObj },
			second: 0,
			verify_code: ''
		}
	},
	onLoad:function(options){
	},
	components:{},
	watch: {
		bankcard(val) {
			const bankRes = bank.bankCardAttribution(val)
			if (bankRes !== 'error') {
				this.bankObj = bankRes
			} else {
				this.bankObj = { ...bankObj }
			}
		}
	},
	computed: {
		verify_text() {
			if (this.second == 0) {
				return '获取验证码';
			} else {
				if (this.second < 10) {
					return '0' + this.second + '秒后重新获取';
				} else {
					return this.second + '秒后重新获取';
				}
			}
		}
	},
	methods: {
		/*获取验证码*/
		getVerifyCode() {
			if (this.second > 0) {
				return;
			}
			if (!validator.checkMobile(this.telephone)) {
				return;
			}
			this.second = 60;
			timing = setInterval(() => {
				this.second--;
				if (this.second == 0) {
					clearInterval(timing);
				}
			}, 1000);
			// uniCloud.callFunction({
			// 	name:"grace_users",
			// 	data:{telephone:this.inputValue, action:'add'}
			// }).then((res)=>{
			// 	uni.hideLoading();
			// });
		},
		submit(e){
			var formData = e.detail.value;
			if (!this.taobao) {
				uni.showToast({
					icon: 'none',
					title: '请输入淘宝号'
				})
				return false;
			}
			if (bank.bankCardAttribution(this.bankcard) === 'error') {
				uni.showToast({
					icon: 'none',
					title: '银行卡号格式错误'
				})
				return false;
			}
			if (!validator.checkMobile(this.telephone)) {
				return false;
			}
			if (!this.password) {
				uni.showToast({
					icon: 'none',
					title: '请输入密码'
				})
				return false;
			}
			uni.showLoading({ mask:true });
			console.log('formData->', formData)
			uniCloud.callFunction({
				name:"grace_users",
				data:{...formData, action:'add'}
			}).then((res)=>{
				uni.hideLoading();
				if (res.result.status === 'error') {
					uni.showToast({
						icon: 'none',
						title: res.result.msg,
						success: () => {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1500)
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '认证申请提交成功，请等待审核...',
						success: () => {
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1500)
						}
					})
				}
			});
		}
	}
}
</script>
<style>
</style>