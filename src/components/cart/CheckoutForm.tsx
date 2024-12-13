import { useState } from 'react';
import { PaymentForm } from './PaymentForm';
import { ShippingForm } from './ShippingForm';

interface CheckoutFormProps {
  total: number;
  onSubmit: (data: any) => void;
}

export type CheckoutStep = 'shipping' | 'payment';

export function CheckoutForm({ total, onSubmit }: CheckoutFormProps) {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<any>(null);

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setStep('payment');
  };

  const handlePaymentSubmit = (paymentData: any) => {
    onSubmit({
      shipping: shippingData,
      payment: paymentData,
    });
  };

  return (
    <div className="p-6">
      {step === 'shipping' ? (
        <ShippingForm onSubmit={handleShippingSubmit} />
      ) : (
        <PaymentForm total={total} onSubmit={handlePaymentSubmit} />
      )}
    </div>
  );
}