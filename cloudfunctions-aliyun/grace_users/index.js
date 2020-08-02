'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const collection = db.collection('grace_users');
	// 增
	if(event.action == "add"){
		// 判断是否已经有存在该手机号的用户
		var res = await collection.where({telephone : dbCmd.eq(event.telephone)}).get();
		console.log(res)
		if (res.affectedDocs > 0) {
			return {status: 'error', msg: '已存在该账号，请使用手机号码直接登录'}
		} else {
			delete event.action;
			const code = event.telephone + (new Date()).getTime();
			var res = await collection.add({ ...event, code });
			return res;
		}
	}
	// 删
	else if(event.action == "delete"){
		var telephoneType = typeof(event.telephone);
		if(telephoneType == "string"){event.telephone = [event.telephone];}
		for(let i = 0; i < event.telephone.length; i++){
			await collection.doc(event.telephone[i]).remove();
		}
		return {status:'ok', msg: 'ok'};
	}
	// 改
	else if(event.action == "edit"){
		delete event.action;
		var res = await collection.doc(event.telephone).update(event);
		return res;
	}
	// 查 - 列表
	else if(event.action == "getList"){
		// 获取公告总数
		var total =  await collection.where({_id : dbCmd.neq('')}).count();
		// 获取公告列表
		var start = (event.page - 1) * event.everpagenumber;
		var res = await collection.orderBy('telephone','desc').skip(start).limit(event.everpagenumber).get();
		return [total, res];
	}
	// 查 - 单条
	else if(event.action == "get"){
		const res = await collection.where({code: dbCmd.eq(event.code)}).get();
		return res;
	}
	// 登录 - 获取用户信息
	else if(event.action == "login"){
		const res = await collection.where({telephone: dbCmd.eq(event.telephone), password: dbCmd.eq(event.password)}).field({ 'list': false }).get();
		return res;
	}
}
