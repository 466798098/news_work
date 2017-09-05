/**
 * 新闻详情路由组件
 */
import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, BackTop} from 'antd'
import NewsImageBlock from './news_image_block'
import NewsComments from './news_comments'

export default class NewsDetail extends Component {

  state = {
    news: {},
  }

  componentDidMount () {
    // 发送ajax请求获取新闻详情数据
    const {uniquekey} = this.props.params
    this.showNewsDetail(uniquekey);
    console.log(1);

  }

  componentWillReceiveProps (newProps) {
    console.log('componentWillReceiveProps() ', newProps)
    this.showNewsDetail(newProps.params.uniquekey)
  }

  showNewsDetail(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data

        this.setState({news})
        // 更新文档的标题
        document.title = news.title
      })
  }

  render () {

    const {news} = this.state
    const {uniquekey} = this.props.params;
    const realtype =news.realtype;
    var type;
    switch (realtype){
      case '头条':
        type='toutiao';
        break;
      case '社会':
        type='shehui';
        break;
      case '国内':
        type='guonei';
        break;
      case '国际':
        type='guoji';
        break;
      case '娱乐':
        type='yule';
        break;
      case '体育':
        type='tiyu';
        break;
      case '科技':
        type='keji';
        break;
      case '时尚':
        type='shishang';
        break;
    }
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className='container'>
            <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
            <NewsComments uniquekey={uniquekey}></NewsComments>
          </Col>
          <Col span={6}>
            <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle="相关新闻"></NewsImageBlock>

            </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop />
      </div>
    )
  }
}