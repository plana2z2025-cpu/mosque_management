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
    return <MosqueDashboard mosque={mosqueResponse[1]?.data} />;
  } else {
    return <NotFoundPage />;
  }
}
