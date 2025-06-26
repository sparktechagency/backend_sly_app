import Stripe from 'stripe';
import {
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
} from '../../data/environmentVariables';
export const myStripe = new Stripe(STRIPE_SECRET_KEY);
