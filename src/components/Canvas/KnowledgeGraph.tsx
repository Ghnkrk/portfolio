import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "../../data/portfolioData";
import type { Project } from "../../data/portfolioData";

interface KnowledgeGraphProps {
  onNodeClick: (project: Project) => void;
  selectedProject: Project | null;
}

// Generate a high-resolution circular glowing canvas texture on the fly (non-pixelated points)
const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.35)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
};

// Background floating neural network particle cloud (specks of light in dark nightsky)
const NeuralBackground: React.FC<{ positions: Float32Array }> = ({ positions }) => {
  const [texture] = useState(createCircleTexture);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#0891b2"
        size={0.15}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// SYNAPSE SPARKS: Crackling, fading electric discharges between background specks of light
const NeuralSparks: React.FC<{ positions: Float32Array; count: number }> = ({ positions, count }) => {
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  const pulsesGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  const [texture] = useState(createCircleTexture);
  
  // Track active background sparks in a ref to avoid React state rendering overhead inside useFrame
  const activeSparks = useRef<{ i: number; j: number; age: number; maxAge: number }[]>([]);

  // Check distance of points from all project node coordinates to avoid overlap
  const isTooCloseToProjects = (x: number, y: number, z: number) => {
    for (const proj of projects) {
      const px = proj.position[0];
      const py = proj.position[1];
      const pz = proj.position[2];
      const dist = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py) + (z - pz) * (z - pz));
      if (dist < 1.7) return true;
    }
    return false;
  };

  // Select random background particles that are close but not overlapping project nodes
  const findValidSparkIndices = (positions: Float32Array, count: number): { i: number; j: number } => {
    let i = Math.floor(Math.random() * count);
    let attempts = 0;
    
    while (attempts < 30) {
      const ix = positions[i * 3];
      const iy = positions[i * 3 + 1];
      const iz = positions[i * 3 + 2];
      if (!isTooCloseToProjects(ix, iy, iz)) {
        break;
      }
      i = Math.floor(Math.random() * count);
      attempts++;
    }

    let j = Math.floor(Math.random() * count);
    attempts = 0;
    while (attempts < 40) {
      const jx = positions[j * 3];
      const jy = positions[j * 3 + 1];
      const jz = positions[j * 3 + 2];
      
      const dx = positions[i * 3] - jx;
      const dy = positions[i * 3 + 1] - jy;
      const dz = positions[i * 3 + 2] - jz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Target neighboring stars between 0.6 and 3.2 units away, avoiding project nodes
      if (dist > 0.6 && dist < 3.2 && !isTooCloseToProjects(jx, jy, jz)) {
        break;
      }
      j = Math.floor(Math.random() * count);
      attempts++;
    }
    return { i, j };
  };

  useEffect(() => {
    // Initialize 6 active sparks (reduced frequency)
    const numSparks = 6;
    const initialSparks = [];
    for (let s = 0; s < numSparks; s++) {
      const { i, j } = findValidSparkIndices(positions, count);
      initialSparks.push({
        i,
        j,
        age: Math.random() * 60, // scatter initial frame offsets
        maxAge: 70 + Math.random() * 60 // persist longer: 70-130 frames (1.1 - 2.2 seconds)
      });
    }
    activeSparks.current = initialSparks;
  }, [positions, count]);

  // Buffer coordinates for 6 sparks: 6 lines * 2 points * 3 coordinates = 36 values
  const [linePosArray] = useState(() => new Float32Array(36));
  // Vertex color array (RGB) to fade individual lines to black: 36 floats
  const [lineColorArray] = useState(() => new Float32Array(36));
  // Buffer coordinates for 6 pulse specks: 6 points * 3 coordinates = 18 values
  const [pulsesPosArray] = useState(() => new Float32Array(18));

  useFrame(() => {
    const sparks = activeSparks.current;
    
    // Update ages and replace expired ones
    for (let s = 0; s < sparks.length; s++) {
      const spark = sparks[s];
      spark.age += 1;
      
      if (spark.age >= spark.maxAge) {
        const { i, j } = findValidSparkIndices(positions, count);
        sparks[s] = {
          i,
          j,
          age: 0,
          maxAge: 90 + Math.random() * 60 // 90 to 150 frames (1.5 - 2.5 seconds)
        };
      }
    }

    // Update lines geometry and vertex colors (fade out)
    const positionsAttr = lineGeometryRef.current?.getAttribute("position") as THREE.BufferAttribute;
    const colorsAttr = lineGeometryRef.current?.getAttribute("color") as THREE.BufferAttribute;
    
    if (positionsAttr && colorsAttr) {
      sparks.forEach((spark, idx) => {
        const i = spark.i;
        const j = spark.j;
        
        positionsAttr.setXYZ(idx * 2, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        positionsAttr.setXYZ(idx * 2 + 1, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        
        // Fades line from cyan (#06b6d4 -> RGB: 0.02, 0.71, 0.83) to black
        const lifeRatio = Math.max(0, 1 - spark.age / spark.maxAge);
        colorsAttr.setXYZ(idx * 2, 0.02 * lifeRatio, 0.71 * lifeRatio, 0.83 * lifeRatio);
        colorsAttr.setXYZ(idx * 2 + 1, 0.02 * lifeRatio, 0.71 * lifeRatio, 0.83 * lifeRatio);
      });
      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;
    }

    // Update tiny spark charges traveling from star i to star j (dissolves after 50 frames, leaving line track)
    const pulsesAttr = pulsesGeometryRef.current?.getAttribute("position") as THREE.BufferAttribute;
    if (pulsesAttr) {
      sparks.forEach((spark, idx) => {
        const i = spark.i;
        const j = spark.j;

        const travelDuration = 50; // Charge completes transit in 50 frames (0.8s)
        
        if (spark.age <= travelDuration) {
          const t = spark.age / travelDuration;
          const fromX = positions[i * 3];
          const fromY = positions[i * 3 + 1];
          const fromZ = positions[i * 3 + 2];

          const toX = positions[j * 3];
          const toY = positions[j * 3 + 1];
          const toZ = positions[j * 3 + 2];

          pulsesAttr.setXYZ(
            idx,
            fromX + (toX - fromX) * t,
            fromY + (toY - fromY) * t,
            fromZ + (toZ - fromZ) * t
          );
        } else {
          // Hide speck offscreen once transit is complete, letting line track persist
          pulsesAttr.setXYZ(idx, 9999, 9999, 9999);
        }
      });
      pulsesAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Spark lightning line segments */}
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePosArray, 3]}
            count={linePosArray.length / 3}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColorArray, 3]}
            count={lineColorArray.length / 3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          linewidth={1.0}
          transparent={true}
          opacity={0.06} /* Fainter background lines */
          vertexColors={true}
          depthWrite={false}
        />
      </lineSegments>

      {/* Sparks traveling charges (rendered as points for soft circular blurness matching stars) */}
      <points>
        <bufferGeometry ref={pulsesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsesPosArray, 3]}
            count={pulsesPosArray.length / 3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          color="#06b6d4"
          size={0.08}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.18} /* Dimmer speck brightness */
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Parent wrapper to synchronize rotation of stars, spark lines, and charges together
const RotatingSpaceBackground: React.FC<{ positions: Float32Array; count: number }> = ({ positions, count }) => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollRatio = scrollY.current / (document.documentElement.scrollHeight - window.innerHeight || 1);
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.008 + scrollRatio * 0.35;
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.004 + scrollRatio * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <NeuralBackground positions={positions} />
      <NeuralSparks positions={positions} count={count} />
    </group>
  );
};

