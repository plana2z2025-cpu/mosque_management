import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SignupComp = ({ toggleForm }) => {
  return (
    <Card className="signup-form w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input type="text" placeholder="Full Name" className="w-full left-to-right-an" />
          <Input type="email" placeholder="Email" className="w-full left-to-right-an" />
          <Input type="password" placeholder="Password" className="w-full left-to-right-an" />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="w-full left-to-right-an"
          />
        </div>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 left-to-right-an">
          Sign Up
        </Button>
        <p className="text-center text-sm text-gray-600 left-to-right-an">
          Already have an account?{' '}
          <button onClick={toggleForm} className="text-indigo-600 hover:underline">
            Login
          </button>
        </p>
      </CardContent>
    </Card>
  );
};

export default memo(SignupComp);
