import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { SIGNIN_USER, SIGNOUT_USER, SIGNUP_USER } from "constants/ActionTypes";
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
} from "../../appRedux/actions/Auth";
import { client } from "../../NextApp";
import { gql } from "@apollo/client";

const createUserWithEmailPasswordRequest = async (email, password) =>
  client
    .mutate({
      mutation: gql`
        mutation CreateUser($email: String!, $password: String!) {
          createUser(email: $email, password: $password) {
            token
            user {
              id
              email
            }
          }
        }
      `,
      variables: {
        email,
        password,
      },
    })
    .then((result) => result)
    .catch((error) => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
  client
    .mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user {
              id
              email
            }
            token
            error
          }
        }
      `,
      variables: {
        email,
        password,
      },
    })
    .then((result) => {
      console.log("result");
      return result;
    })
    .catch((error) => {
      console.log("error");
      return error;
    });

const signOutRequest = async () => {};
// await auth
//   .signOut()
//   .then((authUser) => authUser)
//   .catch((error) => error);

function* createUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const { data } = yield call(
      createUserWithEmailPasswordRequest,
      email,
      password
    );

    console.log("data", data);

    if (!data.createUser) {
      console.error("Error!");
      throw new Error("Could not create user!");
      // Email is taken
      // yield put(showAuthMessage(signUpUser.message));
    } else {
      const userId = data.createUser.user.id;
      localStorage.setItem("user_id", userId);
      localStorage.setItem("user_email", email);
      yield put(userSignUpSuccess(userId));
    }
  } catch (error) {
    console.log("error", error);

    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const { data } = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    console.log("data", data);
    if (!data.login) {
      throw new Error("Could not login!");
      // yield put(showAuthMessage(signInUser.message));
    } else {
      const userId = data.login.user.id;
      localStorage.setItem("user_id", userId);
      localStorage.setItem("user_email", email);
      yield put(userSignInSuccess(userId));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem("user_id");
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser), fork(createUserAccount), fork(signOutUser)]);
}
