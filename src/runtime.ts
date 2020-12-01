const doc = document;

const idSet = (window as any)._SVG_SPRITE_IDS_ = (window as any)._SVG_SPRITE_IDS_ || [];

let root: SVGSVGElement | null = null;

type ReadyListener = () => void;

let listeners: ReadyListener[] | null = null;

function domReady(listener: ReadyListener) {
  const complete = document.readyState === 'complete';

  if (complete) {
    setTimeout(listener, 0);
    return;
  }

  if (!listeners) {
    listeners = [];
    document.addEventListener('DOMContentLoaded', () => {
      listeners?.forEach((fn) => fn());
    });
  }

  listeners.push(listener);
}

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

  domReady(() => {
    getSVGRoot().insertAdjacentHTML('beforeend', symbol);
  });
}
