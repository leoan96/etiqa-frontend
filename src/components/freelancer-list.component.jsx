import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UsersApiFactory } from "../client-sdk";

const FreelancerList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [currentFreelancer, setCurrentFreelancer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchFreelancerId, setSearchFreelancerId] = useState("");

  const baseUrl = process.env.REACT_APP_USER_API_BASEURL;
  const userApi = UsersApiFactory(null, baseUrl);

  useEffect(() => {
    retrieveFreelancers();
  }, []);

  const onChangeSearchFreelancerId = (e) => {
    const searchFreelancerId = e.target.value;
    setSearchFreelancerId(searchFreelancerId);
  };

  const retrieveFreelancers = async () => {
    try {
      const response = await userApi.getAllUsers();
      setFreelancers(response.data);
    } catch (err) {
      const errorMessage = err?.response
        ? err.response.data.validationError || err.response.data.message
        : err.message;
      window.alert(errorMessage);
    }
  };

  const setActiveFreelancer = (freelancer, index) => {
    setCurrentFreelancer(freelancer);
    setCurrentIndex(index);
  };

  const findFreelancerById = async () => {
    try {
      const response = await userApi.getUserById(searchFreelancerId);
      setFreelancers([response.data]);
    } catch (err) {
      const errorMessage = err?.response
        ? err.response.data.validationError || err.response.data.message
        : err.message;
      window.alert(errorMessage);
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchFreelancerId}
            onChange={onChangeSearchFreelancerId}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findFreelancerById}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Freelancers List</h4>
        <ul className="list-group">
          {freelancers &&
            freelancers.map((freelancer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFreelancer(freelancer, index)}
                key={index}
              >
                {freelancer.username}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentFreelancer ? (
          <div>
            <h4>Freelancer</h4>
            <div>
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentFreelancer.username}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentFreelancer.email}
            </div>
            <div>
              <label>
                <strong>Phone Number:</strong>
              </label>{" "}
              {currentFreelancer.phoneNumber}
            </div>
            <div>
              <label>
                <strong>Skillsets:</strong>
              </label>{" "}
              {currentFreelancer.skillsets.join(", ")}
            </div>
            <div>
              <label>
                <strong>Hobby:</strong>
              </label>{" "}
              {currentFreelancer.hobby.join(", ")}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentFreelancer.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/freelancers/" + currentFreelancer["_id"]}
              className="badge badge-warning warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Click on a freelancer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerList;
