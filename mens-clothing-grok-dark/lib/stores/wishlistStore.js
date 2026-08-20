import { createStore } from './createStore.js';
import { storageGetJSON, storageSetJSON } from '../client-storage.js';

export const wishlistStore = createStore([]);

export function hydrateWishlistStore() {
  if (typeof window === 'undefined') return;
  const data = storageGetJSON('favorites', null);
  wishlistStore.setState(() => (Array.isArray(data) ? data : []));
}

export function setWishlistIds(ids) {
  const list = Array.isArray(ids) ? ids : [];
  wishlistStore.setState(() => list);
  storageSetJSON('favorites', list);
}
