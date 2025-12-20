import Header from '@/components/header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const AppLayout = () => {
  return (
    // 1. Jadikan div terluar sebagai flex container untuk "sticky footer"
    <div className='min-h-screen flex flex-col'> {/* Opsional: beri warna latar belakang dasar */}
      
      {/* Header akan tetap di atas */}
      <Header />

      {/* 2. Jadikan <main> sebagai area yang bisa "tumbuh" */}
      <main className='flex-1 w-full'>
        {/* 3. Tambahkan container di sini untuk memusatkan konten */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10'>
          <Outlet />
        </div>
      </main>

      {/* 4. Footer akan terdorong ke bawah secara otomatis */}
      <footer className='w-full bg-gray-900 text-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center'>
          {/* Ganti dengan komponen atau isi footer Anda */}
          <span>Dibuat dengan ❤️ oleh Khalid Jundullah &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>

      {/* Toast notifications */}
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default AppLayout;