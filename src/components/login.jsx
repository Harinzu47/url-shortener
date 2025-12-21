import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, loading, error, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error, navigate, fetchUser, longLink]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
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
        <h2 className="text-xl font-bold text-[#181010] dark:text-white">Login</h2>
        <p className="text-sm text-[#5c4040] dark:text-gray-400">Welcome back! Enter your credentials to continue.</p>
      </div>

      {error && <Error message={error.message} />}

      {/* Form */}
      <div className="space-y-4">
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
      </div>

      {/* Submit Button */}
      <Button 
        onClick={handleLogin}
        className="w-full h-12 bg-[#800000] hover:bg-[#5e0000] text-white font-bold text-base"
        disabled={loading}
      >
        {loading ? <BeatLoader size={10} color="white" /> : "Login"}
      </Button>
    </div>
  );
};

export default Login;