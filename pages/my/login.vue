<template>
	<view class="identify">
		<form @submit="submit">
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" name="telephone" v-model="telephone" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" name="password" v-model="password" class="text-right"></input>
			</view>
			<view class="padding flex flex-direction">
				<button type="primary" form-type="submit" class="cu-btn bg-blue lg">登录</button>
			</view>
		</form>
	</view>
</template>
<script>
import validator from '@/common/validator.js';

export default{
	data() {
		return {
			telephone: "",
			password: "",
		}
	},
	onLoad:function(options){
	},
	components:{},
	watch: {
	},
	computed: {
	},
	methods: {
		submit(e){
			var formData = e.detail.value;
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
				data:{...formData, action:'login'}
			}).then((res)=>{
				uni.hideLoading();
				if (!res.result.data.length) {
					uni.showToast({
						icon: 'none',
						title: res.result.msg || '登录失败'
					})
				} else {
					const flag = res.result.data[0].flag
					const reason = res.result.data[0].reason
					if (flag !== 1) {
						const title = flag === 2 ? (('审核未通过：' + reason) || '审核未通过，请重新提交认证审核') : '该账号还在审核中，请耐心等待~'
						uni.showToast({
							icon: 'none',
							title: title
						})
						return
					}
					uni.showToast({
						icon: 'none',
						title: '登录成功',
						success: () => {
							uni.setStorageSync('userInfo', res.result.data[0])
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/my/my'
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