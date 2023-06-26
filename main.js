function process() {
	const file = document.querySelector("#upload").files[0];
  
	if (!file) return;
  
	const reader = new FileReader();
  
	reader.readAsDataURL(file);
  
	reader.onload = function (event) {
	  const imgElement = document.createElement("img");
	  imgElement.src = event.target.result;
	  document.querySelector("#input").src = event.target.result;
  
	  imgElement.onload = function (e) {
		const canvas = document.createElement("canvas");
		const MAX_WIDTH = 700;
		const checkWidth = MAX_WIDTH > e.target.width ? e.target.width : MAX_WIDTH;
  
		const scaleSize1 = checkWidth / e.target.width;
		canvas.width = checkWidth;
		canvas.height = e.target.height * scaleSize1;
  
		const ctx = canvas.getContext("2d");
  
		ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
  
		const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
  
		// you can send srcEncoded to the server
		document.querySelector("#output").src = srcEncoded;
		
		console.log(canvas.width, canvas.height);
		console.log(MAX_WIDTH, scaleSize1);
		var head = 'data:image/jpeg;base64,';
		console.log(file.size, Math.round((canvas.toDataURL('image/jpeg').length - head.length) * 3/4));
	  };
	};
  }
