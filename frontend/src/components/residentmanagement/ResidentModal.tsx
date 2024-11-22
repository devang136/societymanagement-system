import React from 'react';
import { Resident } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/dialog';
import { Button } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/button';
import { Input } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/input';
import { Label } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/select';

interface ResidentModalProps {
  resident?: Resident | null;
  onClose: () => void;
  onSave: (resident: Resident) => void;
}

const ResidentModal: React.FC<ResidentModalProps> = ({ resident, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Partial<Resident>>({
    name: resident?.name || '',
    email: resident?.email || '',
    phone: resident?.phone || '',
    unit: resident?.unit || '',
    status: resident?.status || 'active',
    moveInDate: resident?.moveInDate || new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Resident);
  };

  const handleChange = (field: keyof Resident, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{resident ? 'Edit Resident' : 'Add Resident'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit Number</Label>
            <Input
              id="unit"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value as 'active' | 'inactive')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moveInDate">Move-in Date</Label>
            <Input
              id="moveInDate"
              type="date"
              value={formData.moveInDate instanceof Date
                ? formData.moveInDate.toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
              }
              onChange={(e) => handleChange('moveInDate', new Date(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {resident ? 'Update' : 'Add'} Resident
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResidentModal;
