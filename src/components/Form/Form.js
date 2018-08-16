import React from 'react';
import {Form, Icon, Input, Button, Row, Col} from 'antd';
import {observer} from 'mobx-react';
import './index.less';

const FormItem = Form.Item;


@observer
class StandardForm extends React.Component {

    constructor(props){
        super(props)
        this.expandable = this.isFormExpandable();
        this.vertical = this.isFormVertical();
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

    isFormVertical = () => {
        const {data} = this.props;
        return data[0].row.length === 1
    }

    getFormItemLayout = () => {
        return {
            labelCol: { span: 6 },
            wrapperCol: { span: 10 },
        }
    }

    getTailFormItemLayout = () => {
        return {
            wrapperCol: { span: 10, offset:6 },
        }
    } 

    renderRows = () => {
        const rows = [];
        this.props.data.map((el,i)=> {
            const displayStyle = (el.collapsed !== undefined && this.state.isCollapsed) ? {'display':'none'} : null;
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
        const formItemLayout = this.vertical? this.getFormItemLayout() : null;
        arr.map( (el, i) => {
            const span = el.span? el.span : defaultSpan;
            cols.push(
                <Col key={i} span={span}>
                    <FormItem {...formItemLayout} label={el.label}>
                        {this.renderItem(el.item)}
                    </FormItem>
                </Col>
            )
        })
        return cols;
    }

    renderItem = (control) => {
        const { getFieldDecorator } = this.props.form;
        return getFieldDecorator(control.id, {
            rules: control.rules? [control.rules] : null,
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
        const tailFormItemLayout = this.vertical? this.getTailFormItemLayout() : null;
        const {showClearButton, buttonText} = this.props;
        const hasClearButton = (showClearButton === true || showClearButton === 'true')? true : false;

        buttons.push(
            <Button key="search" type="primary" onClick={this.onSearch}>
                {buttonText || '搜索'}
            </Button>
        );
        if(hasClearButton){
            buttons.push(<Button key="clear" onClick={this.onClear}>清空</Button>)
        }
        if(this.expandable){
            buttons.push(
                <a key="toggle" className="toggle" onClick={this.toggle}>
                    <Icon type={this.state.isCollapsed ? 'down':'up' } />
                </a>
            )
        }

        return <FormItem {...tailFormItemLayout}>{buttons}</FormItem>
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
        const {buttonPosition, className} = this.props;
        const layoutType = this.vertical ? 'horizontal' : 'inline';
        const buttonPositionClass = !this.vertical && buttonPosition === 'bottom'? 'btns-bottom' : null;
        return (
            <div className={'form-container ' + className}>
                <Form className={buttonPositionClass} layout={layoutType}>
                    <div className="form-controls">
                        {this.renderRows()}
                    </div>
                    <div className="form-buttons">
                        {this.renderButtons()}
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create()(StandardForm);