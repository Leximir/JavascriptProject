export function getUserLocation(){
    let userLocation = "";

    while(userLocation.trim() === ""){
        userLocation = prompt('Unesite vas grad');
    }

    return userLocation
}