import firebase from 'firebase/app';

export const numberWithCommas = (x) => {
  return `${x}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const admins = ['aXe1t4ZyH7Nl0cXFaJGqOuVbUjq2', 'ORvEwFGEynWGQPnK97G9fhu9MJZ2'];

export const isAdmin = () => {
  const auth = firebase.auth();

  if (!auth.currentUser)
    return false;

  if (!admins.includes(auth.currentUser.uid))
    return false;

  return true;
};