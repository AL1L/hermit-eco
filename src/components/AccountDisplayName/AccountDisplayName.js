import React from 'react';
import { NavLink } from 'react-router-dom';
import HermitDisplayName from '../HermitDisplayName/HermitDisplayName';


const AccountDisplayName = ({ account, noLink }) => {
  let justName = account.id === account.owners[0].id ? <HermitDisplayName hermit={account.owners[0]} noLink /> : account.displayName || account.id;

  if (noLink)
    return justName;

  return <NavLink to={`/accounts/${account.id}`} className="text-dark text-decoration-none">{justName}</NavLink>
}

export default AccountDisplayName;