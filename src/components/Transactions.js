import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { numberWithCommas } from '../utils';

const Transactions = ({ transactions }) => {
  console.log(transactions);
  return <Table striped bordered hover>
    <thead>
      <tr>
        {/* <th>Time</th> */}
        <th>Id</th>
        <th>Source Account</th>
        <th>Total</th>
        <th>Location</th>
        <th>Video</th>
      </tr>
    </thead>
    <tbody>
      {(transactions || []).length === 0
        ? <tr>
          <td className="text-center" colSpan="6">No Transactions</td>
        </tr>
        : (transactions || []).map(transaction => <tr key={transaction.id}>
          {/* <td>{new Date(transaction.created.seconds * 1000).toString()}</td> */}
          <td>{transaction.id}</td>
          <td>{transaction.sourceAccount.displayName || transaction.sourceAccount.id}</td>
          <td>{numberWithCommas(transaction.amount)} {transaction.units}</td>
          <td>{transaction.location}</td>
          <td className="text-center">
            <a href={`https://youtu.be/${transaction.videoId}?t=${transaction.videoTime}`} target="_blank" rel="noreferrer">
              <Button>Watch</Button>
            </a>
          </td>
        </tr>)}
    </tbody>
  </Table>
}

export default Transactions;