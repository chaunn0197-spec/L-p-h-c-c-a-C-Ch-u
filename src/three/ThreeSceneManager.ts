import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { Province, Island, PROVINCES_34, ISLANDS_DATA } from "../data/provincesData";
import { createProceduralLandmark, createProceduralVehicle } from "./proceduralModels";

export interface LabelItem {
  id: string;
  name: string;
  color: string;
  isIsland: boolean;
  isSovereign?: boolean;
  worldPos: THREE.Vector3;
  screenX: number;
  screenY: number;
  visible: boolean;
}

export class ThreeSceneManager {
  private container: HTMLElement;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private pmremGenerator!: THREE.PMREMGenerator;

  private mapGroup = new THREE.Group();
  private landmarkGroup = new THREE.Group();
  private routeGroup = new THREE.Group();
  private vehicleGroup = new THREE.Group();

  private oceanMesh!: THREE.Mesh;
  private provinceMeshes: THREE.Mesh[] = [];
  private provinceMeshMap: Record<string, THREE.Mesh> = {};

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private clock = new THREE.Clock();

  private isSoftwareGl = false;
  private animationFrameId = 0;
  private destroyed = false;

  // Camera animation
  private camAnim = {
    active: false,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    progress: 0,
    duration: 1.2,
  };

  // Vehicle transit
  private activeTravel: {
    active: boolean;
    curve: THREE.QuadraticBezierCurve3 | null;
    progress: number;
    speed: number;
    origin: Province | null;
    destination: Province | null;
    distanceKm: number;
    vehicleMesh: THREE.Group | null;
  } = {
    active: false,
    curve: null,
    progress: 0,
    speed: 0.005,
    origin: null,
    destination: null,
    distanceKm: 0,
    vehicleMesh: null,
  };

  private chaseCamera = false;
  private hoveredMesh: THREE.Mesh | null = null;
  private currentProvinceId = "VN-09";

  // Callbacks
  public onProvinceHover?: (prov: Province | null, screenPos: { x: number; y: number } | null) => void;
  public onProvinceClick?: (prov: Province) => void;
  public onTravelProgress?: (progress: number, distanceKm: number) => void;
  public onTravelComplete?: (dest: Province) => void;
  public onLabelsUpdate?: (labels: LabelItem[]) => void;

  private labelsData: {
    id: string;
    name: string;
    color: string;
    isIsland: boolean;
    isSovereign?: boolean;
    worldPos: THREE.Vector3;
  }[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.detectSoftwareGl();
    this.initScene();
    this.buildOcean();
    this.build34Provinces();
    this.buildIslands();
    this.setupEvents();
    this.startLoop();
  }

