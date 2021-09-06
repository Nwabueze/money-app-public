import Home from '../components/Home'

import Layout from '../components/Layout';
import { createStore } from 'redux';
import allReducer from '../Reducer';
import { Provider } from 'react-redux';

const store = createStore(allReducer);

export default function App(){
    
    return (
      <Provider store={store}>
       
        <Layout>
          <Home />
        </Layout>

      </Provider>
    )
}