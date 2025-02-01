import { Meal } from "../types/Types";
import { Box, SimpleGrid, SkeletonText, Text } from "@chakra-ui/react";
import CardMeals from "./CardMeals";

type Props = {
  mealsArr: Meal[];
  loading: boolean;
  openRecipe: (meal: Meal) => void;
  addToFavorite: (meal: Meal) => void;
  arrFavoritesMeals: Meal[];
  removeToFavorite: (meal: Meal) => void;
  inFav: boolean | undefined;
};

function MainContent({
  mealsArr,
  loading,
  openRecipe,
  addToFavorite,
  arrFavoritesMeals,
  removeToFavorite,
  inFav,
}: Props) {
  console.log(
    "include",
    mealsArr ? mealsArr.includes(mealsArr[0]) : "indefinido"
  );

  return loading ? (
    <SkeletonText mt="1" noOfLines={8} spacing="6" skeletonHeight="2" />
  ) : mealsArr ? (
    <>
      <SimpleGrid
        columns={inFav ? [2, null, 4] : [2, null, 3]}
        spacing="40px"
        bg="blackAlpha.100"
      >
        {inFav ? (
          arrFavoritesMeals && arrFavoritesMeals.length != 0 ? (
            arrFavoritesMeals.map((afm) => (
              <Box bg="blackAlpha.100" ml="20px" key={afm.idMeal}>
                <CardMeals
                  addToFavorite={addToFavorite}
                  removeToFavorite={removeToFavorite}
                  k={afm.idMeal}
                  openRecipe={() => openRecipe(afm)}
                  meal={afm}
                  loading={loading}
                  arrFavoritesMeals={arrFavoritesMeals}
                ></CardMeals>
              </Box>
            ))
          ) : (
            <Box
              bg="none"
              ml="20px"
              height="600px"
              width="1600px"
              key={"noResult"}
              boxShadow={"lg"}
            >
              No results found
            </Box>
          )
        ) : (
          mealsArr.map((m: Meal) => (
            <Box bg="blackAlpha.100" ml="20px" key={m.idMeal}>
              <CardMeals
                addToFavorite={addToFavorite}
                removeToFavorite={removeToFavorite}
                k={m.idMeal}
                openRecipe={() => openRecipe(m)}
                meal={m}
                loading={loading}
                arrFavoritesMeals={arrFavoritesMeals}
              ></CardMeals>
            </Box>
          ))
        )}
      </SimpleGrid>
    </>
  ) : (
    <Text>No results found </Text>
  );
}

export default MainContent;
