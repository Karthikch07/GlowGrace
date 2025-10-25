import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";
import { CheckCircle2, Scan, Upload } from "lucide-react";
import qrCodeImage from "@assets/stock_images/QR - phonepe.jpg";

interface QRPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  title?: string;
  description?: string;
}

export default function QRPayment({
  isOpen,
  onClose,
  onSuccess,
  amount,
  title = "Complete Payment",
  description = "Scan the QR code or upload payment screenshot to complete your transaction"
}: QRPaymentProps) {
  const [step, setStep] = useState<'qr' | 'upload' | 'success'>('qr');
  const [transactionId, setTransactionId] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('qr');
      setTransactionId('');
      setUploadedFile(null);
      setProcessing(false);
    }
  }, [isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleVerifyPayment = () => {
    if (!transactionId && !uploadedFile) {
      return;
    }

    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {step === 'qr' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                {title}
              </DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">Amount to Pay</div>
                <div className="text-3xl font-bold text-primary">{formatCurrency(amount)}</div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-md">
                  <img 
                    src={qrCodeImage} 
                    alt="Payment QR Code" 
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan this QR code with any UPI app<br />
                  (PhonePe, Google Pay, Paytm, etc.)
                </p>
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center text-lg sm:text-xl">
                    📱
                  </div>
                  <span className="text-xs">PhonePe</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg sm:text-xl">
                    💳
                  </div>
                  <span className="text-xs">Google Pay</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-full flex items-center justify-center text-lg sm:text-xl">
                    💰
                  </div>
                  <span className="text-xs">Paytm</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <Button 
                  className="w-full" 
                  onClick={() => setStep('upload')}
                >
                  I've Completed the Payment
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'upload' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Verify Payment
              </DialogTitle>
              <DialogDescription>
                Enter your transaction ID or upload payment screenshot
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Transaction ID */}
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                <Input
                  id="transactionId"
                  placeholder="e.g., 123456789012"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="screenshot">Payment Screenshot (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="screenshot"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="screenshot" className="cursor-pointer">
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto" />
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">Click to change</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm">Click to upload screenshot</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                💡 Tip: Providing transaction details helps us verify your payment faster
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('qr')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleVerifyPayment}
                  disabled={!transactionId && !uploadedFile || processing}
                  className="flex-1"
                >
                  {processing ? 'Verifying...' : 'Verify Payment'}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Successful!</DialogTitle>
            </DialogHeader>

            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-green-600">Payment Verified!</h3>
                <p className="text-muted-foreground">
                  Your payment of {formatCurrency(amount)} has been confirmed
                </p>
              </div>

              {transactionId && (
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <span className="text-muted-foreground">Transaction ID: </span>
                  <span className="font-mono font-semibold">{transactionId}</span>
                </div>
              )}

              <div className="text-xs text-muted-foreground pt-4">
                Redirecting...
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
