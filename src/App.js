import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './components/Bootstrap/bootstrap.min.css';
import Home from './views/Home';
import firebase from 'firebase/app';

const data = { l: 0 };

const App = ({ children }) => {
  const [financialAccounts, setFinancialAccounts] = useState([]);
  const [hermits, setHermits] = useState([]);

  useEffect(() => {
    console.log("App render");
    const firestore = firebase.firestore();

    function buildData() {
      if (!data.accounts || !data.hermits) return;
      const accounts = data.accounts.docs.map(doc => { return { id: doc.id, ...doc.data() } });;
      const hermits = data.hermits.docs.map(doc => { return { id: doc.id, ...doc.data() } });

      for (const account of accounts) {
        account.owners = account.owners.map(owner => hermits.find(h => h.id === owner.id));

        for (const owner of account.owners) {
          if (!owner.financialAccounts) owner.financialAccounts = [];

          owner.financialAccounts.push(account);

          if (owner.id === account.id)
            owner.balance = account.balance;
        }

        for (const transaction of account.transactions) {
          transaction.merchant = accounts.find(a => a.id === transaction.merchant.id);
        }
      }

      // for (const hermit of hermits)
      //   hermit.balance = (hermit.financialAccounts.find(a => a.id === hermit.id) || { balance: 0 }).balance;

      setHermits(hermits);
      setFinancialAccounts(accounts);
    }

    data.removeAccountsListener = firestore.collection("financialAccounts").onSnapshot(query => {
      data.accounts = query;
      buildData();
    });

    data.removeHermitsListener = firestore.collection("hermits").onSnapshot(query => {
      data.hermits = query;
      buildData();
    });

    return () => {
      if (data.removeAccountsListener)
        data.removeAccountsListener();
      if (data.removeHermitsListener)
        data.removeHermitsListener();
    }
  }, [setFinancialAccounts, setHermits])

  console.log(data.l++, hermits, financialAccounts);

  return <Router>
    <Route path="/">
      <Home financialAccounts={financialAccounts} hermits={hermits} />
    </Route>
  </Router>;
};

export default App;
