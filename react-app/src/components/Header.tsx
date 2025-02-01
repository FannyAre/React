import {
  Box,
  Button,
  Container,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Meal, SearchForm } from "../types/Types";
import { FaHome } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

type Props = {
  onSubmit: (data: SearchForm) => void;
  onClickHome: () => void;
  onClickFav: () => void;
  arrFavoritesMeals: Meal[];
};

function Header({
  onSubmit,
  onClickHome,
  onClickFav,
  arrFavoritesMeals,
}: Props) {
  const { register, formState, handleSubmit } = useForm<SearchForm>();
  const isFav = arrFavoritesMeals.length == 0 ? false : true;
  return (
    <>
      <Box pl="6" pr="6" justifyContent="space-between" mt="-6">
        <Button bgColor="white" onClick={onClickHome}>
          <FaHome size={30} color="blue.400" />
        </Button>
      </Box>

      <Container maxW="600" mt="-9" justifyContent={"space-between"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup mt="2">
            <InputLeftElement pointerEvents={"none"}>
              <FaSearch />
            </InputLeftElement>
            <Input
              focusBorderColor={
                !!formState.errors.search ? "crimson" : "blue.400"
              }
              isInvalid={!!formState.errors.search} //si existe search devuelve true si no false
              {...register("search", {
                required: true,
                minLength: { value: 1, message: "Debe ingresar su busqueda" },
                maxLength: 30,
              })}
              type="text"
              placeholder="try 'beans'..."
              onClick={() => {}}
            />
            <Button type="submit" bgColor="blue.400" color={"white"}>
              Search
            </Button>
            <Box width="100px"></Box>
          </InputGroup>
        </form>
      </Container>
      {isFav ? (
        <Box pl="6" pr="6" justifyContent="space-between" mt="-6">
          <Button bgColor="white" onClick={onClickFav}>
            <FaStar size={30} color="blue" />
          </Button>
        </Box>
      ) : (
        <Box pl="6" pr="6" justifyContent="space-between" mt="-6">
          <Button bgColor="white" onClick={onClickFav}>
            <CiStar size={30} color="blue" />
          </Button>
        </Box>
      )}
    </>
  );
}

export default Header;
