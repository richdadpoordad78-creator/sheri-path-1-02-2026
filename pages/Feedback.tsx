
import React, { useState } from 'react';
import { Star, Send, Heart, Loader2 } from 'lucide-react';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="pt-48 pb-24 container mx-auto px-6 text-center max-w-xl">
        <div className="bg-white p-12 shadow-2xl rounded-sm border border-zinc-100 space-y-6">
          <Heart className="w-16 h-16 text-zinc-900 mx-auto fill-zinc-900" />
          <h2 className="text-4xl font-serif font-bold">Thank You!</h2>
          <p className="text-zinc-500">
            We truly appreciate your feedback. It helps us maintain the exceptional standards we strive for at Sheri Salon.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-sm font-bold uppercase tracking-widest border-b border-zinc-900 pb-1"
          >
            Submit Another?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 space-y-16">
      <section className="container mx-auto px-6 text-center space-y-6">
        <h4 className="text-zinc-400 font-medium tracking-[0.3em] uppercase">Your Voice Matters</h4>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-zinc-900">Share Your Experience</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
          How was your visit? Your thoughts help us continuously refine the Sheri Salon experience.
        </p>
      </section>

      <section className="container mx-auto px-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white border border-zinc-100 p-8 md:p-12 shadow-xl space-y-10">
          <div className="space-y-4 text-center">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">Overall Satisfaction</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-all"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      (hover || rating) >= star ? 'text-zinc-900 fill-zinc-900' : 'text-zinc-200'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tell us more</label>
            <textarea 
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="What did you love? How can we improve?"
              className="w-full border border-zinc-100 bg-zinc-50 p-6 focus:outline-none focus:border-zinc-900 transition-all text-zinc-900 placeholder:text-zinc-300 resize-none"
            />
          </div>

          <button 
            disabled={loading || rating === 0}
            type="submit" 
            className="w-full bg-zinc-900 text-white py-5 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all rounded-sm flex items-center justify-center space-x-3 disabled:opacity-30"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            <span>{loading ? 'Submitting...' : 'Submit Feedback'}</span>
          </button>
        </form>
      </section>
    </div>
  );
};

export default Feedback;
