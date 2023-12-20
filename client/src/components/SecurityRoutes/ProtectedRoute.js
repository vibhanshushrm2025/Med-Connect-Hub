import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { desetUser } from "../../redux/features/auth";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  // if(!user) <Navigate to="/login" />;

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      // dispatch(showLoading());
      const usr = await axios.get(`/api/v1/users/me`, {
        withCredentials: true,
      });
      if (!usr.data.success) {
        dispatch(desetUser());
        // dispatch(hideLoading());
        navigate("/login");
      }
      // dispatch(hideLoading());
    } catch (error) {
      dispatch(desetUser());
      // dispatch(hideLoading());
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(user);
    if (user) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);
  return children;
}
