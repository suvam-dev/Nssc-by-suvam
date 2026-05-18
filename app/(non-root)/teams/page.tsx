"use client"
import TeamCard from "@/components/ui/TeamCard";
const nsscTeamData = {
  heads: [
    { name: "Anaya Dixit", role: "Guest Lectures and Workshops Head", fb: "", linkedin: "", mail: "" },
    { name: "Anushesh Jumale", role: "Finance Head", fb: "", linkedin: "", mail: "" },
    { name: "Arnav Gupta", role: "Events Management Head", fb: "", linkedin: "", mail: "" },
    { name: "Mehedhi Hassan", role: "Public Relations Head", fb: "", linkedin: "", mail: "" },
    { name: "Mukesh N", role: "Design and Media Head", fb: "", linkedin: "", mail: "" },
    { name: "Om Dabhade", role: "Tech Head", fb: "", linkedin: "", mail: "" },
    { name: "Priyanshi Mittal", role: "Design and Media Head", fb: "", linkedin: "", mail: "" },
    { name: "Shaurya Singh Raghaw", role: "Sponsorship and Marketing Head", fb: "", linkedin: "", mail: "" },
    { name: "Shradha", role: "Events Management Head", fb: "", linkedin: "", mail: "" },
    { name: "T. Susritha", role: "Tech Head", fb: "", linkedin: "", mail: "" },
    { name: "Tusharanshu Pandey", role: "Guest Lectures and Workshops Head", fb: "", linkedin: "", mail: "" },
    { name: "Vedant Malsure", role: "Public Relations Head", fb: "", linkedin: "", mail: "" }
  ],
  subheads: [
    { name: "Aadi Mittal", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Aanchal Shah", team: "Sponsorship Team", fb: "", linkedin: "", mail: "" },
    { name: "Aanya Singhal", team: "Public Relations Team", fb: "", linkedin: "", mail: "" },
    { name: "Abhinam Dutta", team: "Design Team", fb: "", linkedin: "", mail: "" },
    { name: "Abhinav Singh", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Aman Rathore", team: "Public Relations Team", fb: "", linkedin: "", mail: "" },
    { name: "Anushka Singh", team: "Sponsorship Team", fb: "", linkedin: "", mail: "" },
    { name: "Ashutosh Mishra", team: "Design Team", fb: "", linkedin: "", mail: "" },
    { name: "Atmaja Saraikar", team: "Design Team", fb: "", linkedin: "", mail: "" },
    { name: "Avani Dandawate", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Ayush Kumar", team: "Design Team", fb: "", linkedin: "", mail: "" },
    { name: "Durga Sai", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Gunda Gnanesh", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Harshit Singh", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Iccha", team: "Sponsorship Team", fb: "", linkedin: "", mail: "" },
    { name: "Ishan Krish", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Kamalesh Acharya", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Md Zayed Ghanchi", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Meenu Singh", team: "Sponsorship Team", fb: "", linkedin: "", mail: "" },
    { name: "Nandana", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Nishita Gupta", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Parth Sarthi", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Piyush Dande", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Pranam Goyal", team: "Public Relations Team", fb: "", linkedin: "", mail: "" },
    { name: "Praneet Dixit", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Pratik Kumar Verma", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Rupesh Vinayak", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Rupya", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Sachin Kumar", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Sarang Gilhotra", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Shashwat Dixit", team: "Public Relations Team", fb: "", linkedin: "", mail: "" },
    { name: "Shivam Udiya", team: "Sponsorship Team", fb: "", linkedin: "", mail: "" },
    { name: "Sidhant Mishra", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Snehjeet Ambagade", team: "Public Relations Team", fb: "", linkedin: "", mail: "" },
    { name: "Soham S. Thakur", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Srajan Gupta", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Sulagna Basack", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Uttam Meghwal", team: "Public Relations Team", fb: "", linkedin: "", mail: "" },
    { name: "Ved Pradhan", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Vedant Vijay Patil", team: "Events Team", fb: "", linkedin: "", mail: "" },
    { name: "Vipin Raj", team: "Tech Team", fb: "", linkedin: "", mail: "" },
    { name: "Yash Shah", team: "Events Team", fb: "", linkedin: "", mail: "" }
  ]
};
const page = () => {
  return (
    <main className="min-h-screen px-10 flex items-center flex-col">
      <h2 className="font-extrabold text-3xl mx-auto my-3 mb-5 text-white drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Heads</h2>
      <div className="flex flex-wrap justify-center gap-5  md:gap-10">
        {nsscTeamData.heads.map((head, index) => (
          <TeamCard key={index} name={head.name} role={head.role} fb={head.fb} linkedin={head.linkedin} mail={head.mail} />
        ))}
      </div>
      <h2 className="font-extrabold text-3xl mx-auto my-10 text-white drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">SubHeads</h2>
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        {nsscTeamData.subheads.map((subhead, index) => (
          <TeamCard key={index} name={subhead.name} role={subhead.team} fb={subhead.fb} linkedin={subhead.linkedin} mail={subhead.mail} />
        ))}
      </div>
    </main>
  )
}

export default page;