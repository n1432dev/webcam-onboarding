import {  Routes, Route } from 'react-router-dom';
import React from "react";
import { Home } from "./pages/Home";
import { EmailForm } from "./pages/EmailForm";
import { Dashboard } from "./pages/Dashboard";
import { RecordPractice } from "./pages/RecordPractice";
import { OldRecordPractice } from "./pages/OldRecordPractice";
import { CheckSystemConfig } from "./pages/CheckSystemConfig";
import { OpenCameraButton } from "./pages/OpenCameraButton";


export const PageRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<EmailForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recordpractice" element={<RecordPractice/>} />
      <Route path="/old-recordpractice" element={<OldRecordPractice/>} />
      <Route path="/system-config" element={<CheckSystemConfig/>} />
      <Route path="/openCameraButton" element={<OpenCameraButton/>} />
      
    </Routes>
  );
};





