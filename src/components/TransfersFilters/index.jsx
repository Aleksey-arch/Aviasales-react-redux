import classes from './index.module.scss';
import { useSelector } from 'react-redux';

import { useActionsTransferFilters } from '../../hooks/useActionsTransferFilters.js';

function TransfersFilters() {
  const {
    selectedAll,
    withoutTransfers,
    oneTransfers,
    twoTransfers,
    threeTransfers,
  } = useSelector((store) => store.transfersFilters);

  const {
    changeSelectedAll,
    changeWithoutTransfers,
    changeOneTransfers,
    changeTwoTransfers,
    changeThreeTransfers,
  } = useActionsTransferFilters();

  return (
    <>
      <form className={classes.form}>
        <h1 className={classes.heading}>Количество пересадок</h1>
        <label className={classes.checkBoxContainer}>
          <input
            className={classes.checkBoxInput}
            type="checkbox"
            id="selectedAll"
            checked={selectedAll} // Используем checked, а не defaultChecked
            onChange={() => {
              changeSelectedAll();
            }} //Вызов dispatch
          />
          <label htmlFor="selectedAll">Все</label>
        </label>
        <label className={classes.checkBoxContainer}>
          <input
            className={classes.checkBoxInput}
            type="checkbox"
            id="withoutTransfers"
            checked={withoutTransfers}
            onChange={() => {
              changeWithoutTransfers();
            }}
          />
          <label htmlFor="withoutTransfers">Без пересадок</label>
        </label>

        <label className={classes.checkBoxContainer}>
          <input
            className={classes.checkBoxInput}
            type="checkbox"
            id="oneTransfers"
            checked={oneTransfers}
            onChange={() => {
              changeOneTransfers();
            }}
          />
          <label htmlFor="oneTransfers">1 пересадка</label>
        </label>
        <label className={classes.checkBoxContainer}>
          <input
            className={classes.checkBoxInput}
            type="checkbox"
            id="twoTransfers"
            checked={twoTransfers}
            onChange={() => {
              changeTwoTransfers();
            }}
          />
          <label htmlFor="twoTransfers">2 пересадки</label>
        </label>
        <label className={classes.checkBoxContainer}>
          <input
            className={classes.checkBoxInput}
            type="checkbox"
            id="threeTransfers"
            checked={threeTransfers}
            onChange={() => {
              changeThreeTransfers();
            }}
          />
          <label htmlFor="threeTransfers">3 пересадки</label>
        </label>
      </form>
    </>
  );
}

export default TransfersFilters;
