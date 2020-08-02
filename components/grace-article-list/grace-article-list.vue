<template>
	<view>
		<view class="grace-article-list" v-for="(item,index) in articlesIn" :key="index" @tap="gotoInfo(item._id)">
			<view class="grace-article-list-title">{{item.title}}</view>
			<view class="grace-article-list-img-wrap" v-if="item.imgs.length < 3 && item.imgs.length > 0">
				<image :src="item.imgs[0]" mode="widthFix" class="grace-article-list-img"></image>
			</view>
			<view class="grace-article-list-imgs-wrap" v-if="item.imgs.length >= 3">
				<view class="grace-article-list-imgs-in">
					<image :src="item.imgs[0]" mode="widthFix" class="grace-article-list-img"></image>
				</view>
				<view class="grace-article-list-imgs-in">
					<image :src="item.imgs[1]" mode="widthFix" class="grace-article-list-img"></image>
				</view>
				<view class="grace-article-list-imgs-in">
					<image :src="item.imgs[2]" mode="widthFix" class="grace-article-list-img"></image>
				</view>
			</view>
			<view class="grace-article-info">
				{{item.cate}} · 发布于 : {{item.date}}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		/*
		[{
			"_id": "5ef2f7f6d9c9e8004df137f6",
			"action": "add",
			"cate": "美文",
			"contents": [{
				"content": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-shenhai/f528492c-2f82-44a2-a912-5601a2667a25.png",
				"type": "img",
				"uploaded": "ok"
			}, {
				"content": "世界并不完美...",
				"type": "txt"
			}],
			"date": "20200629041643",
			"id": "5ef2f7f6d9c9e8004df137f6",
			"tags": "世界并不完美,学会忍受孤单",
			"title": "当悲伤逆流成河"
		}]
		*/
		articles : {type:Array, default:function(){return [];}}
	},
	watch:{
		articles : function(v){
			this.articlesIn = [];
			for (let i = 0; i < v.length; i++) {
				var article   = {};
				article._id   = v[i]._id
				article.title = v[i].title;
				article.cate  = v[i].cate;
				article.date  = this.dateFormat(v[i].date);
				article.imgs  = this.imgsFormat(v[i].contents);
				this.articlesIn.push(article);
			}
			console.log(this.articlesIn);
		}
	},
	data() {
		return {
			articlesIn : []
		};
	},
	methods:{
		dateFormat:function (date) {
			date = date.split('');
			return date[0]+date[1]+date[2]+date[3]+'-'+date[4]+date[5]+'-'+date[6]+date[7];
		},
		imgsFormat:function (contents) {
			var imgs = [];
			for (let i = 0; i < contents.length; i++) {
				if(contents[i].type == 'img'){
					imgs.push(contents[i].content);
				}
			}
			return imgs;
		},
		gotoInfo : function(id){
			uni.navigateTo({
				url:"../articleInfo/articleInfo?id="+id
			});
		}
	}
}
</script>
<style>
.grace-article-list{margin-top:25rpx; padding:0 25rpx;}
.grace-article-list-title{line-height:50rpx; font-size:30rpx; padding:20rpx 0;}
.grace-article-list-img-wrap{max-height:380rpx; overflow:hidden; font-size:0; line-height:0;}
.grace-article-list-img{width:100%;}
.grace-article-list-imgs-wrap{display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:space-between;}
.grace-article-list-imgs-in{width:210rpx; max-height:128rpx; overflow:hidden; font-size:0; line-height:0;}
.grace-article-info{line-height:60rpx; color:#999999; font-size:22rpx;}
</style>