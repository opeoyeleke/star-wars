import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { LoadingOutlined } from "@ant-design/icons";
import { format } from "timeago.js";

interface Props {
  match: any;
}

const Vehicle: FC<Props> = ({ match }) => {
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);

  useEffect(() => {
    if (!vehicleInfo) {
      fetchVehicleInfo();
    }
    //eslint-disable-next-line
  }, []);

  const fetchVehicleInfo = async () => {
    await instance
      .get(`/vehicles/${match.params.id}`)
      .then(function (response) {
        setVehicleInfo(response?.data);
        console.log(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      {vehicleInfo ? (
        <div className="wrapper">
          <div className="title">{vehicleInfo?.name}</div>
          <div className="info">
            <div className="wrapper">
              <div className="item">
                <div className="left">model</div>
                <div className="right">{vehicleInfo?.model}</div>
              </div>
              <div className="item">
                <div className="left">manufacturer</div>
                <div className="right">{vehicleInfo?.manufacturer}</div>
              </div>
              <div className="item">
                <div className="left">Number of Films</div>
                <div className="right">{vehicleInfo?.films.length}</div>
              </div>
              <div className="item">
                <div className="left">cost in credits</div>
                <div className="right">{vehicleInfo?.cost_in_credits}</div>
              </div>
              <div className="item">
                <div className="left">length</div>
                <div className="right">{vehicleInfo?.length}</div>
              </div>
              <div className="item">
                <div className="left">max speed</div>
                <div className="right">
                  {vehicleInfo?.max_atmosphering_speed}
                </div>
              </div>
              <div className="item">
                <div className="left">crew</div>
                <div className="right">{vehicleInfo?.crew}</div>
              </div>
              <div className="item">
                <div className="left">passengers</div>
                <div className="right">{vehicleInfo?.passengers}</div>
              </div>
              <div className="item">
                <div className="left">cargo capacity</div>
                <div className="right">{vehicleInfo?.cargo_capacity}</div>
              </div>
              <div className="item">
                <div className="left">consumables</div>
                <div className="right">{vehicleInfo?.consumables}</div>
              </div>
              <div className="item">
                <div className="left">class</div>
                <div className="right">{vehicleInfo?.vehicle_class}</div>
              </div>
              <div className="item">
                <div className="left">created</div>
                <div className="right">{format(vehicleInfo?.created)}</div>
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

export default Vehicle;
