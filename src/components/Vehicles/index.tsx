import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setVehicles } from "./../../redux/data/data.actions";
import { RootState } from "./../../redux/root-reducer";

interface Props {
  history: any;
  setVehicles: any;
  vehicles: any;
}

const Vehicles: FC<Props> = ({ history, setVehicles, vehicles }) => {
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (!vehicles) {
      fetchVehiicles();
    }
    //eslint-disable-next-line
  }, []);

  const fetchVehiicles = async () => {
    await instance
      .get(`/vehicles`)
      .then(function (response) {
        setVehicles(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadMore = async (url: string) => {
    const prevList = vehicles?.results;

    await axios
      .get(url)
      .then(function (response) {
        const nextList = prevList.concat(response?.data?.results);

        const updatedData = {
          next: response?.data?.next,
          results: nextList,
        };
        setVehicles(updatedData);
        setLoadingMore(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        {vehicles ? (
          <div className="list-container">
            <div className="title">Vehicles</div>
            <div className="items">
              {
                <List
                  itemLayout="horizontal"
                  dataSource={vehicles.results}
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
              {vehicles?.next ? (
                <div
                  className="more"
                  onClick={() => {
                    setLoadingMore(true);
                    loadMore(vehicles?.next);
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
  vehicles: state.data.vehicles,
});

const mapDispatchToProps = (dispatch: any) => ({
  setVehicles: (vehicles: any) => dispatch(setVehicles(vehicles)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Vehicles)
);
