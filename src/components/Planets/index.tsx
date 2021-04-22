import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setPlanets } from "./../../redux/data/data.actions";
import { RootState } from "./../../redux/root-reducer";

interface Props {
  history: any;
  setPlanets: any;
  planets: any;
}

const Planets: FC<Props> = ({ history, setPlanets, planets }) => {
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (!planets) {
      fetchPlanets();
    }
    //eslint-disable-next-line
  }, []);

  const fetchPlanets = async () => {
    await instance
      .get(`/planets`)
      .then(function (response) {
        setPlanets(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadMore = async (url: string) => {
    const prevList = planets?.results;

    await axios
      .get(url)
      .then(function (response) {
        const nextList = prevList.concat(response?.data?.results);

        const updatedData = {
          next: response?.data?.next,
          results: nextList,
        };
        setPlanets(updatedData);
        setLoadingMore(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        {planets ? (
          <div className="list-container">
            <div className="title">Planets</div>
            <div className="items">
              {
                <List
                  itemLayout="horizontal"
                  dataSource={planets.results}
                  renderItem={(item: any) => (
                    <List.Item
                      actions={[
                        <div
                          style={{ color: "#702758" }}
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
                      <List.Item.Meta description={item?.name} />
                    </List.Item>
                  )}
                />
              }
              {planets?.next ? (
                <div
                  className="more"
                  onClick={() => {
                    setLoadingMore(true);
                    loadMore(planets?.next);
                  }}
                >
                  {loadingMore ? <LoadingOutlined /> : "Load more"}
                </div>
              ) : null}
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
  planets: state.data.planets,
});

const mapDispatchToProps = (dispatch: any) => ({
  setPlanets: (planets: any) => dispatch(setPlanets(planets)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Planets)
);
