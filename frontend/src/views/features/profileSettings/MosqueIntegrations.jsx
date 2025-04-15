import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { mosqueActions } from '../../../redux/combineActions';
import {
  ExternalLink,
  Calendar,
  FileSpreadsheet,
  MessageSquare,
  CreditCard,
  Users,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/services/config';

const integrations = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Schedule and manage prayer times, Jummah, Eid prayers, and community events.',
    icon: <Calendar className="h-8 w-8" />,
    consoleUrl: `${BASE_URL}/auth/google`,
    category: 'prayer',
    popular: true,
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Manage mosque finances, attendance records, and volunteer schedules.',
    icon: <FileSpreadsheet className="h-8 w-8" />,
    consoleUrl: 'https://docs.google.com/spreadsheets/',
    category: 'community',
    popular: true,
  },

  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept online donations, zakat payments, and manage recurring contributions.',
    icon: <CreditCard className="h-8 w-8" />,
    consoleUrl: 'https://dashboard.stripe.com/',
    category: 'finance',
    popular: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Process donations and payments for mosque services and programs.',
    icon: <CreditCard className="h-8 w-8" />,
    consoleUrl: 'https://www.paypal.com/signin',
    category: 'finance',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Create community groups and send important announcements to congregation.',
    icon: <MessageSquare className="h-8 w-8" />,
    consoleUrl: 'https://business.whatsapp.com/',
    category: 'communication',
    popular: true,
  },

  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Host virtual Islamic classes, committee meetings, and live-stream events.',
    icon: <Video className="h-8 w-8" />,
    consoleUrl: 'https://zoom.us/signin',
    category: 'communication',
    popular: true,
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Build an online community space for youth groups and special interest programs.',
    icon: <Users className="h-8 w-8" />,
    consoleUrl: 'https://discord.com/login',
    category: 'community',
  },
];
const MosqueIntegrations = () => {
  //   const dispatch = useDispatch();
  //   const { communityMosqueSettings } = useSelector((state) => state.mosqueState);
  //   const { updateMosqueSettingsAction } = mosqueActions;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mosque Integrations</CardTitle>
          <CardDescription>
            Manage and customize the integrations for your mosque, including Ramadan timings and
            query forms, to enhance community engagement and support.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations?.map((integration) => (
              <Card key={integration.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-muted rounded-md">{integration.icon}</div>
                    {integration.popular && <Badge variant="secondary">Popular</Badge>}
                  </div>
                  <CardTitle className="mt-4">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button asChild className="w-full">
                    <Link to={integration.consoleUrl} target="_blank" rel="noopener noreferrer">
                      Connect
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(MosqueIntegrations);
