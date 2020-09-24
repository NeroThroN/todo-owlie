import * as firebase from 'firebase/app'
import Credentials from './../config/credentials'

export default ({ store }) => {
  firebase.initializeApp(Credentials.firebaseConfig)
  firebase.auth().onAuthStateChanged((user) => {
    store.commit('user/setUserEmail', user !== null ? user.email : null)
  })
}
