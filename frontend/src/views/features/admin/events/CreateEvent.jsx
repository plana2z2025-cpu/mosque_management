import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
// import { format } from 'date-fns';
import { CalendarIcon, Trash2, Plus } from 'lucide-react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useSelector, useDispatch } from 'react-redux';
import { categoryActions } from '@/redux/combineActions';
import moment from 'moment';

const breadCumbs = [{ label: 'Categories', href: null }];

export function CreateEventForm() {
  // State to manage form data and errors
  const dispatch = useDispatch();
  const { eventCategoryNames } = useSelector((state) => state.eventCategoryState);
  const { communityMosqueDetail } = useSelector((state) => state.mosqueState);
  const { getEventAllCategoriesNamesAction } = categoryActions;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    speakers: [],
    targetAudience: [],
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
    coverImage: '',
    tags: [],
    status: '',
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!eventCategoryNames) {
      fetchAllCategoriesNames();
    }
    if (communityMosqueDetail) {
      let { street, city, state, country, postalCode } = communityMosqueDetail?.address;
      let location = `${street}, ${city}, ${state}, ${country}, ${postalCode}`;
      setFormData((prev) => ({ ...prev, location }));
    }
  }, [eventCategoryNames, communityMosqueDetail]);

  const fetchAllCategoriesNames = () => {
    dispatch(getEventAllCategoriesNamesAction());
  };

  // Validate form fields
  const validateFieldFunc = (key, value, contactInfo = false) => {
    const newErrors = {};

    const validateRules = {
      title: () =>
        value.trim() === ''
          ? 'Title is required'
          : value?.title?.length
            ? 'Title must be max characters'
            : null,
      description: () => (value.trim() === '' ? 'Description is required' : null),
      type: () => (value.trim() === '' ? 'Event Type is required' : null),
      startDate: () => (value.trim() === '' ? 'Start date is required' : null),
      endDate: () => (value.trim() === '' ? 'End date is required' : null),
      location: () => (value.trim() === '' ? 'Location is required' : null),
      contactInfo: {
        name: () => (value.trim() === '' ? 'Name is required' : null),
        email: () => (!validator.isEmail(value) ? 'Email is not correct' : null),
        phone: () => (value.trim() === '' ? 'Phone is required' : null),
      },
    };

    // Target audience validation
    if (formData.targetAudience.length > 0) {
      const validAudiences = [
        'men',
        'women',
        'children',
        'youth',
        'seniors',
        'families',
        'converts',
        'all',
      ];
      const invalidAudiences = formData.targetAudience.filter(
        (audience) => !validAudiences.includes(audience)
      );
      if (invalidAudiences.length > 0) {
        newErrors.targetAudience = 'Invalid audience selection';
      }
    }

    // // Status validation
    // if (formData.status && !['draft', 'published', 'cancelled'].includes(formData.status)) {
    //   newErrors.status = 'Invalid status';
    // }

    const validateNow = contactInfo
      ? validateRules?.['contactInfo']?.[key]?.() || null
      : validateRules?.[key]?.() || null;
    return validateNow ? validateNow : null;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   // Submit form data
    //   console.log('Form submitted:', formData);
    // }
  };

  // Add speaker
  const addSpeaker = () => {
    setFormData((prev) => ({
      ...prev,
      speakers: [...prev.speakers, { name: '', title: '', bio: '' }],
    }));
  };

  // Remove speaker
  const removeSpeaker = (index) => {
    const newSpeakers = [...formData.speakers];
    newSpeakers.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      speakers: newSpeakers,
    }));
  };

  // Handle speaker change
  const handleSpeakerChange = (index, field, value) => {
    const newSpeakers = [...formData.speakers];
    newSpeakers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      speakers: newSpeakers,
    }));
  };

  const changeDateHandler = (date, name) => {
    let options = {};
    name === 'startDate'
      ? (options = {
          startDate: date,
          endDate: date,
        })
      : (options = {
          endDate: date,
        });

    console.log(options);

    setFormData((prev) => ({
      ...prev,
      ...options,
    }));
  };

  // console.log(formData);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the event"
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Type</label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
          >
            <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventCategoryNames &&
                eventCategoryNames?.map((singleCategory) => (
                  <SelectItem value={singleCategory?._id}>{singleCategory?.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
        </div>

        {/* Event Date Input */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <Calendar
              mode="single"
              name="startDate"
              selected={formData.startDate}
              onSelect={(date) => changeDateHandler(date, 'startDate')}
              disabled={(date) => date < new Date()}
              // initialFocus
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <Calendar
              mode="single"
              name="endDate"
              selected={formData.endDate}
              onSelect={(date) => changeDateHandler(date, 'endDate')}
              disabled={(date) => date < formData?.startDate}
              // initialFocus
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
        </div>

        {/* Event Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Location</label>
          <Input
            name="title"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter event location"
            className={errors?.location ? 'border-red-500' : ''}
          />
          {errors?.location && <p className="text-red-500 text-xs mt-1">{errors?.location}</p>}
        </div>

        {/* Speakers Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Speakers</label>
          {formData.speakers.map((speaker, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Speaker Name"
                value={speaker.name}
                onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
              />
              <Input
                placeholder="Speaker Title"
                value={speaker.title}
                onChange={(e) => handleSpeakerChange(index, 'title', e.target.value)}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSpeaker(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSpeaker}>
            <Plus className="mr-2 h-4 w-4" /> Add Speaker
          </Button>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium mb-2">Target Audience</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            name="contactInfo.name"
            value={formData.contactInfo.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, name: e.target.value },
              }))
            }
            placeholder="Contact Name"
          />
          <Input
            name="contactInfo.email"
            value={formData.contactInfo.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, email: e.target.value },
              }))
            }
            placeholder="Contact Email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          <Input
            name="contactInfo.phone"
            value={formData.contactInfo.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, phone: e.target.value },
              }))
            }
            placeholder="Contact Phone"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </Mainwrapper>
  );
}

export default CreateEventForm;
