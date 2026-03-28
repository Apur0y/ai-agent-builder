import { useAgentBuilder } from './hooks/useAgentBuilder'
import { useSessionTimer } from './hooks/useSessionTimer'
import Toast from './components/Toast'
import Header from './components/Header'
import CatalogPanel from './components/CatalogPanel'
import ProviderSelector from './components/ProviderSelector'
import BuilderCanvas from './components/BuilderCanvas'
import SavedAgentsPanel from './components/SavedAgentsPanel'

export default function App() {
  const sessionTime = useSessionTimer()
  const {
    data, loading, error, fetchData,
    selectedProfile, selectedSkills, selectedLayers, selectedProvider,
    toggleProfile, addSkill, removeSkill, addLayer, removeLayer, toggleProvider,
    currentProfile, currentSkills, currentLayers,
    agentName, setAgentName,
    savedAgents, saveAgent, loadAgent, deleteAgent, clearAllAgents,
    toast, setToast,
  } = useAgentBuilder()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Header
        sessionTime={sessionTime}
        loading={loading}
        onReload={fetchData}
      />

      {/* Main grid: catalog | builder */}
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <div className="w-80 shrink-0 flex flex-col overflow-hidden">
          <CatalogPanel
            data={data}
            loading={loading}
            error={error}
            selectedProfile={selectedProfile}
            selectedSkills={selectedSkills}
            selectedLayers={selectedLayers}
            onToggleProfile={toggleProfile}
            onToggleSkill={(id) =>
              selectedSkills.includes(id) ? removeSkill(id) : addSkill(id)
            }
            onToggleLayer={(id) =>
              selectedLayers.includes(id) ? removeLayer(id) : addLayer(id)
            }
          />
        </div>

        <div className="flex flex-col flex-1 overflow-auto">
          <ProviderSelector
            selected={selectedProvider}
            onToggle={toggleProvider}
          />
          <BuilderCanvas
            data={data}
            currentProfile={currentProfile}
            currentSkills={currentSkills}
            currentLayers={currentLayers}
            agentName={agentName}
            onAgentNameChange={setAgentName}
            onDropProfile={toggleProfile}
            onDropSkill={addSkill}
            onDropLayer={addLayer}
            onRemoveProfile={() => toggleProfile(selectedProfile)}
            onRemoveSkill={removeSkill}
            onRemoveLayer={removeLayer}
            onSave={saveAgent}
          />
        </div>
      </div>

      <SavedAgentsPanel
        agents={savedAgents}
        data={data}
        onLoad={loadAgent}
        onDelete={deleteAgent}
        onClearAll={clearAllAgents}
      />

      {toast && (
        <Toast message={toast} onDismiss={() => setToast(null)} />
      )}
    </div>
  )
}