 class Van {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(vanDetails){
    this.#brand = vanDetails.brand
    this.#model = vanDetails.model
    this.speed = vanDetails.speed
  };

  displayInfo(){
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed},
       Is trunk open: ${this.isTrunkOpen}`
    )
  };

  go(){
    
    if(this.isTrunkOpen === false){
      this.speed+=5
    }

    if(this.speed > 200){
      this.speed = 200;
    }
   
  }
  brake(){
    this.speed-=5
  
    if(this.speed < 0){
      this.speed = 0;
    }
 
  }

  openTrunk(){
    if(this.speed === 0)
      this.isTrunkOpen = true
  }

  closeTrunk(){
    this.isTrunkOpen = false
  }

}

export const van1 = new Van({
  brand: 'Toyota',
  model: 'Corolla',
  speed: 0
})

export const van2 = new Van({
  brand: 'Nissan',
  model: 'Sunny',
  speed: 0
})


class RaceVan extends Van {

  acceleration;

  constructor(vanDetails){
    super(vanDetails);
    this.acceleration = vanDetails.acceleration;
    this.isTrunkOpen = 'Race cars dont have trunks'
  }

  go(){
      this.speed+=this.acceleration

    if(this.speed > 300){
      this.speed = 300;
    }
  }

  openTrunk(){
    this.isTrunkOpen = 'Race vans dont have trunks'
  }

  closeTrunk(){
    this.isTrunkOpen = 'Race vans dont have trunks'
  }

}

const raceVan1 = new RaceVan({
  brand: 'Porsche',
  model: 'model 1',
  speed: 0,
  acceleration: 10
})

