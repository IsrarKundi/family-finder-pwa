import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUB_CLANS } from "@/types/form";

interface SubClanStepProps {
  clan: string;
  subClan: string;
  onChange: (subClan: string) => void;
  errors: Record<string, string>;
}

export const SubClanStep = ({ clan, subClan, onChange, errors }: SubClanStepProps) => {
  const subClans = clan ? SUB_CLANS[clan] || [] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Sub-Clan</h2>
        <p className="text-muted-foreground">
          Choose the sub-clan under {clan || "your selected clan"}
        </p>
      </div>

      <div>
        <Label htmlFor="subClan">Sub-Clan *</Label>
        <Select value={subClan} onValueChange={onChange} disabled={!clan}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={clan ? "Select a sub-clan" : "Select a clan first"} />
          </SelectTrigger>
          <SelectContent>
            {subClans.map((subClanOption) => (
              <SelectItem key={subClanOption} value={subClanOption}>
                {subClanOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subClan && <p className="text-sm text-destructive mt-1">{errors.subClan}</p>}
      </div>
    </div>
  );
};
