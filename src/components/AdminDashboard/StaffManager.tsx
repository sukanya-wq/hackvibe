import React from 'react';
import { StaffMember } from '../../types';
import { Users, Star, Clock, CheckCircle2 } from 'lucide-react';

interface StaffManagerProps {
  staff: StaffMember[];
}

export const StaffManager: React.FC<StaffManagerProps> = ({ staff = [] }) => {
  const safeStaff = staff || [];
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
            Staff Roster & Shift Schedules
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage attendance, shift schedules, performance ratings, and zone assignments.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
          {safeStaff.filter(s => s.status === 'on-duty').length} / {safeStaff.length} On-Duty
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {safeStaff.map(member => (
          <div
            key={member.id}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 text-center"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-md border-2 border-amber-400"
            />
            <div>
              <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                {member.name}
              </h4>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block">
                {member.role}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1 text-xs text-left">
              <p className="text-zinc-500">Shift: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{member.shift}</span></p>
              <p className="text-zinc-500">Phone: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{member.phone}</span></p>
              <p className="text-zinc-500">Performance: <span className="font-bold text-amber-500">★ {member.rating}</span></p>
            </div>

            <div className="pt-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
