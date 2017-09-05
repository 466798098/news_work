import React,{Component} from 'react'
import axios from 'axios'

import NewComments from './news_comments'

export default class MobileNewsDetail extends Component {

  state ={news:null}
  componentDidMount(){
    const {uniquekey}=this.props.params
    const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        const news=response.data
        this.setState({news})

      })
  }

  render () {
    const {news}=this.state
    const {uniquekey}=this.props.params
    const newsContent =news ?
      (<p dangerouslySetInnerHTML={{__html:news.pagecontent}}></p>):
      (<h2>没有任何新闻</h2>)
    return (
      <div>
        {newsContent}
        <hr/>
        <NewComments uniquekey={uniquekey}></NewComments>
      </div>
    )
  }
}