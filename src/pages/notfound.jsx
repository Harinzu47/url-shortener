import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* 404 Icon */}
      <div className="size-24 rounded-full bg-[#800000]/10 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[48px] text-[#800000]">link_off</span>
      </div>
      
      {/* Title */}
      <h1 className="text-6xl font-bold text-[#800000] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-[#181010] dark:text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-[#5c4040] dark:text-gray-400 mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or the link may have been removed.
      </p>
      
      {/* Actions */}
      <div className="flex gap-4">
        <Button asChild className="bg-[#800000] hover:bg-[#5e0000] text-white font-bold">
          <Link to="/">
            <span className="material-symbols-outlined mr-2 text-[18px]">home</span>
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-[#e7dada] dark:border-[#3a2020]">
          <Link to="/dashboard">
            <span className="material-symbols-outlined mr-2 text-[18px]">dashboard</span>
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;