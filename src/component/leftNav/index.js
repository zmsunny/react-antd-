
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
class LeftNav extends Component {
    constructor (props) {
        super(props)
        this.renderMenu = this.renderMenu.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
    }
    handleMenuClick({item,key,keypath}){
        console.log(key)
        this.props.history.push(key)
    }
    renderMenu () {
        let { menu_config } = this.props
        if (!menu_config) return ''
        return  <Menu onClick = { this.handleMenuClick } mode="inline" defaultSelectedKeys={['1']} theme="dark">
                {menu_config.map(menu => {
                        if ( menu.children && menu.children.length ) {
                            return (
                                <SubMenu
                                    key={menu.path}
                                    title={<span><Icon type="user" /><span>{menu.title}</span></span>}
                                >
                                    { menu.children.map(m => (
                                        <Menu.Item key={m.path}>{m.title}</Menu.Item>
                                    )) }
                                    
                                </SubMenu>
                            )
                        }
                        return (<Menu.Item key={menu.path}>
                                    <Icon type="pie-chart" />
                                    <span>{menu.title}</span>
                                </Menu.Item>)
                    })
                }
            </Menu>                
    }

    render () {
        return (
            <div className = "app-left-nav">
                { this.renderMenu() }
            </div>
        )
    }

}

export default withRouter(LeftNav)