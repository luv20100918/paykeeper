<script setup lang="ts">
import useTimeTrackerStore, { TimeTracker } from '~/assets/tt-store';
import { useRouter } from 'vue-router'

const store = useTimeTrackerStore();
const router = useRouter();

const timeTrackers : TimeTracker[] = store.timeTrackers;

const addTimeTracker = () => {
  console.log('addTimeTracker')
  store.addTimeTracker({
    name : 'noname', description : 'empty'
  });
};

const removeTimeTracker = (id: number) => {
  store.removeTimeTracker(id);
};

const toggleTimeTracker = (id: number) => {
  const index = timeTrackers.findIndex((item) => item.id === id);
  if (index >= 0) {
    const item = timeTrackers[index];
    item.hidden = !item.hidden;
    store.timeTrackers.splice(index, 1, item);
  }
};

const goSummary = () => {
  console.log('goSummary');
  router.push('/time-tracker/summary');
};

const mmsss = (ms : number) => {
  const mm = Math.floor(ms / 1000 / 60);
  const ss = Math.floor(ms / 1000) % 60;
  const sss = Math.floor(ms % 1000);
  return `${mm > 0 ? mm + ':' : ''}${mm > 0 ? String(ss).padStart(2,'0') : ss}.${sss}`;
};

</script>
<template>
<div>
  <h2>타이므트레커</h2>
  <div>
    <el-button @click="addTimeTracker">ADD</el-button>
    <el-button @click="goSummary">Summary</el-button>
  </div>
  <div v-if="timeTrackers.length > 0">
    <ul>
    <li v-for="timeTracker in timeTrackers">
      <h3>
        <el-button @click="toggleTimeTracker(timeTracker.id)">#{{ timeTracker.id }}</el-button>
        <el-button @click="removeTimeTracker(timeTracker.id)">X</el-button>
      </h3>
      <template v-if="!timeTracker.hidden">
        <div>
          <el-input v-model="timeTracker.name" placeholder="제목"></el-input>
          <el-input v-model="timeTracker.description" placeholder="설명"></el-input>
        </div>
        <div>
          <el-input v-model="timeTracker.totalTime" placeholder="총 시간"></el-input>
        </div>
        <div v-if="timeTracker.timeEntries.length > 0">
          <StopWatch @stop-event="({startTime, endTime, duration}) => {
            console.log('stop-event', startTime, endTime, duration);
            store.addTimeEntry(timeTracker.timeEntries, {startTime, endTime, duration});    
          }"/>
        </div>
        <div>
          <h4>history</h4>
          <ul>
            <template v-for="timeEntry in timeTracker.timeEntries">
              <li v-if="timeEntry.startTime">
                <div>{{ timeEntry.duration > 0 ? mmsss(timeEntry.duration) : timeTracker.realtime.get() }}<el-input v-model="timeEntry.duration"></el-input></div>
              </li>
            </template>
          </ul>
        </div>
      </template>
    </li>
  </ul>
  </div>
  <div v-else>
    <p>타임트레커가 없습니다.</p>
  </div>

</div>
</template>
<style scoped>
</style>