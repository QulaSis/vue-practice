<template>
  <div id="app">
    <n-header @tool="clickTools"></n-header>
    <section class="container" :class="{'hide': tableTabs}">
      <n-add></n-add>
      <list></list>
      <sideBar :showBar="showSideBar" @edit="editTable" @clear="clearContent"></sideBar>
    </section>
    <nTable :showTable="tableTabs" @delDialog="delTableData" @close="tableTabs=false"></nTable>
    <nDialog :is_show="showDelModal" :msg="tips" @cancel="showDelModal=false" @sure="sureDialog"></nDialog>
  </div>
</template>

<script>
import header from 'components/header'
import add from 'components/add'
import list from 'components/list'
import sideBar from 'components/sidebar'
import nTable from 'components/table'
import nDialog from 'components/dialog'
export default {
  name: 'app',
  components: {
    'n-header': header,
    'n-add': add,
    list,
    sideBar,
    nTable,
    nDialog
  },
  data () {
    return {
      showSideBar: false,
      tableTabs: false,
      showDelModal: false,
      tips: '',
      del_info: {
        index: 0,
        id: 0
      },
      del_type: 'del'
    }
  },
  methods: {
    clickTools () {
      if (this.tableTabs) {
        this.tableTabs = !this.tableTabs
      } else {
        this.showSideBar = !this.showSideBar
      }
    },
    editTable () {
      this.tableTabs = true
    },
    delTableData (index, id) {
      this.showDelModal = true
      this.tips = '删除后无法恢复，确认删除吗？'
      this.del_type = 'del'
      this.del_info = {
        index: index,
        id: id
      }
    },
    sureDialog () {
      switch (this.del_type) {
        case 'del':
          this.$store.dispatch('delEvent', this.del_info)
          break
        case 'clear':
          this.$store.dispatch('clearEvent')
          break

      }
      this.showDelModal = false
    },
    clearContent () {
      this.showDelModal = true
      this.tips = '清空后无法恢复，确认清空吗？'
      this.del_type = 'clear'
    }
  }
}
</script>

<style>
* {margin: 0;padding: 0;list-style: none}
.container {
  width: 100%;
  padding: 0 10px;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
}
.container.hide {
  display: none;
}
button {
  padding: 7px 0;
  outline: none;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
}
input[type=text] {
  -webkit-appearance: none;
}
button, input {
  -webkit-tap-highlight-color: transparent;
}
</style>
