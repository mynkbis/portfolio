import React from 'react';
import surya from "../../assets/Surya.jpg";
import user from "../../assets/user.png";
const About = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white min-h-screen p-8 relative mt-0">
      <div className="max-w-6xl pt-10 mx-auto flex flex-col md:!flex-row gap-8 items-start">
     
        <div className="md:w-2/3">
          <h1 className="!text-5xl font-bold mb-4">Hey, I'm Surya.</h1>
          <br/>
          <p className="text-xl mb-6">
            I'm a detail-oriented, design-minded software engineer passionate about building beautiful, scalable web applications.
          </p>
          
          <div className="!border-t-4 !border-teal-500 w-40  my-6"></div>
          
          <p className="mb-4">
            <span className="font-bold">With 3 years of professional experience, I've developed and designed projects ranging from automation dashboards and licensing platforms to social media apps and e-commerce websites. I specialize in crafting intuitive, responsive user experiences with React.js, Next.js, Node.js, and MongoDB, always blending clean code with thoughtful design.
            </span>
          </p>
          <br/>
          
          <p className="mb-4">
            I believe that great software isn't just functional — it feels seamless, intuitive, and brings ideas to life with precision. Whether I'm building progressive web apps, implementing robust RESTful APIs, or integrating AI/ML models into real-world solutions, my focus is on performance, scalability, and user-centered design.
          </p>
          <br/>
          <p>
            <span className="font-bold">I'm constantly learning — from new frameworks to best practices — and I see every project as an opportunity to grow, collaborate, and create something meaningful. Working with people who are passionate and curious brings out the best in me.
            </span>
            <br/>
            <br/>
          </p>
          <p>
            <span className="font-bold">
              When I'm not coding, you'll find me exploring new tech, diving into AI/ML projects, traveling, or simply enjoying a good playlist.
            </span>
          </p>
        </div>        
        <div className="w-full xl:w-1/3 mt-10">
        <div className="relative">
  <div className="overflow-hidden border-4 add-shadow bg-white rounded-md border-white w-full mx-auto">
    <img 
      src={surya} 
      alt="Profile" 
      className="w-full h-full object-cover !grayscale transition-all duration-300 hover:!grayscale-0 cursor-pointer" 
    />
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default About;