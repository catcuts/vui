<template>
  <div v-if="totalPageNo > 0" class="squares container" @click="onSquareClick($event)">
    <div class="ui square segment" data-pageno="1"><span>{{ "<<" }}</span></div>
    <div class="ui square segment" data-pageno="prev"><span>{{ "<" }}</span></div>
    <div v-if="showRollup" class="ui square segment" data-pageno="rollup"><span>{{ "..." }}</span></div>    
    <div class="ui square segment"
      v-for="itemNo in Math.min(totalPageNo, pageNoItemLimit)" :key="itemNo + veryLeftPageNo - 1" :data-pageno="itemNo + veryLeftPageNo - 1"
      :class="{ 'current': itemNo + veryLeftPageNo - 1 === currentPageNo }"
    >
			<span>{{ itemNo + veryLeftPageNo - 1 }}</span>
		</div>
    <div v-if="showRolldown" class="ui square segment" data-pageno="rolldown"><span>{{ "..." }}</span></div>
    <div class="ui square segment" data-pageno="next"><span>{{ ">" }}</span></div>
    <div class="ui square segment" :data-pageno="totalPageNo"><span>{{ ">>" }}</span></div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  data () {
    return {
      currentPageNo: this.initPageNo,
      veryLeftPageNo: 1
    }
  },
  props: {
    initPageNo: {type: Number, default: 1},
    totalPageNo: {type: Number, default: 10},
    pageNoItemLimit: {type: Number, default: 5}
  },
  computed: {
    showRollup () {
      return !(this.veryLeftPageNo === 1)
    },
    showRolldown () {
      return !(this.veryLeftPageNo === this.totalPageNo - this.pageNoItemLimit + 1)
    }
  },
  methods: {
    onSquareClick ($event) {
      var curPageNo =
        $event.target.dataset.pageno ||
        $event.target.parentElement.dataset.pageno
      if (curPageNo === 'prev') {
        this.currentPageNo = Math.max(1, this.currentPageNo - 1)
        this.veryLeftPageNo = Math.max(1, this.currentPageNo - this.pageNoItemLimit + 1)
      } else if (curPageNo === 'next') {
        this.currentPageNo = Math.min(this.totalPageNo, this.currentPageNo + 1)
        this.veryLeftPageNo = Math.max(1, this.currentPageNo - this.pageNoItemLimit + 1)
      } else if (curPageNo === 'rollup') {
        this.veryLeftPageNo = Math.max(1, this.veryLeftPageNo - 1)
      } else if (curPageNo === 'rolldown') {
        this.veryLeftPageNo = Math.min(this.totalPageNo - this.pageNoItemLimit + 1, this.veryLeftPageNo + 1)
      } else if (curPageNo) {
        this.currentPageNo = parseInt(curPageNo)
      }
    },
    // 翻页器方法
    // 方法1：上滚页
    rollupPage () {
      (this.veryLeftPageNo > 1) ? (this.veryLeftPageNo --) : (1)
    },
    // 方法2：上一页
    previousPage (doit) {
      if (doit) {
        this.page --
        if (this.page < this.veryLeftPageNo) {
          this.rollupPage()
        }
      }
    },
    // 方法3：翻页
    turnPage (p) {
      this.page = p + 1 + this.veryLeftPageNo
    },
    // 方法4：下滚页
    rolldownPage () {
      this.veryLeftPageNo ++
    },
    // 方法5：下一页
    nextPage (doit) {
      if (doit) {
        this.page ++
        if (this.page >= this.veryLeftPageNo + 9) {
          this.rolldownPage()
        }
      }
    },
    // 方法6：翻页并滚页
    turnrollPage (p) {
      this.turnPage(p)
      this.rollupPage()
    },
    // 方法7：首页
    veryFirstPage (doit) {
      if (doit) {
        if (this.page > this.veryLeftPageNo) {
          this.page = 1
          this.veryLeftPageNo = 1
          this.turnPage(-1)
        }
      }
    },
    // 方法8：末页
    veryLastPage (doit) {
      if (doit) {
        if (this.page < this.totalPageNo) {
          this.page = this.totalPageNo
          this.veryLeftPageNo = this.totalPageNo + 1 - Math.min((this.totalPageNo % 9) + 8, 9)
          this.turnPage(this.totalPageNo - this.veryLeftPageNo - 1)
        }
      }
    }
  },
  created () {},
  mounted () {}
}

</script>   

<style scoped>
  /* 专用 */
  .container {
    margin: 0 auto;
    user-select: none;
  }
  /* 覆盖 */
  .square {
    display: inline-block;
    font-size: 1em!important;
    font-weight: bolder;
    cursor: pointer;
    user-select: none;
  }
    .square.current {
      background-color: #E5E5E5;
      color: #FFF;
    }
  /* 测试 */
  .test {
    margin: 0 auto;
  }
</style>
