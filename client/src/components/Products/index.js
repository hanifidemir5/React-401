import React, { useEffect } from "react";
import Card from "../Card";
import { Grid } from "@chakra-ui/react";
// import { useQuery } from "react-query";

const Products = (props) => {
  // const {isLoading, error, data} = useQuery("respoData",() => {
  //   fetch("http//localhost:5000/product").then((res) => res.json())
  // })

  return (
    <div>
      <Grid templateColumns={"repeat(3,1fr)"} gap={4}>
        <Card />
        <Card />
        <Card />
      </Grid>
    </div>
  );
};

export default Products;
