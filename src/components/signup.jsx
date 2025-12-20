import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    if (error === null & data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, loading]);

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
      //api call
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
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create your new account</CardDescription>
        <CardAction>Card Action</CardAction>
        {error &&  <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input 
          name="name" 
          type="text" 
          placeholder="Name"
          onChange={handleInputChange}
          />
          {errors.name &&<Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input 
          name="email" 
          type="email" 
          placeholder="Email"
          onChange={handleInputChange}
          />
          {errors.email &&<Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input 
          name="password" 
          type="password" 
          placeholder="Password"
          onChange={handleInputChange}
          />
          {errors.password &&<Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input 
          name="profile_pic" 
          type="file" 
          placeholder="Upload Your Image"
          accept="image/*"
          onChange={handleInputChange}
          />
          {errors.profile_pic &&<Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7"/> : "Create Account" }
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signup;