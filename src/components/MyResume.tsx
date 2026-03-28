import { useEffect } from 'react'

interface CVModalProps {
  onClose: () => void
}

const CV_DATA = {
  name: 'Apu Roy',
  title: 'Full-Stack Developer',
  location: 'Bangladesh',
  phone: '+880-1786209895',
  email: 'apuroy2785@gmail.com',
  portfolio: 'https://your-portfolio.com',
  linkedin: 'https://linkedin.com/in/apuroy',
  github: 'https://github.com/apuroy',
  leetcode: 'https://leetcode.com/apuroy',
  codeforces: 'https://codeforces.com/profile/apuroy',

  summary:
    'Full-stack developer passionate about building scalable, high-performance web applications. Skilled in modern frontend and backend technologies with hands-on experience in real-world projects.',

  experience: [
    {
      role: 'Frontend Developer — AI Department',
      company: 'SM Technology',
      period: 'May 2025 – Oct 2025',
      bullets: [
        'Worked with Next.js, RTK Query, React Hook Form and integrated RESTful APIs.',
        'Enhanced form handling and authentication with Zod, cutting validation errors by 40%.',
      ],
    },
  ],

  projects: [
    {
      name: 'Eland',
      subtitle: 'AI Land Analysis Platform',
      period: 'March 2026',
      tech: ['Next.js', 'TypeScript', 'Express.js', 'Mongoose', 'Gemini AI'],
      bullets: [
        'AI-powered land investment platform with price prediction, risk analysis, and ROI calculation.',
        'Scalable MVC backend with JWT auth, admin dashboard, and Docker deployment.',
      ],
    },
    {
      name: 'Career Path',
      subtitle: 'Job Searching Platform',
      period: 'July 2025',
      tech: ['Next.js', 'TypeScript', 'Express.js', 'Stripe', 'Redux RTK Query'],
      bullets: [
        'Subscription-based payment system with Stripe.',
        'Full admin and employee dashboards with complete user and job control.',
      ],
    },
    {
      name: 'Edu Quest',
      subtitle: 'Online Teaching Platform',
      period: 'December 2024',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Firebase', 'JWT'],
      bullets: [
        'Firebase authentication and JWT for secure user access.',
        'Efficient CRUD operations with MongoDB for fast data management.',
      ],
    },
    {
      name: 'Ezy Ticket',
      subtitle: 'Ticket Booking Platform',
      period: 'April 2025',
      tech: ['React.js', 'Node.js', 'Redux', 'SSLCommerz', 'Firebase'],
      bullets: [
        'Context API and Redux Toolkit for organized state management.',
        'Secure SSLCommerz payment integration.',
      ],
    },
  ],

  skills: {
    Language: ['TypeScript', 'JavaScript', 'C++', 'Python'],
    Frontend: ['Next.js', 'React.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
    Backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'JWT', 'Firebase Auth', 'REST API'],
    Tools: ['Git', 'GitHub', 'Redux Toolkit', 'WebSocket', 'Postman', 'Figma', 'TanStack Query', 'Vercel', 'Docker', 'Zod'],
  },

  education: {
    degree: 'B.Sc. in Mathematics',
    university: 'Gopalganj Science and Technology University (GSTU)',
    period: '2020 – 2025',
  },
}

const SKILL_COLORS: Record<string, string> = {
  Language: '#f59e0b',
  Frontend: '#3b82f6',
  Backend: '#10b981',
  Tools: '#a855f7',
}

