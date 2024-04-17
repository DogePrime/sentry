export const formatCurrency = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export const formatCurrencyNoDecimals = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCurrencyWithDecimals = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 18,
});

export const formatCurrencyCompact = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  notation: "compact",
});
