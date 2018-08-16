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
            {label:'我的选择条件一', span:8, item:{
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
            {label:'机车种类',item:{type:'input',id:'input7',placeHolder:'test placeholder7'},span:16},
            {label:'电话号码',item:{type:'input',id:'input8',placeHolder:'test placeholder8'},span:8},
        ], 
        collapsed:true 
    }
]

const verticalFormData = [
    { row : [
            {label:'我的选择条件一', item:{
                type:'input',
                id:'input1',
                placeHolder:'test placeholder',
                rules:{
                    required: true,
                    message: 'Input something!',
                }
            }}
        ] 
    },
    { row : [
            {label:'测试条件',item:{type:'input',id:'input4',placeHolder:'test placeholder4'}},
 
        ], 
        //collapsed:true 
    },
    { row : [
            {label:'机车种类',item:{type:'input',id:'input7',placeHolder:'test placeholder7'}},

        ], 
        //collapsed:true 
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
                    <div style={{paddingTop:'20px'}}>
                        <Form 
                            id="test-form" 
                            className="my-form"
                            data={formData} 
                            showClearButton={true}
                            buttonPosition="bottom"
                        />
                        <div style={{borderBottom:'1px dashed #ccc', marginTop:'20px',marginBottom:'20px'}}></div>
                        <Form 
                            id="test-form2" 
                            className="my-form"
                            data={verticalFormData}
                            buttonText = "立即注册"
                            //showClearButton={true}
                            //buttonPosition="bottom"
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