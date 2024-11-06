import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

const LoginComp = ({ toggleForm, loginSubmitHandlerFunction, changeHandlerFunction, loading }) => {
  const { t } = useTranslation();
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
          <div className="grid gap-2">
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
