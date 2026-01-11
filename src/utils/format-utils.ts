/**
 * UTILIDADES DE FORMATO
 */

export const formatDate = (date: Date | string, format = 'DD/MM/YYYY'): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year));
};

export const formatCurrency = (amount: number, currency = 'Bs.'): string => {
  return `${currency} ${amount.toFixed(2)}`;
};

export const formatNumber = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPercentage = (value: number, decimals = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text: string, maxLength = 50): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
