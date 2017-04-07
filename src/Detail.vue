<template>
    <div class="detail">
        <div class="col-md-12 detail-panel">
            <div v-html="content"></div>
            <div class="loading" v-show="loadFlag">loading...</div>
        </div>
    </div>
</template>
<script>
import marked from 'marked'
export default {
    name: 'detail',
    data() {
        return {
            loadFlag: true,
            content: ''
        }
    },
    mounted() {
        this.$http.get(this.$serverPath + this.$route.query.name + '.md').then(response => {
            this.loadFlag = false;
            var temp = response.data;
            this.content = marked(temp);
        }, response => {
            alert("server error");
        })
    }
}
</script>
<style>
.detail-panel {
    background-color: #fff;
    min-height: 200px;
    margin-top: 10px;
    margin-bottom: 20px;
    -moz-box-shadow: 3px 3px 16px #333333;
    -webkit-box-shadow: 3px 3px 16px #333333;
    box-shadow: 3px 3px 16px #333333;
    -webkit-border-radius: 0.2em;
    border-radius: 0.2em;
    font-family: '微软雅黑';
    font-weight: 400;
    font-size: 16px;
}

h3 {
    margin: 5px 0;
}

.loading {
    line-height: 200px;
    text-align: center;
    color: red;
}

.detail-panel strong {
    font-weight: 700;
    font-size: 18px;
}

table {
    margin-bottom: 20px
}

table th {
    border: 1px solid #bbb;
    padding: 5px;
}

table td {
    border: 1px solid #bbb;
    padding: 5px;
}

.detail-panel {
    padding: 10px;
}

hr {
    border-top: 5px solid #eee;
    margin: 10px 0;
}

pre {
    color: #e60c94;
    background-color: #fdfdfd;
    border-radius: 3px;
}
</style>
