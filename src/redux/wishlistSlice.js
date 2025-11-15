import { createSlice } from '@reduxjs/toolkit'

const storedWishlist = localStorage.getItem("wishlist");

const initialState = {
    items: storedWishlist ? JSON.parse(storedWishlist) : [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {

        addMovieToWishlist: (state, action) => {
            const movie = action.payload;
            const index = state.items.findIndex(item => item.id === movie.id);

            if (index >= 0) {
                state.items.splice(index, 1);
                localStorage.setItem("wishlist", JSON.stringify(state.items));

            }
            else {
                state.items.push(movie);
                localStorage.setItem("wishlist", JSON.stringify(state.items));
            }
        },

    },
});

export const { addMovieToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

