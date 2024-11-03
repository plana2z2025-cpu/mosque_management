import React from 'react';
import {
  UserCheck,
  School,
  Calendar,
  BookOpen,
  DollarSign,
  Users,
  Settings2,
  ChevronRight,
  ChevronsUpDown,
  Command,
  LogOut,
  Wallet,
  Bell,
  CreditCard,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';
import getInitials from '@/helpers/get-initials';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: School,
      isActive: true,
      items: [
        {
          title: 'Overview',
          url: '#/dashboard/overview',
        },
        {
          title: 'Analytics',
          url: '#/dashboard/analytics',
        },
      ],
    },
    {
      title: 'Congregants',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'Member Management',
          url: '#/congregants/management',
        },
        {
          title: 'Family Records',
          url: '#/congregants/families',
        },
        {
          title: 'Attendance',
          url: '#/congregants/attendance',
        },
      ],
    },
    {
      title: 'Programs & Events',
      url: '#',
      icon: Calendar,
      items: [
        {
          title: 'Upcoming Events',
          url: '#/events/upcoming',
        },
        {
          title: 'Class Schedules',
          url: '#/events/classes',
        },
        {
          title: 'Ramadan Programs',
          url: '#/events/ramadan',
        },
      ],
    },
    {
      title: 'Financial Management',
      url: '#',
      icon: DollarSign,
      items: [
        {
          title: 'Donations',
          url: '#/finance/donations',
        },
        {
          title: 'Zakat',
          url: '#/finance/zakat',
        },
        {
          title: 'Expense Tracking',
          url: '#/finance/expenses',
        },
        {
          title: 'Annual Budget',
          url: '#/finance/budget',
        },
      ],
    },
    {
      title: 'Religious Resources',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Quran Classes',
          url: '#/resources/quran',
        },
        {
          title: 'Islamic Library',
          url: '#/resources/library',
        },
        {
          title: 'Fatwa & Guidance',
          url: '#/resources/fatwa',
        },
      ],
    },
  ],
  quickAccess: [
    {
      name: 'Imam Management',
      url: '#/staff/imams',
      icon: UserCheck,
    },
    {
      name: 'Facility Booking',
      url: '#/facilities/booking',
      icon: School,
    },
    {
      name: 'Communication',
      url: '#/communications',
      icon: Bell,
    },
  ],
};

const SuperAdminSidebar = ({ user, children }) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <School className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Mosque Management</span>
                    <span className="truncate text-xs">Superadmin Portal</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
            <SidebarMenu>
              {data.quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="rounded-lg">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.name}</span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Settings2 />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet />
                      Subscription
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default SuperAdminSidebar;
