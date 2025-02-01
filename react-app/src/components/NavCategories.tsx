import { VStack, Heading, Link, SkeletonText } from "@chakra-ui/react";
import { Category } from "../types/Types";

const selectedProps = {
  bgColor: "blue.400",
  color: "white",
  fontWeight: "bold",
};

type Props = {
  categoriesArr: Category[];
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  loading: boolean;
};

const NavCategories = ({
  setSelectedCategory,
  selectedCategory,
  categoriesArr,
  loading,
}: Props) => {
  return loading ? (
    <SkeletonText mt="1" noOfLines={8} spacing="6" skeletonHeight="2" />
  ) : (
    <VStack align="stretch">
      <Heading
        color="blue.400"
        fontSize={14}
        fontWeight="bold"
        marginBottom={4}
      >
        Categories
      </Heading>
      <VStack align="stretch">
        {categoriesArr.map((c) => (
          <Link
            onClick={() => setSelectedCategory(c)}
            px={2}
            py={2}
            borderRadius={5}
            key={c.strCategory}
            _hover={{ textDecoration: "none" }} //sin subrayado
            {...(selectedCategory.strCategory == c.strCategory &&
              selectedProps)}
          >
            {c.strCategory}
          </Link>
        ))}
      </VStack>
    </VStack>
  );
};

export default NavCategories;
