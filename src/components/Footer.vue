<style>
.footer{
    background-color: aqua !important;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding:unset !important;
    border-radius:3px;

}
.tab-btn{
    flex-basis:50%;
    height:64px !important;
    /* border: 0px !important; */
}
</style>



<script>
import { defineComponent } from 'vue';
import { BulbOutlined } from '@ant-design/icons-vue';
import {RouterLink} from 'vue-router';

export default defineComponent({
    components:{
        BulbOutlined,
        RouterLink
    }
})

</script>


<template>
    <a-layout-footer class="footer">
        
            <a-button class="tab-btn">
                <router-link to="/todo">
                    <BulbOutlined />

                </router-link>

            </a-button>

        
        <a-button class="tab-btn">
            <router-link to="/others">
                😄
            </router-link>

        </a-button>


    </a-layout-footer>

</template>