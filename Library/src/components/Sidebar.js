import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SidebarLayout from './SidebarLayout';
import { contentHeightSelector, sidebarActiveSelector,
  filterColSplitSelector } from '../selectors/ui';
import { displayLoadedSelector } from '../selectors';
import { SB_PANEL_LAYOUT, SB_PANEL_FILTER, SB_PANEL_SORT,
  SB_PANEL_LABELS, SB_CONFIG } from '../constants';
import uiConsts from '../assets/styles/uiConsts';

const Sidebar = ({ sheet: { classes }, styles, active, displayLoaded }) => {
  if (active === '') {
    return (
      <div
        className={`${classes.sidebarContainer} ${classes.hidden}`}
        style={styles.sidebarContainer}
      />
    );
  }

  let content;
  if (active === SB_CONFIG) {
    content = <div className={classes.empty}>Configuration...</div>;
  } else if (!displayLoaded) {
    content = <div className={classes.empty}>Load a display...</div>;
  } else {
    switch (active) {
      case SB_PANEL_LAYOUT:
        content = <div><SidebarLayout /></div>;
        break;
      default:
        content = '';
    }
  }

  return (
    <div className={classes.sidebarContainer} style={styles.sidebarContainer}>
      <div className={classes.header}>{active}</div>
      {content}
    </div>
  );
};

Sidebar.propTypes = {
  styles: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  displayLoaded: PropTypes.bool.isRequired
};

// ------ static styles ------

const staticStyles = {
  sidebarContainer: {
    transitionProperty: 'left',
    transitionDuration: uiConsts.trans.duration,
    transitionTimingFunction: uiConsts.trans.timing,
    position: 'absolute',
    left: uiConsts.sideButtons.width,
    top: uiConsts.header.height,
    height: '100%',
    boxSizing: 'border-box',
    borderRight: '1px solid',
    borderColor: uiConsts.sidebar.borderColor,
    background: '#fff',
    zIndex: 999,
    overflow: 'hidden'
  },
  hidden: {
    transitionProperty: 'left',
    transitionDuration: uiConsts.trans.duration,
    transitionTimingFunction: uiConsts.trans.timing,
    left: uiConsts.sideButtons.width - uiConsts.sidebar.width
  },
  header: {
    paddingLeft: 10,
    boxSizing: 'border-box',
    fontSize: uiConsts.sidebar.header.fontSize,
    background: uiConsts.sidebar.header.background,
    height: uiConsts.sidebar.header.height,
    lineHeight: `${uiConsts.sidebar.header.height}px`,
    color: uiConsts.sidebar.header.color,
    borderLeft: '1px solid #ccc'
  },
  empty: {
    paddingLeft: 8,
    paddingTop: 5
  }
};

// ------ redux container ------

const stateSelector = createSelector(
  contentHeightSelector, sidebarActiveSelector,
  displayLoadedSelector, filterColSplitSelector,
  (ch, active, displayLoaded, colSplit) => ({
    styles: {
      sidebarContainer: {
        width: uiConsts.sidebar.width * (1 +
          (active === SB_PANEL_FILTER && colSplit && colSplit.cutoff !== null)),
        height: ch
      }
    },
    active,
    displayLoaded
  })
);

const mapStateToProps = state => (
  stateSelector(state)
);

export default connect(
  mapStateToProps
)(injectSheet(staticStyles)(Sidebar));
