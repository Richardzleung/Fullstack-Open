import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckForm, { HealthCheckFormValues} from './AddHealthCheckForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
  error?: string;
}

const AddHealthCheckModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Health Check</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHealthCheckModal;
