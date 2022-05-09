import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchNasa from './pages/SearchNasa';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({uri: '/graphql'});

const client = new ApolloClient({
    //uri: 'http://localhost:8000/graphql',
    link: httpLink,
    cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchNasa} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
