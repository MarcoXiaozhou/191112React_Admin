/**
 * 包含应用中所有接口的请求函数的模块
 */
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd'
// export function reqLogin(){
// 	return ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')

export const reqAddUser = (user)=>ajax('/add/user',user,'POST')

/**
 * jsonp请求接口请求函数
 */

 export const reqWeather=(city)=>{

    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            console.log('jsonp',err,data)
            if(!err&&data.status==='success'){
               const{dayPictureUrl,weather} = data.results[0].weather_data[0]
               resolve({dayPictureUrl,weather})
            }else{
                //如果失败了
                message.error('获取天气信息失败')
            }
        })
    })

  
 }
//  reqWeather('上海')