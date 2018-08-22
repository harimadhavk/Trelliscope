import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Body from './components/Body';
import { setMyName } from './actions/someAction';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import injectSheet from 'react-jss';

export const someSelector = state => state.someReducer.name;
// needed for onTouchTap (can go away with react 1.0 release)
injectTapEventPlugin();

const App = ({ sheet: { classes }, name, setName }) => (
  <div >
    <Body />
   <div className={classes.test}>
    <button onClick={() => setName('test')}>THIS IS A BUTTON</button>
    <span >{name}</span>
    </div>
  </div>

);


const stateSelector = createSelector(
  someSelector,
  (name) => ({ name })
);

const mapStateToProps = state => (
  stateSelector(state)
);
const mapDispatchToProps = dispatch => ({
  setName: (name) => {
    dispatch(setMyName(name));
  }
});

const staticStyles = {
  test: {
    color: 'red',
    zIndex : 9999,
    position : 'absolute'
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(injectSheet(staticStyles)(App));

