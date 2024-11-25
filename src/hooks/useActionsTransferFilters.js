import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { actions } from '../store/slices/transferFilters.slice.js';

export const useActionsTransferFilters = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      changeSelectedAll: () => dispatch(actions.changeSelectedAll()),
      changeWithoutTransfers: () => dispatch(actions.changeWithoutTransfers()),
      changeOneTransfers: () => dispatch(actions.changeOneTransfers()),
      changeTwoTransfers: () => dispatch(actions.changeTwoTransfers()),
      changeThreeTransfers: () => dispatch(actions.changeThreeTransfers()),
    }),
    [dispatch],
  );
};
