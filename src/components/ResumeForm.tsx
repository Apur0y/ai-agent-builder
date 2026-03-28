import { useEffect, useState } from 'react'

interface CVModalProps {
  onClose: () => void
  setIsResume:(boolean:any) => void
}

export default function ResumeForm({ onClose,setIsResume }: CVModalProps) {
  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    portfolio: '',
    github: '',
    linkedin: '',
    summary: '',
  })

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted CV Data:', form)
  }

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl
            bg-zinc-950 border border-white/10 shadow-2xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-zinc-100">Create CV</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white cursor-pointer">✕</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

            {/* Basic Info */}
            <Section title="Basic Info">
              <Input label="Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Title" name="title" value={form.title} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="Location" name="location" value={form.location} onChange={handleChange} />
            </Section>

            {/* Links */}
            <Section title="Links">
              <Input label="Portfolio" name="portfolio" value={form.portfolio} onChange={handleChange} />
              <Input label="GitHub" name="github" value={form.github} onChange={handleChange} />
              <Input label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
            </Section>

            {/* Summary */}
            <Section title="Summary">
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-md bg-white/[0.03] border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-amber-500"
                placeholder="Write your summary..."
              />
            </Section>

            {/* Submit */}
            <button
              type="button"
              onClick={()=>setIsResume(true)}
              className="mt-4 py-3 rounded-lg bg-amber-500/90 text-black font-semibold hover:bg-amber-400 transition cursor-pointer"
            >
              Submit CV
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-zinc-500 font-mono">{label}</label>
      <input
        {...props}
        className="p-2 rounded-md bg-white/[0.03] border border-white/10 text-sm text-zinc-300 focus:outline-none focus:border-amber-500"
      />
    </div>
  )
}

function Section({ title, children }: any) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-mono text-amber-500 tracking-wider">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  )
}