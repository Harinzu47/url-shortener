import Device from "@/components/device-stat";
import Location from "@/components/location-stat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClick";
import { deleteUrl, getUrl } from "@/db/apiUrl";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash, ExternalLink, ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

const LinkPage = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    toast.success("QR Code downloaded!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${baseUrl}/${url?.custom_url || url?.short_url}`);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = async () => {
    try {
      await fnDelete();
      toast.success("Link deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to delete link");
    }
  };

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Loading Bar */}
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color="#800000" className="mb-4" />
      )}

      {/* Back Button */}
      <Link 
        to="/dashboard" 
        className="flex items-center gap-2 text-[#5c4040] dark:text-gray-400 hover:text-[#800000] transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Link Info */}
        <div className="flex flex-col gap-6 lg:w-2/5">
          {/* Link Details Card */}
          <Card className="bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#181010] dark:text-white">
                {url?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Short URL */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[#8d5e5e] uppercase tracking-wider">Short Link</span>
                <a
                  href={`${baseUrl}/${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#800000] font-medium hover:underline flex items-center gap-2"
                >
                  {baseUrl}/{link}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Original URL */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[#8d5e5e] uppercase tracking-wider">Original Link</span>
                <a
                  href={url?.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#5c4040] dark:text-gray-400 hover:text-[#800000] break-all flex items-start gap-2"
                >
                  <LinkIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {url?.original_url}
                </a>
              </div>

              {/* Created Date */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[#8d5e5e] uppercase tracking-wider">Created</span>
                <span className="text-sm text-[#5c4040] dark:text-gray-400">
                  {new Date(url?.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-[#e7dada] dark:border-[#3a2020]">
                <Button
                  onClick={handleCopy}
                  className="flex-1 bg-[#800000] hover:bg-[#5e0000] text-white"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadImage}
                  className="border-[#e7dada] dark:border-[#3a2020] hover:bg-[#FFD700] hover:text-[#181010] hover:border-[#FFD700]"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="border-[#e7dada] dark:border-[#3a2020] hover:bg-red-500 hover:text-white hover:border-red-500"
                >
                  {loadingDelete ? <BeatLoader size={4} color="currentColor" /> : <Trash className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card className="bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#181010] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#800000]">qr_code_2</span>
                QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src={url?.qr}
                className="w-full max-w-[200px] object-contain rounded-lg ring-2 ring-[#800000]/20 p-2 bg-white"
                alt="qr-code"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <Card className="lg:w-3/5 bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#181010] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFD700]">bar_chart</span>
              Analytics
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              {/* Total Clicks */}
              <Card className="bg-gradient-to-r from-[#800000] to-[#5e0000] border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">{stats?.length}</p>
                </CardContent>
              </Card>

              {/* Location Stats */}
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[#181010] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#800000] text-[20px]">location_on</span>
                  Location Data
                </h4>
                <Location stats={stats} />
              </div>

              {/* Device Stats */}
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[#181010] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#800000] text-[20px]">devices</span>
                  Device Info
                </h4>
                <Device stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-12">
              <span className="material-symbols-outlined text-[48px] text-[#8d5e5e] mb-4">analytics</span>
              <p className="text-[#5c4040] dark:text-gray-400">
                {loadingStats === false ? "No statistics yet" : "Loading statistics..."}
              </p>
              <p className="text-sm text-[#8d5e5e] mt-2">Stats will appear once your link gets clicks.</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LinkPage;
