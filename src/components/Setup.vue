<template>
	<section class="setup">
    
    <div class="container">

      <section class="goal-select cf">
        <h1>Pick Goal</h1>
        <div class="options cf">
          <div class="key-wrapper">
            <span class="key" :class="{ 'key-active': goalTime == 60000 * 15 }" @click="setGoalTime(60000 * 15)">
              <span>15 min</span>
            </span>
          </div>

          <div class="key-wrapper">
            <span class="key" :class="{ 'key-active': goalTime == 60000 * 30 }" @click="setGoalTime(60000 * 30)">
              <span>30 min</span>
            </span>
          </div>

          <div class="key-wrapper">
            <span class="key" :class="{ 'key-active': goalTime == 60000 * 60 }" @click="setGoalTime(60000 * 60)">
              <span>60 min</span>
            </span>
          </div>

          <div class="cf"></div>
      </div>
      </section>

      <section>
        <router-link class="key key-green continue" to="/writer"><span>Go</span></router-link>
      </section>

    </div>

	</section>
</template>

<script>
export default {
  name: 'Setup',
  data () {
    return {
    }
  },

  computed: {
    goalTime () {
      return this.$store.state.settings.goalTime
    }
  },

  created () {
  },

  methods: {
    isGoalTime (time) {
      return this.goalTime === time
    },

    updateGoalTime (e) {
      this.$store.commit('updateGoalTime', e.target.value)
    },

    setGoalTime (time) {
      this.$store.commit('updateGoalTime', time)
    }
  }
}
</script>

<style lang="scss" scoped>
  .setup {
    height: 100%;
    margin: 0 auto;
    background-color: #cecec4;
  }

  .container {
    width: 1000px;
    margin: 0 auto;
  }

  .goal-select { 
    padding-top: 50px;
  }

  .cf {
    clear: both;
  }

  h1 {
    margin-top: 0;
    margin-left: 15px;
  }

  .continue {
    margin-top: 15px;
    margin-left: 15px;
  }

  .key-wrapper {
    float: left;
    margin: 15px;
  }

  .key {
    text-decoration: none;
    display: inline-block;
    width: 70px;
    height: 37px;
  }

  .key > span {
    box-sizing: border-box;
    display: block;
    width: 70px;
    height: 35px;
    border: 1px solid #a9a9a9;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    padding-top: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    color: #7c7c7c;
    box-shadow: 0px 3px 0px -2px rgba(255,255,255,.8), 0px 2px 0px 0px rgba(169,169,169,1);
    cursor: pointer;
  }

  .key-green > span {
    background-color: rgba(12, 117, 14, 0.5);
    color: white;
    box-shadow: 0px 3px 0px -2px rgba(12, 117, 14,.8), 0px 2px 0px 0px rgba(169,169,169,1);
  }

  .key > span:active, .key-active > span {
    margin-top: 2px;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>