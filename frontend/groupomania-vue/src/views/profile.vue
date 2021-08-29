<template>
<img class="profile" alt="Logo groupomania"  src="../assets/logo-black.png"> 
  <div class="card profile-card">
    <h1 class=" h1Profil">Mon espace perso</h1>
    <router-link to="/forum" style="display: inline-block;text-decoration:none;font-size: 1.5em">Retour</router-link>
    <p class="data">{{ dataProfile.nom }} {{ dataProfile.email }}</p>
    <div class="form-row">
      <button class="button suppr" type="submit" @click.prevent="deleteProfile">Supprimer mon compte</button>
    </div>
    <h4>Mes posts</h4>
    <div class="my-posts">
      <div class="my-post" v-for="myPost in postsProfile" :key="myPost.id">
        <h3>{{ myPost.title }}</h3>
        <img :src="myPost.image" v-if="myPost.image != null" alt="Image du Post"/><br />
        <p>{{ myPost.content }}</p>
        <deletePost :id="myPost.id" />
      </div>
    </div>
  </div>
</template>

<script>
import deletePost from "../components/deletePost.vue";
import axios from "axios";
let jwt = require("jsonwebtoken");
export default {
  name: "profile",
   components: {
    deletePost,
  },
   props: {
    id: Number,
  },
 
  data() {
    return {
      token: "",
      error: "",
      userId: "",
      dataProfile: [],
      postsProfile: [],
      email: "",
      pseudo: "",
    };
  },
  methods:
   {  
     loadProfile() {
      let token = localStorage.getItem("token");
      const decodedToken = jwt.verify(token, "TK_SESSION");
      const userId = decodedToken.userId;
    
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId , {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
        
          this.dataProfile = res.data;
        })
        .catch((error) => {
        { error }
        });
    },    
     loadPostsProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId + "/posts", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.postsProfile = res.data;
        })
        .catch((error) => {
          ({ error });
        });
    },
    deleteProfile() {
      let token = localStorage.getItem("token");
      const decodedToken = jwt.verify(token, "TK_SESSION");
      const userId = decodedToken.userId;
      axios
        .delete("http://localhost:3000/api/auth/profile/" + userId , {
          headers: {Authorization: "Bearer " + token} , })
        .then(() => {
          alert("Votre compte est supprimé !");
          localStorage.clear();
          this.$router.push("/");
        })
        .catch((error) => {
          ({ error });
        });
    },
  },   
  mounted() {
    this.loadProfile();
    this.loadPostsProfile();
  },
};
</script>

<style scoped>
.h1Profil
{
  
  color:midnightblue;
  font-size:2em;
  margin-bottom:10px;
}
.data
{
  margin-top:10px;
}
p
{
  font-size:1.3em;
}
.suppr
{
  background-color: #86196F;
}
h4
{
  margin-top:25px;
  font-size:1.5em;
}
.profile-card
{
  background:#A7A6A3;
  width: 700px;
  margin: auto;
  margin-top: 100px;
}
.profile
{
  margin-bottom:25px;
  border-radius: 0px 0px 20px 20px;
}
.my-posts 
{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding-bottom: 20px;
  
}
.my-post 
{
  background-color: #727780;
  color: white;
  font-size: 1.4em;
  margin: 15px;
  padding: 10px;
  opacity: 0.8;
  text-align: center;
  border-radius:20px;
}
</style>