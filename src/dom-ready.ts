type Listener = () => void;

let listeners: Listener[] | null = null;

export default function ready(listener: Listener) {
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
