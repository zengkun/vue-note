<template>
    <div class="container">
        <!-- 获取路由相关信息 -->
        <!-- <div>
            <p>当前路径：{{$route.path}}</p>
            <p>当前参数：{{$route.params}}</p>
            <p>路由名称：{{$route.name}}</p>
            <p>路由查询参数：{{$route.query}}</p>
            <p>路由匹配项：{{$route.matched}}</p>
        </div> -->
        <h3 class="page-title">Vue 学习笔记</h3>
        <div v-if="isDetail" class="col-md-1 tag">
            <router-link :to="{path: '/'}" class="btn-back">
                <i class="glyphicon glyphicon-arrow-left"></i>&nbsp;&nbsp;返回
            </router-link>
        </div>
        <div :class="[isDetail?'col-md-11':'col-md-12']" class="search">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-search"></i></span>
                <input type="text" class="form-control" placeholder="Search" v-model="searchKey" aria-describedby="basic-addon1">
            </div>
        </div>
        <div class="list-warp">
            <ul>
                <li v-if="isDetail" class="col-md-12">
                    <router-view></router-view>
                </li>
                <li v-else v-for="item in tempItems" class="col-md-6 tag">
                    <router-link :to='{path: "/detail", query: {name: item.router}}' v-html="item.title"></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import router from "./router"
export default {
    name: 'app',
    data() {
        return {
            items: data.items,
            searchKey: '',
            redKey: [],
            tempItems: data.items
        }
    },
    computed: {
        isDetail: function() {
            return this.$route.name == 'Detail'
        }
    },
    watch: {
        searchKey(newVal, oldVal) {
            router.push({
                path: '/'
            })
            if (!this.searchKey || this.searchKey.length <= 0) {
                this.tempItems = this.items
            }

            this.redKey.length = 0;
            this.tempItems = this.items.filter((item) => {
                if (item.title.toUpperCase().includes(this.searchKey.toUpperCase())) {
                    var start = item.title.toUpperCase().indexOf(this.searchKey.toUpperCase())
                    this.redKey.push(item.title.slice(start, start + this.searchKey.length))
                }
                // bug:高亮关键词时，若一个标题中有多处，多处显示相同
                // console.log(this.redKey);
                return item.title.toUpperCase().includes(this.searchKey.toUpperCase())
            }).map((item, index) => {
                var vKey = this.searchKey;
                // var regExp = new RegExp(vKey, "gim");
                var regExp = new RegExp(vKey, "im");
                return {
                    "title": item.title.replace(regExp, '<span class="red">' + this.redKey[index] + '</span>'),
                    "router": item.router
                };
            })
        }
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    background: #f4f4f4 url(./assets/bg.jpg);
    font-weight: 300;
    font-size: 15px;
    color: #333;
    overflow: scroll;
    overflow-x: hidden;
}

.list-warp {
    padding-top: 15px;
    width: 100%;
    float: left;
}

.container {
    padding: 0;
}

.page-title {
    color: #18aaf2;
    padding: 10px 15px 5px;
}

.red {
    color: red;
}

ul li {
    display: block;
}

.search div input {
    outline: none;
}

.search div {
    background: #fff;
}

.search div {
    background: #fff;
    color: #5a5a5a;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
    -moz-box-shadow: 3px 3px 16px #333333;
    -webkit-box-shadow: 3px 3px 16px #333333;
    box-shadow: 3px 3px 16px #333333;
    -webkit-border-radius: 0.2em;
    border-radius: 0.2em;
}

.tag a {
    background: #fff;
    display: block;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    padding: 8px 10px;
    -moz-box-shadow: 3px 3px 16px #333333;
    -webkit-box-shadow: 3px 3px 16px #333333;
    box-shadow: 3px 3px 16px #333333;
    -webkit-border-radius: 0.2em;
    border-radius: 0.2em;
    text-decoration: none;
}

.tag a:hover {
    background: #18aaf2;
    color: #fff;
}

.search {
    margin-top: 10px;
}

.tag {
    margin-top: 10px;
}

.tag:last-child {
    margin-bottom: 10px;
}

.tag .btn-back {
    width: 80px;
    font-size: 14px;
    padding: 7px 10px 6px;
}
</style>
