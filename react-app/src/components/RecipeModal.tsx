import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  SkeletonText,
  Container,
} from "@chakra-ui/react";
import { MealDetails } from "../types/Types";
import RecipeModalView from "./RecipeModalView";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: MealDetails | undefined;
};

const RecipeModal = ({ isOpen, onClose, loading, data }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <Container>
              <SkeletonText
                mt="1"
                mb="5"
                noOfLines={3}
                spacing="6"
                skeletonHeight="8"
              />
              <SkeletonText
                noOfLines={1}
                spacing="4"
                skeletonHeight="2"
                borderRadius={200}
              />
              <SkeletonText mt={4} noOfLines={4} spacing={4} />
              <SkeletonText />
              <SkeletonText />
            </Container>
          ) : (
            data && <RecipeModalView data={data} />
          )}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RecipeModal;
