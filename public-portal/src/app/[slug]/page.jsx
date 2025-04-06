import { getSingleMosqueApi } from "../apis/mosque.api";
import Header from "../components/headers/Header";
import MosqueDashboard from "../components/mosqueDetails/MosqueDashboard";
import NotFoundPage from "../components/mosqueDetails/NotFound";
import Footer from "../components/headers/Footer";
import MosqueHeader from "./MosqueHeader";
import PrayerTimings from "./PrayerTimings";
import RamadanTimings from "./RamadanTimings";
import MosqueGallery from "./MosqueGallery";
import MosqueDetails from "./MosqueDetails";

const getMosqueData = async (slug) => {
  const response = await getSingleMosqueApi(slug);
  return response;
};

export default async function MosquePage({ params }) {
  const { slug } = await params;
  const mosqueResponse = await getMosqueData(slug);
  if (mosqueResponse[0] === true) {
    const { mosqueDetails = {}, ramadanTimings = null } =
      mosqueResponse[1]?.data;
    return (
      <div className="app">
        <div className="flex min-h-screen flex-col w-full">
          <Header />

          {/* <main className="flex-1">
            <MosqueDashboard
              mosque={mosqueDetails}
              ramadanTimings={ramadanTimings}
            />
          </main> */}
          <main className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
            <div className="container mx-auto space-y-4 px-4 py-8">
              <MosqueHeader
                name={mosqueDetails?.name}
                profileImage={mosqueDetails?.profile?.url}
                address={mosqueDetails?.address}
                contactInfo={mosqueDetails?.contactInfo}
              />

              <MosqueDetails
                aboutInfo={mosqueDetails?.aboutInfo}
                facilities={mosqueDetails?.facilities}
                uniqueId={mosqueDetails?.uniqueId}
              />

              <PrayerTimings timings={mosqueDetails?.timings} />

              <MosqueGallery images={mosqueDetails?.images} />

              {ramadanTimings && (
                <RamadanTimings ramadanData={ramadanTimings} />
              )}

              {/* <div className="rounded-lg overflow-hidden border shadow-sm">
                    <iframe
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${mosqueDetails.address.latitude},${mosqueDetails?.address?.longitude}`}
                      className="w-full"
                    ></iframe>
                  </div> */}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    );
  } else {
    return <NotFoundPage />;
  }
}
