import { useRef } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const DeleteFeedback = ({ feedbackId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { user } = useAuth();

  const onDeleteFeedback = () => {
    console.log('Goodbye...');
    deleteFeedback(feedbackId);
    mutate(
      ['/api/feedback', user.token],
      async (feedbacks) => {
        return feedbacks.filter((feedback) => feedback.id !== feedbackId);
      },
      false
    );
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="alert dialog"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedback;
