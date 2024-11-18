import React, { memo } from 'react';
import '../../../assets/css/welcome.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
const languagesItems = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'عربي' },
  { value: 'ur', label: 'اردو' },
];

const Welcome = () => {
  useGSAP(() => {
    gsap.from('.welcomeContainer', {
      x: -1200,
      duration: 3.5,
    });
  });
  const { t, i18n } = useTranslation();

  const changeTranslation = (e) => {
    i18n.changeLanguage(e);
  };

  return (
    <div
      className="relative flex justify-between items-center w-full h-16 overflow-hidden welcomeContainer p-6"
      style={{ backgroundImage: 'url("/assets/svgs/home/welcome.svg")' }}
    >
      <h1 className=" text-md text-center  ">
        السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
      </h1>

      <div className="flex gap-3">
        {/* <h1 className=" text-md text-center  ">
          {t('home.welcome')}
          <br />
          {t('home.masjidname')}
        </h1> */}

        <Select onValueChange={changeTranslation}>
          <SelectTrigger className="w-22 bg-transparent">
            <SelectValue placeholder="English" value="en" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languagesItems?.map(({ value, label }) => (
                <SelectItem value={value} key={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default memo(Welcome);
