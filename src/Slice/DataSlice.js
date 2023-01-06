const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// Here i am fetching all category data ......
export const fetchData = createAsyncThunk(
  "fetchdata/fetch",
  async ({ url, parentId }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appTag: "amazon_sales_channel",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      },
      body: JSON.stringify({
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        user_id: "63329d7f0451c074aa0e15a8",
        selected: parentId,
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      }),
    });
    const data = await res.json();
    return data;
  }
);
// Fetching attributes data.....
export const fetchAttributes = createAsyncThunk(
  "Fetchattribute/fetch",
  async ({ url, payload }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appTag: "amazon_sales_channel",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      },
      body: JSON.stringify({
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        user_id: "63329d7f0451c074aa0e15a8",
        data: {
          ...payload,
        },
        source: {
          marketplace: "amazon",
          shopId: "530",
        },
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      }),
    });
    const attributes = await res.json();

    return attributes;
  }
);
// Reducers .....
const dataSlice = createSlice({
  name: "fetchingData",
  initialState: {
    data: [],
    loader: false,
    attributes: [],
    err: " ",
    showCat: "none"
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loader = true;
      state.showCat = "none"
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loader = false;
      state.showCat = "block"
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.err = "Error in fetching data....:)";
      state.loader = false;
      state.showCat = "none";
    });
    builder.addCase(fetchAttributes.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchAttributes.fulfilled, (state, action) => {
      state.loader = false;
      state.attributes = action.payload;
    });
    builder.addCase(fetchAttributes.rejected, (state) => {
      state.err = "Error in fetching data....:)";
      state.loader = false;
    });
  },
});

export default dataSlice.reducer;
