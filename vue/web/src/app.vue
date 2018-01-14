<!--模板必须要有一个父标签-->
<template>
    <div id="app">
        {{ message }}
    </div>
</template>

<script>
//    commondjs方式引入
    module.exports = {
        data(){
            // data以函数的方式 返回
            return {
                message:"欢迎来到vue！"
            }
        }
    }
</script>