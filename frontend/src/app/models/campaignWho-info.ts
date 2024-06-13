/**
 * this model class contains variable for campaign data
 */
export class CampaignWhoInfo {
  /**
   * from whom to send campaign messages
   */
  from: string;
  /**
   * whom to send to
   */
  to: string[];
  /**
   * name of the campaign
   */
  campaignName: string;
  /**
   * message to send
   */
  message: string;
  /**
   * id of the campaign
   */
  id: number;
}
