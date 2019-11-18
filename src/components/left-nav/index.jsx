import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;
/**
 * 左侧导航的组件
 */
class LeftNav extends Component {
  /**
   * 使用map+递归
   */
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      /**
       *  {
            title: '首页', // 菜单标题名称
            key: '/home', // 对应的path
            icon: 'home', // 图标名称
            isPublic: true, // 公开的
            chileren:[],
          }
      */
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
      return
    })
  }

  getMenuNodes  = (menuList) =>{
    return menuList.reduce((pre,item)=>{
      let path = this.props.location.pathname
      //向pre添加<Menu.Item>
      if(!item.children){
        pre.push((
          <Menu.Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
        ))
      }else {
        //查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem=>cItem.key ===path)
        if(cItem){
          this.openKey = item.key
        }

      //向pre添加<SubMenu>
        pre.push((
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes(item.children)}
        </SubMenu>
        ))
      }
      return pre
    },[])
  }
  //在第一次render()之前执行一次
  //为第一个render()准备数据（必须同步
  componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    let path = this.props.location.pathname
    console.log('render()',path)

    const openKey = this.openKey

    //获取当前请求的路由路径
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="" />
          <h1>后台管理</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {
            // this.getMenuNodes(menuList)
            this.menuNodes 
          }
        </Menu>
      </div>

    )

  }
}
/**
 * withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)