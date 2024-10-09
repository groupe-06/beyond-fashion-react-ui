import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    photo: null,
    genre: 'MALE',
    role: 'CLIENT',
    bio: '',
    address: ''
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      setPhotoPreview(URL.createObjectURL(files[0]));
      setFormData(prev => ({ ...prev, photo: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gérer la soumission du formulaire
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className={`relative max-w-8xl w-1/2 bg-white rounded-xl shadow-lg flex transition-all duration-700 ease-in-out ${isLogin ? 'h-[600px]' : 'h-[700px]'}`}>
        {/* Section d'authentification qui change de position */}
        <div className={`absolute transition-all duration-700 ease-in-out ${isLogin ? 'left-0' : 'left-1/2'} top-0 h-full ${isLogin ? 'w-[30%]' : 'w-[50%]'} z-10 flex flex-col justify-center items-center pl-8`}>
          {isLogin ? (
            // Formulaire de connexion
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Se Connecter</h2>
              </div>
              <div className="space-y-4 w-full">
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={credentials.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
                <p className="text-sm text-center">
                  Pas de compte ?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-purple-600 hover:text-purple-500"
                  >
                    S'inscrire
                  </button>
                </p>
              </div>
            </div>
          ) : (
            // Formulaire d'inscription
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
              </div>
              <form className="w-full grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Entrer votre prénom"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Entrer votre nom"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Entrer votre email"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Entrer votre numéro de téléphone"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Entrer votre mot de passe"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer votre mot de passe"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2 flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className="hidden"
                      id="photo"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full hover:border-purple-500 transition-colors duration-300"
                    >
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <Camera className="w-12 h-12 text-gray-400" />
                      )}
                    </label>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">Upload your photo</p>
                    <p className="text-xs text-gray-400">JPG, PNG or GIF (MAX. 800x400px)</p>
                  </div>
                </div>
                <div>
                  <select
                    name="genre"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.genre}
                    onChange={handleInputChange}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <select
                    name="role"
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="CLIENT">Client</option>
                    <option value="TAILOR">Tailleur</option>
                    <option value="VENDOR">Vendeur</option>
                  </select>
                </div>
                {formData.role !== 'CLIENT' && (
                  <>
                    <div className="col-span-2">
                      <textarea
                        name="bio"
                        placeholder="Décrivez-vous"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="3"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        name="address"
                        type="text"
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        placeholder="Entrer votre adresse"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                  </button>
                  <p className="text-sm text-center mt-4">
                    Déjà inscrit ?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-purple-600 hover:text-purple-500"
                    >
                      Se connecter
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Section avec l'image qui s'anime */}
        <div 
          className={`absolute transition-all duration-700 ease-in-out ${
            isLogin ? 'right-0' : 'right-0 translate-x-[-100%]'
          } top-0 w-[75%] h-full rounded-r-xl overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900`}
        >
          <img src="ciseau.png" alt="ciseau" className="ml-[-320px] mt-2 h-[108%]" />
          <img src="logoo.png" alt="Logo" className="w-60 ml-12 absolute top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;