import { combineReducers } from "redux";
import { ADD_TO_FAVOURITE, ADD_MOVIES, REMOVE_FROM_FAVOURITE, SET_SHOW_FAVOURITES, ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT } from "../actions";

const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites: false,
}

export function movies(state = initialMoviesState, action){
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     }
    // }
    // return state;
    //console.log('MOVIES REDUCER');
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

            };
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                list: [action.movie, ...state.list]
            };
        default:
            return state;
    }
}

const initialSearchState = {
    result: {},
    showSearchResult: false,
};

export function search(state = initialSearchState, action){
    //console.log('SEARCH REDUCER');
    switch(action.type){
        case ADD_SEARCH_RESULT:
            return{
                ...state,
                result: action.movie,
                showSearchResult: true,
            }
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                showSearchResult: false,
            };
        default:
            return state;
    }
}

// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState
// }

// export default function rootReducer(state = initialRootState, action){
//     return{
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

export default combineReducers({
    movies,
    search
})