import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './app.less';
import Layout from '../layouts/Layout';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import { globalProxy } from '../common/globalProxy'

import TableView from './tableView';
import UserView from './userView';

const {Header, Sider, Content} = Layout;

class App extends React.Component {
    goToUserview = () => {
        let h = this.props.history
        console.log(h)
        this.props.history.push({pathname:'/user'})
    }
    goToTableview = () => {
        let h = this.props.history
        console.log(h)
        this.props.history.push({pathname:'/table'})
    }
    componentDidMount(){
       // alert('push')
       //this.props.history.push(proxy.currentPath)
    }

    logState(){
        console.log(
            globalProxy.get('my-enu')
        )
    }

    render(){
        return (
            <Layout>
                <Header>
                    <button onClick={this.logState} >log</button>
                </Header>
                <Sider>
                    <SiderMenu 
                        id="my-enu"
                        currentPath = '/list/table-list'
                        url = '/mock/menuData'
                    />
                </Sider>
                <Content>
                    <Switch>
                        <Route path='/list/table-list' component={TableView}/>
                        <Route path='/list/basic-list' component={UserView}/>
                    </Switch>
                </Content>
            </Layout>
        )
    }
}

export default withRouter(App)