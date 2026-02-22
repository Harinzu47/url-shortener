import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash, ExternalLink } from "lucide-react";
import { deleteUrl } from "@/db/apiUrl";
import useFetch from "@/hooks/use-fetch";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

const LinkCard = ({ url, fetchUrls }) => {
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
      fetchUrls();
    } catch {
      toast.error("Failed to delete link");
    }
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="group flex flex-col md:flex-row gap-5 p-5 bg-white dark:bg-[#2a1212] rounded-xl border border-[#e7dada] dark:border-[#3a2020] hover:border-[#FFD700] hover:shadow-lg transition-all duration-300">
      {/* QR Code */}
      <div className="flex-shrink-0">
        <img
          src={url?.qr}
          className="h-28 w-28 object-contain rounded-lg ring-2 ring-[#800000]/20 p-1 bg-white"
          alt="qr-code"
        />
      </div>

      {/* Link Info */}
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 min-w-0 gap-1">
        <span className="text-lg font-bold text-[#181010] dark:text-white group-hover:text-[#800000] transition-colors truncate">
          {url?.title}
        </span>
        <span className="text-sm text-[#800000] font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">link</span>
          {baseUrl}/{url?.custom_url || url?.short_url}
        </span>
        <span className="text-xs text-[#5c4040] dark:text-gray-400 truncate flex items-center gap-1 mt-1">
          <ExternalLink className="h-3 w-3" />
          {url?.original_url}
        </span>
        <span className="text-xs text-[#8d5e5e] mt-auto pt-2">
          Created {new Date(url?.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      </Link>

      {/* Actions */}
      <div className="flex md:flex-col gap-2 self-start">
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="h-9 w-9 border-[#e7dada] dark:border-[#3a2020] hover:bg-[#800000] hover:text-white hover:border-[#800000] transition-all"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={downloadImage}
          className="h-9 w-9 border-[#e7dada] dark:border-[#3a2020] hover:bg-[#FFD700] hover:text-[#181010] hover:border-[#FFD700] transition-all"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDelete}
          className="h-9 w-9 border-[#e7dada] dark:border-[#3a2020] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
        >
          {loadingDelete ? <BeatLoader size={4} color="currentColor" /> : <Trash className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
