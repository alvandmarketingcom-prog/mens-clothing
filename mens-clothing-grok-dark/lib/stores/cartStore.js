import { createStore } from './createStore.js';
import { storageGetJSON, storageSetJSON } from '../client-storage.js';

function loadCart() {
  if (typeof window === 'undefined') return [];
  const data = storageGetJSON('cart', null);
  return Array.isArray(data) ? data : [];
}

export const cartStore = createStore([]);

export function hydrateCartStore() {
  cartStore.setState(() => loadCart());
}

export function setCartItems(items) {
  const list = Array.isArray(items) ? items : [];
  cartStore.setState(() => list);
  storageSetJSON('cart', list);
}

export function getCartCount(items) {
  const list = items || cartStore.getState();
  return (list || []).reduce((n, i) => n + (i.qty || 1), 0);
}
