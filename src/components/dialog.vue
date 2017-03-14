<template>
    <div class="dialog" :class="{'dialog-show': is_show}">
        <div class="dialog-wrapper">
            <div class="dialog-header">
                <span class="dialog-header-title">提示</span>
            </div>
            <div class="dialog-content">
                {{msg}}
            </div>
            <div class="dialog-btns">
                <button type="button" class="cancel-btn" @click="cancelEvent">取消</button>
                <button type="button" class="sure-btn" @click="sureEvent">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    is_show: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    cancelEvent () {
      this.$emit('cancel')
    },
    sureEvent () {
      this.$emit('sure')
    }
  }
}
</script>

<style>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(0, 0, 0, .4);
  z-index: -1;
  opacity: 0;
  transition: all .3s linear;
}
.dialog.dialog-show {
  opacity: 1;
  z-index: 1000;
}
.dialog.dialog-show .dialog-wrapper {
  top: 20%;
}
.dialog-wrapper {
  position: absolute;
  left: 50%;
  top: 15%;
  width:100%;
  max-width: 400px;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  box-sizing: border-box;
  transition: top .5s ease;
}
.dialog-header {
  padding: 20px 20px 0;
}
.dialog-content {
  padding: 30px 20px;
  color: #475669;
  font-size: 18px;
  text-align: center;
}
.dialog-btns {
  padding: 10px 20px 15px;
  text-align: right;
}
.dialog-btns button {
  font-size: 14px;
}
.dialog-btns .sure-btn {
  width: 50px;
  margin-left: 5px;
  color: #fff;
  border: 1px solid #20a0ff;
  background: #20a0ff;
  transition: background .3s ease-in;
}
.dialog-btns .sure-btn:hover {
  background: #4db3ff;
}
.dialog-btns .cancel-btn {
  width: 50px;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
}
</style>
