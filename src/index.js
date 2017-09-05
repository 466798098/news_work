import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import MediaQuery from 'react-responsive'
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
import MobileApp from './components/MobileApp'
import MobileNewsContainer from './components/MobileNewsContainer'
import MobileNewsDetail from './components/MobileNewsDetail'


render(
  (
  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={NewsContainer} />
          <Route path='/news_detail/:uniquekey' component={NewsDetail}></Route>
          <Route path='/user_center' component={UserCenter} ></Route>
        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path="/" component={MobileApp}>
          <IndexRoute component={MobileNewsContainer} />
          <Route path="/news_detail/:uniquekey" component={MobileNewsDetail}></Route>
          <Route path="/user_center" component={UserCenter}></Route>
        </Route>
      </Router>
    </MediaQuery>
  </div>
 ), document.getElementById('root'))





// import React from 'react'
// import ReactDOM from 'react-dom'
// import {Router, hashHistory, IndexRoute, Route} from 'react-router'
// import MediaQuery from 'react-responsive'
//
// import App from './components/app'
// import NewsContainer from './components/news_container'
// import NewsDetail from './components/news_detail'
// import UserCenter from './components/user_center'
//
// import MobileApp from './components/MobileApp'
// import MobileNewsContainer from './components/MobileContainer'
// import MobileNewsDetail from './components/MobileNewsDetail'
// import MobileUserCenter from './components/MobileUserCenter'
//
// ReactDOM.render(
//   (
//     <div>
//       <MediaQuery query='(min-device-width: 1224px)'>
//         <Router history={hashHistory}>
//           <Route path='/' component={App}>
//             <IndexRoute component={NewsContainer}/>
//             <Route path='/detail/:uniquekey' component={NewsDetail}></Route>
//             <Route path='/usercenter' component={UserCenter}></Route>
//           </Route>
//         </Router>
//       </MediaQuery>
//       <MediaQuery query='(max-device-width: 1224px)'>
//         <Router history={hashHistory}>
//           <Route path='/' component={MobileApp}>
//             <IndexRoute component={MobileNewsContainer}/>
//             <Route path='/detail/:uniquekey' component={MobileNewsDetail}></Route>
//             <Route path='/usercenter' component={MobileUserCenter}></Route>
//           </Route>
//         </Router>
//       </MediaQuery>
//     </div>
//   ),
//   document.getElementById('root')
// )