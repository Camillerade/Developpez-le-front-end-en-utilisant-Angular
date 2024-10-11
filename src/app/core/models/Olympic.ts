import { participation } from "./Participation";

export class olympic {

    id:string;
      constructor(public country: string,
                  public participations: [participation]
                  )
                  {
                    this.id=crypto.randomUUID().substring(0,8);
                  }
}
    
     
