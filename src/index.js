import Vue from 'vue'
import App from './app.vue'
import "./assets/css/test.css"
import "./assets/css/zq.styl" 
import "./assets/imgs/ad02.jpg"

const root=document.createElement("div")
document.body.appendChild(root)
// console.log(tanghuan)
new Vue({
    render:function(h){
        return h(App)
    }
}).$mount(root)