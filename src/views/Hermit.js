import React, { useState } from 'react';
import { Card, Col, Row, Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AddAccount from '../components/AddAccount';
import Page from '../components/Page/Page';
import Transactions from '../components/Transactions';
import { isAdmin, numberWithCommas } from '../utils';
import AccountDisplayName from '../components/AccountDisplayName/AccountDisplayName';

const Hermit = ({ hermits, match: { params: { hermitId } } }) => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const hermit = hermits.find(h => h.id === hermitId);

  if (!hermit)
    return <div>404</div>;

  return <Page>
    <Row className="gutters-sm mt-3">
      <Col md="4" className="mb-3">
        <Card>
          <Card.Body>
            <div className="d-flex flex-column align-items-center text-center">
              <img src={hermit.avatar} alt={hermit.displayName + " Avatar"} className="rounded-circle" width="150" />
              <div className="mt-3">
                <h4>{hermit.displayName}</h4>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md="8">
        <Card>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Balance</h6>
              <span className="text-secondary">{numberWithCommas(hermit.balance)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Net Worth</h6>
              <span className="text-secondary">{numberWithCommas(hermit.netWorth)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Financial Accounts</h6>
              <span className="text-secondary">{numberWithCommas(hermit.financialAccounts.length)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Transactions</h6>
              <span className="text-secondary">{numberWithCommas(hermit.financialAccounts.reduce((sum, a) => sum + a.transactions.length, 0))}</span>
            </li>
          </ul>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Financial Accounts</h2>
          </Col>
          {isAdmin() ?
            <Col className="text-right">
              <Button className="float-end" variant="success" onClick={() => setShowAddAccount(true)}>Add</Button>
            </Col> : null}
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
              <th>Ownership</th>
            </tr>
          </thead>
          <tbody>
            {hermit.financialAccounts.map(account => <tr key={account.id}>
              <td><AccountDisplayName account={account} /></td>
              <td>{numberWithCommas(account.balance)}</td>
              <td>{Math.round(1 / account.owners.length * 100)}%</td>
            </tr>)}
          </tbody>
        </Table>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Transactions</h2>
        <Transactions transactions={hermit.financialAccounts.map(a => a.transactions).flat()} />
      </Col>
    </Row>
    <AddAccount hermits={hermits} show={showAddAccount} onHide={() => setShowAddAccount(false)} owners={[hermit.id]} />
  </Page>
}

export default Hermit;