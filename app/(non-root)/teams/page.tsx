import { Mail } from "lucide-react"
import FacebookIcon from "@/components/facebook"
import LinkedinIcon from "@/components/linkedin"
const data = {
  name: "Suvam Ghosh",
  fb: "www.faceboook.com",
  insta: "www.insta.com"
}
const page = () => {
  return (
    <main className="min-h-screen px-10">
      <h1>Teams Page</h1>
      <div className="w-full max-w-72 max-h-85 rounded-3xl flex flex-col items-center bg-black border-light-50 border-1 py-4 shadow-[0_0_30px_rgba(0,191,255,0.3)]">
        <div className="w-40 h-40 mx-auto rounded-full bg-red-300 mt-5 ">Image</div>
        <h1 className="text-2xl text-[#00bfff] font-bold mt-3">Suvam Ghosh</h1>
        <h4 className="text-gray-300 mb-4">Tech Subhead</h4>
        <div className="w-full h-[.1px] bg-[#00bfff] mb-4"></div>
        <div className="flex justify-center items-center gap-5">
          <li className="list-none text-white hover:scale-110 hover:-translate-y-1 hover:text-[#00bfff] transition-all duration-300 ease-in-out cursor-pointer"><Mail size={24} /></li>
          <li className="list-none text-white hover:scale-110 hover:-translate-y-1 hover:text-[#00bfff] transition-all duration-300 ease-in-out cursor-pointer"><LinkedinIcon size={24} /></li>
          <li className="list-none text-white hover:scale-110 hover:-translate-y-1 hover:text-[#00bfff] transition-all duration-300 ease-in-out cursor-pointer"><FacebookIcon size={24} /></li>
          <li className="list-none text-white hover:scale-110 hover:-translate-y-1 hover:text-[#00bfff] transition-all duration-300 ease-in-out cursor-pointer"><InstagramIcon size={24} /></li>
        </div>
      </div>
    </main>
  )
}

export default page;