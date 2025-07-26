
import Link from "next/link";


export default function Home() {
  return (
    <>
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen flex items-center justify-center">

  <div className="bg-black py-8 px-28 rounded-2xl shadow-xl w-fit text-center ">
    <h1 className="text-3xl font-bold text-red-400 mb-4">Bienvenido</h1>
    <p className="text-gray-600 mb-6">Haz clic para ingresar al dashboard</p>
    <Link href="/dashboard" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
      Ingresar al Dashboard
    </Link>
  </div>

</div>
    </>
  );
}
