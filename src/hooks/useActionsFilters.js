import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { actions } from '../store/slices/apiGetTickets.slice.js';

export const useActionsFilters = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      tabsSort: (type) => dispatch(actions.tabsSort(type)),
      transfersFilter: (type) => dispatch(actions.transfersFilter(type)),
    }),
    [dispatch],
  );
};
