import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProductsThunk = createAsyncThunk('product/get', async () => {
    const res = await axios.get('http://localhost:5000/products')
    return res.data
})
export const postProductsThunk = createAsyncThunk('product/post', async (newProduct) => {
    const res = await axios.post('http://localhost:5000/products', newProduct)
    return res.data
})
export const deleteProductsThunk = createAsyncThunk('product/delete', async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    console.log(id);

    return id;
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        product: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(postProductsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.product.push(action.payload)
            })
            .addCase(deleteProductsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.product = state.product.filter(item => item._id !== action.payload)
            })
    }
})

export default productSlice.reducer