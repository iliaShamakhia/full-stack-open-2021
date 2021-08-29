const Blog = require('../models/blog')
const User = require('../models/user')


const dummy = (blogs) => {
    return 1;
  }

const totalLikes =(blogs) => {
    return blogs.reduce((sum,blog)=>sum + blog.likes,0);
}

const favoriteBlog =(blogs) => {
    if(blogs.length===0)return 0;
    if(blogs.length===1)return blogs[0];
    let max = 0;
    let famous = [];
    for(blog of blogs){
        if(blog.likes > max){
            max = blog.likes;
            famous[0] = blog;
        }
    }
    return famous[0];
}
const mostBlogs=(blogs)=>{
  if(blogs.length===0)return 0;
  if(blogs.length===1)return {author:blogs[0].author,blogs:1};
  let tmp={};
  let max=0;
  let name='';
  for (blog of blogs){
    if(blog.author in tmp){
      tmp[blog.author]++;
    }else{
      tmp[blog.author]=1;
    }
  }
  for(author in tmp){
    if(tmp[author]>max){
      max=tmp[author];
      name=author;
    }
  }
  return {author:name,blogs:max};
}
const mostLikes=(blogs)=>{
  if(blogs.length===0)return 0;
  if(blogs.length===1)return {author:blogs[0].author,likes:blogs[0].likes};
  let tmp={};
  let max=0;
  let name='';
  for (blog of blogs){
    if(blog.author in tmp){
      tmp[blog.author]+=blog.likes;
    }else{
      tmp[blog.author]=blog.likes;
    }
  }
  for(author in tmp){
    if(tmp[author]>max){
      max=tmp[author];
      name=author;
    }
  }
  return {author:name,likes:max};
}

let initialBlogs=[  
  {    
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },  
  {    
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    blogsInDb,
    usersInDb
  }