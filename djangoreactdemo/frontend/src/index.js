import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Pos from './Pos';
import ConsumerBill from './components/ConsumerBill'
import ProdMan from './components/ProdMan';
import NotFoundPage from './components/NotFoundPage';
import Base from './components/Base';
import Login from './components/Login';
import AdvertisersPage from './components/AdvertisersPage';
//import DeleteLater from './components/DeleteLater';
//<Location path="/delete" handler={DeleteLater} />


var Router = require('react-router-component')

var Locations = Router.Locations
var Location = Router.Location
var NotFound = Router.NotFound

ReactDOM.render(
  <Locations>
      <Location path="/login" handler={Login} />
      <Location path="/base" handler={Base} />
      <Location path="/pos" handler={Pos} />
      <Location path="/prodman" handler={ProdMan} />
      <Location path="/advertise" handler={AdvertisersPage} />

      <Location path={/\/boughtdata\/(\w+)/} handler={ConsumerBill}
        urlPatternOptions={['unique_identifier_string']} />
      <NotFound handler={NotFoundPage} />
      </Locations>,
   document.getElementById('root'));
registerServiceWorker();
//<Location path={/\/friends\/(\d+)\/(photos|wall)/} handler={ConsumerBill}
//  urlPatternOptions={['id', 'pageName']} />
