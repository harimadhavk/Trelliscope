import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import { createSelector } from 'reselect';
import { setLayout } from '../actions';
import { layoutSelector } from '../selectors';
import uiConsts from '../assets/styles/uiConsts';

const SidebarLayout = ({ sheet: { classes },  handleChange }) => {
  let content = <div />;
    content = (
      <div>
      </div>
    );
  return (content);
};

SidebarLayout.propTypes = {
  sheet: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

// ------ static styles ------

const staticStyles = {
  row: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 6,
    height: 42,
    boxSizing: 'border-box',
    fontSize: 16,
    width: uiConsts.sidebar.width,
    display: 'inline-block'
  },
  label: {
    lineHeight: '28px',
    float: 'left'
  },
  nInput: {
    float: 'right'
  },
  inputRadio: {
    marginBottom: 5,
    marginTop: 0
  },
  inputLabelSpan: {
    lineHeight: '40px',
    verticalAlign: 'middle'
  },
  inputIcon: {
    fontSize: 23,
    paddingLeft: 6,
    verticalAlign: 'text-bottom'
  }
};

// ------ redux container ------

const stateSelector = createSelector(
  layoutSelector,
  layout => ({
    layout
  })
);

const mapStateToProps = state => (
  stateSelector(state)
);

const mapDispatchToProps = dispatch => ({
  handleChange: (layout) => {
    dispatch(setLayout(layout));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(staticStyles)(SidebarLayout));
