function isArray(object) {
    return Object.prototype.toString.call(object) == '[object Array]';
}

function isNumber(object) {
    return typeof object == 'number';
}

function random(min, max) {
    if (isArray(min)) return min[~~(M.random() * min.length)];
    if (!isNumber(max)) max = min || 1, min = 0;
    return min + Math.random() * (max - min);
}

sin = Math.sin;
cos = Math.cos;
abs = Math.abs;

TWO_PI = Math.PI * 2;
HALF_PI = Math.PI / 2;
QUARTER_PI = Math.PI / 4;

var Leaf = function (boundingBox, gravity) {
    // boundingBox vector x, y, z = width, height, depth
    this.boundingBox = boundingBox;
    this.gravity = gravity || 1;

    this.value = random(-1, 1);
    this.angle = new THREE.Vector3(0, random(), random());
    this.radius = new THREE.Vector3(random(boundingBox.x * 0.1, boundingBox.x * 0.5), random(), random(boundingBox.x * 0.5));
    this.pos = new THREE.Vector3(0, boundingBox.y * 0.5 + random(boundingBox.y * 0.05), 0);
    this.mass = random(0.3, 1);
    this.scale = random(8, 15);

    const geometry = new THREE.BufferGeometry();

    // positions
    const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.0, 0.0);
    positions.setXYZ(1, 0.0, 0.5, 0.25);
    positions.setXYZ(2, 0.5, 0.0, 0.0);
    positions.setXYZ(3, 0.0, -0.5, 0.25);
    geometry.addAttribute('position', positions);

    // uvs
    const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0, 0.0, 0.5);
    uvs.setXYZ(1, 0.5, 0.0);
    uvs.setXYZ(2, 1.0, 0.5);
    uvs.setXYZ(3, 0.5, 1.0);
    geometry.addAttribute('uv', uvs);

    // index
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 0, 2, 3]), 1));

    var image = document.createElement('img');
    var texture = new THREE.Texture(image);
    image.onload = function () {
        texture.needsUpdate = true;
    };
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQkMzNzAwQTdEQzkxMUU2OURGMERCOTE4Q0NCN0ZFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQjE0MzFDNjdEQzkxMUU2OURGMERCOTE4Q0NCN0ZFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBCQzM3MDA4N0RDOTExRTY5REYwREI5MThDQ0I3RkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBCQzM3MDA5N0RDOTExRTY5REYwREI5MThDQ0I3RkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FeixPAAAEeNJREFU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";

    const material = new THREE.MeshBasicMaterial();
    material.map = texture;
    material.side = THREE.DoubleSide;
    // material.color = new THREE.Color().setHSL(random(0.2, 0.4), 0.5, 0.5);
    material.transparent = true;


    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.visible = false;
    this.mesh.scale.set(this.scale, this.scale, this.scale);
}

Leaf.prototype.fall = function () {
    this.mesh.visible = true;
    this.started = true;
    this.startTween();
}

Leaf.prototype.hide = function () {
    // this.mesh.visible = false;
    this.started = false;
    TweenMax.killTweensOf(this);
}

Leaf.prototype.startTween = function () {
    const time = random(1, 2);
    const radiusX = random(this.boundingBox.x * 0.1, this.boundingBox.x * 0.5);
    const radiusZ = random(this.boundingBox.z * 0.1, this.boundingBox.z * 0.5) * time * 0.5;
    const ease = Quad.easeInOut;

    TweenMax.to(this.radius, time, { x: radiusX, y: radiusX * 0.25, z: radiusZ, ease });

    TweenMax.to(this, time, {
        value: 1, ease, onComplete: () => {
            TweenMax.to(this, time, {
                value: -1, ease, onComplete: () => {
                    this.startTween();
                }
            });
        }
    });
}

Leaf.prototype.update = function () {
    if (!this.started) return;

    this.angle.x += random(0.01);
    this.angle.z += (this.value + 1) * 0.02;
    this.pos.y += (1 - abs(this.value)) * this.radius.y * this.gravity * -0.1 - this.mass;

    this.mesh.position.x = this.value * this.radius.x;
    this.mesh.position.y = cos(this.value * HALF_PI) * -this.radius.y;
    this.mesh.position.z = sin(this.angle.z) * this.radius.z;

    this.mesh.position.y += this.pos.y;

    this.mesh.rotation.x = HALF_PI + sin(this.value * HALF_PI) * cos(this.value * this.angle.y * HALF_PI);
    this.mesh.rotation.y = sin(this.value * HALF_PI); // + cos(this.angle.y * PI);
    this.mesh.rotation.z = this.angle.z;

    this.mesh.rotation.z += this.angle.x;
}

var camera, scene, renderer;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 300;
    scene = new THREE.Scene();

    //var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    //var material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    //mesh = new THREE.Mesh( geometry, material );

    this.boundingBox = new THREE.Vector3(100, 200, 100);

    this.leaves = [];
    this.numLeaves = 20;

    for (let i = 0; i < this.numLeaves; i++) {
        const leaf = new Leaf(this.boundingBox);
        this.leaves.push(leaf);
        scene.add(leaf.mesh);

        TweenMax.delayedCall(random(), leaf.fall.bind(leaf));
    }

    const geometry = new THREE.BoxGeometry(this.boundingBox.x, this.boundingBox.y, this.boundingBox.z);
    const material = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.controls = new THREE.TrackballControls(camera, renderer.domElement);
    this.controls.zoomSpeed = 0.8;
    this.controls.panSpeed = 0.8;
    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.15;
    this.controls.maxDistance = 3000;
    //
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    this.controls.update();

    for (let i = 0; i < this.leaves.length; i++) {
        const leaf = this.leaves[i];
        leaf.update();

        if (leaf.mesh.position.y < -this.boundingBox.y * 0.5)
            //leaf.hide();
            leaf.pos.y = this.boundingBox.y * 0.5;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
