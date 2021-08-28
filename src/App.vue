<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Dashboard from './components/KanbanDashboard.vue'
import { mapGetters } from "vuex"
import { db } from './utils/db'
import {  mapActions } from "vuex";

export default {
  name: 'app', components: {
    Dashboard,
  },
  methods: {
    ...mapActions({
      fetchData: "fetchData",
    }),
  },
  created() {
    this.fetchData(this.asd);
  },
  data () {
    return {
      projects:[],
      asd: [
        {
          id: 112,
          name: 'Name',
          description: 'description',
          lists: [
            {
              id: 2213,
              name: 'Todo',
              headerColor: 'red',
              items: [{}, {}],
            },
            {
              id: 4412,
              name: 'Done',
              headerColor: 'red',
              items: [{}, {}],
            },
          ],
        },
      ],
    }
  },
  firebase: {
    projects: db.ref('projetcs'),
  },
  mounted(){
    console.log('projects ', this.projects);
  },
}
</script>

<style lang="scss">

</style>
