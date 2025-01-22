import React, { useState, useEffect, useCallback } from 'react';
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
import { CalendarIcon, Trash2, Plus } from 'lucide-react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useSelector, useDispatch } from 'react-redux';
import { eventActions } from '@/redux/combineActions';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { COMMUNITY_EVENTS, SINGLE_EVENT_DETAIL } from '@/redux/events/constant';

const breadCumbs = [{ label: 'Categories', href: null }];
const targetAudienceOptions = [
  { label: 'men', value: 'men' },
  { label: 'women', value: 'women' },
  { label: 'children', value: 'children' },
  { label: 'youth', value: 'youth' },
  { label: 'seniors', value: 'seniors' },
  { label: 'families', value: 'families' },
  { label: 'converts', value: 'converts' },
  { label: 'all', value: 'all' },
];

export function CreateEventForm() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventCategoryNames, eventDetail } = useSelector((state) => state.eventState);
  const { allEvents } = useSelector((state) => state.eventState || {});
  const { communityMosqueDetail } = useSelector((state) => state.mosqueState);
  const { addNewEventAction, getEventAllCategoriesNamesAction, getEventDetailsAction, updateEventAction } = eventActions;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: eventCategoryNames?.[0]?._id || '',
    startDate: new Date(),
    endDate: new Date(),
    time: moment().format(),
    location: '',
    speakers: [{ name: '', title: '', bio: '' }],
    targetAudience: ['men'],
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
    coverImage: 'testing.jpg',
    tags: [],
    status: 'published',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (eventId) {
        await dispatch(getEventDetailsAction(eventId));
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchEventDetails();
  }, [eventId, dispatch]);

  useEffect(() => {
    if (eventDetail && eventDetail._id === eventId) {
      setFormData((prev) => ({
        ...prev,
        ...eventDetail,
        startDate: new Date(eventDetail.startDate),
        endDate: new Date(eventDetail.endDate),
        time: moment(eventDetail.time).format(),
      }));
    }
  }, [eventDetail, eventId]);

  useEffect(() => {
    if (!eventCategoryNames) {
      dispatch(getEventAllCategoriesNamesAction());
    }
    if (communityMosqueDetail) {
      const { street, city, state, country, postalCode } = communityMosqueDetail?.address;
      const location = `${street}, ${city}, ${state}, ${country}, ${postalCode}`;
      setFormData((prev) => ({ ...prev, location }));
    }
  }, [eventCategoryNames, communityMosqueDetail, dispatch]);

  useEffect(() => {
    // Run validation after formData.type changes
    if (formData?.type) {
      let typeError = validateFieldFunc('type', formData.type);
      setErrors((prev) => ({
        ...prev,
        type: typeError,
      }));
    }
  }, [formData?.type]);

  const fetchAllCategoriesNames = () => {
    dispatch(getEventAllCategoriesNamesAction());
  };

  // Validate form fields
  const validateFieldFunc = (key, value, contactInfo = false) => {
    const validateRules = {
      title: () =>
        value.trim() === ''
          ? 'Title is required'
          : value?.title?.length
            ? 'Title must be max characters'
            : null,
      description: () => (value.trim() === '' ? 'Description is required' : null),
      type: () => {
        if (!value || (typeof value === 'string' && value.trim() === '') || (typeof value === 'object' && !value._id)) {
          return 'Event Type is required';
        }
        return null;
      },
      location: () => (value.trim() === '' ? 'Location is required' : null),
      contactInfo: {
        name: () => (value.trim() === '' ? 'Name is required' : null),
        email: () =>
          value.trim() === ''
            ? 'Email is required'
            : !validator.isEmail(value)
              ? 'Email is not correct'
              : null,
        phone: () => (value.trim() === '' ? 'Phone is required' : null),
      },
      tagTitle: () => (value.trim() === '' ? 'tag is required' : null),
    };

    const validateNow = contactInfo
      ? validateRules?.['contactInfo']?.[key]() || null
      : validateRules?.[key]
        ? validateRules[key]()
        : null;
    return validateNow ? validateNow : null;
  };

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'time') {
      const [hour, minute] = value;
      value = moment(formData.time).set({ hour, minute }).format();
    }

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

  const handleContactChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
    let newError = validateFieldFunc(name, value, true);

    const errorUpdate = { [name]: newError };
    setErrors((prev) => ({
      ...prev,
      contactInfo: prev?.contactInfo ? { ...prev.contactInfo, ...errorUpdate } : { ...errorUpdate },
    }));
  };

  const handleTypeEventChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
    let newError = validateFieldFunc('type', value);
    setErrors((prev) => ({
      ...prev,
      type: newError || null,
    }));
  };

  // Add speaker
  const addSpeaker = () => {
    setFormData((prev) => {
      return {
        ...prev,
        speakers: Array.isArray(prev.speakers)
          ? [...prev.speakers, { name: '', title: '', bio: '' }]
          : [{ name: '', title: '', bio: '' }],
      };
    });
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
    const error =
      field === 'name'
        ? validateFieldFunc('name', formData['speakers'][index]['name'], true)
        : null;

    const errorUPdate = { speakers: { [index]: error } };
    setErrors((prev) => ({
      ...prev,
      ...errorUPdate,
    }));
  };

  // Handle Date change
  const changeDateHandler = (date, name) => {
    let options = {};
    name === 'startDate'
      ? (options = {
        startDate: date,
        endDate: date,
        time: moment(formData.time)
          .set({
            year: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            day: date.getUTCDate(),
          })
          .format(),
      })
      : (options = {
        endDate: date,
      });
    setFormData((prev) => ({
      ...prev,
      ...options,
    }));
  };

  // Handle change for target Audience
  const changeTargetAudience = (value, add = true) => {

    let targets = Array.isArray(formData?.targetAudience) ? [...formData.targetAudience] : [];

    if (add) {
      targets.push(value);
      targets = [...new Set(targets)];
    } else {
      if (targets.length === 1) return;
      let index = value;
      targets.splice(index, 1);
    }
    setFormData((prev) => ({
      ...prev,
      targetAudience: targets,
    }));
  };


  // add new tag
  const addRemoveTagFunction = (index = null) => {
    // Ensure `tags` is an array
    let update = Array.isArray(formData?.tags) ? [...formData.tags] : [];

    if (index !== null) {
      update.splice(index - 1, 1); // Remove the tag at the given index
    } else {
      update.push(''); // Add a new empty tag
    }

    setFormData((prev) => ({
      ...prev,
      tags: update,
    }));
  };


  const changeTagHandler = (e, index) => {
    let update = Array.isArray(formData?.tags) ? [...formData.tags] : [];
    update[index] = e.target.value;

    setFormData((prev) => ({
      ...prev,
      tags: update,
    }));
  };

  const validateFormFunction = () => {
    let newErrors = {};
    let updateFormData = {};

    Object.keys(formData).forEach((key) => {
      let error = null;

      if (key === 'contactInfo') {
        Object.keys(formData['contactInfo']).forEach((property) => {
          error = validateFieldFunc(property, formData['contactInfo'][property], true);
          if (error) {
            newErrors[key]
              ? (newErrors['contactInfo'][property] = error)
              : (newErrors['contactInfo'] = { [property]: error });
            error = null;
          }
        });
      } else if (key === 'speakers') {
        Object.keys(formData['speakers']).forEach((property, index) => {
          error = validateFieldFunc('name', formData['speakers'][index]['name'], true);
          if (error) {
            newErrors[key]
              ? (newErrors['speakers'][index] = error)
              : (newErrors['speakers'] = { [index]: error });
            error = null;
          }
        });
      } else if (key === 'tags') {
        Object.keys(formData['tags']).forEach((property, index) => {
          error = validateFieldFunc('tagTitle', formData['tags'][index]);
          if (error) {
            newErrors[key]
              ? (newErrors['tags'][index] = error)
              : (newErrors['tags'] = { [index]: error });
            error = null;
          }
        });
      } else {
        error = validateFieldFunc(key, formData[key]);

        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormFunction()) {
      const json = {
        ...formData,
        startDate: moment(formData.startDate).utc().format(),
        endDate: moment(formData.endDate).utc().format(),
        time: moment(formData.time).utc().format(),
      };

      if (eventId) {
        // Update event
        const response = await updateEventAction(eventId, json);
        if (response[2] === 200) {
          toast.success('Event updated successfully');
          const updatedDocs = allEvents.docs.map((event) =>
            event._id === eventId
              ? { ...response[1]?.data }
              : { ...event }
          );

          const updatedPayload = {
            ...allEvents,
            docs: updatedDocs,
          };

          await dispatch({
            type: COMMUNITY_EVENTS.success,
            payload: updatedPayload,
          });

          navigate('/admin/events');
        } else {
          toast.error(response[1]?.message);
        }
      } else {
        // Create event
        const response = await addNewEventAction(json);
        if (response[0] === 201) {
          toast.success('Event created successfully');
          const newEvent = response[1]?.data || json;

          const updatedPayload = {
            ...allEvents,
            docs: [...allEvents.docs, newEvent],
          };

          await dispatch({
            type: COMMUNITY_EVENTS.success,
            payload: updatedPayload,
          });

          navigate('/admin/events');
        } else {
          toast.error(response[1]?.message);
        }
      }
    }
  };


  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Title</label>
          <Input
            name="title"
            value={formData?.title}
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
            value={formData?.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the event"
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors?.description}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Type</label>
          <Select name="type" value={formData?.type} onValueChange={handleTypeEventChange}>
            <SelectTrigger className={errors?.type ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventCategoryNames &&
                eventCategoryNames?.map((singleCategory) => (
                  <SelectItem key={singleCategory?._id} value={singleCategory?._id}>{singleCategory?.name}</SelectItem>
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
              selected={formData?.startDate}
              onSelect={(date) => changeDateHandler(date, 'startDate')}
              disabled={(date) => date < new Date()}
            // initialFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <Calendar
              mode="single"
              name="endDate"
              selected={formData?.endDate}
              onSelect={(date) => changeDateHandler(date, 'endDate')}
              disabled={(date) => date < formData?.startDate}
            // initialFocus
            />
          </div>
        </div>

        {/* Event Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Time</label>
          <Input
            name="time"
            value={moment(formData?.time).format('HH:mm')}
            onChange={handleChange}
            placeholder="Enter event title"
            type="time"
          />
        </div>

        {/* Event Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Location</label>
          <Input
            name="location"
            value={formData?.location}
            onChange={handleChange}
            placeholder="Enter event location"
            className={errors?.location ? 'border-red-500' : ''}
          />
          {errors?.location && <p className="text-red-500 text-xs mt-1">{errors?.location}</p>}
        </div>

        {/* Speakers Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Speakers</label>
          {Array.isArray(formData?.speakers) && formData?.speakers?.map((speaker, index) => (
            <div key={index} className=" flex gap-4 mb-4">
              <div>
                <Input
                  placeholder="Speaker Name"
                  value={speaker?.name}
                  onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                />
                {errors?.speakers?.[index] && (
                  <p className="text-red-500 text-xs mt-1">{errors?.speakers?.[index]}</p>
                )}
              </div>
              <Input
                placeholder="Speaker Description"
                value={speaker?.bio}
                onChange={(e) => handleSpeakerChange(index, 'bio', e.target.value)}
              />
              {formData?.speakers?.length !== 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="px-8"
                  onClick={() => removeSpeaker(index)}
                >
                  <Trash2 className="h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSpeaker}>
            <Plus className="mr-2 h-4 w-4" /> Add Speaker
          </Button>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium mb-2">Target Audience</label>
          <div className="mb-3 flex gap-4 flex-wrap">
            {Array.isArray(formData?.targetAudience) && formData?.targetAudience?.map((singleTarget, index) => (
              <Badge className={'p-2 capitalize'} key={singleTarget + index}>
                {singleTarget}{' '}
                {formData?.targetAudience?.length !== 1 && (
                  <Trash2
                    className="h-3 hover:text-red-400 cursor-pointer"
                    onClick={() => changeTargetAudience(index, false)}
                  />
                )}
              </Badge>
            ))}
          </div>
          <Select
            name="targetAudience"
            // value={formData.}
            onValueChange={changeTargetAudience}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {targetAudienceOptions?.map((singleTarget) => (
                <SelectItem value={singleTarget?.value}>{singleTarget?.value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex justify-between flex-wrap">
            {Array.isArray(formData?.tags) && formData?.tags?.map((singleTag, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div>
                  <Input
                    placeholder="Speaker Name"
                    value={singleTag}
                    onChange={(e) => changeTagHandler(e, index)}
                    className={errors?.tags?.[index] ? 'border-red-500' : ''}
                  />
                  {errors?.tags?.[index] && (
                    <p className="text-red-500 text-xs mt-1">{errors?.tags?.[index]}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="px-8"
                  onClick={() => addRemoveTagFunction(index + 1)}
                >
                  <Trash2 className="h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={() => addRemoveTagFunction(null)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Tag
          </Button>
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium mb-2">Contact Details</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Input
                name="name"
                value={formData?.contactInfo?.name}
                onChange={handleContactChange}
                placeholder="Contact Name"
                className={errors?.contactInfo?.name ? 'border-red-500' : ''}
              />
              {errors?.contactInfo?.name && (
                <p className="text-red-500 text-xs mt-1">{errors?.contactInfo?.name}</p>
              )}
            </div>

            <div>
              <Input
                name="email"
                value={formData?.contactInfo?.email}
                onChange={handleContactChange}
                placeholder="Contact Email"
                className={errors?.contactInfo?.email ? 'border-red-500' : ''}
              />

              {errors?.contactInfo?.email && (
                <p className="text-red-500 text-xs mt-1">{errors?.contactInfo?.email}</p>
              )}
            </div>

            <div>
              <Input
                name="phone"
                value={formData?.contactInfo?.phone}
                onChange={handleContactChange}
                placeholder="Contact Phone"
                className={errors?.contactInfo?.phone ? 'border-red-500' : ''}
              />
              {errors?.contactInfo?.phone && (
                <p className="text-red-500 text-xs mt-1">{errors?.contactInfo?.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {eventId ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </Mainwrapper>
  );
}

export default CreateEventForm;
