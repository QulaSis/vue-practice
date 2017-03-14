<template>
  <div class="event-content">
    <div class="event-all" :class="{'event-all-show': showTable===true}">
      <div class="table-box">
        <div class="edit-input" :class="{'edit-input-show': showInput}"><input type="text" v-model.trim="info.content"> <button @click="confirmData">确定</button></div>
        <div class="screen-box">
          <div class="div-select" :class="{'active': active}">
            <div class="div-value" @click="active = !active">{{getTypeName}}</div>
            <div class="div-select-body">
              <div class="div-option" @click="doSelect(0)">筛选类型</div>
              <div class="div-option" @click="doSelect(1)">未完成</div>
              <div class="div-option" @click="doSelect(2)">已完成</div>
              <div class="div-option" @click="doSelect(3)">已取消</div>
            </div>
          </div>
          <input type="text" placeholder="筛选关键词" class="div-search" v-model.trim="screen_title">
        </div>
        <table class="event-table">
          <thead>
            <tr>
              <th>#</th>
              <th>所有事项</th>
              <th>类型</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in notePad">
              <td>{{index+1}}</td>
              <td>{{item.content}}</td>
              <td>{{getType(item.type)}}</td>
              <td>
                <button @click="editData(index)">编辑</button>
                <button class="del-btn" @click="showDialog(index, item.id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showTable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: false,
        screen_type: 0,
        screen_title: '',
        showInput: false,
        info: {
          id: 0,
          content: '',
          index: 0
        }
      }
    },
    computed: {
      getTypeName () {
        let self = this
        return self.getType(self.screen_type) || '筛选类型'
      },
      notePad () {
        let self = this
        return self.$store.state.event.filter((item) => {
          if (self.screen_type === 0 && self.screen_title !== -1) {
            return item.content.indexOf(self.screen_title) !== -1
          } else if (self.screen_type !== 0 && self.screen_title === '') {
            return item.type === self.screen_type
          } else if (self.screen_type !== 0 && self.screen_title !== '') {
            return item.type === self.screen_type && item.content.indexOf(self.screen_title) !== -1
          } else {
            return item
          }
        })
      }
    },
    methods: {
      doSelect (type) {
        this.screen_type = type
        this.active = false
      },
      getType (type) {
        let str = ''
        switch (type) {
          case 1:
            str = '未完成'
            break
          case 2:
            str = '已完成'
            break
          case 3:
            str = '已取消'
            break
        }
        return str
      },
      editData (index) {
        this.showInput = true
        this.info = {
          id: this.notePad[index].id,
          content: this.notePad[index].content,
          index: index
        }
      },
      confirmData () {
        if (this.info.content) {
          this.$store.dispatch('editEvent', this.info)
          this.showInput = false
        }
      },
      closeTable () {
        this.$emit('close')
      },
      showDialog (index, id) {
        this.$emit('delDialog', index, id)
      }
    }
  }
</script>
<style>
.event-content .event-all {
  padding-left: 10px;
  padding-right: 10px;
}
.event-all {
  position: absolute;
  left: 0px;
  top: 70px;
  right: 0;
  bottom: 0;
  transform: translateX(-100%);
  transition: transform .5s;
  overflow-Y: scroll;
  background: #fff;
}
.event-all.event-all-show {
  transform: translateX(0);
}
.event-all .table-box {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
}
.event-all .table-box .edit-input.edit-input-show {
  transform: translateY(0);
}
.event-all .table-box .edit-input {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  height: 60px;
  padding: 10px 100px 10px 10px;
  box-sizing: border-box;
  z-index: 10;
  transform: translateY(-260px);
  transition: transform .3s;
  background: #f3f3f3;
  border: 1px solid #eee;
  border-radius: 4px;
}
.event-all .table-box .edit-input input {
  float: left;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.event-all .table-box .edit-input button {
    position: absolute;
    right: 10px;
    width: 80px;
    height: 40px;
    background: #00a2ff;
    color: #fff;
    border: 0;
}
.event-all .table-box .screen-box {
  position: relative;
  padding: 0 0 10px 95px;
  height: 35px;
}
.event-all .table-box .screen-box .div-select {
  position: absolute;
  left: 0;
  top: 0;
  width: 85px;
  height: 35px;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.event-all .table-box .screen-box .div-select:after {
  position: absolute;
  right:5px;
  top:10px;
  width:7px;
  height:7px;
  content: '';
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  transform: rotate(45deg);
}
.event-all .table-box .screen-box .div-select.active .div-select-body {
  height:122px;
  border:1px solid #eee;
  box-shadow: 0 0 1px #ddd;
}
.event-all .table-box .screen-box .div-value {
  line-height: 35px;
}
.event-all .table-box .screen-box .div-select-body {
  position: absolute;
  left: 0;
  top: 38px;
  width: 85px;
  height: 0;
  padding-left: 10px;
  line-height: 30px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 10;
  box-shadow: none;
  border: none;
  border-radius: 3px;
  background: #fff;
  transition: all .3s;
}
.event-all .table-box .screen-box .div-search {
  width: 100%;
  height: 35px;
  line-height: 25px;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  font-size: 12px;
  font-family: Arial,'Microsoft YaHei';
  color: #999;
}
.event-all .table-box .event-table {
  width: 100%;
  padding: 0;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  border-spacing: 0px;
}
.event-all .table-box .event-table td, .event-all .table-box .event-table th {
  position: relative;
  height: 40px;
  min-width: 0;
  padding: 5px 10px;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.event-all button {
  padding:3px 7px;
  font-size: 12px;
  color: #fff;
  background: #00a2ff;
  border:0;
  margin: 0 3px 3px 0;
}
.event-all button.del-btn {
  background: #F44336;
}
</style>
