import { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, QrCode } from 'lucide-react';

interface PaymentFormProps {
  total: number;
  onSubmit: (paymentData: any) => void;
}

type PaymentMethod = 'credit' | 'debit' | 'pix' | 'paypal';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  icon: typeof CreditCard | typeof QrCode | 'PayPal';
}

const paymentOptions: PaymentOption[] = [
  { id: 'credit', label: 'Cartão de Crédito', icon: CreditCard },
  { id: 'debit', label: 'Cartão de Débito', icon: CreditCard },
  { id: 'pix', label: 'PIX', icon: QrCode },
  { id: 'paypal', label: 'PayPal', icon: 'PayPal' },
];

export function PaymentForm({ total, onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentData = {
      method: paymentMethod,
      total,
      details: paymentMethod === 'pix' ? {
        pixCode: 'PIX-CODE-EXAMPLE'
      } : paymentMethod === 'paypal' ? {
        redirectUrl: 'https://paypal.com/checkout'
      } : {
        cardNumber,
        cardName,
        expiryDate,
        cvv
      }
    };

    onSubmit(paymentData);
  };

  const renderPaymentMethodButton = (option: PaymentOption) => {
    const isSelected = paymentMethod === option.id;
    const buttonClassName = `p-4 rounded-lg border ${
      isSelected
        ? 'border-amber-500 bg-amber-500/20'
        : 'border-amber-500/20 hover:border-amber-500/40'
    } transition-colors`;

    return (
      <button
        key={option.id}
        type="button"
        onClick={() => setPaymentMethod(option.id)}
        className={buttonClassName}
      >
        {option.icon === 'PayPal' ? (
          <span className="block text-xl text-amber-400 mx-auto mb-2">PayPal</span>
        ) : (
          <option.icon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
        )}
        <span className="block text-sm text-white">{option.label}</span>
      </button>
    );
  };

  const renderCardForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-amber-100 mb-2">
          Número do Cartão
        </label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-amber-100 mb-2">
          Nome no Cartão
        </label>
        <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="NOME COMO ESTÁ NO CARTÃO"
          className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-amber-100 mb-2">
            Data de Validade
          </label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/AA"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-amber-100 mb-2">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>
      </div>

      <Button type="submit" variant="neon" fullWidth>
        Pagar R$ {total.toFixed(2)}
      </Button>
    </form>
  );

  const renderPixPayment = () => (
    <div className="text-center">
      <div className="bg-white p-8 rounded-lg inline-block mb-4">
        <QrCode className="h-48 w-48 text-black mx-auto" />
      </div>
      <p className="text-amber-100 mb-4">
        Escaneie o código QR com seu aplicativo de pagamento ou copie o código PIX abaixo
      </p>
      <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-500/20 mb-4">
        <code className="text-amber-100 break-all">
          00020126580014BR.GOV.BCB.PIX0136example-pix-key-here5204000053039865802BR5913BARBEARIA6008SAOPAULO62070503***6304A1BC
        </code>
      </div>
      <Button
        variant="neon"
        onClick={() => {
          navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136example-pix-key-here5204000053039865802BR5913BARBEARIA6008SAOPAULO62070503***6304A1BC');
          alert('Código PIX copiado!');
        }}
      >
        Copiar código PIX
      </Button>
    </div>
  );

  const renderPaypalPayment = () => (
    <div className="text-center">
      <p className="text-amber-100 mb-6">
        Você será redirecionado para o PayPal para concluir seu pagamento de forma segura.
      </p>
      <Button
        variant="neon"
        onClick={() => window.open('https://paypal.com/checkout', '_blank')}
      >
        Pagar com PayPal
      </Button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Forma de Pagamento</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {paymentOptions.map(renderPaymentMethodButton)}
      </div>

      {(paymentMethod === 'credit' || paymentMethod === 'debit') && renderCardForm()}
      {paymentMethod === 'pix' && renderPixPayment()}
      {paymentMethod === 'paypal' && renderPaypalPayment()}
    </div>
  );
}