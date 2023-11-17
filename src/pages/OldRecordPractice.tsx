import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import videoImg from '../assets/images/defult-Video.png';

export const OldRecordPractice: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    video: true,
  });

  let videoRef: HTMLVideoElement | null = null;

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef) {
        videoRef.srcObject = stream;
      }
      setIsCameraOpen(true);
      setIsPreviewing(false); // Reset preview state
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStartRecording = () => {
    if (isCameraOpen) {
      startRecording();
      setIsRecording(true);
      setIsPreviewing(false); // Reset preview state
    } else {
      console.warn('Cannot start recording. Camera is not open.');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsPreviewing(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);

    // Close the camera stream
    const mediaStream = videoRef?.srcObject as MediaStream;
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    setIsPreviewing(false); // Reset preview state
  };

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = mediaBlobUrl!;
    anchor.download = 'recorded-video.webm';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='container'>
          <div className='row my-2'>
            <div className='col-md-6 order-mobail'>
              <div className='col-md-12 text-center '>
                {!isCameraOpen && (
                  <button onClick={handleOpenCamera} className='camera-btns-contrl'>
                    Open Camera
                  </button>
                )}

                {isCameraOpen && (
                  <>
                    <button onClick={handleStartRecording} className='camera-btns-contrl'>
                      Start Recording
                    </button>
                    <button onClick={handleCloseCamera} className='camera-btns-contrl'>
                      Close Camera
                    </button>
                  </>
                )}

                {isRecording && (
                  <>
                    <button className='camera-btns-contrl' onClick={handleStopRecording}>
                      Stop Recording
                    </button>
                    <button className='camera-btns-contrl' onClick={handleDownload}>
                      Download
                    </button>
                  </>
                )}

                {mediaBlobUrl && (
                  <button className='camera-btns-contrl' onClick={() => setIsPreviewing(!isPreviewing)}>
                    {isPreviewing ? 'Hide Preview' : 'Show Preview'}
                  </button>
                )}
              </div>
            </div>
            <div className='col-md-6'>
              <div className='col-md-12 camera-width-con'>
                {!isPreviewing && (
                  <img src={videoImg} alt='' style={{ display: isCameraOpen ? 'none' : 'block' }} />
                )}
                {isPreviewing && <video src={mediaBlobUrl} controls autoPlay />}
                {!isPreviewing && (
                  <video
                    ref={(ref) => (videoRef = ref)}
                    style={{ display: isCameraOpen ? 'block' : 'none' }}
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
