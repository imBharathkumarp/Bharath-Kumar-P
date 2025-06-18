import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF, Environment } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const CustomCursor = () => {
  const cursorRef = useRef(null)

  // useEffect(() => {
  //   const moveCursor = (e) => {
  //     if (cursorRef.current) {
  //       cursorRef.current.style.left = `${e.clientX}px`
  //       cursorRef.current.style.top = `${e.clientY}px`
  //     }
  //   }
  //   window.addEventListener('mousemove', moveCursor)
  //   return () => {
  //     window.removeEventListener('mousemove', moveCursor)
  //   }
  // }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        width: '20px',
        height: '20px',
        border: '2px solid #4A90E2',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
      }}
    />
  )
}

const HumanModel = () => {
  const { scene } = useGLTF('/earth-cartoon.glb')
  useFrame((state) => {
    scene.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
  })
  return <primitive object={scene} scale={2} position={[0, 0, 0]} />
}


const Scene = () => {
  return (
    <Canvas style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <HumanModel />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

const SocialIcons = () => {
  return (
    <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '15px' }}>
      <a href="https://github.com/imBharathkumarp" target="_blank" rel="noopener noreferrer">
        <FaGithub size={24} color="#4A90E2" />
      </a>
      <a href="https://www.linkedin.com/in/imbharathkumarp/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={24} color="#4A90E2" />
      </a>
      <a href="https://x.com/imBharathkumarp" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={24} color="#4A90E2" />
      </a>
      <a href="mailto:bharath2003kumarp@gmail.com">
        <FaEnvelope size={24} color="#4A90E2" />
      </a>
    </div>
  )
}

const NavBar = ({ activeSection, setActiveSection }) => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      background: 'linear-gradient(135deg, #4A90E2, #8E44AD)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Bharath Kumar P</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['About', 'Projects','Experience', 'Education', 'ExtraCarricular', 'Achievements' ].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === section ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
              fontWeight: activeSection === section ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
            onMouseEnter={(e) => {
              if (activeSection !== section) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== section) {
                e.target.style.backgroundColor = 'transparent'
              }
            }}
          >
            {section}
          </button>
        ))}
      </div>
    </nav>
  )
}

const About = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px', fontSize :'40px' }}>About Me</h2>
    <p style={{ lineHeight: '1.6', fontSize: '20px' }}>
    I’m Bharath Kumar P, a passionate Software Developer skilled in Python, JavaScript, and web development technologies like HTML, CSS, React, and Tailwind. 
    I enjoy solving real-world problems through coding and believe in writing clean, efficient, and scalable code. Along with my technical skills, I have a strong interest in AI, automation, and continuous learning to stay updated with the latest trends in technology. 
    I am also an active Open-Source Contributor — I participated and contributed to Social Summer of Code (SSoC) 2025, where I worked on meaningful projects. One of my proud contributions was to Engineering in Kannada, a popular Kannada tech YouTube channel, helping to make technical education more accessible. 
    I’m now looking for opportunities to apply my skills, learn from experienced teams, and grow as a professional developer.
    </p>
    <p style={{ lineHeight: '1.6', fontSize: '20px' }}>
      
    </p>
  </div>
)

