import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './app.less';
import Layout from '../layouts/Layout';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import { globalProxy } from '../common/globalProxy';

import TableView from './tableView';
import UserView from './userView';
import Form from '../components/Form/Form';

const {Header, Sider, Content} = Layout;

const formData = [
    { row : [
            {label:'条件一', span:8, item:{
                type:'input',
                id:'input1',
                placeHolder:'test placeholder',
                rules:{
                    required: true,
                    message: 'Input something!',
                }
            }},
            {label:'车道数量',item:{type:'input',id:'input2',placeHolder:'test placeholder 2'},span:8},
            {label:'旋转方向',item:{type:'input',id:'input3',placeHolder:'test placeholder3'},span:8}
        ] 
    },
    { row : [
            {label:'测试条件',item:{type:'input',id:'input4',placeHolder:'test placeholder4'}},
            {label:'测试人员',item:{type:'input',id:'input5',placeHolder:'test placeholder5'}},
            {label:'质量评级',item:{type:'input',id:'input6',placeHolder:'test placeholder6'}}
        ], 
        collapsed:true 
    },
    { row : [
            {label:'机车种类',item:{type:'input',id:'input7',placeHolder:'test placeholder7'},validate:{rule:'', isRequired:true, errorText:'输入的种类有误'}},
            {label:'电话号码',item:{type:'input',id:'input8',placeHolder:'test placeholder8'}},
            {label:'智障等级',item:{type:'input',id:'input9',placeHolder:'test placeholder9'}}
        ], 
        collapsed:true 
    }
]

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
                    <div>
                        <Form 
                            id="test-form" 
                            data={formData} 
                            showClearButton={true}
                            buttonPositon="bottom"
                        />
                    </div>
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