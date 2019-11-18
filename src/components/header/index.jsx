import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import { reqWeather } from '../../api'
import './index.less'

/**
 * 头部的组件
 */
class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
    }
    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async () => {
        //调用接口请求异步获取数据
        const { dayPictureUrl, weather } = await reqWeather('上海')
        this.setState({ dayPictureUrl, weather })
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            //如果当前item对象的key与path一样，item的title就是需要显示的title
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                //如果有值才说明有匹配的
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    logout = () => {
        //
        Modal.confirm({
            // title: 'Do you want to delete these items?',
            content: '确定退出吗？',
            onOk: () => {
                console.log('ok', this)
                //删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
                //跳转到login
            },
            onCancel() { },
        })
    }

    //第一次render之后执行一次
    //异步执行操作；发送ajax请求、启动定时器
    componentDidMount() {
        this.getTime()
        //获取当前天气
        this.getWeather()
    }
    /**
     * 当前组件卸载之前调用
     */
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render() {
        const { currentTime, dayPictureUrl, weather } = this.state
        const username = memoryUtils.user.username
        //得到当前需要显示的
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(Header)