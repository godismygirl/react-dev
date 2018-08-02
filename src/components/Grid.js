import React from 'react';
import {Table} from 'antd';
import {observer} from 'mobx-react';

@observer
class Grid extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {selectedRowKeys:[]}
    }

    componentDidMount(){
        this.props.dataSource.load();
        this.props.dataSource.autoReload(this.props.reloadInterval);
    }

    componentWillUnmount(){
        this.props.dataSource.dispose();
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const { onSelectRow } = this.props;
        if (onSelectRow) {
          onSelectRow(selectedRows);
        }
    
        this.setState({ selectedRowKeys });
        console.log(this.state);
    };

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if(onChange) {
            onChange(pagination, filters, sorter);
        }
    }

    render(){
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...this.props.pagination,
        };

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };

        return (
            <Table
                loading={this.props.dataSource.loading}
                dataSource={this.props.dataSource.data}
                rowKey={this.props.rowKey || 'key'}
                columns={this.props.columns}
                rowSelection={rowSelection}
                pagination={paginationProps}
                onChange={this.handleTableChange}
            />
        )
    }
}

export default Grid;