import { CulinaryTwinProject } from '@/types/culinary-twin';
import { INITIAL_TWIN_PROJECTS } from './initial-data';

const STORAGE_KEY = 'PROJECT_SIXES_TWINS_STATE_V6';

type Listener = () => void;

export interface TwinsStoreSnapshot {
  twins: CulinaryTwinProject[];
  selectedTwinId: string;
}

const SERVER_SNAPSHOT: TwinsStoreSnapshot = {
  twins: INITIAL_TWIN_PROJECTS,
  selectedTwinId: INITIAL_TWIN_PROJECTS[0].id,
};

class TwinsStore {
  private snapshot: TwinsStoreSnapshot = SERVER_SNAPSHOT;
  private listeners: Set<Listener> = new Set();
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initFromStorage();
    }
  }

  private initFromStorage() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any initial twins not found in saved
          const existingIds = new Set(parsed.map((p: any) => p.id));
          const missingInitials = INITIAL_TWIN_PROJECTS.filter((t) => !existingIds.has(t.id));
          const merged = [...missingInitials, ...parsed];
          this.snapshot = {
            twins: merged,
            selectedTwinId: merged[0].id,
          };
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load twins from storage:', e);
    }
  }

  public getSnapshot = (): TwinsStoreSnapshot => {
    return this.snapshot;
  };

  public getServerSnapshot = (): TwinsStoreSnapshot => {
    return SERVER_SNAPSHOT;
  };

  public subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.snapshot.twins));
      } catch (e) {
        console.warn('Failed to save twins state:', e);
      }
    }
  }

  public setSelectedTwinId(id: string) {
    if (this.snapshot.selectedTwinId === id) return;
    this.snapshot = {
      ...this.snapshot,
      selectedTwinId: id,
    };
    this.emitChange();
  }

  public updateCurrentTwin(currentTwinId: string, updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) {
    const nextTwins = this.snapshot.twins.map((twin) => {
      if (twin.id === currentTwinId) {
        const updated = updater(twin);
        return {
          ...updated,
          updatedAt: new Date().toISOString(),
        };
      }
      return twin;
    });

    this.snapshot = {
      ...this.snapshot,
      twins: nextTwins,
    };
    this.persist();
    this.emitChange();
  }

  public createNewTwin(newTwin: CulinaryTwinProject) {
    this.snapshot = {
      twins: [newTwin, ...this.snapshot.twins],
      selectedTwinId: newTwin.id,
    };
    this.persist();
    this.emitChange();
  }

  public resetData() {
    this.snapshot = SERVER_SNAPSHOT;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.emitChange();
  }
}

export const twinsStore = new TwinsStore();
