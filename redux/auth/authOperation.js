import { app } from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const auth = getAuth(app);

export const authSingUp =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      console.log("auth.currentUser", auth.currentUser);

      const { displayName, uid } = auth.currentUser;

      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSingIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const AuthStateChanged = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
      dispatch(authSlice.actions.authStateChanged({ stateChange: true }));
    }
  });
};

export const authSingOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOutUser());
  } catch (error) {
    console.log("error.message", error.message);
  }
};
