'use client';

import Thai from '@/dictionary/thai';
import { useRouter } from 'next/navigation';

export default function MyForm() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-slate-300 rounded-2xl shadow-2xl flex w-full max-w-4xl">
          <div className="w-full p-5">
            <div className="py-10 text-2xl font-bold text-black text-left">

              {/* Row 1 */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.MemberNo}</label>
                <input type="text" className="w-full max-w-md p-2 rounded-xl border border-gray-300" />
              </div>

              {/* Row 2 */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.Name}</label>
                <input type="text" className="w-full max-w-md p-2 rounded-xl border border-gray-300" />
              </div>

              {/* Row 3 */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.IdNumber}</label>
                <input type="text" className="w-full max-w-md p-2 rounded-xl border border-gray-300" />
              </div>

              {/* Row 4 */}
              <div className="flex flex-col-12 items-center mb-5">
                <label className="w-full text-center mb-2">{Thai.PhoneNumber}</label>
                <input type="text" className="w-full max-w-md p-2 rounded-xl border border-gray-300" />
              </div>

            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={handleClick}
                className="py-10 px-4 text-2xl font-bold shadow-2xl text-right ml-72 text-white p-3 pt-2 pb-2 rounded-xl bg-blue-500"
              >
                {Thai.Next}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}