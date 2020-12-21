import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import firebase from 'firebase/app';

const AddTransaction = ({ financialAccounts, hermits, show, onHide, account }) => {
  const [sourceAccount, setSourceAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoTime, setVideoTime] = useState(0);
  const [notes, setNotes] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const firestore = firebase.firestore();

    firestore.collection('financialAccounts').doc(id).set({
      sourceAccount: financialAccounts.find(a => a.id === sourceAccount),
      amount,
      location,
      videoId,
      videoTime,
      notes,
    })

    if (onHide)
      onHide();

    setSourceAccount(null);
    setAmount(0);
    setLocation("");
    setVideoId("");
    setVideoTime(0);
    setNotes("")
  }

  useEffect(() => {
    setOwners(defaultOwners || []);
  }, [setOwners, defaultOwners]);

  return <Modal size="xl" show={show} onHide={onHide} centered>
    <Modal.Header>
      <Modal.Title>Add Financial Account</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group>
          <Form.Label>id</Form.Label>
          <Form.Control type="text" placeholder="Enter Id" name="id" value={id} onChange={e => setId(e.target.value.toLowerCase())} />
        </Form.Group>
        <Form.Group className="mt-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Owners</Form.Label>
          <Form.Control as="select" multiple value={owners} onChange={e => setOwners([...e.target.children].filter(e => e.selected).map(e => e.value))}>
            {hermits.map(h => <option key={h.id} value={h.id}>{h.displayName}</option>)}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="success" onClick={onSubmit}>Create</Button>
      </Modal.Footer>
    </Form>
  </Modal>
};

export default AddTransaction;