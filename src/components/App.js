import React from "react";
import { data } from "../data";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import Navbar from "./Navbar";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount(){
    
    //make a api call
    //dispatch action
    this.props.dispatch(addMovies(data));

    //console.log('STATE', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      //movie found
      return true;
    }
    return false;
  }

  onChangeTab = (value) => {
    this.props.dispatch(setShowFavourites(value));
  }

  render() {
    const { movies, search } = this.props; //{movies:{} , search{}}
    const { list, favourites, showFavourites } = movies;
    //console.log('RENDER', this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search}/>
        <div className="main">
          <div className="tabs">
            <div 
              className={`tab ${showFavourites ? '' : 'active-tabs'}`} 
              onClick={() => this.onChangeTab(false)}>
              Movies
            </div>
            <div 
              className={`tab ${showFavourites ? 'active-tabs' : ''}`} 
              onClick={() => this.onChangeTab(true)}>
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movie-${index}`} 
                dispatch={this.props.dispatch}
                isMovieFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No Movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return(
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps (state){
  return{
    movies: state.movies,
    search: state.search
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
