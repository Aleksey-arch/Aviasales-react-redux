import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAll: true,
  withoutTransfers: true,
  oneTransfers: true,
  twoTransfers: true,
  threeTransfers: true,
  errorTransfers: null,
};

const filterIfAll = (state) => {
  if (
    state.withoutTransfers === true &&
    state.oneTransfers === true &&
    state.twoTransfers === true &&
    state.threeTransfers === true
  ) {
    state.selectedAll = true;
  }
};

const filter = (state) => {
  if (
    state.selectedAll === false &&
    state.withoutTransfers === false &&
    state.oneTransfers === false &&
    state.twoTransfers === false &&
    state.threeTransfers === false
  ) {
    return (state.errorTransfers = true);
  } else {
    return (state.errorTransfers = null);
  }
};

export const transferFiltersSlice = createSlice({
  name: 'transfersFilters',
  initialState,
  reducers: {
    changeSelectedAll: (state) => {
      state.selectedAll = !state.selectedAll;
      state.withoutTransfers = state.selectedAll;
      state.oneTransfers = state.selectedAll;
      state.twoTransfers = state.selectedAll;
      state.threeTransfers = state.selectedAll;
      filter(state);
    },
    changeWithoutTransfers: (state) => {
      state.withoutTransfers = !state.withoutTransfers;
      state.selectedAll = false;
      filterIfAll(state);
      filter(state);
    },
    changeOneTransfers: (state) => {
      state.oneTransfers = !state.oneTransfers;
      state.selectedAll = false;
      filterIfAll(state);
      filter(state);
    },
    changeTwoTransfers: (state) => {
      state.twoTransfers = !state.twoTransfers;
      state.selectedAll = false;
      filterIfAll(state);
      filter(state);
    },
    changeThreeTransfers: (state) => {
      state.threeTransfers = !state.threeTransfers;
      state.selectedAll = false;
      filterIfAll(state);
      filter(state);
    },
  },
});
export const { actions, reducer } = transferFiltersSlice;
