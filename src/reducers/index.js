import { ADD_TO_FAVOURITE, ADD_MOVIES, REMOVE_FROM_FAVOURITE, SET_SHOW_FAVOURITES } from "../actions";

const initialState = {
    list: [],
    favourites: [],
    showFavourites: false,
}

export default function movies(state = initialState, action){
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     }
    // }
    // return state;
    switch(action.type){
        case ADD_MOVIES:
            return{
                ...state,
                list: action.movies
            }
        case ADD_TO_FAVOURITE:
            return{
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REMOVE_FROM_FAVOURITE:
            const filterdFavourites = state.favourites.filter(
                (movie) => movie.Title !== action.movie.Title
            );
            return{
                ...state,
                favourites: filterdFavourites,
            }
        case SET_SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites: action.val,

            }
        default:
            return state;
    }
}