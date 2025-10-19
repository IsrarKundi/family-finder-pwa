import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { ContactDetailsStep } from "@/components/form-steps/ContactDetailsStep";
import { FamilyMembersStep } from "@/components/form-steps/FamilyMembersStep";
import { ClanStep } from "@/components/form-steps/ClanStep";
import { SubClanStep } from "@/components/form-steps/SubClanStep";
import { AddressStep } from "@/components/form-steps/AddressStep";
import { FormData } from "@/types/form";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const TOTAL_STEPS = 5;

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    contactDetails: {
      fullName: "",
      age: "",
      mobile: "",
      email: "",
      shareContact: false,
    },
    familyMembers: [],
    clan: "",
    subClan: "",
    address: {
      country: "",
      district: "",
      fullAddress: "",
    },
  });

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.contactDetails.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        }
        if (!formData.contactDetails.age || parseInt(formData.contactDetails.age) < 1) {
          newErrors.age = "Valid age is required";
        }
        if (!formData.contactDetails.mobile.trim()) {
          newErrors.mobile = "Mobile number is required";
        }
        if (!formData.contactDetails.email.trim() || !formData.contactDetails.email.includes("@")) {
          newErrors.email = "Valid email is required";
        }
        break;
      case 3:
        if (!formData.clan) {
          newErrors.clan = "Please select a clan";
        }
        break;
      case 4:
        if (!formData.subClan) {
          newErrors.subClan = "Please select a sub-clan";
        }
        break;
      case 5:
        if (!formData.address.country.trim()) {
          newErrors.country = "Country is required";
        }
        if (!formData.address.district.trim()) {
          newErrors.district = "District is required";
        }
        if (!formData.address.fullAddress.trim()) {
          newErrors.fullAddress = "Full address is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    // Store form data in localStorage for demo purposes
    const existingData = JSON.parse(localStorage.getItem("communityMembers") || "[]");
    existingData.push({ ...formData, id: Date.now().toString() });
    localStorage.setItem("communityMembers", JSON.stringify(existingData));
    
    toast.success("Registration completed successfully!", {
      description: "Welcome to the community!",
    });
    
    navigate("/");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactDetailsStep
            data={formData.contactDetails}
            onChange={(data) => setFormData({ ...formData, contactDetails: data })}
            errors={errors}
          />
        );
      case 2:
        return (
          <FamilyMembersStep
            data={formData.familyMembers}
            onChange={(data) => setFormData({ ...formData, familyMembers: data })}
          />
        );
      case 3:
        return (
          <ClanStep
            clan={formData.clan}
            onChange={(clan) => setFormData({ ...formData, clan, subClan: "" })}
            errors={errors}
          />
        );
      case 4:
        return (
          <SubClanStep
            clan={formData.clan}
            subClan={formData.subClan}
            onChange={(subClan) => setFormData({ ...formData, subClan })}
            errors={errors}
          />
        );
      case 5:
        return (
          <AddressStep
            data={formData.address}
            onChange={(data) => setFormData({ ...formData, address: data })}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Registration</h1>
          <p className="text-muted-foreground">Join our community in {TOTAL_STEPS} simple steps</p>
        </div>

        <Card className="p-6 md:p-8 shadow-medium">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          
          {renderStep()}

          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-primary hover:opacity-90"
            >
              {currentStep === TOTAL_STEPS ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
