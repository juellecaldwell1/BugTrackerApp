import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Popup } from "reactjs-popup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "../Profile/profile.css";
import LoggedInRightNow from "../whosLoggedIn.jsx";
const ChangeProfileInfo = () => {
  const { user1, error } = LoggedInRightNow();
  const [me, setMe] = useState(user1);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user1) {
      setMe(user1);
    }
  }, [user1]);

  const dataToSend = {...me};

  if(password.trim()){
    dataToSend.password = password;
  }

  // console.log("The profile stuff is: ", user)
  const updateMe = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/user/me",
        dataToSend,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        console.log("The response data is: ", response.data);
        console.log("The data send: ", dataToSend);
        console.log("This is the new and improved password: ", password)
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  const handleUpdateValue = (e) => {
    setMe({
      ...me,
      [e.target.name]: e.target.value,
    });
  };
  console.log("This is the me in mi, " , user1)
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
             <span className="font-weight-bold">{user1.givenName}</span> 
             <span className="text-black-50">{user1.email}</span> 
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div> 
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Given Name:</label>
                <input
                  type="text"
                  name="givenName"
                  className="form-control"
                  placeholder="Change your first name here"
                  value={me.givenName}
                  onChange={handleUpdateValue}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Family Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="familyName"
                  value={me.familyName}
                  placeholder="Change your last name here"
                  onChange={handleUpdateValue}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Change your Full name here"
                  value={me.fullName}
                  onChange={handleUpdateValue}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Change your Email here"
                  value={me.email}
                  onChange={handleUpdateValue}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Role</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  placeholder="You may not change your role with permission"
                  value={user1.role}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Reset Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="reset password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={() => {
                  updateMe();
                }}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeProfileInfo;
