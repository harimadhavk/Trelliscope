import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { windowWidthSelector, windowHeightSelector } from '../selectors/ui';
import SideButtons from './SideButtons';
import Sidebar from './Sidebar';

const Body = ({ sheet: { classes }, width, height }) => (
  <div className={classes.body} style={{ width, height }}>
    <SideButtons />
    <Sidebar />
  </div>
);

Body.propTypes = {
  sheet: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

// ------ static styles ------

const staticStyles = {
  body: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRight: '1px solid #ddd',
    boxSizing: 'border-box'
  }
};

// ------ redux container ------

const stateSelector = createSelector(
  windowWidthSelector, windowHeightSelector,
  (width, height) => ({
    width,
    height
  })
);

const mapStateToProps = state => (
  stateSelector(state)
);

export default connect(
  mapStateToProps
)(injectSheet(staticStyles)(Body));
