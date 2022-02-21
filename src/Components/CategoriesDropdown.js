import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AxiosInstance from "../AxiosInstance";

export default function CategoriesDropdown({ setCategoryFilter }) {
  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  function filter_by_category(query) {
    setCategory(query);
    setCategoryFilter(query);
  }

  const handleChange = (event) => {
    filter_by_category(event.target.value);
  };

  useEffect(() => {
    AxiosInstance.get("/donation/category/")
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="categoryLabel">Category</InputLabel>
        <Select
          labelId="categoryLabel"
          id="category"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={0}>----</MenuItem>;
          {categories.map((category) => {
            return <MenuItem value={category.id}>{category.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
