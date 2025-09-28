/**
 * About Us Page Component
 * 
 * This page tells the Amanar Carbon story, showcases the team, and builds trust
 * with potential customers. It's designed to address common concerns about
 * working with a newer company in the critical carbon credit space.
 * 
 * Key sections:
 * - Company mission and vision
 * - Team member profiles with expertise
 * - Company values and approach
 * - Advisory board and credentials
 * - Call-to-action for engagement
 */

import React from 'react';
import { ArrowRight, Globe as Globe2, Target, Shield, Lightbulb } from 'lucide-react';
import { teamMembers, advisors } from '../data/team';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Independence',
      description: 'We maintain strict independence from project developers and buyers to ensure unbiased analysis.'
    },
    {
      icon: Lightbulb,
      title: 'Transparency',
      description: 'Our methodologies are published, our rationales are clear, and our processes are open to scrutiny.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'We use the latest science and technology to provide the most accurate assessments possible.'
    },
    {
      icon: Globe2,
      title: 'Impact',
      description: 'We believe better information leads to better decisions and ultimately better climate outcomes.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
              Building trust in carbon markets
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Amanar Carbon was founded on the belief that transparent, independent analysis 
              is essential for scaling effective climate action. We're building the infrastructure 
              for trust in voluntary carbon markets.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                Join Our Mission <ArrowRight className="size-5" />
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-colors">
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                To accelerate climate action by providing independent, transparent, and scientifically 
                rigorous analysis of carbon credit projects and portfolios.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that better information leads to better decisions, and better decisions 
                lead to more effective climate action. By bringing transparency and trust to carbon 
                markets, we help organizations make confident investments in climate solutions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-gray-50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">2021</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">$50M+</div>
                  <div className="text-sm text-gray-600">Credits Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">60+</div>
                  <div className="text-sm text-gray-600">Countries Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">100+</div>
                  <div className="text-sm text-gray-600">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to client relationships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                  <value.icon className="size-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team combines deep expertise in carbon markets, climate science, and technology 
              to deliver world-class analysis and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 mb-4 flex items-center justify-center text-white font-semibold text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Advisory Board</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're guided by world-renowned experts in climate economics, policy, and carbon markets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="bg-white rounded-2xl p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mb-4 flex items-center justify-center text-white font-semibold text-xl mx-auto">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-xl mb-1">{advisor.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{advisor.role}</p>
                <p className="text-gray-600 leading-relaxed mb-4">{advisor.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {advisor.expertise.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Join us in building the future of carbon markets
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Whether you're looking to join our team, partner with us, or use our platform, 
            we'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-600 font-semibold hover:bg-gray-50 transition-colors">
              View Open Positions <ArrowRight className="size-5" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 font-semibold hover:bg-white/10 transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}