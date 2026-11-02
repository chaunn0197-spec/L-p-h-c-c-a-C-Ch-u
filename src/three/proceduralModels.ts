import * as THREE from "three";

/**
 * Procedural 3D Model Factory for Vietnam Tourism Route Master
 * Every model is assembled as a composite THREE.Group of 3–12 distinct parts
 * with varied roughness/metalness, grounded bottom-center pivots, and contact shadow discs.
 */

// Shared reusable materials & geometries
const goldMat = new THREE.MeshStandardMaterial({
  color: 0xf59e0b,
  roughness: 0.22,
  metalness: 0.85,
});

const stoneMat = new THREE.MeshStandardMaterial({
  color: 0x94a3b8,
  roughness: 0.75,
  metalness: 0.08,
});

const darkStoneMat = new THREE.MeshStandardMaterial({
  color: 0x475569,
  roughness: 0.85,
  metalness: 0.05,
});

const redLacquerMat = new THREE.MeshStandardMaterial({
  color: 0xb91c1c,
  roughness: 0.35,
  metalness: 0.15,
});

const terracottaMat = new THREE.MeshStandardMaterial({
  color: 0xc2410c,
  roughness: 0.82,
  metalness: 0.04,
});

const foliageGreenMat = new THREE.MeshStandardMaterial({
  color: 0x15803d,
  roughness: 0.65,
  metalness: 0.05,
});

const emeraldWaterMat = new THREE.MeshStandardMaterial({
  color: 0x0d9488,
  roughness: 0.15,
  metalness: 0.45,
});

const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0x38bdf8,
  roughness: 0.1,
  metalness: 0.1,
  transmission: 0.7,
  thickness: 0.5,
  transparent: true,
  opacity: 0.85,
});

const sailMat = new THREE.MeshStandardMaterial({
  color: 0xea580c,
  roughness: 0.55,
  metalness: 0.05,
  side: THREE.DoubleSide,
});

/**
 * Creates a soft radial contact shadow disc flush with the ground (Y = 0.02)
 */
export function createContactShadow(radius = 0.8, opacity = 0.45): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
  grad.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
  grad.addColorStop(0.5, `rgba(0, 0, 0, ${opacity * 0.5})`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const geo = new THREE.PlaneGeometry(radius * 2, radius * 2);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = 0.02;
  return mesh;
}

/**
 * Assembles a composite 3–12 part procedural model for each landmark type
 */
