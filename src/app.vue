<template>
  <div id="text">{{text}}</div>
</template>

<script>
export default {
    data() {
        return {
            text:'abc'
        }
    }

}
</script>

<style>
    html,body {
        width:100%;
        height:100%;
    }
    body {
        background:url('people.png')
    }
    #text {
        color:red;
    }
</style>
