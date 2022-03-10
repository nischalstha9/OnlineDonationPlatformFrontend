import React from "react";
import AxiosInstance from "../AxiosInstance";
import { useDispatch } from "react-redux";
import { set_category } from "../redux/action";

const Categories = () => {
  const dispatch = useDispatch();
  const fetchCategories = () => {
    AxiosInstance.get("donation/category/").then((resp) => {
      let cates = resp.data;
      console.log("FROM COMPONENT");
      dispatch(set_category(cates));
    });
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);
  return "";
};

export default Categories;
