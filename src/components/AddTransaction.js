import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import firebase from 'firebase/app';

function newUuid() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
  return uuid;
}

const AddTransaction = ({ financialAccounts, hermits, show, onHide, account }) => {
  const [targetAccount, setTargetAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoTime, setVideoTime] = useState(0);
  const [notes, setNotes] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const firestore = firebase.firestore();

    const created = new Date();
    const id = newUuid();
    const targetAccountObj = financialAccounts.find(a => a.id === targetAccount);
    const targetAcountRef = firestore.collection('financialAccounts').doc(targetAccountObj.id);
    const sourceAcountRef = firestore.collection('financialAccounts').doc(account.id);
    console.log(1);
    console.log(account);
    firestore.collection('financialAccounts').doc(account.id).set({
      balance: account.balance - amount,
      transactions: [
        ...account.$.transactions,
        {
          id,
          sourceAccount: targetAcountRef,
          amount: -amount,
          location,
          videoId,
          videoTime,
          notes,
          created
        }
      ]
    }, { merge: true });

    console.log(2)
    firestore.collection('financialAccounts').doc(targetAccountObj.id).set({
      balance: targetAccountObj.balance + amount,
      transactions: [
        ...targetAccountObj.$.transactions,
        {
          id,
          sourceAccount: sourceAcountRef,
          amount,
          location,
          videoId,
          videoTime,
          notes,
          created
        }
      ]
    }, { merge: true });

    if (onHide)
      onHide();

    setTargetAccount(null);
    setAmount(0);
    setLocation("");
    setVideoId("");
    setVideoTime(0);
    setNotes("")
  }

  return <Modal size="xl" show={show} onHide={onHide} centered>
    <Modal.Header>
      <Modal.Title>Add Financial Account</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className="mt-3">
          <Form.Label>Target Account</Form.Label>
          <Form.Control as="select" value={targetAccount} onChange={e => setTargetAccount(e.target.value)}>
            {financialAccounts.map(a => <option key={a.id} value={a.id}>{a.displayName || a.id}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mt-3" >
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter Amount" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
        </Form.Group>
        <Form.Group className="mt-3" >
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter Location" value={location} onChange={e => setLocation(e.target.value)} />
        </Form.Group>
        <Form.Group className="mt-3" >
          <Form.Label>Video Id</Form.Label>
          <Form.Control type="text" placeholder="Enter Video Id" value={videoId} onChange={e => setVideoId(e.target.value)} />
        </Form.Group>
        <Form.Group className="mt-3" >
          <Form.Label>Video Timestamp</Form.Label>
          <Form.Control type="number" placeholder="Enter Video Timestamp" value={videoTime} onChange={e => setVideoTime(parseFloat(e.target.value))} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
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