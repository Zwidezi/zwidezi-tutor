import CryptoJS from 'crypto-js';

interface PayFastParams {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
}

export const generatePayFastSignature = (params: Record<string, string>, passphrase?: string) => {
  let paramString = '';
  
  // Sort and concatenate parameters
  Object.keys(params).forEach(key => {
    if (params[key] !== '') {
      paramString += `${key}=${encodeURIComponent(params[key].trim()).replace(/%20/g, "+")}&`;
    }
  });

  // Remove trailing ampersand
  paramString = paramString.slice(0, -1);

  // Add passphrase if provided
  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
  }

  return CryptoJS.MD5(paramString).toString();
};

export const initiatePayFastPayment = (data: Partial<PayFastParams>) => {
  const merchantId = import.meta.env.VITE_PAYFAST_MERCHANT_ID || '10000100'; // Default sandbox ID
  const merchantKey = import.meta.env.VITE_PAYFAST_MERCHANT_KEY || '46f0cd694581a';
  const passphrase = import.meta.env.VITE_PAYFAST_PASSPHRASE;
  const isSandbox = import.meta.env.VITE_PAYFAST_SANDBOX === 'true';

  const baseUrl = isSandbox 
    ? 'https://sandbox.payfast.co.za/eng/process' 
    : 'https://www.payfast.co.za/eng/process';

  const params: any = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: `${window.location.origin}/?payment=success`,
    cancel_url: `${window.location.origin}/?payment=cancel`,
    notify_url: `${window.location.origin}/api/payment-notify`, // This needs a backend handler
    name_first: data.name_first || '',
    name_last: data.name_last || '',
    email_address: data.email_address || '',
    m_payment_id: data.m_payment_id || `PAY-${Date.now()}`,
    amount: data.amount || '99.00',
    item_name: data.item_name || 'Mzansi Tutor Pro Plan',
  };

  const signature = generatePayFastSignature(params, passphrase);
  params.signature = signature;

  // Create and submit form
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = baseUrl;

  Object.keys(params).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
