import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const Excel3DChart = () => {
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const [data, setData] = useState([]);
  const [axes, setAxes] = useState({ x: "", y: "", z: "" });
  const [chartType, setChartType] = useState("bar");
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [controls, setControls] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      setData(jsonData);
      if (jsonData.length > 0) {
        const keys = Object.keys(jsonData[0]);
        setAxes({ x: keys[0], y: keys[1], z: keys[2] });
      }
    };
    reader.readAsBinaryString(file);
  };

  const initThree = () => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const grid = new THREE.GridHelper(20, 20);
    grid.name = "grid";
    scene.add(grid);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);
    setControls(controls);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  };

  const addAxisLabels = () => {
    if (!scene) return;

    // Remove old labels
    scene.children
    .filter(obj => obj.name === "axisLabel")
    .forEach(obj => scene.remove(obj));

    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const createLabel = (text, position) => {
          const geom = new TextGeometry(text, {
            font: font,
            size: 0.3,
            height: 0.02,
          });
          const mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const mesh = new THREE.Mesh(geom, mat);
          mesh.position.copy(position);
          mesh.name = "axisLabel";
          scene.add(mesh);
        };

        createLabel(`X: ${axes.x}`, new THREE.Vector3(5, 0, 0));
        createLabel(`Y: ${axes.y}`, new THREE.Vector3(0, 5, 0));
        createLabel(`Z: ${axes.z}`, new THREE.Vector3(0, 0, 5));
      }
    );
  };

  const renderChart = () => {
    if (!scene || !data || data.length === 0) return;

    // Remove old bars & labels except grid & lights
     scene.children
    .filter((obj) => obj.name === "bar" || obj.name === "barLabel")
    .forEach((obj) => scene.remove(obj));

    // ---- SCALE ----
    const yValues = data.map((r) => parseFloat(r[axes.y])).filter((v) => !isNaN(v));
    const maxY = Math.max(...yValues, 1);
    const yScale = 5 / maxY;

    const zValues = data.map((r) => parseFloat(r[axes.z])).filter((v) => !isNaN(v));
    const maxZ = zValues.length > 0 ? Math.max(...zValues) : 1;
    const zScale = maxZ !== 0 ? 5 / maxZ : 1;

    // Loop over data and add bars
    data.forEach((row, i) => {
      const rawY = parseFloat(row[axes.y]);
      if (isNaN(rawY)) return;

      const y = rawY * yScale;
      const x = i * 0.6; // spacing
      let z = 0;

      if (axes.z && !isNaN(parseFloat(row[axes.z]))) {
        z = parseFloat(row[axes.z]) * zScale;
      }

      const geometry = new THREE.BoxGeometry(0.4, Math.abs(y), 0.4);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      const bar = new THREE.Mesh(geometry, material);

      bar.position.set(x, y / 2, z);
      bar.name = "bar";
      scene.add(bar);

      // Label
      const label = makeTextSprite(`${rawY}`);
      label.position.set(x, y + 0.2, z);
      label.name = "valueLabel";
      scene.add(label);
    });

    addAxisLabels();
  };

  const makeTextSprite = (message) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "24px Arial";
    context.fillStyle = "white";
    context.fillText(message, 0, 24);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.scale.set(0.5, 0.25, 1);
    return sprite;
  };

  useEffect(() => {
    initThree();
  }, []);

  useEffect(() => {
    if(scene) renderChart();
  }, [axes, chartType, data, scene]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Excel to 3D Chart</h1>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <label className="block">
          <span className="mr-2 font-semibold">Choose File</span>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="file-input file-input-bordered file-input-sm"
          />
        </label>

        {data.length > 0 && (
          <>
            <label className="flex items-center gap-2">
              <span className="font-semibold">X-Axis:</span>
              <select
                value={axes.x}
                onChange={(e) => setAxes({ ...axes, x: e.target.value })}
                className="select select-bordered select-sm"
              >
                {Object.keys(data[0]).map((key) => (
                  <option key={`x-${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2">
              <span className="font-semibold">Y-Axis:</span>
              <select
                value={axes.y}
                onChange={(e) => setAxes({ ...axes, y: e.target.value })}
                className="select select-bordered select-sm"
              >
                {Object.keys(data[0]).map((key) => (
                  <option key={`y-${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2">
              <span className="font-semibold">Z-Axis:</span>
              <select
                value={axes.z}
                onChange={(e) => setAxes({ ...axes, z: e.target.value })}
                className="select select-bordered select-sm"
              >
                {Object.keys(data[0]).map((key) => (
                  <option key={`z-${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2">
              <span className="font-semibold">Chart Type:</span>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="bar">Bar</option>
                <option value="scatter">Scatter</option>
              </select>
            </label>
          </>
        )}
      </div>

      <div ref={containerRef} className="border w-full h-[600px]"></div>
    </div>
  );
};

export default Excel3DChart;