  private detectSoftwareGl() {
    try {
      const gl = document.createElement("canvas").getContext("webgl2");
      if (!gl) {
        this.isSoftwareGl = true;
        return;
      }
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      this.isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      this.isSoftwareGl = false;
    }
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040d1a);
    this.scene.fog = new THREE.FogExp2(0x040d1a, 0.0055);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 450);
    this.camera.position.set(12, 58, 35);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2.15;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 160;
    this.controls.target.set(3, 0, -5);
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = false; // Panning smoothly shifts along Vietnam's ground plane
    this.controls.panSpeed = 1.3;

    // Studio Environment Reflections via RoomEnvironment & PMREMGenerator
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // 3-Point Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    this.scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f2942, 0.5);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.15);
    dirLight.position.set(35, 65, 30);
    dirLight.castShadow = !this.isSoftwareGl;
    if (dirLight.castShadow) {
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.normalBias = 0.02;
      dirLight.shadow.camera.near = 10;
      dirLight.shadow.camera.far = 160;
      const d = 45;
      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;
    }
    this.scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.55);
    rimLight.position.set(-40, 25, -30);
    this.scene.add(rimLight);

    this.scene.add(this.mapGroup);
    this.scene.add(this.landmarkGroup);
    this.scene.add(this.routeGroup);
    this.scene.add(this.vehicleGroup);
  }

  private buildOcean() {
    const oceanGeo = new THREE.PlaneGeometry(280, 280, 48, 48);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x061e38,
      emissive: 0x020d1c,
      specular: 0x38bdf8,
      shininess: 40,
      flatShading: true,
    });
    this.oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    this.oceanMesh.rotation.x = -Math.PI / 2;
    this.oceanMesh.position.y = -0.35;
    this.oceanMesh.receiveShadow = true;
    this.scene.add(this.oceanMesh);

    // Subtle Bathymetric Coordinates Grid
    const grid = new THREE.GridHelper(240, 48, 0x1e3a8a, 0x0f294a);
    grid.position.y = -0.32;
    this.scene.add(grid);
  }

  private build34Provinces() {
    PROVINCES_34.forEach((prov) => {
      const shape = new THREE.Shape();
      prov.polygon.forEach((pt, idx) => {
        if (idx === 0) shape.moveTo(pt[0], -pt[1]);
        else shape.lineTo(pt[0], -pt[1]);
      });
      shape.closePath();

      const extrudeSettings = {
        depth: 1.25,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.12,
        bevelThickness: 0.15,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.rotateX(-Math.PI / 2);

      const baseColor = new THREE.Color(prov.color);
      const mat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.45,
        metalness: 0.15,
        emissive: baseColor.clone().multiplyScalar(0.08),
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = !this.isSoftwareGl;
      mesh.receiveShadow = true;
      mesh.userData = { type: "province", province: prov, baseColor, targetY: 0 };

      // Border outline line segments
      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      this.mapGroup.add(mesh);
      this.provinceMeshes.push(mesh);
      this.provinceMeshMap[prov.id] = mesh;

      // Concentric Hub Circles
      prov.hubs.forEach((hub) => {
        const hubGroup = new THREE.Group();
        hubGroup.position.set(hub.x, 1.42, hub.z);

        const ringGeo = new THREE.RingGeometry(0.24, 0.38, 20);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);

        const dotGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.18, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);

        hubGroup.add(ringMesh, dotMesh);
        mesh.add(hubGroup);
      });

      // Composite 3–12 part procedural landmark
      const landmark = createProceduralLandmark(prov.landmarkType);
      landmark.position.set(prov.x, 1.4, prov.z);
      mesh.add(landmark);

      // Register label
      this.labelsData.push({
        id: prov.id,
        name: prov.name,
        color: prov.color,
        isIsland: false,
        worldPos: new THREE.Vector3(prov.x, 2.3, prov.z),
      });
    });
  }

  private buildIslands() {
    ISLANDS_DATA.forEach((isl) => {
      const islandGroup = new THREE.Group();
      islandGroup.position.set(isl.x, 0, isl.z);

      const islColor = new THREE.Color(isl.color);
      const mat = new THREE.MeshStandardMaterial({
        color: islColor,
        roughness: 0.4,
        emissive: islColor.clone().multiplyScalar(0.25),
      });

      if (isl.isSovereign) {
        // Multi-atoll cluster for Hoàng Sa and Trường Sa
        const offsets = [
          [0, 0, 0.9],
          [-1.2, -0.8, 0.6],
          [1.1, -0.5, 0.65],
          [-0.8, 1.0, 0.55],
          [1.3, 0.9, 0.6],
          [0.2, 1.6, 0.5],
          [-1.6, 0.2, 0.5],
        ];
        offsets.forEach(([dx, dz, scale]) => {
          const m = new THREE.Mesh(new THREE.CylinderGeometry(0.45 * scale, 0.65 * scale, 0.7, 7), mat);
          m.position.set(dx, 0.2, dz);
          m.userData = { type: "island", island: isl };
          islandGroup.add(m);
          this.provinceMeshes.push(m);
        });

        // Sovereign Flag & Lighthouse Pillar
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.26, 2.2, 12),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
        );
        pillar.position.y = 1.1;

        const flag = new THREE.Mesh(
          new THREE.BoxGeometry(0.95, 0.6, 0.08),
          new THREE.MeshBasicMaterial({ color: 0xef4444 })
        );
        flag.position.set(0.48, 1.95, 0);

        islandGroup.add(pillar, flag);
      } else {
        const radius = isl.id === "IS-PHUQUOC" ? 0.95 : 0.55;
        const m = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.8, radius, 0.85, 8), mat);
        m.position.y = 0.25;
        m.userData = { type: "island", island: isl };
        islandGroup.add(m);
        this.provinceMeshes.push(m);
      }

      this.mapGroup.add(islandGroup);

      this.labelsData.push({
        id: isl.id,
        name: isl.name,
        color: isl.color,
        isIsland: true,
        isSovereign: isl.isSovereign,
        worldPos: new THREE.Vector3(isl.x, isl.isSovereign ? 2.8 : 1.5, isl.z),
      });
    });
  }

  private setupEvents() {
    let downPos = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.provinceMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let prov: Province | null = null;
        if (hit.userData.type === "province") {
          prov = hit.userData.province;
        } else if (hit.userData.type === "island") {
          const isl: Island = hit.userData.island;
          prov = PROVINCES_34.find((p) => p.id === isl.parentProvinceId) || null;
        }

        if (prov) {
          if (this.hoveredMesh && this.hoveredMesh !== this.provinceMeshMap[prov.id]) {
            this.hoveredMesh.userData.targetY =
              this.hoveredMesh.userData.province.id === this.currentProvinceId ? 0.55 : 0;
          }
          this.hoveredMesh = this.provinceMeshMap[prov.id];
          if (this.hoveredMesh) this.hoveredMesh.userData.targetY = 0.65;
          if (this.onProvinceHover) {
            this.onProvinceHover(prov, { x: e.clientX, y: e.clientY });
          }
          this.renderer.domElement.style.cursor = "pointer";
          return;
        }
      }

      if (this.hoveredMesh) {
        this.hoveredMesh.userData.targetY =
          this.hoveredMesh.userData.province.id === this.currentProvinceId ? 0.55 : 0;
        this.hoveredMesh = null;
      }
      if (this.onProvinceHover) {
        this.onProvinceHover(null, null);
      }
      this.renderer.domElement.style.cursor = "grab";
    };

    const onPointerUp = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist > 6) return; // Dragging

      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.provinceMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let prov: Province | null = null;
        if (hit.userData.type === "province") {
          prov = hit.userData.province;
        } else if (hit.userData.type === "island") {
          const isl: Island = hit.userData.island;
          prov = PROVINCES_34.find((p) => p.id === isl.parentProvinceId) || null;
        }
        if (prov && this.onProvinceClick) {
          this.onProvinceClick(prov);
        }
      }
    };

    const onResize = () => {
      if (this.destroyed || !this.container) return;
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      const panStep = e.shiftKey ? 6.0 : 3.2;
      if (e.key === "ArrowUp") {
        this.panBy("up", panStep);
      } else if (e.key === "ArrowDown") {
        this.panBy("down", panStep);
      } else if (e.key === "ArrowLeft") {
        this.panBy("left", panStep);
      } else if (e.key === "ArrowRight") {
        this.panBy("right", panStep);
      } else if (e.key === "+" || e.key === "=") {
        this.zoomBy(0.88);
      } else if (e.key === "-" || e.key === "_") {
        this.zoomBy(1.14);
      }
    };

    this.keydownHandler = onKeyDown;
    window.addEventListener("keydown", onKeyDown);

    this.renderer.domElement.addEventListener("pointerdown", onPointerDown);
    this.renderer.domElement.addEventListener("pointermove", onPointerMove);
    this.renderer.domElement.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);
  }

  private keydownHandler?: (e: KeyboardEvent) => void;
  private currentDragMode: "pan" | "rotate" = "rotate";

  public getDragMode(): "pan" | "rotate" {
    return this.currentDragMode;
  }

  /**
   * Configure mouse drag behavior: "pan" (left drag pans map) or "rotate" (left drag rotates)
   */
  public setDragMode(mode: "pan" | "rotate") {
    this.currentDragMode = mode;
    if (mode === "pan") {
      this.controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      };
      this.controls.touches = {
        ONE: THREE.TOUCH.PAN,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      this.renderer.domElement.style.cursor = "grab";
    } else {
      this.controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
      this.controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      this.renderer.domElement.style.cursor = "default";
    }
  }

  /**
   * Panning: smoothly moves camera and controls target along the horizontal ground plane (XZ)
   * @param dir Direction ("up" | "down" | "left" | "right") or custom vector delta
   * @param step Step distance in 3D units
   */
  public panBy(dir: "up" | "down" | "left" | "right" | { dx: number; dz: number }, step = 3.5) {
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const move = new THREE.Vector3();

    if (typeof dir === "string") {
      switch (dir) {
        case "up":
          move.addScaledVector(forward, step);
          break;
        case "down":
          move.addScaledVector(forward, -step);
          break;
        case "left":
          move.addScaledVector(right, -step);
          break;
        case "right":
          move.addScaledVector(right, step);
          break;
      }
    } else {
      move.addScaledVector(right, dir.dx);
      move.addScaledVector(forward, dir.dz);
    }

    this.camera.position.add(move);
    this.controls.target.add(move);
    this.controls.update();
  }

  /**
   * Rotate camera around target in degrees
   */
  public rotateBy(degrees: number) {
    const rad = (degrees * Math.PI) / 180;
    const offset = this.camera.position.clone().sub(this.controls.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), rad);
    this.camera.position.copy(this.controls.target).add(offset);
    this.controls.update();
  }

  /**
   * Zoom camera in or out
   */
  public zoomBy(factor: number) {
    const offset = this.camera.position.clone().sub(this.controls.target);
    const newLen = offset.length() * factor;
    if (newLen >= this.controls.minDistance && newLen <= this.controls.maxDistance) {
      offset.normalize().multiplyScalar(newLen);
      this.camera.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }
  }

  public flyCameraTo(targetCamPos: THREE.Vector3, targetLookAt: THREE.Vector3) {
    this.camAnim.active = true;
    this.camAnim.startPos.copy(this.camera.position);
    this.camAnim.endPos.copy(targetCamPos);
    this.camAnim.startTarget.copy(this.controls.target);
    this.camAnim.endTarget.copy(targetLookAt);
    this.camAnim.progress = 0;
  }

  public flyCameraToProvince(prov: Province) {
    const targetLook = new THREE.Vector3(prov.x, 1.2, prov.z);
    const targetPos = new THREE.Vector3(prov.x + 8.5, 14.5, prov.z + 11.5);
    this.flyCameraTo(targetPos, targetLook);
  }

  public resetOverview() {
    this.chaseCamera = false;
    this.flyCameraTo(new THREE.Vector3(12, 58, 35), new THREE.Vector3(3, 0, -5));
  }

  public setSelectedProvince(provId: string, flyCam = true) {
    this.currentProvinceId = provId;
    const targetProv = PROVINCES_34.find((p) => p.id === provId);

    PROVINCES_34.forEach((p) => {
      const mesh = this.provinceMeshMap[p.id];
      if (!mesh) return;
      if (p.id === provId) {
        mesh.userData.targetY = 0.55;
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x1e40af);
      } else {
        mesh.userData.targetY = 0;
        (mesh.material as THREE.MeshStandardMaterial).emissive.copy(mesh.userData.baseColor).multiplyScalar(0.08);
      }
    });

    if (flyCam && targetProv) {
      this.flyCameraToProvince(targetProv);
    }
  }

  public setChaseCamera(active: boolean) {
    this.chaseCamera = active;
  }

  public setChallengeSelectedProvinces(provIds: string[]) {
    PROVINCES_34.forEach((p) => {
      const mesh = this.provinceMeshMap[p.id];
      if (!mesh) return;
      const isSelected = provIds.includes(p.id);
      if (isSelected) {
        mesh.userData.targetY = 0.58;
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xf59e0b);
      } else {
        mesh.userData.targetY = 0;
        (mesh.material as THREE.MeshStandardMaterial).emissive
          .copy(mesh.userData.baseColor)
          .multiplyScalar(0.08);
      }
    });
  }

  public launchJourney(fromProv: Province, toProv: Province, mode: "air" | "road" | "water") {
    while (this.routeGroup.children.length > 0) this.routeGroup.remove(this.routeGroup.children[0]);
    while (this.vehicleGroup.children.length > 0) this.vehicleGroup.remove(this.vehicleGroup.children[0]);

    const startPt = new THREE.Vector3(fromProv.x, 1.55, fromProv.z);
    const endPt = new THREE.Vector3(toProv.x, 1.55, toProv.z);
    const dist3D = startPt.distanceTo(endPt);
    const approxKm = Math.max(45, Math.round(dist3D * 22));

    const arcHeight = mode === "air" ? Math.min(14, Math.max(4.5, dist3D * 0.32)) : 2.1;
    const midPt = new THREE.Vector3().addVectors(startPt, endPt).multiplyScalar(0.5);
    midPt.y += arcHeight;

    const curve = new THREE.QuadraticBezierCurve3(startPt, midPt, endPt);

    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.11, 8, false);
    const tubeColor = mode === "air" ? 0x38bdf8 : mode === "water" ? 0x34d399 : 0xfbbf24;
    const tubeMat = new THREE.MeshBasicMaterial({ color: tubeColor, transparent: true, opacity: 0.85 });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.routeGroup.add(tubeMesh);

    const vehicleMesh = createProceduralVehicle(mode);
    this.vehicleGroup.add(vehicleMesh);

    this.activeTravel = {
      active: true,
      curve,
      progress: 0,
      speed: mode === "air" ? 0.0065 : 0.0045,
      origin: fromProv,
      destination: toProv,
      distanceKm: approxKm,
      vehicleMesh,
    };

    if (!this.chaseCamera) {
      this.flyCameraTo(
        new THREE.Vector3(midPt.x + 14, Math.max(18, dist3D * 0.85), midPt.z + 16),
        new THREE.Vector3(midPt.x, 1, midPt.z)
      );
    }
  }

  private startLoop() {
    const tick = () => {
      if (this.destroyed) return;
      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();

      // Subtle Ocean wave bobbing
      if (this.oceanMesh) {
        this.oceanMesh.position.y = -0.35 + Math.sin(elapsed * 1.5) * 0.04;
      }

      // Smooth province hover / selection elevation
      this.provinceMeshes.forEach((m) => {
        if (m.userData.type === "province") {
          m.position.y += (m.userData.targetY - m.position.y) * 0.14;
        }
      });

      // Camera Fly-to Interpolation
      if (this.camAnim.active && !this.chaseCamera) {
        this.camAnim.progress += delta / this.camAnim.duration;
        if (this.camAnim.progress >= 1) {
          this.camAnim.progress = 1;
          this.camAnim.active = false;
        }
        const t = 1 - Math.pow(1 - this.camAnim.progress, 3);
        this.camera.position.lerpVectors(this.camAnim.startPos, this.camAnim.endPos, t);
        this.controls.target.lerpVectors(this.camAnim.startTarget, this.camAnim.endTarget, t);
      }

      // Active 3D Vehicle Movement along Bezier Curve
      if (this.activeTravel.active && this.activeTravel.curve && this.activeTravel.vehicleMesh) {
        this.activeTravel.progress += this.activeTravel.speed;
        if (this.onTravelProgress) {
          this.onTravelProgress(this.activeTravel.progress, this.activeTravel.distanceKm);
        }

        if (this.activeTravel.progress >= 1) {
          this.activeTravel.progress = 1;
          this.activeTravel.active = false;
          if (this.activeTravel.destination && this.onTravelComplete) {
            this.onTravelComplete(this.activeTravel.destination);
          }
        } else {
          const pos = this.activeTravel.curve.getPointAt(this.activeTravel.progress);
          const lookAtPt = this.activeTravel.curve.getPointAt(
            Math.min(1, this.activeTravel.progress + 0.02)
          );
          this.activeTravel.vehicleMesh.position.copy(pos);
          this.activeTravel.vehicleMesh.lookAt(lookAtPt);

          if (this.chaseCamera) {
            const camOffset = new THREE.Vector3(4.5, 5.5, 6.5);
            this.camera.position.lerp(pos.clone().add(camOffset), 0.1);
            this.controls.target.lerp(pos, 0.15);
          }
        }
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);

      // Project 3D labels to screen
      this.updateProjectedLabels();

      this.animationFrameId = requestAnimationFrame(tick);
    };

    this.animationFrameId = requestAnimationFrame(tick);
  }

  private updateProjectedLabels() {
    if (!this.onLabelsUpdate) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const halfW = width / 2;
    const halfH = height / 2;

    const projected: LabelItem[] = this.labelsData.map((lbl) => {
      const v = lbl.worldPos.clone();
      v.project(this.camera);
      const isBehind = v.z > 1;
      const x = v.x * halfW + halfW;
      const y = -(v.y * halfH) + halfH;
      return {
        id: lbl.id,
        name: lbl.name,
        color: lbl.color,
        isIsland: lbl.isIsland,
        isSovereign: lbl.isSovereign,
        worldPos: lbl.worldPos,
        screenX: x,
        screenY: y,
        visible: !isBehind && x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50,
      };
    });

    this.onLabelsUpdate(projected);
  }

  public dispose() {
    this.destroyed = true;
    cancelAnimationFrame(this.animationFrameId);
    if (this.keydownHandler) {
      window.removeEventListener("keydown", this.keydownHandler);
    }
    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
