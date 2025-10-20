export type Plan = 'start'|'business'|'enterprise';

export const GROSS_PRICES: Record<Plan, number> = {
  start: 11.90,
  business: 29.90,
  enterprise: 99.00
};

export const INTRO_DISCOUNT_FACTOR = 0.5; // 50% für 14 Tage

export function introPrice(plan: Plan){
  return +(GROSS_PRICES[plan] * INTRO_DISCOUNT_FACTOR).toFixed(2);
}
