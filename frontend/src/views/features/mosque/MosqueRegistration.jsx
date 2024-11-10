import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
// import { ScrollArea } from '@/components/ui/scroll-area';
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
  const [info, setInfo] = useState({
    address: {
      street: '',
      city: '',
      state: '',
      stateCode: '',
      country: '',
      countryCode: '',
      postalCode: '',
    },
    administrator: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
    mosqueInfo: {
      name: '',
      established: '',
      phone: '',
      email: '',
      website: '',
      slug: '',
    },
  });

  const [error, setError] = useState({});

  const validateField = (section, key, value) => {
    const validateRules = {
      address: {
        street: () => (value.trim() === '' ? 'Street is required' : null),
        city: () => (value.trim() === '' ? 'City is required' : null),
        stateCode: () => (value.trim() === '' ? 'State is required' : null),
        countryCode: () => (value.trim() === '' ? 'Country is required' : null),
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
        established: () =>
          value.trim() === ''
            ? null
            : !validator.isDate(value, 'YYYY-MM-DD')
              ? 'Invalid date'
              : null,
        phone: () => (!validator.isMobilePhone(value, 'any') ? 'Invalid phone number' : null),
        email: () => (!validator.isEmail(value) ? 'Invalid email address' : null),
        website: () => (value !== '' && !validator.isURL(value) ? 'Invalid website URL' : null),
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
        console.log(error);
        if (error) {
          newErrors[section]
            ? (newErrors[section][property] = error)
            : (newErrors[section] = { [property]: error });
        }
      });
    });

    console.log(newErrors);
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mosqueInfoHandleChangeFunc = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'name') {
      const newSlug = slugify(value, { lower: true, strict: true });
      setInfo((prev) => ({
        ...prev,
        mosqueInfo: { ...prev.mosqueInfo, slug: newSlug, name: value },
      }));
    } else if (name === 'slug') {
      const newSlug = slugify(value, { lower: true, strict: true });
      console.log(newSlug);
      setInfo((prev) => ({ ...prev, mosqueInfo: { ...prev.mosqueInfo, slug: newSlug } }));
    } else {
      setInfo((prev) => ({ ...prev, mosqueInfo: { ...prev.mosqueInfo, [name]: value } }));
    }
    let newError = validateField('mosqueInfo', [name], value);
    setError((prev) => ({
      ...prev,
      mosqueInfo: { ...prev?.mosqueInfo, [name]: newError },
    }));
  };

  const addressHandleChangeFunc = (e, name) => {
    const updateData = {};
    console.log(e);
    if (name === 'city') {
      updateData[name] = e;
    }
    if (name == 'country' || name === 'state') {
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
    setError((prev) => ({
      ...prev,
      administrator: { ...prev?.ad, [name]: newError },
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const havingErrors = validateAllErrors();
    if (!havingErrors) return;
  };

  return (
    <div className="  w-[90%] m-auto py-6 px-4 ">
      <h1 className=" text-center text-3xl font-bold my-4">Mosque Registration Form</h1>
      <form className="space-y-8" onSubmit={submitFormHandler}>
        {/* Basic Mosque Information */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Mosque Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mosqueName">
                  Mosque Name <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="mosqueName"
                  placeholder="Enter mosque name"
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
                  Mosque Slug <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="mosqueSlug"
                  placeholder="Enter mosque slug"
                  name="slug"
                  value={info?.mosqueInfo?.slug}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.slug && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.slug}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="established">Establishment Date</Label>
                <Input
                  id="established"
                  type="date"
                  name="established"
                  value={info?.mosqueInfo?.established}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.established && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.established}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className=" text-red-600">*</span>{' '}
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
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
                  Email <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={info?.mosqueInfo?.email}
                  onChange={mosqueInfoHandleChangeFunc}
                />
                {error?.mosqueInfo?.email && (
                  <span className="text-red-600 text-[10px]">{error?.mosqueInfo?.email}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="Enter website URL"
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
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">
                  Street Address <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="street"
                  placeholder="Enter street address"
                  value={info?.address?.street}
                  onChange={(e) => addressHandleChangeFunc(e, 'street')}
                />
                {error?.address?.street && (
                  <span className="text-red-600 text-[10px]">{error?.address?.street}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">
                  Country <span className=" text-red-600">*</span>
                </Label>
                <Select onValueChange={(e) => addressHandleChangeFunc(e, 'country')}>
                  <SelectTrigger className=" bg-transparent">
                    <SelectValue
                      placeholder="Select country"
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
                {error?.address?.country && (
                  <span className="text-red-600 text-[10px]">{error?.address?.country}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State/Province <span className=" text-red-600">*</span>
                </Label>
                <Select
                  onValueChange={(e) => addressHandleChangeFunc(e, 'state')}
                  disabled={info?.address?.country ? false : true}
                >
                  <SelectTrigger className=" bg-transparent">
                    <SelectValue
                      placeholder="Select state"
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
                {error?.address?.state && (
                  <span className="text-red-600 text-[10px]">{error?.address?.state}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  City <span className=" text-red-600">*</span>
                </Label>
                <Select
                  onValueChange={(e) => addressHandleChangeFunc(e, 'city')}
                  disabled={info?.address?.state ? false : true}
                >
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Select City" value={info?.address?.city} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {City.getCitiesOfState(
                        info?.address?.countryCode,
                        info?.address?.stateCode
                      )?.map((singleCity) => (
                        <SelectItem value={singleCity?.name} key={singleCity?.name}>
                          {singleCity?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error?.address?.street && (
                  <span className="text-red-600 text-[10px]">{error?.address?.city}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">
                  Postal Code <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="postalCode"
                  placeholder="Enter postal code"
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
            <CardTitle>Capacity Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regularCapacity">Regular Capacity</Label>
                <Input id="regularCapacity" type="number" placeholder="Enter regular capacity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fridayCapacity">Friday Capacity</Label>
                <Input id="fridayCapacity" type="number" placeholder="Enter Friday capacity" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Information */}
        <Card>
          <CardHeader>
            <CardTitle>Administrator Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">
                  Name <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="adminName"
                  placeholder="Enter your name"
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
                  Email <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="Enter your email"
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
                  Password <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={info?.administrator?.password || ''}
                  onChange={administratorsChangeHandler}
                />
                {error?.administrator?.password && (
                  <span className="text-red-600 text-[10px]">{error?.administrator?.password}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">
                  Phone <span className=" text-red-600">*</span>
                </Label>
                <Input
                  id="adminPhone"
                  type="phone"
                  placeholder="Enter your Phone"
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
            <CardTitle>Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center space-x-2">
                  <Checkbox id={facility.id} />
                  <Label htmlFor={facility.id}>{facility.label}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prayer Times */}
        <Card>
          <CardHeader>
            <CardTitle>Prayer Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Jumma'].map((prayer) => (
                <div key={prayer}>
                  <h3 className="text-lg font-semibold mb-4">
                    {prayer} <span className=" text-red-600">*</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${prayer.toLowerCase()}-azaan`}>Azaan Time</Label>
                      <Input id={`${prayer.toLowerCase()}-azaan`} type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${prayer.toLowerCase()}-jamaat`}>Jamaat Time</Label>
                      <Input id={`${prayer.toLowerCase()}-jamaat`} type="time" />
                    </div>
                    {prayer === 'Jumma' && (
                      <div className="space-y-2">
                        <Label htmlFor="qutba">Qutba Time</Label>
                        <Input id="qutba" type="time" />
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
            Register Mosque
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MosqueRegistrationForm;
