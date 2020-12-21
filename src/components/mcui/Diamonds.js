import React from 'react';
import Sprite from './Sprite';

const InvSlot = ({ amt, item }) => {
  return <span className="invslot-item" data-minetip-title={item}>
    <Sprite id={item || "Air"} />
    {amt !== 1 && amt !== undefined && amt !== null ? <span className="invslot-stacksize">{amt}</span> : null}
  </span>;
}


const Diamonds = ({ count }) => {
  if (!count)
    return <div><InvSlot item="Diamond" amt={0} /></div>
  let blocks = Math.floor(count / 9);
  let diamonds = count - (blocks * 9);

  const imgElmts = [];
  let i = 0;

  function checkLine() {
    if (i !== 1 && i % 9 === 0)
      imgElmts.push(<br key={'sb' + i} />);
  }

  while (blocks > 0) {
    checkLine();
    const amt = Math.min(64, blocks);
    imgElmts.push(<InvSlot key={i++} amt={amt} item="Block of Diamond" />);
    blocks -= amt;
  }

  while (diamonds > 0) {
    checkLine();
    const amt = Math.min(64, diamonds);
    imgElmts.push(<InvSlot key={i++} amt={amt} item="Diamond" />);
    diamonds -= amt;
  }

  return <div>{imgElmts}</div>;
};

export default Diamonds;