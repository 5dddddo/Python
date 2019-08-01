function dDrop() {
	
	$("img").remove();
	
	var f = event.dataTransfer.files[0];
	
	var newImage = new Image();
	newImage.width = 200;		

	var resizeImage = new Image();
	resizeImage.width = 28;
	resizeImage.height = 28;
	
	var imageReader = new FileReader();	
	
	imageReader.onload = function() {
		newImage.src = event.target.result;
		resizeImage.src = event.target.result;
		
		newImage.onload = function() {
			document.getElementById("targetDiv").appendChild(newImage);
		}
		
		resizeImage.onload = function() {

			var backCanvas = document.createElement("canvas");
			backCanvas.width = 28;
			backCanvas.height = 28;
			var backCtx = backCanvas.getContext("2d");
			backCtx.drawImage(resizeImage,0,0,28,28);			
			
			var idata = backCtx.getImageData(0,0,28,28);
			
			var result = new Array(new Array(1),new Array(784))
			
			var c = 0;
			for(var i = 0; i < idata.data.length; i+=4) {
				var brightness = (idata.data[i] + idata.data[i+1] + 
								  idata.data[i+2])/3;					
				idata.data[i] = brightness;
				idata.data[i+1] = brightness;
				idata.data[i+2] = brightness;
				
				var maxValue = 255;
				var minValue = 0;
				var tmp = 255-brightness; 
				var tmp_result = (tmp - minValue) / (maxValue-minValue) 
				result[0][c++] = tmp_result
			}
			console.log(result[0]);
			
			$("#predictNum").text("계산중입니다.!!")
			$.ajax({
				url: 'http://localhost:8080/MNIST_tfjava/predict',
				data: {
					pixelData : JSON.stringify(result)
				},
				type: "POST",
				success: function(result){
					$("#predictNum").text(result)
				},
				error : function() {
					alert("호출 실패!!")
				}
			});
			
		}
	};	
	
	imageReader.readAsDataURL(f);
		
	event.preventDefault();
	
}

