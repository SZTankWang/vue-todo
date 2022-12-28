<!-- 
    header should display the current user name

 -->

<script>
import axios from "axios";
import {ref} from 'vue';
import {message} from 'ant-design-vue';
import {useToDoStore} from '../stores/toDos';

const messageKey = "message";

export default{
    
    setup(){
        const visible=ref(false);
        const value = ref("");
        const loadingText = ref("查询中");
        const store = useToDoStore();
        return {
            visible,
            value,
            loadingText,
            store
        }
    },
    props:["user"],
    methods:{
        openModel(){
            this.visible = true;
        },
        async login(e){
            //send our username to the server
            //pop up loading message
            const hide = message.loading({content:()=>this.loadingText, duration:0});
            axios.post("http://106.55.227.69/api/login",{
                username:this.value
            })
            .then((res)=>{
                console.log(res);
                //if success
                if(res.status==200){
                    this.loadingText = "登录成功";
                    //set global user state
                    this.store.setUser(this.value);
                    // message.success({content})

                }else{
                    this.loadingText="登录异常";
                }
                setTimeout(hide,500);
                setTimeout(()=>{
                    this.value = "";
                    this.visible = false;
                },600);
            })
            .catch((err)=>console.log(err));
            

            //update pinia state
        }
    }
}


</script>

<style>
.header-item{
    flex-basis:30%;
}

.header{
    display:flex;
    flex-direction: row;
    width:100%;
    justify-content: space-between;
    padding-top:10px !important;
}
</style>


<template>
    <a-layout-header class="header" :style="{background:'#fff'}">
        <a-page-header
    :style="{height:'100%',padding:'unset'}"
    title="Welcome"
    class = "header-item"
        /> 

        <a-button v-if="!user" type="primary" @click="openModel">登录</a-button>
        <a-button v-else type="link">{{ user }}</a-button>
        <a-modal v-model:visible="visible" title="登录" @ok="login">
            <a-input v-model:value="value" placeholder="起一个名字!" />

        </a-modal>
   
   </a-layout-header>
</template>    