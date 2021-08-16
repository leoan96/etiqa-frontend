import React, { useState, useEffect } from "react";
import { UsersApiFactory } from "../client-sdk";

const Freelancer = (props) => {
  const initialTutorialState = {
    id: null,
    username: "",
    email: "",
    phoneNumber: "",
    skillsets: "",
    hobby: "",
  };
  const [currentFreelancer, setCurrentFreelancer] =
    useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const baseUrl = process.env.REACT_APP_USER_API_BASEURL;
  const userApi = UsersApiFactory(null, baseUrl);

  const getFreelancer = async (id) => {
    try {
      const response = await userApi.getUserById(id);
      setCurrentFreelancer(response.data);
    } catch (err) {
      const errorMessage = err?.response
        ? err.response.data.validationError || err.response.data.message
        : err.message;
      window.alert(errorMessage);
    }
  };

  useEffect(() => {
    getFreelancer(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFreelancer({ ...currentFreelancer, [name]: value });
  };

  const updateFreelancer = async () => {
    const data = {
      username: currentFreelancer.username,
      email: currentFreelancer.email,
      phoneNumber: currentFreelancer.phoneNumber,
      skillsets: Array.isArray(currentFreelancer.skillsets)
        ? currentFreelancer.skillsets
        : currentFreelancer.skillsets.split(","),
      hobby: Array.isArray(currentFreelancer.hobby)
        ? currentFreelancer.hobby
        : currentFreelancer.hobby.split(","),
    };

    try {
      await userApi.updateUser(currentFreelancer["_id"], data);
      setMessage("Freelancer was updated successfully!");
      props.history.push("/freelancers");
    } catch (err) {
      const errorMessage = err?.response
        ? err.response.data.validationError || err.response.data.message
        : err.message;
      window.alert(errorMessage);
    }
  };

  const deleteFreelancer = async () => {
    try {
      await userApi.deleteUser(currentFreelancer["_id"]);
      setMessage("Freelancer was deleted successfully!");
      props.history.push("/freelancers");
    } catch (err) {
      const errorMessage = err?.response
        ? err.response.data.validationError || err.response.data.message
        : err.message;
      window.alert(errorMessage);
    }
  };

  return (
    <div>
      {currentFreelancer ? (
        <div className="edit-form">
          <h4>Freelancer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={currentFreelancer["_id"]}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={currentFreelancer.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentFreelancer.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={currentFreelancer.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skillsets">Skillsets</label>
              <input
                type="text"
                className="form-control"
                id="skillsets"
                name="skillsets"
                value={currentFreelancer.skillsets}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hobby">Hobby</label>
              <input
                type="text"
                className="form-control"
                id="hobby"
                name="hobby"
                value={currentFreelancer.hobby}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button
            type="submit"
            className="badge badge-success update"
            onClick={updateFreelancer}
          >
            Update
          </button>
          <button
            className="badge badge-danger mr-2 delete"
            onClick={deleteFreelancer}
          >
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Click on a freelancer</p>
        </div>
      )}
    </div>
  );
};

export default Freelancer;
