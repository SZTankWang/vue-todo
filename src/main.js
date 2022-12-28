import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Antd from 'ant-design-vue';
import {createRouter,createWebHashHistory} from 'vue-router';
// import Icon from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';
import Content from './components/Content.vue';
import newContent from './components/newContent.vue';


// import './assets/main.css'

const app = createApp(App)
const routes = [
    {path:"/todo",
    component:Content,
    meta:{transition:"toDo"}
    },
    {path:"/others",
    component:newContent,
    meta:{transition:"others"}
    }

]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, 
  })
  
app.use(createPinia())
app.use(Antd);
app.use(router)


app.mount('#app')
