import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useToDoStore = defineStore("toDos",{
  state:()=>({
    toDos:[],
    count:0,
    user:""
  }),
  getters:{
    getToDo:(state)=>state.toDos,
    getUser:(state)=>state.user
  },
  actions:{
     addToDo(newToDo){
      //insert to database 
      return axios.post("http://106.55.227.69/api/addToDo",{
        task:newToDo.title,
        user:this.user
      })
      .then((res)=>{
        if(res.status==200){
          this.toDos.push({task:newToDo.title,done:false,id:parseInt(res.data)})
          return Promise.resolve(res);
  
        }
        else{
          return Promise.resolve(500);
        }
      })
      // 
      //on insertion complete, add to local state


    },
    setToDo(arr){
      this.$patch({toDos:arr});

    },
    removeToDo(title){
      //edit local state
      let idx = this.toDos.findIndex(i=>i.task==title);
      // console.log("idx is",idx,"title is",title);
      this.toDos.splice(idx,1);
      console.log(this.toDos);

      //update with db
      return axios.post("http://106.55.227.69/api/removeToDo",{
        task:title,
        name:this.user
      })
      .then((res)=>{
        return Promise.resolve(res);
      })

      
      },
    setUser(user){
      this.user = user;
      }
  }
  
})