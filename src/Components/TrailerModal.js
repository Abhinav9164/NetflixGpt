import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { API_OPTIONS } from '../utils/constants'

const TrailerModal = ({ movie, onClose }) => {
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | none

  const title = movie.title || movie.name || movie.original_title;
  const kind = movie.title ? 'movie' : 'tv'; // TV results have `name`, not `title`

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${kind}/${movie.id}/videos?language=en-US`, API_OPTIONS);
        const json = await res.json();
        const results = (json.results || []).filter((v) => v.site === 'YouTube');
        const pick = results.find((v) => v.type === 'Trailer') || results[0];
        if (cancelled) return;
        if (pick) { setVideo(pick); setStatus('ready'); } else setStatus('none');
      } catch (e) {
        if (!cancelled) setStatus('none');
      }
    };
    load();
    return () => { cancelled = true; };
  }, [movie.id, kind]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // stop page scroll behind the modal
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-4xl bg-neutral-950 rounded-xl overflow-hidden shadow-2xl border border-neutral-800'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label='Close trailer'
          className='absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-black/70 hover:bg-red-600 text-white text-xl leading-none transition-colors'
        >
          ✕
        </button>

        <div className='aspect-video bg-black flex items-center justify-center'>
          {status === 'loading' && (
            <span className='h-10 w-10 rounded-full border-4 border-white/20 border-t-red-600 animate-spin' />
          )}
          {status === 'ready' && (
            <iframe
              className='w-full h-full'
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`}
              title={`${title} trailer`}
              allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
              allowFullScreen
            />
          )}
          {status === 'none' && (
            <p className='text-gray-400'>No trailer available for this title.</p>
          )}
        </div>

        <div className='p-5'>
          <h2 className='text-2xl font-bold text-white'>{title}</h2>
          {movie.overview && (
            <p className='mt-2 text-sm text-gray-300 line-clamp-3'>{movie.overview}</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TrailerModal;
