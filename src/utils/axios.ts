import axios from "axios";

const user = axios.create({
    baseURL: process.env.API + "/users"
})

const auth = axios.create({
    baseURL: process.env.API + "/auth/login"
})

const post = axios.create({
    baseURL: process.env.API + "/posts"
})

const comment = axios.create({
    baseURL: process.env.API + "/comments"
})

export { post, user, comment, auth }