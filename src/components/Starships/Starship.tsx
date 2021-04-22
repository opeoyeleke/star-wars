import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { LoadingOutlined } from "@ant-design/icons";
import { format } from "timeago.js";

interface Props {
  match: any;
}

const Starship: FC<Props> = ({ match }) => {
  const [starshipInfo, setStarshipInfo] = useState<any>(null);

  useEffect(() => {
    if (!starshipInfo) {
      fetchStarshipInfo();
    }
    //eslint-disable-next-line
  }, []);

  const fetchStarshipInfo = async () => {
    await instance
      .get(`/starships/${match.params.id}`)
      .then(function (response) {
        setStarshipInfo(response?.data);
        console.log(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      {starshipInfo ? (
        <div className="wrapper">
          <div className="title">{starshipInfo?.name}</div>
          <div className="info">
            <div className="wrapper">
              <div className="item">
                <div className="left">model</div>
                <div className="right">{starshipInfo?.model}</div>
              </div>
              <div className="item">
                <div className="left">manufacturer</div>
                <div className="right">{starshipInfo?.manufacturer}</div>
              </div>
              <div className="item">
                <div className="left">Number of Films</div>
                <div className="right">{starshipInfo?.films.length}</div>
              </div>
              <div className="item">
                <div className="left">cost in credits</div>
                <div className="right">{starshipInfo?.cost_in_credits}</div>
              </div>
              <div className="item">
                <div className="left">length</div>
                <div className="right">{starshipInfo?.length}</div>
              </div>
              <div className="item">
                <div className="left">max speed</div>
                <div className="right">
                  {starshipInfo?.max_atmosphering_speed}
                </div>
              </div>
              <div className="item">
                <div className="left">crew</div>
                <div className="right">{starshipInfo?.crew}</div>
              </div>
              <div className="item">
                <div className="left">passengers</div>
                <div className="right">{starshipInfo?.passengers}</div>
              </div>
              <div className="item">
                <div className="left">cargo capacity</div>
                <div className="right">{starshipInfo?.cargo_capacity}</div>
              </div>
              <div className="item">
                <div className="left">consumables</div>
                <div className="right">{starshipInfo?.consumables}</div>
              </div>
              <div className="item">
                <div className="left">hyperdrive rating</div>
                <div className="right">{starshipInfo?.hyperdrive_rating}</div>
              </div>
              <div className="item">
                <div className="left">MGLT</div>
                <div className="right">{starshipInfo?.MGLT}</div>
              </div>
              <div className="item">
                <div className="left">class</div>
                <div className="right">{starshipInfo?.starship_class}</div>
              </div>
              <div className="item">
                <div className="left">created</div>
                <div className="right">{format(starshipInfo?.created)}</div>
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

export default Starship;
