import { useRef, useCallback, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResumeData } from './hooks/useResumeData';
import { FormSidebar } from './components/form/FormSidebar';
import { ResumePreview } from './components/preview/ResumePreview';
import { Header } from './components/layout/Header';
import { WelcomeScreen } from './components/WelcomeScreen';

type AppScreen = 'welcome' | 'builder';

function App() {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const printRef = useRef<HTMLDivElement>(null);

  const {
    data,
    updatePersonalInfo,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    reorderWorkExperience,
    updateWorkBullet,
    addWorkBullet,
    removeWorkBullet,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    reorderProjects,
    updateProjectBullet,
    addProjectBullet,
    removeProjectBullet,
    setTemplate,
    resetData,
  } = useResumeData();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: data.personalInfo.name
      ? `${data.personalInfo.name} — Resume`
      : 'Resume',
    pageStyle: `
      @page {
        size: Letter portrait;
        margin: 0;
      }
      @media print {
        html, body {
          width: 8.5in;
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleReset = useCallback(() => {
    if (window.confirm('Clear all resume data? This cannot be undone.')) {
      resetData();
    }
  }, [resetData]);

  // ── Welcome screen ──────────────────────────────────────────────────────────
  if (screen === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setScreen('builder')} />;
  }

  // ── Builder ─────────────────────────────────────────────────────────────────
  //
  // Flex chain (every link must have a bounded/constrained height):
  //
  //   App root  : h-screen → 100vh (concrete, viewport-relative) ← anchor
  //     Header  : shrink-0 → natural height, does not affect chain
  //     Main row: flex-1 min-h-0 → remaining height after header
  //       Left  : w-[440px] shrink-0 flex flex-col min-h-0 → full row height
  //         FormSidebar: flex-1 min-h-0 flex flex-col → fills left col
  //           Tab bar : shrink-0
  //           Content : flex-1 min-h-0 overflow-y-auto ← scrolls
  //       Right : flex-1 flex flex-col min-h-0 → full row height
  //         ResumePreview: flex-1 min-h-0 flex flex-col → fills right col
  //           Label : shrink-0
  //           Scroll: flex-1 min-h-0 overflow-auto ← scrolls (paper grows inside)
  //
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0f1117]">
      <Header
        template={data.template}
        onTemplateChange={setTemplate}
        onDownloadPdf={handlePrint}
        onReset={handleReset}
      />

      <div className="flex flex-1 min-h-0">
        {/* Left: Form Panel */}
        <div className="w-[440px] shrink-0 flex flex-col min-h-0 border-r border-slate-800">
          <FormSidebar
            data={data}
            onUpdatePersonalInfo={updatePersonalInfo}
            onUpdateSummary={(v) => updatePersonalInfo('summary', v)}
            onAddWorkExperience={addWorkExperience}
            onUpdateWorkExperience={updateWorkExperience}
            onRemoveWorkExperience={removeWorkExperience}
            onReorderWorkExperience={reorderWorkExperience}
            onUpdateWorkBullet={updateWorkBullet}
            onAddWorkBullet={addWorkBullet}
            onRemoveWorkBullet={removeWorkBullet}
            onAddEducation={addEducation}
            onUpdateEducation={updateEducation}
            onRemoveEducation={removeEducation}
            onReorderEducation={reorderEducation}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onRemoveProject={removeProject}
            onReorderProjects={reorderProjects}
            onUpdateProjectBullet={updateProjectBullet}
            onAddProjectBullet={addProjectBullet}
            onRemoveProjectBullet={removeProjectBullet}
          />
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 flex flex-col min-h-0">
          <ResumePreview ref={printRef} data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
