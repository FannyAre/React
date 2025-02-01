import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Meal } from "../types/Types";
import { useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

type Props = {
  meal: Meal;
  loading: boolean;
  k: string;
  openRecipe: () => void;
  addToFavorite: (meal: Meal) => void;
  arrFavoritesMeals: Meal[];
  removeToFavorite: (meal: Meal) => void;
};

function CardMeals({
  meal,
  k,
  openRecipe,
  addToFavorite,
  arrFavoritesMeals,
  removeToFavorite,
}: Props) {
  //para evitar que se vaya a crear en cada renderizado
  const handleAddToFavorite = useCallback(() => {
    addToFavorite(meal);
  }, [meal.idMeal, addToFavorite]);

  const handleRemoveToFavorite = useCallback(() => {
    removeToFavorite(meal);
  }, [meal.idMeal, removeToFavorite]);

  let description = meal.strMeal;
  description =
    description.length > 30 ? description.substring(0, 30) : description;

  const isFav = arrFavoritesMeals ? arrFavoritesMeals.includes(meal) : false;

  return (
    <>
      <Card key={k} size={"sm"} boxShadow="lg" borderColor={"blackAlpha.900"}>
        <CardBody>
          {isFav ? (
            <Box pl="5px" pb="15px">
              <FaStar size="30px" color="blue" />
            </Box>
          ) : (
            <Box pl="5px" pb="15px">
              <CiStar size="30px" color="blue" />
            </Box>
          )}

          <Image
            src={meal.strMealThumb}
            alt={description}
            borderRadius="lg"
          ></Image>

          <Heading size="md" fontSize="sm" color="blue.400">
            {description}
          </Heading>
        </CardBody>

        <CardFooter pt="0">
          <ButtonGroup>
            <Button
              color="white"
              bgColor="blue.400"
              onClick={() => openRecipe()}
              marginRight="4px"
              marginLeft="4px"
            >
              Read recipe
            </Button>

            <Button
              color="white"
              bgColor="blue.400"
              onClick={isFav ? handleRemoveToFavorite : handleAddToFavorite}
              marginRight="50px"
              marginLeft="10px"
            >
              {isFav ? "Remove from favorites" : "Add to Favorite"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
export default CardMeals;
