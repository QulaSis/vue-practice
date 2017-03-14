<template>
  <header>
    <h1>记事本 <a class="t-btn" @click="showTools"><span></span></a></h1>
  </header>
</template>

<script type="text/javascript">
export default {
  methods: {
    showTools () {
      this.$emit('tool')
    }
  }
}
</script>

<style>
header{
  width:100%;
  height:70px;
  background: #00a2ff;
}
header h1 {
  position: relative;
  width:100%;
  max-width:800px;
  margin:0 auto;
  line-height: 70px;
  text-align: center;
  color: #fff;
}
header h1 a.t-btn {
  position: absolute;
  right:10px;
  top:22px;
  width:30px;
  height:26px;
  cursor: pointer;
}
header span,header span:before,header span:after{
  position: absolute;
  left:0;
  width:30px;
  height:4px;
  content: '';
  background: #fff;
}
header span {top: 11px;}
header span:before {
  top: 0;
  transform: translateY(-7px);
  transition: all .3s;
}
header span:after {
  transform: translateY(7px);
  transition: all .3s;
}
</style>
