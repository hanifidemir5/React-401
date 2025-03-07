import Card from "../../components/Card";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchProductList } from "../../api";

const Products = (props) => {
  const { isLoading, error, data } = useQuery("products", fetchProductList);

  if (isLoading) return "Loading...";
  if (error) return "An error has occured:" + error.message;

  return (
    <div>
      <Grid templateColumns={"repeat(3,1fr)"} gap={4}>
        {data && data.map((item, key) => <Card item={item} key={key} />)}
      </Grid>
    </div>
  );
};

export default Products;
