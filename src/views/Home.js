import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import AddAccount from '../components/AddAccount';
import HermitDisplayName from '../components/HermitDisplayName/HermitDisplayName';
import Diamonds from '../components/mcui/Diamonds';
import Page from '../components/Page/Page';
import Transactions from '../components/Transactions';
import { numberWithCommas } from '../utils';

const Home = ({ financialAccounts, hermits }) => {
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
              <th>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {hermits.map(hermit => <tr key={hermit.id}>
              <td><HermitDisplayName hermit={hermit} /></td>
              <td className="d-flex align-items-center justify-content-between"><Diamonds count={hermit.netWorth} />{numberWithCommas(hermit.netWorth)}</td>
            </tr>)}
          </tbody>
        </Table>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        <h2>Transactions</h2>
        <Transactions />
      </Col>
    </Row>
  </Page>;
};

export default Home;
