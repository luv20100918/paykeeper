<script setup lang="ts">
import { ref, computed } from 'vue';
const time = ref('0.000');
let startTime : Date | null = null;
let endTime : Date | null = null;
let interval = ref<NodeJS.Timeout | null>(null);
const isRunning = computed(() => !!interval.value);

const start = () => {
  startTime = new Date();
  interval.value = setInterval(() => {
    endTime = new Date();
    if(startTime !== null) {
      const ms = endTime.getTime() - startTime.getTime();
      time.value = mmsss(ms);
    }
  }, 1);
  console.log('start', !!interval.value);
};

const stop = () => {
  console.log('stop');
  if(interval.value) {
    clearInterval(interval.value);
    interval.value = null;
    emits('stopEvent', {
      startTime : startTime as Date,
      endTime : endTime as Date,
      duration : (endTime as Date).getTime() - (startTime as Date).getTime()
    });
    startTime = null;
    endTime = null;
  }
};

const mmsss = (ms : number) => {
  const mm = Math.floor(ms / 1000 / 60);
  const ss = Math.floor(ms / 1000) % 60;
  const sss = Math.floor(ms % 1000);
  return `${mm > 0 ? mm + ':' : ''}${mm > 0 ? String(ss).padStart(2,'0') : ss}.${String(sss).padStart(3,'0')}`;
};

const emits = defineEmits<{
  stopEvent : [result : { startTime : Date, endTime : Date, duration : number }]
}>();

</script>
<template>
  <div>
    <span>{{ time }}</span>
    <el-button v-if="!isRunning" @click="start">시작</el-button>
    <el-button v-else @click="stop">중지</el-button>
  </div>
</template>
