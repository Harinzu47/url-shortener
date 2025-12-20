import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";
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
    navigator.clipboard.writeText(`${baseUrl}/${url?.short_url}`);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = async () => {
    try {
      await fnDelete();
      toast.success("Link deleted successfully!");
      fetchUrls();
    } catch (error) {
      toast.error("Failed to delete link");
    }
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr-code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-2xl font-bold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-xl text-blue-400 font-medium hover:underline cursor-pointer">
          {baseUrl}/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={handleCopy}>
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
