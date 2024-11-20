
export const authService = {
    signup,
    login,
}

async function login(email, password) {
    const user = await firebaseAuth.getUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');
    return user; // Firebase validates password during authentication
}

async function signup({ email, password, fullname }) {
    return firebaseAuth.createUser({
        email,
        password,
        displayName: fullname,
    });
}
