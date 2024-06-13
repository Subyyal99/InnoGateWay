import { Injectable } from "@angular/core";
/**
 *  decorator specifies that Angular can use this class in the DI system and  providedIn: 'root' is the meta data
 */
@Injectable({
  providedIn: "root",
})
export class CampaignService {
  campaignName;
  to = [];
  from;
  message;
  sendingTime;
  /**
   * the constuctor call of our conponent
   */
  constructor() {}
  /**
   * function to get specific data
   * @returns returns the data required by the call
   */
  getData() {
    return {
      campaignName: this.campaignName,
      to: this.to,
      from: this.from,
      message: this.message,
      sendingTime: this.sendingTime,
    };
  }
  /**
   * our function to set specific data to be used later
   * @param object is contains the data to be stored
   * @param cond is th condition to manipulate where to store data
   */
  setData(object, cond) {
    if (cond == "who") {
      this.campaignName = object.campaignName;
      object.to.forEach((element) => {
        this.to.push(element.code);
      });
      this.from = object.from.name;
    } else if (cond == "what") {
      this.message = object.message;
    } else if (cond == "when") {
      this.sendingTime = object.sendingTime;
    }
  }
}
