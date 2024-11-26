import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const alertTypes = [
  "Warning",
  "Emergency",
  "Fire Alarm",
  "Earth Quake",
  "High Winds",
  "Thunder",
];

const AlertForm = () => {
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Alert sent successfully");
    setDescription("");
    setSelectedType("");
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Alert</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Alert Type<span className="text-red-500">*</span>
          </label>
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                type="button"
                variant="outline" 
                className="w-full justify-between"
              >
                {selectedType || "Select Alert Type"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[200px]" isOpen={isOpen}>
              {alertTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setIsOpen(false);
                  }}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Description<span className="text-red-500">*</span>
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="An emergency description typically refers to a detailed account or explanation of an emergency situation."
            className="h-32"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-black hover:bg-primary/90 py-2 rounded-md"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default AlertForm;