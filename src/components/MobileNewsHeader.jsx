import React,{Component} from 'react'
import {Row,
        Col,
        Icon,
        Modal,
        Tabs,
        Form,
        Input,
        Button,
        message} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
import logo from '../images/logo.png'
const TabPane =Tabs.TabPane
const FormItem =Form.Item

 class MobileNewsHeader extends Component {
  state = {
    username:null,
    showModal:false
  }
  componentDidMount (){
    const username = localStorage.getItem('username')
    this.setState({username})
  }
  handleSubmit=(isLogin,event)=>{
    event.preventDefault()
    const {getFieldsValue}=this.props.form
    const {username,password,r_userName,r_password,r_confirmPassword}=getFieldsValue()
    if(isLogin){
      const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`
      axios.get(url)
        .then(response=>{
          const result = response.data
          if(result){
            message.success('登录成功');
            this.setState({username})
            localStorage.setItem('username',result.NickUserName);
            localStorage.setItem('userId',result.UserId)
          }else {
            message.error('登录失败');
            return;
          }
        })
    }else {
      const urlRegist=`http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
      axios.get(urlRegist)
        .then(response=>{
          const resultRegist=response.data
          if(resultRegist){
            message.success('注册成功')
          }else {
            message.error('注册失败');
            return;
          }
        })
    }
    this.setState({showModal:false})
    this.props.form.resetFields()

  }
  modalShow=()=>{

    this.setState({showModal:true})
  }
  handleClick=()=>{
    this.setState({showModal:false}
    )
    this.props.form.resetFields()
  }
  logout=()=>{
    this.setState({username:null})
    message.success('退出成功')
    localStorage.removeItem('username')
  }
  render() {
      const {username,showModal} = this.state
      const {getFieldDecorator} = this.props.form
      const userItem = username?
      (<div id="logout"> <Button onClick={this.logout} >退出</Button>
          <Link to="/user_center"><Icon type="inbox"></Icon></Link>
        </div>
      ):
      ( <Icon type="setting" onClick={this.modalShow}></Icon>)
    return (
      <div id="mobileheader">
        <header>
          <div>
            <Link to='/'>
              <img src={logo} alt="logo"/>
              <span>ReactNews2</span>
            </Link>
            {userItem}
          </div>

        </header>
        <Modal title="用户中心"
               visible={showModal}
                onOk={this.handleClick}
                onCancel={this.handleClick}
               okText="关闭"
                >
          <Tabs type="card" onChange={()=>{this.props.form.resetFields()}}>
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit.bind(this,true)}>
                <FormItem label="账户">
                  {
                    getFieldDecorator('username')(
                      <Input placeholder="请输入账号"/>
                    )
                  }

                </FormItem>
                <FormItem label="密码">
                  {
                    getFieldDecorator('password')(
                  <Input type="password" placeholder="请输入密码"/>
                    )
                  }
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this,false)}>
                <FormItem label="账户">
                  {
                    getFieldDecorator('r_userName')(
                  <Input placeholder="请输入账号"/>
                    )
                  }
                </FormItem>
                <FormItem label="密码">
                  {
                    getFieldDecorator('r_password')(
                  <Input type="password" placeholder="请输入密码"/>
                    )
                  }
                </FormItem>
                <FormItem label="确认密码">
                  {
                    getFieldDecorator('r_confirmPassword')(
                  <Input type="password" placeholder="请确认密码"/>
                    )
                  }
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(MobileNewsHeader)