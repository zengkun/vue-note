import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/Detail'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/vnote/detail',
		name: 'Detail',
		component: Detail
	}]
})