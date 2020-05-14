<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view v-if="visible" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    this.visible = true; // Fade animace při vstupu
  }
};
</script>


