var connectorDivision = "user";
exports.connectorNo = function(request){
	
	var connectorNo = 5555555;
	
	if(request.cookies.no !== undefined){
		connectorNo = request.cookies.no;
	}
	
	return connectorNo;
}	

exports.connectorName = function(request){
	
	var connectorName = "브라우저";
	
	if(request.cookies.name !== undefined){
		connectorName = request.cookies.name;
	}
	
	return connectorName;
}	

exports.connectorImage = function(request){
	
	var connectorImage = "none.jpg";
	
	if(request.cookies.image !== undefined && request.cookies.image != ""){
		connectorImage = request.cookies.image;
	}
	
	return connectorImage;
}	

exports.connectorDivision = function(request) {
	if(request.cookies.division !== undefined && request.cookies.division !== null && request.cookies.division !== ''){
		connectorDivision = request.cookies.division;
	}
	return connectorDivision;
}

exports.connectorPhone = function(request){
	
	var connectorPhone = "010-0000-0000";
	
	if(request.cookies.phone !== undefined){
		connectorPhone = request.cookies.phone;
	}
	
	return connectorPhone;
}	