const ProjectCard = ({ title, description, link, imageSrc, skills }) => (
  <div
    style={{
      border: '1px solid #E0E0E0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '20px',
      transition: 'all 0.3s',
      cursor: 'pointer',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}
    onClick={() => window.open(link, '_blank')}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}
  >
    <img src={imageSrc} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#4A90E2', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: '#333', lineHeight: '1.5', marginBottom: '10px' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {skills.map((skill, index) => (
          <span key={index} style={{
            backgroundColor: '#E0E0E0',
            color: '#333',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
)

const Projects = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px', fontSize :'40px' }}>Projects</h2>
    <ProjectCard
      title="🛒 Fatafat – E-Commerce Web App"
      description="Fatafat is a modern and responsive e-commerce web application developed using the MERN stack.
It features a dynamic front-end, secure backend APIs, and a clean UI for seamless online shopping."
      link="https://github.com/imBharathkumarp/frontend_ecommerce"
      imageSrc="/Fatafat.png?height=200&width=400"
      skills={['Node.js', 'Web Development', 'Full-Stack Development', 'React.js']}
    />
    <ProjectCard
      title="📄 Resume ATS Checker"
      description="Resume ATS Checker is a simple, browser-based tool that allows job seekers to upload their resumes and compare them against a job description to see how well they match — just like an Applicant Tracking System (ATS) would."
      link="https://github.com/imBharathkumarp/Resume-ATS-Checker"
      imageSrc="/ResumeATSChecker.png?height=200&width=400"
      skills={['HTML5', 'CSS', 'JavaScript', 'pdf.js', '.mammoth.js']}
    />
    <ProjectCard
      title="🧠 Thyroid Disease Prediction System"
      description=" Developed a Thyroid Disease Prediction System using advanced Machine Learning algorithm to diagnose thyroid 
disorders with high accuracy. Won 2nd Prize in Project Exhibition organized by ShriTeck Innovations. "
      link="https://github.com/imBharathkumarp/Thyroid-Prediction-System"
      imageSrc="/TPS.jpg?height=200&width=400"
      skills={['Python', 'Machine Learning', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'GitHub Actions']}
    />
    <ProjectCard
      title="🩺 Chronic Kidney Disease Prediction"
      description=" Built a CKD prediction model using Random Forest and XGBoost with high accuracy."
      link="https://github.com/imBharathkumarp/Chronic-disease-project"
      imageSrc="/CKD.png?height=200&width=400"
      skills={['Python', 'Scikit-learn', 'Streamlit', 'GitHub Actions']}
    />
    <ProjectCard
      title="PitchRefine"
      description="AI-powered web app called PitchRefine. It allows users (especially students, founders, or entrepreneurs) to input a short description of their startup or business idea and automatically generates a structured, investor-ready pitch deck."
      link="https://pitchrefine.netlify.app/"
      imageSrc="/Pitch.png?height=200&width=400"
      skills={['CSS', 'HTML5', 'JavaScript']}
    />
  </div>
)

const Education = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px', fontSize :'40px'}}>Education</h2>
    <div style={{ marginBottom: '20px' , fontSize: '25px'}}>
      <h3 style={{ color: '#333' }}>SHRIDEVI INSTITUTE OF ENGINEERING AND TECHNOLOGY – Tumakuru</h3>
      <p style={{ color: '#666', }}>Bachelor of Engineering, Artificial Intelligence and Data Science</p>
      <p style={{ color: '#666' }}>Graduated: 2025</p>
    </div>
    <div style={{ marginBottom: '20px' , fontSize: '25px'}}>
      <h3 style={{ color: '#333' }}>VIJAYA COMPOSITE PRE-UNIVERSITY COLLEGE – Bengaluru</h3>
      <p style={{ color: '#666',  }}>Karnataka Pre-University Board (PUC)</p>
      <p style={{ color: '#666' }}>Graduated: 2021</p>
    </div>
    <div style={{ marginBottom: '20px' , fontSize: '25px'}} >
      <h3 style={{ color: '#333' }}>SRI SARASWATHI VIDYANIKETHANA HIGH SCHOOL – Bengaluru</h3>
      <p style={{ color: '#666',  }}>Secondary School Leaving Certificate (SSLC)</p>
      <p style={{ color: '#666' }}>Graduated: 2019</p>
    </div>
  </div>
)

const Experience = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px' ,fontSize :'40px'}}>Experience</h2>
    <div style={{ marginBottom: '20px' , fontSize: '20px'}}>
      <h3 style={{ color: '#4A90E2' }}>Pentagon Space – FULL STACK DEVELOPER INTERN</h3>
      <p style={{ color: '#666' }}>Oct 2023 - Jan 2024</p>
      <ul style={{ color: '#333', lineHeight: '1.6' }}>
        <li>- Developed web applications using the MERN stack.</li>
        <li>- Assisted in debugging and optimizing code for better performance.</li>
        <li>- Took ownership of key features in the e-commerce project, ensuring timely delivery and smooth user experience while 
