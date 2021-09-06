import React from 'react';
import useStyles from '../../utils/styles'
import Layout from '../../components/Layout';
import TabView from '../../components/TabView';
import AlertBox from '../../components/AlertBox'
import SimpleDialogue from '../../components/SimpleDialog';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';

import { createStore, combineReducers } from 'redux';
import allReducer from '../../Reducer';
import { Provider } from 'react-redux';
//import { parseCookies } from '../../utils/parseCookies';

const store = createStore(allReducer);

export default function ItemPage(){

    const router = useRouter();
    const classes = useStyles();
    const {id} = router.query;
    

    
    return (
      <Provider store={store}>
       
        <Layout>
          <TabView />
        </Layout>

      </Provider>
    )
}