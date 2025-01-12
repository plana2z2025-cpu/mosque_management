import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useDispatch } from 'react-redux';
import { payeeActions } from '@/redux/combineActions';
import toast from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import { useNavigate, useParams } from 'react-router-dom';
const breadCumbs = [{ label: 'Create Beneficiary', href: null }];

export function CreatePayeeForm() {
  // State to manage form data and errors
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNewPayeeAction, updatePayeeAction } = payeeActions;

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

  const payeeFromState = location.state?.payee;

  useEffect(() => {
    const fetchPayeeDetails = async () => {
      if (id && !payeeFromState) {
        try {
          const response = await payeeActions.getPayeeDetailsAction(id);
          if (response[0]) {
            setFormData(response[1].data); // Update formData with the fetched payee details
          } else {
            toast.error('Failed to load payee details');
          }
        } catch (error) {
          toast.error('An error occurred while fetching payee details');
        }
      } else if (payeeFromState) {
        setFormData(payeeFromState); // Set form data from passed state
      }
    };
    fetchPayeeDetails();

  }, [id, payeeFromState]);

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

      // Check if there is an `id` (i.e., update action) or create a new payee
      if (id) {
        const response = await dispatch(updatePayeeAction(id, json));
        if (response[0] === 200) {
          toast.success('Payee updated successfully');
          navigate("/admin/expenses/payees");
        } else {
          toast.error(response[1]?.message);
        }
      } else {
        // If `id` is not present, create a new payee
        const response = await addNewPayeeAction(json);
        if (response[0] === 201) {
          toast.success('Payee created successfully');
          navigate("/admin/expenses/payees");
        } else {
          toast.error(response[1]?.message || 'Failed to create payee');
        }
      }
    }
  };


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
            className={errors.payeeName ? 'border-red-500' : ''}
          />
          {errors.payeeName && <p className="text-red-500 text-xs mt-1">{errors.payeeName}</p>}
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
          {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
        </div>

        {/* Contact Number Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Contact Number</label>
          <Input
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Provide contact number of the Payee"
            className={errors.contactNumber ? 'border-red-500' : ''}
          />
          {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
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
          {errors?.upiPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors?.upiPhoneNumber}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {id ? 'Update Beneficiary' : 'Create Beneficiary'}
        </Button>
      </form>
    </Mainwrapper>
  );
}

export default CreatePayeeForm;
