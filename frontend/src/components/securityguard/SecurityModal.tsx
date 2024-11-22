import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/dialog';
import { Button } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/button';
import { Input } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../financialmanagementincomeexpensenote/financialmanagementexpenseui/select';
import { useForm } from 'react-hook-form';
import { SecurityGuard } from '../../types';

interface SecurityModalProps {
  guard: SecurityGuard | null;
  onClose: () => void;
  onSave: (guard: Omit<SecurityGuard, 'id'>) => void;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ guard, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<SecurityGuard, 'id'>>({
    defaultValues: guard || {
      name: '',
      employeeId: '',
      status: 'Off Duty',
      shift: 'Morning',
      location: '',
      contactNumber: '',
      email: '',
      joiningDate: new Date().toISOString().split('T')[0],
      nextShift: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: Omit<SecurityGuard, 'id'>) => {
    onSave(data);
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{guard ? 'Edit Security Guard' : 'Add New Security Guard'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employee ID</label>
            <Input {...register('employeeId', { required: 'Employee ID is required' })} />
            {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select onValueChange={(value) => register('status').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="On Duty">On Duty</SelectItem>
                <SelectItem value="Off Duty">Off Duty</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shift</label>
            <Select onValueChange={(value) => register('shift').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input {...register('location', { required: 'Location is required' })} />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <Input {...register('contactNumber', { required: 'Contact number is required' })} />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Joining Date</label>
            <Input type="date" {...register('joiningDate', { required: 'Joining date is required' })} />
            {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Next Shift</label>
            <Input type="date" {...register('nextShift', { required: 'Next shift is required' })} />
            {errors.nextShift && <p className="text-red-500 text-sm">{errors.nextShift.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {guard ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityModal;