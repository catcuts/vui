<template>
  <div>
    <div class="ui center-aligned segment">
			<span>123</span>
		</div>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [],
  data () {
    return {
      page: 1,
      totalPageNo: 1,
      veryLeftPageNo: 1,
      pageSize: 10
    }
  },
  props: {
    props: {type: Object, default: () => {}}
  },
  computed: {},
  methods: {
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
	.ui.segment.center-aligned > span,
	.ui.segment.center-aligned > p,
	.ui.segment.center-aligned > h1,
	.ui.segment.center-aligned > h2,
	.ui.segment.center-aligned > h3,
	.ui.segment.center-aligned > h4,
	.ui.segment.center-aligned > h5,
	.ui.segment.center-aligned > h6 { /* 可使用 cssnext custom-selector 来简化 */
		margin: auto;
  	position: absolute;
		left: 0; 
		right: 0;
	}
	.test {
		transform:rotate(1.2deg);
	}
</style>
