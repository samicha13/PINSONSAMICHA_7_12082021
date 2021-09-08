<template>
<i @click.prevent="deletePost" class="fa fa-trash" ></i>
</template>


<script>
import instance from "@/Api.js";
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
     deletePost: function() {
            
      var userselection = confirm("Supprimez ce post ?");
      if (userselection == true)
      {
        let id = this.id
        instance
          .delete('/posts',{data:{id}})
            .then(function () {
              document.location.reload();
            })
            .catch((error) => {console.error(error.response.data)});
      }
    }
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