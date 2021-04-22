import React, { FC, useEffect } from "react";
import { instance } from "./../../utils/API";
import { List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./films.scss";
import { setFilms } from "./../../redux/data/data.actions";
import { RootState } from "./../../redux/root-reducer";

interface Props {
  history: any;
  setFilms: any;
  films: any;
}

const Films: FC<Props> = ({ history, setFilms, films }) => {
  useEffect(() => {
    if (!films) {
      fetchFilms();
    }
    //eslint-disable-next-line
  }, []);

  const fetchFilms = async () => {
    await instance
      .get(`/films`)
      .then(function (response) {
        setFilms(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        {films ? (
          <div className="list-container">
            <div className="title">Films</div>
            <div className="items">
              {
                <List
                  itemLayout="horizontal"
                  dataSource={films.results}
                  renderItem={(item: any) => (
                    <List.Item
                      actions={[
                        <div
                          style={{ color: "#702750" }}
                          className="name custom"
                          onClick={() => {
                            if (item?.url.includes("https")) {
                              history.push(
                                item?.url.replace("https://swapi.dev/api", "")
                              );
                            } else {
                              history.push(
                                item?.url.replace("http://swapi.dev/api", "")
                              );
                            }
                          }}
                        >
                          View
                        </div>,
                      ]}
                    >
                      <List.Item.Meta description={item?.title} />
                    </List.Item>
                  )}
                />
              }
            </div>
          </div>
        ) : (
          <div className="waiting">
            <LoadingOutlined className="custom-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  films: state.data.films,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFilms: (films: any) => dispatch(setFilms(films)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Films));
