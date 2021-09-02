<template>
    <section>
        <img src="../assets/logo-black.png" alt="Logo groupomania" />
        <ul class="links">
            <li><router-link to="/profile" aria-label="lien vers page profil" style="display: inline-block;text-decoration:none;"> Mon Profil</router-link></li>
        </ul>
        <h2>Accueil</h2>
        <div class= centrer>
            <newPost />
        </div>
        <div class = center>
            <loadPosts />
        </div>
    </section>
    
</template>

<script>
import loadPosts from "../components/loadPosts.vue";
import newPost from "../components/newPost.vue";
export default {
  name: "forum",
  components: { loadPosts, newPost, },
  data() {
    return {
      token: "",
      Posts: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
img 
{
  display: flex;
  border-radius: 0px 0px 20px 20px;
  margin: auto;
  margin-bottom: 40px;
}
.links
{
  list-style-type: none;
  font-size: 1.3em;
  font-weight: 700;
}
router-link
{
  text-decoration:none;
}
</style>