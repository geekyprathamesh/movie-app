import React from "react";
import { addFavourite, removeFromFavourite } from "../actions";

class MovieCard extends React.Component {
    handleFavouriteClick = () => {
      const {movie} = this.props;
      this.props.dispatch(addFavourite(movie));
    }

    handleUnfavouriteClick = () => {
      const {movie} = this.props;
      this.props.dispatch(removeFromFavourite(movie))
    }
    render() {
        const { movie } = this.props;
        return (
            <div className="movie-card">
              <div className="left">
                <img 
                    alt="Movie Poster"
                    src={movie.Poster}
                />
              </div>
              <div className="right">
                <div className="title">{movie.Title}</div>
                <div className="plot">{movie.Plot}</div>

                <div className="footer">
                    <div className="rating">{movie.imdbRating}</div>
                    {
                      this.props.isMovieFavourite 
                      ? <button className="unfavourite-btn" onClick={this.handleUnfavouriteClick}>Unfavourite</button>
                      :  <button className="favourite-btn" onClick={this.handleFavouriteClick}>Favourite</button> 
                    }
                </div>
              </div>
            </div>
          );   
    }
}

export default MovieCard;