// Animated active pulse nodes traveling along project links
const PulseTransmitters: React.FC = () => {
  const pulsesGroupRef = useRef<THREE.Group>(null);

  const links = useMemo(() => {
    const rawLinks = [
      { from: projects[0].position, to: projects[1].position },
      { from: projects[1].position, to: projects[2].position },
      { from: projects[2].position, to: projects[3].position },
      { from: projects[3].position, to: projects[4].position },
      { from: projects[4].position, to: projects[0].position },
      { from: projects[0].position, to: projects[2].position },
      { from: projects[2].position, to: projects[4].position } // TinyLLM -> MedComply
    ];
    return rawLinks.map(link => {
      const src = new THREE.Vector3(...link.from);
      const dest = new THREE.Vector3(...link.to);
      const dir = dest.clone().sub(src).normalize();
      return {
        from: src.clone().add(dir.clone().multiplyScalar(0.22)), // offset outside the sphere
        to: dest.clone().sub(dir.clone().multiplyScalar(0.22)) // offset outside the sphere
      };
    });
  }, []);

  useFrame((state) => {
    if (pulsesGroupRef.current) {
      const time = state.clock.getElapsedTime();
      pulsesGroupRef.current.children.forEach((mesh, idx) => {
        const link = links[idx];
        if (link) {
          const t = (time * 0.25 + idx * 0.15) % 1;
          mesh.position.set(
            link.from.x + (link.to.x - link.from.x) * t,
            link.from.y + (link.to.y - link.from.y) * t,
            link.from.z + (link.to.z - link.from.z) * t
          );
        }
      });
    }
  });

  return (
    <group ref={pulsesGroupRef}>
      {links.map((_, idx) => (
        <mesh key={idx}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// Volumetric glow light tube helper connecting project nodes
const VolumetricLine: React.FC<{ from: THREE.Vector3; to: THREE.Vector3 }> = ({ from, to }) => {
  const distance = from.distanceTo(to);
  const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  
  // Orient cylinder along connection vector (default cylinder is vertical on Y axis)
  const direction = new THREE.Vector3().subVectors(to, from).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
    <group position={midpoint} quaternion={quaternion}>
      {/* 1. Deep Volumetric Halo (Thickest blur backdrop) */}
      <mesh>
        <cylinderGeometry args={[0.035, 0.035, distance, 6, 1, true]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent={true}
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Luminous Mid Sheath */}
      <mesh>
        <cylinderGeometry args={[0.022, 0.022, distance, 6, 1, true]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent={true}
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Luminous Inner Core (Soft glow center) */}
      <mesh>
        <cylinderGeometry args={[0.012, 0.012, distance, 6, 1, true]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent={true}
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Render connection lines between project nodes (with boundary offsets and volumetric glow layering)
const ConstellationLines: React.FC = () => {
  const nodeConnections = [
    [0, 1], // DYN-EYE -> AutoAgenticML
    [1, 2], // AutoAgenticML -> TinyLLM
    [2, 3], // TinyLLM -> QSystem
    [3, 4], // QSystem -> MedComply
    [4, 0], // MedComply -> DYN-EYE
    [0, 2], // DYN-EYE -> TinyLLM
    [1, 3], // AutoAgenticML -> QSystem
    [2, 4]  // TinyLLM -> MedComply (Star layout link)
  ];

  const links = React.useMemo(() => {
    return nodeConnections.map(([srcIdx, destIdx]) => {
      const src = new THREE.Vector3(...projects[srcIdx].position);
      const dest = new THREE.Vector3(...projects[destIdx].position);
      const dir = dest.clone().sub(src).normalize();
      
      // Pull endpoints to start and end at the surface of node spheres rather than node centers
      const start = src.clone().add(dir.clone().multiplyScalar(0.22));
      const end = dest.clone().sub(dir.clone().multiplyScalar(0.22));
      
      return { start, end };
    });
  }, []);

  return (
    <group>
      {links.map((link, idx) => (
        <VolumetricLine key={idx} from={link.start} to={link.end} />
      ))}
    </group>
  );
};

// Project nodes inside the R3F Canvas
const ProjectNode: React.FC<{
  project: Project;
  onClick: () => void;
  isSelected: boolean;
}> = ({ project, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const pulseSpeed = 1.8;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * pulseSpeed + project.position[0]) * 0.04;
      meshRef.current.scale.setScalar(isSelected ? 1.35 : hovered ? 1.25 : scale);
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial
          color={isSelected ? "#0891b2" : hovered ? "#06b6d4" : "#334155"}
          wireframe={false}
          transparent={true}
          opacity={isSelected ? 0.85 : hovered ? 0.65 : 0.35}
        />
      </mesh>

      {/* Halo visual around node */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.26, 0.28, 32]} />
        <meshBasicMaterial
          color={isSelected ? "#0891b2" : hovered ? "#06b6d4" : "#94a3b8"}
          transparent={true}
          opacity={isSelected ? 0.8 : hovered ? 0.6 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Dynamic Title Tag */}
      <Html
        distanceFactor={6}
        position={[0, 0.42, 0]}
        center
        className="pointer-events-none select-none font-mono"
      >
        <div 
          className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-all duration-300 ${
            isSelected 
              ? "bg-accent-cyan/15 border-accent-cyan text-white shadow-glass-glow" 
              : hovered 
              ? "bg-accent-blue/15 border-accent-blue text-white" 
              : "bg-black/80 border-white/5 text-secondary"
          }`}
        >
          {project.title}
        </div>
      </Html>
    </group>
  );
};

// Telemetry manager that adjusts coordinates based on scroll and selections
const CameraManager: React.FC<{ selectedProject: Project | null }> = ({ selectedProject }) => {
  const { camera } = useThree();
  
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 5.2));
  const targetLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const [x, y, z] = selectedProject.position;
      targetPos.current.set(x, y, z + 1.6);
      targetLook.current.set(x, y, z);
    } else {
      targetPos.current.set(0, 0, 5.2);
      targetLook.current.set(0, 0, 0);
    }
  }, [selectedProject]);

  useFrame(() => {
    // Parallax mouse tilt
    const mouseX = mouse.current.x * 0.35;
    const mouseY = -mouse.current.y * 0.35;

    // Scroll vertical parallax offset
    const scrollOffset = (scrollY.current * 0.0035);

    const actualTargetPos = targetPos.current.clone();
    
    if (!selectedProject) {
      actualTargetPos.x += mouseX;
      actualTargetPos.y += mouseY - scrollOffset; // tilt down on scroll
    }

    camera.position.lerp(actualTargetPos, 0.08);
    currentLook.current.lerp(targetLook.current, 0.08);
    camera.lookAt(currentLook.current);
  });

  return null;
};

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onNodeClick, selectedProject }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const count = isMobile ? 60 : 300;

  // Generate particle positions once at parent canvas level so NeuralSparks can read them
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 60 }}
        className="w-full h-full"
        gl={{ antialias: !isMobile, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        
        {/* Unified Rotating Background Group */}
        <RotatingSpaceBackground positions={positions} count={count} />
        
        <ConstellationLines />
        
        <PulseTransmitters />

        {projects.map((project) => (
          <ProjectNode
            key={project.id}
            project={project}
            onClick={() => onNodeClick(project)}
            isSelected={selectedProject?.id === project.id}
          />
        ))}

        <CameraManager selectedProject={selectedProject} />
      </Canvas>
    </div>
  );
};
export default KnowledgeGraph;
