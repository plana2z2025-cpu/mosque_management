import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Country, State, City } from 'country-state-city';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import validator from 'validator';
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';
import { mosqueActions } from '../../../redux/combineActions';
import toast from 'react-hot-toast';

const facilities = [
  { id: 'parking', label: 'Parking' },
  { id: 'wudu_area', label: 'Wudu Area' },
  { id: 'women_section', label: 'Women Section' },
  { id: 'wheelchair_access', label: 'Wheelchair Access' },
  { id: 'funeral_service', label: 'Funeral Service' },
  { id: 'marriage_hall', label: 'Marriage Hall' },
  { id: 'library', label: 'Library' },
  { id: 'islamic_school', label: 'Islamic School' },
];

const MosqueRegistrationForm = () => {
  const { t } = useTranslation();
  const translation = t('registration');

  const { checkEmailAvailabilityAction, checkSlugAvailabilityAction, registerMosqueAction } =
    mosqueActions;

  const [info, setInfo] = useState({
    address: {
      street: '',
      city: '',
      state: '',
      stateCode: '',
      country: '',
      countryCode: '',
      postalCode: '',
      coordinates: {
        latitude: null,
        longitude: null,
      },
    },
    administrator: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
    mosqueInfo: {
      name: '',
      phone: '',
      email: '',
      website: '',
      slug: '',
      slugName: '',
    },
    aboutInfo: {
      established: '',
      capacity: {
        regular: 0,
        friday: 0,
      },
    },
    timings: {
      fajr: {
        azaan: '05:15',
        jamaat: '05:30',
      },
      dhuhr: {
        azaan: '12:30',
        jamaat: '12:45',
      },
      asr: {
        azaan: '15:45',
        jamaat: '16:00',
      },
      maghrib: {
        azaan: '18:30',
        jamaat: '18:45',
      },
      isha: {
        azaan: '20:00',
        jamaat: '20:15',
      },
      jumma: {
        azaan: '13:15',
        jamaat: '13:30',
        qutba: '13:10',
      },
    },
  });
  const [error, setError] = useState({});
  const [debounceState, setDebounceState] = useState({
    isSlugAvailable: null,
    isEmailAvailable: null,
  });

  const validateField = (section, key, value) => {
    const validateRules = {
      address: {
        street: () => (value?.trim() === '' ? 'Street is required' : null),
        city: () => (value?.trim() === '' ? 'City is required' : null),
        stateCode: () => (value?.trim() === '' ? 'State is required' : null),
        countryCode: () => (value?.trim() === '' ? 'Country is required' : null),
        postalCode: () => (!validator.isPostalCode(value, 'any') ? 'Invalid postal code' : null),
      },
      administrator: {
        name: () => (value.trim() === '' ? 'Name is required' : null),
        email: () => (!validator.isEmail(value) ? 'Invalid email address' : null),
        password: () => (value.length < 6 ? 'Password must be at least 8 characters' : null),
        phone: () => (!validator.isMobilePhone(value, 'any') ? 'Invalid phone number' : null),
      },
      mosqueInfo: {
        name: () => (value.trim() === '' ? 'Mosque name is required' : null),
        slug: () => (value.trim() === '' ? 'Slug is required' : null),
        phone: () => (!validator.isMobilePhone(value, 'any') ? 'Invalid phone number' : null),
        email: () => (!validator.isEmail(value) ? 'Invalid email address' : null),
        website: () => (value !== '' && !validator.isURL(value) ? 'Invalid website URL' : null),
      },
      aboutInfo: {
        established: () =>
          value.trim() === ''
            ? null
            : !validator.isDate(value, 'YYYY-MM-DD')
              ? 'Invalid date'
              : null,
      },
    };

    const validateNow = validateRules?.[section]?.[key]?.() || null;
    return validateNow ? validateNow : null;
  };

  const validateAllErrors = () => {
    let newErrors = {};

    Object.keys(info).forEach((section) => {
      Object.keys(info[section]).forEach((property) => {
        const error = validateField(section, property, info?.[section]?.[property]);
        if (error) {
          newErrors[section]
            ? (newErrors[section][property] = error)
            : (newErrors[section] = { [property]: error });
        }
      });
    });

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mosqueInfoHandleChangeFunc = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const newSlug = slugify(value, { lower: true, strict: true });
      setInfo((prev) => ({
        ...prev,
        mosqueInfo: { ...prev.mosqueInfo, slug: newSlug, name: value, slugName: newSlug },
      }));
      handleDebounceSearch(newSlug, 'slug');
    } else if (name === 'slug') {
      const newSlug = slugify(value, { lower: true, strict: true });
      setInfo((prev) => ({
        ...prev,
        mosqueInfo: { ...prev.mosqueInfo, slug: newSlug, slugName: value.trim().toLowerCase() },
      }));
      handleDebounceSearch(newSlug, 'slug');
    } else {
      setInfo((prev) => ({ ...prev, mosqueInfo: { ...prev.mosqueInfo, [name]: value } }));
    }
    let newError = validateField('mosqueInfo', [name], value);
    setError((prev) => ({
      ...prev,
      mosqueInfo: { ...prev?.mosqueInfo, [name]: newError },
    }));
  };

  const aboutInfoHandlerChangeFunc = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updateData = {
      capacity: { ...info?.aboutInfo?.capacity },
    };
    if (name === 'regular') {
      updateData.capacity.regular = value || 0;
    } else if (name === 'friday') {
      updateData.capacity.friday = value || 0;
    } else {
      updateData[name] = value;
    }
    setInfo((prev) => ({ ...prev, aboutInfo: { ...prev.aboutInfo, ...updateData } }));
  };

  const addressHandleChangeFunc = (e, name) => {
    const updateData = {};
    if (name === 'city') {
      const [cityName, latitude, longitude] = e.split('+');
      updateData.city = cityName;
      updateData.coordinates = {
        latitude,
        longitude,
      };
    } else if (name == 'country' || name === 'state') {
      updateData[name] = e.split('+')[1];
      updateData[name + 'Code'] = e.split('+')[0];
    } else {
      updateData[name] = e?.target?.value;
    }
    setInfo((prev) => ({ ...prev, address: { ...prev.address, ...updateData } }));
    let newError = validateField('administrator', name, updateData[name]);
    setError((prev) => ({
      ...prev,
      address: { ...prev?.address, [name]: newError },
    }));
  };

  const administratorsChangeHandler = (e) => {
    const { name, value } = e.target;

    setInfo((prev) => ({ ...prev, administrator: { ...prev.administrator, [name]: value } }));
    let newError = validateField('administrator', name, value);
    if (name === 'email' && !newError) {
      handleDebounceSearch(value);
    }
    setError((prev) => ({
      ...prev,
      administrator: { ...prev?.ad, [name]: newError },
    }));
  };

  const timingsChangeHandler = (e) => {
    const { name, value } = e.target;
    const [salaah, type] = name.split('-');
    setInfo((prev) => ({
      ...prev,
      timings: { ...prev.timings, [salaah]: { ...prev.timings[salaah], [type]: value } },
    }));
  };

  const fetchEmailValidationHandler = async (email) => {
    const json = { email };
    const response = await checkEmailAvailabilityAction(json);
    let message = null;
    if (response[0] === true) {
      message = response[1]?.isAvailable ? null : 'Email is Already Registered';
    } else {
      message = response[1]?.message;
    }
    const administratorData =
      Object.keys(info?.administrator || {}) === 0
        ? { email: message }
        : { ...error?.administrator, email: message };
    setError((prev) => ({ ...prev, administrator: { ...administratorData } }));
    setDebounceState((prev) => ({ ...prev, isEmailAvailable: null }));
  };

  const fetchSlugValidationHandler = async (slug) => {
    const json = { slug };
    const response = await checkSlugAvailabilityAction(json);
    let message = null;
    if (response[0] === true) {
      message = response[1]?.isAvailable ? null : 'Slug is not available';
    } else {
      message = response[1]?.message;
    }
    const mosqueData =
      Object.keys(info?.mosqueInfo || {}) === 0
        ? { email: message }
        : { ...error?.mosqueInfo, slug: message };
    setError((prev) => ({ ...prev, mosqueInfo: { ...mosqueData } }));
    setDebounceState((prev) => ({ ...prev, isSlugAvailable: null }));
  };

  const handleDebounceSearch = (value, type = 'email') => {
    clearInterval(
      type === 'email' ? debounceState?.isEmailAvailable : debounceState?.isSlugAvailable
    );
    const timeOut = setTimeout(() => {
      type === 'email' ? fetchEmailValidationHandler(value) : fetchSlugValidationHandler(value);
    }, 800);
    const data = type === 'email' ? { isEmailAvailable: timeOut } : { isSlugAvailable: timeOut };
    setDebounceState((prev) => ({ ...prev, ...data }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    let allValues = Object.values(error).flatMap((value) => Object.values(value));

    if (allValues.length !== 0 && allValues.every((item) => item !== null)) {
      return;
    }

    const havingErrors = validateAllErrors();
    if (!havingErrors) {
      const element = document.getElementById('registration-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }

      return;
    }

    const json = {
      name: info?.mosqueInfo?.name,
      slug: info?.mosqueInfo?.slug,
      address: info?.address,
      contactInfo: {
        phone: info?.mosqueInfo?.phone,
        email: info?.mosqueInfo?.email,
      },
      user: info?.administrator,
      aboutInfo: {
        capacity: info?.aboutInfo?.capacity,
      },
      timings: info?.timings,
    };

    if (info?.mosqueInfo?.website) {
      json.contactInfo.website = info?.mosqueInfo?.website;
    }
    if (info?.aboutInfo?.established) {
      json.aboutInfo.established = info?.aboutInfo?.established;
    }

    const response = await registerMosqueAction(json);
    if (response[0] === 201) {
      toast.success('Successfully Mosque is Registered');
    } else {
      toast.error(response[1]?.message);
    }
  };

  return (
    <div className="  w-[90%] m-auto py-6 px-4 ">
      <h1 className=" text-center text-3xl font-bold my-4">
        {translation['mosque-registration-form']}
      </h1>
      <form className="space-y-8" onSubmit={submitFormHandler} id="registration-form">
        {/* Basic Mosque Information */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{translation['mosque-information']}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mosqueName">
                  {translation['mosque-name']} <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="mosqueName"
                  placeholder={translation['enter-mosque-name']}
                  name="name"
                  value={info?.mosqueInfo?.name}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.name && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.name}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mosqueName">
                  {translation['mosque-slug']} <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="mosqueSlug"
                  placeholder={translation['enter-mosque-slug']}
                  name="slug"
                  value={info?.mosqueInfo?.slugName}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                <span className="text-gray-600 text-[10px]">
                  {' '}
                  <b>Your Slug:-</b> {info?.mosqueInfo?.slug}
                </span>
                <br />
                {error?.mosqueInfo?.slug && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.slug}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="established">{translation['establishment-date']}</Label>
                <Input
                  id="established"
                  type="date"
                  placeholder={translation['established']}
                  name="established"
                  value={info?.mosqueInfo?.established}
                  onChange={aboutInfoHandlerChangeFunc}
                />
                {error?.mosqueInfo?.established && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.established}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {translation['phone-number']} <span className=" text-red-600">*</span>{' '}
                </Label>
                <Input
                  id="phone"
                  placeholder={translation['enter-phone-number']}
                  name="phone"
                  value={info?.mosqueInfo?.phone}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.phone && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.phone}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  {translation['email']} <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={translation['enter-email']}
                  name="email"
                  value={info?.mosqueInfo?.email}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.email && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.email}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">{translation['website']}</Label>
                <Input
                  id="website"
                  placeholder={translation['enter-website-url']}
                  name="website"
                  value={info?.mosqueInfo?.website}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.website && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.website}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>{translation['address-information']}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">
                  {translation['street-address']} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="street"
                  placeholder={translation['enter-street-address']}
                  value={info?.address?.street}
                  onChange={(e) => addressHandleChangeFunc(e, 'street')}
                />
                {error?.address?.street && (
                  <span className="text-red-600 text-[10px]">{error?.address?.street}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">
                  {translation['country']} <span className="text-red-600">*</span>
                </Label>
                <Select onValueChange={(e) => addressHandleChangeFunc(e, 'country')}>
                  <SelectTrigger className="bg-transparent">
                    <SelectValue
                      placeholder={translation['select-country']}
                      value={info?.address?.countryCode + '+' + info?.address?.country}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Country.getAllCountries()?.map((singleCountry) => (
                        <SelectItem
                          value={singleCountry?.isoCode + '+' + singleCountry?.name}
                          key={singleCountry?.isoCode}
                        >
                          {singleCountry?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error?.address?.countryCode && (
                  <span className="text-red-600 text-[10px]">{error?.address?.countryCode}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  {translation['state/province']} <span className="text-red-600">*</span>
                </Label>
                <Select
                  onValueChange={(e) => addressHandleChangeFunc(e, 'state')}
                  disabled={info?.address?.country ? false : true}
                >
                  <SelectTrigger className="bg-transparent">
                    <SelectValue
                      placeholder={translation['select-state']}
                      value={info?.address?.stateCode + info?.address?.state}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {State.getStatesOfCountry(info?.address?.countryCode)?.map((singleState) => (
                        <SelectItem
                          value={singleState?.isoCode + '+' + singleState?.name}
                          key={singleState?.isoCode}
                        >
                          {singleState?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error?.address?.stateCode && (
                  <span className="text-red-600 text-[10px]">{error?.address?.stateCode}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  {translation['city']} <span className="text-red-600">*</span>
                </Label>
                <Select
                  onValueChange={(e) => addressHandleChangeFunc(e, 'city')}
                  disabled={info?.address?.state ? false : true}
                >
                  <SelectTrigger className="bg-transparent">
                    <SelectValue
                      placeholder={translation['select-city']}
                      value={info?.address?.city}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {City.getCitiesOfState(
                        info?.address?.countryCode,
                        info?.address?.stateCode
                      )?.map((singleCity) => (
                        <SelectItem
                          value={
                            singleCity?.name +
                            '+' +
                            singleCity?.latitude +
                            '+' +
                            singleCity?.longitude
                          }
                          key={singleCity?.name}
                        >
                          {singleCity?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error?.address?.city && (
                  <span className="text-red-600 text-[10px]">{error?.address?.city}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">
                  {translation['postal-code']} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="postalCode"
                  placeholder={translation['enter-postal-code']}
                  name="postalCode"
                  value={info?.address?.postalCode}
                  onChange={(e) => addressHandleChangeFunc(e, 'postalCode')}
                />
                {error?.address?.postalCode && (
                  <span className="text-red-600 text-[10px]">{error?.address?.postalCode}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacity Information */}
        <Card>
          <CardHeader>
            <CardTitle>{translation['capacity-information']}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regularCapacity">{translation['regular-capacity']}</Label>
                <Input
                  id="regularCapacity"
                  type="number"
                  name="regular"
                  value={info?.aboutInfo?.capacity?.regular}
                  placeholder={translation['enter-regular-capacity']}
                  onChange={aboutInfoHandlerChangeFunc}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fridayCapacity">{translation['friday-capacity']}</Label>
                <Input
                  id="fridayCapacity"
                  type="number"
                  name="friday"
                  value={info?.aboutInfo?.capacity?.friday}
                  placeholder={translation['enter-friday-capacity']}
                  onChange={aboutInfoHandlerChangeFunc}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Information */}
        <Card>
          <CardHeader>
            <CardTitle>{translation['administrator-information']}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">
                  {translation['name']} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="adminName"
                  placeholder={translation['enter-your-name']}
                  name="name"
                  value={info?.administrator?.name || ''}
                  onChange={administratorsChangeHandler}
                />
                {error?.administrator?.name && (
                  <span className="text-red-600 text-[10px]">{error?.administrator?.name}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">
                  {translation['email']} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder={translation['enter-email']}
                  name="email"
                  value={info?.administrator?.email || ''}
                  onChange={administratorsChangeHandler}
                />
                {error?.administrator?.email && (
                  <span className="text-red-600 text-[10px]">{error?.administrator?.email}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">
                  {translation['password']} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder={translation['enter-your-password']}
                  name="password"
                  value={info?.administrator?.password || ''}
                  onChange={administratorsChangeHandler}
                />
                {error?.administrator?.password && (
                  <span className="text-red-600 text-[10px]">{error?.administrator?.password}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPhone">
                  {translation['phone']} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="adminPhone"
                  type="phone"
                  placeholder={translation['enter-your-phone']}
                  name="phone"
                  value={info?.administrator?.phone || ''}
                  onChange={administratorsChangeHandler}
                />
                {error?.administrator?.phone && (
                  <span className="text-red-600 text-[10px]">{error?.administrator?.phone}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>{translation['facilities']}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center space-x-2">
                  <Checkbox id={facility.id} />
                  <Label htmlFor={facility.id}>{translation[facility.label]}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prayer Times */}
        <Card>
          <CardHeader>
            <CardTitle>{translation['timings']}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.keys(info.timings).map((prayer) => (
                <div key={prayer}>
                  <h3 className="text-lg font-semibold mb-4 capitalize">
                    {prayer} <span className=" text-red-600">*</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${prayer.toLowerCase()}-azaan`}>
                        {translation['azaan-time']}
                      </Label>
                      <Input
                        name={`${prayer.toLowerCase()}-azaan`}
                        type="time"
                        value={info?.timings?.[prayer]?.azaan}
                        onChange={timingsChangeHandler}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${prayer.toLowerCase()}-jamaat`}>
                        {translation['jamaat-time']}
                      </Label>
                      <Input
                        name={`${prayer.toLowerCase()}-jamaat`}
                        type="time"
                        value={info?.timings?.[prayer]?.jamaat}
                        onChange={timingsChangeHandler}
                      />
                    </div>
                    {prayer === 'jumma' && (
                      <div className="space-y-2">
                        <Label htmlFor="qutba">{translation['qutba-time']}</Label>
                        <Input id="qutba" type="time" value={info?.timings?.[prayer]?.qutba} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            {translation['register-mosque']}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(MosqueRegistrationForm);
