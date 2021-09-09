import { createStore } from 'vuex'

import instance from "../Api.js"
import router from '../router/index'


// Create a new store instance.
const store = createStore({
    state: {
        user: null,
        token:null,
        posts:[]
    },
    mutations: {
        logUser: function (state, user) {
           
            state.user = user;
        },
      userInfos: function(state, user) {
          console.log(user);
          state.user = user ;
      },
        LOAD_POSTS: function (state, posts) {
            state.posts = posts.data
        
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            }
            localStorage.removeItem('user') 
            router.push('/')
        },
        SET_TOKEN : (state,token)=> state.token = token

    },
    actions: {
        getUserInfos: ({ state, commit }, ) => {
            return new Promise ((resolve,reject) => {
                
                return instance({
                method: 'GET',
                url: '/auth/user/me' ,
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then( (response) => {
                    commit('userInfos', response.data);
                    resolve('')
                }) 
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        loadPosts:  ({ commit },myposts="") => {
            
              instance
                  .get("http://localhost:3000/api/posts/"+myposts)
                  .then((response)=>{
                      commit('LOAD_POSTS',response)
                  })
                  .catch((error) => {
                  console.error(error) 
                  }); 
        },
        loadComments:  ({ commit },myposts="") => {
            
              instance
                  .get("http://localhost:3000/api/posts/"+myposts)
                  .then((response)=>{
                      commit('LOAD_POSTS',response)
                  })
                  .catch((error) => {
                  console.error(error) 
                  }); 
        },
        deleteUser({ state,commit }) {

                const userId = state.user.id;
                console.log(userId);
            instance({
                method: 'DELETE',
                url: '/auth/' + userId,
                data: {
                    email: state.user.email,
                    password: state.user.password
                }
            })
                .then(() => {
                    alert("votre compte à été correctement supprimé");
                   commit("logout")
                   window.location="/login";
                })
                .catch(error => {
                    alert("Une erreur est survenue. Veuillez vérifiez que votre mot de passe est correct.");
                    console.log(error);
                });
            
        },
        
        
    },
    getters:{
        posts: state => {
            return state.posts
          },
          currentUser :  state => {
            return state.user
          }
    }

});


export default store;