export default class ImageMetrics {
	image = new Image();
	imageData = null;
	imageContext = null;
	imageCanvas = null;
	constructor(imagePath, canvasTag){
		this.image.crossOrigin = 'anonymous';
		this.image.src = imagePath;
		this.imageCanvas = document.getElementById(canvasTag);
		this.imageContext = this.imageCanvas.getContext('2d');
		this.image.onload = ()=>{this.imageOnLoad()}
	}

	imageOnLoad() {
		console.log("imageOnLoad");
  		//ctx.drawImage(img, 0, 0);
  		//img.style.display = 'none';
	}
}