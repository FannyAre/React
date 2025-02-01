import { useState } from "react";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import { Category, Meal, MealDetails, SearchForm } from "./types/Types";
import NavCategories from "./components/NavCategories";
import useHttpData from "./hooks/useHttpData";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";
import useFetch from "./hooks/useFetch";
import MainContent from "./components/MainContent";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const makeUrlMeals = (category: Category) =>
  `${baseUrl}filter.php?c=${category.strCategory}`;

const defaultCategory = {
  strCategory: "Beef",
};
function App() {
  //************************************************* */
  //**************Categorias************************* */
  //************************************************* */
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const urlCatMeals = `${baseUrl}list.php?c=list`;
  const { loading: loadingCatMeals, data } = useHttpData<Category>(urlCatMeals);
  //***************************************************** */
  //**************Carga de Meals************************* */
  //***************************************************** */
  const {
    loading: loadingMeals,
    data: dataMeals,
    setData: setMeals,
    setloading: setLoadingMeals,
  } = useHttpData<Meal>(makeUrlMeals(selectedCategory));
  //**************************************************************************** */
  //**************Componente Modal para ver las recetas************************* */
  //**************************************************************************** */
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    fetch,
    loading: LoadingMealDetails,
    data: dataMealDetail,
  } = useFetch<MealDetails>();

  const searchMealDetails = (meal: Meal) => {
    onOpen();
    fetch(`${baseUrl}lookup.php?i=${meal.idMeal}`);
  };

  const searchApi = (searchForm: SearchForm) => {
    setLoadingMeals(true);
    setInFav(false);
    const url = `${baseUrl}search.php?s=${searchForm.search}`;
    axios
      .get<{ meals: Meal[] }>(url)
      .then(({ data }) => setMeals(data.meals))
      .finally(() => setLoadingMeals(false));
  };
  //*********************************************************** */
  //**************Componente Favoritos************************* */
  //*********************************************************** */
  //inFav representa el valor de si el usuario esta en la seccion de favoritos o en el inicio
  const [inFav, setInFav] = useState<boolean | undefined>();
  const onClickFav = () => {
    setInFav((prev) => !prev);
  };
  const [arrMealsFav, setArrMealsFav] = useState<Meal[]>([]);

  const addToFavorite = (m: Meal) => {
    setArrMealsFav([...arrMealsFav, m]);
  };

  const removeToFavorite = (m: Meal) => {
    setArrMealsFav(arrMealsFav.filter((p) => p !== m));
  };
  //************************************************************************************ */
  //**************Volver al inicio cuando haces clik en favoritos*********************** */
  //************************************************************************************ */
  const onClickHome = () => {
    setInFav(false);
  };

  window.document.title = "Meals Recipe";
  return (
    <>
      <Grid
        templateAreas={
          inFav
            ? `"header header"
              "main main"
              "main main"`
            : `"header header"
                  "nav main" `
        }
        gridTemplateRows={"50px 1fr 1fr "}
        gridTemplateColumns={inFav ? `1fr` : { sm: `0 1fr`, md: `250px 1fr` }}
        color="blackAlpha.700"
        gap="1"
        fontWeight="bold"
      >
        <GridItem
          boxShadow={"lg"}
          pos="sticky"
          top="0px"
          left="0"
          zIndex="1"
          pt="7"
          bg="white"
          area={"header"}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Header
            onSubmit={searchApi}
            onClickHome={onClickHome}
            onClickFav={onClickFav}
            arrFavoritesMeals={arrMealsFav}
          ></Header>
        </GridItem>

        {inFav ? (
          ""
        ) : (
          <GridItem
            pos="sticky"
            top="60px"
            left="0"
            fontSize={14}
            p="5"
            area={"nav"}
            height="calc(100vh - 60px) "
            overflowY="auto" //escroleable de arriba hacia abajo
          >
            <NavCategories
              categoriesArr={data}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              loading={loadingCatMeals}
            ></NavCategories>
          </GridItem>
        )}

        <GridItem
          pl={inFav ? "7" : "2"}
          bg="blackAlpha.100"
          area={inFav ? "main main" : "main"}
        >
          Meals
          <MainContent
            addToFavorite={addToFavorite}
            removeToFavorite={removeToFavorite}
            loading={loadingMeals}
            mealsArr={dataMeals}
            openRecipe={searchMealDetails}
            arrFavoritesMeals={arrMealsFav}
            inFav={inFav}
          ></MainContent>
        </GridItem>
      </Grid>
      <RecipeModal
        isOpen={isOpen}
        onClose={onClose}
        loading={LoadingMealDetails}
        data={dataMealDetail}
      ></RecipeModal>
    </>
  );
}
export default App;
