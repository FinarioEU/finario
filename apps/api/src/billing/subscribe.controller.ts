import { Controller, Post, Body } from '@nestjs/common';
import { getStripe } from './stripe';
import { STRIPE_PRICE_IDS, type Plan } from './stripe.prices';

/**
 * SubscriptionController
 * - Erstellt/aktualisiert einen Stripe-Kunden mit Metadaten (tenantId, email, name)
 * - Optional: setzt paymentMethod als default
 * - Erstellt Subscription mit 14 Tagen Trial (Intro-Preis via Coupon/Schedule separat machbar)
 */
@Controller('billing')
export class SubscriptionController {
  @Post('subscribe')
  async subscribe(@Body() b: {
    tenantId: string;
    email: string;
    name?: string;
    plan: Plan;                 // 'start' | 'business' | 'enterprise'
    paymentMethodId?: string;   // von Stripe Elements/Checkout
  }){
    const stripe = getStripe();
    const planPrice = STRIPE_PRICE_IDS[b.plan];

    // 1) Customer suchen/erstellen
    const existing = await stripe.customers.list({ email: b.email, limit: 1 });
    let customer = existing.data[0];
    if(!customer){
      customer = await stripe.customers.create({
        email: b.email,
        name: b.name,
        metadata: { tenantId: b.tenantId, plan: b.plan, name: b.name || '', email: b.email }
      });
    } else {
      await stripe.customers.update(customer.id, {
        name: b.name || (customer as any).name || undefined,
        metadata: { ...(customer as any).metadata, tenantId: b.tenantId, plan: b.plan, name: b.name || '', email: b.email }
      });
    }

    // 2) Payment Method optional anhängen
    if(b.paymentMethodId){
      await stripe.paymentMethods.attach(b.paymentMethodId, { customer: customer.id });
      await stripe.customers.update(customer.id, { invoice_settings: { default_payment_method: b.paymentMethodId } });
    }

    // 3) Subscription mit 14 Tagen Trial anlegen; Intro-Preis kann über Coupons/PromotionCodes/Schedules vorbereitet werden
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: planPrice }],
      trial_period_days: 14,
      metadata: { tenantId: b.tenantId, plan: b.plan, name: b.name || '', email: b.email }
    });

    return { ok: true, customerId: customer.id, subscriptionId: sub.id, trialEndsAt: sub.trial_end };
  }
}
