import Card from "../../components/Card";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";
import React from "react";
import { Box } from "@chakra-ui/react";

const Products = (props) => {
  const { error, data, isFetching, isFetchingNextPage, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "products",
    fetchProductList,
    {
      getNextPageParam: (lastGroup, allGroups) => {
        const morePagesExist = lastGroup?.length === 12;
        if (!morePagesExist) {
          return;
        }
        return allGroups.length + 0;
      },
    }
  );

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occured:" + error.message;
  console.log(data);

  return (
    <div>
      <Grid templateColumns={"repeat(3,1fr)"} gap={4}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt={"10"} justifyContent={"center"}>
        <Button
          loading={isFetching || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "loading more" : hasNextPage ? "Load more" : "Nothing more to load"}
        </Button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching" : null}</div>
      </Flex>
    </div>
  );
};

export default Products;