export function createProceduralLandmark(type: string): THREE.Group {
  const group = new THREE.Group();
  group.add(createContactShadow(0.9, 0.4));

  switch (type) {
    case "halong": {
      // 1. Primary limestone karst
      const k1 = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.6, 7), foliageGreenMat);
      k1.position.set(-0.35, 0.8, -0.1);
      k1.castShadow = true;
      // 2. Secondary karst peak
      const k2 = new THREE.Mesh(new THREE.ConeGeometry(0.36, 1.25, 6), foliageGreenMat);
      k2.position.set(0.38, 0.62, 0.2);
      k2.castShadow = true;
      // 3. Mini sea base
      const waterRing = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.08, 16), emeraldWaterMat);
      waterRing.position.y = 0.04;
      // 4. Junk boat wooden hull
      const boatHull = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.24), darkStoneMat);
      boatHull.position.set(0, 0.16, 0.45);
      boatHull.castShadow = true;
      // 5. Junk boat mast
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.65, 6), goldMat);
      mast.position.set(0, 0.48, 0.45);
      // 6. Batten sails
      const sail = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.45), sailMat);
      sail.position.set(0.12, 0.52, 0.45);
      sail.rotation.y = 0.2;
      group.add(k1, k2, waterRing, boatHull, mast, sail);
      break;
    }

    case "khue_van_cac": {
      // 1. Stone terrace base
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.9), stoneMat);
      base.position.y = 0.11;
      base.castShadow = true;
      // 2. Four square pillars
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), darkStoneMat);
      p1.position.set(-0.3, 0.36, -0.3);
      const p2 = p1.clone();
      p2.position.set(0.3, 0.36, -0.3);
      const p3 = p1.clone();
      p3.position.set(-0.3, 0.36, 0.3);
      const p4 = p1.clone();
      p4.position.set(0.3, 0.36, 0.3);
      // 3. Wooden red upper pavilion
      const upperRoom = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.4, 0.65), redLacquerMat);
      upperRoom.position.y = 0.81;
      upperRoom.castShadow = true;
      // 4. Circular bronze sun windows
      const sunWindow = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 8, 16), goldMat);
      sunWindow.position.set(0, 0.81, 0.33);
      // 5. Tiered hip roof with curved eaves
      const lowerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.26, 4), goldMat);
      lowerRoof.position.y = 1.05;
      lowerRoof.rotation.y = Math.PI / 4;
      const upperRoof = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.24, 4), redLacquerMat);
      upperRoof.position.y = 1.25;
      upperRoof.rotation.y = Math.PI / 4;
      // 6. Gilded finial
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), goldMat);
      finial.position.y = 1.42;
      group.add(base, p1, p2, p3, p4, upperRoom, sunWindow, lowerRoof, upperRoof, finial);
      break;
    }

    case "flagpole": {
      // 1. Octagonal tiered stone fortress
      const baseOct = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 0.28, 8), stoneMat);
      baseOct.position.y = 0.14;
      baseOct.castShadow = true;
      // 2. Second octagonal plinth with relief carvings
      const midOct = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.35, 8), darkStoneMat);
      midOct.position.y = 0.45;
      midOct.castShadow = true;
      // 3. Stainless steel mast
      const mastPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.4, 12), goldMat);
      mastPole.position.y = 1.32;
      // 4. Waving Vietnamese red flag
      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.42, 0.03), redLacquerMat);
      flag.position.set(0.33, 1.82, 0);
      // 5. Golden star relief
      const star = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.04), goldMat);
      star.position.set(0.33, 1.82, 0.015);
      group.add(baseOct, midOct, mastPole, flag, star);
      break;
    }

    case "golden_bridge": {
      // 1. Left Giant Stone Hand
      const handL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.75, 8), stoneMat);
      handL.position.set(-0.38, 0.38, 0.08);
      handL.rotation.z = 0.25;
      handL.castShadow = true;
      // 2. Right Giant Stone Hand
      const handR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.75, 8), stoneMat);
      handR.position.set(0.38, 0.38, -0.08);
      handR.rotation.z = -0.25;
      handR.castShadow = true;
      // 3. Curved Golden Bridge Deck
      const bridgeTorus = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.08, 8, 24, Math.PI * 0.9), goldMat);
      bridgeTorus.position.set(0, 0.65, 0);
      bridgeTorus.rotation.x = Math.PI / 2;
      bridgeTorus.castShadow = true;
      // 4. Bridge balustrades
      const rail1 = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.02, 6, 24, Math.PI * 0.9), goldMat);
      rail1.position.set(0, 0.72, 0);
      rail1.rotation.x = Math.PI / 2;
      // 5. Forest greenery backdrop
      const tree = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.85, 6), foliageGreenMat);
      tree.position.set(0, 0.42, -0.45);
      group.add(handL, handR, bridgeTorus, rail1, tree);
      break;
    }

    case "skyscraper": {
      // Landmark 81 Stepped Bamboo Bundle Architecture
      // 1. Lower wide cluster
      const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.8, 0.55), glassMat);
      c1.position.y = 0.4;
      c1.castShadow = true;
      // 2. Middle stepped cluster
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), glassMat);
      c2.position.y = 0.6;
      c2.castShadow = true;
      // 3. Upper slender tower
      const c3 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.65, 0.24), glassMat);
      c3.position.y = 0.82;
      c3.castShadow = true;
      // 4. Crown needle spire
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.7, 8), goldMat);
      spire.position.y = 1.95;
      // 5. Plaza base
      const plaza = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.75, 0.08, 16), stoneMat);
      plaza.position.y = 0.04;
      group.add(plaza, c1, c2, c3, spire);
      break;
    }

    case "cham_tower": {
      // Po Klong Garai / Ponagar Terracotta Red Brick Tower
      // 1. Stepped square plinth
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.25, 0.75), terracottaMat);
      base.position.y = 0.12;
      base.castShadow = true;
      // 2. Main tower shrine body
      const shrine = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.65, 0.52), terracottaMat);
      shrine.position.y = 0.55;
      shrine.castShadow = true;
      // 3. Arched entrance vestibule
      const vestibule = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.45, 0.22), redLacquerMat);
      vestibule.position.set(0, 0.45, 0.32);
      // 4. Multi-tiered stepped roof
      const tier1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.42), terracottaMat);
      tier1.position.y = 0.95;
      const tier2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.3), terracottaMat);
      tier2.position.y = 1.15;
      // 5. Kalasa finial
      const kalasa = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 8), goldMat);
      kalasa.position.y = 1.35;
      group.add(base, shrine, vestibule, tier1, tier2, kalasa);
      break;
    }

    case "trang_an": {
      // Limestone karst archway over emerald water
      const water = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.06, 16), emeraldWaterMat);
      water.position.y = 0.03;
      // Karst pillars forming cave arch
      const leftKarst = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.2, 6), foliageGreenMat);
      leftKarst.position.set(-0.35, 0.6, 0);
      const rightKarst = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.35, 6), foliageGreenMat);
      rightKarst.position.set(0.35, 0.68, 0);
      // Cave roof bridge
      const archTop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.4), darkStoneMat);
      archTop.position.set(0, 0.95, 0);
      // Traditional rowing boat
      const sampan = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.18), darkStoneMat);
      sampan.position.set(0, 0.1, 0.32);
      group.add(water, leftKarst, rightKarst, archTop, sampan);
      break;
    }

    case "cape_ship": {
      // Mũi Cà Mau Ship Monument & Wind Turbine
      // 1. Concrete ship prow pointing to ocean
      const prow = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.9, 4), redLacquerMat);
      prow.rotation.z = -Math.PI / 2;
      prow.position.set(0.15, 0.3, 0);
      prow.castShadow = true;
      // 2. Sail emblem
      const sail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.75, 0.38), goldMat);
      sail.position.set(0, 0.62, 0);
      // 3. GPS 0001 Coordinate Stone Obelisk
      const obelisk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.45, 4), stoneMat);
      obelisk.position.set(-0.4, 0.22, 0.3);
      // 4. Coastal Wind Turbine mast
      const turbinePole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 1.1, 8), stoneMat);
      turbinePole.position.set(-0.35, 0.55, -0.35);
      // 5. Turbine rotor nacelle
      const nacelle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.12), goldMat);
      nacelle.position.set(-0.35, 1.1, -0.35);
      // 6. Blades
      const blades = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.05), stoneMat);
      blades.position.set(-0.35, 1.1, -0.28);
      group.add(prow, sail, obelisk, turbinePole, nacelle, blades);
      break;
    }

    case "floating_market": {
      // Cai Rang Floating Market Sampan Boats with Fruit Pole
      const water = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.06, 16), emeraldWaterMat);
      water.position.y = 0.03;
      // Boat 1
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.22), darkStoneMat);
      b1.position.set(-0.15, 0.1, 0.1);
      // Fruit pyramid on boat 1
      const fruits1 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.18, 6), goldMat);
      fruits1.position.set(-0.15, 0.24, 0.1);
      // Bamboo trading pole ("Cây Bẹo")
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.75, 6), goldMat);
      pole.position.set(-0.32, 0.45, 0.1);
      // Boat 2
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.2), terracottaMat);
      b2.position.set(0.25, 0.09, -0.15);
      group.add(water, b1, fruits1, pole, b2);
      break;
    }

    case "nha_rong": {
      // Central Highlands Communal Stilt House
      // 1. Stilt posts
      const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6), darkStoneMat);
      p1.position.set(-0.25, 0.2, -0.2);
      const p2 = p1.clone();
      p2.position.set(0.25, 0.2, -0.2);
      const p3 = p1.clone();
      p3.position.set(-0.25, 0.2, 0.2);
      const p4 = p1.clone();
      p4.position.set(0.25, 0.2, 0.2);
      // 2. Wooden floor platform
      const floor = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.5), darkStoneMat);
      floor.position.y = 0.42;
      // 3. Soaring axe-blade curved thatch roof
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.25, 4), goldMat);
      roof.position.y = 1.05;
      roof.scale.set(0.6, 1, 1.3);
      group.add(p1, p2, p3, p4, floor, roof);
      break;
    }

    case "dalat_flower": {
      // Da Lat Artichoke & Wild Sunflower Pavilion
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.72, 0.12, 16), stoneMat);
      base.position.y = 0.06;
      // Layered dome petals
      const dome1 = new THREE.Mesh(new THREE.SphereGeometry(0.48, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), foliageGreenMat);
      dome1.position.y = 0.12;
      const dome2 = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), goldMat);
      dome2.position.y = 0.32;
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 8), goldMat);
      spire.position.y = 0.85;
      group.add(base, dome1, dome2, spire);
      break;
    }

    case "tea_hills": {
      // Tiered contoured tea terraces
      const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.14, 16), foliageGreenMat);
      t1.position.y = 0.07;
      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.14, 16), foliageGreenMat);
      t2.position.y = 0.21;
      const t3 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.14, 16), foliageGreenMat);
      t3.position.y = 0.35;
      const shadeTree = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), foliageGreenMat);
      shadeTree.position.set(0, 0.58, 0);
      group.add(t1, t2, t3, shadeTree);
      break;
    }

    case "waterfall": {
      // Tiered waterfall cascades
      const rock1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.5), darkStoneMat);
      rock1.position.y = 0.25;
      const rock2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.4), darkStoneMat);
      rock2.position.set(0, 0.6, -0.15);
      // Rushing foam
      const stream = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.7), glassMat);
      stream.position.set(0, 0.48, 0.12);
      stream.rotation.x = 0.3;
      const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.7, 0.06, 16), emeraldWaterMat);
      pool.position.set(0, 0.04, 0.25);
      group.add(rock1, rock2, stream, pool);
      break;
    }

    case "citadel": {
      // Stone Ramparts & Arched Gate
      const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.22), darkStoneMat);
      wallL.position.set(-0.3, 0.22, 0);
      const wallR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.22), darkStoneMat);
      wallR.position.set(0.3, 0.22, 0);
      const archLintel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.18, 0.24), stoneMat);
      archLintel.position.set(0, 0.52, 0);
      const watchtower = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.3), redLacquerMat);
      watchtower.position.set(0, 0.78, 0);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.25, 4), goldMat);
      roof.position.set(0, 1.05, 0);
      roof.rotation.y = Math.PI / 4;
      group.add(wallL, wallR, archLintel, watchtower, roof);
      break;
    }

    case "imperial_gate": {
      // Ngo Mon Gate Hue
      const stoneBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.32, 0.45), stoneMat);
      stoneBase.position.y = 0.16;
      const centerPortal = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.47), darkStoneMat);
      centerPortal.position.set(0, 0.12, 0);
      const pavilion = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.32, 0.35), redLacquerMat);
      pavilion.position.set(0, 0.48, 0);
      const roof1 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.22, 4), goldMat);
      roof1.position.set(0, 0.72, 0);
      roof1.rotation.y = Math.PI / 4;
      group.add(stoneBase, centerPortal, pavilion, roof1);
      break;
    }

    default: {
      // Generic historic pagoda tower
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.8, 8), stoneMat);
      b.position.y = 0.4;
      b.castShadow = true;
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.45, 8), redLacquerMat);
      roof.position.y = 1.0;
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), goldMat);
      finial.position.y = 1.25;
      group.add(b, roof, finial);
      break;
    }
  }

  return group;
}

