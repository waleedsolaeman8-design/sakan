import { Link } from 'react-router'
import { House } from 'lucide-react'
import useAuth from '../hooks/useAuth'
export default function Header(){
    const { user, logout } = useAuth()
    return(
    
        <header className="flex items-center justify-between border-b border-slate-200 px-12 py-4">
            <Link to="/" className="flex items-center gap-3 text-3xl font-bold">
  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
  <House />
</span>
  سَكَن
</Link>
<nav className="flex items-center gap-8 text-lg">
        <Link to="/">الرئيسية</Link>
        <Link to="/properties">العقارات</Link>
        <Link to="/agents">الوكلاء</Link>
      </nav>
            <div className="flex items-center gap-3">
        {user ? (
          <>
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="size-10 rounded-full object-cover"
              />
            )}
            <span className="font-bold">{user.name}</span>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium"
            >
              تسجيل الخروج
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium">
              تسجيل الدخول
            </Link>
            <Link to="/register" className="rounded-lg bg-emerald-700 px-5 py-2.5 font-bold text-white">
              إنشاء حساب
            </Link>
          </>
        )}
      </div>
        </header>
    )
}