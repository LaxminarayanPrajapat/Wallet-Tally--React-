export type Country = {
  name: string;
  code: string;
  currency: {
    name: string;
    symbol: string;
    code: string;
  };
};

export const countries: Country[] = [
  { name: 'United States', code: 'US', currency: { name: 'US Dollar', symbol: '$', code: 'USD' } },
  { name: 'United Kingdom', code: 'GB', currency: { name: 'British Pound', symbol: '£', code: 'GBP' } },
  { name: 'India', code: 'IN', currency: { name: 'Indian Rupee', symbol: '₹', code: 'INR' } },
  { name: 'Germany', code: 'DE', currency: { name: 'Euro', symbol: '€', code: 'EUR' } },
  { name: 'France', code: 'FR', currency: { name: 'Euro', symbol: '€', code: 'EUR' } },
  { name: 'Italy', code: 'IT', currency: { name: 'Euro', symbol: '€', code: 'EUR' } },
  { name: 'Spain', code: 'ES', currency: { name: 'Euro', symbol: '€', code: 'EUR' } },
  { name: 'Netherlands', code: 'NL', currency: { name: 'Euro', symbol: '€', code: 'EUR' } },
  { name: 'Japan', code: 'JP', currency: { name: 'Japanese Yen', symbol: '¥', code: 'JPY' } },
  { name: 'Canada', code: 'CA', currency: { name: 'Canadian Dollar', symbol: '$', code: 'CAD' } },
  { name: 'Australia', code: 'AU', currency: { name: 'Australian Dollar', symbol: '$', code: 'AUD' } },
  { name: 'New Zealand', code: 'NZ', currency: { name: 'New Zealand Dollar', symbol: '$', code: 'NZD' } },
  { name: 'Singapore', code: 'SG', currency: { name: 'Singapore Dollar', symbol: '$', code: 'SGD' } },
  { name: 'United Arab Emirates', code: 'AE', currency: { name: 'UAE Dirham', symbol: 'د.إ', code: 'AED' } },
  { name: 'Saudi Arabia', code: 'SA', currency: { name: 'Saudi Riyal', symbol: 'SR', code: 'SAR' } },
  { name: 'South Africa', code: 'ZA', currency: { name: 'South African Rand', symbol: 'R', code: 'ZAR' } },
  { name: 'Brazil', code: 'BR', currency: { name: 'Brazilian Real', symbol: 'R$', code: 'BRL' } },
  { name: 'Mexico', code: 'MX', currency: { name: 'Mexican Peso', symbol: '$', code: 'MXN' } },
  { name: 'Argentina', code: 'AR', currency: { name: 'Argentine Peso', symbol: '$', code: 'ARS' } },
  { name: 'Chile', code: 'CL', currency: { name: 'Chilean Peso', symbol: '$', code: 'CLP' } },
  { name: 'Colombia', code: 'CO', currency: { name: 'Colombian Peso', symbol: '$', code: 'COP' } },
  { name: 'China', code: 'CN', currency: { name: 'Chinese Yuan', symbol: '¥', code: 'CNY' } },
  { name: 'South Korea', code: 'KR', currency: { name: 'South Korean Won', symbol: '₩', code: 'KRW' } },
  { name: 'Turkey', code: 'TR', currency: { name: 'Turkish Lira', symbol: '₺', code: 'TRY' } },
  { name: 'Russia', code: 'RU', currency: { name: 'Russian Ruble', symbol: '₽', code: 'RUB' } },
  { name: 'Switzerland', code: 'CH', currency: { name: 'Swiss Franc', symbol: 'CHF', code: 'CHF' } },
  { name: 'Sweden', code: 'SE', currency: { name: 'Swedish Krona', symbol: 'kr', code: 'SEK' } },
  { name: 'Norway', code: 'NO', currency: { name: 'Norwegian Krone', symbol: 'kr', code: 'NOK' } },
  { name: 'Thailand', code: 'TH', currency: { name: 'Thai Baht', symbol: '฿', code: 'THB' } },
  { name: 'Malaysia', code: 'MY', currency: { name: 'Malaysian Ringgit', symbol: 'RM', code: 'MYR' } },
  { name: 'Indonesia', code: 'ID', currency: { name: 'Indonesian Rupiah', symbol: 'Rp', code: 'IDR' } },
  { name: 'Vietnam', code: 'VN', currency: { name: 'Vietnamese Dong', symbol: '₫', code: 'VND' } },
  { name: 'Philippines', code: 'PH', currency: { name: 'Philippine Peso', symbol: '₱', code: 'PHP' } },
  { name: 'Israel', code: 'IL', currency: { name: 'Israeli New Shekel', symbol: '₪', code: 'ILS' } },
  { name: 'Pakistan', code: 'PK', currency: { name: 'Pakistani Rupee', symbol: '₨', code: 'PKR' } },
  { name: 'Bangladesh', code: 'BD', currency: { name: 'Bangladeshi Taka', symbol: '৳', code: 'BDT' } },
  { name: 'Egypt', code: 'EG', currency: { name: 'Egyptian Pound', symbol: 'E£', code: 'EGP' } },
  { name: 'Nigeria', code: 'NG', currency: { name: 'Nigerian Naira', symbol: '₦', code: 'NGN' } },
  { name: 'Kenya', code: 'KE', currency: { name: 'Kenyan Shilling', symbol: 'KSh', code: 'KES' } },
];
