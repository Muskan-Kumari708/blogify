import 'dotenv/config'
import express from 'express'
import path from "path"
import userRoute from "./routes/user.js"
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import { checkForAuthenticationCookie } from "./middlewares/authentication.js"
import blogRoute from './routes/blog.js'
import Blog from './models/blog.js'

const app = express()
const PORT = process.env.PORT || 8000

mongoose
.connect(process.env.MONGO_URL).then(()=> console.log("mongodb connected!")
)

app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve("./public")))


app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render("home", {
        user : req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, ()=>console.log("Server Started !"))