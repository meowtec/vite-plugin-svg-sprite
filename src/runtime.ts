function createAddSymbol() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const idSet = (window as any)._SVG_SPRITE_IDS_ = (window as any)._SVG_SPRITE_IDS_ || [];

  const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
  root.style.position = 'absolute';
  root.style.width = '0';
  root.style.height = '0';

  function insertRoot() {
    document.body.insertBefore(root, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertRoot);
  } else {
    insertRoot();
  }

  return function addSymbol(symbol: string, id: string) {
    if (idSet.indexOf(id) > -1 || document.getElementById(id)) {
      console.warn(`Icon #${id} was duplicately registered. It must be globally unique.`);
    }
    idSet.push(id);

    root.insertAdjacentHTML('beforeend', symbol);
  };
}

export default createAddSymbol();
