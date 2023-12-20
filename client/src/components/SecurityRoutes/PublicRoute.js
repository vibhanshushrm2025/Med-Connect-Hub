import axios from "axios";
import { useDispatch } from "react-redux";
import { desetUser } from "../../redux/features/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PublicRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      // dispatch(showLoading());
      const usr = await axios.get(`/api/v1/users/me`, {
        withCredentials: true,
      });
      if (usr.data.success) {
        // dispatch(desetUser());
        // dispatch(hideLoading());
        navigate("/");
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
    getUser();
  }, []);
  return children;
}
