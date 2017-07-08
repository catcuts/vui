<template>
    <div>
		<!-- 分页器（开始）-->
		<div v-if="totalPageNo > 0" class="ui vertical basic segment" style="margin-top:12px;">
			<!-- 极左（开始） -->
			<a @click="veryFirstPage(page !== 1)" :class="['ui left floated segment l2', { 'disabled': (page === 1) }]">
				<i :class="['angle double left big icon', { 'blue': !(page === 1) }]"></i>
			</a>
			<!-- 极左（结束） -->

			<!-- 左手（开始） -->
			<a @click="previousPage(page !== 1)" :class="['ui left floated segment l2', { 'disabled': (page === 1) }]" style="margin-top:auto;">
				<i :class="['angle left big icon', { 'blue': !(page === 1) }]"></i>
			</a>
			<!-- 左手（结束） -->

			<!-- 页码（开始） -->
			<div class="ui borderless text menu num">
				<!-- todo: how the page nav will be when there are  large amount of pages? -->
				<div class="item-num">
					<a v-on:click="turnrollPage(-1)" :class="['item', { 'active': (page === veryLeftPageNo) }]" :style="{ 'backgroundColor': (page === veryLeftPageNo) ? '#1678c2' : 'initial' }">
						<h3 :style="{ 'color': (page === veryLeftPageNo) ? '#ffffff' : 'rgba(0,0,0,.6)' }">
							{{ veryLeftPageNo }}
						</h3>
					</a>
				</div>

				<div v-for="p in ((totalPageNo <= 9)&&(totalPageNo > 0) ? (totalPageNo-1) : 8)" class="item-num">
					<a v-on:click="turnPage(p-1)" :class="['item', { 'active': (page === p + veryLeftPageNo) }]" :style="{ 'backgroundColor': (page === p + veryLeftPageNo) ? '#1678c2' : 'initial' }">
						<h3 :style="{ 'color': (page == p + veryLeftPageNo) ? '#ffffff' : 'rgba(0,0,0,.6)' }">
							{{ p + veryLeftPageNo }}
						</h3>
					</a>
				</div>

				<div v-show="totalPageNo - veryLeftPageNo >= 9" class="item-num">
					<a v-on:click="rolldownPage" class="item">
						<h3 style="color: #1678c2;">
							...
						</h3>
					</a>
				</div>
			</div>
			<!-- 页码（结束） -->

			<!-- 极右（开始） -->
			<a @click="veryLastPage(page !== totalPageNo)" :class="['ui right floated segment r2', { 'disabled': (page === totalPageNo) }]">
				<i :class="['angle double right big icon', { 'blue': !(page === totalPageNo) }]"></i>
			</a>
			<!-- 极右（结束） -->

			<!-- 右手（开始） -->
			<a @click="nextPage(page !== totalPageNo)" :class="['ui right floated segment r2', { 'disabled': (page === totalPageNo) }]">
				<i :class="['angle right big icon', { 'blue': !(page === totalPageNo) }]"></i>
			</a>
			<!-- 右手（结束） -->

			
		</div>
    <!-- 分页器（结束）-->
		
		<!-- 无分页（开始）-->
		<div v-else class="ui vertical basic segment" style="margin-top:12px;">
			<!-- 左手（开始） -->
			<a class="ui left floated segment l2 disabled">
				<i class="angle left big icon"></i>
			</a>
			<!-- 左手（结束） -->

			<!-- 页码（开始） -->
			<h3 style="color: #a5a5a5;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-25%);">            
				x_x
			</h3>
			<!-- 页码（结束） -->

			<!-- 右手（开始） -->
			<a class="ui right floated segment r2 disabled">
				<i class="angle right big icon"></i>
			</a>
			<!-- 右手（结束） -->
		</div>
		<!-- 无分页（结束）-->
	</div>
</template>

<script>
    export default {
        components:{ },
        mixins:[ ],
        data(){

        },
        props:{
            props:{type:Object,default:()=>{}},
        },
        computed:{
            
        },
        methods:{
            		// 翻页器方法
		// 方法1：上滚页
		rollupPage () {
			(this.veryLeftPageNo > 1) ? (this.veryLeftPageNo --) : (1);
		},
		// 方法2：上一页
		previousPage (doit) {
			if(doit){
				this.page --;
				if (this.page < this.veryLeftPageNo) {
					this.rollupPage();
				};
			}
		},
		// 方法3：翻页
		turnPage (p) {
			this.page = p + 1 + this.veryLeftPageNo;
		},
		// 方法4：下滚页
		rolldownPage () {
			this.veryLeftPageNo ++;
		},
		// 方法5：下一页
		nextPage (doit) {
			if(doit){
				this.page ++;
				if (this.page >= this.veryLeftPageNo + 9) {
					this.rolldownPage();
				};
			}
		},
		// 方法6：翻页并滚页
		turnrollPage (p) {
			this.turnPage(p);
			this.rollupPage();
		},
		// 方法7：首页
		veryFirstPage (doit) {
			if(doit){
				if (this.page > this.veryLeftPageNo) {
					this.page = 1;
					this.veryLeftPageNo = 1;
					this.turnPage(-1);
				};
			}
		},
		// 方法8：末页
		veryLastPage (doit) {
			if(doit){
				if (this.page < this.totalPageNo) {
					this.page = this.totalPageNo;
					this.veryLeftPageNo = this.totalPageNo + 1 - Math.min((this.totalPageNo%9)+8, 9);
					this.turnPage(this.totalPageNo - this.veryLeftPageNo - 1);
				};
			}
		},
        },
        created(){
        
        },
        mounted(){

        }
    }

</script>   

<style scoped>
	
</style>