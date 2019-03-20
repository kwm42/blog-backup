import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/Welcome'
import Blog from '@/views/Blog'
import ArticleList from '@/views/blog/ArticleList'
import AboutMe from '@/views/blog/AboutMe'
import ArticleDetail from '@/views/blog/ArticleDetail'

import ManageHome from '@/views/ManageHome'
import Publish from '@/views/manage/Publish'

import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'root',
            redirect: {name: 'welcome'}
        }, {
            path: '/welcome',
            name: 'welcome',
            component: Welcome
        },{
            path:'/blog',
            name:'blog',
            component: Blog,
            children:[
                {
                    path:'/blog/list',
                    name:'list',
                    component:ArticleList
                },{
                    path:'/blog/aboutme',
                    name:'aboutme',
                    component:AboutMe
                },{
                    path:'/blog/detail/:id',
                    name:'article-detail',
                    component:ArticleDetail
                },{
                    path:'/blog/list/archieve/:date',
                    name:'archieve-list',
                    component:ArticleList
                }
            ]
        },{
            path:'/manage',
            name:'manage',
            component:ManageHome,
            children: [
                {
                    path:'/manage/publish',
                    name:'publish',
                    component:Publish
                }
            ]
        },{
            path:'/test',
            name:'test',
            component:Test
        }
    ]
})
