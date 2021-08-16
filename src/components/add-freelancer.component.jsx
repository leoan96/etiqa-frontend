import React, { useState } from "react";
import { UsersApiFactory } from "../client-sdk";

const AddFreelancer = () => {
  const initialFreelancerState = {
    id: null,
    username: "",
    email: "",
    phoneNumber: "",
    skillsets: "",
    hobby: "",
  };
  const [freelancer, setFreelancer] = useState(initialFreelancerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFreelancer({ ...freelancer, [name]: value });
  };

  const saveFreelancer = async () => {
    const data = {
      username: freelancer.username,
      email: freelancer.email,
      phoneNumber: freelancer.phoneNumber,
      skillsets: freelancer.skillsets.split(","),
      hobby: freelancer.hobby.split(","),
    };

    const baseUrl = process.env.REACT_APP_USER_API_BASEURL;
    console.log(baseUrl);
    const userApi = UsersApiFactory(null, baseUrl);

    try {
      const response = await userApi.registerUser(data);
      setFreelancer({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        skillsets: response.data.skillsets,
        hobby: response.data.hobby,
      });
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err?.response
        ? err.response.data.validationError || err.response.data.message
        : err.message;
      window.alert(errorMessage);
    }
  };

  const newFreelancer = () => {
    setFreelancer(initialFreelancerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFreelancer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={freelancer.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={freelancer.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">phoneNumber</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              required
              value={freelancer.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
            />
          </div>
          <div className="form-group">
            <label htmlFor="skillsets">Skillsets</label>
            <input
              type="text"
              className="form-control"
              id="skillsets"
              required
              value={freelancer.skillsets}
              onChange={handleInputChange}
              name="skillsets"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hobby">Hobby</label>
            <input
              type="text"
              className="form-control"
              id="hobby"
              required
              value={freelancer.hobby}
              onChange={handleInputChange}
              name="hobby"
            />
          </div>

          <button onClick={saveFreelancer} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFreelancer;
