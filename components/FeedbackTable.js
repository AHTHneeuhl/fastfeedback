import { Box, Code, Switch } from '@chakra-ui/react';
import DeleteFeedback from './DeleteFeedback';
import { Table, Tr, Th, Td } from './Table';

const FeedbackTable = ({ feedbacks }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Status</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback) => (
          <Box as="tr" key={feedback.createdAt}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{`/`}</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="green"
                defaultChecked={feedback.status === 'active'}
              />
            </Td>
            <Td>
              <DeleteFeedback feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
