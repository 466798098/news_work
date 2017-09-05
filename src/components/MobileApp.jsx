import React,{Component} from 'react'
import {BackTop} from 'antd'
import MobileNewsHeader from './MobileNewsHeader'
import NewsFooter from './news_footer'
import '../componentsCss/mobile.css'

export default class MobileApp extends Component {


  render(){
    console.log(this);
    return (
      <div>
        <MobileNewsHeader/>
        {this.props.children}
        <NewsFooter />
        <BackTop />
      </div>
    )
  }
}