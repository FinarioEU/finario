export type Plan = 'start'|'business'|'enterprise';

/** Stripe Price IDs (ersetzen mit echten IDs aus dem Stripe-Dashboard) */
export const STRIPE_PRICE_IDS: Record<Plan, string> = {
  start: process.env.STRIPE_PRICE_START || 'price_start_placeholder',
  business: process.env.STRIPE_PRICE_BUSINESS || 'price_business_placeholder',
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise_placeholder'
};
