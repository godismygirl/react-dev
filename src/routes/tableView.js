import React from 'react';
import {Input, Button} from 'antd';
import Grid from '../components/Grid';
import './app.less';
import GridData from '../models/GridData';

const testData = new GridData('/mock/profile');

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '家庭住址',
    dataIndex: 'address',
    key: 'address',
  }];

export default class TableView extends React.PureComponent {
    render(){
        return (
            <div>
                <img src="../public/logo.png"/>
                <div className="logo"></div>
                <div className="search-area">
                    <Input />
                    <Input />
                    <Input />
                    <Button type="primary" >Search</Button>
                </div>
                <div className="result-area">
                    <Grid 
                        columns={columns} 
                        dataSource={testData} 
                        reloadInterval="3000"
                        />
                </div>
            </div>
        )
    }
}