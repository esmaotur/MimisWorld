# Mimi's World 🐾

Mimi's World, evcil hayvan sahiplerinin sevimli dostlarının anılarını paylaşabileceği, etkinliklerini planlayabileceği ve diğer hayvan severlerle etkileşime geçebileceği modern bir sosyal medya ve günlük uygulamasıdır.

## 🌟 Özellikler

- **Kullanıcı Doğrulama:** E-posta ve şifre ile güvenli kayıt olma ve giriş yapma.
- **Evcil Hayvan Profili:** Evcil dostunuzun ismini, türünü (kedi, köpek vb.) ve profil fotoğrafını özelleştirme.
- **Sosyal Akış (Feed):** Kendi anılarınızı fotoğraf ve yazılarla paylaşabilme.
- **Etkileşim:** Diğer kullanıcıların gönderilerini beğenme ve yorum yapma.
- **Tema Seçenekleri:** Göz yormayan, dinamik Gündüz ve Gece modu geçişi.
- **Modern ve Responsive Arayüz:** TailwindCSS ile hazırlanmış şık, her ekrana uyumlu (mobil/masaüstü) tasarım.

## 🛠 Kullanılan Teknolojiler

### Frontend
- **React 19 & TypeScript:** Güçlü, tip güvenli modern kullanıcı arayüzü geliştirme.
- **TailwindCSS:** Hızlı ve esnek stillendirme, özel renk paleti.
- **React Router DOM:** Sayfalar arası akıcı yönlendirme.
- **Zustand:** Gece/Gündüz modu gibi global durum (state) yönetimi.
- **Axios:** Backend ile API iletişimi.

### Backend
- **Node.js & Express.js:** Hızlı, hafif ve esnek sunucu yapısı.
- **Multer:** Kullanıcıların fotoğraf yükleme işlemlerini (gönderiler ve profil fotoğrafları için) yönetme.
- **JSON Veritabanı:** `fs-extra` paketi yardımıyla verileri (`users.json`, `posts.json`) sunucuda saklama.
- **CORS & Body-Parser:** İstemci ve sunucu arasındaki iletişim güvenliği ve veri ayıklama.

## 🚀 Kurulum ve Çalıştırma

Projeyi bilgisayarınızda yerel olarak çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Ön Koşullar
- Node.js yüklü olmalıdır.

### 1. Frontend Kurulumu
Projenin ana dizininde bir terminal açın ve gerekli paketleri yükleyerek projeyi başlatın:

```bash
npm install
npm start
```
Frontend, `http://localhost:3000` adresinde ayağa kalkacaktır.

### 2. Backend Kurulumu
Backend klasörüne giderek ayrı bir terminalde sunucuyu başlatmanız gerekmektedir:

```bash
cd backend
npm install
node server.js
```
Backend sunucusu, `http://127.0.0.1:5000` adresinde çalışacaktır. Yüklenen görseller `uploads` klasöründe barındırılır.

## 📸 Ekran Görüntüleri
Proje arayüzünden örnek ekran görüntülerini ve gif'leri buraya ekleyerek güncelleyebilirsiniz.

---
Mimi'nin dünyasına hoş geldiniz! Evcil hayvanlarınızla olan anılarınızı ölümsüzleştirmeye hazırsınız. 😺🐶