/**
 * Creates composite 3–12 part procedural 3D vehicles
 */
export function createProceduralVehicle(mode: "air" | "road" | "water"): THREE.Group {
  const g = new THREE.Group();
  g.add(createContactShadow(0.65, 0.35));

  if (mode === "air") {
    // 1. Streamlined jet fuselage
    const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.5, 12), goldMat);
    fuselage.rotation.x = Math.PI / 2;
    fuselage.position.y = 0.25;
    fuselage.castShadow = true;
    // 2. Nose cone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 12), darkStoneMat);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, 0.25, 0.95);
    // 3. Swept main wings
    const wings = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.05, 0.38), goldMat);
    wings.position.set(0, 0.25, 0.1);
    wings.castShadow = true;
    // 4. Vertical stabilizer tail
    const vTail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.35), redLacquerMat);
    vTail.position.set(0, 0.52, -0.65);
    // 5. Dual under-wing jet turbofans
    const engL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.38, 8), darkStoneMat);
    engL.rotation.x = Math.PI / 2;
    engL.position.set(-0.48, 0.14, 0.15);
    const engR = engL.clone();
    engR.position.set(0.48, 0.14, 0.15);
    // 6. Cockpit glass visor
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.22), glassMat);
    visor.position.set(0, 0.36, 0.72);
    g.add(fuselage, nose, wings, vTail, engL, engR, visor);
  } else if (mode === "water") {
    // 1. High-speed catamaran / express ship twin hulls
    const hullL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 1.35), darkStoneMat);
    hullL.position.set(-0.25, 0.12, 0);
    const hullR = hullL.clone();
    hullR.position.set(0.25, 0.12, 0);
    // 2. Main passenger deck platform
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 1.15), goldMat);
    deck.position.set(0, 0.24, 0);
    deck.castShadow = true;
    // 3. Wheelhouse cabin with panoramic windows
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.65), glassMat);
    cabin.position.set(0, 0.42, 0.1);
    // 4. Radar dome & mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.35, 6), darkStoneMat);
    mast.position.set(0, 0.68, -0.15);
    const radome = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), goldMat);
    radome.position.set(0, 0.85, -0.15);
    g.add(hullL, hullR, deck, cabin, mast, radome);
  } else {
    // Luxury tour coach bus
    // 1. Main aerodynamic chassis body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.42, 1.35), goldMat);
    body.position.set(0, 0.38, 0);
    body.castShadow = true;
    // 2. Panoramic tinted glass cabin
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.22, 0.95), glassMat);
    cabin.position.set(0, 0.46, 0.12);
    // 3. Aerodynamic roof air-conditioning pod
    const acPod = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.55), darkStoneMat);
    acPod.position.set(0, 0.62, -0.1);
    // 4. Six rubber wheels with silver hubs
    const wheelGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.1, 12);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = darkStoneMat;
    const w1 = new THREE.Mesh(wheelGeo, wheelMat);
    w1.position.set(-0.28, 0.14, 0.45);
    const w2 = w1.clone();
    w2.position.set(0.28, 0.14, 0.45);
    const w3 = w1.clone();
    w3.position.set(-0.28, 0.14, -0.4);
    const w4 = w1.clone();
    w4.position.set(0.28, 0.14, -0.4);
    // 5. LED headlights
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 0.04), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    hl.position.set(0, 0.28, 0.68);
    g.add(body, cabin, acPod, w1, w2, w3, w4, hl);
  }

  return g;
}
