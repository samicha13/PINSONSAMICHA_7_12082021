<template>
  <div class="comments-container">
    <ul id="comments-list" class="comments-list">
      <li v-for="comment in comments" :key="comment.comment">
        <div class="comment-main-level">
          <div class="comment-box">
            <div class="comment-head">
              <h6 class="comment-name by-author">
                <a>{{ comment.User.nom }} {{ comment.User.prenom }}</a>
              </h6>
              <span>{{ moment(comment.createdAt).fromNow() }}</span>
              <i class="fa fa-edit" @click="editedComment.id=comment.id;editedComment.comment=comment.comment"></i>
              <delete-comment :id="comment.id" />
            </div>

            <div class="box"  v-if="editedComment.id==comment.id">
                <input
                v-model="editedComment.comment"
                  type="text"
                  placeholder="add any comment..."
                  id="comment"
                /><button id="update-comment" @click="commentUpdate" >
                  modifiez votre commentaire
                </button>
              </div>

            <div v-else class="comment-content">
              {{ comment.comment }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
let moment = require("moment");

import deleteComment from "./deleteComment.vue";

export default {
  name: "loadComments",
  props: {
    comments: Array,
  },
  components: {
    deleteComment,
  },
  data() {
    return {
      moment: moment,
      editedComment: {
        id: "",
        comment: "",
      },
    };
  },
  methods: {
    commentUpdate() {
      this.$store.dispatch("updateComment", this.editedComment).then(() => {});
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.box {
    display: flex;
    justify-content: space-between;
}

.box input {
    width: 70%;
    border: none;
    padding: 15px;
  border-radius:2%
}

 .box button {
    width: 50%;
    background: #24243e;
    border: 1px solid #fff;
    cursor: pointer;
    color: #fff;
    transition: all .5s;
}

 .box button:hover {
    background: #3f4c6b;
    border: 1px solid #3f4c6b;
}

a {
  color: #03658c;
  text-decoration: none;
}

ul {
  list-style-type: none;
}

.comments-container h1 {
  font-size: 36px;
  color: #283035;
  font-weight: 400;
}

.comments-container h1 a {
  font-size: 18px;
  font-weight: 700;
}

.comments-list {
  margin-top: 30px;
  position: relative;
}

.comments-list li {
  margin-bottom: 15px;
  display: block;
  position: relative;
}

.reply-list {
  padding-left: 88px;
  clear: both;
  margin-top: 15px;
}

.comment-main-level:after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  clear: both;
}

.reply-list .comment-box {
  width: 610px;
}
.comment-box .comment-head {
  background: #fcfcfc;
  padding: 10px 12px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
  float: right;
  margin-left: 14px;
  position: relative;
  top: 2px;
  color: #a6a6a6;
  cursor: pointer;
  -webkit-transition: color 0.3s ease;
  -o-transition: color 0.3s ease;
  transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
  color: #03658c;
}

.comment-box .comment-name {
  color: #283035;
  font-size: 14px;
  font-weight: 700;
  float: left;
  margin-right: 10px;
}

.comment-box .comment-name a {
  color: #283035;
}

.comment-box .comment-head span {
  float: left;
  color: #999;
  font-size: 13px;
  position: relative;
  top: 1px;
}

.comment-box .comment-content {
  background: #fff;
  padding: 12px;
  font-size: 15px;
  color: #595959;
  -webkit-border-radius: 0 0 4px 4px;
  -moz-border-radius: 0 0 4px 4px;
  border-radius: 0 0 4px 4px;
}

.comment-box .comment-name.by-author,
.comment-box .comment-name.by-author a {
  color: #03658c;
}
.comment-box .comment-name.by-author:after {
  content: "auteur";
  background: #03658c;
  color: #fff;
  font-size: 12px;
  padding: 3px 5px;
  font-weight: 700;
  margin-left: 10px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
@media only screen and (max-width: 766px) {
  .comments-container {
    width: 480px;
  }

  .comments-list .comment-box {
    width: 390px;
  }

  .reply-list .comment-box {
    width: 320px;
  }
}
</style>
