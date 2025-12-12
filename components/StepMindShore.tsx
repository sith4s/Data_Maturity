
import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, Mail, Calendar, ExternalLink, ShieldCheck, 
  Zap, Database, BrainCircuit, Users, Compass, X, Building2, Briefcase,
  Globe2, Award, Cpu, Code2, LayoutGrid
} from 'lucide-react';
import clsx from 'clsx';

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

interface StepMindShoreProps {
  onBack: () => void;
  onRestart: () => void;
}

export const StepMindShore: React.FC<StepMindShoreProps> = ({ onBack, onRestart }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    message: ''
  });

  // Services with updated structure for categorized tags
  const services = [
    { 
      title: "Software Engineering & Application Development", 
      icon: <Code2 size={20} className="text-blue-600"/>, 
      desc: "Tailored flexible solutions: Backend, Frontend, Full Stack & Mobile. Expert application development using modern languages and frameworks. Cloud-native, scalable, and secure architecture design.",
      tagGroups: [
        { label: "DOMENOWE", tags: ["OUTSOURCING", "ARCHITECTURE", "SCRUM TEAMS", "APPLICATION SECURITY"] },
        { label: "TECHNOLOGICZNE", tags: ["PYTHON", "JAVA", "NODE.JS / REACT", "KUBERNETES / DOCKER"] }
      ]
    },
    { 
      title: "ERP & CRM Systems", 
      icon: <Database size={20} className="text-teal-600"/>, 
      desc: "Consulting, implementation & support for business processes, ensuring compliance and efficient audit trails.",
      tags: ["SAP", "SALESFORCE", "DYNAMICS 365", "COMPLIANCE & AUDIT"]
    },
    { 
      title: "QA Automation & DevOps", 
      icon: <ShieldCheck size={20} className="text-purple-600"/>, 
      desc: "Flawless functionality from unit testing to acceptance. We specialize in building robust CI/CD pipelines and integrating DevSecOps practices, ensuring successful User Acceptance.",
      tagGroups: [
        { label: "PROCESOWE", tags: ["ISO 9001", "TOOL INTEGRATION", "USER ACCEPTANCE (FUAM)"] },
        { label: "NARZĘDZIOWE", tags: ["AUTOMATION", "CI/CD", "SECURITY TESTING / DEVSECOPS", "AZURE DEVOPS / GITLAB"] }
      ]
    },
    { 
      title: "Data & AI Solutions", 
      icon: <BrainCircuit size={20} className="text-rose-600"/>, 
      desc: "As a Microsoft Partner, we empower organizations with advanced Data, Analytics, and AI capabilities. We build scalable solutions using the latest platforms, adhering to strict data governance principles across Azure, AWS, and GCP.",
      tagGroups: [
        { label: "PLATFORMOWE", tags: ["MS FABRIC", "DATABRICKS", "POWER BI", "ML OPS", "CLOUD DATA WAREHOUSING"] },
        { label: "DZIEDZINOWE", tags: ["DATA & ANALYTICS", "POWER PLATFORM", "AZURE AI", "DATA GOVERNANCE"] }
      ]
    }
  ];

  const handleScheduleBriefing = () => {
    const subject = encodeURIComponent("Executive Briefing Request – Data Maturity Assessment Completed");
    const body = encodeURIComponent(`Hello MindShore Team,

I have just completed the Data Maturity Assessment and would like to discuss the CoMind model and strategic alignment.

Company: ${formData.company || '[Not provided]'}
Role: ${formData.role || '[Not provided]'}

Looking forward to your insights.

Best regards,
${formData.name || '[Name not provided]'}`);

    window.location.href = `mailto:info@mindshore.io?subject=${subject}&body=${body}`;
    window.dataLayer?.push({ event: 'executive_briefing_requested' });
  };

  const handleViewPortfolio = () => {
    window.open("https://portfolio.mindshore.io/#catalog", "_blank", "noopener,noreferrer");
    window.dataLayer?.push({ event: 'portfolio_visit' });
  };

  const handleViewWebsite = () => {
    window.open("https://mindshore.io/", "_blank", "noopener,noreferrer");
    window.dataLayer?.push({ event: 'website_visit' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Lead from Assessment – ${formData.company || 'Company not specified'}`);
    const body = encodeURIComponent(`NEW LEAD – Data Maturity Assessment

Name: ${formData.name}
Company: ${formData.company}
Role: ${formData.role}
Email: ${formData.email}

Message:
${formData.message}

---
Source: MindShore Data Maturity Assessment`);

    window.location.href = `mailto:info@mindshore.io?subject=${subject}&body=${body}`;

    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);

    window.dataLayer?.push({ 
      event: 'contact_form_submitted',
      company: formData.company,
      role: formData.role
    });

    setIsContactModalOpen(false);
    setFormData({ name: '', company: '', role: '', email: '', message: '' });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
            <Compass size={14} /> Engaged Experts
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1240] mb-4 tracking-tight">
            Successful IT Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are the pioneer high value-added technology partner, providing outsourcing, remote & nearshore solutions to help you achieve the highest level of agility.
          </p>
        </div>

        {/* CORE SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed flex-grow">{service.desc}</p>
              
              <div className="mt-auto space-y-3">
                {/* Render Tag Groups if available */}
                {service.tagGroups ? (
                  service.tagGroups.map((group, gIdx) => (
                    <div key={gIdx}>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{group.label}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.tags.map((tag, t) => (
                          <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase rounded-md border border-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback for simple tags
                  <div className="flex flex-wrap gap-2">
                     {service.tags?.map((tag, t) => (
                        <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-md border border-slate-200">
                          {tag}
                        </span>
                     ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ENGAGEMENT MODELS (Verified against PDF Page 10) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* EXECUTIVE / STRATEGIC */}
          <div className="bg-[#0B1240] text-white p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Zap className="text-teal-300" size={24} />
                </div>
                <h3 className="text-2xl font-bold">MindShore for Executives</h3>
              </div>
              <p className="text-blue-100 mb-8 leading-relaxed font-light text-lg">
                Achieve agility and dynamism without taking risks. We facilitate the development of your company with the best global talent.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                   <div className="mt-1"><CheckCircle2 className="text-teal-400" size={20} /></div>
                   <div>
                     <h4 className="font-bold text-white text-sm">CoMind (Hybrid Model)</h4>
                     <p className="text-xs text-blue-200 mt-1">Senior work cells strategically aligned with you to co-create business value.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="mt-1"><CheckCircle2 className="text-teal-400" size={20} /></div>
                   <div>
                     <h4 className="font-bold text-white text-sm">Turnkey Projects</h4>
                     <p className="text-xs text-blue-200 mt-1">Closed solutions from start to finish. We handle planning, execution, and delivery.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="mt-1"><LayoutGrid className="text-teal-400" size={20} /></div>
                   <div>
                     <h4 className="font-bold text-white text-sm cursor-pointer hover:text-teal-300 transition-colors" onClick={handleViewPortfolio}>Data & AI Solutions</h4>
                     <p className="text-xs text-blue-200 mt-1 cursor-pointer hover:text-white transition-colors" onClick={handleViewPortfolio}>Explore our portfolio of transformative projects.</p>
                   </div>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                  <button onClick={handleScheduleBriefing} className="flex-1 bg-white text-[#0B1240] px-6 py-4 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Calendar size={18} /> Schedule Briefing
                  </button>
                  <button onClick={handleViewPortfolio} className="flex-1 border-2 border-white/20 text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <LayoutGrid size={18} /> View Portfolio
                  </button>
              </div>
            </div>
          </div>

          {/* ENGINEERING / OPERATIONAL */}
          <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <Cpu className="text-blue-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Engineering Leaders</h3>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                We act as your reliable IT arm. Our teams are designed to be "AI Ready" and seamlessly integrate into your operations.
              </p>
              
               <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                   <div className="mt-1"><ShieldCheck className="text-blue-600" size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm">Time & Material (Outsourcing)</h4>
                     <p className="text-xs text-slate-500 mt-1">Reinforce your teams. You manage resources, we guarantee reliable, flexible talent.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="mt-1"><ShieldCheck className="text-blue-600" size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm">Tech & Talent Ready</h4>
                     <p className="text-xs text-slate-500 mt-1">Agile implementation of generative AI, automation, and predictive analytics (Azure, AWS, GCP).</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="mt-1"><ShieldCheck className="text-blue-600" size={20} /></div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm">Certified Quality</h4>
                     <p className="text-xs text-slate-500 mt-1">ISO 9001, ISO 20000-1, ISO 27001 certified for security and service management.</p>
                   </div>
                </div>
              </div>

              <button onClick={handleViewWebsite} className="w-full border-2 border-[#0B1240] text-[#0B1240] px-6 py-4 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <ExternalLink size={18} /> Visit MindShore.io
              </button>
            </div>
          </div>
        </div>

        {/* TRUST & GLOBAL FOOTPRINT (PDF Pages 11 & 13) */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
           <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                 <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Globe2 size={16} /> Global Presence
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {['Spain (Global HQ)', 'USA', 'UK', 'Poland (Data & AI HUB)', 'Mexico', 'Colombia', 'Argentina', 'Chile', 'Ecuador', 'Peru'].map(loc => (
                       <span key={loc} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                         {loc}
                       </span>
                    ))}
                 </div>
              </div>
              <div className="md:border-l border-slate-200 md:pl-8">
                 <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Award size={16} /> Certifications
                 </h4>
                 <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                       <span className="text-xl font-black text-slate-900">ISO 9001</span>
                       <span className="text-[10px] text-slate-500 uppercase">Quality</span>
                    </div>
                    <div className="w-px h-8 bg-slate-300"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-xl font-black text-slate-900">ISO 20000-1</span>
                       <span className="text-[10px] text-slate-500 uppercase">IT Services</span>
                    </div>
                    <div className="w-px h-8 bg-slate-300"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-xl font-black text-slate-900">ISO 27001</span>
                       <span className="text-[10px] text-slate-500 uppercase">Info Sec</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-200 pt-8 mt-12 gap-6">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-[#0B1240] font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Roadmap
          </button>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button onClick={onRestart} className="text-slate-500 hover:text-[#0B1240] font-medium px-6 py-3 transition-colors">
              Start New Assessment
            </button>
            <button onClick={() => setIsContactModalOpen(true)} className="flex items-center justify-center gap-2 bg-[#0B1240] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Mail size={18} /> Contact Our Team
            </button>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom z-50">
          <CheckCircle2 size={20} />
          <span className="font-semibold">Message sent! We’ll reply within 24 hours.</span>
        </div>
      )}

      {/* CONTACT MODAL */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close">
              <X size={24} />
            </button>
            <div className="text-center mb-8">
              <Mail size={48} className="text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <h3 id="contact-modal-title" className="text-2xl font-bold text-slate-900">Get in Touch</h3>
              <p className="text-slate-600 mt-2">We typically respond within 24 hours</p>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="flex gap-3">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input type="text" placeholder="Company" required value={formData.company} onChange={e => setFormData(prev => ({...prev, company: e.target.value}))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="text" placeholder="Your Role (e.g. CDO, Head of Data)" required value={formData.role} onChange={e => setFormData(prev => ({...prev, role: e.target.value}))}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input type="email" placeholder="your.email@company.com" required value={formData.email} onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="How can we help you with your data & AI transformation?" required rows={4} value={formData.message} onChange={e => setFormData(prev => ({...prev, message: e.target.value}))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <button type="submit" className="w-full bg-[#0B1240] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
