import { useState } from "react";
import CatalogCard from "./CatalogCard";
import type { AgentData } from "../types";
import { CATALOG_TABS, type CatalogTab } from "../constants";

interface CatalogPanelProps {
  data: AgentData | null;
  loading: boolean;
  error: string | null;
  selectedProfile: string;
  selectedSkills: string[];
  selectedLayers: string[];
  onToggleProfile: (id: string) => void;
  onToggleSkill: (id: string) => void;
  onToggleLayer: (id: string) => void;
}

export default function CatalogPanel({
  data,
  loading,
  error,
  selectedProfile,
  selectedSkills,
  selectedLayers,
  onToggleProfile,
  onToggleSkill,
  onToggleLayer,
}: CatalogPanelProps) {
  const [activeTab, setActiveTab] = useState<CatalogTab>("profiles");

  const handleClick = (id: string) => {
    if (activeTab === "profiles") onToggleProfile(id);
    else if (activeTab === "skills") onToggleSkill(id);
    else onToggleLayer(id);
  };

  const isSelected = (id: string) => {
    if (activeTab === "profiles") return selectedProfile === id;
    if (activeTab === "skills") return selectedSkills.includes(id);
    return selectedLayers.includes(id);
  };

  const accentColor = (tab: CatalogTab) => {
    if (tab === "skills") return "#3b82f6";
    if (tab === "layers") return "#a855f7";
    return undefined;
  };

  const items = () => {
    if (!data) return [];
    if (activeTab === "profiles")
      return data.agentProfiles.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.description,
      }));
    if (activeTab === "skills")
      return data.skills.map((s) => ({
        id: s.id,
        title: s.name,
        subtitle: s.category,
        description: s.description,
      }));
    return data.layers.map((l) => ({
      id: l.id,
      title: l.name,
      subtitle: l.type,
      description: l.description,
    }));
  };

  return (
    <aside className="flex flex-col border-r border-white/5 bg-white/1.5 overflow-hidden ">
      {/* Panel header */}
      <div className="px-5 pt-5 pb-0 border-b border-white/5">
        <p className="text-[10px] tracking-[0.15em] text-zinc-600 font-mono mb-3">
          COMPONENT CATALOG
        </p>
        <div className="flex gap-0">
          {CATALOG_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-[11px] font-mono tracking-wider border-b-2 transition-all cursor-pointer
                ${
                  activeTab === tab
                    ? "text-amber-400 border-amber-400"
                    : "text-zinc-600 border-transparent hover:text-zinc-400"
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable list */}
      <div className="max-h-screen overflow-y-auto p-4 flex flex-col gap-2">
        {loading && (
          <p className="text-center text-zinc-600 font-mono text-xs py-8 animate-pulse">
            Syncing config…
          </p>
        )}

        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            {error}
          </div>
        )}

        {!loading &&
          items().map((item) => (
            <CatalogCard
              key={item.id}
              {...item}
              subtitle={
                "subtitle" in item && typeof item.subtitle === "string"
                  ? item.subtitle
                  : undefined
              }
              accentColor={accentColor(activeTab)}
              isSelected={isSelected(item.id)}
              onDragStart={() => {}}
              onClick={handleClick}
            />
          ))}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2.5 border-t border-white/5 text-center text-[10px] text-zinc-700 font-mono">
        ⠿ Drag cards · click to toggle
      </div>
    </aside>
  );
}
