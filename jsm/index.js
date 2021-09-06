// This uses top level await in a module - tested with latest versions of firefox, chrome and edge.
const THREE = await import("/jsm/three.module.js")
const { OrbitControls } = await import("/jsm/OrbitControls.js")
const { GLTFLoader } = await import("/jsm/GLTFLoader.js")
const ImageMetrics = await import("/jsm/ImageMetrics.js")
// May need to be transpiled for older browsers

// SET UP RENDERER
const renderer = new THREE.WebGLRenderer({canvas:document.getElementById("canvas3d"),antialias:true});
renderer.physicallyCorrectLights = true;      // these two settings are required for 
renderer.outputEncoding = THREE.sRGBEncoding; // certain gltf features or extensions
renderer.setSize(window.innerWidth, window.innerHeight);

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color( "#000000");

// CAMERA - for viewing the complete app, *not* the camera we use for image matching
const cWidth = window.innerWidth;
const cHeight = window.innerHeight;
const cNear = 1;
const cFar = 1000;
const camera = new THREE.PerspectiveCamera(45, cWidth / cHeight, cNear, cFar);
//const camera = new THREE.OrthographicCamera( cWidth / - 2, cWidth / 2, cHeight / 2, cHeight / - 2, cNear, cFar );
scene.add(camera);
camera.position.set(0, 0, 100);
camera.lookAt(scene.position)
var orbitcontrols = new OrbitControls(camera, document.getElementById("canvas3d"));

// SET UP RESIZE EVENT
var tanFOV = Math.tan((Math.PI / 360) * camera.fov);
var windowHeight = window.innerHeight;
window.addEventListener('resize', onWindowResize, false);

// SET UP LIGHTS
var light1 = new THREE.AmbientLight("#ffffff",2);
scene.add(light1);

// A directional light will look good, but will make colour matching a challenge
var light2 = new THREE.DirectionalLight("#ffff88",2);
light2.position.set(0, 800, 0);
scene.add(light2);

// LOAD THE BUNNY
var loader = new GLTFLoader().setPath( "/testdata/" );
loader.load("bunny.glb", function ( gltf ) {
	gltf.scene.scale.x = gltf.scene.scale.y = gltf.scene.scale.z =20;
	scene.add(gltf.scene);
} );

// START ANIMATION
animate();

// SET RESOLUTION
const elevationMax = 90;
const elevationMin = -90;
// Elevation to rotation is a 2:1, and corresponds to latitude and longitude on a sphere
const rotationMax = 360;
const rotationMin = 0;
// Remember that these limits wrap around. But Elevation does not. This can cause bugs if not accounted for

// that was the physical range, now to divide it up for any given resolution:
let verticalResolution = 10;
let horizontalResolution = verticalResolution*2;
// defaults to 2:1

// USER SELECT AND LOAD IMAGE FOR COMPARISON

const imageMetrics = new ImageMetrics("/testdata/sampleImageOrth2.png", "canvas2d");


//newImage.style.top = '2px';

// COMPARE AND DISPLAY AR DATA

// COMPARE AND DISPLAY SHAPE DATA

// COMPARE AND DISPLAY COLOUR DATA

function animate(){
    requestAnimationFrame(() => { animate() } );
    renderer.render(scene, camera);
}

function onWindowResize(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
        camera.updateProjectionMatrix();
        camera.lookAt(scene.position);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
}

