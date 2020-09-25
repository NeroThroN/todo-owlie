import * as firebase from 'firebase/app'
require('firebase/auth')
require('firebase/firestore')

export default {
  namespaced: true,

  state: () => ({
    uid: null,
    email: null
  }),

  getters: {
    isConnected (state) {
      return state.uid !== null
    },
    getEmail (state) {
      return state.email
    },
    getUid (state) {
      return state.uid
    }
  },

  mutations: {
    setUser (state, { uid, email }) {
      state.uid = uid
      state.email = email
    }
  },

  actions: {
    // Create an user with Firebase (Email & Password)
    signUp (_, { email, password }) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async (firebaseAuthResult) => {
          // Create a document with userUID for the id in firestore
          const userDoc = firebase.firestore().collection('users').doc(firebaseAuthResult.user.uid)
          // Populate the document with user's email and list of toDo
          const timeStamp = firebase.firestore.Timestamp.now()
          await userDoc.set({ email, createdAt: timeStamp })
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
    },

    // Add a new todo element
    addToDo ({ state, dispatch }, { title, description }) {
      return new Promise((resolve, reject) => {
        const timeStamp = firebase.firestore.Timestamp.now()
        firebase.firestore().collection('users').doc(state.uid).collection('toDoList').add({ title, description, done: false, createdAt: timeStamp }).then((_) => {
          resolve(_)
        }).catch((error) => {
          reject(error)
        })
      })
    },

    // Remove a todo element by id
    removeToDoByID ({ state }, id) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('users').doc(state.uid).collection('toDoList').doc(id).delete().then((_) => {
          resolve(_)
        }).catch((error) => {
          reject(error)
        })
      })
    },

    // get the firebase document of this user
    getUserDocumentPath ({ state }) {
      return firebase.firestore().collection('users').doc(state.uid).path
    }
  }
}
