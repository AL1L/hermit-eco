import React from 'react';
import { Table } from 'react-bootstrap';
import { numberWithCommas } from '../utils';

const Transactions = ({ transactions }) => {
  console.log(transactions);
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>Time</th>
        <th>From</th>
        <th>To</th>
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
          <td>{transaction.time}</td>
          <td>{transaction.from}</td>
          <td>{transaction.to}</td>
          <td>{numberWithCommas(transaction.amount)} {transaction.units}</td>
          <td>{transaction.location}</td>
          <td>{transaction.videoId}:{transaction.videoTime}</td>
        </tr>)}
    </tbody>
  </Table>
}

export default Transactions;