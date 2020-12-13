import * as THREE from '../build/three.module.js';

import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from './jsm/renderers/CSS3DRenderer.js';

let camera, scene, renderer;
let controls;
let glo_group;

function Element( id, x, y, z, ry, rx ) {

	const div = document.createElement( 'div' );
	div.style.width = '480px';
	div.style.height = '480px';
	div.style.backgroundColor = '#f0f0f0';

	const iframe = document.createElement( 'iframe' );
	iframe.style.width = '480px';
	iframe.style.height = '480px';
	iframe.style.border = '0px';
	iframe.allow = 'autoplay; encrypted-media';
	iframe.src = [ 'https://www.youtube.com/embed/', id, '?modestbranding=1&&playsinline=1&autohide=1&showinfo=0&controls=0&autoplay=1&mute=1&enablejsapi=1&loop=1&&playlist='+id ].join( '' );
	div.appendChild( iframe );

		// var tag = document.createElement('script');
		// tag.src = "https://www.youtube.com/iframe_api";
		// var firstScriptTag = document.getElementsByTagName('script')[0];
		// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		// div.appendChild(tag)
		// var player;
		// function onYouTubeIframeAPIReady() {
		// 	player = new YT.Player("player", {
		// 	width: '100%',
		// 		videoId: 'M7lc1UVf-VE',
		// 	playerVars: { 'autoplay': 1, 'playsinline': 1 },
		// 	events: {
		// 		'onReady': onPlayerReady
		// 	}
		// 	});
		// }
		// function onPlayerReady(event) {
		// 	event.target.mute();
		// 	event.target.playVideo();
		// }
		
		const object = new CSS3DObject( div );
		object.position.set( x, y, z );
		object.rotation.y = ry;
		object.rotation.x = rx;

		return object;

};

init();
animate();

function init() {

	const container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 500, 350, 750 );
	scene = new THREE.Scene();

	renderer = new CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'relative';
	renderer.domElement.style.top = 0;
	container.appendChild( renderer.domElement );

	

	function get_id() {
		var vid_list = ['HD0LMRKjzdY','ErEy38dcCVg', 'TORSsJKetek', 'GIPV2xpuSiI', 'ONIF3LDvgQE', 'dqbFMsBUlLE', 'UI_q2gd653Q', '4zs7s4LSnJA', '4ng6jWUYvPE', 'QSQgtxMdYYg', 'Wnn2hnDr0UI', 'h3pe0ZURysM', '1iBd_5jEi_k', 'vn37_avWQao', '8fP5EL2GvWE']
		var vid_id = vid_list[Math.floor(Math.random() * vid_list.length)];
		console.log(vid_id)
		return vid_id
	}

	const group = new THREE.Group();
	group.add(new Element(get_id(), 0, 0, 240, 0, 0));
	group.add(new Element(get_id(), 240, 0, 0, Math.PI/2, 0));
    group.add(new Element(get_id(), 0, 0, -240, Math.PI, 0));
    group.add(new Element(get_id(), -240, 0, 0, -Math.PI/2, 0));
    group.add(new Element(get_id(), 0, 240, 0, 0, -Math.PI/2));
    group.add(new Element(get_id(), 0, -240, 0, 0, Math.PI/2));
    glo_group = group
	scene.add( group );

	controls = new TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 4;
	window.addEventListener( 'resize', onWindowResize, false );

	// Block iframe events when dragging camera
	const blocker = document.getElementById( 'blocker' );
	blocker.style.display = 'none';

	controls.addEventListener( 'start', function () {
		blocker.style.display = '';
	} );
	controls.addEventListener( 'end', function () {
		blocker.style.display = 'none';
	} );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	glo_group.rotation.y += 0.005;
	glo_group.rotation.x += 0.004;
	glo_group.rotation.z += 0.005;

	controls.noPan = true;
	controls.noKeys = true;
	// controls.maxDistance = controls.minDistance = yourfixeddistnace;  
	controls.noRotate = true;
	controls.noZoom = true;

	controls.update();
	renderer.render( scene, camera );

}