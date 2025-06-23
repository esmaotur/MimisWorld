const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

const USERS_FILE = path.join(__dirname, "users.json");
const POSTS_FILE = path.join(__dirname, "posts.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
fs.ensureDirSync(path.join(__dirname, "uploads"));

// Multer ayarları - dosya upload için
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Dosya okuma
const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const readPosts = async () => {
  try {
    const data = await fs.readFile(POSTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Dosya yazma
const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

const writePosts = async (posts) => {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
};

// Yeni kullanıcı kaydı
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Eksik bilgi" });
  }
  const users = await readUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });
  }
  const newUser = {
    username,
    email,
    password,
    profile: { type: "Kedi", name: username, image: "/resim/profil.jpg", about: "" },
  };
  users.push(newUser);
  await writeUsers(users);
  res.status(201).json({ user: { username, email, profile: newUser.profile } });
});

// Kullanıcı girişi
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Eksik bilgi" });
  }
  const users = await readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "E-posta veya şifre hatalı" });
  }
  res.json({ user: { username: user.username, email: user.email, profile: user.profile } });
});

// Profil resmi upload endpoint
app.post("/api/upload-profile-image", upload.single("profileImage"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Dosya yüklenmedi" });
  const imageUrl = `http://127.0.0.1:${PORT}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Post resmi upload ve gönderi oluşturma
app.post("/api/posts", upload.single("postImage"), async (req, res) => {
  const { text } = req.body;
  let imageUrl = "/resim/etkinlik.jpg";
  if (req.file) {
    imageUrl = `http://127.0.0.1:${PORT}/uploads/${req.file.filename}`;
  }
  if (!text && !req.file) {
    return res.status(400).json({ message: "Gönderi içeriği eksik" });
  }
  const posts = await readPosts();
  const newPost = {
    id: uuidv4(),
    text: text || "",
    image: imageUrl,
  };
  posts.push(newPost);
  await writePosts(posts);
  res.json({ post: newPost });
});

// Gönderileri listele
app.get("/api/posts", async (req, res) => {
  const posts = await readPosts();
  res.json({ posts });
});

// Gönderi silme
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await readPosts();
  const updatedPosts = posts.filter((post) => post.id !== id);
  if (posts.length === updatedPosts.length) {
    return res.status(404).json({ message: "Gönderi bulunamadı" });
  }
  await writePosts(updatedPosts);
  res.json({ message: "Gönderi silindi" });
});

// Profil güncelleme
app.put("/api/profile", async (req, res) => {
  const { email, profile } = req.body;
  if (!email || !profile || !profile.type || !profile.name) {
    return res.status(400).json({ message: "Eksik bilgi" });
  }
  const users = await readUsers();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

  users[userIndex].profile = {
    type: profile.type,
    name: profile.name,
    image: profile.image || users[userIndex].profile.image,
    about: profile.about || "",
  };
  await writeUsers(users);
  res.json({ profile: users[userIndex].profile });
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await readUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Kullanıcılar alınırken hata oluştu" });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://127.0.0.1:${PORT}`);
});