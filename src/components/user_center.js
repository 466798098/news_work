/**
 * 用户中心路由组件
 */
import React, {Component} from 'react'
import {Tabs,Card,Row,Col} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
const TabPane =Tabs.TabPane

export default class UserCenter extends Component {
  state = {
    comments:[],
    collections:[]
  }

  componentDidMount(){
    const userId =localStorage.getItem('userId')
    const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response=>{
        const comments=response.data;
        this.setState({comments})
      });
    const url1 =`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url1)
      .then(response=>{
        const collections=response.data;
        this.setState({collections})
      })
  }

  componentWillReceiveProps(props){
    this.componentDidMount()
  }

  render () {
    const username =localStorage.getItem('username')
    const {comments,collections}=this.state;

    const commentsList=(comments && comments.length!=0)?
      (comments.map((comment,index)=>{
        return <Card key={index} title={username} extra={`发布于${comment.datetime}`}>
          <p>{comment.Comments}</p>
        </Card>
      })):
      (<p>您还没有任何评论</p>);
    const collectionsList=(collections && collections.length!=0)?
      (collections.map((collection,index)=>{

        return <Card key={index} title={username} extra={<Link to={`/news_detail/${collection.uniquekey}`}>查看</Link>}>
          <Link to={`/news_detail/${collection.uniquekey}`}>{collection.Title}</Link>
        </Card>
      })):
      (<p>您还没有收藏任何文章</p>);

    return (
      <Row>
        <Col span={1}></Col>
         <Col span={22}>
            <Tabs type="card" >
              <TabPane tab="我的收藏" key="1">
                {collectionsList}
              </TabPane>
              <TabPane tab="我的评论" key="2">
                {commentsList}
              </TabPane>
              <TabPane tab="我的头像" key="3">
              </TabPane>
            </Tabs>
         </Col>
          <Col span={1}></Col>
      </Row>
    )
  }
}