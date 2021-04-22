import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { LoadingOutlined } from "@ant-design/icons";
import { format } from "timeago.js";

interface Props {
  match: any;
}

const Specie: FC<Props> = ({ match }) => {
  const [specieInfo, setSpecieInfo] = useState<any>(null);

  useEffect(() => {
    if (!specieInfo) {
      fetchSpecieInfo();
    }
    //eslint-disable-next-line
  }, []);

  const fetchSpecieInfo = async () => {
    await instance
      .get(`/species/${match.params.id}`)
      .then(function (response) {
        setSpecieInfo(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      {specieInfo ? (
        <div className="wrapper">
          <div className="title">{specieInfo?.name}</div>
          <div className="info">
            <div className="wrapper">
              <div className="item">
                <div className="left">classification</div>
                <div className="right">{specieInfo?.classification}</div>
              </div>
              <div className="item">
                <div className="left">designation</div>
                <div className="right">{specieInfo?.designation}</div>
              </div>
              <div className="item">
                <div className="left">Number of Films</div>
                <div className="right">{specieInfo?.films.length}</div>
              </div>
              <div className="item">
                <div className="left">average height</div>
                <div className="right">{specieInfo?.average_height}</div>
              </div>
              <div className="item">
                <div className="left">skin colors</div>
                <div className="right">{specieInfo?.skin_colors}</div>
              </div>
              <div className="item">
                <div className="left">hair colors</div>
                <div className="right">{specieInfo?.hair_colors}</div>
              </div>
              <div className="item">
                <div className="left">eye colors</div>
                <div className="right">{specieInfo?.eye_colors}</div>
              </div>
              <div className="item">
                <div className="left">average lifespan</div>
                <div className="right">{specieInfo?.average_lifespan}</div>
              </div>
              <div className="item">
                <div className="left">language</div>
                <div className="right">{specieInfo?.language}</div>
              </div>
              <div className="item">
                <div className="left">created</div>
                <div className="right">{format(specieInfo?.created)}</div>
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

export default Specie;
