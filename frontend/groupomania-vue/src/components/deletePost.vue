<template>
<i @click.prevent="deletePost" class="fa fa-trash" ></i>
</template>


<script>
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
      this.$store
        .dispatch("deletePost",this.id)
       .then()
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