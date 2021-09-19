import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface ILocationsData {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ILocation[];
}

interface ILocationsState {
  isLoading: boolean;
  locationsData: ILocationsData;
  error: string | null;
}

interface IFetchCharactersParametr {
  page: number;
  name: string;
  type: string;
  dimention: string;
}

const initialState: ILocationsState = {
  isLoading: false,
  locationsData: {
    info: {
      count: 1,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [],
  },
  error: null,
};

const locationsSlice = createSlice({
  name: "locationsData",
  initialState,
  reducers: {
    fetchLocations: (
      state: ILocationsState,
      action: PayloadAction<IFetchCharactersParametr>
    ) => {
      state.isLoading = true;
    },
    fetchLocationsSuccess: (
      state: ILocationsState,
      action: PayloadAction<ILocationsData>
    ) => {
      state.isLoading = false;
      state.locationsData = action.payload;
    },
    fetchLocationsError: (
      state: ILocationsState,
      action: PayloadAction<string | null>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default locationsSlice.reducer;

export const { fetchLocations, fetchLocationsError, fetchLocationsSuccess } =
  locationsSlice.actions;
