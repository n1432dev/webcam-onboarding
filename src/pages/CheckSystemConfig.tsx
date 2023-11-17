import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckSystemConfig: React.FC = () => {
    const [hasWebcam, setHasWebcam] = useState<boolean | null>(null);
    const [hasMic, setHasMic] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        // Add a timeout to simulate async operation and show spinner
        const timer = setTimeout(() => {
            if (navigator && navigator.mediaDevices) {
                navigator.mediaDevices.enumerateDevices().then(devices => {
                    const webcam = devices.some(device => device.kind === "videoinput");
                    const mic = devices.some(device => device.kind === "audioinput");

                    setHasWebcam(webcam);
                    setHasMic(mic);
                    setLoading(false); // Hide spinner after devices are checked

                    if (webcam) {
                        navigate('/dashboard'); // Navigate to dashboard if webcam is available
                    }
                });
            }
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }, [navigate]); // Include navigate in the dependency array

    return (
        <div className='system' >
            {loading ? (<>
                <h1 className='text-center pt-5'>Checking Webcam & Microphone </h1>
                <div className="spinner" ></div> 
                </> ) : (
                <>
                    <p className='text-heading'>Webcam: {hasWebcam ? "Available" : "Not Available"}</p>
                    <p className='text-heading'>Microphone: {hasMic ? "Available" : "Not Available"}</p>
                </>
            )}
        </div>
    );
}
