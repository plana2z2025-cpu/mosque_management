// import Image from "next/image";
import { getMosquesApi } from "@/app/apis/mosque.api";
export default async function Home() {
  const data = await getMosquesApi();
  console.log(data[1]);
  return <div>hello world</div>;
}
