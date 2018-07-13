class CURD {
	constructor(args) {

	}

	// methods
	add(formData, parmas){
		return new Promise((resolve, reject) => {
							
		});


	}

	delete(state){
		return new Promise((resolve, reject) => {
			if(state){
				resolve(12)
			}
		}).then(success=>{
			return success
		});
	}
}




const curd = new CURD

export default curd