import React from 'react';
import { NavLink } from 'react-router-dom';


const HermitDisplayName = ({ hermit, noLink }) => {
  const withAvatar = <><img width="32" src={hermit.avatar} alt={hermit.displayName} /> {hermit.displayName}</>;

  if (noLink)
    return withAvatar;

  return <NavLink to={`/hermits/${hermit.id}`} className="text-dark text-decoration-none">{withAvatar}</NavLink>
}

export default HermitDisplayName;