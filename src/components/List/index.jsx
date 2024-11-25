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

  const { transfersFilter } = useActionsFilters();

  const dispatch = useDispatch();

  const {
    searchId,
    tickets,
    currentTickets,
    status,
    error,
    loading,
    ticketsWithoutTransfers,
  } = useSelector((store) => store.getTickets);

  const [currentDataTickets, setCurrentDataTickets] = useState([]);
  const [countItem, setCountItem] = useState(5);

  useEffect(() => {
    dispatch(getSearchId())
      .unwrap()
      .then((response) => {
        if (response && response.searchId) {
          dispatch(getTickets(response.searchId));
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        // Обработка ошибок. Возможно, стоит вывести сообщение об ошибке пользователю.
      });
  }, [dispatch]);

  useEffect(() => {
    if (status === 'resolved getTickets' && currentTickets.tickets !== 0) {
      const actualData = Object.values(currentTickets.tickets).slice(0, 5);
      setCurrentDataTickets(actualData);
    }
  }, [status, errorTransfers, currentTickets]);

  const clickBtnShowMore = () => {
    const actualData = Object.values(currentTickets.tickets);
    setCurrentDataTickets([...actualData.slice(0, countItem + 5)]);
    setCountItem((prev) => prev + 5);
  };

  useEffect(() => {
    if (withoutTransfers) {
      transfersFilter('withoutTransfers');
    }
  }, [stateTransferFilters]);

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
