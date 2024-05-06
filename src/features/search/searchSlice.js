import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./searchServices";

const initialState = {
  countries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCountry = createAsyncThunk(
  "search/get-country",
  async (thunkAPI) => {
    try {
      return await searchService.getCountry();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeCountry = createAsyncThunk(
  "search/remove-country",
  async (domainName, thunkAPI) => {
    try {
      return domainName; // Return the domain name of the removed country
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = action.payload;
        state.message = "success";
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        // Load countries object from local storage
        const storedCountries = localStorage.getItem("countries");
        state.countries = storedCountries ? JSON.parse(storedCountries) : [];
      })
      .addCase(removeCountry.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(removeCountry.fulfilled, (state, action) => {
        const domainsToRemove = action.payload;
        state.countries = state.countries.filter(
          (country) =>
            !domainsToRemove.some((domain) => country.domains.includes(domain))
        );
      })
      .addCase(removeCountry.rejected, (state, action) => {
        // Handle rejected state if needed
      });
  },
});

export default searchSlice.reducer;
