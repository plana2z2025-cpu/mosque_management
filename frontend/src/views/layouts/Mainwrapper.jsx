import React from 'react';
import SuperAdminSidebar from './SuperAdmin';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { SUPPER_ADMIN, USER, ADMIN } from '@/constants/roles.constants';
import AdminSidebar from './Admin';
import { useSelector } from 'react-redux';

const Mainwrapper = ({ breadCumbs = [], children }) => {
  const navigate = useNavigate();
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const RoleWiseSidebar = {
    [SUPPER_ADMIN]: SuperAdminSidebar,
    [ADMIN]: AdminSidebar,
  };

  const SidebarComponent = RoleWiseSidebar[profileDetails?.role] || AdminSidebar;

  return (
    <SidebarComponent user={profileDetails}>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadCumbs?.map((singleBreadcrumb, index) => (
                <React.Fragment key={'breadrumb' + index}>
                  {singleBreadcrumb?.href ? (
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink
                        className="cursor-pointer"
                        onClick={() => navigate(singleBreadcrumb?.href)}
                      >
                        {singleBreadcrumb?.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage> {singleBreadcrumb?.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}

                  {index !== breadCumbs?.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto w-full">{children}</div>
    </SidebarComponent>
  );
};

export default Mainwrapper;
