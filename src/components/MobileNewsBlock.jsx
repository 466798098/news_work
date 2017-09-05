import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'
import {Row,Col,Card} from 'antd'
import axios from 'axios'

export default class MobileNewsBlock extends Component{
    
  static propTypes ={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    imageWidth:PropTypes.string.isRequired
  }
  state ={
    newsArr:[]
  }
  
  componentDidMount(){
    const {type,count} = this.props
    const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response=>{
         const newsArr =  response.data
         this.setState({newsArr})
      })
  }



  render () {
    const {imageWidth} =this.props
    const {newsArr}=this.state
    const newsList = newsArr.length==0?
      (<h2>没有任何新闻</h2>):
    (newsArr.map((news,index)=>(
    <Card key={index}>
      <Link to={`/news_detail/${news.uniquekey}`}>
        <Row>
          <Col span={10}>
        <img src={news.thumbnail_pic_s} alt="" style={{width:imageWidth}}/>
        </Col>
          <Col span={14}>
            <p>{news.title}</p>
            <p>发布时间：{news.date}</p>
            <p>来源：{news.author_name}</p>
          </Col>
        </Row>
      </Link>
    </Card>)))

    return  (<div>{newsList}</div>)
  }
}