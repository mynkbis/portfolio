import React from 'react';
import { Settings, Palette, Lightbulb, Check, Settings2, SettingsIcon, Wrench } from 'lucide-react';
import skillsForMe from "../../assets/Skills.png";
import { Code, Package, GitBranch, Cpu, Layers, Server } from 'lucide-react'
import "../../App.css"

const Skills = () => {

    const techStack = [
        { name: 'JavaScript', icon: <Code size={30} /> },
        { name: 'HTML5', icon: <Package size={30} /> },  // Example, you can swap with HTML-related icon
        { name: 'CSS3', icon: <Layers size={30} /> }, // Example, you can swap with CSS-related icon
        { name: 'Jekyll', icon: <Package size={30} /> }, // Example icon, replace with one related to Jekyll
        { name: 'Python', icon: <Cpu size={30} /> }, // You can use a generic CPU icon for Python, or use an image
        { name: 'React.js', icon: <GitBranch size={30} /> }, // Example, you can replace with React-specific icon if available
        { name: 'Next.js', icon: <Server size={30} /> }, // Replace with a more relevant icon if available
        { name: 'Node.js', icon: <Cpu size={30} /> }, // Using a CPU icon as a placeholder for Node.js
        { name: 'Git', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'Typescript', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'Mongodb', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'Redux', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'Express.js', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'AI/ML', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'OpenAI', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'AWS EC2', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'AWS S3', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
        { name: 'AWS IAM', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
    ];

    return (
        <div className="relative min-h-screen">
            {/* Background Image Section */}
            <div className="absolute inset-0 z-0">
                <img
                    src={"https://shethink.in/wp-content/uploads/2021/07/react.js-img.png"}
                    alt="Aboutme"
                    className="w-full h-full object-cover !blur-[2px] opacity-80" // Adjusted opacity here
                />
            </div>
            {/* Dark Overlay */}
            <div className="bg-black absolute inset-0 opacity-90"></div>
            <div className="max-w-6xl mx-auto p-8 text-white z-20 relative">
                <span className="text-6xl text-center !text-white/80 font-bold mb-4">Skills</span>
                <div className="border-t-2 border-teal-500 w-32 mb-16"></div>
                <div className="flex flex-col gap-10">
                    {/* Development Section */}
                    <div>
                        <div className="flex items-center mb-8">
                            <Settings className="text-white/80 mr-4" size={24} />
                            <h2 className="text-2xl font-bold uppercase tracking-wider">Development</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
                            {techStack.map((tech, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    <div className="flip-card w-24 h-24 cursor-pointer">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front rounded-full bg-white border border-gray-700 flex items-center justify-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-gray-300">{tech.icon}</div>
                                                    <span className="text-sm text-gray-300 font-bold">{tech.name}</span>
                                                </div>
                                            </div>
                                            <div className="flip-card-back rounded-full bg-teal-600 text-white flex items-center justify-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div>{tech.icon}</div>
                                                    <span className="text-sm font-bold">{tech.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                    {/* Design Section */}
                    <div>
                        <div className="flex items-center mb-8">
                            <Palette className="text-white/80 mr-4" size={24} />
                            <h2 className="text-2xl font-bold uppercase tracking-wider">Design FrameWorks & Libraries</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-6">
                            {[
                                { name: 'Tailwind CSS', icon: '🌪️' },
                                { name: 'Chakra UI', icon: '✨' },
                                { name: 'Material UI', icon: '🎨' },
                                { name: 'Ant Design', icon: '🐜' },
                                { name: 'Bootstrap', icon: '🅱️' },
                                { name: 'Shadcn UI', icon: '🔧' },
                                { name: 'Radix UI', icon: '📐' }
                            ].map((tool, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    <div className="flip-card w-24 h-24 cursor-pointer">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front rounded-full bg-white border border-gray-700 flex items-center justify-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-gray-300 text-2xl">{tool.icon}</div>
                                                    <span className="text-sm text-gray-300 font-bold">{tool.name}</span>
                                                </div>
                                            </div>
                                            <div className="flip-card-back rounded-full bg-teal-600 text-white flex items-center justify-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="text-2xl">{tool.icon}</div>
                                                    <span className="text-sm font-bold">{tool.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Tools Section */}
                        <div className='flex flex-col justify-between mt-10'>
                            <div className='mb-8'>
                                <div className="flex items-center mb-8">
                                    <Wrench className="text-white/80 mr-4" size={24} />
                                    <h2 className="text-2xl font-bold uppercase tracking-wider">Tools</h2>
                                </div>
                                <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                    {[
                                        'Git + Github',
                                        'Command Line',
                                        'Chrome DevTools',
                                        'Postman',
                                        'VS Code',
                                        'Docker',
                                        'Jira',
                                        'Slack',
                                        'Vercel',
                                        'Netlify',
                                        'ESLint',
                                        'MongoDB Compass/Atlas',
                                    ]
                                        .map((tool, index) => (
                                            <li key={index} className="flex items-center">
                                                <Check className="text-gray-400 mr-2" size={18} />
                                                <span className="text-lg font-medium whitespace-nowrap">{tool}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            {/* Knowledge Section */}
                            <div>
                                <div className="flex items-center border mb-8">
                                    <Lightbulb className="text-white/80 mr-4" size={24} />
                                    <h2 className="text-2xl font-bold uppercase tracking-wider">Knowledge</h2>
                                </div>

                                <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                    {[
                                        'Responsive Design',
                                        'Cross-Browser Compatibility',
                                        'Accessibility (a11y)',
                                        'State Management',
                                        'Authentication & Authorization',
                                        'API Integration (REST, GraphQL)',
                                        'Microservices Architecture',
                                        'Unit Testing & Integration Testing',
                                        'Version Control (Git)',
                                        'Continuous Integration/Deployment (CI/CD)',
                                        //   'Serverless Functions',
                                        'Progressive Web Apps (PWA)',
                                        'Headless CMS',
                                        'Cloud Basics (AWS)',
                                        'Lazy Loading',
                                        'Internationalization (i18n)',
                                        'Component-Driven Development',
                                    ]
                                        .map((knowledge, index) => (
                                            <li key={index} className="flex items-center">
                                                <Check className="text-gray-400 mr-2" size={18} />
                                                <span className="text-lg font-medium">{knowledge}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>     </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
