<template>
  <div class=centerLogo>  
    <img class="login" alt="Logo groupomania" src="../assets/logo-black.png"> 
  </div>
    <form method="post" @submit.prevent="loginUser" class="card">
      <h1 class="card__title">Connexion</h1>
      <p class="card__subtitle">Tu n'as pas encore de compte ? <router-link to="/createAcc" aria-label="lien vers page création de compte" class="card__action">Créer un compte</router-link></p>
      <div class="form-row">
        <input v-model="email" aria-required="true" aria-label="écrivez votre email"  class="form-row__input" type="text" placeholder="Adresse mail" />
      </div>
      <div class="form-row">
        <input v-model="password" aria-required="true" aria-label="écrivez votre mot de passe" class="form-row__input" type="password" placeholder="Mot de passe"/>
      </div>
      <div class="form-row">
        <button type="submit" class="button">Connexion</button>
      </div>
      <div class="error" v-if="error"> {{ error.error }} </div>
    </form>
</template>


<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      token: "",
      email: "",
      password: "",
      userId: "",
      error: "",
    };
  },
  methods: {
    async loginUser() {
      await axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          { localStorage.setItem("token", res.data.token);}
          this.$router.push("/forum");
        })
        .catch((error) => {
         this.error = error.response.data;  
        });
    },
  },
};
</script>
<style>
.login
{
  border-radius: 0px 0px 20px 20px;
}
</style>
