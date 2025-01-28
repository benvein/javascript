const baseUrl = "https://surveys-5jvt.onrender.com/api/cars";

async function getCars(){
    try{
        const response = await fetch(`${baseUrl}`)
        const data = await response.json();
        return data;
    } catch(error){
        console.log("hiba: " + error);
    }
}

async function getCarById(id){
    try{
        const response = await fetch(`${baseUrl}/${id}`)
        const data = await response.json();
        return data;
    } catch(error){
        console.log("hiba: " + error);
    }
}

async function createCar(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            body: JSON.stringify({
              model: 'Fiesta',
              brand: 'Ford',
              year: 2003,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        const data = await response.json();
        return data;
    } catch(error){
        console.error("hiba", error);
    }
}

async function updateCar(id) {
    try{
        const response = await fetch(`${baseUrl}/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                model: "Polo",
                brand: "Volkswagen",
                year: 2005
            }),
            headers: {  
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        return data;
    } catch(error){
        console.log("hiba: " + error);
    }
}

async function deleteCar(id) {
    try{
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        return data;
    } catch(error){
        console.log("hiba: " + error);
    }
}

console.log(await deleteCar(1));