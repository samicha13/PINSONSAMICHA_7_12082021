import { createStore } from 'vuex'

import instance from "../Api.js"
import router from '../router/index'

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

// Create a new store instance.
const store = createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            nom: '',
            prenom: '',
            email: '',
            photo: '',
        },
        posts:[]
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
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
        }
    },
    actions: {
        login: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        localStorage.setItem('token', response.data.token)
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            });
        },
        createAccount: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/auth/signup', userInfos)
                    .then(function (response) {
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        getUserInfos: ({ state, commit }, userId) => {
            instance({
                method: 'GET',
                url: '/auth/' + userId,
                headers: { 'Authorization': 'Bearer ' + state.user.token }
            })
                .then(function (response) {
                    commit('userInfos', response.data);
                })
                .catch(function () {
                });
        },
        loadPosts: async ({ state, commit },myposts="") => {
            
            await  instance
                  .get("http://localhost:3000/api/posts/"+myposts, {
                  headers: { Authorization: "Bearer " + state.user.token },
                  })
                  .then((response)=>{
                      commit('LOAD_POSTS',response)
                  })
                  .catch((error) => {
                  console.error(error) 
                  }); 
        },
        createPost: ({ state }, formData) => {
            instance.post('/posts/', formData,
                { headers: { 'Authorization': 'Bearer ' + state.user.token } }
            )
                .then(function () {
                    alert("Votre post a bien été creé !");
                    document.location.reload();
                    //this.$router.push("/forum");
                })
                .catch((error) => {
                    this.error = error.response.data;
                });
        },
        createComment: ({ state }, data) => {
            instance.post("http://localhost:3000/api/posts/"+data.idPosts+'/comment/', {comment:data.comment},
                { headers: { 'Authorization': 'Bearer ' + state.user.token } }
            )
                .then(function () {
                    alert("Votre Comment a bien été crée !");
                    document.location.reload();
                    //this.$router.push("/forum");
                })
                .catch((error) => {
                    this.error = error.response.data;
                });
        },
        loadComments: async ({ state, commit },myposts="") => {
            
            await  instance
                  .get("http://localhost:3000/api/posts/"+myposts, {
                  headers: { Authorization: "Bearer " + state.user.token },
                  })
                  .then((response)=>{
                      commit('LOAD_POSTS',response)
                  })
                  .catch((error) => {
                  console.error(error) 
                  }); 
        },
        updateComment:async ({ state }, editedComment) => {
            let id = editedComment.id
            let comment = editedComment.comment
               await instance
                .put('/posts/comment',{id,comment}, { 'Authorization': 'Bearer ' + state.user.token })
                .then(function () {
                   document.location.reload();
                })
                .catch((error) => {console.error(error.response.data)});
        },
        deleteComment: ({ state }, commentId) => {
            
            var userselection = confirm("Supprimez cette commentaire ?");
            if (userselection == true)
            {
                let id = commentId
                instance
                .delete("http://localhost:3000/api/posts/1/comment/"+id,{data:{id}, headers: { 'Authorization': 'Bearer ' + state.user.token } })
                .then(function () {
                   document.location.reload();
                })
                .catch((error) => {console.error(error.response.data)});
            }
        },
        updatePost:async ({ state }, post) => {
            let id = post.id
            let message = post.content
               await instance
                .put('/posts',{id,message}, { 'Authorization': 'Bearer ' + state.user.token })
                .then(function () {
                   document.location.reload();
                })
                .catch((error) => {console.error(error.response.data)});
        },
        deletePost: ({ state }, postId) => {
            
            var userselection = confirm("Supprimez ce post ?");
            if (userselection == true)
            {
                let id = postId
                instance
                .delete('/posts',{data:{id}, headers: { 'Authorization': 'Bearer ' + state.user.token } })
                .then(function () {
                   document.location.reload();
                })
                .catch((error) => {console.error(error.response.data)});
            }
        },
        likePost:({ state },post)=>{
            
            let like = (post.usersLikes!=null && post.usersLikes.includes(state.user.userId))?0:1
            instance.post('/posts/'+post.id+'/like',  {
                like,
             },
            { headers: { 'Authorization': 'Bearer ' + state.user.token } }
         )
             .then(function () {
                
             document.location.reload();
             })
            .catch((error) => {
                console.error( error.message)
            });
        },
        deleteUser({ state,commit }) {

            var userselection = confirm("voulez vous vraiment Supprimez votre compte ?");
            if (userselection == true)
            {
                const userId = state.user.userId;
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
                   
                })
                .catch(error => {
                    alert("Une erreur est survenue. Veuillez vérifiez que votre mot de passe est correct.");
                    console.log(error);
                });
            }
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