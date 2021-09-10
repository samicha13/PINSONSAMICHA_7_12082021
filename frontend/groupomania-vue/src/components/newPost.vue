
<template>
  <div class="m-4">
    <div class="d-flex card mb-3 shadow p-3 mb-5 bg-white rounded">
     <form method="post" @submit.prevent="buttonNewPost">
      <div class="form-group">
        <h1 class="display-4">Partagez avec la communauté !</h1>
      </div>
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          type="text"
          class="form-control"
          id="title"
          aria-required="true"
          aria-label="écrivez le titre de votre post"
          placeholder="Titre"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <label for="content">Contenu</label>
        <textarea
          type="text"
          class="form-control"
          aria-required="true"
          aria-label="écrivez le texte de votre post"
          id="content"
          placeholder="Votre post !"
          v-model="content"
        />
      </div>
      <div class="form-group">
        <label for="inputGroupFileAddon03">Ajoutez votre image</label>
        <input
          type="file"
          style="color: transparent"
          aria-label="Choisissez l'image de votre post"
          class="form-control"
          id="inputGroupFileAddon03"
          ref="file"
          @change="selectFile()"
        />
      </div>

      <button
        class="btn btn-outline-secondary m-4"
        type="submit"
        @click.prevent="buttonNewPost"
        id="button-addon1"
      >
        Submit
      </button>
      <div class="error" v-if="error">{{ error.error }}</div>
    </form>
    </div>
  </div>
</template>

<script>
import instance from "@/Api.js";

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
      const formData = new FormData();
      formData.append("titre", this.title);
      formData.append("message", this.content);

      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.createPost(formData);
    },
    createPost: function(formData) {
      const self = this;
      instance.post('/posts/', formData)
        .then(function () {
          alert("Votre post a bien été creé !");
          self.$store.dispatch("loadPosts");
          //this.$router.push("/forum");
        })
        .catch((error) => {
        console.log(error)
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
.forme,
.forum {
  max-width: 100%;
  width: 700px;
}
.forum {
  height: 200px;
  margin-bottom: 20px;
  background: #727780;
  border-radius: 20px;
  padding: 32px;
}
.centrer {
  display: flex;
  justify-content: center;
}
</style>