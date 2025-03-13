

export function getVoisins(map,x, y) {
    let voisins = [];
    let positionVoisin;
    if( x !== map.length) {
         positionVoisin = [x + 1, y];
        if (map[positionVoisin[0]][positionVoisin[1] ] !== 1){
            voisins.push(positionVoisin);
        }

    }
    if( x !== 0) {
         positionVoisin = [x - 1, y];
        if (map[positionVoisin[0]][positionVoisin[1] ] !== 1){
            voisins.push(positionVoisin);
        }

    }
    if( y !== map.length) {
         positionVoisin = [x, y + 1];
        if (map[positionVoisin[0]][positionVoisin[1] ] !== 1){
            voisins.push(positionVoisin);
        }

    }
    if( y !== 0) {
         positionVoisin = [x, y - 1];
        if (map[positionVoisin[0]][positionVoisin[1] ] !== 1){
            voisins.push(positionVoisin);
        }

    }
    return voisins;
}


export function creationCalque(map,positionDepart){
    let mapInnondation = [];
    for (let ligne of map) {
      let nouvelleLigne = [];
      for (let colonne of ligne){
        nouvelleLigne.push(colonne === 1 ? -1 : -2);
      }
      mapInnondation.push(nouvelleLigne);
    }

    let distance = 0;
    mapInnondation[positionDepart[0]][positionDepart[1]] = 0;
    let voisins = getVoisins(map, positionDepart[0], positionDepart[1]);
    while(voisins.length !== 0) {
        let caseAExplorer = [];
        distance += 1;
        for(let voisin of voisins){
            mapInnondation[voisin[0]][ voisin[1]] = distance;
            let voisins2 = getVoisins(map, voisin[0], voisin[1]);
            for (let voisin2 of voisins2) {
                if (mapInnondation[voisin2[0]][ voisin2[1]] === -2 ){
                    caseAExplorer.push(voisin2);
                }
            }
        }
        voisins = caseAExplorer;
    }
    return mapInnondation;
}