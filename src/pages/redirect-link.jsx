import { storeClicks } from "@/db/apiClick";
import { getLongUrl } from "@/db/apiUrl";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BarLoader width={200} color="#800000" />
        <p className="text-[#5c4040] font-medium">Redirecting...</p>
      </div>
    );
  }

  return null;
};

export default RedirectLink;
