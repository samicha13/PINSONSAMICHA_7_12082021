
<template>
  <div class="d-flex card mb-3 shadow p-3 mb-5 bg-white rounded">
    <div
      v-if="post.idUsers === currentUser.id || currentUser.isAdmin"
      class="post-head"
    >
      <delete-post :id="post.id" />

      <i
        class="fa fa-edit"
        @click="
          editedPost.id = post.id;
          editedPost.content = post.message;
        "
      ></i>
      <delete-comment :id="post.id" />
    </div>

    <img
      class="card-img-top"
      :src="post.media"
      :alt="post.media"
      v-if="post.media != null"
    />
    <div class="card-body">
      <h5 class="card-title">{{ post.titre }}</h5>

      <div
        v-if="
          editedPost.id === post.id &&
          (post.idUsers == currentUser.id || currentUser.isAdmin)
        "
      >
        <div class="form-group">
          <textarea
            type="text"
            class="form-control"
            aria-required="true"
            aria-label="écrivez le texte de votre post"
            id="content"
            placeholder="Votre post !"
            v-model="editedPost.content"
            cols="30"
            rows="4"
          />
        </div>
        <button class="btn btn-outline-secondary m-4" @click="updatePost">
          modifier
        </button>
      </div>
      <div v-else>
        <p class="card-text">{{ post.message }}</p>
      </div>

      <p class="card-text">
        <i class="far fa-user"></i>
        <small class="text-muted"
          >{{ post.User.nom }} {{ post.User.prenom }}
        </small>
        <br />
        <i class="far fa-clock"></i>
        <small class="text-muted ml-3">{{
          moment(post.createdAt).fromNow()
        }}</small>
      </p>
      <p v-if="post.usersLikes != null">
        <i
          v-if="post.usersLikes.includes(currentUser.userId)"
          @click="likePost(post)"
          class="fas fa-thumbs-up"
        ></i>
        <i v-else @click="likePost(post)" class="far fa-thumbs-up"></i>
        <small v-if="post.likes != 0" class="text-muted">
          {{ post.likes }}
        </small>
      </p>
      <p v-else>
        <i class="far fa-thumbs-up" @click="likePost(post)"></i>
      </p>
    </div>
    <div>
      <hr class="hr-primary" />
      <new-comment :postid="post.id" />

      <loadComments :comments="post.Comments" />
    </div>
  </div>
</template>

<script>
import deletePost from "./deletePost";
import newComment from "./newComment";
import loadComments from "./loadComments";
import { mapState, mapGetters } from "vuex";
import instance from "@/Api.js";
let moment = require("moment");

export default {
  name: "onePost",
  props: {
    post: Object,
  },
  components: {
    deletePost,
    newComment,
    loadComments,
  },
  data() {
    return {
      moment: moment,
      editedPost: {
        id: null,
        content: "",
      },
    };
  },
  methods: {
    likePost: function(post) {
            
     
      let like = (post.usersLikes!=null && post.usersLikes.includes(this.user.userId))?0:1
      instance.post('/posts/'+post.id+'/like',  { like })
        .then(function () {
                
          this.$store.dispatch("loadPosts");
        })
        .catch((error) => {
          console.error( error.message)
        });
    },
    updatePost: () => {
     
      let id = this.editedPost.id
      let message = this.editedPost.content
      instance
        .put('/posts',{id,message})
        .then(function () {
          this.$store.dispatch("loadPosts");
        })
        .catch((error) => {console.error(error.response.data)});
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style>
p {
  margin-bottom: 0 !important;
}
.card-img-top {
  height: 30vh;
}

.fa-thumbs-up {
  cursor: pointer;
  margin: 3px;
}
.post-head {
  background: #fcfcfc;
  padding: 10px 12px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
}

.post-head i {
  float: right;
  margin-left: 14px;
  position: relative;
  top: 2px;
  color: #a6a6a6;
  cursor: pointer;
  transition: color 0.3s ease;
}
.card {
  width: 100% !important;
}

.card-text {
  margin-top: 1rem !important;
}
</style>