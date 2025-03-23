import Card from "../../components/Card";
import { Button, Flex, Grid, Box } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../api";
import React from "react";

const Products = () => {
  const { error, data, isFetching, isFetchingNextPage, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.length === 12;
      return morePagesExist ? allPages.length : undefined;
    },
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>An error has occurred: {error.message}</p>;

  return (
    <div>
      <Grid display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"} width={"100%"} gap={8} mt={5}>
        {data?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt={10} justifyContent="center">
        <Button
          isLoading={isFetching || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more" : "Nothing more to load"}
        </Button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </Flex>
    </div>
  );
};

export default Products;
