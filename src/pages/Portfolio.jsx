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
      <a href="https://github.com/aryansanganti" target="_blank" rel="noopener noreferrer">
        <FaGithub size={24} color="#4A90E2" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={24} color="#4A90E2" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={24} color="#4A90E2" />
      </a>
      <a href="mailto:aryan@example.com">
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
      <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Aryan Sanganti</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['About', 'Projects','Experience', 'Education' ].map((section) => (
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
    <p style={{ lineHeight: '1.6', fontSize: '25px' }}>
      As a passionate CS student specializing in MERN (MongoDB, Express.js, React, Node.js) stack and 3D Web development
      using Three.js and React Three Fiber, I bring a unique blend of skills to the table. My problem-solving mindset,
      adaptability in dynamic environments, and strong analytical skills make me an asset to any development team.
    </p>
    <p style={{ lineHeight: '1.6', fontSize: '25px' }}>
      I'm constantly pushing the boundaries of web development, eager to take on new challenges and create cutting-edge
      web experiences. With a keen interest in staying updated on the latest industry trends, I'm actively seeking
      opportunities to contribute to innovative projects and make a positive impact in the field of computer science.
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
      title="CareMate - Elderly Care App"
      description="A comprehensive solution developed during the Codessience Hackathon to enhance elderly care. Features include appointment management, health monitoring, and automated reminders."
      link="https://elderly-app.vercel.app/"
      imageSrc="/Elderly.png?height=200&width=400"
      skills={['Node.js', 'Web Development', 'Full-Stack Development', 'Firebase', 'REST APIs', 'React.js']}
    />
    <ProjectCard
      title="Job Board Website"
      description="Developed a job board frontend using React, featuring advanced search filters, user profiles, and application tracking."
      link="https://job-board-three-nu.vercel.app/"
      imageSrc="/job.png?height=200&width=400"
      skills={['React.js', 'HTML5', 'CSS', 'JavaScript', 'MongoDB', 'Node.js', 'Express.js']}
    />
    <ProjectCard
      title="News Head"
      description="A news headline project that aggregates real-time news from various sources, employing sentiment analysis to categorize headlines."
      link="https://github.com/aryansanganti/News-Headlines"
      imageSrc="/News.png?height=200&width=400"
      skills={['REST APIs', 'React.js', 'HTML5', 'CSS', 'JavaScript']}
    />
    <ProjectCard
      title="Restaurant Website"
      description="Developed for the Abyantrika GEN AI Challenge. Won 1st Prize."
      link="https://github.com/aryansanganti/GEN-AI-"
      imageSrc="/restaurent.png?height=200&width=400"
      skills={['HTML5', 'CSS']}
    />
    <ProjectCard
      title="Try Windows-11"
      description="A web-based simulation of the Windows 11 interface."
      link="https://github.com/aryansanganti/Windows-11"
      imageSrc="/windows.png?height=200&width=400"
      skills={['CSS', 'HTML5', 'JavaScript']}
    />
    <ProjectCard
      title="Spotify Clone"
      description="A web application developed using HTML and CSS, designed to replicate the popular music streaming platform, Spotify."
      link="https://github.com/AryanSanganti/Spotify-Clone-Project"
      imageSrc="/Spotify.png?height=200&width=400"
      skills={[ 'HTML5', 'CSS', 'Bootstrap']}
    />
    <ProjectCard
      title="Amazon Clone"
      description="An e-commerce web application inspired by Amazon, developed using HTML and CSS."
      link="https://github.com/AryanSanganti/Amazon-Clone-Project"
      imageSrc="/amazon.png?height=200&width=400"
      skills={[  'HTML5', 'CSS', 'Bootstrap']}
    />
  </div>
)

const Education = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px', fontSize :'40px'}}>Education</h2>
    <div style={{ marginBottom: '20px' , fontSize: '25px'}}>
      <h3 style={{ color: '#333' }}>KJ SOMAIYA COLLEGE OF ENGINEERING – MUMBAI</h3>
      <p style={{ color: '#666', }}>Bachelor of Technology, Computers and Communication Engineering</p>
      <p style={{ color: '#666' }}>2023 - Present</p>
    </div>
    <div style={{ marginBottom: '20px' , fontSize: '25px'}}>
      <h3 style={{ color: '#333' }}>RAMNARIAN RUIA – MUMBAI</h3>
      <p style={{ color: '#666',  }}>Higher Secondary Certificate (HSC)</p>
      <p style={{ color: '#666' }}>Graduated: 2023</p>
    </div>
    <div style={{ marginBottom: '20px' , fontSize: '25px'}} >
      <h3 style={{ color: '#333' }}>SACRED HEART HIGH SCHOOL – MUMBAI</h3>
      <p style={{ color: '#666',  }}>Secondary School Certificate (SSC)</p>
      <p style={{ color: '#666' }}>Graduated: 2021</p>
    </div>
  </div>
)

const Experience = () => (
  <div style={{ animation: 'fadeIn 0.5s' }}>
    <h2 style={{ color: '#4A90E2', borderBottom: '2px solid #4A90E2', paddingBottom: '10px' ,fontSize :'40px'}}>Experience</h2>
    <div style={{ marginBottom: '20px' , fontSize: '20px'}}>
      <h3 style={{ color: '#4A90E2' }}>MESHCRAFT INTERN – JUNIOR WEB DEVELOPER INTERN</h3>
      <p style={{ color: '#666' }}>June 2023 - August 2023</p>
      <ul style={{ color: '#333', lineHeight: '1.6' }}>
        <li>Utilized the MERN Stack to develop full-stack applications, seamlessly integrating backend services with responsive, dynamic front-end components.</li>
        <li>Created captivating interactive 3D visuals using Three.js and React Three Fiber, significantly enhancing user engagement and overall experience.</li>
        <li>Focused on performance optimization techniques, refining code and managing assets to ensure fast load times and smooth interactions, resulting in improved user satisfaction and retention.</li>
        <li>Collaborated with senior developers to implement best practices in code organization and version control using Git.</li>
        <li>Participated in daily stand-ups and sprint planning sessions, gaining valuable experience in Agile development methodologies.</li>
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