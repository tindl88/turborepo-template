export function toCurrency(price: number, locale = 'vi-VN', currency = 'VND', style?: string) {
  const priceFormatted = new Intl.NumberFormat(
    locale, // BCP 47 language tag
    {
      style,
      currency // ISO 4217 currency code
    }
  ).format(price);

  return priceFormatted;
}
