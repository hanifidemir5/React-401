import React from "react";
import Card from "../Card";
import { Grid } from "@chakra-ui/react";

const Products = (props) => {
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
