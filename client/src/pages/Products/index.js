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
      return morePagesExist ? allPages.length + 1 : undefined;
    },
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>An error has occurred: {error.message}</p>;

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
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
