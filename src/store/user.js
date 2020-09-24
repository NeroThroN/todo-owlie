import * as firebase from 'firebase/app'
require('firebase/auth')

export default {
  namespaced: true,

  state: () => ({
    userEmail: null
  }),

  getters: {
    isConnected (state) {
      return state.userEmail !== null
    },
    getUserEmail (state) {
      return state.userEmail
    }
  },

  mutations: {
    setUserEmail (state, newEmail) {
      state.userEmail = newEmail
    }
  },

  actions: {
    // Create an user with Firebase (Email & Password)
    signUp (_, { email, password }) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((_) => {
          resolve(_)
        }).catch((error) => {
          reject(error)
        })
      })
    },

    signIn (_, { email, password }) {
      // Sign in with Firebase (Email & Password)
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((_) => {
          resolve(_)
        }).catch((error) => {
          reject(error)
        })
      })
    },

    // Sign out the user
    signOut () {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => resolve()).catch((error) => reject(error))
      })
    }
  }
}
