import './Invslot.css';

export const ids = {
  Diamond: 3508,
  'Block of Diamond': 3235,
  Bamboo: 2373,
  'Netherite Ingot': 135,
  'Block of Netherite': 132,
  Air: 2363,
}

const sheetsize = 1024;
const size = 32;
const tiles = sheetsize / size;
const scale = 1;

const Sprite = ({ id }) => {
  const pos = ids[id] - 1;
  const left = pos % tiles * size * scale
  const top = Math.floor(pos / tiles) * size * scale
  return <span className="inv-sprite" style={{ backgroundImage: "url(/assets/images/InvSprite.png)", backgroundPosition: `-${left}px -${top}px` }}></span>;
}

export default Sprite;