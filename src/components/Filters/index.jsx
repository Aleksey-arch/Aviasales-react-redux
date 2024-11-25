import classes from './index.module.scss';
import { useActionsFilters } from '../../hooks/useActionsFilters.js';
import { useState } from 'react';

function Filters() {
  // const classActive = classes.active;
  const [activeTabLowCost, setActiveTabLowCost] = useState(null);
  const [activeTabFasts, setActiveTabFasts] = useState(null);
  const [activeTabOptimal, setActiveTabOptimal] = useState(null);
  const { tabsSort } = useActionsFilters();

  const tabsFilter = (type) => {
    tabsSort(type);
  };

  const getActiveClassName = (type) => {
    if (type === 'btnLowCost') {
      setActiveTabLowCost(classes.active);
      setActiveTabFasts(null);
      setActiveTabOptimal(null);
    }
    if (type === 'btnFasts') {
      setActiveTabLowCost(null);
      setActiveTabFasts(classes.active);
      setActiveTabOptimal(null);
    }
    if (type === 'btnOptimal') {
      setActiveTabLowCost(null);
      setActiveTabFasts(null);
      setActiveTabOptimal(classes.active);
    }
  };

  return (
    <>
      <form className={classes.container} onSubmit={(e) => e.preventDefault()}>
        <button
          className={[classes.btn, activeTabLowCost].join(' ')}
          onClick={() => {
            tabsFilter('btnLowCost');
            getActiveClassName('btnLowCost');
          }}
        >
          Самый дешевый
        </button>
        <button
          className={[classes.btn, activeTabFasts].join(' ')}
          onClick={() => {
            tabsFilter('btnFasts');
            getActiveClassName('btnFasts');
          }}
        >
          Самый быстрый
        </button>
        <button
          className={[classes.btn, activeTabOptimal].join(' ')}
          onClick={() => {
            tabsFilter('btnOptimal');
            getActiveClassName('btnOptimal');
          }}
        >
          Оптимальный
        </button>
      </form>
    </>
  );
}

export default Filters;
