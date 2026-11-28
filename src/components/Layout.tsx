import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'sonner'
export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" richColors dir="rtl" />
    </>
  )
}