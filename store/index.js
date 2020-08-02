import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			name:'张三',
			ifShowBottom: false,
			ifShowViewBar: true,
			siteList:[{
					'title': '百度一下',
					'image': '../../static/icon/baidu.jpg',
					'src': 'https://www.baidu.com'
				},{
					'title': '淘宝',
					'image': '../../static/icon/taobao.jpg',
					'src': 'https://main.m.taobao.com/'
				},{
					'title': '京东',
					'image': '../../static/icon/jingdong.jpeg',
					'src': 'https://m.jd.com/'
				},{
					'title': '今日头条',
					'image': '../../static/icon/toutiao.jpeg',
					'src': 'https://www.toutiao.com/'
				},{
					'title': '爱奇艺',
					'image': '../../static/icon/aiqiyi.jpg',
					'src': 'https://m.iqiyi.com/'
				},{
					'title': '腾讯视频',
					'image': '../../static/icon/tenxun.jpeg',
					'src': 'https://m.v.qq.com/index.html'
				},{
					'title': '优酷',
					'image': '../../static/icon/youku.jpg',
					'src': 'https://www.youku.com/'
				},
				
				
			]
		},
    mutations: {
			SHOWBOTTOM(state, data) {
				state.ifShowBottom = data;
			},
			SHOWVIEWBAR(state, data) {
				state.ifShowViewBar = data;
			},
		},
    actions: {
			showBottom({commit}, data){
				commit('SHOWBOTTOM', data);
			},
			showViewBar({commit}, data){
				commit('SHOWVIEWBAR', data);
			},
		}
})
export default store