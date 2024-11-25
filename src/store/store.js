import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { transferFiltersSlice } from './slices/transferFilters.slice.js';
import { apiGetTicketsSlice } from './slices/apiGetTickets.slice.js';

export const rootReducer = combineSlices({
  transfersFilters: transferFiltersSlice.reducer,
  getTickets: apiGetTicketsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
