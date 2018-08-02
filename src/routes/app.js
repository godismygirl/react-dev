import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './app.less';
import SiderMenu from '../components/SiderMenu';
import NavStore from '../components/NavStore';

import TableView from './tableView';

import UserView from './userView';

const navStore = new NavStore('/mock/menuData');

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
        this.props.history.push(navStore.currentPath)
    }
    render(){
        return (
            <div>
                <div className="sider">
                   <SiderMenu 
                    dataSource = {navStore}
                    currentPath = '/list/table-list'
                   />
                </div>
                <div className="content">
                    <Switch>
                        <Route path='/list/table-list' component={TableView}/>
                        <Route path='/list/basic-list' component={UserView}/>
                        
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App)