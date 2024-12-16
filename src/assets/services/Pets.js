const BASE_URL= 'http://localhost:5501/pets'

export async function findPets(query) {
console.log(query)
    // const query = fetch(F)

}

 export const test = async () => {                                                                                      
    const response = await fetch(BASE_URL)
    console.log(response.json())
}