export default function MyResume({ onClose }: CVModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl
            bg-zinc-950 border border-white/10 shadow-2xl pointer-events-auto
            animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="sticky top-0 z-10 flex items-start justify-between px-8 pt-8 pb-5
            bg-zinc-950 border-b border-white/5">
            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-amber-500/70 mb-1">
                DEVELOPER PROFILE
              </p>
              <h2 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'Syne, sans-serif' }}>
                {CV_DATA.name}
              </h2>
              <p className="text-sm text-zinc-500 font-mono mt-0.5">{CV_DATA.title}</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Download CV */}
              <a
                href="/Apu Roy Resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono
                  bg-amber-500/10 border border-amber-500/30 text-amber-400
                  hover:bg-amber-500/20 transition-colors"
              >
                ↓ Download CV
              </a>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer
                  text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all text-lg"
              >
                ×
              </button>
            </div>
          </div>

          {/* ── Body ─────────────────────────────────────────────────────── */}
          <div className="px-8 py-6 flex flex-col gap-8">

            {/* Contact row */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: CV_DATA.email, href: `mailto:${CV_DATA.email}`, icon: '✉' },
                { label: 'Portfolio', href: CV_DATA.portfolio, icon: '◈' },
                { label: 'GitHub', href: CV_DATA.github, icon: '⌥' },
                { label: 'LinkedIn', href: CV_DATA.linkedin, icon: '⬡' },
                { label: 'LeetCode', href: CV_DATA.leetcode, icon: '◆' },
                { label: 'Codeforces', href: CV_DATA.codeforces, icon: '◇' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono
                    bg-white/[0.03] border border-white/[0.08] text-zinc-400
                    hover:border-amber-500/30 hover:text-amber-400 transition-all"
                >
                  <span className="text-amber-500/60">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Summary */}
            <div>
              <SectionLabel>SUMMARY</SectionLabel>
              <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                {CV_DATA.summary}
              </p>
            </div>

            {/* Skills */}
            <div>
              <SectionLabel>SKILLS</SectionLabel>
              <div className="flex flex-col gap-3 mt-3">
                {Object.entries(CV_DATA.skills).map(([category, items]) => (
                  <div key={category} className="flex items-start gap-3">
                    <span
                      className="text-[10px] font-mono tracking-wider pt-0.5 w-20 shrink-0"
                      style={{ color: SKILL_COLORS[category] }}
                    >
                      {category.toUpperCase()}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded text-xs font-mono border"
                          style={{
                            color: SKILL_COLORS[category],
                            borderColor: SKILL_COLORS[category] + '33',
                            background: SKILL_COLORS[category] + '11',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <SectionLabel>EXPERIENCE</SectionLabel>
              <div className="flex flex-col gap-4 mt-3">
                {CV_DATA.experience.map((exp) => (
                  <div key={exp.role} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <div className="w-px flex-1 bg-white/[0.06] mt-1" />
                    </div>
                    <div className="pb-4">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-zinc-100 font-mono">
                          {exp.role}
                        </h3>
                        <span className="text-xs text-amber-500/80 font-mono">{exp.company}</span>
                        <span className="text-xs text-zinc-600 font-mono ml-auto">{exp.period}</span>
                      </div>
                      <ul className="mt-2 flex flex-col gap-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="text-xs text-zinc-500 leading-relaxed flex gap-2">
                            <span className="text-amber-500/40 shrink-0 mt-0.5">▸</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <SectionLabel>PROJECTS</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {CV_DATA.projects.map((project) => (
                  <div
                    key={project.name}
                    className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.07]
                      hover:border-amber-500/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-zinc-100 font-mono">
                        {project.name}
                      </h3>
                      <span className="text-[10px] text-zinc-600 font-mono shrink-0 mt-0.5">
                        {project.period}
                      </span>
                    </div>
                    <p className="text-xs text-amber-500/70 font-mono mb-2">
                      {project.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-px rounded
                            bg-white/[0.04] border border-white/[0.08] text-zinc-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ul className="flex flex-col gap-1">
                      {project.bullets.map((b, i) => (
                        <li key={i} className="text-[11px] text-zinc-500 leading-relaxed flex gap-1.5">
                          <span className="text-amber-500/40 shrink-0 mt-0.5">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <SectionLabel>EDUCATION</SectionLabel>
              <div className="flex items-center gap-4 mt-3 p-4 rounded-lg
                bg-white/[0.02] border border-white/[0.07]">
                <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/20
                  flex items-center justify-center text-amber-400 text-sm shrink-0">
                  ◎
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100 font-mono">
                    {CV_DATA.education.degree}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{CV_DATA.education.university}</p>
                </div>
                <span className="text-xs text-zinc-600 font-mono ml-auto shrink-0">
                  {CV_DATA.education.period}
                </span>
              </div>
            </div>

            {/* Problem solving */}
            <div>
              <SectionLabel>PROBLEM SOLVING</SectionLabel>
              <div className="flex gap-3 mt-3">
                {[
                  { platform: 'LeetCode', href: CV_DATA.leetcode, color: '#f59e0b' },
                  { platform: 'Codeforces', href: CV_DATA.codeforces, color: '#3b82f6' },
                ].map((ps) => (
                  <a
                    key={ps.platform}
                    href={ps.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono
                      bg-white/[0.03] border border-white/[0.08] transition-all
                      hover:border-white/20"
                    style={{ color: ps.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: ps.color }}
                    />
                    {ps.platform}: Apu Roy
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-700">
              {CV_DATA.phone} · {CV_DATA.location}
            </span>
            <a
              href="/cv.pdf"
              download
              className="text-[10px] font-mono text-amber-500/60 hover:text-amber-400 transition-colors"
            >
              ↓ cv.pdf
            </a>
          </div>

        </div>
      </div>
    </>
  )
}

// Small helper for consistent section labels
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono tracking-[0.15em] text-zinc-600">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  )
}