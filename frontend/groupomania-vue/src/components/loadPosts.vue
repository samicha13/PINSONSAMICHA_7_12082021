<template>
  <div >
      <div id="message-card" v-for="post in posts" :key="post.id">
      
        <h1 class="title">{{ post.titre }}</h1>
        <div class="content">
          <img class="imgLoad" :src="post.image" :alt="post.image"
            v-if="post.image != null"/> 
        </div>
           
        <h1>{{ post.message }}</h1>
        <div class="createdAt">
          <i>{{ moment(post.createdAt).fromNow() }}</i>
        </div>
         
          
      
        <div class="adminDelete" v-if="isAdmin == true">
          <deletePost :id="post.id" />
        </div>
      </div>
    </div>
</template>

<script>
import deletePost from "./deletePost";
let moment = require("moment");

import axios from "../Api.js";
export default {
  name: "loadPosts",
  components: {
    deletePost,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: "",
      posts: [],
      //users: [],
      idUserp: "",
      title: "",
      content: "",
      createdAt: "",
    };
  },
  methods: {
    loadForum() {
      let token = this.$store.state.user.token;
      
      axios.get("http://localhost:3000/api/posts/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then(res => {this.posts =res.data;
        console.log(this.posts)
         
          })
      
        .catch((error) => {
          { error }
        });
    },

    loadUser(){
      let token = this.$store.state.user.token;
       axios.get("http://localhost:3000/api/auth/", {
          headers: { Authorization: "Bearer " + token },
        })
         .then(res => {
        this.users = res.data;
        console.log(this.users)
       ;
        
      })
       .catch((error) => {
          { error }
        });
    }
  },
  mounted() {
    this.loadForum();
     this.loadUser();
  },
};
</script>

<style>
.imgLoad
{
  height:500px;
  max-height:100%;
  width:600px;
}
.size
{
  font-size : 1.2em;
}
.title
{
  margin-top: 40px;
  font-size:1.7em;
}
#message-card
{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding:10px;
}
.adminDelete
{
  margin-top:10px;
}
</style>
