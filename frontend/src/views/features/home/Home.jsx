import React from 'react';
import {
  CalendarIcon,
  ClockIcon,
  BarChart3Icon,
  UsersIcon,
  SettingsIcon,
  ImageIcon,
  Menu,
} from 'lucide-react';
import Image1 from '@/assets/images/home1.png';
import Image2 from '@/assets/images/home2.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { public_url } from '@/services/config';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold">MosqueManager</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#portals"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Portals
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-emerald-600 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px]">
                  <div className="flex flex-col gap-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                      </div>
                      <span className="text-xl font-bold">MosqueManager</span>
                    </div>
                    <nav className="flex flex-col gap-4">
                      <Link
                        href="#features"
                        className="text-sm font-medium hover:text-emerald-600 transition-colors"
                      >
                        Features
                      </Link>
                      <Link
                        href="#portals"
                        className="text-sm font-medium hover:text-emerald-600 transition-colors"
                      >
                        Portals
                      </Link>
                      <Link
                        href="#testimonials"
                        className="text-sm font-medium hover:text-emerald-600 transition-colors"
                      >
                        Testimonials
                      </Link>
                      <Link
                        href="#contact"
                        className="text-sm font-medium hover:text-emerald-600 transition-colors"
                      >
                        Contact
                      </Link>
                    </nav>
                    <div className="flex flex-col gap-2 mt-4">
                      <Link to="/login">
                        <Button variant="outline" className="w-full justify-start">
                          Log In
                        </Button>
                      </Link>
                      <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to={public_url}>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Mosque Management System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Streamline your mosque operations with our comprehensive management system.
                    Manage prayer times, events, finances, and more in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={Image1}
                  width={550}
                  height={550}
                  alt="Mosque Management Dashboard"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="portals" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Multiple Access Portals
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system provides tailored access for different user roles, ensuring the right
                  people have the right permissions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <UsersIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Super Admin</h3>
                <p className="text-sm text-gray-500 text-center">
                  Complete system control with full access to all features and settings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <UsersIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Admin Portal</h3>
                <p className="text-sm text-gray-500 text-center">
                  Manage users, assign permissions, and oversee mosque operations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <UsersIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Sub-User Portal</h3>
                <p className="text-sm text-gray-500 text-center">
                  Access specific features based on assigned permissions from admins.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <UsersIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Public Portal</h3>
                <p className="text-sm text-gray-500 text-center">
                  Community access to prayer times, events, and public information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comprehensive Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to efficiently manage your mosque in one integrated platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
                <CalendarIcon className="h-10 w-10 text-emerald-600" />
                <h3 className="text-xl font-bold">Event Management</h3>
                <p className="text-sm text-gray-500">
                  Create, schedule, and manage mosque events with ease. Send notifications to
                  community members.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
                <ClockIcon className="h-10 w-10 text-emerald-600" />
                <h3 className="text-xl font-bold">Prayer Timings</h3>
                <p className="text-sm text-gray-500">
                  Automatically calculate and display accurate prayer times based on your location.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
                <BarChart3Icon className="h-10 w-10 text-emerald-600" />
                <h3 className="text-xl font-bold">Financial Analytics</h3>
                <p className="text-sm text-gray-500">
                  Track expenses, donations, and generate detailed financial reports with visual
                  charts.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
                <CalendarIcon className="h-10 w-10 text-emerald-600" />
                <h3 className="text-xl font-bold">Ramadan Timings</h3>
                <p className="text-sm text-gray-500">
                  Special calendar for Ramadan with iftar and suhoor times, plus special event
                  scheduling.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
                <ImageIcon className="h-10 w-10 text-emerald-600" />
                <h3 className="text-xl font-bold">Gallery Management</h3>
                <p className="text-sm text-gray-500">
                  Upload and organize photos from mosque events and activities to share with the
                  community.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm">
                <SettingsIcon className="h-10 w-10 text-emerald-600" />
                <h3 className="text-xl font-bold">Administration Settings</h3>
                <p className="text-sm text-gray-500">
                  Customize system settings, user permissions, and notification preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src={Image2}
                  width={550}
                  height={550}
                  alt="Mosque Management Dashboard"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Powerful Dashboard
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Get a complete overview of your mosque's activities with our intuitive
                    dashboard. Monitor prayer attendance, track financial health, and stay on top of
                    upcoming events.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Real-time analytics and reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Customizable widgets and layouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Interactive charts and graphs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Mobile-friendly interface</span>
                  </li>
                </ul>
                <div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Explore Dashboard</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Mosques Worldwide
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what mosque administrators are saying about our management system.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    "This system has revolutionized how we manage our mosque. The prayer time
                    calculations are accurate, and the financial tracking has made our reporting so
                    much easier."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-gray-200 h-8 w-8"></div>
                  <div>
                    <p className="text-sm font-medium">Imam Abdullah</p>
                    <p className="text-xs text-gray-500">Al-Noor Mosque</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    "The permission system is excellent. I can delegate tasks to volunteers without
                    worrying about them accessing sensitive information. The Ramadan calendar
                    feature is a blessing."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-gray-200 h-8 w-8"></div>
                  <div>
                    <p className="text-sm font-medium">Yusuf Rahman</p>
                    <p className="text-xs text-gray-500">Islamic Center Administrator</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    "Our community loves the public portal where they can check prayer times and
                    upcoming events. The analytics dashboard helps us make better decisions for our
                    mosque."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-gray-200 h-8 w-8"></div>
                  <div>
                    <p className="text-sm font-medium">Fatima Zahra</p>
                    <p className="text-xs text-gray-500">Community Coordinator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Mosque Management?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join hundreds of mosques already using our platform to streamline their
                  operations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started Today</Button>
                <Button variant="outline">Request a Demo</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold">MosqueManager</span>
              </div>
              <p className="text-sm text-gray-500">
                Comprehensive mosque management solution for modern Islamic centers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Prayer Times
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Event Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Financial Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    User Management
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="mailto:mohammedshahidnagodriya@gmail.com"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    mohammedshahidnagodriya@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="hover:text-emerald-600 transition-colors">
                    +91 9347 222 304
                  </a>
                </li>
                {/* <li>
                  <address className="not-italic">
                    123 Mosque Street
                    <br />
                    City, State 12345
                  </address>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} MosqueManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
