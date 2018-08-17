import React, { Component } from 'react'
import './index.css'
import connect from '../../modules/connect'
import Leftnav from '../leftNav'
import { Layout, Breadcrumb} from 'antd';

const { Header, Content, Footer, Sider } = Layout;


class Home extends Component{
    state = {
        collapsed: false,
    };
    componentDidMount () {
      if ( !this.props.commons.menu_config ) {
          console.log(this.props)
          this.props.commons_actions.get_menu_config()
      }
  }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render(){
        return (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <div className="logo" >HB-OA</div>
                <Leftnav menu_config ={this.props.commons.menu_config}/>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    { this.props.children }
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          );
    }
}
  

export default connect(Home,'commons')