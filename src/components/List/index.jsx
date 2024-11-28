import classes from './index.module.scss';
import ItemList from '../ItemList/index.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchId,
  getTickets,
} from '../../store/slices/apiGetTickets.slice.js';
import { Loading } from '../../ui/Loading/index.jsx';
import { ErrorComponent } from '../../ui/ErrorComponent/index.jsx';
import { useActionsFilters } from '../../hooks/useActionsFilters.js';

function List() {
  const {
    selectedAll,
    withoutTransfers,
    oneTransfers,
    twoTransfers,
    threeTransfers,
    errorTransfers,
  } = useSelector((store) => store.transfersFilters);

  const stateTransferFilters = useSelector((store) => store.transfersFilters);

  const { transfersFilter, loadingFetchList } = useActionsFilters();

  const dispatch = useDispatch();

  const {
    searchId,
    tickets,
    currentTickets,
    status,
    error,
    loading,
    ticketsWithoutTransfers,
    stopFetch,
    conditionFilters,
    loadingFetchListTickets,
  } = useSelector((store) => store.getTickets);

  const [currentDataTickets, setCurrentDataTickets] = useState([]);
  const [countItem, setCountItem] = useState(5);

  useEffect(() => {
    loadingFetchList(true);
    let timer;
    const fetchTickets = () => {
      dispatch(getSearchId())
        .unwrap()
        .then((response) => {
          if (response && response.searchId) {
            const fetchAndCheckStop = () => {
              dispatch(getTickets(response.searchId)).then((action) => {
                if (stopFetch || action?.payload?.stop) {
                  loadingFetchList(false);
                  return;
                } else {
                  timer = setTimeout(fetchAndCheckStop, 1000);
                }
              });
            };
            fetchAndCheckStop();
          }
        })
        .catch((error) => {
          console.error('Ошибка:', error);
        });
    };
    fetchTickets();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'resolved getTickets' && currentTickets.length !== 0) {
      setCountItem(5);
      const actualData = [...currentTickets].slice(0, 5);

      setCurrentDataTickets(actualData);
    }
  }, [errorTransfers, stateTransferFilters, stopFetch, conditionFilters]);

  const clickBtnShowMore = () => {
    const actualData = [...currentTickets];

    setCurrentDataTickets([...actualData.slice(0, countItem + 5)]);
    setCountItem((prev) => prev + 5);
  };

  useEffect(() => {
    if (tickets.length !== 0) {
      const arrTypes = [];
      for (const key in stateTransferFilters) {
        if (stateTransferFilters[key]) {
          arrTypes.push(`${key}`);
        }
      }
      transfersFilter(arrTypes);
    }
  }, [stateTransferFilters, loading]);

  return (
    <>
      <div className={classes.container}>
        {error || errorTransfers ? (
          <ErrorComponent />
        ) : loading ? (
          <Loading />
        ) : (
          currentDataTickets.map((ticket, index) => (
            <ItemList key={index} ticket={ticket} />
          ))
        )}

        <button className={classes.btnShowMore} onClick={clickBtnShowMore}>
          Показать еще 5 билетов!
        </button>
      </div>
    </>
  );
}

export default List;
