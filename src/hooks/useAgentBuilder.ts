import { useState, useEffect, useCallback, useMemo } from 'react'
import type { AgentData, SavedAgent } from '../types'


const STORAGE_KEY = 'savedAgents'

export function useAgentBuilder() {
  // ── Remote data ──────────────────────────────────────────────────────────
  const [data, setData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── Current configuration ────────────────────────────────────────────────
  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState('')
  const [resume,setResume]=useState(false)
  const [isResume,setIsResume]=useState(false)

  // ── Save / load UI ───────────────────────────────────────────────────────
  const [agentName, setAgentName] = useState('')
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])
  const [toast, setToast] = useState<string | null>(null)

  // ── Fetch config data (called once on mount via useEffect below) ─────────
  // FIX: wrapped in useCallback so it has a stable reference.
  // Original code called fetchAPI() inside every onChange handler (profile,
  // skill, layer selects), causing an unnecessary re-fetch of static JSON on
  // every user interaction.
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
      const res = await fetch('/data.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: AgentData = await res.json()
      setData(json)
    } catch (err: any) {
      setError(err.message ?? 'Failed to fetch agent data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on mount only
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Restore saved agents from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      setSavedAgents(JSON.parse(raw))
    } catch {
      // Corrupt data — ignore silently
    }
  }, [])

  // FIX: analytics heartbeat originally used an empty dep array [], which
  // captured a stale agentName closure (always ""). Now correctly re-creates
  // the interval whenever agentName changes.
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        agentName
          ? `[Analytics] Working on: "${agentName}"`
          : '[Analytics] Working on unnamed draft'
      )
    }, 8000)
    return () => clearInterval(interval)
  }, [agentName]) // ← was [] in original

  // ── Selection helpers ─────────────────────────────────────────────────────

  // FIX: original handleLayerSelect mutated the array in-place with .push()
  // then passed the same reference to the setter — React may skip re-renders
  // since the reference hasn't changed. Fixed with functional updates + spread.

  const addSkill = useCallback((id: string) => {
    setSelectedSkills((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeSkill = useCallback((id: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== id))
  }, [])

  const addLayer = useCallback((id: string) => {
    setSelectedLayers((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeLayer = useCallback((id: string) => {
    setSelectedLayers((prev) => prev.filter((l) => l !== id))
  }, [])

  const toggleProfile = useCallback((id: string) => {
    setSelectedProfile((prev) => (prev === id ? '' : id))
  }, [])

  const toggleProvider = useCallback((p: string) => {
    setSelectedProvider((prev) => (prev === p ? '' : p))
  }, [])


  const toggleResume=()=>{
    setResume(!resume)
    console.log("click funrt")
  }



  // ── Persist & load agents ─────────────────────────────────────────────────

  const saveAgent = useCallback(() => {
    if (!agentName.trim()) {
      setToast('Please name your agent first.')
      return
    }
    const newAgent: SavedAgent = {
      name: agentName.trim(),
      profileId: selectedProfile,
      skillIds: [...selectedSkills],
      layerIds: [...selectedLayers],
      provider: selectedProvider,
    }
    setSavedAgents((prev) => {
      const updated = [...prev, newAgent]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    setAgentName('')
    setToast(`"${newAgent.name}" saved.`)
  }, [agentName, selectedProfile, selectedSkills, selectedLayers, selectedProvider])

  const loadAgent = useCallback((agent: SavedAgent) => {
    setSelectedProfile(agent.profileId ?? '')
    setSelectedSkills([...(agent.skillIds ?? [])])
    setSelectedLayers([...(agent.layerIds ?? [])])
    setSelectedProvider(agent.provider ?? '')
    setAgentName(agent.name)
    setToast(`Loaded "${agent.name}".`)
  }, [])

  const deleteAgent = useCallback((index: number) => {
    setSavedAgents((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearAllAgents = useCallback(() => {
    setSavedAgents([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // ── Derived / memoised values ─────────────────────────────────────────────

  const currentProfile = useMemo(
    () => data?.agentProfiles.find((p) => p.id === selectedProfile) ?? null,
    [data, selectedProfile]
  )

  const currentSkills = useMemo(
    () => data?.skills.filter((s) => selectedSkills.includes(s.id)) ?? [],
    [data, selectedSkills]
  )

  const currentLayers = useMemo(
    () => data?.layers.filter((l) => selectedLayers.includes(l.id)) ?? [],
    [data, selectedLayers]
  )

  return {
    // data
    data,
    loading,
    error,
    fetchData,
    // selections
    selectedProfile,
    selectedSkills,
    selectedLayers,
    selectedProvider,
    toggleProfile,
    addSkill,
    removeSkill,
    addLayer,
    removeLayer,
    toggleProvider,
    // derived
    currentProfile,
    currentSkills,
    currentLayers,
    // save/load
    agentName,
    setAgentName,
    savedAgents,
    saveAgent,
    loadAgent,
    deleteAgent,
    clearAllAgents,
    // ui
    toast,
    setToast,
    toggleResume,
    resume,
    isResume,setIsResume
  }
}