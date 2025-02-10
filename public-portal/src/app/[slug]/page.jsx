import { getSingleMosqueApi } from "../apis/mosque.api";
import MosqueDashboard from "../components/mosqueDetails/MosqueDashboard";
import NotFoundPage from "../components/mosqueDetails/NotFound";

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
      <MosqueDashboard mosque={mosqueDetails} ramadanTimings={ramadanTimings} />
    );
  } else {
    return <NotFoundPage />;
  }
}
