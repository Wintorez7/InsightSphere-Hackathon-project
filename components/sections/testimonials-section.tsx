'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "This gave me almost instant feedback for any job posting. I was working with a trial coach. I now recommend Skillyst to everyone job hunting.",
    name: "Amina Yusuf",
    role: "Product Manager",
    initials: "AY"
  },
  {
    quote: "Fast, easy, and genuinely useful. I've tried a few resume tools, but Skillyst gave the most actionable and relevant feedback.",
    name: "Ethan Brooks",
    role: "Business Analyst",
    initials: "EB"
  },
  {
    quote: "What I loved most is how it tailored suggestions based on my job title and industry. Skillyst feels personal, not generic.",
    name: "Sophia Adams",
    role: "Freelance Copywriter",
    initials: "SA"
  },
  {
    quote: "Skillyst gave my resume a professional polish. The AI feedback was spot on and helped me land more interviews in just two weeks.",
    name: "Jessica Lin",
    role: "UX Specialist",
    initials: "JL"
  },
  {
    quote: "Skillyst's AI caught small mistakes I didn't even notice. My resume now looks sharper and more targeted to the jobs I want.",
    name: "Carlos Diaz",
    role: "Project Coordinator",
    initials: "CD"
  },
  {
    quote: "Within a day of applying with my updated resume, I started getting callbacks. Skillyst works like magic.",
    name: "Liam O'Connor",
    role: "Sales Manager",
    initials: "LO"
  },
  {
    quote: "As a career switcher, I wasn't sure how to tailor my resume. Skillyst not only highlighted what to fix but suggested changes that made a real impact.",
    name: "Raj Mehta",
    role: "Backend Developer",
    initials: "RM"
  },
  {
    quote: "I used Skillyst before applying for internships. The suggestions were incredibly helpful and boosted my confidence big time.",
    name: "Priya Sharma",
    role: "Computer Science Student",
    initials: "PS"
  },
  {
    quote: "The personalized tips and instant feedback felt like working with a resume coach. Skillyst is accessible and really delivers value.",
    name: "Sophia Adams",
    role: "Technical Writer",
    initials: "SA"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What our users say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our customers have to say about us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="bg-gray-900/50 border-white/10 hover:border-white/20 transition-all"
            >
              <CardContent className="p-6">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500">
                    <AvatarFallback className="bg-transparent text-white text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
