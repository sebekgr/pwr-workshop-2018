import ApolloClient from 'apollo-boost';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom';

import Example from './Example';
import Users from './Users';
import UsersByName from './UsersByName';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

export default function Application() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <div className="ui inverted menu">
            <div className="ui container">
              <Link className="header item" to="/">
                Warsztaty
              </Link>
              <Link className="item" to="/example">
                Przykład
              </Link>
              <Link className="item" to="/users">
                Users
              </Link>
              <Link className="item" to="/usersByName">
                User By Name
              </Link>
            </div>

            <div className="item">
              ja + GraphQL + MongoDB + React
            </div>
          </div>

          <Switch>
            <Route path="/example/:input" component={Example} />
            <Route exact path="/example" render={() => <Redirect to="/example/42" />} />
            <Route path="/usersByName/:name" component={UsersByName} />
            <Route exact path="/usersByName" render={() => <Redirect to="/usersByName/dgauntc" />} />
            <Route exact path="/users" component={Users} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  )
}
