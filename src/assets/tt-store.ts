import { defineStore } from "pinia";

/**
 * 타임엔트리
 */
export interface TimeEntry {
  id: number;
  name: string;
  description: string;
  startTime?: Date;
  endTime?: Date;
  duration: number;
}

/**
 * 타임트래커
 */
export interface TimeTracker {
  id: number;
  name: string;
  description: string;
  totalTime?: number
  realtime: any
  timeEntries: TimeEntry[]
  hidden? : boolean
}

const useTimeTrackerStore = defineStore('time-tracker', {
  state: () => ({
    timeTrackers : [] as TimeTracker[],
    currentSequenceTracker : 0,
    currentSequenceEntry : 0,
  }),
  actions: {
    addTimeTracker(timeTracker : {name : string, description: string}) {
      const initTimeTracker : TimeTracker = {
        id: ++this.currentSequenceTracker,
        name: timeTracker.name,
        description: timeTracker.description,
        timeEntries: [{
          id: ++this.currentSequenceEntry,
          name: 'init',
          description: 'init',
          duration: 0,
        }],
        realtime: (() => {
          let setTimeoutId : any;
          let startTime : Date;
          let realtime = 0;
          return {
            start: () => {
              if(!startTime) {
                startTime = new Date();
              } else if(!!startTime){
                if(setTimeoutId) clearTimeout(setTimeoutId);
                setTimeoutId = setTimeout(() => {
                  realtime = new Date().getTime() - startTime.getTime();
                }, 10);
              }
            }, 
            stop: () => {
              if(!!setTimeoutId) {
                clearTimeout(setTimeoutId);
                setTimeoutId = undefined;
              }
            }, 
            get: () => {
              return realtime;
            }
          }
        })()
      };
      this.timeTrackers.push(initTimeTracker);
    },
    removeTimeTracker(id : number) {
      const index = this.timeTrackers.findIndex((item)=>item.id == id);
      console.log('index', index)
      this.timeTrackers.splice(index, 1);
    },
    addTimeEntry(timeEntries : TimeEntry[], entry : {startTime: Date, endTime: Date, duration: number}) {
      console.log('addTimeEntry', entry);
      timeEntries.push({
        id: ++this.currentSequenceEntry,
        name: 'init',
        description: 'init',
        ...entry
      });
    }
  }
});

export default useTimeTrackerStore;