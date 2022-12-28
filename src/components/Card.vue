<script>
import {useToDoStore} from '@/stores/toDos';
import {defineComponent, ref, toRef} from 'vue';
import { storeToRefs } from 'pinia'


export default defineComponent({
    // data(){
    //     return {
    //         checked:false,
    //         done:false
    //     }
    // },
    props:{
        done:Boolean,
        title:String
    },
    setup(props){
        // const checked = ref(false);
        const markedDone= toRef(props,"done");
        const checked = ref(false);
        const store = useToDoStore();


        return {
            // checked,
            store,
            markedDone,
            checked
        }
    },

    methods:{
         handleChange(e){
            //set this task to done
            //dont modify prop
            // this.markedDone = !this.markedDone;
            
        }
 
    },
    mounted(){
        console.log("card created, done is",this);
    },
    beforeUpdate(){
        // this.checked = this.markedDone.value;
    },
    watch:{
        checked(value){
            if(value){
                //mark as done
                setTimeout(()=>{
                    let result=this.store.removeToDo(this.title);
                    result.then(res=>{
                        console.log("deletion result:",res);
                    })
                },1000);
                
            }
        }
    }
})
</script>

<style>

</style>

<template>
<a-card>
    <a-row>
        <a-col :span="5">
         <a-checkbox v-model:checked="checked" @change="handleChange"></a-checkbox>

        </a-col>
        <a-col :span="16">
            <p>{{ title }}</p>
        </a-col>
    </a-row>

    </a-card>
</template>