<template>
<div>
  <div id="message-card" v-for="post in posts" :key="post.id"> 
    <one-post :post="post"/>
   </div>
   </div>
</template>

<script>
import onePost from "./onePost"
import { mapGetters } from 'vuex'

export default {
  name: "loadPosts",
  props: {
    myposts:String,
  },
  components: {
    onePost
  },
  data() {
    return {
    };
  },
  methods: {
  
    
  },
  computed:{
    ...mapGetters([
      'posts',
    ])
  },
  mounted() {
    this.$store
        .dispatch("loadPosts",this.myposts)
       .then()
    
  },
};
</script>

<style>
</style>
