import React from 'react';
import type { PersonalInfo } from '../../types/resume';
import { Input } from '../ui/Input';

interface Props {
  data: PersonalInfo;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Input
        label="Full Name"
        id="personal-name"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Jane Smith"
        autoComplete="name"
      />

      <Input
        label="Professional Title / Subheadline"
        id="personal-title"
        value={data.title || ''}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder="Software Engineer | AI Specialist"
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Email"
          id="personal-email"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <Input
          label="Phone"
          id="personal-phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
        />
      </div>

      <Input
        label="Location"
        id="personal-location"
        value={data.location}
        onChange={(e) => onChange('location', e.target.value)}
        placeholder="San Francisco, CA"
      />

      <Input
        label="LinkedIn URL"
        id="personal-linkedin"
        type="url"
        value={data.linkedin}
        onChange={(e) => onChange('linkedin', e.target.value)}
        placeholder="https://linkedin.com/in/janesmith"
      />

      <Input
        label="Portfolio / Website"
        id="personal-portfolio"
        type="url"
        value={data.portfolio}
        onChange={(e) => onChange('portfolio', e.target.value)}
        placeholder="https://janesmith.dev"
      />
    </div>
  );
};
