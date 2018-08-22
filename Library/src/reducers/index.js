import { combineReducers } from 'redux';
import sidebar from './sidebar';
import ui from './ui';
import { appId, dialog, singlePageApp, fullscreen, errorMsg } from './app';
import _config from './_config';
import _displayInfo from './_displayInfo';
import someReducer from './someReducer';

const app = combineReducers({
  appId,
  dialog,
  singlePageApp, 
  fullscreen,
  ui,
  sidebar,
  // errorMsg,
  _config,
  _displayInfo,
  someReducer
});

export default app;
