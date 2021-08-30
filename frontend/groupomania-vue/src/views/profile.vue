<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Mes données :</p>
    <p>Bonjour {{user.nom}} {{user.prenom}} <br> Mon email: {{user.email}}<br></p>
    <img :src="user.photo"/>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
    <button class="links">
            <li><router-link to="/forum" aria-label="lien versle forum" style="display: inline-block;text-decoration:none;"> Retour sur le forum</router-link></li>
        </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
  this.$store.dispatch('getUserInfos', this.$store.state.user.userId);
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.links
{
  list-style-type: none;
  font-size: 1.3em;
  font-weight: 700;
  margin-top: 2rem;
}
router-link
{
  text-decoration:none;
}
</style>>