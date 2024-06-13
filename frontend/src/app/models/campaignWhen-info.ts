/**
 * this model class contains variable for campaign data
 */
export class CampaignWhenInfo {
  /**
   * id of the campaign
   */
  id: string;
  /**
   * send type of the campaign
   */
  sendType: string;
  /**
   * campaign starting date
   */
  startScheduleDate: string;
  /**
   * campaign ending date
   */
  endScheduleDate: string;
  /**
   * in what bacth size to send messages in
   */
  batchSize: string;
  /**
   * no of hours between batches
   */
  betweenBatchHour: number;
  /**
   * no of minutes between batches
   */
  betweenBatchMinutes: number;
  /**
   * time before message
   */
  dontSendBefore: string[];
  /**
   * not to send after this
   */
  dontSendAfter: string[];
  /**
   *content of the message
   */
  messageBody: string;
  /**
   * field of the message
   */
  field: string;
  /**
   * flag of the message
   */
  flag: boolean;
}
