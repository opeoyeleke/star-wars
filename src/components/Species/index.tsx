import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setSpecies } from "./../../redux/data/data.actions";
import { RootState } from "./../../redux/root-reducer";

interface Props {
  history: any;
  setSpecies: any;
  species: any;
}

const Species: FC<Props> = ({ history, setSpecies, species }) => {
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (!species) {
      fetchSpecies();
    }
    //eslint-disable-next-line
  }, []);

  const fetchSpecies = async () => {
    await instance
      .get(`/species`)
      .then(function (response) {
        setSpecies(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadMore = async (url: string) => {
    const prevList = species?.results;

    await axios
      .get(url)
      .then(function (response) {
        const nextList = prevList.concat(response?.data?.results);

        const updatedData = {
          next: response?.data?.next,
          results: nextList,
        };
        setSpecies(updatedData);
        setLoadingMore(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        {species ? (
          <div className="list-container">
            <div className="title">Species</div>
            <div className="items">
              {
                <List
                  itemLayout="horizontal"
                  dataSource={species.results}
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
              {species?.next ? (
                <div
                  className="more"
                  onClick={() => {
                    setLoadingMore(true);
                    loadMore(species?.next);
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
  species: state.data.species,
});

const mapDispatchToProps = (dispatch: any) => ({
  setSpecies: (species: any) => dispatch(setSpecies(species)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Species)
);
