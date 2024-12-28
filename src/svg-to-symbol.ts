import {
  DOMParser, XMLSerializer, Document, Element,
} from '@xmldom/xmldom';
import micromatch from 'micromatch';

const preserveAttrs = [
  'viewBox',
  'preserveAspectRatio',
  'class',
  'overflow',
  'stroke?(-*)',
  'fill?(-*)',
  'xmlns?(:*)',
  'role',
  'aria-*',
];

function findSvgNode(doc: Document): Element | undefined {
  return Array.from(doc.childNodes).find(
    (node) => node.nodeType === doc.ELEMENT_NODE && (node as Element).tagName === 'svg',
  ) as Element | undefined;
}

export function svgToSymbol(xml: string, id: string) {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml.trim(), 'text/xml');

  const svg = findSvgNode(doc);

  if (!svg) {
    return null;
  }

  const symbol = doc.createElement('symbol');
  symbol.setAttribute('id', id);

  Array.from(svg.attributes).forEach((attr) => {
    if (micromatch.isMatch(attr.name, preserveAttrs)) {
      symbol.setAttribute(attr.name, attr.value);
    }
  });

  Array.from(svg.childNodes).forEach((node) => {
    symbol.appendChild(node);
  });

  const width = svg.getAttribute('width');
  const height = svg.getAttribute('height');

  if (!symbol.hasAttribute('viewBox') && width && height) {
    symbol.setAttribute('viewBox', `0 0 ${width} ${height}`);
  }

  const serializer = new XMLSerializer();

  return {
    symbolXml: serializer.serializeToString(symbol),
    attributes: {
      width,
      height,
      viewBox: svg.getAttribute('viewBox'),
    },
  };
}
