
import AlertDialog from '../components/simpleDialog'
import { AlertBox } from '../components/AlertBox'
import Layout from '../components/Layout';
import { createStore } from 'redux';
import allReducer from '../Reducer';
import { Provider } from 'react-redux';
import Register from '../components/Register';

const store = createStore(allReducer);

export default function App(){
    
    return (
      <Provider store={store}>
       
        <Layout>
          <Register />
        </Layout>

      </Provider>
    )
}