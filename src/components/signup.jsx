import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error, navigate, fetchUser, longLink]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#181010] dark:text-white">Create Account</h2>
        <p className="text-sm text-[#5c4040] dark:text-gray-400">Join IMM Link and start shortening your URLs.</p>
      </div>

      {error && <Error message={error.message} />}

      {/* Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#181010] dark:text-white">Full Name</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8d5e5e] text-[20px]">person</span>
            <Input
              name="name"
              type="text"
              placeholder="Your full name"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000]"
            />
          </div>
          {errors.name && <Error message={errors.name} />}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#181010] dark:text-white">Email</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8d5e5e] text-[20px]">mail</span>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000]"
            />
          </div>
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#181010] dark:text-white">Password</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8d5e5e] text-[20px]">lock</span>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleInputChange}
              className="pl-10 h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000]"
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#181010] dark:text-white">Profile Picture</label>
          <div className="relative">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="h-12 bg-white dark:bg-[#3a2020] border-[#e7dada] dark:border-[#4a2e2e] focus-visible:ring-[#800000] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#800000]/10 file:text-[#800000] hover:file:bg-[#800000]/20"
            />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSignup}
        className="w-full h-12 bg-[#800000] hover:bg-[#5e0000] text-white font-bold text-base"
        disabled={loading}
      >
        {loading ? <BeatLoader size={10} color="white" /> : "Create Account"}
      </Button>
    </div>
  );
};

export default Signup;