import React from "react";
import AxiosInstance from "../AxiosInstance";
import { useDispatch } from "react-redux";
import { set_category, set_home_meta, insert_user } from "../redux/action";

const Categories = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const fetchCategories = () => {
    AxiosInstance.get("donation/home-meta/").then((resp) => {
      let meta_data = resp.data;
      dispatch(set_home_meta(meta_data));
      dispatch(set_category(meta_data.all_categories));
    });
  };
  const fetchUser = () => {
    AxiosInstance.get("auth/user/").then((resp) => {
      let user = resp.data;
      dispatch(insert_user(user));
    });
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);
  return "";
};

export default Categories;
