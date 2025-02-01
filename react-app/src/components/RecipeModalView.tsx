import {
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Image,
  Heading,
  Text,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { MealDetails } from "../types/Types";

type Props = {
  data: MealDetails;
};

const listIngredients = (data: MealDetails) => {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingridient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`]; //medidas

    if (ingridient && measure) {
      ingredients.push(`${ingridient} - ${measure}`);
    }
  }
  return ingredients;
};

const RecipeModalView = ({ data }: Props) => {
  const ingrediens = listIngredients(data);
  return (
    <>
      <ModalHeader>{data.strMeal}</ModalHeader>
      <ModalCloseButton></ModalCloseButton>
      <ModalBody>
        <Image
          src={data.strMealThumb}
          width="100%"
          borderRadius="lg"
          alt={data.strMeal}
        />
        <Heading mt="4" mb="4" size="md">
          Ingredients
        </Heading>
        <OrderedList>
          {ingrediens.map((i) => (
            <ListItem key={i}>{i}</ListItem>
          ))}
        </OrderedList>
        <Text whiteSpace="pre-line" mt="4">
          {data.strInstructions}
        </Text>
      </ModalBody>
    </>
  );
};
export default RecipeModalView;
