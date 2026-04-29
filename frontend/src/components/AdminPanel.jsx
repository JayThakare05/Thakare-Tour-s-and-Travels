import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, RefreshCw, CheckCircle, XCircle, ChevronDown, Car } from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = filter ? `${API}/bookings?status=${filter}` : `${API}/bookings`;
      const res = await axios.get(url);
      setBookings(res.data.bookings || []);
    } catch { setBookings([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/bookings/${id}/status`, { status });
    fetchBookings();
  };
  const deleteBooking = async (id) => {
    if (window.confirm('Delete this booking?')) {
      await axios.delete(`${API}/bookings/${id}`);
      fetchBookings();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-saffron-500">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={fetchBookings} className="flex items-center gap-2 bg-orange-100 text-saffron-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-200 transition-all">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No bookings found.</div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-800 text-lg">{b.name}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                    <span>📞 <a href={`tel:${b.phone}`} className="text-saffron-500 font-semibold">{b.phone}</a></span>
                    <span>📍 {b.pickupCity} → {b.destinationCity}</span>
                    <span>📅 {new Date(b.date).toLocaleDateString('en-IN')}</span>
                    <span>🚘 {b.tripType} | {b.carName || 'Any'}</span>
                    <span>👥 {b.passengers} pax</span>
                  </div>
                  {b.notes && <p className="text-xs text-gray-400 mt-1">Note: {b.notes}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={b.status}
                    onChange={e => updateStatus(b._id, e.target.value)}
                    className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-saffron-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hello%20${b.name}%2C%20your%20booking%20from%20${b.pickupCity}%20to%20${b.destinationCity}%20is%20confirmed.`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold hover:bg-green-200 transition-all">
                    WA
                  </a>
                  <button onClick={() => deleteBooking(b._id)} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-lg font-semibold hover:bg-red-200 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-300 mt-2">{new Date(b.createdAt).toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CarsTab() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', nameMarathi: '', image: '', pricePerKm: '', fuelType: '', capacity: 7, available: true });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const fetchCars = async () => {
    setLoading(true);
    try { const res = await axios.get(`${API}/cars`); setCars(res.data); }
    catch { setCars([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchCars(); }, []);

  // Handle image file selection → upload immediately to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post(`${API}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm(p => ({ ...p, image: res.data.url }));
    } catch {
      setUploadError('Image upload failed. Please try again.');
      setImagePreview('');
      setForm(p => ({ ...p, image: '' }));
    } finally {
      setUploading(false);
    }
  };

  const toggleAvail = async (id) => {
    await axios.patch(`${API}/cars/${id}/availability`);
    fetchCars();
  };
  const deleteCar = async (id) => {
    if (window.confirm('Delete this car?')) { await axios.delete(`${API}/cars/${id}`); fetchCars(); }
  };
  const addCar = async (e) => {
    e.preventDefault();
    if (!form.image) { setUploadError('Please upload a car image.'); return; }
    await axios.post(`${API}/cars`, { ...form, pricePerKm: Number(form.pricePerKm), capacity: Number(form.capacity) });
    setShowAdd(false);
    setForm({ name: '', nameMarathi: '', image: '', pricePerKm: '', fuelType: '', capacity: 7, available: true });
    setImageFile(null);
    setImagePreview('');
    setUploadError('');
    fetchCars();
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={fetchCars} className="flex items-center gap-2 bg-orange-100 text-saffron-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-200 transition-all">
          <RefreshCw size={14} /> Refresh
        </button>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-saffron-400 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:scale-105 transition-all shadow-md">
          <Plus size={16} /> Add Car
        </button>
      </div>

      {/* Add Car Form */}
      {showAdd && (
        <form onSubmit={addCar} className="bg-orange-50 rounded-2xl p-6 mb-6 border border-orange-100 animate-fade-in">
          <h3 className="font-bold text-gray-800 mb-4">Add New Car</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'name', label: 'Car Name (English)', placeholder: 'e.g. Toyota Innova' },
              { name: 'nameMarathi', label: 'Car Name (Marathi)', placeholder: 'e.g. टोयोटा इनोवा' },
              { name: 'pricePerKm', label: 'Price per KM (₹)', placeholder: '18', type: 'number' },
              { name: 'fuelType', label: 'Fuel Type', placeholder: 'Diesel / CNG' },
              { name: 'capacity', label: 'Capacity (seats)', placeholder: '7', type: 'number' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <input type={f.type || 'text'} placeholder={f.placeholder} value={form[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} required={['name', 'pricePerKm', 'fuelType'].includes(f.name)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-saffron-500" />
              </div>
            ))}

            {/* Image Upload */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Car Image</label>
              <div className="flex items-start gap-4">
                {/* File picker */}
                <label className={`flex flex-col items-center justify-center w-40 h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${uploading ? 'border-orange-300 bg-orange-50' : 'border-gray-300 bg-white hover:border-saffron-500 hover:bg-orange-50'}`}>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploading} />
                  {uploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs text-orange-500 font-semibold">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl mb-1">📷</span>
                      <span className="text-xs text-gray-500 text-center px-2">Click to upload image</span>
                      <span className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP</span>
                    </>
                  )}
                </label>

                {/* Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-40 h-28 object-cover rounded-xl border-2 border-orange-200" />
                    {form.image && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Upload status */}
              {form.image && !uploading && (
                <p className="text-xs text-green-600 font-semibold mt-2">✅ Image uploaded to Cloudinary</p>
              )}
              {uploadError && (
                <p className="text-xs text-red-500 font-semibold mt-2">⚠️ {uploadError}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={uploading} className="bg-gradient-to-r from-saffron-500 to-saffron-400 text-white px-6 py-2 rounded-xl font-semibold text-sm hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed">Save Car</button>
            <button type="button" onClick={() => { setShowAdd(false); setImagePreview(''); setUploadError(''); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold text-sm hover:bg-gray-300 transition-all">Cancel</button>
          </div>
        </form>
      )}


      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading cars...</div>
      ) : (
        <div className="space-y-4">
          {cars.map(car => (
            <div key={car._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={car.image} alt={car.name} className="w-24 h-16 object-contain bg-orange-50 rounded-xl p-1" onError={e => { e.target.src = `https://via.placeholder.com/96x64/FF6A00/ffffff?text=${car.name[0]}`; }} />
                <div>
                  <h3 className="font-bold text-gray-800">{car.name}</h3>
                  <p className="text-gray-500 text-sm">{car.fuelType} | {car.capacity} Seater | <strong className="text-saffron-500">₹{car.pricePerKm}/km</strong></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleAvail(car._id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${car.available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}>
                  {car.available ? <><CheckCircle size={14} /> Available</> : <><XCircle size={14} /> Unavailable</>}
                </button>
                <button onClick={() => deleteCar(car._id)} className="bg-red-100 text-red-600 p-2 rounded-xl hover:bg-red-200 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Admin Login Gate ─────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/admin/login`, { username, password });
      if (res.data.success) {
        sessionStorage.setItem('adminAuth', 'true');
        onSuccess();
      }
    } catch {
      setError('Invalid username or password. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {/* Decorative glow */}
      <div className="absolute w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl pointer-events-none" style={{ top: '15%', left: '30%' }} />

      <div
        className={`relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}
        style={shake ? { animation: 'shake 0.4s ease' } : {}}
      >
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Thakare Tours and Travels</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">Username</label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter admin username"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-lg"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? '⏳ Verifying...' : '🔓 Login to Admin'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">Authorised access only</p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}

// ── Main AdminPanel with login gate ──────────────────────────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('adminAuth') === 'true'
  );
  const [tab, setTab] = useState('bookings');
  const [bookingCount, setBookingCount] = useState(0);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    if (authenticated) {
      axios.get(`${API}/bookings?status=pending`).then(r => setBookingCount(r.data.total || 0)).catch(() => {});
    }
  }, [authenticated]);

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">⚙️ Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Thakare Tours and Travels — Management Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              ← Back to Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              🔒 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Bookings</p>
              <p className="text-3xl font-bold text-yellow-600">{bookingCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Car className="text-saffron-500" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Fleet Management</p>
              <p className="text-lg font-bold text-gray-800">3 Cars Active</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {['bookings', 'cars'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-orange-50 text-saffron-600 border-b-2 border-saffron-500' : 'text-gray-500 hover:text-gray-700'}`}>
                {t === 'bookings' ? '📋 Bookings' : '🚘 Cars'}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === 'bookings' ? <BookingsTab /> : <CarsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

