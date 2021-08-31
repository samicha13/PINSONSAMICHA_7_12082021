<template>
  <div >
      <div id="message-card" v-for="post in allPosts" :key="post.id">
        <h1 class="title">{{ post.title }}</h1>
        <div class="content">
          <img class="imgLoad" :src="post.image" :alt="post.image"
            v-if="post.image != null"/> 
        </div>
        <h1>{{ post.content }}</h1>
        <div class="createdAt">
          <i>{{ moment(post.createdAt).fromNow() }}</i>
        </div>
        {{ post.User.nom }}
        <div>
          <router-link class="one-post" :to="'/onePost/' + post.id">
          Voir les commentaires</router-link>
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
let jwt = require("jsonwebtoken");
import axios from "axios";
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
      allPosts: [],
      idUserp: "",
      title: "",
      content: "",
      createdAt: "",
    };
  },
  methods: {
    loadForum() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, process.env.VUE_APP_TK_SESSION);
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allPosts = res.data;
          this.isAdmin = decodedToken.isAdmin;
        })
        .catch((error) => {
          { error }
        });
    },
  },
  mounted() {
    this.loadForum();
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
