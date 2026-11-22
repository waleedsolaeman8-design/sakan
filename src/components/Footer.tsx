import { Link } from 'react-router'
export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 px-12 py-10 text-slate-300">
     <div className="flex items-start justify-between gap-8">
      <div>
        <h2 className="text-3xl font-bold text-white">سَكَن</h2>
        <p>منصة عقارات أردنية لعرض الشقق والفلل والأراضي والمكاتب للبيع والإيجار.</p>
      </div>
      <nav className="flex gap-8">
  <Link to="/properties">العقارات</Link>
  <Link to="/agents">الوكلاء</Link>
  <Link to="/login">تسجيل الدخول</Link>
</nav>
</div>
      <p className="mt-8 border-t border-slate-700 pt-6 text-sm text-slate-400">© 2026 سَكَن. جميع الحقوق محفوظة.</p>
    </footer>
  )
}