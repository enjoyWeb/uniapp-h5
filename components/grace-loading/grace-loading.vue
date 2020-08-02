<template name="graceLoading">
	<view class="grace-loading" v-if="loadingType < 5">
		<view class="grace-loading-icon" v-if="loadingType === 1" :style="{color:iconColor}"></view>
		<text :style="{color:textColor}">{{loadingText[loadingType]}}</text>
	</view>
</template>
<script>
export default {
	props: {
		loadingType: {
			type : Number,
			default: 1
		},
		loadingText : {
			type  : Array,
			default : function () {
				// 0 上拉加载更多
				// 1 加载中
				// 2 加载全部
				// 3 空文本
				// 4 第一次加载为空
				// 5 不展示组件
				return ["上拉加载更多", "加载中", "已经加载全部数据",'','本栏目下暂无新闻'];
			}
		},
		iconColor : {
			type : String,
			default : "#888888"
		},
		textColor : {
			type : String,
			default : "#888888"
		}
	}
}
</script>
<style scoped>
@font-face {
	font-family: "iconfontinloading";
	src:url('data:font/ttf;charset=utf-8;charset=utf-8;base64,d09GMgABAAAAAALQAAsAAAAABmwAAAKCAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAp0gRwBNgIkAwgLBgAEIAWEbQcxG8MFEdWLe7KvoYzbCwBQRhnLNqzj2K7edy0Ai9KfAIJjQAEAAAAA8fD/+33b5937/9wxTapp1nR1NJFJJAhFtVQ8RBINQrKuIT8rzxYsaQuSqXAtqT0vxfoDH1ZrAQoV7MeC1J5eeAirt7YZw50Rn+bjWZJ48L/8jd5ilJT+6qqvs21pdUUNG3DbopPHMBBscAD8cT955QWSzxcuGUmJAxzv/G+AXRhNsDFuGLuJwCEcJ9Bm1LLYnqIKRQbGBeJGGmuUnF+WrVQRmjVLs3itoVRPqq+84r+PvytRqDQSUHF+Peyw/ns4It2ub7uWJrfns8JaRcIyMnG5Nn4qCYuUtMWzSfZVGvxefWoUe9UJ668DxR1gWOXfkwALbzVVwW11NY+1UZnEfPMHGOPOu2dv3ObFP+vX3lFhaXv61ta2P3M0t9c/ULcrMub4Gpm6KKavmUiIrFwzPxFE0q6BXDcKe0oexGGcJAPrqMHlt7N0RyAYu7XcGlzI4HuqL1zcz0k5gyP4U0gZ9cm2COir7HNbkAOV+TuoatOGWrq7z6+x6sHbsoaSE41wthgJICmmURm3DA3tVqGpWIM2S/ZWt+t3UxK5FYseKBB6fIJKl8+Q9PiGyrif0DDkPzT1RII2V8Pbst1scEnBqAUdmD8kS7tHJlGi9IbhvWrOijj5hXymEPRNV0zNuCPPMeP8hEHEg2faYFJOw3UlOJgyWmmiyDG2ra97UmNpK1QBoxZ0YP6QLO2ethdV+v4Nw3vV3NI0YH8hn6l36JuuB2qW772a7uWc8xMGEQ+eaYNJGYTrSnDUD8popYkjosfYwla+r7xZX7l93Q6KQhVAU5Wwb114Je3SHooCAAAA') format('truetype');
}
@keyframes grace-rotate360{
	0%{transform:rotate(0deg);} 
	50%{transform:rotate(180deg);} 
	100%{transform:rotate(360deg);}
}
.grace-loading{display:flex; width:100%; justify-content:center; padding:16rpx 0; padding-bottom:36rpx; line-height:40rpx; color:#888;}
.grace-loading text{margin-left:12rpx; font-size:28rpx;}
.grace-loading-icon{width:40rpx; height:40rpx; justify-content:center; line-height:40rpx; font-size:30rpx; text-align:center; font-family:"iconfontinloading"; animation:grace-rotate360 1200ms infinite linear;}
.grace-loading-icon:before {content:"\e9db";}
</style>