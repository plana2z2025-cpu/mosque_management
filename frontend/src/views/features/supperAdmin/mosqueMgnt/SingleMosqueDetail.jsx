import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { mosqueActions } from '@/redux/combineActions';
import { useParams } from 'react-router-dom';

const breadCumbs = [{ label: 'Mosques', href: '/superadmin/mosques' }];

const MosqueDetails = () => {
  const { slug } = useParams();
  const { getSuperAdminSingleMosqueAction } = mosqueActions;
  const dispatch = useDispatch();
  const { loading, supperAdminSingleMosque } = useSelector((state) => state.mosqueState);

  useEffect(() => {
    if (!supperAdminSingleMosque || supperAdminSingleMosque?.slug !== slug)
      dispatch(getSuperAdminSingleMosqueAction(slug));
  }, []);

  return (
    <Mainwrapper breadCumbs={[...breadCumbs, { label: 'testing-mosque', href: null }]}>
      {' '}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{supperAdminSingleMosque?.name}</CardTitle>
          <CardDescription>
            Established: {new Date(supperAdminSingleMosque?.established).toLocaleDateString()}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p>Street : {supperAdminSingleMosque?.address?.street}</p>
              <p>City : {supperAdminSingleMosque?.address?.city},</p>
              <p>PostalCode :{supperAdminSingleMosque?.address?.postalCode}</p>
              <p>State : {supperAdminSingleMosque?.address?.state} </p>
              <p>Country : {supperAdminSingleMosque?.address?.country}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Contact</h3>
              <p>Phone: {supperAdminSingleMosque?.contactInfo?.phone}</p>
              <p>Email: {supperAdminSingleMosque?.contactInfo?.email}</p>
              <p>
                Website:{' '}
                <a
                  href={supperAdminSingleMosque?.contactInfo?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {supperAdminSingleMosque?.contactInfo?.website}
                </a>
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium">Capacity</h3>
            <p>Regular: {supperAdminSingleMosque?.capacity?.regular}</p>
            <p>Friday: {supperAdminSingleMosque?.capacity?.friday}</p>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium">Prayer Times</h3>
            <Table>
              <TableHeader className="w-full">
                <TableRow>
                  <TableCell>Prayer</TableCell>
                  <TableCell>Azaan</TableCell>
                  <TableCell>Jamaat</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Fajr</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.fajr?.azaan}</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.fajr?.jamaat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dhuhr</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.dhuhr?.azaan}</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.dhuhr?.jamaat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asr</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.asr?.azaan}</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.asr?.jamaat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maghrib</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.maghrib?.azaan}</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.maghrib?.jamaat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Isha</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.isha?.azaan}</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.isha?.jamaat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jumma</TableCell>
                  <TableCell>{supperAdminSingleMosque?.prayerTimes?.jumma?.azaan}</TableCell>
                  <TableCell>
                    {supperAdminSingleMosque?.prayerTimes?.jumma?.jamaat} (
                    {supperAdminSingleMosque?.prayerTimes?.jumma?.qutba})
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium">Facilities</h3>
            <ul className="list-disc pl-4">
              {supperAdminSingleMosque?.facilities?.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium">Administrators</h3>
            {supperAdminSingleMosque?.administrators?.length === 0 ? (
              <p>No administrators listed.</p>
            ) : (
              <ul className="list-disc pl-4">
                {supperAdminSingleMosque?.administrators?.map((admin, index) => (
                  <li key={index}>Admin {index + 1}</li>
                ))}
              </ul>
            )}
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium">Imams</h3>
            {supperAdminSingleMosque?.imams.length === 0 ? (
              <p>No imams listed.</p>
            ) : (
              <ul className="list-disc pl-4">
                {supperAdminSingleMosque?.imams?.map((imam, index) => (
                  <li key={index}>Imam {index + 1}</li>
                ))}
              </ul>
            )}
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium">Images</h3>
            {supperAdminSingleMosque?.images?.length === 0 ? (
              <p>No images available.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {supperAdminSingleMosque?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt={`Masjid Image ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-gray-500">Last updated: {new Date().toLocaleString()}</p>
        </CardFooter>
      </Card>
    </Mainwrapper>
  );
};

export default MosqueDetails;
