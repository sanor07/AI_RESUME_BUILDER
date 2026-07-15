import { useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';

const MAX_BYTES = 2 * 1024 * 1024;

export default function PhotoUpload() {
  const { state, actions } = useResume();
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_BYTES) {
      alert('Photo exceeds 2MB limit. Please choose a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => actions.setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="photo-upload" onClick={() => inputRef.current?.click()}>
      <div className="photo-upload__preview">
        {state.photoDataUrl ? (
          <img src={state.photoDataUrl} alt="Profile" />
        ) : (
          <i className="ph ph-camera" />
        )}
      </div>
      <div className="photo-upload__text">
        <p>Upload Photo</p>
        <span>JPG, PNG · Max 2MB</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}
