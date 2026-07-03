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
import type { WorkExperience } from '../../types/resume';
import { SortableItem } from '../ui/SortableItem';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MonthYearPicker } from '../ui/MonthYearPicker';

interface Props {
  experiences: WorkExperience[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof WorkExperience, value: unknown) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  onUpdateBullet: (expId: string, idx: number, value: string) => void;
  onAddBullet: (expId: string) => void;
  onRemoveBullet: (expId: string, idx: number) => void;
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

export const WorkExperienceForm: React.FC<Props> = ({
  experiences,
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
        <SortableContext items={experiences.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          {experiences.map((exp, expIdx) => (
            <SortableItem key={exp.id} id={exp.id}>
              {(dragHandleProps) => (
                <div className="bg-[#21253a]/60 border border-slate-700/50 rounded-xl overflow-hidden">
                  {/* Card header */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1d27]/80 border-b border-slate-700/40">
                    <span {...dragHandleProps} className="drag-handle p-1 rounded hover:bg-white/5">
                      <GripIcon />
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex-1">
                      {exp.title || exp.company
                        ? `${exp.title}${exp.company ? ` @ ${exp.company}` : ''}`
                        : `Experience ${expIdx + 1}`}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => onRemove(exp.id)}
                      aria-label="Remove experience"
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Job Title"
                        id={`work-title-${exp.id}`}
                        value={exp.title}
                        onChange={(e) => onUpdate(exp.id, 'title', e.target.value)}
                        placeholder="Software Engineer"
                      />
                      <Input
                        label="Company"
                        id={`work-company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                        placeholder="Acme Corp"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <MonthYearPicker
                        label="Start Date"
                        id={`work-start-${exp.id}`}
                        value={exp.startDate}
                        onChange={(v) => onUpdate(exp.id, 'startDate', v)}
                      />
                      <div className="flex flex-col gap-1">
                        <MonthYearPicker
                          label="End Date"
                          id={`work-end-${exp.id}`}
                          value={exp.current ? '' : exp.endDate}
                          onChange={(v) => onUpdate(exp.id, 'endDate', v)}
                          disabled={exp.current}
                        />
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => onUpdate(exp.id, 'current', e.target.checked)}
                            className="w-3.5 h-3.5 accent-indigo-500"
                          />
                          <span className="text-xs text-slate-500">Current role</span>
                        </label>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Key Achievements / Responsibilities
                      </label>
                      <div className="space-y-1.5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-1.5 items-start">
                            <span className="mt-2.5 text-indigo-400 text-xs select-none">•</span>
                            <input
                              value={bullet}
                              onChange={(e) => onUpdateBullet(exp.id, bIdx, e.target.value)}
                              placeholder="Led migration to microservices, reducing latency by 40%"
                              className="
                                flex-1 px-2.5 py-2 rounded-lg text-sm
                                bg-[#0f1117]/60 border border-slate-700/60
                                text-slate-100 placeholder:text-slate-600
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20
                                transition-all duration-150
                              "
                            />
                            {exp.bullets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => onRemoveBullet(exp.id, bIdx)}
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
                        onClick={() => onAddBullet(exp.id)}
                        className="self-start mt-1"
                      >
                        Add bullet
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
        Add Work Experience
      </Button>
    </div>
  );
};
