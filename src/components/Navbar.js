import React, { Component } from "react";
import { addMovieToList, handleMovieSearch } from "../actions";
import { connect } from "react-redux";

class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleAddToMovies = (e, movie) => {
    this.props.dispatch(addMovieToList(movie));

    e.target.parentElement.parentElement.parentElement.parentElement.firstChild.value = '';
  }

  handleSearch = () => {
    const {searchText } = this.state;

    this.props.dispatch(handleMovieSearch(searchText));
    
  }
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
  }
  

    render() {
      const { result: movie, showSearchResult } = this.props.search;
        return (
            <div className="nav">
              <div className="search-container">
                <input onChange={this.handleChange}/>
                <button id="search-btn" onClick={this.handleSearch}>Search</button>

                {showSearchResult &&
                  <div className="search-results">
                    <div className="search-result">
                      <img src={movie.Poster} alt="Search-pic" />

                      <div className="movie-info">
                        <span>{movie.Title}</span>
                        <button onClick={(e) => this.handleAddToMovies(e, movie)}>
                          Add to Movies
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          );   
    }
}

// const  NavbarWrapper = () => {
//   const store = useContext(StoreContext);
//   console.log(store);

//     return(
//           <Navbar dispatch={store.dispatch} search={store.getState().search} />
//     );
// }

function mapStateToProps({ search }){
  return{
    search
  }
}

export default connect(mapStateToProps)(Navbar);