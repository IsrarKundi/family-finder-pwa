import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLANS } from "@/types/form";

interface ClanStepProps {
  clan: string;
  onChange: (clan: string) => void;
  errors: Record<string, string>;
}

export const ClanStep = ({ clan, onChange, errors }: ClanStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Clan</h2>
        <p className="text-muted-foreground">Choose the clan you belong to</p>
      </div>

      <div>
        <Label htmlFor="clan">Clan *</Label>
        <Select value={clan} onValueChange={onChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a clan" />
          </SelectTrigger>
          <SelectContent>
            {CLANS.map((clanOption) => (
              <SelectItem key={clanOption} value={clanOption}>
                {clanOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.clan && <p className="text-sm text-destructive mt-1">{errors.clan}</p>}
      </div>
    </div>
  );
};
