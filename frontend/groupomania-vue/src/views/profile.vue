<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Mes données :</p>
    <p class="description">Bonjour {{user.nom}} {{user.prenom}}, bienvenue sur le forum! <br> Mon email: {{user.email}}<br></p>
     <button class="links">
            <li><router-link to="/forum" aria-label="lien versle forum" style="display: inline-block;text-decoration:none;"> Retour sur le forum</router-link></li>
        </button><br>
         <button class="links">
            <li><router-link to="/home" aria-label="lien vers mes posts" style="display: inline-block;text-decoration:none;"> Voir mes posts</router-link></li>
        </button>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
     <div class="form-row">
      <button class="button suppr"  @click="deleteUser()">
        Supprimer mon compte
        </button>
    </div>

   
  </div>

</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'profile',
  mounted: function () {
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
    },
 deleteUser: function () {
  this.$store.dispatch('deleteUser');
  },
 
   
},
}

</script>

<style scoped>
.links
{
  list-style-type: none;
  font-size: 1.3em;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom:1rem;
}
router-link
{
  text-decoration:none;
}
.button
{
  margin-top:1rem;
  }

  .description
  {
    margin-top:1rem;
    }
</style>>