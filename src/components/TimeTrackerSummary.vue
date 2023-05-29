<script setup lang="ts">
import { computed } from 'vue';
import useTimeTrackerStore, { TimeTracker } from '~/assets/tt-store';
import { useRouter } from 'vue-router'

const store = useTimeTrackerStore();
const router = useRouter();

const timeTrackers = computed(() => {
  const tts = store.timeTrackers;
  return tts.map((tt) => {
    const tt2 = { ...tt, trackingTime : 0 };
    tt2.trackingTime = tt.timeEntries.reduce((acc, cur) => acc + cur.duration, 0);
    return tt2;
  });
});

const mmsss = (ms : number) => {
  const mm = Math.floor(ms / 1000 / 60);
  const ss = Math.floor(ms / 1000) % 60;
  const sss = Math.floor(ms % 1000);
  return `${mm > 0 ? mm + ':' : ''}${mm > 0 ? String(ss).padStart(2,'0') : ss}.${sss}`;
};

</script>
<template>
<div>
  <h2>타이므트레커(요약)</h2>
  <div><el-button @click="router.go(-1)">돌아가기</el-button></div> 
  <div>
    <ul>
      <li v-for="timeTracker in timeTrackers">
        <div>
          <el-text class="mx-1">이름 : </el-text>
          <el-text class="mx-1">{{ timeTracker.name }}</el-text>
        </div>
        <div>
          <el-text class="mx-1">설명 : </el-text>
          <el-text class="mx-1">{{ timeTracker.description }}</el-text>
        </div>
        <div>
          <el-text class="mx-1">기준시간 : </el-text>
          <el-text class="mx-1">{{ timeTracker.totalTime }}</el-text>
        </div>
        <div>
          <el-text class="mx-1">총시간 : </el-text>
          <el-text class="mx-1">{{ timeTracker.totalTime }}</el-text>
        </div>
        <div>
          <el-text class="mx-1">추적시간 : </el-text>
          <el-text class="mx-1">{{ mmsss(timeTracker.trackingTime) }}</el-text>
        </div>
        <!-- 총시간이 존재한다면 추적시간 / 총 시간 = 시간당 추적된 시간 -->
        <div v-if="timeTracker.totalTime">
          <el-text class="mx-1">시간당 추적된 시간 : </el-text>
          <el-text class="mx-1">{{ mmsss(timeTracker.trackingTime / timeTracker.totalTime) }}</el-text>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<style scoped>
</style>