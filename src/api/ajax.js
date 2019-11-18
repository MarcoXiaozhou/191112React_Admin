/**
 * 能异步ajax请求
 * 函数的返回值是promise
 */
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){
	return new Promise((resolve,reject)=>{
		let promise
		//1、执行异步ajax请求
		if(type==='GET'){
			promise = axios.get(url, { //配置对象
				params: data
			})
		}else {
			promise = axios.post(url,data)
		}
		//2、成功，调用resolve(value)
		promise.then(response =>{
			resolve(response.data)
		}).catch(error=>{
			message.error('请求出错了：'+error.message)
		})
		//3、失败，不调用reject(reason)
	})
	
}