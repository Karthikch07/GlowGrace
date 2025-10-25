import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../lib/format";
import QRPayment from "@/components/QRPayment";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Select Service", icon: User },
  { id: 2, name: "Choose Time", icon: Clock },
  { id: 3, name: "Confirm", icon: CheckCircle },
];


import { allServices } from "@/lib/catalog";


const servicesList = allServices.map((s, i) => ({ ...s, id: typeof s.id === 'number' ? s.id : i + 1 }));

const mockTimeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const mockStylists = [
  { id: 1, name: "Sahed Ali", specialty: "Hair Specialist", rating: 4.9 },
  { id: 2, name: "Dilshad", specialty: "Hair Colouring", rating: 4.8 },
  { id: 3, name: "Sarfaraz", specialty: "Spa Therapist", rating: 5.0 },
];

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);
  const [showQRPayment, setShowQRPayment] = useState(false);
  const { toast } = useToast();

  const [location] = useLocation();

  const selectedSvc = servicesList.find((s: any) => s.id === selectedService) ?? null;

  useEffect(() => {
    try {
      const url = new URL(location, "http://localhost");
      const serviceId = url.searchParams.get("serviceId");
      if (serviceId) {
        const idNum = Number(serviceId);
        if (!Number.isNaN(idNum)) {
          const matched = servicesList.find(s => s.id === idNum);
          if (matched) {
            setSelectedService(matched.id);
            
            setCurrentStep(1);

            
            setTimeout(() => {
              try {
                const el = document.querySelector(`[data-testid="card-service-option-${matched.id}"]`);
                if (el && (el as HTMLElement).scrollIntoView) {
                  (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                  (el as HTMLElement).focus?.();
                }
              } catch (e) {
                
              }
            }, 50);
          }
        }
      }
        
        if (typeof window !== 'undefined' && selectedService == null) {
          try {
            const stored = sessionStorage.getItem('preselectedServiceId');
            if (stored) {
              const idNum2 = Number(stored);
              if (!Number.isNaN(idNum2)) {
                const matched2 = servicesList.find(s => s.id === idNum2);
                if (matched2) {
                  setSelectedService(matched2.id);
                  setCurrentStep(1);
                }
              }
              sessionStorage.removeItem('preselectedServiceId');
            }
          } catch (e) {
            
          }
        }
    } catch (e) {
      
    }
  }, [location]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 font-medium">{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] flex-1 mx-2 transition-colors",
                  currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold">Select a Service</h3>
            <div className="grid gap-3">
              {servicesList.map((service) => (
                <Card
                  key={service.id}
                  className={cn(
                    "p-4 cursor-pointer hover-elevate transition-colors",
                    selectedService === service.id && "ring-2 ring-primary"
                  )}
                  tabIndex={0}
                  aria-selected={selectedService === service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    console.log("Selected service:", service.name);
                  }}
                  data-testid={`card-service-option-${service.id}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <div className="text-lg font-semibold">{formatCurrency(typeof service.price === 'string' ? parseFloat(service.price) : (service.price as any))}</div>
                  </div>
                </Card>
              ))}
            </div>
            <Button
              className="w-full"
              disabled={!selectedService}
              onClick={() => setCurrentStep(2)}
              data-testid="button-next-step"
            >
              Continue
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Choose Date & Time</h3>
              {selectedSvc && (
                <div className="mb-4 p-4 border rounded-md bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Selected Service</div>
                      <div className="font-medium">{selectedSvc.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedSvc.duration} • ₹{selectedSvc.price}</div>
                    </div>
                    <div>
                      <Button variant="outline" onClick={() => setCurrentStep(1)} data-testid="button-change-service">Change</Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid gap-4">
                <div>
                  <label htmlFor="booking-date" className="text-sm font-medium mb-2 block">Select Date</label>
                  <input
                    id="booking-date"
                    aria-label="Booking date"
                    type="date"
                    className=" px-3 py-2 border rounded-md bg-background"
                    min={new Date().toISOString().split('T')[0]}
                    data-testid="input-booking-date"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {mockTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => {
                          setSelectedTime(time);
                          console.log('Selected time:', time);
                        }}
                        data-testid={`button-time-${time.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Select Stylist</h4>
              <div className="grid gap-2">
                {mockStylists.map((stylist) => (
                  <Card
                    key={stylist.id}
                    className={cn(
                      "p-3 cursor-pointer hover-elevate transition-colors",
                      selectedStylist === stylist.id && "ring-2 ring-primary"
                    )}
                    onClick={() => {
                      setSelectedStylist(stylist.id);
                      console.log('Selected stylist:', stylist.name);
                    }}
                    data-testid={`card-stylist-${stylist.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{stylist.name}</h5>
                        <p className="text-sm text-muted-foreground">{stylist.specialty}</p>
                      </div>
                      <Badge variant="secondary">★ {stylist.rating}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1" data-testid="button-back">
                Back
              </Button>
              <Button
                disabled={!selectedTime || !selectedStylist}
                onClick={() => setCurrentStep(3)}
                className="flex-1"
                data-testid="button-confirm-booking"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold">Booking Summary</h3>
            </div>

            <Card className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">
                  {servicesList.find((s: any) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stylist</span>
                <span className="font-medium">
                  {mockStylists.find(s => s.id === selectedStylist)?.name}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(Number(servicesList.find((s: any) => s.id === selectedService)?.price) || 0)}</span>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1" data-testid="button-edit-booking">
                Edit
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setShowQRPayment(true)}
                data-testid="button-confirm-payment"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* QR Payment Dialog */}
      <QRPayment
        isOpen={showQRPayment}
        onClose={() => setShowQRPayment(false)}
        onSuccess={() => {
          setShowQRPayment(false);
          toast({
            title: "Booking Confirmed!",
            description: `Your appointment for ${servicesList.find((s: any) => s.id === selectedService)?.name} on ${selectedTime} has been confirmed.`,
          });
          setCurrentStep(1);
          setSelectedService(null);
          setSelectedTime(null);
          setSelectedStylist(null);
        }}
        amount={Number(servicesList.find((s: any) => s.id === selectedService)?.price) || 0}
        title="Confirm Your Booking"
        description="Complete payment to secure your appointment"
      />
    </div>
  );
}
