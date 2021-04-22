import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setStarships } from "./../../redux/data/data.actions";
import { RootState } from "./../../redux/root-reducer";

interface Props {
  history: any;
  setStarships: any;
  starships: any;
}

const Starships: FC<Props> = ({ history, setStarships, starships }) => {
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (!starships) {
      fetchStarships();
    }
    //eslint-disable-next-line
  }, []);

  const fetchStarships = async () => {
    await instance
      .get(`/starships`)
      .then(function (response) {
        setStarships(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadMore = async (url: string) => {
    const prevList = starships?.results;

    await axios
      .get(url)
      .then(function (response) {
        const nextList = prevList.concat(response?.data?.results);

        const updatedData = {
          next: response?.data?.next,
          results: nextList,
        };
        setStarships(updatedData);
        setLoadingMore(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        {starships ? (
          <div className="list-container">
            <div className="title">Starships</div>
            <div className="items">
              {
                <List
                  itemLayout="horizontal"
                  dataSource={starships.results}
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
              {starships?.next ? (
                <div
                  className="more"
                  onClick={() => {
                    setLoadingMore(true);
                    loadMore(starships?.next);
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
  starships: state.data.starships,
});

const mapDispatchToProps = (dispatch: any) => ({
  setStarships: (starships: any) => dispatch(setStarships(starships)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Starships)
);
