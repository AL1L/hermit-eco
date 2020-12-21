import AddTransaction from '../components/AddTransaction';
import React, { useState } from 'react';
import { Card, Col, Row, Table, Button } from 'react-bootstrap';
import HermitDisplayName from '../components/HermitDisplayName/HermitDisplayName';
import Page from '../components/Page/Page';
import Transactions from '../components/Transactions';
import { isAdmin, numberWithCommas } from '../utils';

const Account = ({ hermits, financialAccounts, match: { params: { accountId } } }) => {
  const [showAddTransactions, setShowAddTransactions] = useState(false);
  const account = financialAccounts.find(a => a.id === accountId);

  if (!account)
    return <div>404</div>;

  return <Page>
    <Row className="gutters-sm mt-3">
      <Col md="4" className="mb-3">
        <Card>
          <Card.Body>
            <div className="d-flex flex-column align-items-center text-center">
              <div className="mt-3">
                <h4>{account.displayName || account.id}</h4>
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
              <span className="text-secondary">{numberWithCommas(account.balance)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Transactions</h6>
              <span className="text-secondary">{numberWithCommas(account.transactions.length)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">Owners</h6>
              <span className="text-secondary">{numberWithCommas(account.owners.length)}</span>
            </li>
          </ul>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Owners</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {account.owners.map(hermit => <tr key={hermit.id}>
              <td><HermitDisplayName hermit={hermit} /></td>
              <td>{numberWithCommas(hermit.netWorth)}</td>
            </tr>)}
          </tbody>
        </Table>
      </Col>
    </Row>
    <Row>
      <Col>
        <Row>
          <Col>
            <h2>Transactions</h2>
          </Col>
          {isAdmin() ?
            <Col className="text-right">
              <Button className="float-end" variant="success" onClick={() => setShowAddTransactions(true)}>Add</Button>
            </Col> : null}
        </Row>
        <Transactions transactions={account.transactions} />
      </Col>
    </Row>
    <AddTransaction hermits={hermits} financialAccounts={financialAccounts} show={showAddTransactions} onHide={() => setShowAddTransactions(false)} account={account} />
  </Page>
}

export default Account;