import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { payeeActions } from '@/redux/combineActions';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import { useNavigate, useParams } from 'react-router-dom';
const breadCumbs = [{ label: 'Create Beneficiary', href: null }];

export function CreatePayeeForm() {
  const { payeeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payeeDetail, error } = useSelector((state) => state?.payeeState);
  const { addNewPayeeAction, updatePayeeAction, getPayeeDetailsAction, clearPayeeAction } =
    payeeActions;

  const [formData, setFormData] = useState({
    payeeName: '',
    emailAddress: '',
    contactNumber: '',
    bankDetails: {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
    },
    upiPhoneNumber: '',
  });

  useEffect(() => {
    if (payeeId && payeeDetail?._id !== payeeId) {
      fetchPayeeDetails();
    } else if (payeeDetail?._id === payeeId) {
      setFormData(payeeDetail);
    }

    if (error) {
      toast.error(error);
      navigate('/admin/expenses/payees');
      clearPaymentErrors();
    }
  }, [payeeId, payeeDetail?._id, error]);

  // State to manage form errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let newError = validateFieldFunc([name], value);
    setErrors((prev) => ({
      ...prev,
      [name]: newError,
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [name]: value },
    }));
  };

  const validateFormFunction = () => {
    let newErrors = {};

    // Inline validation for payeeName
    const payeeName = formData['payeeName'];
    if (!payeeName || payeeName.trim() === '') {
      newErrors['payeeName'] = 'Payee Name is required';
    } else if (payeeName.length > 50) {
      newErrors['payeeName'] = 'Payee Name must be a maximum of 50 characters';
    }

    const emailAddress = formData['emailAddress'];
    if (!emailAddress || emailAddress.trim() === '') {
      newErrors['emailAddress'] = 'Email Address is required';
    } else if (!isEmail(emailAddress)) {
      newErrors['emailAddress'] = 'Invalid Email Address';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (validateFormFunction()) {
      const json = {
        ...formData,
      };

      delete json._id;
      delete json.mosqueId;
      delete json.createdBy;
      delete json.__v;

      // Check if there is an `payeeId` (i.e., update action) or create a new payee
      if (payeeId) {
        const response = await dispatch(updatePayeeAction(payeeId, json));
        if (response[0] === 200) {
          toast.success('Payee updated successfully');
          navigate('/admin/expenses/payees');
        } else {
          toast.error(response[1]?.message);
        }
      } else {
        // If `payeeId` is not present, create a new payee
        const response = await addNewPayeeAction(json);
        if (response[0] === 201) {
          toast.success('Payee created successfully');
          navigate('/admin/expenses/payees');
        } else {
          toast.error(response[1]?.message || 'Failed to create payee');
        }
      }
    }
  };

  const fetchPayeeDetails = useCallback(async () => {
    dispatch(getPayeeDetailsAction(payeeId));
  }, [payeeId, payeeDetail?._id]);

  const clearPaymentErrors = useCallback(() => {
    dispatch(clearPayeeAction());
  }, [error]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        {/* Payee Name Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Payee Name</label>
          <Input
            name="payeeName"
            value={formData?.payeeName}
            onChange={handleChange}
            placeholder="Enter payee name"
            className={errors?.payeeName ? 'border-red-500' : ''}
          />
          {errors?.payeeName && <p className="text-red-500 text-xs mt-1">{errors.payeeName}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-2">email Address</label>
          <Input
            name="emailAddress"
            value={formData?.emailAddress}
            onChange={handleChange}
            placeholder="Enter payee email"
            className={errors?.emailAddress ? 'border-red-500' : ''}
          />
          {errors?.emailAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
          )}
        </div>

        {/* Contact Number Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Contact Number</label>
          <Input
            name="contactNumber"
            value={formData?.contactNumber}
            onChange={handleChange}
            placeholder="Provide contact number of the Payee"
            className={errors?.contactNumber ? 'border-red-500' : ''}
          />
          {errors?.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
          )}
        </div>

        {/* Bank Information */}
        <div>
          <label className="block text-sm font-medium mb-2">Bank Details</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Input
                name="accountNumber"
                value={formData?.bankDetails?.accountNumber}
                onChange={handleBankDetailsChange}
                placeholder="Account Number"
                className={errors?.bankDetails?.accountNumber ? 'border-red-500' : ''}
              />

              {errors?.bankDetails?.accountNumber && (
                <p className="text-red-500 text-xs mt-1">{errors?.bankDetails?.accountNumber}</p>
              )}
            </div>

            <div>
              <Input
                name="bankName"
                value={formData?.bankDetails?.bankName}
                onChange={handleBankDetailsChange}
                placeholder="Bank Name"
                className={errors?.bankDetails?.bankName ? 'border-red-500' : ''}
              />
              {errors?.bankDetails?.bankName && (
                <p className="text-red-500 text-xs mt-1">{errors?.bankDetails?.bankName}</p>
              )}
            </div>

            <div>
              <Input
                name="ifscCode"
                value={formData?.bankDetails?.ifscCode}
                onChange={handleBankDetailsChange}
                placeholder="ifsc Code"
                className={errors?.bankDetails?.ifscCode ? 'border-red-500' : ''}
              />
              {errors?.bankDetails?.ifscCode && (
                <p className="text-red-500 text-xs mt-1">{errors?.bankDetails?.ifscCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* upi number input */}
        <div>
          <label className="block text-sm font-medium mb-2">upi Phone Number</label>
          <Input
            name="upiPhoneNumber"
            value={formData?.upiPhoneNumber}
            onChange={handleChange}
            placeholder="Enter upi Phone Number of the Pyee"
            className={errors?.upiPhoneNumber ? 'border-red-500' : ''}
          />
          {errors?.upiPhoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors?.upiPhoneNumber}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {payeeId ? 'Update Beneficiary' : 'Create Beneficiary'}
        </Button>
      </form>
    </Mainwrapper>
  );
}

export default CreatePayeeForm;
