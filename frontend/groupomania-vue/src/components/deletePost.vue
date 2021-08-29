<template>
  <div>
    <button type="submit" @click.prevent="deletePost">X</button>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "deletePost",
  props: {
    id: Number,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    deletePost() {
      let token = localStorage.getItem("token");
      axios
        .delete("http://localhost:3000/api/posts/" + this.id, {
          headers: { Authorization: " Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été supprimé !");
          document.location.reload();
        })
        .catch((error) => {
          { error }
        });
    },
  },
};
</script>

<style scoped>
button 
{
  background-color: #BE545B;
  color: white;
  font-size: 20px;
}
</style>