actively collaborating with teammates to solve challenges.</li>
        <li></li>
      </ul>
    </div>
    <div style={{ marginBottom: '20px' , fontSize: '20px'}}>
      <h3 style={{ color: '#4A90E2' }}>Unified Mentor – DATA ANALYST INTERN</h3>
      <p style={{ color: '#666' }}>Jan 2025 - Mar 2025</p>
      <ul style={{ color: '#333', lineHeight: '1.6' }}>
        <li>-  Contributed to end-to-end data analytics workflows — from data cleaning and transformation to final reporting.</li>
        <li>-  Analyzed real-time datasets using Excel, Python, and Jupyter Notebook to derive actionable insights.</li>
        <li>-  Strengthened analytical thinking and enhanced the ability to communicate findings effectively to both technical and 
non-technical audiences.</li>
        <li></li>
      </ul>
    </div>
  </div>
)

const ExtraCarricular = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px' ,fontSize :'40px'}}>Extra Curricular</h2>
    <div style={{ marginBottom: '20px' , fontSize: '20px'}}>
      <h3 style={{ color: '#4A90E2' }}>SHRIDEVI INSTITUTE OF ENGINEERING AND TECHNOLOGY</h3>
      <p style={{ color: '#666' }}>Agastya International Foundation</p>
      <ul style={{ color: '#333', lineHeight: '1.6' }}>
        <li>1. Volunteered at Agastya International Foundation as a teacher, delivering interactive lessons to students from 
underserved backgrounds.</li>
        <li>2. Completed 12 hours of teaching as part of the Agastya Volunteering Program.</li>
        </ul>
    </div>
  <div style={{ marginBottom: '20px' , fontSize: '20px'}}>
      <h3 style={{ color: '#4A90E2' }}>SHRIDEVI INSTITUTE OF ENGINEERING AND TECHNOLOGY</h3>
      <p style={{ color: '#666' }}>TNS India Foundation</p>
      <ul style={{ color: '#333', lineHeight: '1.6' }}>
        <li>1. Completed an intensive career-readiness program focused on technical and soft skills development in collaboration 
with Accenture.</li>
        <li>2. Gained hands-on experience in Java, Spring Boot, HTML/CSS, and MySQL through structured coursework and 
assessments.</li>
        </ul>
    </div>
    </div>
)

const Achievements = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px' ,fontSize :'40px'}}>Achievements</h2>
    <div style={{ marginBottom: '20px' , fontSize: '20px'}}>
      <h3 style={{ color: '#4A90E2' }}></h3>
      <p style={{ color: '#666' }}></p>
      <ul style={{ color: '#333', lineHeight: '1.6' }}>
        <li>1. Won 2nd Prize in Project Exhibition organized by ShriTeck Innovations.</li>
        <li>2.  Successfully completed a 19-hour online course on Python and machine learning conducted by the Indian 
Institute of Remote Sensing (IIRS), ISRO.</li>
        <li>3.   Actively contributed to open-source projects, including educational repositories for the Enginnering in Kannada 
YouTube channel and other Html, Javascript and Python-based initiatives.</li>
        <li>4.  Participating in the Social Summer of Code (SSoC) 2025, contributing to various open-source projects.</li>
        <li>5.  Completed certified courses from Accenture, IBM, Infosys, Deloitte, and Udemy in Data Analytics, Python, Machine 
Learning, and Prompt Engineering, enhancing domain knowledge through hands-on simulations and workshops.</li>
        </ul>
    </div>
    </div>
)

const ContentSection = ({ activeSection }) => {
  const components = {
    About: About,
    Projects: Projects,
    Education: Education,
    Experience: Experience,
    ExtraCarricular: ExtraCarricular,
    Achievements: Achievements,
  }
  const ActiveComponent = components[activeSection]
  return <ActiveComponent />
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('About')

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      color: '#333',
      background: 'linear-gradient(135deg, #F0F4F8, #E0E8F0)',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      <CustomCursor />
      <Scene />
      <SocialIcons />
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div style={{
        position: 'absolute',
        right: '0',
        top: '0',
        width: '50%',
        height: '100%',
        padding: '100px 40px 20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}>
        <ContentSection activeSection={activeSection} />
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #F0F4F8;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #4A90E2, #8E44AD);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #3A7BC8, #7E349D);
        }
      `}</style>
    </div>
  )
}