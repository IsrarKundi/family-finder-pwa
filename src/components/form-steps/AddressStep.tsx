import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddressData {
  country: string;
  district: string;
  fullAddress: string;
}

interface AddressStepProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
  errors: Record<string, string>;
}

export const AddressStep = ({ data, onChange, errors }: AddressStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Current Address</h2>
        <p className="text-muted-foreground">Tell us where you currently live</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={data.country}
            onChange={(e) => onChange({ ...data, country: e.target.value })}
            placeholder="Enter your country"
            className="mt-1"
          />
          {errors.country && <p className="text-sm text-destructive mt-1">{errors.country}</p>}
        </div>

        <div>
          <Label htmlFor="district">District / State *</Label>
          <Input
            id="district"
            value={data.district}
            onChange={(e) => onChange({ ...data, district: e.target.value })}
            placeholder="Enter your district or state"
            className="mt-1"
          />
          {errors.district && <p className="text-sm text-destructive mt-1">{errors.district}</p>}
        </div>

        <div>
          <Label htmlFor="fullAddress">Full Address *</Label>
          <Textarea
            id="fullAddress"
            value={data.fullAddress}
            onChange={(e) => onChange({ ...data, fullAddress: e.target.value })}
            placeholder="Enter your complete address"
            className="mt-1 min-h-[100px]"
          />
          {errors.fullAddress && <p className="text-sm text-destructive mt-1">{errors.fullAddress}</p>}
        </div>
      </div>
    </div>
  );
};
