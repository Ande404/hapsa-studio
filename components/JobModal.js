import {
  ModalHeader,
  ModalFooter,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalCloseButton,
  ModalOverlay,
} from '@chakra-ui/react';

const JobModal = ({
  onClose,
  isOpen,
  onOpen,
  job,
  sendApplication,
  user,
  token,
}) => {
  const submitApplication = () => {
    sendApplication();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{job?.title || 'no title'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Applicant info and job info here</ModalBody>

        <ModalFooter>
          <Button onClick={submitApplication} disabled={!user && !token}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JobModal;
