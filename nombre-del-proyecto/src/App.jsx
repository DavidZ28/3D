import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const App = () => {
  const mountRef = useRef(null);
  const [showScene, setShowScene] = useState(false);

  const handleStartClick = () => {
    setShowScene(true);
  };

  useEffect(() => {
    if (!showScene) return; // Solo inicializar la escena si showScene es true

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    const circleGeometry = new THREE.CircleGeometry(0.5, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.x = -2;
    scene.add(circle);

    // Crear un cilindro largo y estático
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.x = 2;
    scene.add(cylinder);

    let direction = 0.02;
    const bounceLimit = 2;
    let hue = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      hue += 0.01;
      if (hue > 1) hue = 0;
      cubeMaterial.color.setHSL(hue, 1, 0.5);

      // Movimiento de rebote del círculo
      circle.position.y += direction;
      if (circle.position.y > bounceLimit || circle.position.y < -bounceLimit) {
        direction *= -1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [showScene]);

  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center' }}>Balin con React y Three.js</h1>
      {!showScene ? (
        <div style={{ textAlign: 'center', marginTop: '20vh' }}>
          <button 
            onClick={handleStartClick} 
            style={{
              padding: '10px 20px',
              fontSize: '1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <div ref={mountRef} style={{ width: "100%", height: "90vh" }}></div>
      )}
    </div>
  );
};

export default App;
