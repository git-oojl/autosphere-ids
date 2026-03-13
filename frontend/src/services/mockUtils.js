export function normalizeText(value = '') {
  return String(value ?? '').trim().toLowerCase();
}

export function toArray(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => item !== undefined && item !== null && item !== '');
  }

  if (value === undefined || value === null || value === '') {
    return [];
  }

  return [value];
}

export function ensureItems(collection) {
  if (Array.isArray(collection)) {
    return collection;
  }

  if (collection && Array.isArray(collection.items)) {
    return collection.items;
  }

  return [];
}

export function includesText(haystack, needle) {
  if (!needle) {
    return true;
  }

  return normalizeText(haystack).includes(normalizeText(needle));
}

export function matchesAnyField(item, fields = [], query = '') {
  if (!query) {
    return true;
  }

  return fields.some((field) => includesText(item?.[field], query));
}

export function sortItems(items = [], sort = 'relevance') {
  const sorted = [...items];

  const comparators = {
    price_asc: (a, b) => (a.price ?? 0) - (b.price ?? 0),
    price_desc: (a, b) => (b.price ?? 0) - (a.price ?? 0),
    year_desc: (a, b) => (b.year ?? 0) - (a.year ?? 0),
    year_asc: (a, b) => (a.year ?? 0) - (b.year ?? 0),
    mileage_asc: (a, b) => (a.mileageKm ?? 0) - (b.mileageKm ?? 0),
    mileage_desc: (a, b) => (b.mileageKm ?? 0) - (a.mileageKm ?? 0),
    date_desc: (a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')),
    date_asc: (a, b) => String(a.date ?? '').localeCompare(String(b.date ?? '')),
  };

  const comparator = comparators[sort];

  if (!comparator) {
    return sorted;
  }

  return sorted.sort(comparator);
}

export function paginateItems(items = [], page = 1, pageSize = 12) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safePageSize = Math.max(Number(pageSize) || 12, 1);
  const total = items.length;
  const totalPages = Math.max(Math.ceil(total / safePageSize), 1);
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;

  return {
    items: items.slice(start, end),
    meta: {
      total,
      page: safePage,
      pageSize: safePageSize,
      totalPages,
    },
  };
}

export function mapById(items = []) {
  return items.reduce((acc, item) => {
    if (item?.id) {
      acc[item.id] = item;
    }

    return acc;
  }, {});
}

export function unique(values = []) {
  return [...new Set(values)];
}
