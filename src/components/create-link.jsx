import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import QRCode from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrl";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  let [searchParams, setSearchparams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [fromValues, setFromvalues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    longUrl: yup
      .string()
      .url("Must be a valid url")
      .required("Url is Required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFromvalues({
      ...fromValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...fromValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      toast.success("Link created successfully!");
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data, navigate]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(fromValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchparams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-white/90 text-[#800000] font-bold px-6 py-3 h-auto">
          <span className="material-symbols-outlined mr-2 text-[20px]">add_link</span>
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#181010] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#800000]">add_link</span>
            Create New Link
          </DialogTitle>
          <DialogDescription className="text-[#5c4040] dark:text-gray-400">
            Transform your long URL into a short, shareable link.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* QR Code Preview */}
          {fromValues?.longUrl && (
            <div className="flex justify-center p-4 bg-[#f8f5f5] dark:bg-[#3a2020] rounded-lg">
              <QRCode 
                value={fromValues?.longUrl} 
                size={180} 
                ref={ref}
                bgColor="#ffffff"
                fgColor="#800000"
                qrStyle="dots"
                eyeRadius={8}
              />
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#181010] dark:text-white">Link Title</label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Event Registration 2024"
              value={fromValues.title}
              onChange={handleChange}
              className="h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000]"
            />
            {errors.title && <Error message={errors.title} />}
          </div>

          {/* Long URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#181010] dark:text-white">Original URL</label>
            <Input
              id="longUrl"
              type="text"
              placeholder="https://example.com/your-long-url"
              value={fromValues.longUrl}
              onChange={handleChange}
              className="h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000]"
            />
            {errors.longUrl && <Error message={errors.longUrl} />}
          </div>

          {/* Custom URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#181010] dark:text-white">Custom Alias (Optional)</label>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 h-12 px-4 bg-[#f8f5f5] dark:bg-[#3a2020] border border-[#e7dada] dark:border-[#4a2e2e] rounded-lg flex items-center text-[#800000] font-medium text-sm">
                imm.link/
              </div>
              <Input
                id="customUrl"
                type="text"
                value={fromValues.customUrl}
                onChange={handleChange}
                placeholder="my-custom-link"
                className="h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000]"
              />
            </div>
          </div>

          {error && <Error message={error.message} />}
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button 
              variant="outline"
              className="border-[#e7dada] dark:border-[#3a2020] hover:bg-[#f8f5f5] dark:hover:bg-[#3a2020]"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button 
            disabled={loading} 
            onClick={createNewLink}
            className="bg-[#800000] hover:bg-[#5e0000] text-white font-bold"
          >
            {loading ? (
              <BeatLoader size={10} color="white" />
            ) : (
              <>
                <span className="material-symbols-outlined mr-2 text-[18px]">check</span>
                Create Link
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
