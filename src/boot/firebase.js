import * as firebase from 'firebase/app'
import Credentials from './../config/credentials'

export default ({ store, redirect, urlPath }) => {
  firebase.initializeApp(Credentials.firebaseConfig)
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    // Set user email and uid in the user's store
    var user = { uid: null, email: null }
    if (firebaseUser) {
      user.uid = firebaseUser.uid
      user.email = firebaseUser.email
    }
    store.commit('user/setUser', user)

    // Redirect the user when a change occurs
    const baseURL = '/#/'
    if (store.getters['user/isConnected']) {
      redirect(baseURL + 'ToDo')
    } else {
      redirect(baseURL)
    }
  })
}
