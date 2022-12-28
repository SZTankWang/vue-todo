<script>
import{
    PlusOutlined
} from '@ant-design/icons-vue';

import {ref,reactive, defineComponent} from "vue";
import {useToDoStore} from '@/stores/toDos'
import { message } from 'ant-design-vue';
    export default defineComponent({
        setup(){
        const store = useToDoStore();
        // const {addToDo} = store;
        const visible = ref(false);
        const formState = reactive({title:"",done:false});
        return {
            store,
            visible,
            formState,

        };
    },
        components:{
            PlusOutlined
        },
        methods:{
            handleClick(event){
                //open modal
                if(this.store.getUser != "" && !this.visible){
                    this.visible = true;

                }else{
                    message.info({content:"请先登录",duration:0.8});
                }
            },
            createTodo(event){
                //close modal
                this.visible = false;
                //show message
                let msg = message.loading({content:"添加中",duration:0});
                //add new todo                
                let result =this.store.addToDo(Object.assign({},this.formState));
                // console.log(result);
                result.then(res=>{
                    if(res != 500){
                        console.log("todo added",res);
                        setTimeout(msg,0);

                    }
                    else{
                        message.error({content:"添加失败",duration:1.5});
                    }
                    
                })
                //clear form
                this.formState.title="";
            }
        }

    })
</script>

<style> 
.add-btn{
    float:right;
    border-radius: 50% !important;
    height:46px !important;
}
.button-container{
    position:relative;
    bottom:15px;
    padding-right:10px;
}

</style>

<template>
    <div class="button-container">
        <a-button class="add-btn" type="primary" v-on:click="handleClick">
            <PlusOutlined></PlusOutlined>

        </a-button>

    </div>
    <a-modal
      v-model:visible="visible"
      title="Add Todo"
      ok-text="确认"
      cancel-text="取消"
      @ok="createTodo"
    >
    <a-form
    :model="formState"
    name="newTodoInfo"

    autocomplete="off"
    @finish=""
    @finishFailed=""
    >
    <a-form-item
      label="Title"
      name="Title"
      :rules="[{ required: true, message: 'Set a title for the todo' }]"
    >
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <!-- <a-form-item
    
    ></a-form-item> -->

  </a-form>
    </a-modal>

</template>