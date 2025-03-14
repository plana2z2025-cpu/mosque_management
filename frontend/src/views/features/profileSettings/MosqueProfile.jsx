import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { mosqueActions } from '../../../redux/combineActions';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Pencil, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

// import toast from 'react-hot-toast';

const roleDisplayConstant = {
  admin: 'Owner',
  user: 'User',
  supper_admin: 'Super Admin',
};

const INITIAL_STATE = {
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
  profile: {},
};

const breadCumbs = [{ label: 'Mosque Profile', href: null }];

const MosqueProfile = () => {
  //   const { t } = useTranslation();
  //   const translation = t('registration');
  const translation = useTranslation().t('registration') || {};
  const dispatch = useDispatch();
  const { profileDetails } = useSelector((state) => state.userProfileState);
  const { communityMosqueSettings, communityMosqueDetail } = useSelector(
    (state) => state.mosqueState
  );
  const { updateMosqueSettingsAction, updateMosqueProfileAction } = mosqueActions;
  const [info, setInfo] = useState(INITIAL_STATE);
  const [fileUploadImage, setFileUploadImage] = useState(null);
  const [error, setError] = useState({});
  const openFileInput = useRef(null);

  useEffect(() => {
    if (communityMosqueDetail) {
      setInfo((prev) => ({
        ...prev,
        mosqueInfo: {
          name: communityMosqueDetail?.name || '',
          phone: communityMosqueDetail?.contactInfo?.phone || '',
          email: communityMosqueDetail?.contactInfo?.email || '',
          website: communityMosqueDetail?.contactInfo?.website || '',
          slug: communityMosqueDetail.slug || '',
          slugName: communityMosqueDetail.slug || '',
        },
        aboutInfo: {
          established: communityMosqueDetail?.aboutInfo?.established
            ? moment(communityMosqueDetail?.aboutInfo?.established, 'YYYY-MM-DD')
            : '',
          capacity: {
            regular: communityMosqueDetail?.aboutInfo?.capacity?.regular || 0,
            friday: communityMosqueDetail?.aboutInfo?.capacity?.friday || 0,
          },
        },
        profile: {
          ...(communityMosqueDetail?.profile || {}),
        },
      }));
    }
  }, [communityMosqueDetail]);

  const applicationChangeHandler = useCallback(
    (e, key) => {
      const json = {};
      if (key === 'ramadanTimingsVisible') {
        json[key] = e;
      } else if (key === 'queryFormVisible') {
        json[key] = e;
      }

      dispatch(updateMosqueSettingsAction(json));
    },
    [communityMosqueSettings]
  );

  const mosqueInfoHandleChangeFunc = useCallback((e) => {}, []);

  const aboutInfoHandlerChangeFunc = useCallback((e) => {}, []);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      toast.loading('Uploading Image...');
      const reader = new FileReader();
      reader.onload = async (e) => {
        const formData = new FormData();
        setFileUploadImage(e.target.result);
        formData.append('mosqueProfile', file);
        const response = await updateMosqueProfileAction(formData);
        toast.dismiss();
        if (response[0] === true) {
          toast.success('Image Uploaded Successfully');
        } else {
          toast.error(response[1]?.message || 'Image Upload Failed');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      {/* Mosque Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Mosque Details</CardTitle>
          <CardDescription>
            Update Mosque information and manage your mosque settings.
          </CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>{translation['profile-image']}</CardTitle>
          <CardDescription>Upload or update your mosque's profile image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {info?.profile?.url ? (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={fileUploadImage ?? info.profile?.url}
                    alt="Mosque profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <button
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                onClick={() => openFileInput.current.click()}
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center">
              <Label
                htmlFor="profileImageInput"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Change Profile Image
              </Label>
              <div className="flex items-center justify-center">
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={openFileInput}
                  onChange={handleProfileImageChange}
                />
                <Button variant="outline" size="sm" onClick={() => openFileInput.current.click()}>
                  Browse Image
                </Button>
                {info?.profile?.public_id && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 text-red-500 hover:text-red-700"
                    // onClick={removeProfileImage}
                  >
                    Remove Image
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capacity Information */}
      <Card>
        <CardHeader>
          <CardTitle>{translation['capacity-information']}</CardTitle>
          <CardDescription>
            Update your mosque capacity information and manage your mosque settings.
          </CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your application preferences and features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ramadan Timings Setting */}
          <div className="flex flex-row items-center justify-between space-y-2">
            <div>
              <Label htmlFor="ramadan-timings" className="text-base">
                Ramadan Timings
              </Label>
              <p className="text-sm text-muted-foreground">
                Show prayer and iftar timings during Ramadan month. This will display a special
                calendar with accurate timings for your location.
              </p>
            </div>
            <Switch
              id="ramadan-timings"
              checked={communityMosqueSettings?.ramadanTimingsVisible || false}
              onCheckedChange={(e) => applicationChangeHandler(e, 'ramadanTimingsVisible')}
            />
          </div>
          <div className="h-px bg-border" /> {/* Divider */}
          {/* Query Form Setting */}
          <div className="flex flex-row items-center justify-between space-y-2">
            <div>
              <Label htmlFor="query-form" className="text-base">
                Query Form
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable the query form feature to submit questions or requests. This helps us provide
                better assistance and support for your needs.
              </p>
            </div>
            <Switch
              id="query-form"
              checked={communityMosqueSettings?.queryFormVisible || false}
              onCheckedChange={(e) => applicationChangeHandler(e, 'queryFormVisible')}
            />
          </div>
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default memo(MosqueProfile);
