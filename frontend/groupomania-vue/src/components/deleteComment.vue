<template>
        <i class="fa fa-trash" @click="deleteComment"></i>
</template>


<script>
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
    deleteComment() {
      this.$store
        .dispatch("deleteComment",this.id)
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