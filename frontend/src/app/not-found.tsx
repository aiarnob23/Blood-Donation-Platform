import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <div className="text-center mx-auto">
       <h1 
  style={{ backgroundImage: "url('/images/background/red1.png')", backgroundSize: 'cover'}} 
  className="text-[100px] lg:text-[300px] font-bold text-transparent bg-clip-text mb-4"
>
  404
</h1>
        <h2 className="text-[30px] lg:text-[40px] font-medium text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 lg:text-[12px] mb-8">Could not find the requested resource</p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
        >
          <Home className="w-6 h-6" />
          Go Home
        </Link>
      </div>
    </div>
  )
}