<template>
  <div id="app">
    <nav-bar />
    <b-container>
      <b-row>
        <b-col md="6">
          <extract />
        </b-col>
        <b-col md="6">
          <insert />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
import extract from '@/components/extract.vue';
import insert from '@/components/insert.vue';
export default {
  components: {
    'nav-bar': navbar,
    extract,
    insert
  }
};
</script>

<style lang="scss"></style>
