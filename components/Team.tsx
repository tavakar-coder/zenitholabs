import React from 'react';
import { Users, Cpu, Code2, Sparkles } from 'lucide-react';

const Team: React.FC = () => {
    const roles = [
        {
            title: "Product Managers Who Get It",
            description: "Strategic thinkers who translate your vision into actionable roadmaps. They've shipped products, felt the pressure, and know what it takes to succeed.",
            icon: Users
        },
        {
            title: "AI Automation Engineers",
            description: "Cutting-edge specialists who leverage the latest AI tools to build smarter, not harder. They know when to use Claude, when to code traditionally, and how to blend both for maximum velocity.",
            icon: Cpu
        },
        {
            title: "Full-Stack Developers",
            description: "Master craftspeople who write clean, scalable code. They balance speed with quality, using \"vibe coding\" for rapid prototyping and traditional engineering for production-grade systems.",
            icon: Code2
        }
    ];

    return (
        <section id="team" className="py-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent font-bold tracking-wider uppercase text-sm border border-black rounded-full px-3 py-1 bg-black">Our Team</span>
                    <h2 className="mt-6 text-4xl md:text-5xl font-black text-black tracking-tight">Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">New Product Team</span></h2>
                    <p className="mt-6 text-xl text-gray-500">
                        We're not a traditional agency. We're a hybrid team that thinks like founders, builds like engineers, and optimizes like growth hackers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {roles.map((role, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg text-accent">
                                <role.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">{role.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {role.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
