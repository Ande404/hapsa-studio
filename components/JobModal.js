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
    alert('job submitted');
    onClose();
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{job?.title || 'no title'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hello</ModalBody>

          <ModalFooter>
            <Button onClick={submitApplication} disabled={!user && !token}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JobModal;
