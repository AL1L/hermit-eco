import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import Page from '../components/Page/Page';

function numberWithCommas(x) {
  return `${x}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const HermitDisplayName = ({ hermit }) => {
  return <><img width="32" src={hermit.avatar} alt={hermit.displayName} /> {hermit.displayName}</>
}

const Home = ({ financialAccounts, hermits }) => {
  const transactions = [
    // {
    //   id: 0,
    //   time: "Today",
    //   from: <HermitDisplayName hermit={hermits[0]} />,
    //   to: <HermitDisplayName hermit={hermits[1]} />,
    //   amount: 80,
    //   units: "Diamonds",
    //   location: "Shopping District",
    //   videoId: "DLzxrzFCyOs",
    //   videoTime: 0
    // },
  ];

  const stats = [];

  stats.push({
    name: "Economy Volume",
    value: financialAccounts.reduce((total, account) => total + account.balance, 0)
  });

  return <Page>
    <Row className="mt-3">
      {stats.map(stat => <Col key={stat.name} xs="12" md={`${Math.max(4, Math.ceil(12 / stats.length))}`}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{numberWithCommas(stat.value)}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{stat.name}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>)}
    </Row>
    <Row>
      <Col>
        <h2>Hermits</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {hermits.map(hermit => <tr key={hermit.ChannelName}>
              <td><HermitDisplayName hermit={hermit} /></td>
              <td>{numberWithCommas(hermit.balance)}</td>
            </tr>)}
          </tbody>
        </Table>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        <h2>Transactions</h2>
        <Table striped bordered hover>
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
            {transactions.map(transaction => <tr key={transaction.id}>
              <td>{transaction.time}</td>
              <td>{transaction.from}</td>
              <td>{transaction.to}</td>
              <td>{numberWithCommas(transaction.amount)} {transaction.units}</td>
              <td>{transaction.location}</td>
              <td>{transaction.videoId}:{transaction.videoTime}</td>
            </tr>)}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Page>;
};

export default Home;
