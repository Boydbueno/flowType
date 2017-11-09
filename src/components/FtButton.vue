<template>
	<div class="key-wrapper">
		<span class="key" :class="[{ 'key-active': isActive}, type ]" @click="$emit('ft-click')">
			<span><slot></slot></span>
		</span>
	</div>
</template>

<script>
  export default {
    name: 'FtButton',

    props: {
      isActive: {
        type: Boolean,
        default: false
      },

      type: {
        type: String,
        validator: (value) => {
          const types = ['confirm']
          return types.includes(value)
        }
      }
    },

    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .confirm > span {
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