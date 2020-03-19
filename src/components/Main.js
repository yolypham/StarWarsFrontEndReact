import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import IOSSwich from "./IOSSwitch";
import MoviesGrid from "./MoviesGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Color, Height } from "../styles/config";

const apiUrl = "http://localhost:8080/api/";

const Root = styled.div`
  height: calc(100vh - ${Height.siteHeader} - ${Height.siteFooter});
  overflow: auto;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SortSection = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  padding-top: 15px;
  text-align: center;
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SwitchLabel = styled.div`
  min-width: 75px;
  max-width: 75px;
  text-align: ${props => props.align};
`;

const MoviesWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-flow: column;
  padding: 10px 150px 10px 150px;
  max-width: 700px;
`;

const MovieWrapper = styled.div`
  padding: 10px;
`;

const SpinnerWrapper = styled.div`
  color: ${Color.spinner};
  height: calc(
    100vh - ${Height.siteHeader} - ${Height.siteFooter} - ${Height.sortSwitch}
  );
  justify-content: center;
  display: flex;
  align-items: center;
`;

function prepareData(moviesData, userFavorites) {
  if (userFavorites.length < 1) return moviesData;

  let data = [];
  moviesData.map(m => {
    const favorite = userFavorites.filter(f => f.favorite_imdbID === m.imdbId);
    if (favorite.length > 0) {
      m.favorite_id = favorite[0].id;
    }
    data.push(m);
  });
  return data;
}

const Main = props => {
  const [moviesData, setMoviesData] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultSort, setDefaultSort] = useState(true);
  const [user, setUser] = useState("");

  const handleChange = useCallback(e => {
    setDefaultSort(e.target.checked);
  }, []);

  const getMovies = async () => {
    const apiUrlMovie =
      apiUrl + "movie?sortBy=" + (defaultSort ? "STORY" : "MACHETE");
    const res = await fetch(apiUrlMovie, { mode: "cors" });
    const json = await res.json();
    setMoviesData(json);
  };

  const getFavoritesByUser = async guest => {
    const apiUrlFavorite = apiUrl + "favorite/user?userId=" + guest;
    const res = await fetch(apiUrlFavorite, { mode: "cors" });
    const json = await res.json();
    setUserFavorites(json);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([getMovies(), getFavoritesByUser(userid)]);
      setLoading(false);
    };

    const userid = sessionStorage.getItem("userid");
    setUser(userid);
    loadData();
  }, [defaultSort, user]);

  if (moviesData.length > 0) prepareData(moviesData, userFavorites);

  return (
    <Root>
      <Content>
        <SortSection>
          <div>Sort by:</div>
          <SwitchWrapper>
            <SwitchLabel align="right">Macheta</SwitchLabel>
            <IOSSwich
              checked={defaultSort}
              onChange={e => handleChange(e)}
              value={defaultSort}
            />
            <SwitchLabel align="left">Story</SwitchLabel>
          </SwitchWrapper>
        </SortSection>

        {loading ? (
          <SpinnerWrapper>
            <CircularProgress
              variant="indeterminate"
              color="inherit"
              size={60}
              thickness={2}
            />
          </SpinnerWrapper>
        ) : (
          <MoviesWrapper>
            {moviesData.map((m, index) => (
              <MovieWrapper>
                <MoviesGrid
                  key={m.imdbId}
                  movie={m}
                  sortType={defaultSort === true ? "STORY" : "MACHETE"}
                  user={user}
                />
              </MovieWrapper>
            ))}
          </MoviesWrapper>
        )}
      </Content>
    </Root>
  );
};

export default Main;
