import * as firebase from 'firebase/app'
import Credentials from './../config/credentials'

export default ({ store }) => {
  console.log('FIREBASE BOOT')
  firebase.initializeApp(Credentials.firebaseConfig)
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    var user = { uid: null, email: null }
    if (firebaseUser) {
      user.uid = firebaseUser.uid
      user.email = firebaseUser.email
    }
    store.commit('user/setUser', user)
  })
}
