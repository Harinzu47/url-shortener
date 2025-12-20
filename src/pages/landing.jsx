import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();


  const handleShorten = (e) => {
    e.preventDefault();
    if(longUrl)navigate(`/auth?createNew=${longUrl}`)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        Shorten Your Links <br />
        <span className="text-blue-400">Fast, Simple, and Powerful</span>
      </h2>
      <p className="text-gray-400 text-center mb-8 max-w-2xl">
        Transform long URLs into short, memorable links. Track clicks, analyze performance, and share with ease.
      </p>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
        type="url"
        value={longUrl}
        placeholder="Paste your long URL here..."
        onChange={(e) => setLongUrl(e.target.value)}
        className="h-full flex-1 py-4 px-4"
        />
        <Button
        type="submit"
        className="h-full"
        variant="destructive"
        >
          Shorten!
        </Button>
      </form>
      <img src="/banner.png" alt="banner" className="w-full my-11 md:px-11"/>
      <Accordion type="multiple" className="w-full md:px-11" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the URL shortener work?</AccordionTrigger>
          <AccordionContent>
            Simply paste your long URL into the input field and click "Shorten!". 
            We'll generate a unique short link that redirects to your original URL. 
            You can also customize your short link and track click analytics.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I track clicks on my shortened links?</AccordionTrigger>
          <AccordionContent>
            Yes! Our dashboard provides detailed analytics including total clicks, 
            device types (mobile, desktop, tablet), geographic location of visitors, 
            and click trends over time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is there a limit to how many links I can create?</AccordionTrigger>
          <AccordionContent>
            There is no limit! You can create as many shortened links as you need. 
            All links come with QR codes that you can download and share.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I customize my short links?</AccordionTrigger>
          <AccordionContent>
            Absolutely! You can create custom URLs that are easy to remember and 
            relevant to your brand. Simply enter your preferred custom alias when 
            creating a new link.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage;