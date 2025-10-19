import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ContactDetails } from "@/types/form";

interface ContactDetailsStepProps {
  data: ContactDetails;
  onChange: (data: ContactDetails) => void;
  errors: Record<string, string>;
}

export const ContactDetailsStep = ({ data, onChange, errors }: ContactDetailsStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Contact Details</h2>
        <p className="text-muted-foreground">Let's start with your basic information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            placeholder="Enter your full name"
            className="mt-1"
          />
          {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            value={data.age}
            onChange={(e) => onChange({ ...data, age: e.target.value })}
            placeholder="Enter your age"
            className="mt-1"
          />
          {errors.age && <p className="text-sm text-destructive mt-1">{errors.age}</p>}
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            type="tel"
            value={data.mobile}
            onChange={(e) => onChange({ ...data, mobile: e.target.value })}
            placeholder="Enter your mobile number"
            className="mt-1"
          />
          {errors.mobile && <p className="text-sm text-destructive mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="Enter your email"
            className="mt-1"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
          <div>
            <Label htmlFor="shareContact" className="font-medium">
              Share contact with other members
            </Label>
            <p className="text-sm text-muted-foreground">Allow community members to see your contact info</p>
          </div>
          <Switch
            id="shareContact"
            checked={data.shareContact}
            onCheckedChange={(checked) => onChange({ ...data, shareContact: checked })}
          />
        </div>
      </div>
    </div>
  );
};
