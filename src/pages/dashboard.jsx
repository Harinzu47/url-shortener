import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Error from "@/components/error";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrl";
import { getClicks } from "@/db/apiClick";
import LinkCard from "@/components/link-card";
import CreateLink from "@/components/create-link";

const LINKS_PER_PAGE = 10;

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((filteredUrls?.length || 0) / LINKS_PER_PAGE);
  const startIndex = (currentPage - 1) * LINKS_PER_PAGE;
  const paginatedUrls = filteredUrls?.slice(startIndex, startIndex + LINKS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Loading Bar */}
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#800000" />
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#181010] dark:text-white">Dashboard</h1>
        <p className="text-[#5c4040] dark:text-gray-400">Manage your shortened links and track performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5c4040] dark:text-gray-400">Total Links</CardTitle>
            <span className="material-symbols-outlined text-[#800000]">link</span>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#181010] dark:text-white">{urls?.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#5c4040] dark:text-gray-400">Total Clicks</CardTitle>
            <span className="material-symbols-outlined text-[#FFD700]">touch_app</span>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#181010] dark:text-white">{clicks?.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#800000] to-[#5e0000] border-0 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Ready to create?</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateLink />
          </CardContent>
        </Card>
      </div>

      {/* Links Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-[#181010] dark:text-white">My Links</h2>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d5e5e]" />
          <Input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-[280px] bg-white dark:bg-[#2a1212] border-[#e7dada] dark:border-[#3a2020] focus-visible:ring-[#800000]"
          />
        </div>
      </div>

      {error && <Error message={error?.message} />}

      {/* Links List */}
      <div className="flex flex-col gap-4">
        {(paginatedUrls || []).map((url, i) => (
          <LinkCard key={url.id || i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border-[#e7dada] dark:border-[#3a2020] hover:bg-[#f8f5f5] dark:hover:bg-[#3a2020]"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-[#5c4040] dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="border-[#e7dada] dark:border-[#3a2020] hover:bg-[#f8f5f5] dark:hover:bg-[#3a2020]"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Empty state */}
      {filteredUrls?.length === 0 && !loading && (
        <div className="text-center py-12 bg-[#f8f5f5] dark:bg-[#2a1212] rounded-2xl border border-[#e7dada] dark:border-[#3a2020]">
          <span className="material-symbols-outlined text-[48px] text-[#8d5e5e] mb-4">link_off</span>
          <p className="text-[#5c4040] dark:text-gray-400">
            {searchQuery ? "No links found matching your search." : "No links created yet."}
          </p>
          {!searchQuery && (
            <p className="text-sm text-[#8d5e5e] mt-2">Create your first link to get started!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
