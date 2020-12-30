import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalForm, { OccupationalHealthcareValues} from './AddOccupationalForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareValues) => void;
  error?: string;
}

const AddOccupationModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Occupational Healthcare</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOccupationModal;
