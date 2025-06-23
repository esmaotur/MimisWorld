import React from 'react';
import { Link } from 'react-router-dom';
import { usePet } from '../Global/pet';
import  '../styles/styles.css';

import walkcat from '../resim/cat.png';
import etkinlik from '../resim/etkinlik.jpg';
import profil from '../resim/profil.jpg';
import fotograf from '../resim/fotograf.jpg';
import takvim from '../resim/takvim.jpg';

const Home: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = usePet();

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 flex flex-col font-roboto ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-200 text-gray-900'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 flex justify-between items-center px-6 py-4 rounded-lg shadow-lg mb-8 max-w-full ${
          isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-blue-300 text-white'
        }`}
      >
        <h1 className="text-4xl font-bold italic tracking-tight font-pacifico">Mimi’s World</h1>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-lg font-semibold hover:underline">
            Giriş Yap
          </Link>
          <Link to="/register" className="text-lg font-semibold hover:underline">
            Kayıt Ol
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-full transition-colors font-semibold ${
              isDarkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? 'Gündüz Modu' : 'Gece Modu'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Giriş Tanıtımı */}
        <div
          className={`text-center mb-12 p-8 rounded-xl shadow-md relative overflow-hidden ${
            isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
          } max-w-5xl mx-auto`}
        >
          <h2
            className={`text-5xl font-bold italic font-pacifico ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}
          >
            Mimi’s World'e Hoş Geldiniz!
          </h2>
          <p
            className={`text-xl font-normal max-w-4xl mx-auto text-shadow-sm mt-4 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Evcil hayvanlarınızın anılarını paylaşın ve etkinliklerle bağlantı kurun!
          </p>
          <div className="relative h-16 w-full mt-4">
            <img
              src={walkcat}
              alt="Yürüyen Kedi"
              className="w-20 h-20 absolute animate-walk-top"
              style={{ top: '0.5rem', left: '0' }}
            />
          </div>
        </div>

        {/* Yapılabilecek İşlemler */}
        <div className="mb-12">
          <h2
            className={`text-5xl font-bold italic mb-8 text-center ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}
          >
            Mimi’s World'de Ne Yapabilirsiniz:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Kart 1 */}
            <div
              className={`p-6 rounded-xl shadow-md flex flex-col items-center text-center min-h-[480px] ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img src={takvim} alt="Takvim" className="w-48 h-48 rounded mb-4 object-cover" />
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Takvime Etkinlik Ekleyin
              </h3>
              <p className={`text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Veteriner randevuları, mama saatleri ve özel günleri planlayın.
              </p>
            </div>

            {/* Kart 2 */}
            <div
              className={`p-6 rounded-xl shadow-md flex flex-col items-center text-center min-h-[480px] ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img src={etkinlik} alt="Etkinlik" className="w-48 h-48 rounded mb-4 object-cover" />
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Yeni Etkinlik Oluşturun
              </h3>
              <p className={`text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Doğum günü veya oyun günü gibi etkinlikler ekleyin.
              </p>
            </div>

            {/* Kart 3 */}
            <div
              className={`p-6 rounded-xl shadow-md flex flex-col items-center text-center min-h-[480px] ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img src={fotograf} alt="Fotoğraf" className="w-48 h-48 rounded mb-4 object-cover" />
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Fotoğraf Günlüğünüzü Paylaşın
              </h3>
              <p className={`text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Sevimli anılarınızı yükleyin ve diğer kullanıcılarla paylaşın.
              </p>
            </div>

            {/* Kart 4 */}
            <div
              className={`p-6 rounded-xl shadow-md flex flex-col items-center text-center min-h-[480px] ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img src={profil} alt="Profil" className="w-48 h-48 rounded mb-4 object-cover" />
              <h3
                className={`text-2xl font-semibold mb-2 ${
                  isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Profilinizi Düzenleyin
              </h3>
              <p className={`text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Profil oluşturun ve diğer kullanıcılarla etkileşime geçin.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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

export default Home;