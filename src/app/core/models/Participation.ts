export class participation {

    id:string;
      constructor(public year: string,
                  public city: string,
                  public medalsCount : number,
                  public athleteCount : number
                  )
                  {
                    this.id=crypto.randomUUID().substring(0,8);
                  }
}
    
     