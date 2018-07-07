import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import WordCloud from './WordCloud'
import Show from './Show'

const Routes = () => (
  <Router>
    <React.Fragment>
      <Route exact path='/' component={App} />
      <Route path='/main' component={App} />
      <Route path='/wordcloud' component={WordCloud} />
      <Route path='/show' component={Show} />
    </React.Fragment>
  </Router>
)

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
