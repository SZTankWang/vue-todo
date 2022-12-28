<script>
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';
import AddButton from './components/AddButton.vue';
import {useToDoStore} from '@/stores/toDos';
import { RouterView } from 'vue-router';
import axios from "axios";
import { defineComponent } from 'vue';
import {ref} from "vue";
import { message } from 'ant-design-vue';

export default defineComponent(
  {

    setup(){
      //current user
      const user = ref("");
      const store = useToDoStore();

      return{
        user,
        store 
      }
    },
    computed:{
      getCurrentUser(){
        return this.store.getUser;
      }
    },
    watch:{
      getCurrentUser(name){
        console.log("quering todo for user",name);
        let msg =message.loading({content:"获取待办",duration:0});
        axios.get("http://106.55.227.69/api/getToDo",{
          params:{
            name:this.store.getUser
          }
        })
        .then((res)=>{
          console.log(res);
          //set the todo state variable
          this.store.setToDo(res.data);
          
        })
        .catch((err)=>{
          message.info({content:"待办为空",duration:0.8});
        })
        .finally(()=>{
          setTimeout(msg,0);
        })
      }
    },
  components:{
    Header,
    Content,
    AddButton,
    Footer,
    RouterView
  },
  mounted(){
    
    // axios.get("http://localhost:3000/",{
    //   params:{
    //     name:"admin"
    //   }
    // }).then((res)=>{
    //   console.log("message from server")
    //   console.log("server:",res);
    // }).catch(err=>{
    //   console.log(err);
    // })
  }
  }
) 
</script>

<style>
.mycontainer{
  height:100vh;
  width:100vw;
  /* display: flex; */

  /* background-color: aliceblue; */
}

.toDo-enter-active,
.toDo-leave-active{
  transition:all 0.2s ease;
}

.toDo-enter-from{
  transform: translateX(100%);
}
.toDo-leave-to{
  transform:translateX(-100%);
}
.others-enter-active,
.others-leave-active{
  transition:all 0.2s ease;
}
.others-enter-from{
  transform: translateX(-100%);
}
.others-leave-to{
  transform:translateX(100%);
}
</style>

<template>
  <div class="mycontainer">
    <a-layout class="layout" :style="{height:'100%'}">
      <Header :user="getCurrentUser"></Header>

        <router-view v-slot="{Component,route}">
          <Transition :name="route.meta.transition" mode="out-in"> 
            <component :is="Component"></component>    
          </Transition>
        </router-view>



      <AddButton ></AddButton>
      <Footer></Footer>
  </a-layout>
  </div>

</template>