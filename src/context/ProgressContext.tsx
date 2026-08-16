import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ProgressState {
  completedStepIds: string[];
  streakDays: number;
  lastActiveDate: string | null;
  totalStudyMinutes: number;
  evaluatedSubmissionsCount: number;
}

interface ProgressContextValue {
  completedStepIds: Set<string>;
  streakDays: number;
  totalStudyMinutes: number;
  evaluatedSubmissionsCount: number;
  toggleStepCompleted: (stepId: string, stepTitle?: string) => boolean;
  isStepCompleted: (stepId: string) => boolean;
  incrementEvaluations: () => void;
  getRoleProgress: (roleStepIds: string[]) => { completed: number; total: number; percentage: number };
}

const STORAGE_KEY = 'eduloop_student_progress_v1';

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage:', e);
    }
    return {
      completedStepIds: [],
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalStudyMinutes: 25,
      evaluatedSubmissionsCount: 0,
    };
  });

  // Calculate & update streak on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setState((prev) => {
      if (!prev.lastActiveDate) {
        return { ...prev, lastActiveDate: today, streakDays: 1 };
      }
      const lastDate = new Date(prev.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return { ...prev, lastActiveDate: today, streakDays: prev.streakDays + 1 };
      } else if (diffDays > 1) {
        return { ...prev, lastActiveDate: today, streakDays: 1 };
      }
      return prev;
    });
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [state]);

  const toggleStepCompleted = useCallback((stepId: string, _stepTitle?: string): boolean => {
    let nowCompleted = false;
    setState((prev) => {
      const isAlready = prev.completedStepIds.includes(stepId);
      nowCompleted = !isAlready;
      const nextSteps = isAlready
        ? prev.completedStepIds.filter((id) => id !== stepId)
        : [...prev.completedStepIds, stepId];

      return {
        ...prev,
        completedStepIds: nextSteps,
      };
    });

    if (nowCompleted) {
      // Trigger milestone celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#38bdf8', '#4ade80'],
      });
    }

    return nowCompleted;
  }, []);

  const isStepCompleted = useCallback(
    (stepId: string) => state.completedStepIds.includes(stepId),
    [state.completedStepIds]
  );

  const incrementEvaluations = useCallback(() => {
    setState((prev) => ({
      ...prev,
      evaluatedSubmissionsCount: prev.evaluatedSubmissionsCount + 1,
    }));
  }, []);

  const getRoleProgress = useCallback(
    (roleStepIds: string[]) => {
      const total = roleStepIds.length;
      if (total === 0) return { completed: 0, total: 0, percentage: 0 };
      const completed = roleStepIds.filter((id) => state.completedStepIds.includes(id)).length;
      const percentage = Math.round((completed / total) * 100);
      return { completed, total, percentage };
    },
    [state.completedStepIds]
  );

  return (
    <ProgressContext.Provider
      value={{
        completedStepIds: new Set(state.completedStepIds),
        streakDays: state.streakDays,
        totalStudyMinutes: state.totalStudyMinutes,
        evaluatedSubmissionsCount: state.evaluatedSubmissionsCount,
        toggleStepCompleted,
        isStepCompleted,
        incrementEvaluations,
        getRoleProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
