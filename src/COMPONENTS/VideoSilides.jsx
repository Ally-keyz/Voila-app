import React, { useState, useEffect, useRef } from 'react';
import vid1 from '../assets/videos/vid001.mp4';
import vid2 from '../assets/videos/vid002.mp4';
import vid3 from '../assets/videos/vid003.mp4';

const slides = [
  { id: 1, src: vid1, text: 'Easily book appointments with top doctors in your area.', btn: "Book now" },
  { id: 2, src: vid2, text: 'Your health matters—schedule a consultation anytime, anywhere.', btn: "Get a consulter" },
  { id: 3, src: vid3, text: 'Trusted healthcare at your fingertips, hassle-free booking.', btn: "Book now" },
];

const illnesses = ['General Checkup', 'Cold/Flu', 'Allergy', 'Chronic Condition', 'Other'];
const hospitals = ['City General Hospital', 'Metropolitan Clinic', 'Central Health Center', 'Northside Medical'];

const VideoSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    illness: '',
    hospital: '',
    date: ''
  });
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const isFormOpen = useRef(false);

  useEffect(() => {
    isFormOpen.current = showForm;
  }, [showForm]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isFormOpen.current) return;
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Details:', formData);
    setShowForm(false);
    setFormData({ name: '', illness: '', hospital: '', date: '' });
  };

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div key={slide.id} className="absolute top-0 left-0 w-full h-full z-20">
          <video
            src={slide.src}
            autoPlay
            muted
            loop
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {index === activeIndex && (
            <div className="absolute bottom-44 left-10 md:left-20 text-white z-40 max-w-2xl">
              <h2 className="text-4xl md:text-4xl font-bold mb-4 leading-tight transition-all duration-500 transform translate-y-0 opacity-100">
                {slide.text}
              </h2>
              <div 
                className={`w-[200px] p-3 text-[22px] font-semibold text-center mt-5 h-[70px] 
                rounded-l-md rounded-b-md cursor-pointer transition-all
                ${activeIndex === index ? 'hover:bg-blue-400 bg-blue-300' : 'hover:bg-orange-400 bg-orange-300'}`}
                onClick={() => activeIndex === 2 && setShowForm(true)}
              >
                {slide.btn}
              </div>
              <div className="w-20 h-1 bg-white mt-6 transition-all duration-500"></div>
            </div>
          )}
        </div>
      ))}

      {/* Consultation Form Modal */}
      {showForm && activeIndex === 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleFormSubmit}
            className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-fade-in"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Book Consultation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Illness</label>
                <select
                  required
                  value={formData.illness}
                  onChange={(e) => setFormData({...formData, illness: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Illness</option>
                  {illnesses.map((illness) => (
                    <option key={illness} value={illness}>{illness}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Hospital</label>
                <select
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital} value={hospital}>{hospital}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none
        bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Vertical dot navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-40">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className={`relative w-8 h-8 rounded-full focus:outline-none transition-all duration-300
              ${index === activeIndex ? 'border-2 border-orange-300' : 'bg-white/50 hover:bg-white/70'}`}
          >
            {index === activeIndex && (
              <span className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute top-0 left-0 h-1 bg-white/30 z-40 w-full">
        <div 
          className="h-full bg-blue-300 rounded-full transition-all duration-700" 
          style={{ width: `${(activeIndex + 1) * (100 / slides.length)}%` }}
        />
      </div>
    </div>
  );
};

export default VideoSlider;