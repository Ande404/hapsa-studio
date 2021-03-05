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

const JobModal = ({ onClose, isOpen, onOpen, job }) => {
  const submitApplication = () => {
    alert('confirmed');
    onClose();
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{job.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hello</ModalBody>

          <ModalFooter>
            <Button onClick={submitApplication}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JobModal;
