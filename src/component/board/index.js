import React, {Component} from 'react'
import { Table, Button, Divider, Icon, Select, Modal } from 'antd';
const Option = Select.Option;


class Board extends Component {
    constructor(props){
        super(props)
        this.searchChange = this.searchChange.bind(this)
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        columns: [{
            title: 'Title',
            dataIndex: 'title',
        }, {
            title: 'Content',
            dataIndex: 'content',
        }, {
            title: 'Type',
            dataIndex: 'type',
        },
        {   title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (        
                    <span>
                        <a href="javascript:;">修改</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">删除</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" className="ant-dropdown-link">
                        查看
                        </a>
                    </span>
                )
            }    
        }],
        data:[],
        types:[]
    };
    getData(type_id = 0){
        this.$http.ajax({
            url: 'api/board-'+type_id+'.json'
        }).then(data=>{
            this.setState({data:data.boardlist.map(item=>{
                item.key=item.id
                return item
            })})
        }) 
    }
    getTypes(){
        this.$http.ajax({
            url: 'api/board-types.json'
        }).then(data=>{
            this.setState({ types:data.boardtypes})
        })
    }
    componentDidMount(){
        this.getData()
        this.getTypes()
    }
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
        this.setState({
            selectedRowKeys: [],
            loading: false,
        });
        }, 1000);
    }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  searchChange(value){
      this.getData(value)
  }
  render() {
    const { loading, selectedRowKeys,data,types } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="app-board">
        <div style={{ marginBottom: 16 }}>
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a type"
            onChange={this.searchChange}
        >
            <Option key={0} value={0}>全部</Option>
            {types.map(type=>(<Option key={type.id} value={type.id}>{type.title}</Option>))}
        </Select>    
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={data} />
      </div>
    );
  }
}
export default Board