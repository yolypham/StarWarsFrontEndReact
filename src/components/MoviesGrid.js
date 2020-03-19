import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const apiUrl = "http://localhost:8080/api/";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    border: "1px solid #000",
    height: 232,
    objectFit: "cover",
    width: 160
  },
  favorite: {
    textAlign: "right"
  }
});

export default function MoviesGrid(props) {
  const classes = useStyles();
  const { movie, sortType, user } = props;
  const innitalFavoriteState = movie.favorite_id ? true : false;

  const [favSwitch, setFavSwitch] = useState(innitalFavoriteState);

  const addFavorite = useCallback(() => {
    const favorite = {
      userId: user,
      favorite_imdbID: movie.imdbId
    };
    const addRecord = async () => {
      const apiUrlFavorite = apiUrl + "favorite/add";
      const res = await fetch(apiUrlFavorite, {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favorite)
      });

      const x = await res.json();
      console.log(x);
      movie.favorite_id = x.id;
      setFavSwitch(!favSwitch);
    };
    addRecord();
  }, [favSwitch, movie.id, movie.imdbId]);

  const deleteFavorite = useCallback(() => {
    const deleteRecord = async () => {
      const apiUrlFavoriteGet = apiUrl + "favorite?id=" + movie.favorite_id;
      const apiUrlFavoriteDelete =
        apiUrl + "favorite/remove?id=" + movie.favorite_id;

      const resGet = await fetch(apiUrlFavoriteGet, {
        mode: "cors",
        method: "get"
      });

      if (resGet.ok && resGet.ok === true) {
        const resDel = await fetch(apiUrlFavoriteDelete, {
          mode: "cors",
          method: "delete"
        });
        if (resDel.ok && resDel.ok === true) setFavSwitch(!favSwitch);
      }
    };

    deleteRecord(movie.favorite_id);
  }, [favSwitch, movie.favorite_id]);

  console.log('movie', movie)
  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {sortType === "STORY" ? movie.Story : movie.Machete}: {movie.Title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {movie.Actors}
          </Typography>
          {user}{movie.favorite_id ? movie.favorite_id : 'no fav id'}
          <div className={classes.favorite}>
            {favSwitch === true && "Favorite "}
            <IconButton color="secondary" aria-label="add an alarm">
              {favSwitch === true ? (
                <Favorite onClick={() => deleteFavorite()} />
              ) : (
                <FavoriteBorder onClick={() => addFavorite()} />
              )}
            </IconButton>
          </div>
        </CardContent>
      </div>

      <CardMedia
        className={classes.cardMedia}
        image={movie.coverArtImageUrl}
        title={movie.coverArtImageUrl}
      />
    </Card>
  );
}

MoviesGrid.propTypes = {
  movie: PropTypes.object,
  sortType: PropTypes.string,
  user: PropTypes.string
};
