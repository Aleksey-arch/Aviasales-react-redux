import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSearchId = createAsyncThunk(
  'getSearchId',
  async (_, { RejectWithValue }) => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/search`,
      );

      if (!response.ok) {
        console.log(`Error while getSearchId! getSearchId`);
      }

      return await response.json();
    } catch (r) {
      return RejectWithValue(r.message);
    }
  },
);

export const getTickets = createAsyncThunk(
  'getTickets',
  async (searchId, { RejectWithValue }) => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
      );

      if (!response.ok) {
        console.log(`Error while getTickets!`);
      }

      return await response.json();
    } catch (r) {
      return RejectWithValue(r.message);
    }
  },
);

export const apiGetTicketsSlice = createSlice({
  name: 'apiGetTicketsSlice',
  initialState: {
    searchId: null,
    tickets: [],
    currentTickets: [],
    status: null,
    error: null,
    loading: false,
    stopFetch: null,
    conditionFilters: false,
    loadingFetchListTickets: false,
  },
  reducers: {
    transfersFilter: (state, action) => {
      if (action.payload.length !== 0) {
        if (action.payload.includes('selectedAll') === true) {
          const newStateWithoutTransfers = [...state.tickets];

          return {
            ...state,
            currentTickets: [...newStateWithoutTransfers],
          };
        } else {
          const arrResults = [];
          action.payload.forEach((item) => {
            if (item === 'withoutTransfers') {
              const newStateWithoutTransfers = [...state.tickets].filter(
                (item) =>
                  item.segments[0].stops.length === 0 &&
                  item.segments[1].stops.length === 0,
              );

              arrResults.push(...newStateWithoutTransfers);
            }
            if (item === 'oneTransfers') {
              const newStateWithoutTransfers = [...state.tickets].filter(
                (item) =>
                  item.segments[0].stops.length === 1 &&
                  item.segments[1].stops.length === 1,
              );

              arrResults.push(...newStateWithoutTransfers);
            }
            if (item === 'twoTransfers') {
              const newStateWithoutTransfers = [...state.tickets].filter(
                (item) =>
                  item.segments[0].stops.length === 2 &&
                  item.segments[1].stops.length === 2,
              );

              arrResults.push(...newStateWithoutTransfers);
            }
            if (item === 'threeTransfers') {
              const newStateWithoutTransfers = [...state.tickets].filter(
                (item) =>
                  item.segments[0].stops.length === 3 &&
                  item.segments[1].stops.length === 3,
              );

              arrResults.push(...newStateWithoutTransfers);
            }
          });
          return {
            ...state,
            currentTickets: [...arrResults],
            conditionFilters: !state.conditionFilters,
          };
        }
      }
    },
    tabsSort: (state, action) => {
      const type = action.payload;

      if (state.currentTickets) {
        const sortedTickets = [...state.currentTickets].sort((a, b) => {
          switch (type) {
            case 'btnLowCost':
              return a.price - b.price;
            case 'btnFasts': {
              const totalDurationA = a.segments.reduce(
                (sum, segment) => sum + segment.duration,
                0,
              );
              const totalDurationB = b.segments.reduce(
                (sum, segment) => sum + segment.duration,
                0,
              );
              return totalDurationA - totalDurationB;
            }
            case 'btnOptimal':
              return b.price - a.price;
            default:
              return state;
          }
        });

        return {
          ...state,
          currentTickets: [...sortedTickets],
          conditionFilters: !state.conditionFilters,
        };
      }
      return state;
    },
    loadingFetchList: (state, action) => {
      state.loadingFetchListTickets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state, action) => {
        state.status = 'index getSearchId';
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.status = 'resolved getSearchId';
        state.loading = true;
        state.searchId = action.payload.searchId;
        state.error = null;
      })
      .addCase(getSearchId.rejected, (state, action) => {
        state.status = 'rejected getSearchId';
        state.loading = true;
        state.error = true;
      })

      .addCase(getTickets.pending, (state, action) => {
        state.status = 'index getTickets';
        state.loading = false;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = 'resolved getTickets';
        state.loading = false;
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.currentTickets = [
          ...state.currentTickets,
          ...action.payload.tickets,
        ];
        state.error = null;
        state.stopFetch = action.payload.stop;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.status = 'rejected getTickets';
        state.loading = false;
        state.error = null;
      });
  },
});

export const { actions, reducer } = apiGetTicketsSlice;
