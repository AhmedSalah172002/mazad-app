// ----------------------------------------------------------------------

import photoURL from '../images/assets/images/avatars/avatar_25.jpg'

let auth;
if (localStorage.getItem("user") !== null) {
  auth = JSON.parse(localStorage.getItem("user"));
}
export const account = {
  displayName: auth?.name,
  email: auth?.email,
  photoURL: auth?.image || photoURL,
  role: auth?.role === 'user' ? 'مستخدم': auth?.role === 'merchant' ? "تاجر" : "أدمن"
};
