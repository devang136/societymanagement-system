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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{guard ? 'Edit Security Guard' : 'Add Security Guard'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="employeeId" className="text-sm font-medium">Employee ID</label>
              <Input
                id="employeeId"
                {...register('employeeId', { required: 'Employee ID is required' })}
                className={errors.employeeId ? 'border-red-500' : ''}
              />
              {errors.employeeId && <p className="text-red-500 text-xs">{errors.employeeId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select {...register('status')}>
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
            <div className="space-y-2">
              <label htmlFor="shift" className="text-sm font-medium">Shift</label>
              <Select {...register('shift')}>
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
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <Input
              id="location"
              {...register('location', { required: 'Location is required' })}
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="text-sm font-medium">Contact Number</label>
              <Input
                id="contactNumber"
                {...register('contactNumber', { required: 'Contact number is required' })}
                className={errors.contactNumber ? 'border-red-500' : ''}
              />
              {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="joiningDate" className="text-sm font-medium">Joining Date</label>
              <Input
                id="joiningDate"
                type="date"
                {...register('joiningDate', { required: 'Joining date is required' })}
                className={errors.joiningDate ? 'border-red-500' : ''}
              />
              {errors.joiningDate && <p className="text-red-500 text-xs">{errors.joiningDate.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="nextShift" className="text-sm font-medium">Next Shift</label>
              <Input
                id="nextShift"
                type="date"
                {...register('nextShift', { required: 'Next shift is required' })}
                className={errors.nextShift ? 'border-red-500' : ''}
              />
              {errors.nextShift && <p className="text-red-500 text-xs">{errors.nextShift.message}</p>}
            </div>
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