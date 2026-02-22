import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/login';
import Signup from '@/components/signup';
import { UrlState } from '@/context';
import { useEffect } from 'react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 py-12">
      {/* Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#181010] dark:text-white">
          {longLink ? (
            <>
              <span className="text-[#800000]">Hold up!</span> Login first...
            </>
          ) : (
            <>
              Welcome to <span className="text-[#800000]">IMM Link</span>
            </>
          )}
        </h1>
        <p className="text-[#5c4040] dark:text-gray-400">
          {longLink
            ? "You need to be logged in to create shortened links."
            : "Sign in to your account or create a new one."
          }
        </p>
      </div>

      {/* Auth Tabs */}
      <div className="w-full max-w-[420px] bg-white dark:bg-[#2a1212] rounded-2xl border border-[#e7dada] dark:border-[#3a2020] shadow-lg overflow-hidden">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#f8f5f5] dark:bg-[#3a2020] rounded-none h-14 p-0">
            <TabsTrigger
              value="login"
              className="rounded-none h-full text-base font-medium data-[state=active]:bg-white data-[state=active]:dark:bg-[#2a1212] data-[state=active]:text-[#800000] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#800000]"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-none h-full text-base font-medium data-[state=active]:bg-white data-[state=active]:dark:bg-[#2a1212] data-[state=active]:text-[#800000] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#800000]"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="p-0 m-0">
            <Login />
          </TabsContent>
          <TabsContent value="signup" className="p-0 m-0">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>

      {/* Trust Badge */}
      <p className="text-xs text-[#8d5e5e] font-medium flex items-center">
        <span className="material-symbols-outlined align-middle text-[14px] text-[#FFD700] mr-1">lock</span>
        Your data is secure with us
      </p>
    </div>
  );
};

export default Auth;