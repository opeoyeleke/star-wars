import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { LoadingOutlined } from "@ant-design/icons";
import { format } from "timeago.js";

interface Props {
  match: any;
}

const Person: FC<Props> = ({ match }) => {
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    if (!person) {
      fetchProfile();
    }
    //eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    await instance
      .get(`/people/${match.params.id}`)
      .then(function (response) {
        setPerson(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      {person ? (
        <div className="wrapper">
          <div className="title">{person?.name}</div>
          <div className="info">
            <div className="wrapper">
              <div className="item">
                <div className="left">Birth Year</div>
                <div className="right">{person?.birth_year}</div>
              </div>
              <div className="item">
                <div className="left">Eye Color</div>
                <div className="right">{person?.eye_color}</div>
              </div>
              <div className="item">
                <div className="left">Number of Films</div>
                <div className="right">{person?.films.length}</div>
              </div>
              <div className="item">
                <div className="left">gender</div>
                <div className="right">{person?.gender}</div>
              </div>
              <div className="item">
                <div className="left">height</div>
                <div className="right">{person?.height}</div>
              </div>
              <div className="item">
                <div className="left">Skin Color</div>
                <div className="right">{person?.skin_color}</div>
              </div>
              <div className="item">
                <div className="left">created</div>
                <div className="right">{format(person?.created)}</div>
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

export default Person;
