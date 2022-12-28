<script>
import Card from './Card.vue';
import {useToDoStore} from '@/stores/toDos';
import { storeToRefs } from 'pinia';

import { defineComponent } from 'vue';
    export default defineComponent({
        setup(){
            const store = useToDoStore();
            // const {toDos} = storeToRefs(store); 
            return {store};

        },
        components:{
            Card
        },
        props:["toDos"],
        // created(){
        //     console.log("Content created:",this.toDos);
        // },

        computed:{
            haveToDos(){
                // console.log(this.toDos);
                return this.store.toDos && this.store.toDos.length;
            }
        },
        watch:{
            toDos(newValue,old){
                console.log("updated todo,",newValue);
            }
        }
        

        

    })
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active{
    transition:all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)
}

.list-enter-from,
.list-leave-to{
    opacity: 0;
    transform: scaleY(0.01) translate(15px,0);
}

.list-leave-active{
    position:absolute
}
</style>

<template>

    <a-layout-content style="padding: 5px 50px;overflow-y: scroll;">
      <!-- <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">add todo</div> -->
      
      <TransitionGroup name="list">
        <div class="card-container" v-if="haveToDos"  v-for="toDo in this.store.toDos" :key="toDo._id">
        <Card :title= "toDo.task" :done="toDo.done==='true'" ></Card>

      </div> 
      <h2 v-else>Add Todos...</h2>
      </TransitionGroup>
      

    </a-layout-content>

</template>