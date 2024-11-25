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
    // ticketsWithoutTransfers: [],
    status: null,
    error: null,
    loading: false,
  },
  reducers: {
    transfersFilter: (state, action) => {
      if (action.payload === 'withoutTransfers') {
        // console.log(state.currentTickets.tickets);
        // return state;
        // const newStateWithoutTransfers = [
        //   ...state.currentTickets.tickets,
        // ].filter(
        //   (item) =>
        //     item.segments[0].stops.length === 0 &&
        //     item.segments[1].stops.length === 0,
        // );
        // // console.log(state.tickets.tickets[0]);
        // return {
        //   ...state,
        //   currentTickets: {
        //     ...state.currentTickets,
        //     // tickets: newStateWithoutTransfers,
        //   },
        // };
      }
    },
    tabsSort: (state, action) => {
      const type = action.payload;

      if (state.currentTickets && state.currentTickets.tickets) {
        const sortedTickets = [...state.currentTickets.tickets].sort((a, b) => {
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
          currentTickets: {
            ...state.currentTickets,
            tickets: sortedTickets,
          },
        };
      }
      return state;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = 'resolved getTickets';
        state.loading = false;
        state.tickets = action.payload;
        state.currentTickets = action.payload;
        state.error = null;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.status = 'rejected getTickets';
        state.loading = false;
        state.error = true;
      });
  },
});

export const { actions, reducer } = apiGetTicketsSlice;
