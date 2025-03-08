import React, { memo, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';

const LoginComp = ({ toggleForm, loginSubmitHandlerFunction, changeHandlerFunction, loading }) => {
  const { t } = useTranslation();
  const [info, setInfo] = useState({
    showPassword: false,
  });

  const togglePasswordVisibility = useCallback(() => {
    setInfo((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  }, [info?.showPassword]);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('login.login')}</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={t('login.emailPlaceholder')}
              onChange={changeHandlerFunction}
              required
            />
          </div>
          {/* <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <div className="ml-auto inline-block text-sm underline">Forgot your password?</div>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={t('login.passwordPlaceholder')}
              onChange={changeHandlerFunction}
              onKeyDown={(e) => e.key === 'Enter' && loginSubmitHandlerFunction()}
              required
            />
          </div> */}

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <div className="ml-auto inline-block text-sm underline">Forgot your password?</div>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={info.showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('login.passwordPlaceholder')}
                onChange={changeHandlerFunction}
                onKeyDown={(e) => e.key === 'Enter' && loginSubmitHandlerFunction()}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {info?.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button className="w-full" onClick={loginSubmitHandlerFunction} disabled={loading}>
            {t('login.loginButton')}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t('login.dontHaveAnAccount')}
          <div className="underline"> {t('login.signup')}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(LoginComp);
