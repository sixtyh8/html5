// HTML5 Logo
function makePath(ctx, points){
	ctx.moveTo(points[0][0], points[0][1]);
	for(var i=1,len=points.length; i<len; i++){
		ctx.lineTo(points[i][0], points[i][1]);
	}
}

function drawBackground(canvas){
	var ctx = canvas.getContext("2d"),
		grad, i;

	ctx.save();

	ctx.scale(canvas.width, canvas.height);

	grad = ctx.createRadialGradient(
		0.5, 0.5, 0.125, 0.5, 0.5, 0.75
	);

	grad.addColorStop(0.1, "rgb(170,180,190)");
	grad.addColorStop(0.9, "rgb(50,60,70)");

	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, 1, 1);

	// Draw star
	ctx.beginPath();
	ctx.translate(0.5, 0.5);
	for(i = 0; i < 60; i++){
		ctx.rotate(1 / 60 * Math.PI * 2);
		ctx.lineTo(i % 2 ? 0.15 : 0.75, 0);
	}
	ctx.fillStyle = "rgba(255,255,255,0.1";
	ctx.fill();
	ctx.restore();
}

function drawLogo(canvas){
	var logo = [
		[40, 460], [0,0], [450,0], [410,460], [225,512]
	],
	five0 = [
		[225,208], [225,265], [295,265], [288,338],
		[225,355], [225,414], [341,382], [357,208] 
	],
	five1 = [
		[225,94], [225,150], [362,150], [367,94]
	],
	five2 = [
		[225,208], [151,208], [146,150], [225,150],
		[225,94], [84,94], [85,109], [99,265], [225,265] 
	],
	five3 = [
		[225,355], [162,338], [158,293], [128,293],
		[102,293], [109,382], [225,414]
	];

	// Save original state
	ctx.save();

	// Translate the coordinate space to center of the logo
	ctx.translate(-225, -256);
	// fill background of logo
	ctx.beginPath();
	makePath(ctx, logo);
	ctx.fillStyle = "#e34c26";
	ctx.fill();

	// Add down-scaling at the center of the logo
	ctx.save();

	ctx.translate(225,256);
	ctx.scale(0.8, 0.8);
	ctx.translate(-225, -256);
	// clip the right half of the logo
	ctx.beginPath();
	ctx.rect(225, 0, 225, 512);
	ctx.clip();
	// paint a lighter, down-scaled logo on the right half
	ctx.beginPath();
	makePath(ctx, logo);
	ctx.fillStyle = "#f06529";
	ctx.fill();
	// restore scaling and clipping region
	ctx.restore();

	// fill white part of "5"
	ctx.beginPath();
	makePath(ctx, five0);
	makePath(ctx, five1);
	ctx.fillStyle = "#ffffff";
	ctx.fill();

	// fill light gray part of "5"
	ctx.beginPath();
	makePath(ctx, five2);
	makePath(ctx, five3);
	ctx.fillStyle = "#ebebeb";
	ctx.fill();

	// restore original state
	ctx.restore();
}