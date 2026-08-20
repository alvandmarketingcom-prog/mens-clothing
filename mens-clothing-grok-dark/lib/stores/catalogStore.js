import { createStore } from './createStore.js';
import { storageGetJSON, storageSetJSON } from '../client-storage.js';

/** کاتالوگ ادمین — دامنه جدا از UI موقت */
export const catalogStore = createStore({
  brands: [],
  colors: [],
  sizes: [],
  attributes: [],
  categories: [],
  tags: [],
});

const KEYS = {
  brands: 'adminCatalogBrands',
  colors: 'adminCatalogColors',
  sizes: 'adminCatalogSizes',
  attributes: 'adminCatalogAttributes',
  categories: 'adminCategories',
  tags: 'adminTags',
};

export function hydrateCatalogStore() {
  if (typeof window === 'undefined') return;
  const next = {};
  Object.entries(KEYS).forEach(([field, key]) => {
    const data = storageGetJSON(key, null);
    next[field] = Array.isArray(data) ? data : [];
  });
  catalogStore.setState((s) => ({ ...s, ...next }));
}

export function setCatalogField(field, value) {
  const list = Array.isArray(value) ? value : [];
  catalogStore.setState((s) => ({ ...s, [field]: list }));
  const key = KEYS[field];
  if (key) storageSetJSON(key, list);
}
