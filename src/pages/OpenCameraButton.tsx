import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export const OpenCameraButton: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    video: true,
  });

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setIsCameraOpen(true);
      setIsRecording(false); // Reset recording state
      startRecording();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
    setIsCameraOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenCamera} className='camera-btns-contrl' disabled={isCameraOpen}>
        Open Camera
      </button>

      {isCameraOpen && (
        <div>
          <p>Camera is open. Do whatever you want with it.</p>

          {!isRecording && (
            <button onClick={handleStartRecording} className='camera-btns-contrl'>
              Start Recording
            </button>
          )}

          {isRecording && (
            <button onClick={handleStopRecording} className='camera-btns-contrl'>
              Stop Recording
            </button>
          )}

          {mediaBlobUrl && (
            <div>
              <p>Recording completed!</p>
              <video src={mediaBlobUrl} controls autoPlay />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
