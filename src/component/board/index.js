import React, {Component} from 'react'
import {Model, Table, Button, Divider, Icon, Select, Modal,Input} from 'antd';
const Option = Select.Option;
const {TextArea} = Input;

class Board extends Component {
    constructor(props){
        super(props)
        this.searchChange = this.searchChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.submitCreateBoard = this.submitCreateBoard.bind(this)
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        modal_visible: false,
        check_data:[],
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
                        <a onClick = { this.deleteBoard.bind(this,record.id) }
                        href = "javascript:;" > 删除 </a>
                        <Divider type="vertical" />
                        <a onClick={this.checkDetail.bind(this,record.id)} href="javascript:;" className="ant-dropdown-link">
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
    toggleModal(){
        this.setState({ modal_visible: !this.state.modal_visible})
    }
    checkDetail(id){
        for(var i=0;i<this.state.data.length;i++){
            const item = this.state.data[i];
            if(item.id === id){
                this.setState({ check_data:item})
            }
        }
        this.toggleModal()
    }
    deleteBoard(id) {
         //这里需要和后台配合先连接数据库后然后请求后台api删除数据之后然后页面上再去删除
         this.setState({
             data: this.state.data.filter(item => item.id !== id)
         })
    }
    createBoard(){
        this.setState({check_data:{}})
        this.toggleModal()
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
    submitCreateBoard(title, content) {
        let id = this.state.data.length + 1
        let board = { title, content, type: '生活园地', type_id: 1, id, key: id }
        this.state.data.push(board)
        this.setState({ data: this.state.data })
        this.toggleModal()
    }
  render() {
    const { loading, selectedRowKeys, data, types, check_data} = this.state;
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
          <Button
            type="primary"
            onClick={this.createBoard}
          >
            create
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={data} />
            <OAModel check_data={check_data}
                visible={this.state.modal_visible}
                onOk={ check_data.title ? this.toggleModal : this.submitCreateBoard }
                onCancel={this.toggleModal}>
		</OAModel>  
      </div>
    );
  }
}
const CreateFrom = ({get_title,get_content}) =>{
	return (
		<div>
		  <Input  onChange={get_title}  placeholder="please enter your title" />
		  <TextArea  onChange={get_content} placeholder="please enter your content" autosize={{ minRows: 3 }} />
		</div>
	)
}
class OAModel extends Component{
    state = {
        board:{title:'',content:''}
    }
    constructor(props){
        super(props)
        this.get_title = this.get_title.bind(this)
        this.get_content = this.get_content.bind(this)
    }
    get_title(e){
        this.state.board.title = e.target.value
        this.setState({board:this.state.board})
    }
    get_content(e){
        this.state.board.content = e.target.value
        this.setState({board:this.state.board})
    }
    render(){
        let title = this.props.check_data.title || '新增'
        let content = this.props.check_data.content || <CreateFrom get_title={this.get_title} get_content={this.get_content}></CreateFrom>
        return (
            <Modal
                title={title}
                visible={this.props.visible}
                onOk = {
                    this.props.onOk.bind(null,this.state.board.title,this.state.board.content)
                }
                onCancel={this.props.onCancel}
            >
                <div>{content}</div>
            </Modal>
        )
    }
}
export default Board