import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();
      const handleSignIn = () => {
        // Hardcoded email and password
        const hardcodedEmail = 'test@example.com';
        const hardcodedPassword = 'password123';
    
        if (email === hardcodedEmail && password === hardcodedPassword) {
         // alert('Signed in successfully!');
         navigate("/system-config");
        //   setTimeout(() => {
        //   //  setShowThankYou(true);
        //     navigate("/dashboard");
        //   }, 1000);  // Redirects after 2 seconds
          return <p style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",margin:"auto",textAlign:"center"}}>Thanks for joining! Redirecting...</p>;
      
        } else {
          alert('Invalid email or password');
        }
      };

    return (<>
        <section>
            <div className="container-fluid">
                <div className="container_sign">
                    <div
                        className="row justify-content-center align-items-center"
                        style={{ height: "100vh" }}
                    >
                        <div className="col-sm-12 col-md-6 col-lg-6 form-continer">
                            <div className="start-form">
                                <form onSubmit={handleSignIn}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            required

                                        />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Prospect" className="form-label">Prospect</label>
                                        <input 
                                            type="text"
                                            id="Prospect"
                                            name="Prospect"
                                            className="form-control"
                                            placeholder="Prospect"
                                            required
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                           
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary mb-3"
                                            >Confirm identity</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 right_section">
                            <div className="form-right-img">
                                <img src="https://storage.googleapis.com/yoodli-public/onboarding-assets/presentation1.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}


