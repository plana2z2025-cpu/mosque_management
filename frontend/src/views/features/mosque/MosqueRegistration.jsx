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
// import Select from 'react-select';

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
      country: '',
      postalCode: '',
    },
    administrator: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const addressHandleChangeFunc = (e, name) => {
    const updateData = {};
    if (name == 'country' || name === 'state' || name === 'city') {
      updateData[name] = e;
    } else {
      updateData[name] = e.target.value;
    }
    setInfo((prev) => ({ ...prev, address: { ...prev.address, ...updateData } }));
  };

  const administratorsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, administrator: { ...prev.administrator, [name]: value } }));
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <form className="space-y-8">
        {/* Admin Information */}
        <Card>
          <CardHeader>
            <CardTitle>Administrator Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">Name</Label>
                <Input
                  id="adminName"
                  placeholder="Enter your name"
                  name="name"
                  value={info?.administrator?.name || ''}
                  onChange={administratorsChangeHandler}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={info?.administrator?.email || ''}
                  onChange={administratorsChangeHandler}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={info?.administrator?.password || ''}
                  onChange={administratorsChangeHandler}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Phone</Label>
                <Input
                  id="adminPhone"
                  type="phone"
                  placeholder="Enter your Phone"
                  name="phone"
                  value={info?.administrator?.phone || ''}
                  onChange={administratorsChangeHandler}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Mosque Information */}
        <Card>
          <CardHeader>
            <CardTitle>Mosque Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mosqueName">Mosque Name</Label>
                <Input id="mosqueName" placeholder="Enter mosque name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="established">Establishment Date</Label>
                <Input id="established" type="date" />
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
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" placeholder="Enter street address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={(e) => addressHandleChangeFunc(e, 'country')}>
                  <SelectTrigger className=" bg-transparent">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Country.getAllCountries()?.map((singleCountry) => (
                        <SelectItem value={singleCountry.isoCode} key={singleCountry?.isoCode}>
                          {singleCountry?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Select
                  onValueChange={(e) => addressHandleChangeFunc(e, 'state')}
                  disabled={info?.address?.country ? false : true}
                >
                  <SelectTrigger className=" bg-transparent">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {State.getStatesOfCountry(info?.address?.country)?.map((singleState) => (
                        <SelectItem value={singleState?.isoCode} key={singleState?.isoCode}>
                          {singleState?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">City</Label>
                <Select
                  onValueChange={(e) => addressHandleChangeFunc(e, 'city')}
                  disabled={info?.address?.state ? false : true}
                >
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {City.getCitiesOfState(info?.address?.country, info?.address?.state)?.map(
                        (singleCity) => (
                          <SelectItem value={singleCity?.name} key={singleCity?.name}>
                            {singleCity?.name}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="Enter postal code" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="Enter website URL" />
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
                  <h3 className="text-lg font-semibold mb-4">{prayer}</h3>
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
