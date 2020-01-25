import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';


import reducers from './reducers';
import PostIndex from './components/posts_index';
import PostNew from './components/post_new';
import PostShow from './components/post_show';

const storeWithMiddleware = applyMiddleware(promise)(createStore);

ReactDom.render(
    <Provider store={storeWithMiddleware(reducers)}>
      <BrowserRouter>
         <div>
         <Switch>
            <Route path="/post/new" component={PostNew} />
            <Route path="/posts/:id" component={PostShow} />
            <Route path="/" component={PostIndex} />
         </Switch>
         </div>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);