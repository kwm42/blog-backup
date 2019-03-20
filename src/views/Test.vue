<template>
    <div>
        <p>test</p>
        <IconBase><IconBox/></IconBase>   
        <IconBase><DoubleDown/></IconBase>
        <el-button>click me</el-button>
    </div>
</template>

<script>
import IconBase from '../components/IconBase'
import IconBox from '../components/icons/IconBox'
import DoubleDown from '../components/icons/DoubleDown'

export default {

    name:'Test',
    components:{
        IconBase, IconBox,DoubleDown
    },
    methods:{
        getArchieves(){
            this.$axios.get('/api/archieve')
                .then(res=>{
                    res=res.data
                    console.log("archieve",res)
                    if(res.success){
                        this.archieves=res.data
                        this.$store.commit("setArchieves",res.data)
                    }else{
                        console.log("retrieve archieve failed")
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    },
    mounted() {
      this.getArchieves();
    }
}
</script>

<style scoped>

</style>
