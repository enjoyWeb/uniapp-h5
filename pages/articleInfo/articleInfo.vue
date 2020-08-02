<template>
	<view class="grace-editor-show">
		<!-- 标题部分 -->
		<view style="padding:25rpx;">
			<view class="grace-news-title">{{article.title}}</view>
			<view class="grace-article-info">{{article.cate}} · 发布于 : {{article.date}}</view>
		</view>
		<!-- 文章内容部分 -->
		<view v-for="(item, index) in article.contents" :key="index" class="grace-editor-show-item" 
		:style="{padding:item.type == 'img'?'0rpx 0rpx 20rpx 0rpx':'20rpx 25rpx'}">
			<text class="grace-editor-show-txt" v-if="item.type == 'txt'">{{item.content}}</text>
			<view class="grace-flex-center" v-else-if="item.type == 'center'">
				<text class="grace-editor-show-center">{{item.content}}</text>
			</view>
			<image class="grace-editor-show-image" :src="item.content" 
			v-else-if="item.type == 'img'" :data-url="item.content" @tap="showImgs" mode="widthFix"></image>
			<text class="grace-editor-show-quote" v-else-if="item.type == 'quote' || item.type == 'pre'">{{item.content}}</text> 
			<text class="grace-editor-show-strong" v-else-if="item.type == 'strong'">{{item.content}}</text>
			<view v-else-if="item.type == 'link'" class="grace-editor-show-link">
				<grace-link :url="item.content" :title="item.content"></grace-link>
			</view>
			<text class="grace-editor-show-spline" v-else-if="item.type == 'spline'">● ● ●</text>
		</view>
	</view>
</template>
<script>
export default{
	data() {
		return {
			article:{
				title:"loading...",
				date:"loading",
				cate:'loading'
			},
			articleId : '',
		}
	},
	onLoad:function(options){
		if(!options.id){options.id = '5efad97efdb9f80001e64c73';}
		this.articleId = options.id;
		uni.showNavigationBarLoading();
		uni.setNavigationBarTitle({title:'loading...'});
		// 加载文章
		uni.showLoading({ mask:true });
		uniCloud.callFunction({
			name:"grace_article",
			data:{id:this.articleId, action:'get'}
		}).then((res)=>{
			uni.hideLoading();
			uni.hideNavigationBarLoading();
			this.article = res.result.data[0];
			this.article.date = this.dateFormat(this.article.date);
			uni.setNavigationBarTitle({title:this.article.title});
		});
	},
	components:{},
	methods: {
		showImgs:function(e){
			var currentUrl = e.currentTarget.dataset.url;
			var imgs       = [];
			var items      = this.article.contents;
			for(let i = 0; i < items.length; i++){
				if(items[i].type ==  'img'){
					imgs.push(items[i].content);
				}
			}
			uni.previewImage({
				urls:imgs,
				current:currentUrl
			})
		},
		dateFormat:function (date) {
			date = date.split('');
			return date[0]+date[1]+date[2]+date[3]+'-'+date[4]+date[5]+'-'+date[6]+date[7];
		},
	}
}
</script>
<style>
.grace-news-title{font-size:36rpx; line-height:58rpx; padding:10rpx 0rpx;}
.grace-article-info{line-height:60rpx; color:#999999; font-size:22rpx;}
.grace-editor-show{}
.grace-editor-show-item{letter-spacing:1px; font-size:0;}
.grace-editor-show-txt{line-height:60rpx; font-size:32rpx; letter-spacing:1px; color:#323232;}
.grace-editor-show-image{width:100%;}
.grace-editor-show-quote{margin:10rpx 0; width:92%; color:#333333; background:#F8F8F8; line-height:36rpx; font-size:26rpx; padding:20rpx 4%; display:block;}
.grace-editor-show-strong{font-weight:bold; width:100%; font-size:30rpx; line-height:45rpx; padding:10px 0; color:#3D3D3D; display:block;}
.grace-editor-show-spline{padding:10px 0; display:block; text-align:center; line-height:50rpx; color:#8788A3; font-size:20rpx; opacity:0.3;}
.grace-editor-show-center{text-align:center; font-size:28rpx; color:#333333; line-height:60rpx; padding:15rpx; border-bottom:1px solid #C1C1C1; font-weight:bold;}
.grace-editor-show-link{line-height:32rpx; padding:10px 0; color:#007AFF;}
</style>