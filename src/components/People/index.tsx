import React, { FC, useState, useEffect } from "react";
import { instance } from "./../../utils/API";
import { List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setPeople } from "./../../redux/data/data.actions";
import { RootState } from "./../../redux/root-reducer";

interface Props {
  history: any;
  setPeople: any;
  people: any;
}

const People: FC<Props> = ({ history, setPeople, people }) => {
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (!people) {
      fetchPeople();
    }
    //eslint-disable-next-line
  }, []);

  const fetchPeople = async () => {
    await instance
      .get(`/people`)
      .then(function (response) {
        setPeople(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadMore = async (url: string) => {
    const prevList = people?.results;

    await axios
      .get(url)
      .then(function (response) {
        const nextList = prevList.concat(response?.data?.results);

        const updatedData = {
          next: response?.data?.next,
          results: nextList,
        };
        setPeople(updatedData);
        setLoadingMore(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        {people ? (
          <div className="list-container">
            <div className="title">People</div>
            <div className="items">
              {
                <List
                  itemLayout="horizontal"
                  dataSource={people.results}
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
              {people?.next ? (
                <div
                  className="more"
                  onClick={() => {
                    setLoadingMore(true);
                    loadMore(people?.next);
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
  people: state.data.people,
});

const mapDispatchToProps = (dispatch: any) => ({
  setPeople: (people: any) => dispatch(setPeople(people)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(People));
