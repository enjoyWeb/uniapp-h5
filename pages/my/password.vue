<template>
	<view class="identify">
		<form @submit="submit">
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号码" name="telephone" v-model="telephone" class="text-right"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">新密码</view>
				<input placeholder="请输入新密码" name="password" v-model="password" class="text-right"></input>
			</view>
			<view class="padding flex flex-direction">
				<button type="primary" form-type="submit" class="cu-btn bg-blue lg">修改密码</button>
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
					title: '请输入新密码'
				})
				return false;
			}
			uni.showLoading({ mask:true });
			console.log('formData->', formData)
			uniCloud.callFunction({
				name:"grace_users",
				data:{...formData, action:'edit'}
			}).then((res)=>{
				uni.hideLoading();
				if (res.result.status === 'error') {
					uni.showToast({
						icon: 'none',
						title: res.result.msg || '修改失败'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '修改成功',
						success: () => {
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