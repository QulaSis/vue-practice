<template>
  <div class="event-tools" :class="{'tools-sidebar': showBar===true}">
      <ul class="tools-sidebar">
        <li>
          <button class="tools-btn">下载数据</button>
        </li>
        <li>
          <button class="tools-btn" @click="editData">编辑数据</button>
        </li>
        <li>
          <button class="tools-btn" @click="clearData">清空数据</button>
        </li>
      </ul>
  </div>
</template>

<script>
  export default {
    props: {
      showBar: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      editData () {
        this.$emit('edit')
      },
      clearData () {
        this.$emit('clear')
      }
    }
  }
</script>
<style>
.event-tools {
  position: fixed;
  top:70px;
  left:0;
  bottom:0;
  width:250px;
  padding:30px 20px;
  box-sizing: border-box;
  transform: translateX(-250px);
  transition: transform .3s;
  text-align: center;
  background: rgba(0,0,0,.5);
  font-size: 16px;
}
.event-tools.tools-sidebar {
  transform: translateX(0);
}
.tools-sidebar > li {
  line-height: 60px;
}
.tools-btn{
  width:100px;
  height:40px;
  line-height: 26px;
  color: #fff;
  border:1px solid #20a0ff;
  background: #20a0ff;
  transition: background .3s ease-in;
}
.tools-btn:hover {
  background: #4db3ff;
}
</style>
