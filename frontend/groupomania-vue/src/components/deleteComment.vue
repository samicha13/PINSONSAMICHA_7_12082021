<template>
        <i class="fa fa-trash" @click="deleteComment"></i>
</template>


<script>
import instance from '@/Api.js';

export default {
  name: "deleteComment",
  props: {
    id: Number,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    deleteComment: function() {            
      var userselection = confirm("Supprimer ce commentaire ?");
      if (userselection == true)
      {
        let id = this.id
        instance
          .delete("http://localhost:3000/api/posts/1/comment/"+id,{data:{id}})
            .then(function () {
              document.location.reload();
            })
            .catch((error) => {console.error(error.response.data)});
      }
    },
  },
};
</script>

<style scoped>
.fa-trash
{
  color: rgb(240, 54, 54) !important;
  font-size: 20px;
  cursor: pointer;
}
</style>