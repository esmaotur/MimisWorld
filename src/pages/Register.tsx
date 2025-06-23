import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePet } from '../Global/pet';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/styles.css';

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { isDarkMode, toggleDarkMode, registerUser, user } = usePet();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Başarı mesajı için yeni state
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password);
      setError(null);
      setSuccess('Kayıt başarılı! Lütfen giriş yapın.'); // Başarı mesajı
      navigate('/login'); // Giriş yap sayfasına yönlendir
    } catch (err: any) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu');
      setSuccess(null);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 flex flex-col font-roboto ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-200 text-gray-900'
      }`}
    >
      <header
        className={`sticky top-0 z-10 flex justify-between items-center px-6 py-4 rounded-lg shadow-lg mb-8 max-w-full ${
          isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-blue-300 text-white'
        }`}
      >
        <h1 className="text-4xl font-bold italic tracking-tight font-pacifico">Mimi’s World</h1>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-lg font-semibold hover:underline">
            Anasayfa
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

      <main className="flex-grow flex items-center justify-center">
        <div
          className={`p-8 rounded-xl shadow-md max-w-md w-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
          }`}
        >
          <h2
            className={`text-3xl font-bold text-center mb-6 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}
          >
            Kayıt Ol
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                {...register('username', { required: 'Kullanıcı adı zorunlu', minLength: { value: 3, message: 'Kullanıcı adı en az 3 karakter olmalı' } })}
                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600'
                }`}
                placeholder="Kullanıcı adınızı girin"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                E-posta
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'E-posta zorunlu', pattern: { value: /^\S+@\S+$/i, message: 'Geçersiz e-posta' } })}
                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600'
                }`}
                placeholder="E-posta adresinizi girin"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                {...register('password', { required: 'Şifre zorunlu', minLength: { value: 6, message: 'Şifre en az 6 karakter olmalı' } })}
                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600'
                }`}
                placeholder="Şifrenizi girin"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Şifreyi Onayla
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Şifre onayı zorunlu',
                  validate: (value) => value === password || 'Şifreler eşleşmiyor',
                })}
                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-600'
                }`}
                placeholder="Şifrenizi tekrar girin"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>} {/* Başarı mesajı */}
            <button
              onClick={handleSubmit(onSubmit)}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Kayıt Ol
            </button>
            <p
              className={`text-center text-sm ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
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

export default Register;