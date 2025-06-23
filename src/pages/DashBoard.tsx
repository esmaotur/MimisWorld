import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePet } from '../Global/pet';
import '../styles/styles.css';
import mimi from '../resim/mimi.jpg';

const Dashboard: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = usePet();
  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState<number[]>([0, 42, 24]);
  const [comments, setComments] = useState<string[][]>([[], [], []]);
  const [newComments, setNewComments] = useState<string[]>(["", "", ""]);
  const [profile, setProfile] = useState({ type: 'Kedi', name: 'Mimi' });
  const [profileImage, setProfileImage] = useState<string>(mimi);
  const [posts, setPosts] = useState<{ image: string; text: string }[]>([
    { image: mimi, text: 'İlk gönderim! 😺' },
  ]);
  const [newPostText, setNewPostText] = useState<string>('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  const handleLike = (index: number) => {
    const updated = [...likes];
    updated[index]++;
    setLikes(updated);
  };

  const handleCommentChange = (index: number, value: string) => {
    const updated = [...newComments];
    updated[index] = value;
    setNewComments(updated);
  };

  const handleAddComment = (index: number) => {
    if (!newComments[index]) return;
    const updated = [...comments];
    updated[index].push(newComments[index]);
    setComments(updated);
    const updatedNewComments = [...newComments];
    updatedNewComments[index] = '';
    setNewComments(updatedNewComments);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPostImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSharePost = () => {
    if (!newPostText && !newPostImage) return;
    setPosts(prev => [
      { image: newPostImage || '/resim/etkinlik.jpg', text: newPostText || 'Yeni gönderi!' },
      ...prev,
    ]);
    setLikes(prev => [0, ...prev]);
    setComments(prev => [[], ...prev]);
    setNewComments(prev => ["", ...prev]);
    setNewPostText('');
    setNewPostImage(null);
  };

  return (
    <div className={`min-h-screen p-8 flex flex-col font-roboto transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-gray-900'
    }`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-10 flex justify-between items-center px-6 py-4 rounded-2xl shadow-lg mb-8 ${
          isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-blue-300 text-white'
        }`}
      >
        <h1 className="text-4xl font-bold italic tracking-tight font-pacifico">Mimi’s World</h1>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              isDarkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? 'Gündüz Modu' : 'Gece Modu'}
          </button>
          <Link
            to="/"
            className="text-lg font-semibold hover:underline"
          >
            Çıkış Yap
          </Link>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex flex-col lg:flex-row gap-10 flex-grow">
        {/* Feed Area */}
        <section className="flex-grow space-y-8">
          {/* Post Creation Box */}
          <div className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 hover:shadow-2xl' : 'bg-white hover:shadow-2xl'
          }`}>
            <h3 className="text-xl font-semibold mb-4">Bir şeyler paylaş...</h3>
            <textarea
              rows={4}
              placeholder="Bugün neler oldu Mimi?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className={`w-full p-4 rounded-xl border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
              } resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            ></textarea>
            {newPostImage && (
              <div className="mb-4">
                <img
                  src={newPostImage}
                  alt="Önizleme"
                  className="w-full max-h-[200px] object-cover rounded-xl"
                />
                <button
                  onClick={() => setNewPostImage(null)}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Resmi Kaldır
                </button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <label className={`cursor-pointer inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                <span className="mr-2">📷</span> Resim Seç
                <input type="file" className="hidden" onChange={handlePostImageChange} accept="image/*" />
              </label>
              <button 
                onClick={handleSharePost}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
              >
                Paylaş
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 hover:shadow-2xl' : 'bg-white hover:shadow-2xl'
                }`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={profileImage}
                    alt="Profil"
                    className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-lg">{profile.name}</p>
                  </div>
                </div>
                <p className="mb-4">{post.text}</p>
                <img
                  src={post.image}
                  alt="Gönderi görseli"
                  className="w-full max-h-[400px] object-cover rounded-xl mb-4"
                />
                <div className="flex justify-between items-center mb-4 text-sm">
                  <button 
                    onClick={() => handleLike(index)} 
                    className="flex items-center space-x-1 hover:text-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <span className="text-xl">❤️</span>
                    <span>{likes[index]} Beğeni</span>
                  </button>
                  <span className="flex items-center space-x-1">
                    <span className="text-xl">💬</span>
                    <span>{comments[index].length} Yorum</span>
                  </span>
                </div>
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComments[index]}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                      placeholder="Yorum yap..."
                      className={`flex-grow p-3 rounded-xl border text-sm ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    />
                    <button
                      onClick={() => handleAddComment(index)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
                    >
                      Gönder
                    </button>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {comments[index].map((comment, cIdx) => (
                      <li key={cIdx} className="flex items-start space-x-2 border-t border-gray-700 pt-2">
                        <span className="text-blue-500">💬</span>
                        <span>{comment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Profile Section - Fixed Rectangle, No Scroll */}
        <aside className={`w-full lg:w-96 h-[500px] p-6 rounded-2xl shadow-xl transition-all duration-300 sticky top-24 flex flex-col ${
          isDarkMode ? 'bg-gray-800 hover:shadow-2xl' : 'bg-white hover:shadow-2xl'
        }`}>
          <div className="flex flex-col items-center">
            <img
              src={profileImage}
              alt="Profil Resmi"
              className="w-24 h-24 rounded-full mb-3 object-cover border-4 border-blue-500 shadow-md"
            />
            <h3 className="text-xl font-semibold mb-1">{profile.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{profile.type} | 2 Yaşında</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-2 bg-pink-400 text-white rounded-xl font-medium text-sm hover:bg-pink-500 active:bg-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              {isEditing ? 'İptal' : 'Profili Düzenle'}
            </button>
          </div>

          {isEditing && (
            <div className="mt-4 space-y-3 flex-grow">
              <div>
                <label className="block mb-1 font-medium text-xs">Evcil Dostunuzun Türü</label>
                <input 
                  type="text" 
                  value={profile.type}
                  onChange={(e) => handleProfileChange('type', e.target.value)}
                  placeholder="Örn: Kedi, Köpek" 
                  className={`w-full p-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`} 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-xs">Evcil Dostunuzun İsmi</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  placeholder="Örn: Mimi" 
                  className={`w-full p-2 rounded-xl border text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`} 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-xs">Profil Resmi</label>
                <label className={`cursor-pointer inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  <span className="mr-1">📷</span> Resim Seç
                  <input type="file" className="hidden" onChange={handleProfileImageChange} accept="image/*" />
                </label>
              </div>
              <button
                onClick={handleProfileUpdate}
                className="w-full py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
              >
                Güncelle
              </button>
            </div>
          )}

          {!isEditing && (
            <div className="mt-4 flex flex-col gap-2">
              <Link 
                to="/takvim" 
                className="w-full py-2 text-center rounded-xl bg-teal-400 text-white font-semibold text-sm hover:bg-teal-500 active:bg-teal-600 transition-all duration-200 transform hover:scale-105"
              >
                Takvim
              </Link>
              <Link 
                to="/galeri" 
                className="w-full py-2 text-center rounded-xl bg-rose-400 text-white font-semibold text-sm hover:bg-rose-500 active:bg-rose-600 transition-all duration-200 transform hover:scale-105"
              >
                Galeri
              </Link>
            </div>
          )}
        </aside>
      </main>
      <footer
        className={`px-6 py-4 rounded-lg shadow-lg mt-8 ${
          isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-blue-300 text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <p className="text-lg">© {new Date().getFullYear()} Mimi’s World. Tüm hakları saklıdır.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Hakkımızda</a>
            <a href="#" className="hover:underline">İletişim</a>
            <a href="#" className="hover:underline">Gizlilik Politikası</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;