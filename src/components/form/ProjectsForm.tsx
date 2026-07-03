import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Project } from '../../types/resume';
import { SortableItem } from '../ui/SortableItem';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface Props {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Project, value: unknown) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  onUpdateBullet: (projId: string, idx: number, value: string) => void;
  onAddBullet: (projId: string) => void;
  onRemoveBullet: (projId: string, idx: number) => void;
}

const GripIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-500">
    <circle cx="4" cy="4" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="4" r="1.2" fill="currentColor"/>
    <circle cx="4" cy="9" r="1.2" fill="currentColor"/>
    <circle cx="10" cy="9" r="1.2" fill="currentColor"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M7 2v10M2 7h10"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5a.5.5 0 00.5.5h5.4a.5.5 0 00.5-.5L11 4"/>
  </svg>
);

export const ProjectsForm: React.FC<Props> = ({
  projects,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
  onUpdateBullet,
  onAddBullet,
  onRemoveBullet,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-3 animate-fade-in">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {projects.map((proj, projIdx) => (
            <SortableItem key={proj.id} id={proj.id}>
              {(dragHandleProps) => (
                <div className="bg-[#21253a]/60 border border-slate-700/50 rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1d27]/80 border-b border-slate-700/40">
                    <span {...dragHandleProps} className="drag-handle p-1 rounded hover:bg-white/5">
                      <GripIcon />
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex-1">
                      {proj.name || `Project ${projIdx + 1}`}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => onRemove(proj.id)}
                      aria-label="Remove project"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Project Name"
                        id={`proj-name-${proj.id}`}
                        value={proj.name}
                        onChange={(e) => onUpdate(proj.id, 'name', e.target.value)}
                        placeholder="ResumeBuilder AI"
                      />
                      <Input
                        label="Technologies"
                        id={`proj-tech-${proj.id}`}
                        value={proj.technologies}
                        onChange={(e) => onUpdate(proj.id, 'technologies', e.target.value)}
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>

                    <Input
                      label="Project URL (optional)"
                      id={`proj-url-${proj.id}`}
                      type="url"
                      value={proj.url}
                      onChange={(e) => onUpdate(proj.id, 'url', e.target.value)}
                      placeholder="https://github.com/user/project"
                    />

                    <Input
                      label="Short Description"
                      id={`proj-desc-${proj.id}`}
                      value={proj.description}
                      onChange={(e) => onUpdate(proj.id, 'description', e.target.value)}
                      placeholder="A full-stack web app for…"
                    />

                    {/* Bullets */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Key Highlights
                      </label>
                      <div className="space-y-1.5">
                        {proj.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-1.5 items-start">
                            <span className="mt-2.5 text-indigo-400 text-xs select-none">•</span>
                            <input
                              value={bullet}
                              onChange={(e) => onUpdateBullet(proj.id, bIdx, e.target.value)}
                              placeholder="Built real-time collaboration using WebSockets"
                              className="
                                flex-1 px-2.5 py-2 rounded-lg text-sm
                                bg-[#0f1117]/60 border border-slate-700/60
                                text-slate-100 placeholder:text-slate-600
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20
                                transition-all duration-150
                              "
                            />
                            {proj.bullets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => onRemoveBullet(proj.id, bIdx)}
                                className="mt-1.5 text-slate-600 hover:text-red-400 transition-colors p-1"
                                aria-label="Remove bullet"
                              >
                                <TrashIcon />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<PlusIcon />}
                        onClick={() => onAddBullet(proj.id)}
                        className="self-start mt-1"
                      >
                        Add highlight
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button
        variant="outline"
        size="md"
        icon={<PlusIcon />}
        onClick={onAdd}
        className="w-full"
      >
        Add Project
      </Button>
    </div>
  );
};
