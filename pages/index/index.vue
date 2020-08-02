<template>
	<view class="content">
		<!-- status -->
		<view class="status"></view>
		<view class="main">
			<image class="logo" src="../../static/logo.png" mode=""></image>
			<view class="search">
				<input
					class="input"
					type="text" 
					placeholder="请输入接单编号领取任务..."
					@input="getInputValue"
					@blur="search"
				/>
				<text class="search-icon cuIcon-search" @tap="search()"></text>
			</view>
			<view class="apply-identify" v-if="!code">
				没有接单编号？
				<text class="jump-color" @tap="jump('/pages/my/login')">登录查询</text>
				或者
				<text class="jump-color" @tap="jump('/pages/my/register')">注册认证</text>
			</view>
			<view class="apply-identify" v-if="code">
				不知道接单编号？去
				<text class="jump-color" @tap="swit('/pages/my/my')">个人中心</text>
				查看
			</view>
			<view class="site-box">
				<view class="site" v-for="(item, index) in siteList" :key="index">
					<view class="site-img">淘宝链接(<text :class="item.flag ? 'text-green' : 'text-blue'">{{item.flag ? '已结单' : '可接单'}}</text>)</view>
					<view class="site-name" :class="item.flag ? 'text-green' : 'text-blue'" @tap="clipboard(item.link)">
						{{item.link}}
					</view>
				</view>
				<view class="empty" v-show="tips">{{tips}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				searchEngine: '',
				siteList: '',
				inputValue: '',
				tips: '',
				code: ''
			}
		},
		onShow() {
			const { code = '' } = uni.getStorageSync('userInfo')
			this.code = code
		},
		onLoad() {
		},
		watch: {
			siteList(data) {
				if (data && !data[0]) {
					this.tips = '暂无可接订单'
				} else {
					this.tips = ''
				}
			},
			inputValue(val) {
				if (!val) {
					this.siteList = ''
				} else {					
					this.tips = ''
				}
			}
		},
		methods: {
			getInputValue(e){
				this.inputValue = e.target.value;
			},
			search(){
				if (!this.inputValue) return
				uni.showLoading({ mask:true });
				uniCloud.callFunction({
					name:"grace_links",
					data:{code: this.inputValue, action:'getUserAll'}
				}).then((res)=>{
					const {
						result: {
							data = []
						} = {}
					} = res
					uni.hideLoading();
					this.siteList = data;
					if (this.siteList) this.siteList = this.siteList.filter(item => !item.flag);
				});
			},
			jump(url){
				uni.navigateTo({
					url
				})
			},
			swit(url){
				uni.switchTab({
					url
				})
			},
			clipboard(data){
				// #ifndef H5
				uni.setClipboardData({
					data,
					success: function (res) {
						uni.showToast({
							icon: 'none',
							title: '复制到剪贴板成功'
						})
					}
				});
				// #endif
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
