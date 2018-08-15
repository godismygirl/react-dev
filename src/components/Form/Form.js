import React from 'react';
import {Form as AntdForm, Icon, Input, Button, Row, Col} from 'antd';
import {observer} from 'mobx-react';

const AntdFormItem = AntdForm.Item;
const Form =  AntdForm.create()(StandardForm);

@observer
class StandardForm extends React.Component {
    constructor(props){
        super(props)
        this.expandable = this.isFormExpandable();
        if(this.expandable){
            this.state = {
                isCollapsed : true
            }
        }
    }
    isFormExpandable = () => {
        const {data} = this.props;
        const expandableRows = data.filter(el => el.collapsed !== undefined);
        return expandableRows.length > 0;
    }

    renderRows = () => {
        const rows = [];
        let displayStyle = null;
        this.props.data.map((el,i)=> {
            if(el.collapsed !== undefined && this.state.isCollapsed){
                displayStyle = {'display':'none'}
            }
            rows.push(
                <Row key={i} style={displayStyle}>
                    {this.renderCols(el.row)}
                </Row>
            )
        })
        return rows;
    }
    renderCols = (arr) => {
        
        if(arr.length > 4){
            console.error('too many column in one row')
        }
        const cols = [];
        const defaultSpan = 24 / arr.length;
        arr.map( (el, i) => {
            const span = el.span? el.span : defaultSpan;
            cols.push(
                <Col key={i} span={span}>
                    <AntdFormItem label={el.label}>
                        {this.renderItem(el.item)}
                    </AntdFormItem>
                </Col>
            )
        })
        return cols;
    }
    renderItem = (control) => {
        const { getFieldDecorator } = this.props.form;
        return getFieldDecorator(control.id, {
            rules: [control.rules],
            initialValue : control.value
          })(
            this.getControlItem(control)
          )
    }
    getControlItem = (control) => {
        return <Input placeholder={control.placeholder}/>
    }
    toggle = () => {
        const {isCollapsed} = this.state;
        this.setState({ 'isCollapsed': !isCollapsed });
    }
    renderButtons = () => {
        const buttons = [];
        buttons.push(<Button key="search" type="primary" onClick={this.onSearch}>搜索</Button>);

        const {showClearButton} = this.props;
        const hasClearButton = (showClearButton === true || showClearButton === 'true')? true : false;
        if(hasClearButton){
            buttons.push(<Button key="clear" onClick={this.onClear}>清空</Button>)
        }
        if(this.expandable){
            buttons.push(<a key="toggle" style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                <Icon type={this.state.isCollapsed ? 'down':'up' } />
              </a>)
        }
        return buttons;
    }
    onSearch = () => {
        if(this.props.onSearch){
            const {onSearch} = this.props;
            onSearch();
        }
    }
    onClear = () => {

    }
    render(){
        const {data} = this.props;
        return (
            <div className="form">
                <div className="">
                    {this.renderRows()}
                </div>
                <div className="form-buttons">
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}

export default Form;