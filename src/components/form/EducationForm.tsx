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
import type { Education } from '../../types/resume';
import { SortableItem } from '../ui/SortableItem';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MonthYearPicker } from '../ui/MonthYearPicker';

interface Props {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Education, value: unknown) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
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

export const EducationForm: React.FC<Props> = ({
  education,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
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
        <SortableContext items={education.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          {education.map((edu, eduIdx) => (
            <SortableItem key={edu.id} id={edu.id}>
              {(dragHandleProps) => (
                <div className="bg-[#21253a]/60 border border-slate-700/50 rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1d27]/80 border-b border-slate-700/40">
                    <span {...dragHandleProps} className="drag-handle p-1 rounded hover:bg-white/5">
                      <GripIcon />
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex-1">
                      {edu.degree || edu.school
                        ? `${edu.degree}${edu.school ? ` — ${edu.school}` : ''}`
                        : `Education ${eduIdx + 1}`}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => onRemove(edu.id)}
                      aria-label="Remove education"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <Input
                      label="Degree / Certification"
                      id={`edu-degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="School / Institution"
                        id={`edu-school-${edu.id}`}
                        value={edu.school}
                        onChange={(e) => onUpdate(edu.id, 'school', e.target.value)}
                        placeholder="MIT"
                      />
                      <Input
                        label="Field of Study"
                        id={`edu-field-${edu.id}`}
                        value={edu.fieldOfStudy}
                        onChange={(e) => onUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <MonthYearPicker
                        label="Start"
                        id={`edu-start-${edu.id}`}
                        value={edu.startDate}
                        onChange={(v) => onUpdate(edu.id, 'startDate', v)}
                      />
                      <MonthYearPicker
                        label="End"
                        id={`edu-end-${edu.id}`}
                        value={edu.endDate}
                        onChange={(v) => onUpdate(edu.id, 'endDate', v)}
                      />
                      <Input
                        label="GPA (optional)"
                        id={`edu-gpa-${edu.id}`}
                        value={edu.gpa}
                        onChange={(e) => onUpdate(edu.id, 'gpa', e.target.value)}
                        placeholder="3.9/4.0"
                      />
                    </div>

                    <Input
                      label="Notes (honors, activities, etc.)"
                      id={`edu-notes-${edu.id}`}
                      value={edu.notes}
                      onChange={(e) => onUpdate(edu.id, 'notes', e.target.value)}
                      placeholder="Summa Cum Laude, Dean's List"
                    />
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
        Add Education
      </Button>
    </div>
  );
};
