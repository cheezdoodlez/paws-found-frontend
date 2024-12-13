const FIND_PETS= 'http://localhost:5501/pets'

export async function findPets(query) {
console.log(query)
    // const query = fetch(F)

}

 export const test = async () => {
    const response = await fetch(FIND_PETS)
    console.log(response.json())
}