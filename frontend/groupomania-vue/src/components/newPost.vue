<template>
  <div class="forme">
    <form method="post" @submit.prevent="buttonNewPost" class= "forum">
    <div>
      <h2 class="h2forum">Partagez avec la communauté !</h2>
      <div>
        <input type="title" aria-required="true" aria-label="écrivez le titre de votre post"  id="title" placeholder="Titre" v-model="title" />
      </div>
      <div>
        <textarea type="text" aria-required="true" aria-label="écrivez le texte de votre post" id="content" placeholder="Votre post !" v-model="content"/>
      </div>
      <div class="input-group mb-3">
        <input type="file" style="color:transparent;" aria-label="Choisissez l'image de votre post" class="form-control" id="inputGroupFileAddon03" ref="file" @change="selectFile()"/>
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary" type="submit" @click.prevent="buttonNewPost" id="button-addon1">Envoyer</button>
      </div>
        <div class="error" v-if="error"> {{ error.error }} </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "newPost",
  data() {
    return {
      title: "",
      content: "",
      file: null,
      error: "",
    };
  },
  methods: {
    buttonNewPost() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      if (this.file !== null) {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("image", this.file, this.file.name);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
      }
      axios
        .post("http://localhost:3000/api/posts/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre post a bien été creé !");
          document.location.reload();
          this.$router.push("/forum");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style>
.forme, .forum
{
  max-width: 100%;
  width: 700px;
}
.forum
{
  
  height: 200px;
  margin-bottom: 20px;
  background:#727780;
  border-radius:20px;
  padding:32px;
}
.centrer
{
  display:flex;
  justify-content:center;
}
#button-addon1, #title, #content
{
  font-size:1em;
}
.h2forum
{
  color: #000000;
}
</style>
