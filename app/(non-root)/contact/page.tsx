"use client"
import { useState } from "react"
import FacebookIcon from "@/components/facebook"
import LinkedinIcon from "@/components/linkedin"
import { MailIcon, ChevronDownIcon } from "lucide-react"

const faqs = [
    { question: "What is National Students' Space Challenge (NSSC)?", answer: "NSSC is India's first and largest space technology fest organized by students of IIT Kharagpur in association with Kalpana Chawla Space Technology Cell (KCSTC) and ISRO." },
    { question: "Who can participate in the events?", answer: "Any school or college student with a valid student ID card and a passion for space technology can participate." },
    { question: "How can I register for NSSC?", answer: "You can register through our official website by clicking on the 'Register' button and following the instructions." },
    { question: "Is there any registration fee?", answer: "Yes, there is a nominal registration fee which covers your participation in events, workshops, and accommodation during the fest." }
]

const page = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form Submitted:", formData)
        alert("Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "" })
    }

    return (
        <main className="w-full min-h-screen pb-20 flex flex-col items-center">
            <section className="w-full pt-10 flex justify-center max-lg:flex-col gap-10 px-10 md:px-35">
                <div className="w-full lg:w-1/2 bg-black/50 border border-[#00bfff] p-8 rounded-3xl shadow-[0_0_20px_5px_rgba(0,191,255,0.2)] backdrop-blur-md">
                    <h1 className="text-3xl text-white font-bold mb-6 drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Contact Us</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ram Singh"
                                required
                                className="bg-transparent border border-gray-600 focus:border-[#00bfff] text-white rounded-md px-4 py-3 outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="abc123@example.com"
                                required
                                className="bg-transparent border border-gray-600 focus:border-[#00bfff] text-white rounded-md px-4 py-3 outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                className="bg-transparent border border-gray-600 focus:border-[#00bfff] text-white rounded-md px-4 py-3 outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                rows={4}
                                required
                                className="bg-transparent border border-gray-600 focus:border-[#00bfff] text-white rounded-md px-4 py-3 outline-none transition-colors resize-none"
                            />
                        </div>

                        <button type="submit" className="mt-4 bg-[#00bfff] hover:bg-[#0099cc] hover:shadow-[0_0_15px_rgba(0,191,255,0.6)] text-black font-bold px-4 py-3 rounded-md transition-all duration-300">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="w-full lg:w-1/2 bg-[#0a0a0a]/80 border border-gray-700 p-8 rounded-3xl shadow-lg backdrop-blur-md flex flex-col justify-between h-full">
                    <div>
                        <h1 className="text-3xl text-white font-bold mb-6 drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Get In Touch</h1>
                        <p className="text-gray-300 mb-8 leading-relaxed border-b border-gray-700 pb-6">Please find our contact details below. We are available during standard business hours to assist you with your inquiries.</p>

                        <div className="flex flex-col gap-5">
                            <div className="bg-white/5 border border-gray-700 rounded-xl p-4 hover:border-[#00bfff]/50 hover:bg-white/10 transition-all duration-300">
                                <p className="text-sm text-[#00bfff] font-semibold mb-1 tracking-wider uppercase">Address</p>
                                <p className="font-medium text-white leading-snug">Kalpana Chawla Space Technology Cell, IIT Kharagpur</p>
                            </div>

                            <div className="bg-white/5 border border-gray-700 rounded-xl p-4 hover:border-[#00bfff]/50 hover:bg-white/10 transition-all duration-300">
                                <p className="text-sm text-[#00bfff] font-semibold mb-2 tracking-wider uppercase">Contact Details</p>
                                <p className="text-gray-300 hover:text-white transition-colors cursor-pointer mb-1">+91 97110 41079</p>
                                <p className="text-gray-300 hover:text-white transition-colors cursor-pointer mb-1">spats.co.in</p>
                                <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">spats.iitkgp@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <p className="font-bold mb-4 text-[#00bfff]">Our Social Media</p>
                        <div className="flex gap-5">
                            <a href="https://www.facebook.com/"><li className="list-none text-white hover:scale-110 hover:-translate-y-2 hover:rotate-z-20 hover:text-[#00bfff] transition-all duration-500 ease-in-out cursor-pointer"><FacebookIcon size={24} /></li></a>
                            <a href="https://linkedin.com/"><li className="list-none text-white hover:scale-110 hover:-translate-y-2 hover:rotate-z-20 hover:text-[#00bfff] transition-all duration-500 ease-in-out cursor-pointer"><LinkedinIcon size={24} /></li></a>
                            <a href="mailto:spats.iitkgp@gmail.com"><li className="list-none text-white hover:scale-110 hover:-translate-y-2 hover:rotate-z-20 hover:text-[#00bfff] transition-all duration-500 ease-in-out cursor-pointer"><MailIcon size={24} /></li></a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full max-w-4xl mt-24 px-10">
                <h2 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Frequently Asked Questions</h2>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group bg-[#0a0a0a]/80 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-md open:bg-white/5 transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 text-lg font-semibold text-white list-none hover:text-[#00bfff] transition-colors">
                                {faq.question}
                                <span className="transition group-open:rotate-180">
                                    <ChevronDownIcon size={24} />
                                </span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-gray-800 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default page