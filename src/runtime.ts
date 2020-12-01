import ready from './dom-ready';

const doc = document;

const idSet = (window as any)._SVG_SPRITE_IDS_ = (window as any)._SVG_SPRITE_IDS_ || [];

let root: SVGSVGElement | null = null;

function getSVGRoot() {
  if (!root) {
    root = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
    root.style.display = 'none';
    doc.body.insertBefore(root, doc.body.firstChild);
  }

  return root;
}

export default function addSymbol(symbol: string, id: string) {
  if (idSet.indexOf(id) > -1 || doc.getElementById(id)) {
    console.warn(`icon#${id} has been registered.`);
  }
  idSet.push(id);

  ready(() => {
    getSVGRoot().insertAdjacentHTML('beforeend', symbol);
  });
}
