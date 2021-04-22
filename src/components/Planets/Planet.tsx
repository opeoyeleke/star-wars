import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { LoadingOutlined } from "@ant-design/icons";
import { format } from "timeago.js";

interface Props {
  match: any;
}

const Planet: FC<Props> = ({ match }) => {
  const [planetInfo, setPlanetInfo] = useState<any>(null);

  useEffect(() => {
    if (!planetInfo) {
      fetchPlanetInfo();
    }
    //eslint-disable-next-line
  }, []);

  const fetchPlanetInfo = async () => {
    await instance
      .get(`/planets/${match.params.id}`)
      .then(function (response) {
        setPlanetInfo(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      {planetInfo ? (
        <div className="wrapper">
          <div className="title">{planetInfo?.name}</div>
          <div className="info">
            <div className="wrapper">
              <div className="item">
                <div className="left">Rotation Period</div>
                <div className="right">{planetInfo?.rotation_period}</div>
              </div>
              <div className="item">
                <div className="left">Orbital Period</div>
                <div className="right">{planetInfo?.orbital_period}</div>
              </div>
              <div className="item">
                <div className="left">Diameter</div>
                <div className="right">{planetInfo?.diameter}</div>
              </div>
              <div className="item">
                <div className="left">climate</div>
                <div className="right">{planetInfo?.climate}</div>
              </div>
              <div className="item">
                <div className="left">gravity</div>
                <div className="right">{planetInfo?.gravity}</div>
              </div>
              <div className="item">
                <div className="left">terrain</div>
                <div className="right">{planetInfo?.terrain}</div>
              </div>
              <div className="item">
                <div className="left">surface water</div>
                <div className="right">{planetInfo?.surface_water}</div>
              </div>
              <div className="item">
                <div className="left">population</div>
                <div className="right">{planetInfo?.population}</div>
              </div>
              <div className="item">
                <div className="left">created</div>
                <div className="right">{format(planetInfo?.created)}</div>
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

export default Planet;
