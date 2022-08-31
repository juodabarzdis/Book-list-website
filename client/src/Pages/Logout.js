import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Logout = (props) => {
  const { setLoggedIn } = props;

  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  useEffect(() => {
    Axios.get("/api/users/logout", {
      withCredentials: true,
    })
      .then((res) => {
        localStorage.clear();
        setLoggedIn(false);
        setAlert(res.data);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error) => {
        setAlert(error.response.data);
        setTimeout(() => navigate("/"), 1000);
      });
  }, [navigate]);

  return (
    alert && (
      <div className="profile-wrapper">
        <div>{alert}</div>
      </div>
    )
  );
};

export default Logout;
