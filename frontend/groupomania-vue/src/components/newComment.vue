<template>

<section>
    <div class="">
   
        <div class="cardbox-comments">
        <div class="search">
           <p for="input_comment"> COMMENTEZ</p>
         <input aria-label="comment_button" id="input_comment" v-model="comment" type="text" placeholder="ajouter un commentaire" >
         <button  aria-label="comment_button" title="comment_button" @click.prevent="buttonNewComment" id="add-comment">
                   <i class="far fa-paper-plane"></i>
               </button>
        </div><!--/. Search -->
       </div>


    </div>
  </section>
</template>

<script>
import instance from "@/Api.js";

export default {
  name: "newComment",
  props: {
    postid:Number,
  },
  data() {
    return {
      comment: "",
      error: "",
    };
  },
  methods: {
    buttonNewComment() { 
      // const formData = new FormData();
      // formData.append("comment", this.comment);
      // formData.append("idPosts", this.postid);
      this.createComment({"comment": this.comment,"idPosts": this.postid});
    },
    createComment: function(data) {
      const self = this;
      instance.post("http://localhost:3000/api/posts/"+data.idPosts+'/comment/', {comment: data.comment})
        .then(function () {
          alert("Votre Commentaire a bien été créé !");
          self.$store.dispatch("loadPosts");
          //this.$router.push("/forum");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  }
};
</script>

<style  scoped>

.cardbox-comments{
  padding: 10px 40px 20px 40px !important;
  font-size: 0px;	
  text-align: center;
}


.cardbox-comments .comment-body {
  overflow: auto;
}
.search {
 position: relative;
 margin-bottom: -40px;
 border: 2px solid #f4f4f4;	
 width: 100%;
 overflow: hidden;
}
.search input[type="text"] {
 background-color: #fff;
 line-height: 10px;
 padding: 20px 60px 20px 10px;
 border: none;
 border-radius: 4px;
 font-family: 'Rokkitt', serif;
 font-size: 14px;
 color: #8d8d8d;
 height: inherit;
 width: 100%;
 font-weight: 700;
}
.search button {
 position: absolute;
 right: 0;
 top: 0px;
 border: none;
 background-color: transparent;
 color: #bbbbbb;
 padding: 15px 25px;
 cursor: pointer;
 
 display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
}
.search button i {
 font-size: 20px;
 line-height: 30px;
 display: block;
}


</style>