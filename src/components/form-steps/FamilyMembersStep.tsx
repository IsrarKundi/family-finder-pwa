import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FamilyMember } from "@/types/form";

interface FamilyMembersStepProps {
  data: FamilyMember[];
  onChange: (data: FamilyMember[]) => void;
}

export const FamilyMembersStep = ({ data, onChange }: FamilyMembersStepProps) => {
  const addMember = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), fullName: "", age: "" },
    ]);
  };

  const removeMember = (id: string) => {
    onChange(data.filter((member) => member.id !== id));
  };

  const updateMember = (id: string, field: keyof FamilyMember, value: string) => {
    onChange(
      data.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Family Members</h2>
        <p className="text-muted-foreground">Add your family members (optional)</p>
      </div>

      <div className="space-y-4">
        {data.map((member, index) => (
          <div
            key={member.id}
            className="p-4 border border-border rounded-lg space-y-3 bg-card animate-scale-in"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Member {index + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeMember(member.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`name-${member.id}`}>Full Name</Label>
                <Input
                  id={`name-${member.id}`}
                  value={member.fullName}
                  onChange={(e) => updateMember(member.id, "fullName", e.target.value)}
                  placeholder="Enter name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`age-${member.id}`}>Age</Label>
                <Input
                  id={`age-${member.id}`}
                  type="number"
                  value={member.age}
                  onChange={(e) => updateMember(member.id, "age", e.target.value)}
                  placeholder="Enter age"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addMember}
          className="w-full border-dashed border-2 h-12"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Family Member
        </Button>
      </div>
    </div>
  );
};
