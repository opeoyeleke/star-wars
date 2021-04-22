import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { LoadingOutlined } from "@ant-design/icons";
import { format } from "timeago.js";

interface FilmItemProps {
  match: any;
}

const FilmItem: FC<FilmItemProps> = ({ match }) => {
  const [filmItem, setFilmItem] = useState<any>(null);

  useEffect(() => {
    if (!filmItem) {
      fetchFilmItem();
    }
    //eslint-disable-next-line
  }, []);

  const fetchFilmItem = async () => {
    await instance
      .get(`/films/${match.params.id}`)
      .then(function (response) {
        setFilmItem(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      {filmItem ? (
        <div className="wrapper">
          <div className="title">{filmItem?.title}</div>
          <div className="info">
            <div className="wrapper">
              <div className="item">
                <div className="left">Created</div>
                <div className="right">{format(filmItem?.created)}</div>
              </div>
              <div className="item">
                <div className="left">producer</div>
                <div className="right">{filmItem?.producer}</div>
              </div>
              <div className="item">
                <div className="left">Release Date</div>
                <div className="right">{filmItem?.release_date}</div>
              </div>
              <div className="item">
                <div className="left">director</div>
                <div className="right">{filmItem?.director}</div>
              </div>
              <div className="item">
                <div className="left">Opening Crawl</div>
                <div className="right">{filmItem?.opening_crawl}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="waiting">
          <LoadingOutlined className="custom-icon" />
        </div>
      )}
    </div>
  );
};

export default FilmItem;
